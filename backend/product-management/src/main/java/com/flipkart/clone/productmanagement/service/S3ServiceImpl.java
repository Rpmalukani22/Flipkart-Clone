package com.flipkart.clone.productmanagement.service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.amazonaws.services.s3.transfer.MultipleFileUpload;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;

import lombok.extern.slf4j.Slf4j;

//References:-
// https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/examples-s3-buckets.html
// https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/examples-s3-objects.html

@Service
@Slf4j
public class S3ServiceImpl implements S3Service {
    @Autowired
    AmazonS3 amazonS3;

    private String cleanPath(String path, String pathDelim, boolean trailingDelim) {
        if (!path.endsWith(pathDelim))
            path = path + pathDelim;
        path = path.replaceAll("(" + pathDelim + ")" + "+", pathDelim).trim();
        if (!trailingDelim)
            path = path.replaceAll("(" + pathDelim + ")" + "$", "");
        return path;
    }

    // Utility Function
    private File convertMultiPartFileToFile(final MultipartFile multipartFile) {
        final File file = new File(multipartFile.getOriginalFilename());
        try (final FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(multipartFile.getBytes());
        } catch (IOException e) {
            log.error("Error {} occurred while converting the multipart file", e.getLocalizedMessage());
        }
        return file;
    }

    @Override
    public S3ObjectInputStream findObjectByName(String bucketName, String fileName) {
        log.info("Downloading file with name {}", fileName);
        return amazonS3.getObject(bucketName, fileName).getObjectContent();
    }

    @Override
    public void saveObject(String bucketName, String parentPath, MultipartFile multipartFile) {
        try {
            final File file = convertMultiPartFileToFile(multipartFile);
            final String fileName = file.getName();
            final String fileS3Path = cleanPath(String.join("/", parentPath, fileName), "/", false);
            log.info("Uploading file with file path {}", fileS3Path);
            final PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileS3Path, file);
            amazonS3.putObject(putObjectRequest);
            Files.delete(file.toPath());
        } catch (AmazonServiceException e) {
            log.error("Error {} occurred while uploading file", e.getLocalizedMessage());
        } catch (IOException ex) {
            log.error("Error {} occurred while deleting temporary file", ex.getLocalizedMessage());
        }
    }

    @Override
    public void saveAllObjects(String bucketName, String parentPath, MultipartFile[] multipartFiles) {
        try {
            TransferManager transfer = TransferManagerBuilder.standard().withS3Client(amazonS3).build();
            List<File> files = Arrays.stream(multipartFiles).map(this::convertMultiPartFileToFile).toList();
            MultipleFileUpload upload = transfer.uploadFileList(bucketName, parentPath, new File("."),
                    files);
            upload.waitForCompletion();
            files.forEach(file -> {
                try {
                    Files.delete(file.toPath());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });

        } catch (AmazonClientException | InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Override
    public void createEmptyDir(String bucketName, String parentPath, String dirName) {
        try {
            String folderPath = cleanPath(String.join("/", parentPath, dirName), "/", true);
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(0L);
            InputStream inputStream = new ByteArrayInputStream(new byte[0]);
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, folderPath, inputStream, metadata);
            amazonS3.putObject(putObjectRequest);
        } catch (AmazonServiceException e) {
            log.error("Error {} occurred while uploading file", e.getLocalizedMessage());
        }

    }

    @Override
    public void createS3Bucket(String bucketName) {
        if (amazonS3.doesBucketExistV2(bucketName)) {
            log.info("Duplicate bucket name. Please try another name.");
        } else {
            try {
                amazonS3.createBucket(bucketName);
            } catch (AmazonS3Exception e) {
                log.error(e.getErrorMessage());
            }
        }

    }

    @Override
    public List<Bucket> listBuckets() {
        return amazonS3.listBuckets();
    }

    @Override
    public void deleteBucket(String bucketName, boolean deleteObjects) {
        if (deleteObjects) {
            ObjectListing objectListing = amazonS3.listObjects(bucketName);
            while (true) {
                for (Iterator<?> iterator = objectListing.getObjectSummaries().iterator(); iterator.hasNext();) {
                    S3ObjectSummary summary = (S3ObjectSummary) iterator.next();
                    amazonS3.deleteObject(bucketName, summary.getKey());
                }

                if (objectListing.isTruncated()) {
                    objectListing = amazonS3.listNextBatchOfObjects(objectListing);
                } else {
                    break;
                }
            }
        }
        try {
            amazonS3.deleteBucket(bucketName);
        } catch (AmazonServiceException e) {
            log.error(e.getErrorMessage());
        }

    }

}
