package com.flipkart.clone.productmanagement.service.payment;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.PaymentIntentCreateParams.Shipping.Address;

@Service
public class PaymentService {
        @Value("${stripe.secret.key}")
        String stripeSecretKey;

        public PaymentIntent createPaymentIntent(String amount, String currency) throws Exception {

                Stripe.apiKey = stripeSecretKey;

                PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                                .setAmount(Long.parseLong(amount))
                                .setCurrency(currency)
                                .addPaymentMethodType("card")
                                .setDescription("Flipkart Clone Payment Attempt")
                                .putMetadata("customer_name", "John Doe")
                                .setShipping(
                                                PaymentIntentCreateParams.Shipping.builder()
                                                                .setName("John Doe")
                                                                .setAddress(Address.builder()
                                                                                .setLine1("Addr1")
                                                                                .setLine2("Addr2")
                                                                                .setCity("Vadodara")
                                                                                .setState("Gujarat")
                                                                                .setPostalCode("390022")
                                                                                .setCountry("India")
                                                                                .build())
                                                                .build())

                                .build();

                return PaymentIntent.create(params);

        }
}
