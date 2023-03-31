package com.flipkart.clone.productmanagement.model.sitecontent;

import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class BestOfDeal {
    @Id
    String id;
    String title;
    String leftBgImgUrl;
    List<Object> offerings;
}
