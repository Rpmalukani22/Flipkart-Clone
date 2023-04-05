'''
Author: Ruchitesh Malukani
Modified By: Ruchitesh Malukani
Last Modified: Wednesday, 5th April 2023
-----
Copyright (c) 2023 Ruchitesh Malukani
'''
import os
import json
import pathlib
from selenium.webdriver.common.by import By


def get_category_tree(browser, scroll):
    """
    Creates json of category tree.

    Args:
        browser (WebDriver): Selenium WebDriver
        scroll (function): Function to scroll down
    Returns:
        void: saves categories in json file.
    """
    browser.get(
        "https://www.flipkart.com/all-categories/pr?sid=search.flipkart.com")
    browser.implicitly_wait(20)
    browser.refresh()
    scroll()

    # Scrapping List of Categories

    categories = []

    show_more_button = browser.find_element(By.CLASS_NAME, "_3OwxoU")

    browser.execute_script("arguments[0].click();", show_more_button)

    for category_anchor_tag in browser.find_elements(By.CLASS_NAME, "_1jJQdf"):
        try:
            category = {}
            category["name"] = category_anchor_tag.get_attribute("innerHTML")
            category["url"] = category_anchor_tag.get_attribute("href")
            # print(category)
            category["sub-categories"] = extract_sub_categories(
                browser, category, 0, -1, 2
            )
            categories.append(category)
            browser.switch_to.window(browser.window_handles[0])
        except Exception as e:
            pass
    with open(
        os.path.join(pathlib.Path(__file__).parent.parent,
                     "scrapped_data", "categories.json"), "w"
    ) as f:
        json.dump(categories, f)


def extract_sub_categories(browser, category, depth=0, max_depth=-1, max_span=-1):
    """
    Recursive Function to scrap sub-categories of given category.

    Args:
        browser (WebDriver): Selenium WebDriver
        category (dict): Category dict containing category name and url
        depth (int, optional): Current Recursion depth. Defaults to 0.
        max_depth (int, optional): Max allowed recursion depth. This parameter limits category path length. Defaults to -1 i.e (infinite depth)
        max_span (int, optional): Max allowed subcategory for each category. Defaults to -1 i.e (infinite span)

    Returns:
        list: List of subcategory dicts.
    """
    if depth == max_depth:
        return []
    sub_categories = []
    browser.execute_script("window.open(arguments[0])", category["url"])
    browser.switch_to.window(browser.window_handles[-1])
    try:
        show_more_sub_button = browser.find_element(By.CLASS_NAME, "_1WMVGk")
        browser.execute_script("arguments[0].click();", show_more_sub_button)
    except Exception as e:
        pass
    for idx, sub_category_anchor_tag in enumerate(
        browser.find_elements(By.CLASS_NAME, "_2SqgSY")
    ):
        if idx == max_span:
            break
        # print(sub_category_anchor_tag.tag_name)
        if sub_category_anchor_tag.tag_name != "a":
            continue
        sub_category = {}
        sub_category["name"] = sub_category_anchor_tag.get_attribute(
            "innerHTML")
        sub_category["url"] = sub_category_anchor_tag.get_attribute("href")
        print(sub_category)
        sub_category["sub-categories"] = extract_sub_categories(
            browser, sub_category, depth + 1, max_depth, max_span
        )
        sub_categories.append(sub_category)
    browser.close()
    browser.switch_to.window(browser.window_handles[-1])
    return sub_categories
