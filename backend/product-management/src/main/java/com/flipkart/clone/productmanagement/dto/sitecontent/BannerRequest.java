package com.flipkart.clone.productmanagement.dto.sitecontent;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class BannerRequest {
    MultipartFile image;
    String targetHref;
}
