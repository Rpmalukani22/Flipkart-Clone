package com.flipkart.clone.productmanagement.controller;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.CacheControl;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.flipkart.clone.productmanagement.commons.utility.FileUtil;
import com.flipkart.clone.productmanagement.service.storage.S3Service;

import jakarta.websocket.server.PathParam;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/s3")
@Slf4j
public class S3Controller {
    @Autowired
    private S3Service s3Service;

    @GetMapping("/buckets")
    public List<String> listBuckets() {
        List<Bucket> buckets = s3Service.listBuckets();
        return buckets.stream().map(Bucket::getName).toList();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/buckets/{bucketName}")
    public Bucket createBucket(@PathVariable String bucketName) {
        return s3Service.createBucket(bucketName);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/buckets/{bucketName}")
    public void deleteBucket(@PathVariable String bucketName) {
        s3Service.deleteBucket(bucketName, true);
    }

    @GetMapping("/buckets/{bucketName}/files")
    public ResponseEntity<Object> getObjectByName(@PathVariable String bucketName, @RequestParam String fileName) {
        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.noCache())
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                .body(new InputStreamResource(s3Service.findObjectByName(bucketName, fileName)));
    }

    @PostMapping(path = "/buckets/{bucketName}/files", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PutObjectResult> saveFile(@PathVariable String bucketName,
            @RequestParam(value = "parentPath", required = false) String parentPath,
            @RequestPart("file") MultipartFile multipartFile) {
        File tempFile = FileUtil.convertMultiPartFileToFile(multipartFile);
        PutObjectResult result = s3Service.saveObject(bucketName, parentPath, tempFile);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PostMapping(path = "/buckets/{bucketName}/files/_bulk/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> saveAllFiles(@PathVariable String bucketName,
            @RequestParam(value = "parentPath", required = false) String parentPath,
            @RequestPart("file") MultipartFile[] multipartFiles) {
        log.info("Bulk Upload Started!");
        List<File> tempFiles = Arrays.stream(multipartFiles).map(FileUtil::convertMultiPartFileToFile).toList();
        s3Service.saveAllObjects(bucketName, parentPath, tempFiles);
        log.info("Notifying Bulk Upload Started!");
        return new ResponseEntity<>("File Uploaded Started!", HttpStatus.ACCEPTED);
    }

}
