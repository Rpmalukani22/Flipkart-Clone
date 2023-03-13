package com.flipkart.clone.productmanagement.dto.sitecontent;

import org.springframework.hateoas.RepresentationModel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
public class BannerResponse extends RepresentationModel<BannerResponse> {
    String id;
    String imgFileName;
    String imgUrl;
    String targetHref;
}
