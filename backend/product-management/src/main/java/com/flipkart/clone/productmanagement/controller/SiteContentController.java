package com.flipkart.clone.productmanagement.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.MediaTypes;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.flipkart.clone.productmanagement.dto.sitecontent.BannerRequest;
import com.flipkart.clone.productmanagement.dto.sitecontent.BannerResponse;
import com.flipkart.clone.productmanagement.dto.sitecontent.BestOfDealResponse;
import com.flipkart.clone.productmanagement.dto.sitecontent.BestOfDealRequest;
import com.flipkart.clone.productmanagement.service.sitecontent.SiteContentService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/site-content")
@Slf4j
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
   public List<BannerResponse> addAllBanners(@RequestPart MultipartFile[] files,
         @RequestBody String[] targetUrlList) {
      if (files.length != targetUrlList.length)
         throw new IllegalStateException("Please Make sure there is one to one mapping between files and target urls");
      // TODO: Create specific exception
      List<BannerRequest> bannerRequestList = new ArrayList<>();
      for (int i = 0; i < files.length; i++)
         bannerRequestList.add(BannerRequest.builder().targetHref(targetUrlList[i]).image(files[i]).build());

      return siteContentService.bulkCreateBanners(bannerRequestList);
   }

   @GetMapping(path = { "/best-of-deals/id/{id}" }, produces = MediaTypes.HAL_JSON_VALUE)
   public BestOfDealResponse getBestOfDealById(@PathVariable("id") String bestOfDealId) {
      return siteContentService.getBestOfDealById(bestOfDealId);
   }

   @PostMapping("/best-of-deals")
   public void createCategory(@RequestBody BestOfDealRequest bestOfDealRequest) {
      siteContentService.createBestOfDeal(bestOfDealRequest);
      log.info("BestOfDeal Created successfully!");
   }

   @GetMapping(path = "/best-of-deals",produces = MediaTypes.HAL_JSON_VALUE)
   public List<BestOfDealResponse> getBestOfDeals() {
      return siteContentService.getAllBestOfDeals();
   }

   @PostMapping("/best-of-deals/_bulk")
   public void addBestOfDeals(@RequestBody List<BestOfDealRequest> bestOfDealRequestList) {
      siteContentService.bulkCreateBestOfDeals(bestOfDealRequestList);
      log.info("bestOfDeals Created successfully!");
   }

}
