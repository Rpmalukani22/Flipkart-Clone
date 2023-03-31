package com.flipkart.clone.productmanagement.dto.sitecontent;

import java.util.List;

import org.springframework.hateoas.RepresentationModel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode(callSuper = true)
public class BestOfDealResponse extends RepresentationModel<BestOfDealResponse> {
    String id;
    String title;
    String leftBgImgUrl;
    List<Object> offerings;
}
