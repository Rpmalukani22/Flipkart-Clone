/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Tuesday, 4th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
package com.flipkart.clone.productmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flipkart.clone.productmanagement.service.payment.PaymentService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Value("${stripe.secret.key}")
    String stripeSecretKey;

    @PostMapping("/create-payment-intent")
    public String createPaymentIntent(@RequestParam String amount, @RequestParam String currency)
            throws Exception {
        return paymentService.createPaymentIntent(amount, currency).getClientSecret();
    }

    @PostMapping("/webhook")
    public String handleWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        Event event = null;
        try {
            event = Webhook.constructEvent(payload, sigHeader, stripeSecretKey);
        } catch (SignatureVerificationException e) {
            log.warn("Invalid signature.");
            return "";
        }
        switch (event.getType()) {
            case "payment_intent.succeeded":
                log.info("PaymentIntent was successful.");
                break;
            default:
                log.info("Unhandled event type: " + event.getType());
                break;
        }
        return "";
    }

}
