/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Tuesday, 4th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
package com.flipkart.clone.productmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAsync
public class ProductManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductManagementApplication.class, args);
	}

}
