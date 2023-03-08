import pandas as pd
from selenium.webdriver.common.by import By


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

    pd.DataFrame(data).to_csv("best_of_deals_items.csv", index=False)
