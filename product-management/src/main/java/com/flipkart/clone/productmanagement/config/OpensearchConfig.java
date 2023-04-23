/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Tuesday, 4th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
package com.flipkart.clone.productmanagement.config;

import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;

import javax.net.ssl.SSLContext;

import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.ssl.SSLContexts;
import org.opensearch.client.RestClient;
import org.opensearch.client.RestClientBuilder;
import org.opensearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpensearchConfig {

    @Value("${opensearch.hostname}")
    private String openSearchHostName;
    @Value("${opensearch.port}")
    private int openSearchPort;
    @Value("${opensearch.connectionScheme}")
    private String connectionScheme;

    @Bean(destroyMethod = "close")
    public RestHighLevelClient client() {
        final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY,
                new UsernamePasswordCredentials("admin", "admin"));
        RestClientBuilder builder = RestClient
                .builder(new HttpHost(openSearchHostName, openSearchPort, connectionScheme))
                .setRequestConfigCallback(
                        reqConfigCallBack -> reqConfigCallBack.setConnectTimeout(30000).setSocketTimeout(30000))
                .setHttpClientConfigCallback(httpClientConfigCallback -> httpClientConfigCallback
                        .setDefaultCredentialsProvider(credentialsProvider)
                        .setSSLHostnameVerifier((s, sslSession) -> true));
        try {
            SSLContext sslContext = SSLContexts.custom()
                    .loadTrustMaterial(null, (certificate, authType) -> true)
                    .build();
            builder.setHttpClientConfigCallback(
                    httpClientConfigCallback -> httpClientConfigCallback.setSSLContext(sslContext)
                            .setDefaultCredentialsProvider(credentialsProvider)
                            .setSSLHostnameVerifier((s, sslSession) -> true));
        } catch (KeyManagementException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (KeyStoreException e) {
            e.printStackTrace();
        }

        return new RestHighLevelClient(builder);
    }

}
