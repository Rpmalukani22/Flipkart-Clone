package com.flipkart.clone.productmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flipkart.clone.productmanagement.dto.sitecontent.BannerRequest;
import com.flipkart.clone.productmanagement.dto.sitecontent.BannerResponse;
import com.flipkart.clone.productmanagement.service.sitecontent.SiteContentService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController("/site-content")
public class SiteContentController {
   @Autowired
   SiteContentService siteContentService;

   @GetMapping("/banners")
   public List<BannerResponse> getBanners() {
      return siteContentService.getBanners();
   }

   @GetMapping("/banners/{id}")
   public BannerResponse getBannerById(@PathVariable String id) {
      return siteContentService.getBannerById(id);
   }

   @DeleteMapping("/banners/{id}")
   public void removeBannerById(@PathVariable String id) {
      siteContentService.removeBannerById(id);
   }

   @PostMapping(path = "/banners", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
   public BannerResponse addBanner(@RequestBody BannerRequest bannerRequest) {
      return siteContentService.createBanner(bannerRequest);
   }

   @PostMapping(path = "/banners/_bulk", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
   public List<BannerResponse> addBanners(@RequestBody List<BannerRequest> bannerRequestList) {
      return siteContentService.bulkCreateBanners(bannerRequestList);
   }
}
