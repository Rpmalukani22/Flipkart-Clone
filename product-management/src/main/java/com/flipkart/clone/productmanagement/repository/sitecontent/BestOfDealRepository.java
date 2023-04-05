/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Tuesday, 4th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
package com.flipkart.clone.productmanagement.repository.sitecontent;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.flipkart.clone.productmanagement.model.sitecontent.BestOfDeal;

public interface BestOfDealRepository extends MongoRepository<BestOfDeal, String> {

}
