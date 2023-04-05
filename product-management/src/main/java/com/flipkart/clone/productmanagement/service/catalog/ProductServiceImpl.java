/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Tuesday, 4th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
package com.flipkart.clone.productmanagement.service.catalog;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Service;

import com.flipkart.clone.productmanagement.commons.exception.ProductNotFoundException;
import com.flipkart.clone.productmanagement.controller.ProductController;
import com.flipkart.clone.productmanagement.dto.catalog.CategoryRequest;
import com.flipkart.clone.productmanagement.dto.catalog.ProductRequest;
import com.flipkart.clone.productmanagement.dto.catalog.ProductResponse;
import com.flipkart.clone.productmanagement.model.catalog.Category;
import com.flipkart.clone.productmanagement.model.catalog.Product;
import com.flipkart.clone.productmanagement.repository.catalog.ProductRepository;
import com.github.slugify.Slugify;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryService categoryService;

    @Value("${frontend.web.origin}")
    private String frontendWebOrigin;

    // Mappers
    private Product productRequestToProductMapper(ProductRequest productRequest) {
        log.info(productRequest.toString());
        String productSlug = Slugify.builder().build()
                .slugify(UUID.randomUUID().toString() + "-" + productRequest.getName());
        Product product;
        URI frontendURI = URI.create(frontendWebOrigin);
        String productUrl = frontendURI.resolve(frontendURI.getPath() + '/' + productSlug).toString();
        product = Product.builder()
                .name(productRequest.getName())
                .slug(productSlug)
                .productUrl(productUrl)
                .categoryList(mapCategoryPathsToCategory(productRequest.getCategoryPaths()))
                .retailPrice(productRequest.getRetailPrice())
                .discountedPrice(productRequest.getDiscountedPrice())
                .imageUrlList(productRequest.getImageUrlList())
                .description(productRequest.getDescription())
                .brand(productRequest.getBrand())
                .productSpecifications(productRequest.getProductSpecifications())
                .build();
        return product;
    }

    private ProductResponse productToProductResponseMapper(Product product) {
        ProductResponse productResponse = ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .productUrl(product.getProductUrl())
                .categoryList(product.getCategoryList())
                .retailPrice(product.getRetailPrice())
                .discountedPrice(product.getDiscountedPrice())
                .imageUrlList(product.getImageUrlList())
                .description(product.getDescription())
                .brand(product.getBrand())
                .productSpecifications(product.getProductSpecifications())
                .build();
        try {
            productResponse.add(WebMvcLinkBuilder
                    .linkTo(WebMvcLinkBuilder.methodOn(ProductController.class).getProductById(productResponse.getId()))
                    .withSelfRel());
        } catch (ProductNotFoundException e) {
            e.printStackTrace();
        }
        return productResponse;
    }

    @Override
    public void createProduct(ProductRequest productRequest) {
        Product product = productRequestToProductMapper(productRequest);
        productRepository.save(product);

        log.info("ProductService: product has been saved successfully!");
    }

    private List<Category> mapCategoryPathsToCategory(List<CategoryRequest> categoryRequestList) {
        return categoryService.getValidatedCategories(categoryRequestList);
    }

    @Override
    public Page<ProductResponse> getAllProducts(int pageSize, int pageNumber, String sortBy, Direction order,
            String category) throws ProductNotFoundException {
        try {
            Pageable pagable = PageRequest.of(pageNumber, pageSize, order, sortBy);
            Page<Product> productsPage;
            if (category.trim().equals(""))
                productsPage = productRepository.findAll(pagable);
            else {
                List<ObjectId> categoryIdList = categoryService.getCategoryByName(category).stream()
                        .distinct()
                        .map(
                                categoryObj -> {
                                    return new ObjectId(categoryObj.getId());
                                })
                        .toList();
                log.info("Category List " + categoryIdList.toString());
                productsPage = productRepository.getProductsByCategoryIds(categoryIdList, pagable);
            }
            return productsPage.map(this::productToProductResponseMapper);
        } catch (Exception e) {
            throw new ProductNotFoundException(e.getMessage());
        }
    }

    @Override
    public ProductResponse getProductById(String productId) throws ProductNotFoundException {
        Optional<Product> productCheck = productRepository.findById(productId);
        ProductResponse productResponse;
        if (productCheck.isPresent()) {
            Product product = productCheck.get();
            productResponse = productToProductResponseMapper(product);
        } else {
            throw new ProductNotFoundException("Requested Product with Product Id " + productId + " Not Found");
        }
        log.info("ProductService: Returned Product successfully!");
        return productResponse;
    }

    @Override
    public void bulkCreateProducts(List<ProductRequest> productRequestList) {
        List<Product> products = productRequestList.stream()
                .map(this::productRequestToProductMapper)
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

    @Override
    public ProductResponse getProductBySlug(String productSlug) throws ProductNotFoundException {
        Optional<Product> productCheck = productRepository.findBySlug(productSlug);
        ProductResponse productResponse;
        if (productCheck.isPresent()) {
            Product product = productCheck.get();
            productResponse = productToProductResponseMapper(product);
        } else {
            throw new ProductNotFoundException("Requested Product with Product slug " + productSlug + " Not Found");
        }
        log.info("ProductService: Returned Product successfully!");
        return productResponse;
    }
}