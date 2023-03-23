"""
Simple Python Script to scrap data from Flipkart front page.
"""
# imports
import json
import os.path
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

from modules.category_tree import get_category_tree
from modules.best_of_deals_items import get_best_of_deals_items
from modules.get_product_details import (
    get_product_details,
    sample_products_from_categories,
    scrape_product_details
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
    print(json.dumps(get_product_details(browser,scroll,"https://www.flipkart.com/callmate-20000-mah-power-bank-15-w-fast-charging/p/itm58740ebb7f7dc?pid=PWBGFGC4JZKHAGNH&lid=LSTPWBGFGC4JZKHAGNH17PSSL&marketplace=FLIPKART&store=tyy%2F4mr%2Ffu6&srno=b_1_7&otracker=hp_omu_Best%2Bof%2BElectronics_1_3.dealCard.OMU_UDG9W07DN4PD_3&otracker1=hp_omu_PINNED_neo%2Fmerchandising_Best%2Bof%2BElectronics_NA_dealCard_cc_1_NA_view-all_3&fm=neo%2Fmerchandising&iid=2e499b0b-1c80-4aa5-9d2f-8f80ee5d6d49.PWBGFGC4JZKHAGNH.SEARCH&ppt=hp&ppn=homepage&ssid=p5hxye3qv40000001679332592039")))
    
    # sample_products_from_categories(browser, scroll)
    
    
    # product_url="""https://www.flipkart.com/hp-athlon-dual-core-3050u-8-gb-256-gb-ssd-windows-11-home-14s-fq0568au-thin-light-laptop/p/itm69710a61fcfdf?pid=COMGG63HHFBZ2BZP&marketplace=FLIPKART"""
    # browser.get(product_url)
    # print(json.dumps(scrape_product_details(browser)))
    browser.close()
