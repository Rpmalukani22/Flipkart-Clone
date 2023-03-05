package com.flipkart.clone.productmanagement.service;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.flipkart.clone.commons.PageResponse;
import com.flipkart.clone.productmanagement.dto.CategoryRequest;
import com.flipkart.clone.productmanagement.dto.ProductRequest;
import com.flipkart.clone.productmanagement.dto.ProductResponse;
import com.flipkart.clone.productmanagement.entity.Category;
import com.flipkart.clone.productmanagement.entity.Product;
import com.flipkart.clone.productmanagement.repository.ProductRepository;
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

    @Override
    public void createProduct(ProductRequest productRequest) {
        String productSlug = Slugify.builder().build().slugify(productRequest.getName());
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
        productRepository.save(product);

        log.info("ProductService: product has been saved successfully!");
    }

    private List<Category> mapCategoryPathsToCategory(List<CategoryRequest> categoryRequestList) {
        return categoryService.getValidatedCategories(categoryRequestList);
    }

    @Override
    public PageResponse<ProductResponse> getAllProducts(int pageSize, int pageNumber, String sortBy, Direction order) {
        Pageable pagable = PageRequest.of(pageNumber, pageSize, order, sortBy);
        Page<Product> productsPage = productRepository.findAll(pagable);
        List<Product> products = productsPage.getContent();
        List<ProductResponse> responseContent = products.stream().map(product -> ProductResponse.builder()
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
                .build()).toList();
        return new PageResponse<>(productsPage.getTotalElements(), productsPage.getTotalPages(),
                pageNumber, pageSize, responseContent);
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
                    .categoryList(product.getCategoryList())
                    .retailPrice(product.getRetailPrice())
                    .discountedPrice(product.getDiscountedPrice())
                    .imageUrlList(product.getImageUrlList())
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
        Slugify slugify = Slugify.builder().build();
        URI frontendURI = URI.create(frontendWebOrigin);
        List<Product> products = productRequestList.stream()
                .map((ProductRequest productRequest) -> {
                    String productSlug = slugify.slugify(productRequest.getName());
                    String productUrl = frontendURI.resolve(frontendURI.getPath() + '/' + productSlug).toString();
                    return Product.builder()
                            .name(productRequest.getName())
                            .slug(productSlug)
                            .productUrl(productUrl)
                            .categoryList(mapCategoryPathsToCategory(productRequest.getCategoryPaths()))
                            .retailPrice(productRequest.getRetailPrice())
                            .discountedPrice(productRequest.getDiscountedPrice())
                            .imageUrlList(productRequest.getImageUrlList())
                            .description(productRequest.getDescription())
                            .brand(productRequest.getBrand())
                            .productSpecifications(productRequest.getProductSpecifications()).build();
                })
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
