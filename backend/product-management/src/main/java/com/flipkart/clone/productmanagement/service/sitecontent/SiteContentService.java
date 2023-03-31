package com.flipkart.clone.productmanagement.service.sitecontent;

import java.util.List;

import com.flipkart.clone.productmanagement.dto.sitecontent.BannerRequest;
import com.flipkart.clone.productmanagement.dto.sitecontent.BannerResponse;
import com.flipkart.clone.productmanagement.dto.sitecontent.BestOfDealRequest;
import com.flipkart.clone.productmanagement.dto.sitecontent.BestOfDealResponse;

public interface SiteContentService {

    // Banner Specific Services

    public List<BannerResponse> getBanners();

    public BannerResponse getBannerById(String bannerId);

    public BannerResponse createBanner(BannerRequest bannerRequest);

    public List<BannerResponse> bulkCreateBanners(List<BannerRequest> bannerRequestList);

    public void removeBannerById(String bannerId);

    public List<BestOfDealResponse> getAllBestOfDeals();

    public BestOfDealResponse getBestOfDealById(String bestOfDealId);

    public void createBestOfDeal(BestOfDealRequest bestOfDealRequest);

    public void bulkCreateBestOfDeals(List<BestOfDealRequest> bestOfDealRequestList);

    public void removeBestOfDealById(String bestOfDealId);

}
