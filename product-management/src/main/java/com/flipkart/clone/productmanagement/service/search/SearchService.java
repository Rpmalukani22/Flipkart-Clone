package com.flipkart.clone.productmanagement.service.search;

import java.util.Map;

import org.opensearch.action.search.SearchRequest;
import org.opensearch.action.search.SearchResponse;
import org.opensearch.client.RequestOptions;
import org.opensearch.client.RestHighLevelClient;
import org.opensearch.index.query.BoolQueryBuilder;
import org.opensearch.index.query.QueryBuilders;
import org.opensearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SearchService {
    @Autowired
    private RestHighLevelClient client;

    public SearchResponse findAll(String query, Map<String, Object> filterMap,int from,int size, String... indices) throws Exception {

        SearchRequest searchRequest = new SearchRequest(indices);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        BoolQueryBuilder qb = QueryBuilders.boolQuery().must(QueryBuilders.multiMatchQuery(query, "*"));

        if (!filterMap.isEmpty()) {
            for (Map.Entry<String, Object> entry : filterMap.entrySet())
                qb.filter(QueryBuilders.matchQuery(entry.getKey(), entry.getValue()).minimumShouldMatch("100%"));
        }
        searchSourceBuilder.query(qb).from(from).size(size);
        searchRequest.source(searchSourceBuilder);
        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        return searchResponse;

    }

    // public SearchResponse findAll(String query,String... indices) throws
    // Exception {

    // SearchRequest searchRequest = new SearchRequest(indices);
    // SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
    // searchSourceBuilder.query(QueryBuilders.multiMatchQuery(query,"*"));
    // searchRequest.source(searchSourceBuilder);
    // SearchResponse searchResponse = client.search(searchRequest,
    // RequestOptions.DEFAULT);

    // return searchResponse;

    // }

}
