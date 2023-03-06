package com.flipkart.clone.productmanagement.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
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
    private List<Category> categoryList;
    private double retailPrice;
    private double discountedPrice;
    private List<String> imageUrlList;
    private String description;
    private String brand;
    private Object productSpecifications;
}
