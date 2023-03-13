package com.flipkart.clone.productmanagement.service.sitecontent;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    // TODO: Exception Handling
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
                .imgFileName(fileName)
                .targetHref(bannerRequest.getTargetHref())
                .build();
    }

    private List<Banner> bulkBannerRequestToBannerMapper(List<BannerRequest> bannerRequestList) {
        List<MultipartFile> fileList = bannerRequestList.stream().map(BannerRequest::getImage).toList();
        List<File> tempFiles = fileList.stream().map(FileUtil::convertMultiPartFileToFile).toList();
        List<String> fileNameList = tempFiles.stream().map(File::getName).toList();
        s3Service.saveAllObjects(mediaBucket, bannersPath, tempFiles).join();
        List<Banner> banners = new ArrayList<>();
        for (int i = 0; i < bannerRequestList.size(); i++) {
            BannerRequest bannerRequest = bannerRequestList.get(i);
            String fileName = fileNameList.get(i);
            banners.add(Banner.builder()
                    .imgUrl((WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(S3Controller.class)
                            .getObjectByName(mediaBucket,
                                    FileUtil.cleanPath(String.join("/", bannersPath, fileName), "/", false))))
                            .toString())
                    .imgFileName(fileName)
                    .targetHref(bannerRequest.getTargetHref())
                    .build());
        }
        return banners;
    }

    private BannerResponse bannerToBannerResponse(Banner banner) {
        BannerResponse bannerResponse = BannerResponse.builder()
                .id(banner.getId())
                .imgUrl(banner.getImgUrl())
                .imgFileName(banner.getImgFileName())
                .targetHref(banner.getTargetHref())
                .build();
        bannerResponse.add(WebMvcLinkBuilder
                .linkTo(WebMvcLinkBuilder.methodOn(SiteContentController.class).getBannerById(bannerResponse.getId()))
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
        return bannerRepository.insert(bulkBannerRequestToBannerMapper(bannerRequestList)).stream()
                .map(this::bannerToBannerResponse).toList();
    }

    @Override
    public void removeBannerById(String bannerId) {
        Optional<Banner> bannerCheck = bannerRepository.findById(bannerId);
        if (!bannerCheck.isPresent())
            throw new IllegalStateException("404 not found."); // TODO: replace with specific class
        String key = FileUtil.cleanPath(String.join("/", bannersPath, bannerCheck.get().getImgFileName()), "/", false);
        s3Service.deleteObjectByKey(mediaBucket, key);
        bannerRepository.deleteById(bannerId);
    }

    @Override
    public BannerResponse getBannerById(String bannerId) {
        Optional<Banner> bannerCheck = bannerRepository.findById(bannerId);
        if (bannerCheck.isPresent())
            return bannerToBannerResponse(bannerCheck.get());
        else
            throw new IllegalStateException("404 not found."); // TODO: replace with specific class
    }

}
