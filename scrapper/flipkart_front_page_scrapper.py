"""
Simple Python Script to scrap data from Flipkart front page.
"""
# imports
import os.path
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

# Browser Settings
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")

# driver setup
homedir = os.path.expanduser("~")
webdriver_service = Service(f"{homedir}/chromedriver/stable/chromedriver")
browser = webdriver.Chrome(service=webdriver_service, options=chrome_options)
browser.maximize_window()
browser.get("https://flipkart.com")
browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
browser.implicitly_wait(20)
browser.refresh()


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
                    item_box.find_element(By.TAG_NAME, "img").get_attribute("src")
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

    pd.DataFrame(data).to_csv("filpkart_index_page.csv", index=False)
