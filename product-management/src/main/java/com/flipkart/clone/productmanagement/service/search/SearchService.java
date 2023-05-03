package com.flipkart.clone.productmanagement.service.search;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.opensearch.action.search.SearchRequest;
import org.opensearch.action.search.SearchResponse;
import org.opensearch.client.RequestOptions;
import org.opensearch.client.RestHighLevelClient;
import org.opensearch.common.unit.Fuzziness;
import org.opensearch.index.query.BoolQueryBuilder;
import org.opensearch.index.query.MultiMatchQueryBuilder;
import org.opensearch.index.query.QueryBuilders;
import org.opensearch.search.aggregations.AggregationBuilders;
import org.opensearch.search.aggregations.bucket.terms.Terms;
import org.opensearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.opensearch.search.builder.SearchSourceBuilder;
import org.opensearch.search.sort.FieldSortBuilder;
import org.opensearch.search.sort.SortOrder;
import org.opensearch.search.suggest.Suggest;
import org.opensearch.search.suggest.SuggestBuilder;
import org.opensearch.search.suggest.completion.CompletionSuggestion;
import org.opensearch.search.suggest.completion.CompletionSuggestionBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SearchService {
    @Autowired
    private RestHighLevelClient client;

    public SearchResponse findAll(String query, Map<String, String[]> filterMap, int from, int size, String sortField,
            String sortOrder, String... indices) throws Exception {

        SearchRequest searchRequest = new SearchRequest(indices);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        BoolQueryBuilder qb = QueryBuilders.boolQuery()
                .must(QueryBuilders.multiMatchQuery(query, "*")
                        .fuzziness(Fuzziness.AUTO).type(MultiMatchQueryBuilder.Type.MOST_FIELDS));

        if (!filterMap.isEmpty()) {
            for (Map.Entry<String, String[]> entry : filterMap.entrySet()) {
                log.info("entry ..." + entry.getKey() + " " + entry.getValue()[0]);
                qb.filter(QueryBuilders.termsQuery(entry.getKey(), entry.getValue()))
                        .minimumShouldMatch("100%");
            }
        }
        if (sortField == null)
            searchSourceBuilder.query(qb).from(from).size(size);
        else
            searchSourceBuilder.query(qb)
                    .sort(new FieldSortBuilder(sortField)
                            .order(sortOrder.equalsIgnoreCase("desc") ? SortOrder.DESC : SortOrder.ASC))
                    .from(from).size(size);
        searchRequest.source(searchSourceBuilder);
        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        return searchResponse;

    }

    public List<Map<String,Object>> getUniqueFieldValues(String field, String query, String[] fields ,String... indices) throws Exception {

        SearchRequest searchRequest = new SearchRequest(indices);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        if (!query.trim().equals("")) {
            BoolQueryBuilder qb = QueryBuilders.boolQuery()
                    .must(QueryBuilders.multiMatchQuery(query, fields)
                            .fuzziness(Fuzziness.AUTO).type(MultiMatchQueryBuilder.Type.MOST_FIELDS));

            searchSourceBuilder.query(qb);
        }
        searchSourceBuilder.size(0);
        TermsAggregationBuilder termsAggregationBuilder = AggregationBuilders.terms("distinct_" + field)
                .field(field)
                .size(100000);
        searchSourceBuilder.aggregation(termsAggregationBuilder);

        searchRequest.source(searchSourceBuilder);
        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        Terms terms = searchResponse.getAggregations().get("distinct_" + field);
        List<Map<String,Object>> results = new ArrayList<>();
        for(Terms.Bucket b : terms.getBuckets()){
            Map<String,Object> bucketItem = new HashMap<>(); 
            bucketItem.put(b.getKey().toString(), b.getDocCount());
            results.add(bucketItem); 
        }
        return results;
    }

    public List<String> autoComplete(String prefix, String... indices) {
        SearchRequest searchRequest = new SearchRequest(indices);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        CompletionSuggestionBuilder suggestionBuilder = new CompletionSuggestionBuilder("name")
                .prefix(prefix)
                .size(10)
                .skipDuplicates(true);

        SuggestBuilder suggestBuilder = new SuggestBuilder();
        suggestBuilder.addSuggestion("autocomplete", suggestionBuilder);

        searchSourceBuilder.suggest(suggestBuilder);
        searchRequest.source(searchSourceBuilder);

        List<String> suggestionStrings = new ArrayList<>();
        try {
            SearchResponse searchResponse = null;
            Suggest suggest = null;
            CompletionSuggestion suggestion = null;
            searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
            suggest = searchResponse.getSuggest();
            suggestion = suggest.getSuggestion("autocomplete");
            List<CompletionSuggestion.Entry> entryList = suggestion.getEntries();
            if (entryList != null) {
                CompletionSuggestion.Entry entry = entryList.get(0);
                List<CompletionSuggestion.Entry.Option> options = entry.getOptions();
                if (options != null) {
                    for (CompletionSuggestion.Entry.Option o : options)
                        suggestionStrings.add(o.getText().string());
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        return suggestionStrings;
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
