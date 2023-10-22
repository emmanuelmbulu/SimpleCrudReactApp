package edu.miu.cs545.simplecrudprojectbackend.utils;

import lombok.Getter;

@Getter
public enum ProductErrorText {
    NULL_DATA("We could not find data to save for the new product."),

    PRODUCT_NOT_FIND("We could not find the product associated with the provided id."),

    TITLE_MISSING("Please provide a title for this product."),
    TITLE_EXISTING("We found another product with the same title. Make sure you are not trying to create the same product."),

    INVALID_PRICE("Please provide a valid amount for this product's price."),

    FAILED_SAVING("Something went wrong when trying to save this product. Please try again later!");

    private final String value;
    ProductErrorText(String text) {
        this.value = text;
    }

    @Override
    public String toString() {
        return value;
    }
}
