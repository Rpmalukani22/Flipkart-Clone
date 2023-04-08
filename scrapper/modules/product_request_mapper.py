'''
Author: Ruchitesh Malukani
Modified By: Ruchitesh Malukani
Last Modified: Wednesday, 5th April 2023
-----
Copyright (c) 2023 Ruchitesh Malukani
'''
import json
import os
import re
import pathlib
import time
import urllib
from urllib.parse import urlparse
import multiprocessing
import pyrfc6266
import requests
import simplejson
import requests.adapters

with open(
    os.path.join(
        pathlib.Path(__file__).parent.parent, "scrapped_data", "products.json"
    ),
    "r",
) as f:
    products = json.load(f)

resolution_regex = re.compile(r"(.+/image/)[\d]+/[\d]+(/.+)")
session = requests.Session()
adapter = requests.adapters.HTTPAdapter(pool_connections=100, pool_maxsize=100)
session.mount("http://", adapter)


def get_best_resolution(url):
    try:
        resolution = 1024
        while resolution >= 28:
            res_url = resolution_regex.sub(
                r"\g<1>" + f"{resolution}/{resolution}" + r"\g<2>", url
            )
            retry_cnt = 5
            while retry_cnt:
                try:
                    print("Trying... " + res_url)
                    response = requests.get(
                        res_url, stream=True, headers={"User-Agent": "Mozilla/5.0"}
                    )
                    response.raw.decode_content = True
                    print("Status code : " + str(response.status_code))
                    if response.status_code == 200:
                        fname = pyrfc6266.requests_response_to_filename(
                            response)
                        return res_url, [
                            fname,
                            response.content,
                            response.headers["Content-Type"],
                        ]
                    elif retry_cnt > 0:
                        raise Exception("Failed to get status code 200")
                    resolution //= 2
                except Exception as e:
                    print(e)
                    time.sleep(2 ** (5 - retry_cnt))
                    retry_cnt -= 1
                    print("Retry ", 5 - retry_cnt)
        raise Exception("No Resolution fit found!")
    except Exception as e:
        print(e, url)
        return False, False


def post_images_to_s3(url_lst):
    files = []
    for url in url_lst:
        # print("url test ",url)
        best_res_url, img_data = get_best_resolution(url)
        if (not best_res_url) or (not img_data):
            continue
        files.append(("file", (img_data[0], img_data[1], img_data[2])))

    payload = {}
    response = session.post(
        "https://localhost/api/product-management/s3/buckets/flipkart-media/files/_bulk?parentPath=products",
        data=payload,
        files=files,
    )
    print("response ", response.status_code)
    s3_urls = []
    if response.status_code == 202:
        for file_details in files:
            s3_urls.append(
                f"https://localhost/api/product-management/s3/buckets/flipkart-media/files?key=products%2F{urllib.parse.quote_plus(file_details[1][0])}"
            )
    else:
        print("Error ", url_lst)
    return s3_urls


def set_category_path(product):
    try:
        path_items = product.pop("categoryPaths")[0].split(">>")
    except Exception as e:
        return
    category_path = ">>".join(path_items[1:-2])
    product["categoryPaths"] = [category_path]
    return product


def chunks(lst, n):
    for i in range(0, len(lst), n):
        yield lst[i: i + n]


def convert_urls(flipkart_urls):
    local_urls = []
    bucket_name = "flipkart-media"
    for url in flipkart_urls:
        local_urls.append(
            f"https://localhost/api/product-management/s3/buckets/{bucket_name}/files?key=products%2F{urllib.parse.quote_plus(os.path.basename(urlparse(url).path))}"
        )
    return local_urls


if __name__ == "__main__":
    # Parallelly Download Images from Flipkart and Post Images to s3

    # img_urls = set()
    # for item in products:
    #     img_urls.update(item["imageUrlList"])
    #     img_urls.update(item["productSpecifications"]["colorImgUrls"])

    # cores = multiprocessing.cpu_count()
    # with multiprocessing.Pool(4 * cores) as p:
    #     p.map(post_images_to_s3, list(chunks(list(img_urls), 1500)))

    # Convert Flipkart Urls to Local S3 Urls

    for item in products:
        item["imageUrlList"] = convert_urls(item["imageUrlList"])
        item["productSpecifications"]["colorImgUrls"] = convert_urls(
            item["productSpecifications"]["colorImgUrls"]
        )

    # Setup category path i.e. Remove Home, Remove Product name from scrapped path
    product_requests = list(map(set_category_path, products))

    # Save Product Requests
    with open(
        os.path.join(
            pathlib.Path(
                __file__).parent.parent, "scrapped_data", "product_bulk_request.json"
        ),
        "w",
    ) as f:
        simplejson.dump(product_requests, f, ignore_nan=True)
