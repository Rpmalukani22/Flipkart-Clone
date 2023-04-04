/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Tuesday, 4th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
package com.flipkart.clone.productmanagement.commons.exception;

public class ProductNotFoundException extends Exception {

    public ProductNotFoundException(String messageString) {
        super(messageString);
    }

    public ProductNotFoundException(Throwable throwable) {
        super(throwable);
    }

}
