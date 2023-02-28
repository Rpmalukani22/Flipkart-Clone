package com.flipkart.clone.productmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.flipkart.clone.productmanagement.dto.ProductRequest;
import com.flipkart.clone.productmanagement.dto.ProductResponse;
import com.flipkart.clone.productmanagement.entity.Product;
import com.flipkart.clone.productmanagement.repository.ProductRepository;
import com.github.slugify.Slugify;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;

    @Override
    public void createProduct(ProductRequest productRequest) {
        Product product = Product.builder()
                .name(productRequest.getName())
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

    @Override
    public List<ProductResponse> getAllProducts(int pageSize, int pageNumber, String sortBy, Direction order) {
        Pageable pagable = PageRequest.of(pageNumber, pageSize, order, sortBy);
        Page<Product> productsPage = productRepository.findAll(pagable);
        List<Product> products = productsPage.getContent();
        return products.stream().map(product -> ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .productUrl(product.getProductUrl())
                .category(product.getCategory())
                .retailPrice(product.getRetailPrice())
                .discountedPrice(product.getDiscountedPrice())
                .imageUrls(product.getImageUrls())
                .description(product.getDescription())
                .brand(product.getBrand())
                .productSpecifications(product.getProductSpecifications())
                .build()).toList();
    }

    @Override
    public ProductResponse getProductById(String productId) {
        Optional<Product> productCheck = productRepository.findById(productId);
        ProductResponse productResponse;
        if (productCheck.isPresent()) {
            Product product = productCheck.get();
            productResponse = ProductResponse.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .slug(product.getSlug())
                    .productUrl(product.getProductUrl())
                    .category(product.getCategory())
                    .retailPrice(product.getRetailPrice())
                    .discountedPrice(product.getDiscountedPrice())
                    .imageUrls(product.getImageUrls())
                    .description(product.getDescription())
                    .brand(product.getBrand())
                    .productSpecifications(product.getProductSpecifications())
                    .build();
        } else {
            // TODO: raise 404
            return null;
        }
        log.info("ProductService: Returned Product successfully!");
        return productResponse;
    }

    @Override
    public void bulkCreateProducts(List<ProductRequest> productRequestList) {
        List<Product> products = productRequestList.stream()
                .map(productRequest -> Product.builder()
                        .name(productRequest.getName())
                        .slug(Slugify.builder().build().slugify(productRequest.getName()))
                        .productUrl(productRequest.getProductUrl())
                        .category(productRequest.getCategory())
                        .retailPrice(productRequest.getRetailPrice())
                        .discountedPrice(productRequest.getDiscountedPrice())
                        .imageUrls(productRequest.getImageUrls())
                        .description(productRequest.getDescription())
                        .brand(productRequest.getBrand())
                        .productSpecifications(productRequest.getProductSpecifications()).build())
                .toList();

        productRepository.insert(products);
        log.info("All Products were added successfully!");
    }

    @Override
    public void removeProductById(String productId) {
        productRepository.deleteById(productId);
        log.info("Product Deleted Successfully!");
    }

    @Override
    public void bulkRemoveProducts(List<String> productIdList) {
        productRepository.deleteAllById(productIdList);
        log.info("Products Deleted Successfully!");
    }
}
