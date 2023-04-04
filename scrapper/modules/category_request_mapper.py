'''
Author: Ruchitesh Malukani
Modified By: Ruchitesh Malukani
Last Modified: Wednesday, 5th April 2023
-----
Copyright (c) 2023 Ruchitesh Malukani
'''
import json
import html
import os
import pathlib

with open(os.path.join(pathlib.Path(__file__).parent.parent,"scrapped_data", "categories.json"), "r") as f:
    categories = json.load(f)


def to_camel_case(snake_case_str):
    first, *rest = snake_case_str.split("_")
    return "".join([first.lower(), *map(str.title, rest)])


def get_category_paths(category, parent=""):
    current_path = parent + ">>" + html.unescape(category["name"]) if parent else html.unescape(category["name"])
    if not category["sub-categories"]:
        return [current_path]

    category_paths = []

    for sub_category in category["sub-categories"]:
        category_paths.extend(get_category_paths(sub_category, current_path))
    return category_paths


if __name__ == "__main__":
    category_requests = []
    for category in categories:
        category_paths = get_category_paths(category)
        for path in category_paths:
            category_requests.append({"categoryPath": path})
    with open(os.path.join(pathlib.Path(__file__).parent.parent,"scrapped_data", "category_bulk_request.json"), "w") as f:
        json.dump(category_requests,f)
    # print([get_category_paths(category) for category in categories])