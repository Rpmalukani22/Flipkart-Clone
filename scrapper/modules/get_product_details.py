import json
import os
import pathlib
import re
from urllib.parse import urlencode, urlparse

import pandas as pd
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By


def sample_products_from_categories(browser, scroll):
    with open(
        os.path.join(
            pathlib.Path(__file__).parent.parent, "scrapped_data", "categories.json"
        ),
        "r",
    ) as f:
        categories = json.load(f)
    product_details = []
    product_urls = []
    if not os.path.exists(
        os.path.join(
            pathlib.Path(__file__).parent.parent, "scrapped_data", "product_urls.json"
        )
    ):
        for idx in range(len(categories)):
            category = categories[idx]
            print("Getting Product urls from...", category, idx)
            inner_most_sub_categories = get_inner_most_category(category)
            for sub_category in inner_most_sub_categories:
                product_url_lst = get_products_urls_sample(browser, sub_category["url"])
                product_urls.extend(product_url_lst)
        with open(
            os.path.join(
                pathlib.Path(__file__).parent.parent,
                "scrapped_data",
                "product_urls.json",
            ),
            "w",
        ) as f:
            json.dump(product_urls, f)

    else:
        with open(
            os.path.join(
                pathlib.Path(__file__).parent.parent,
                "scrapped_data",
                "product_urls.json",
            ),
            "r",
        ) as f:
            product_urls = json.load(f)

    print("len of product urls ", len(product_urls))

    if not os.path.exists(
        os.path.join(
            pathlib.Path(__file__).parent.parent, "scrapped_data", "products.json"
        )
    ):
        with open(
            os.path.exists(
                os.path.join(
                    pathlib.Path(__file__).parent.parent,
                    "scrapped_data",
                    "products.json",
                )
            ),
            "w",
        ) as f:
            json.dump([], f)

    product_details = []
    for idx in range(0, len(product_urls)):
        product_url = product_urls[idx]
        details = get_product_details(browser, scroll, product_url)
        if details:
            product_details.append(details)
        if idx % 10 == 0 or idx == len(product_urls) - 1:
            print("Saving at index.....", idx)
            existing_products = []
            with open(
                os.path.join(
                    pathlib.Path(__file__).parent.parent,
                    "scrapped_data",
                    "products.json",
                ),
                "r",
            ) as f:
                existing_products = json.load(f)
            existing_products.extend(product_details)
            with open(
                os.path.join(
                    pathlib.Path(__file__).parent.parent,
                    "scrapped_data",
                    "products.json",
                ),
                "w",
            ) as f:
                json.dump(existing_products, f)
            product_details = []


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
        scroll(8)
        product_dict = scrape_product_details(browser)
        return product_dict
    except Exception as e:
        print("Error for Product URL " + product_url)
        print("Exception ", e)


def get_product_category_path(browser, return_brand=False):
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
    if not return_brand:
        return ">>".join(category_path_list)
    else:
        return ">>".join(category_path_list), category_path_list[-2]


