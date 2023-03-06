package com.flipkart.clone.productmanagement.dto;

import java.util.List;

import org.springframework.hateoas.RepresentationModel;

import com.flipkart.clone.productmanagement.model.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
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
