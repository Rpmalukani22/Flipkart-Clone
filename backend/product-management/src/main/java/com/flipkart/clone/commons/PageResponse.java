package com.flipkart.clone.commons;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class PageResponse<T> {
    private List<T> content;
    private long totalElements;
    private int totalPages;
    private int page;
    private int size;

    @JsonCreator
    public PageResponse(@JsonProperty("totalElements") final long totalElements,
            @JsonProperty("totalPages") final int totalPages,
            @JsonProperty("page") final int page,
            @JsonProperty("size") final int size,
            @JsonProperty("content") final List<T> content) {
        this.setContent(content);
        this.setTotalElements(totalElements);
        this.setTotalPages(totalPages);
        this.setPage(page);
        this.setSize(size);
    }
}