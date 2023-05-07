# Flipkart Clone

This project is a clone of the popular e-commerce website Flipkart, built using React and Spring Boot.

<!-- > **Note:** This project is currently in development. -->

## Preview

<div style="position: relative; display: inline-block;">
   <a href="https://www.youtube.com/watch?v=Si_MIjqSMpk">
      <div style="position: relative;">
         <img src="https://i3.ytimg.com/vi/Si_MIjqSMpk/maxresdefault.jpg" alt="Video Thumbnail" style="width: 100%; display: block;">
         <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); opacity: 0; transition: opacity 0.3s ease;"></div>
         <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.7); width:100%; height:100%;text-align:center;display:flex;align-items:center;justify-content:center">
            <span style="color: #fff; font-size: 24px;">Click Here To Play</i></span>
         </div>
      </div>
   </a>
</div>




<!-- [![Demo Video](https://markdown-videos.deta.dev/youtube/Si_MIjqSMpk)](https://youtu.be/Si_MIjqSMpk) -->

<!-- ![Flipkart Home](preview/Flipkart%20Clone-1.gif) -->


## Tech Stack

This project was built using following technologies:

- React
- Redux Toolkit
- Material-UI
- Spring Boot
- Keycloak
- Python
- Selenium
- BeautifulSoup
- MongoDB
- Cloud Storage (scality zenko cloudserver, AWS S3)
- Docker
- OpenSearch
- ~~Logstash~~ Monstache
- Stripe
- nginx

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

## Minimal execution with

```
docker-compose up -d --build --scale sonarqube=0 --scale s3manager=0 --scale mongo-express=0 --scale opensearch-dashboards=0
```

## Execute all services

```
docker-compose up -d --build
```

## Features

- [x] <b>Flipkart Product Scraping</b>: Scrape Flipkart product data using Selenium, BeautifulSoup, and Python.
- [x] <b>Browse through the Product Catalog comprised of 10,000+ products</b>, including categories, subcategories, and individual products, for easy exploration.
- [x] <b>Search for products</b> using a robust search functionality to find specific items quickly.
- [x] <b>Improved User Experience with Debouncing</b>: Implement debouncing techniques in search input fields to enhance performance and responsiveness.
- [x] Experience <b>search auto-complete</b> suggestions, which dynamically provide recommendations as you type.
- [x] <b>Dynamic Filters</b>: Filter products by various attributes such as brand, categories and more, to narrow down your search results.
- [x] <b>Sort Search results</b> by price, ratings and search relevance.
- [x] Secure <b>Authentication with Keycloak</b>: Implement secure authentication using Keycloak, an open-source identity and access management solution, ensuring robust user authentication and protection of sensitive information.
- [x] <b>JWT (JSON Web Token) Integration</b>: Utilize JWT for secure and efficient token-based authentication, enhancing the authentication process between the front-end and back-end systems.
- [x] <b>Role-Based Authorization with Keycloak</b>: Implement role-based access control using Keycloak, allowing different user roles (e.g., admin, customer) to access specific functionalities and features within the application.
- [x] Access an intuitive <b>Admin API Control Screen</b> for effortless management and control over the application's APIs.
- [x] Achieve <b>continuous synchronization between the product catalog and search index</b> using Monstache, ensuring up-to-date and accurate search results.
- [x] <b>Manage your shopping cart by adding or removing products</b>, enabling convenient shopping and easy management of selected items.
- [x] Seamlessly <b>proceed to checkout</b>, complete your purchase, and securely process payments with <b>Stripe</b>, streamlining the payment process for a smooth and secure transaction.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
