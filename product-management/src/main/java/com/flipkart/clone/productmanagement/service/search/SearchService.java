package com.flipkart.clone.productmanagement.service.search;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.apache.lucene.document.Document;
import org.opensearch.action.search.SearchRequest;
import org.opensearch.action.search.SearchResponse;
import org.opensearch.client.RequestOptions;
import org.opensearch.client.RestHighLevelClient;
import org.opensearch.index.query.BoolQueryBuilder;
import org.opensearch.index.query.MultiMatchQueryBuilder;
import org.opensearch.index.query.QueryBuilders;
import org.opensearch.search.builder.SearchSourceBuilder;
import org.opensearch.search.sort.FieldSortBuilder;
import org.opensearch.search.sort.SortBuilder;
import org.opensearch.search.sort.SortOrder;
import org.opensearch.search.suggest.Suggest;
import org.opensearch.search.suggest.SuggestBuilder;
import org.opensearch.search.suggest.SuggestBuilders;
import org.opensearch.search.suggest.Suggest.Suggestion;
import org.opensearch.search.suggest.completion.CompletionSuggestion;
import org.opensearch.search.suggest.completion.CompletionSuggestionBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SearchService {
    @Autowired
    private RestHighLevelClient client;

    public SearchResponse findAll(String query, Map<String, Object> filterMap, int from, int size, String sortField,
            String sortOrder, String... indices) throws Exception {

        SearchRequest searchRequest = new SearchRequest(indices);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        BoolQueryBuilder qb = QueryBuilders.boolQuery()
                .must(QueryBuilders.multiMatchQuery(query, "*").type(MultiMatchQueryBuilder.Type.CROSS_FIELDS));

        if (!filterMap.isEmpty()) {
            for (Map.Entry<String, Object> entry : filterMap.entrySet())
                qb.filter(QueryBuilders.matchQuery(entry.getKey(), entry.getValue()).minimumShouldMatch("100%"));
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

    public List<String> autoComplete(String prefix,String... indices) {
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
