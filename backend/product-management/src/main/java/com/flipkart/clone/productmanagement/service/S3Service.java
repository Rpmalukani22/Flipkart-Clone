package com.flipkart.clone.productmanagement.service;

import java.io.File;
import java.util.List;

import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3ObjectInputStream;

public interface S3Service {

    public Bucket createBucket(String bucketName);

    public List<Bucket> listBuckets();

    public void deleteBucket(String bucketName, boolean deleteObjects);

    public S3ObjectInputStream findObjectByName(String bucketName, String fileName);

    public PutObjectResult saveObject(String bucketName, String parentPath, final File file);

    public void saveAllObjects(String bucketName, String parentPath, final List<File> files);

}
