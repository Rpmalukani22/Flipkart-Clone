import os
import json
import pathlib
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urlencode
from selenium.webdriver.common.by import By


def sample_products_from_categories(browser, scroll):
    with open(
        os.path.join(pathlib.Path(__file__).parent.parent, "categories.json"), "r"
    ) as f:
        categories = json.load(f)
    product_details = []
    for idx in range(len(categories)):
        print("Getting Sample Products from Category Index...",idx)
        category=categories[idx]
        inner_most_sub_categories = get_inner_most_category(category)
        for sub_category in inner_most_sub_categories:
            # print(sub_category["url"])
            product_url_lst = get_products_urls_sample(browser, sub_category["url"])
            for product_url in product_url_lst:
                details = get_product_details(browser, scroll, product_url)
                if details:
                    product_details.append(details)
        with open(os.path.join(pathlib.Path(__file__).parent.parent, "products.json"), "w") as f:
            json.dump(product_details, f)

def get_inner_most_category(category):
    if not category["sub-categories"]:
        return [category]
    inner_most_categories = []
    for sub_category in category["sub-categories"]:
        inner_most_categories.extend(get_inner_most_category(sub_category))
    return inner_most_categories


def get_product_details(browser, scroll, product_url):
    try:
        browser.get(product_url)
        # browser.implicitly_wait(20)
        scroll(8)
        # Scrap category path
        category_path = get_product_category_path(browser)
        # Scrap media urls
        product_media_urls = get_product_media_urls(browser)
        # Scrap product's other details
        product_dict = get_product_details_util(product_url)
        product_dict["category_path"] = category_path
        if product_media_urls:
            product_dict["thumbnails"] = product_media_urls 
        return product_dict
    except Exception as e:
        print("Error for Product URL " + product_url)
        print("Exception ", e)


def get_product_category_path(browser):
    category_path_box = browser.find_element(By.CLASS_NAME, "_1MR4o5")
    category_path_list = []
    for path_anchor in category_path_box.find_elements(By.CSS_SELECTOR, "*"):
        inner_html = path_anchor.get_attribute("innerHTML")
        text_elements = BeautifulSoup(inner_html, "html.parser").findAll(text=True)
        text = "".join(
            list(
                filter(
                    lambda element: element.parent.name == "[document]", text_elements
                )
            )
        ).strip()
        if text:
            category_path_list.append(text)
    print(category_path_list)
    return ">>".join(category_path_list)


def get_product_media_urls(browser):
    urls = []
    try:
        media_box = browser.find_element(By.CLASS_NAME, "_2FHWw4")
        for media in media_box.find_elements(By.CSS_SELECTOR, "[src]"):
            urls.append(media.get_attribute("src"))
    except Exception as e:
        pass
    return urls


def get_product_details_util(product_url):
    """_summary_
         Utility function to get flipkart product details from product url using following repository : https://github.com/dvishal485/flipkart-scraper-api
    Args:
        url (str): Flipkart Product Url

    Returns:
        dict: Fetched Product Details
    """
    return requests.get(
        f"https://flipkart.dvishal485.workers.dev/product/{urlparse(product_url).path}"
    ).json()


def get_products_urls_sample(browser, category_url, pages=2):
    product_urls = []
    try:
        for page_no in range(1, pages + 1):
            page_url = category_url
            page_url += ("&" if urlparse(category_url).query else "?") + urlencode(
                {"page": page_no}
            )
            print(page_url)
            browser.get(page_url)
            product_items_rows = browser.find_elements(By.CLASS_NAME, "_13oc-S")
            for row in product_items_rows:
                for anchor in row.find_elements(By.TAG_NAME, "a"):
                    product_url = anchor.get_attribute("href")
                    if product_url:
                        product_urls.append(
                            "https://www.flipkart.com/" + product_url
                            if "flipkart.com" not in product_url
                            else product_url
                        )
    except Exception as e:
        print("Error from get products urls sample",e)
    return list(set(product_urls))
