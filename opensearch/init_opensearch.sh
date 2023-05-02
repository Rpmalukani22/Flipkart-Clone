curl -k -XPUT "https://admin:admin@opensearch-node1:9200/monstache_products" -H 'Content-Type: application/json' -d'
{
  "aliases": {},
  "mappings": {
    "properties": {
      "_class": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "brand": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "description": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "discounted": {
        "type": "boolean"
      },
      "discountedPrice": {
        "type": "long"
      },
      "f_assured": {
        "type": "boolean"
      },
      "name": {
        "type": "completion"
      },
      "price": {
        "type": "long"
      },
      "productUrl": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "rating": {
        "type": "float"
      },
      "retailPrice": {
        "type": "long"
      },
      "slug": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      }
    }
  }
}'