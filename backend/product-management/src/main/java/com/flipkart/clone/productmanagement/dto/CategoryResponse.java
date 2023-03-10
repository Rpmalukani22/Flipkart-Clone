package com.flipkart.clone.productmanagement.dto;

import org.springframework.hateoas.RepresentationModel;

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
public class CategoryResponse extends RepresentationModel<CategoryResponse> {
    private String id;
    private String slug;
    private String categoryPath;
}
