import json
import time
import re
import shutil
import urllib.parse
import requests
import pyrfc6266


with open("../products.json", "r") as f:
    products = json.load(f)


def to_camel_case(snake_case_str):
    first, *rest = snake_case_str.split("_")
    return "".join([first.lower(), *map(str.title, rest)])


resolution_regex = re.compile(r"(.+/image/)[\d]+/[\d]+(/.+)")


def get_best_resolution(url):
    try:
        resolution = 1024
        while resolution >= 28:
            res_url = resolution_regex.sub(
                r"\g<1>" + f"{resolution}/{resolution}" + r"\g<2>", url
            )
            retry_cnt=5
            while retry_cnt:
                try:
                    print("Trying... "+res_url)
                    response = requests.get(res_url, stream=True,headers={'User-Agent': 'Mozilla/5.0'})
                    response.raw.decode_content = True
                    print("Status code : "+str(response.status_code))
                    if response.status_code == 200:
                        fname = pyrfc6266.requests_response_to_filename(response)
                        return res_url, [fname,response.content,response.headers['Content-Type']]
                    elif retry_cnt>0:
                        raise Exception("Failed to get status code 200")
                    resolution //= 2
                except Exception as e:
                    print(e)
                    time.sleep(2**(5-retry_cnt))
                    retry_cnt-=1
                    print("Retry ",5-retry_cnt)
        raise Exception("No Resolution fit found!")
    except Exception as e:
        with open('error_urls.txt','w') as f:
            print(e,url)
            print("url ",url,file=f)
        return False,False
    


def post_images_to_s3(url_lst):
    files= []
    for url in url_lst:
        best_res_url, img_data = get_best_resolution(url)
        if (not best_res_url) or (not img_data):
            continue
        files.append(
            ('file', (img_data[0], img_data[1], img_data[2]))
        )
    payload = {}
    # headers = {"Content-Type": "multipart/form-data"}
    response = requests.post(
        "http://localhost:8080/s3/buckets/flipkart-media/files?parentPath=products",
        # headers=headers,
        data=payload,
        files=files,
    )
    s3_urls=[]
    if(response.status_code==201):
        for file_details in files:
            s3_urls.append(f"http://localhost:8080/s3/buckets/flipkart-media/files?key=products%2F{urllib.parse.quote_plus(file_details[1][0])}")
    return s3_urls

def product_to_request(product):
    try:
        path_items = product.pop("category_path").split(">>")
    except Exception as e:
        # print("-----------")
        # print(product)
        # print("-------------")
        return
    category_path = ">>".join(path_items[1:-2])
    brand = path_items[-2]
    product["categoryPaths"] = [category_path]
    try:
        product["discountedPrice"] = product.pop("current_price")
    except Exception as e:
        print(e)
        product["discountedPrice"] = -1

    try:
        product["retailPrice"] = product.pop("original_price")
    except Exception as e:
        print(e)
        product["retailPrice"] = product["discountedPrice"]

    if product["discountedPrice"] == -1:
        if product["retailPrice"] != -1:
            product["discountedPrice"] = product["retailPrice"]
        else:
            product["discountedPrice"] = product["retailPrice"] = 0
    try:
        product["imageUrlList"] = product.pop("thumbnails")
    except Exception as e:
        print(e)
        product["imageUrlList"] = []
    product["imageUrlList"] = post_images_to_s3(product["imageUrlList"])
    try:
        product["description"] = product.pop("highlights")
    except Exception as e:
        print(e)
        product["description"] = ""
    product["brand"] = brand
    product["productSpecifications"] = dict()
    # print(product)
    for key in set(product.keys()) - set(
        [
            "name",
            "categoryPaths",
            "retailPrice",
            "discountedPrice",
            "imageUrlList",
            "description",
            "brand",
            "product_specification",
        ]
    ):
        product["product_specification"][to_camel_case(key)] = product.pop(key)
    return product


if __name__ == "__main__":
    product_requests = []
    for idx,product in enumerate(products):
        print("Processing Product... "+str(idx))
        request = product_to_request(product)
        if request:
            product_requests.append(request)
    with open("product_bulk_request.json", "w") as f:
        json.dump(product_requests,f)
    
