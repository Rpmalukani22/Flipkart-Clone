package com.flipkart.clone.productmanagement.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private String id;
    private String name;
    private String slug;
    private String productUrl;
    private String category;
    private double retailPrice;
    private double discountedPrice;
    private List<String> imageUrls;
    private String description;
    private String brand;
    private Object productSpecifications;

}
