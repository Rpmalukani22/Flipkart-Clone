package com.flipkart.clone.productmanagement.service.sitecontent;

import java.util.List;

import com.flipkart.clone.productmanagement.dto.sitecontent.BannerRequest;
import com.flipkart.clone.productmanagement.dto.sitecontent.BannerResponse;

public interface SiteContentService {

    // Banner Specific Services

    public List<BannerResponse> getBanners();

    public BannerResponse getBannerById(String bannerId);

    public BannerResponse createBanner(BannerRequest bannerRequest);

    public List<BannerResponse> bulkCreateBanners(List<BannerRequest> bannerRequestList);

    public void removeBannerById(String bannerId);

}