def scrape_product_details(browser):
    product = {}
    try:
        # name
        product["name"] = browser.find_element(By.CLASS_NAME, "B_NuCI").text
        # CategoryPaths
        product["categoryPaths"], product["brand"] = get_product_category_path(
            browser, True
        )
        product["categoryPaths"] = [product["categoryPaths"]]

        # retailPrice
        try:
            product["retailPrice"] = browser.find_element(
                By.CLASS_NAME, "_2p6lqe"
            ).get_attribute("innerHTML")
            product["retailPrice"] = float(
                re.sub(r"[^\d.]", "", product["retailPrice"])
            )
        except Exception as notFound:
            print("retail price", notFound)
            product["retailPrice"] = 0

        # discountedPrice
        try:
            product["discountedPrice"] = browser.find_element(
                By.CLASS_NAME, "_16Jk6d"
            ).text
            product["discountedPrice"] = float(
                re.sub(r"[^\d.]", "", product["discountedPrice"])
            )
        except Exception as notFound:
            print("discounted price", notFound)
            product["discountedPrice"] = 0

        if product["retailPrice"] == 0:
            product["retailPrice"] = product["discountedPrice"]
            product["discountedPrice"] = 0

        # imageUrlList
        product["imageUrlList"] = []
        try:
            media_box = browser.find_element(By.CLASS_NAME, "_2FHWw4")
            for media in media_box.find_elements(By.CSS_SELECTOR, "[src]"):
                product["imageUrlList"].append(media.get_attribute("src"))
        except Exception as notFound:
            print("image URLs ", notFound)
        if product["imageUrlList"] == []:
            try:
                product["imageUrlList"].append(
                    browser.find_element(By.CLASS_NAME, "_3kidJX")
                    .find_element(By.TAG_NAME, "img")
                    .get_attribute("src")
                )
            except Exception as notFound:
                print("image URLs ", notFound)

        # description
        try:
            product["description"] = browser.find_element(By.CLASS_NAME, "_1mXcCf").text
        except Exception as notFound:
            print("description1 ", notFound)
            product["description"] = ""

        try:
            product["description"] = browser.find_element(
                By.CLASS_NAME, "_1AN87F"
            ).get_attribute("innerHTML")
        except Exception as notFound:
            print("description2 ", notFound)
            print(notFound)

        # productSpecifications
        product["productSpecifications"] = {}

        # instock
        product["productSpecifications"]["inStock"] = True
        if product["retailPrice"] == 0 and product["discountedPrice"]:
            product["productSpecifications"]["inStock"] = False
        try:
            if (
                browser.find_element(By.CLASS_NAME, "_2Dfasx").text.strip().lower()
                == "notify me"
            ):
                product["productSpecifications"]["inStock"] = False
        except:
            pass

        # shareUrl
        try:
            product["productSpecifications"]["shareUrl"] = browser.current_url
        except:
            product["productSpecifications"]["shareUrl"] = ""

        # highlights
        try:
            product["productSpecifications"]["highlights"] = [
                hl.text for hl in browser.find_elements(By.CLASS_NAME, "_21Ahn-")
            ]
        except:
            product["productSpecifications"]["highlights"] = ""

        # seller
        # _1D-8OL
        product["productSpecifications"]["seller"] = {}
        try:
            product["productSpecifications"]["seller"]["sellerRating"] = float(
                browser.find_element(By.CLASS_NAME, "_1D-8OL").text
            )
            product["productSpecifications"]["seller"]["sellerName"] = (
                browser.find_element(By.ID, "sellerName")
                .text.replace(
                    str(product["productSpecifications"]["seller"]["sellerRating"]), ""
                )
                .strip()
            )
        except:
            product["productSpecifications"]["highlights"] = ""

        # details
        try:
            soup = BeautifulSoup(
                browser.find_element(By.CLASS_NAME, "_13swYk").get_attribute(
                    "innerHTML"
                ),
                "html.parser",
            )
            data = {
                label.get_text(strip=True): label.find_next_sibling().get_text(
                    strip=True
                )
                for label in soup.select("._2H87wv")
                if label.get_text(strip=True) != ""
            }
            product["productSpecifications"]["details"] = data
        except Exception as notFound:
            print(notFound)

        # specifications
        product["productSpecifications"]["specs"] = {}
        try:
            soup = BeautifulSoup(
                browser.find_element(By.CLASS_NAME, "_1UhVsV").get_attribute(
                    "innerHTML"
                ),
                "html.parser",
            )
            data = {}
            for table_wrapper in soup.select("._3k-BhJ"):
                table_title = table_wrapper.select_one(".flxcaE").get_text(strip=True)
                # print(table_title)
                table = table_wrapper.select_one("._14cfVK")
                # print(table)
                df_lst = pd.read_html(str(table))
                df = df_lst[0]
                data[table_title] = df.to_dict("split")

            product["productSpecifications"]["specs"] = data

        except Exception as notFound:
            print(notFound)

        product["productSpecifications"]["discounted"] = False
        product["productSpecifications"]["discountPercentage"] = 0
        # _31Dcoz
        try:
            discount_text = browser.find_element(By.CLASS_NAME, "_31Dcoz").text.strip()
            product["productSpecifications"]["discountPercentage"] = float(
                re.sub(r"[^\d.]", "", discount_text)
            )
            product["productSpecifications"]["discounted"] = True
        except Exception as notFound:
            print("Discount", notFound)

        # product ratings & reviews
        product["productSpecifications"]["rating"] = 0
        product["productSpecifications"]["ratingReviewSummary"] = ""
        # _3_L3jD
        try:
            ratings_wrapper = browser.find_element(By.CLASS_NAME, "_3_L3jD")
            ratings = ratings_wrapper.find_element(By.CLASS_NAME, "_3LWZlK").text
            product["productSpecifications"]["rating"] = float(
                re.sub(r"[^.\d]", "", ratings)
            )
            try:
                product["productSpecifications"][
                    "ratingReviewSummary"
                ] = ratings_wrapper.find_element(By.CLASS_NAME, "_2_R_DZ").text
            except:
                pass
        except Exception as notFound:
            print("Discount", notFound)

        # flipkart assured
        try:
            # _2Z07dN
            browser.find_element(By.CLASS_NAME, "_2Z07dN")
            product["productSpecifications"]["f_assured"] = True
        except:
            product["productSpecifications"]["f_assured"] = False

        # Available Offers
        product["productSpecifications"]["availableOffers"] = []
        try:
            try:
                show_more_button = browser.find_element(By.CLASS_NAME, "IMZJg1")
                browser.execute_script("arguments[0].click();", show_more_button)
            except:
                pass
            product["productSpecifications"]["availableOffers"].extend(
                [
                    [
                        offer.text
                        for offer in offer_wrapper.find_elements(By.TAG_NAME, "span")
                    ]
                    for offer_wrapper in browser.find_elements(By.CLASS_NAME, "_16eBzU")
                ]
            )
        except Exception as notFound:
            print("Available offers ", notFound)

        # Color
        product["productSpecifications"]["colorImgUrls"] = []
        try:
            product["productSpecifications"]["colorImgUrls"] = [
                clr_img.find_element(By.TAG_NAME, "img").get_attribute("src")
                for clr_img in browser.find_elements(By.CLASS_NAME, "_2C41yO")
            ]
        except:
            pass

        # services
        product["productSpecifications"]["services"] = []
        try:
            product["productSpecifications"]["services"] = [
                service.text.strip().strip("?")
                for service in browser.find_elements(By.CLASS_NAME, "_2MJMLX")
            ]
        except Exception as e:
            pass

    except Exception as e:
        raise e
    return product


def get_product_media_urls(browser):
    urls = []
    try:
        media_box = browser.find_element(By.CLASS_NAME, "_2FHWw4")
        for media in media_box.find_elements(By.CSS_SELECTOR, "[src]"):
            urls.append(media.get_attribute("src"))
    except Exception as e:
        pass
    return urls


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
        print("Error from get products urls sample", e)
    return list(set(product_urls))
