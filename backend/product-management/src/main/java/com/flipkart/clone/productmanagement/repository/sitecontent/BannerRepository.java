package com.flipkart.clone.productmanagement.repository.sitecontent;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.flipkart.clone.productmanagement.model.sitecontent.Banner;

public interface BannerRepository extends MongoRepository<Banner, String> {

}
