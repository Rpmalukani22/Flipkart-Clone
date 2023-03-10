package com.flipkart.clone.productmanagement.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.S3ObjectInputStream;

public interface S3Service {

    public void createS3Bucket(String bucketName);

    public List<Bucket> listBuckets();

    public void deleteBucket(String bucketName, boolean deleteObjects);

    public S3ObjectInputStream findObjectByName(String bucketName, String fileName);

    public void saveObject(String bucketName, String parentPath, final MultipartFile multipartFile);

    public void saveAllObjects(String bucketName, String parentPath, final MultipartFile[] multipartFiles);

    public void createEmptyDir(String bucketName, String parentPath, String dirName);

}
