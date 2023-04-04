/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Tuesday, 4th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
package com.flipkart.clone.productmanagement.model.catalog;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(value = "product")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Product {
    @Id
    private String id;
    private String name;
    @Indexed(unique = true)
    private String slug;
    private String productUrl;
    @DBRef
    private List<Category> categoryList;
    private double retailPrice;
    private double discountedPrice;
    private List<String> imageUrlList;
    private String description;
    private String brand;
    private Object productSpecifications;
}
