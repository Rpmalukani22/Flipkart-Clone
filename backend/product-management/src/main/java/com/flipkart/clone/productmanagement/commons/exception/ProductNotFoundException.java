package com.flipkart.clone.productmanagement.commons.exception;

public class ProductNotFoundException extends Exception {

    public ProductNotFoundException(String messageString) {
        super(messageString);
    }

    public ProductNotFoundException(Throwable throwable) {
        super(throwable);
    }

}
