// package com.flipkart.clone.productmanagement.component;

// import com.stripe.Stripe;
// import com.stripe.model.Charge;
// import com.stripe.model.Customer;
// import com.stripe.model.PaymentIntent;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Component;
// import java.util.HashMap;
// import java.util.Map;

// @Component
// public class StripeClient {

//     @Autowired
//     StripeClient(@Value("${stripe.secret.key}") String stripeSecretKey) {
//         Stripe.apiKey = stripeSecretKey;
//     }

//     public Customer createCustomer(String token, String email) throws Exception {
//         Map<String, Object> customerParams = new HashMap<>();
//         customerParams.put("email", email);
//         customerParams.put("source", token);
//         return Customer.create(customerParams);
//     }

//     private Customer getCustomer(String id) throws Exception {
//         return Customer.retrieve(id);
//     }

//     public PaymentIntent chargeNewCard(String token, double amount) throws Exception {
//         Map<String, Object> params = new HashMap<>();
//         params.put("amount", (int) (amount * 100));
//         params.put("currency", "USD");
//         params.put("source", token);
//         PaymentIntent paymentIntent = PaymentIntent.create(params);
//         return paymentIntent;
//     }

//     public PaymentIntent chargeCustomerCard(String customerId, int amount) throws Exception {
//         String sourceCard = getCustomer(customerId).getDefaultSource();
//         Map<String, Object> params = new HashMap<>();
//         params.put("amount", amount);
//         params.put("currency", "USD");
//         params.put("customer", customerId);
//         params.put("source", sourceCard);
//         PaymentIntent paymentIntent = PaymentIntent.create(params);

//         return paymentIntent;
//     }
// }