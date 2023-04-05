'''
Author: Ruchitesh Malukani
Modified By: Ruchitesh Malukani
Last Modified: Wednesday, 5th April 2023
-----
Copyright (c) 2023 Ruchitesh Malukani
'''
import os
import html
import pathlib
import pandas as pd
from selenium.webdriver.common.by import By
import json
import os
from .product_request_mapper import post_images_to_s3, convert_urls


def get_best_of_deals_items(browser, scroll):
    """
    Return type: void

    Creates csv of best of deals items from the front page.

    Args:
        browser (WebDriver): Selenium WebDriver
        scroll (function): Function to scroll down
    """
    browser.get("https://flipkart.com")
    browser.implicitly_wait(20)
    browser.refresh()
    scroll()

    # Scrapping Best of <Category> deals

    data = []

    for box in browser.find_elements(By.CLASS_NAME, "_1AtVbE"):
        try:
            category_box = box.find_element(By.CLASS_NAME, "_2cAig-")
            category = category_box.get_attribute("innerHTML")
            for item_box in box.find_elements(By.CLASS_NAME, "_6WQwDJ"):
                row = []
                row.append(category)
                row.append(
                    [item_box.find_element(
                        By.TAG_NAME, "img").get_attribute("src")]
                )
                row.extend(
                    list(
                        map(
                            lambda item: item.get_attribute("innerHTML"),
                            item_box.find_elements(By.TAG_NAME, "div")[2:],
                        )
                    )
                )
                row.remove("")
                data.append(row)
        except Exception as e:
            print(e)

    df = pd.DataFrame(
        data, columns=["title", "imgUrl",
                       "category_title", "subTitle1", "subTitle2"]
    )
    for col in ["title", "category_title", "subTitle1", "subTitle2"]:
        df[col] = df[col].apply(
            lambda item: html.unescape(
                item.strip()) if item and item.strip() else ""
        )
    df["imgUrl"] = df["imgUrl"].apply(post_images_to_s3)
    best_of_dt = []
    left_bg_img_url = post_images_to_s3(
        [
            "https://rukminim1.flixcart.com/fk-p-flap/278/278/image/7593e7b6640822c1.jpg?q=90"
        ]
    )[0]
    for gname, gdf in df.groupby("title"):
        print(gname)
        gdf.rename(columns={"category_title": "title"}, inplace=True)
        print(gdf)
        best_of_dt.append(
            {
                "title": gname,
                "leftBgImgUrl": left_bg_img_url,
                "offerings": gdf.to_dict(orient="records"),
            }
        )

    with open(
        os.path.join(
            pathlib.Path(__file__).parent.parent,
            "scrapped_data",
            "best_of_deals_items_request.json",
        ),
        "w",
    ) as f:
        json.dump(best_of_dt, f)
