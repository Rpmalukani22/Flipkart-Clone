# Flipkart Clone

This project is a clone of the popular e-commerce website Flipkart, built using React and Spring Boot.

> **Note:** This project is currently in development.

## Preview

![Flipkart Home](preview/Flipkart%20Clone-1.gif)

## Tech Stack

This project was built using following technologies:

- React
- Redux Toolkit
- Material-UI
- Spring Boot
- Python
- Selenium
- BeautifulSoup
- MongoDB
- Cloud Storage (scality zenko cloudserver, AWS S3)
- Docker
- OpenSearch
- Logstash

## Getting Started

### Generating SSL/TLS Certificate and Private Key for reverse proxy server using OpenSSL

Generate a private key:

```
openssl genrsa -out key.pem 2048
```

Generate a certificate signing request (CSR):

```
openssl req -new -key key.pem -out csr.pem
```

Generate a self-signed certificate:

```
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
```

After these steps, you should have two files: cert.pem and key.pem. The cert.pem file contains the SSL/TLS certificate, and the key.pem file contains the private key. You can then use these files in your Nginx configuration as shown in the previous examples.

To execute this project, you'll need to do the following:

```
git clone https://github.com/Rpmalukani22/Flipkart-Clone.git
cd Flipkart-Clone
docker-compose up -d
```

## Features

- [x] Browse Product Catalog (Categories, Subcateories and Products)
- [x] Search Products
- [x] Search Auto Complete Suggestions 
- [x] Filter Products by various attributes
- [x] Authentication
- [ ] Role Based Access
- [x] Admin API Control Screen
- [x] Continuous sync between product catalog and search index using logstash
- [x] Add,Remove products to your cart
- [ ] Checkout and complete your purchase

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
