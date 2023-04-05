'''
Author: Ruchitesh Malukani
Modified By: Ruchitesh Malukani
Last Modified: Wednesday, 5th April 2023
-----
Copyright (c) 2023 Ruchitesh Malukani
'''
"""
Simple Python Script to scrap data from Flipkart front page.
"""
# imports


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
        new_height = browser.execute_script(
            "return document.body.scrollHeight")


if __name__ == "__main__":
    # Browser Settings
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--incognito")

    # driver setup
    homedir = os.path.expanduser("~")
    webdriver_service = Service(f"{homedir}/chromedriver/stable/chromedriver")
    browser = webdriver.Chrome(
        service=webdriver_service, options=chrome_options)
    browser.maximize_window()

    # Start Scrapping
    get_best_of_deals_items(browser, scroll)
    # get_category_tree(browser, scroll)
    # sample_products_from_categories(browser,scroll)
    browser.close()
