package com.flipkart.clone.productmanagement.model.sitecontent;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(value = "banner")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Banner {
    @Id
    String id;
    String imgUrl;
    String targetHref;
}
