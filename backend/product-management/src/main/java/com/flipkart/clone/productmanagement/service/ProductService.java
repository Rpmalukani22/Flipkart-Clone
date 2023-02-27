package com.flipkart.clone.productmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flipkart.clone.productmanagement.dto.ProductRequest;
import com.flipkart.clone.productmanagement.entity.Product;
import com.flipkart.clone.productmanagement.repository.ProductRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    public void createProduct(ProductRequest productRequest) {
        Product product = Product.builder()
                                 .productUrl(productRequest.getProductUrl())
                                 .category(productRequest.getCategory())
                                 .retailPrice(productRequest.getRetailPrice())
                                 .discountedPrice(productRequest.getDiscountedPrice())
                                 .imageUrls(productRequest.getImageUrls())
                                 .description(productRequest.getDescription())
                                 .brand(productRequest.getBrand())
                                 .productSpecifications(productRequest.getProductSpecifications())
                                 .build();

        productRepository.save(product);
        log.info("ProductService: product has been saved successfully!");
    }
}
