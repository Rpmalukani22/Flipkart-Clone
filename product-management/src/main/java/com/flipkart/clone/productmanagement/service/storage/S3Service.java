/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Tuesday, 4th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
package com.flipkart.clone.productmanagement.service.storage;

import java.io.File;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.scheduling.annotation.Async;

import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3ObjectInputStream;

public interface S3Service {

    public Bucket createBucket(String bucketName);

    public List<Bucket> listBuckets();

    public void deleteBucket(String bucketName, boolean deleteObjects);

    public S3ObjectInputStream findObjectByKey(String bucketName, String key);

    public PutObjectResult saveObject(String bucketName, String parentPath, final File file);

    @Async
    public CompletableFuture<String> saveAllObjects(String bucketName, String parentPath, final List<File> files);

    public void deleteObjectByKey(String bucketName, String key);

}
