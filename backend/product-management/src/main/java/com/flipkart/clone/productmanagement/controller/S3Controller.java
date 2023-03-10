package com.flipkart.clone.productmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.model.Bucket;
import com.flipkart.clone.productmanagement.service.S3Service;

@RestController
@RequestMapping("/s3")
public class S3Controller {
    @Autowired
    private S3Service s3Service;

    @GetMapping("/buckets")
    public List<String> listBuckets() {
        List<Bucket> buckets = s3Service.listBuckets();
        return buckets.stream().map(Bucket::getName).toList();
    }

    @PostMapping("/buckets/{bucketName}")
    public void createBucket(@PathVariable String bucketName) {
        s3Service.createS3Bucket(bucketName);
    }

    @DeleteMapping("/buckets/{bucketName}")
    public void deleteBucket(@PathVariable String bucketName) {
        s3Service.deleteBucket(bucketName, true);
    }

    @PostMapping(path = "/buckets/files/{bucketName}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> saveFile(@PathVariable String bucketName,
            @RequestParam(value = "parentPath", defaultValue = "/", required = true) String parentPath,
            @RequestPart("file") MultipartFile multipartFile) {
        s3Service.saveObject(bucketName, parentPath, multipartFile);
        return new ResponseEntity<>("File Uploaded Successfully!", HttpStatus.OK);
    }

    @PostMapping(path = "/buckets/_bulk/files/{bucketName}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> saveAllFiles(@PathVariable String bucketName,
            @RequestParam(value = "parentPath", defaultValue = "/", required = true) String parentPath,
            @RequestPart("file") MultipartFile[] multipartFiles) {
        s3Service.saveAllObjects(bucketName, parentPath, multipartFiles);
        return new ResponseEntity<>("File Uploaded Successfully!", HttpStatus.OK);
    }

    @PostMapping("/buckets/empty-dir/{bucketName}")
    public ResponseEntity<Object> createEmptyDir(@PathVariable String bucketName,
            @RequestParam(value = "parentPath", defaultValue = "/", required = true) String parentPath,
            @RequestParam String dirName) {
        s3Service.createEmptyDir(bucketName, parentPath, dirName);
        return new ResponseEntity<>("Dir Created Successfully!", HttpStatus.OK);
    }

}
