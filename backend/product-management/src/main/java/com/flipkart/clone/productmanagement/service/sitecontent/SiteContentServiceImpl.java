package com.flipkart.clone.productmanagement.service.sitecontent;

import java.io.File;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.core.ControllerEntityLinks;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Service;

import com.flipkart.clone.productmanagement.commons.utility.FileUtil;
import com.flipkart.clone.productmanagement.controller.S3Controller;
import com.flipkart.clone.productmanagement.controller.SiteContentController;
import com.flipkart.clone.productmanagement.dto.sitecontent.BannerRequest;
import com.flipkart.clone.productmanagement.dto.sitecontent.BannerResponse;
import com.flipkart.clone.productmanagement.model.sitecontent.Banner;
import com.flipkart.clone.productmanagement.repository.sitecontent.BannerRepository;
import com.flipkart.clone.productmanagement.service.storage.S3Service;

@Service
public class SiteContentServiceImpl implements SiteContentService {
    @Autowired
    BannerRepository bannerRepository;
    @Autowired
    S3Service s3Service;
    @Value("${s3.flipkart.media.bucket.name}")
    String mediaBucket;
    @Value("${s3.flipkart.media.bucket.banners.path}")
    String bannersPath;

    // Utility Functions

    private Banner bannerRequestToBannerMapper(BannerRequest bannerRequest) {
        File tempFile = FileUtil.convertMultiPartFileToFile(bannerRequest.getImage());
        final String fileName = tempFile.getName();
        s3Service.saveObject(mediaBucket, bannersPath, tempFile);
        return Banner.builder()
                .imgUrl((WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(S3Controller.class)
                        .getObjectByName(mediaBucket,
                                FileUtil.cleanPath(String.join("/", bannersPath, fileName), "/", false))))
                        .toString())
                .targetHref(bannerRequest.getTargetHref())
                .build();
    }

    private BannerResponse bannerToBannerResponse(Banner banner) {
        BannerResponse bannerResponse = BannerResponse.builder()
                .id(banner.getId())
                .imgUrl(banner.getImgUrl())
                .targetHref(banner.getTargetHref())
                .build();
        bannerResponse.add(WebMvcLinkBuilder.linkTo(SiteContentController.class)
                .slash(bannerResponse.getId())
                .withSelfRel());
        return bannerResponse;

    }

    @Override
    public List<BannerResponse> getBanners() {
        return bannerRepository.findAll().stream().map(this::bannerToBannerResponse).toList();
    }

    @Override
    public BannerResponse createBanner(BannerRequest bannerRequest) {
        Banner banner = bannerRepository.insert(bannerRequestToBannerMapper(bannerRequest));
        return bannerToBannerResponse(banner);
    }

    @Override
    public List<BannerResponse> bulkCreateBanners(List<BannerRequest> bannerRequestList) {
        List<Banner> bannerList = bannerRepository
                .insert(bannerRequestList.stream().map(this::bannerRequestToBannerMapper).toList());
        return bannerList.stream().map(this::bannerToBannerResponse).toList();
    }

    @Override
    public void removeBannerById(String bannerId) {
        bannerRepository.deleteById(bannerId);
    }

    @Override
    public BannerResponse getBannerById(String id) {
        Optional<Banner> bannerCheck = bannerRepository.findById(id);
        if (bannerCheck.isPresent())
            return bannerToBannerResponse(bannerCheck.get());
        else
            throw new IllegalStateException("404 not found."); // TODO: replace with specific class
    }

}
