/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Tuesday, 4th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
package com.flipkart.clone.productmanagement.dto.catalog;

import java.util.List;

import org.springframework.hateoas.RepresentationModel;

import com.flipkart.clone.productmanagement.model.catalog.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse extends RepresentationModel<ProductResponse> {
    private String id;
    private String name;
    private String slug;
    private String productUrl;
    private List<Category> categoryList;
    private double retailPrice;
    private double discountedPrice;
    private List<String> imageUrlList;
    private String description;
    private String brand;
    private Object productSpecifications;

}
