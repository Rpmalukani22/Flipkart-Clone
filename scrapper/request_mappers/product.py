import json

with open("products.json", "r") as f:
    products = json.load(f)


def to_camel_case(snake_case_str):
    first, *rest = snake_case_str.split("_")
    return "".join([first.lower(), *map(str.title, rest)])


def product_to_request(product):
    path_items = product.pop["category_path"].split(">>")
    category_path = ">>".join(path_items[1:-2])
    brand = path_items[-2]
    product["categoryPaths"] = category_path
    product["retailPrice"] = product.pop("original_price")
    product["discountedPrice"] = product.pop("current_price")
    product["imageUrlList"] = product.pop("thumbnails")
    product["description"] = product.pop("highlights")
    product["brand"] = brand
    for key in set(product.keys()) - set(
        [
            "name",
            "category_path",
            "original_price",
            "current_price",
            "thumbnails",
            "highlights",
        ]
    ):
        product["product_specification"][to_camel_case(key)] = product.pop("key")


if __name__ == "__main__":
    product_requests = []
    for product in products:
        request = product_to_request(product)
        product_requests.append(request)
    with open("product_bulk_request.json",'w') as f:
        json.dump(product_requests)
    