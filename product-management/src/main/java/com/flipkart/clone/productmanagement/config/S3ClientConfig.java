/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Tuesday, 4th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
package com.flipkart.clone.productmanagement.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class S3ClientConfig {

    @Value("${aws.access.key.id}")
    private String accessKeyId;

    @Value("${aws.access.key.secret}")
    private String accessKeySecret;

    @Value("${s3.bucket.region.name}")
    private String s3RegionName;

    @Value("${aws.service.endpoint}")
    private String endpoint;

    @Bean
    public AwsClientBuilder.EndpointConfiguration endpointConfiguration() {
        return new AwsClientBuilder.EndpointConfiguration(endpoint, s3RegionName);
    }

    @Bean
    public AmazonS3 getAmazonS3Client() {
        final BasicAWSCredentials basicAWSCredentials = new BasicAWSCredentials(accessKeyId, accessKeySecret);
        return AmazonS3ClientBuilder
                .standard()
                .withEndpointConfiguration(endpointConfiguration())
                .withCredentials(new AWSStaticCredentialsProvider(basicAWSCredentials))
                .withPathStyleAccessEnabled(true)
                .build();
    }

}
