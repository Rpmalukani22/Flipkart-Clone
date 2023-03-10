"""
Simple Python Script to scrap data from Flipkart front page.
"""
# imports
import os.path
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

from modules.category_tree import get_category_tree
from modules.best_of_deals_items import get_best_of_deals_items
from modules.get_product_details import (
    get_product_details,
    sample_products_from_categories,
)


# Utility Functions
def scroll(speed=2):
    """
    Function to scroll down browser control according to the specified speed.

    Args:
        speed (int, optional): Speed of control movement. Defaults to 2.

    Returns:
        _type_: void
    """
    current_scroll_position, new_height = 0, 1
    while current_scroll_position <= new_height:
        current_scroll_position += speed
        browser.execute_script(
            "window.scrollTo(0, {});".format(current_scroll_position)
        )
        new_height = browser.execute_script("return document.body.scrollHeight")


if __name__ == "__main__":
    # Browser Settings
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--incognito")


    # driver setup
    homedir = os.path.expanduser("~")
    webdriver_service = Service(f"{homedir}/chromedriver/stable/chromedriver")
    browser = webdriver.Chrome(service=webdriver_service, options=chrome_options)
    browser.maximize_window()
    # get_best_of_deals_items(browser, scroll)
    # get_category_tree(browser, scroll)
    # print(get_product_details(browser,scroll,"https://www.flipkart.com/redmi-10-caribbean-green-64-gb/p/itmbfb8dfcdd6e10?pid=MOBGC9GYQGGKWEU3&lid=LSTMOBGC9GYQGGKWEU3SLBNSD&marketplace=FLIPKART&q=mobiles&store=tyy%2F4io&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_1_3_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_3_na_na_na&fm=organic&iid=79bf2853-2512-40f7-9df6-5e73400d4bfd.MOBGC9GYQGGKWEU3.SEARCH&ppt=pp&ppn=pp&ssid=erbdhx6qkg0000001678262182634&qH=eb4af0bf07c16429"))
    sample_products_from_categories(browser, scroll)
    browser.close()
