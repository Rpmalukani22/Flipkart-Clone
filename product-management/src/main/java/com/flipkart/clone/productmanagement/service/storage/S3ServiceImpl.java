/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Tuesday, 4th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
package com.flipkart.clone.productmanagement.service.storage;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.event.ProgressListener;
import com.amazonaws.services.redshift.model.BucketNotFoundException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.amazonaws.services.s3.transfer.MultipleFileUpload;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.services.s3control.model.BucketAlreadyExistsException;
import com.flipkart.clone.productmanagement.commons.utility.FileUtil;

import lombok.extern.slf4j.Slf4j;

//References:-
// https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/examples-s3-buckets.html
// https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/examples-s3-objects.html

@Service
@Slf4j
public class S3ServiceImpl implements S3Service {
    @Autowired
    AmazonS3 amazonS3;

    private void deleteFile(File file) {
        try {
            Files.delete(file.toPath());
        } catch (IOException ex) {
            log.error("Error {} occurred while deleting temporary file", ex.getLocalizedMessage());
        }
    }

    @Override
    public S3ObjectInputStream findObjectByKey(String bucketName, String key) {
        log.info("Downloading file with name {}", key);
        return amazonS3.getObject(bucketName, key).getObjectContent();
    }

    @Override
    public PutObjectResult saveObject(String bucketName, String parentPath, File file) {
        try {
            final String fileName = file.getName();
            final String fileS3Path = FileUtil.cleanPath(String.join("/", parentPath, fileName), "/", false);
            log.info("Uploading file with file path {}", fileS3Path);
            final PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileS3Path, file);
            PutObjectResult result = amazonS3.putObject(putObjectRequest);
            deleteFile(file);
            return result;
        } catch (AmazonServiceException e) {
            log.error("Error {} occurred while uploading file", e.getLocalizedMessage());
            throw e;
        }
    }

    @Override
    @Async
    public CompletableFuture<String>  saveAllObjects(String bucketName, String parentPath, List<File> files) {
        log.info("inside saveAllObject");
        TransferManager transfer = TransferManagerBuilder.standard().withS3Client(amazonS3).build();

        final ProgressListener progressListener = progressEvent -> {
            if (progressEvent.getBytesTransferred() > 0) {
                double percentTransferred = progressEvent.getBytesTransferred() * 100.0 / progressEvent.getBytes();
                log.info("Transferred " + percentTransferred + "%");
            }
        };

        try {
            MultipleFileUpload upload = transfer.uploadFileList(bucketName, parentPath, new File(System.getProperty("user.dir")),
                    files);
            upload.addProgressListener(progressListener);
            upload.waitForCompletion();
        } catch (AmazonClientException e) {
            e.printStackTrace();
            throw e;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("Thread was interrupted. All files Could not be uploaded.");
            throw new AmazonServiceException("All files Could not be uploaded. Please Try again.");

        } finally {
            transfer.shutdownNow(false);
            files.forEach(this::deleteFile);
        }
        return CompletableFuture.completedFuture("Upload Process Finished.");
    }

    @Override
    public Bucket createBucket(String bucketName) {
        if (amazonS3.doesBucketExistV2(bucketName)) {
            log.info("Duplicate bucket name. Please try another name.");
            throw new BucketAlreadyExistsException("Duplicate bucket name. Please try another name.");
        } else {
            try {
                return amazonS3.createBucket(bucketName);
            } catch (AmazonS3Exception e) {
                e.printStackTrace();
                throw e;
            }
        }

    }

    @Override
    public List<Bucket> listBuckets() {
        List<Bucket> bucketList = amazonS3.listBuckets();
        if (bucketList.isEmpty())
            throw new BucketNotFoundException("Bucket List is Empty.");
        return bucketList;
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

    @Override
    public void deleteObjectByKey(String bucketName, String key) {
        amazonS3.deleteObject(bucketName, key);
    }

}
