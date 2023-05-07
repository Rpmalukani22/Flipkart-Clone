# Flipkart Clone

This project is a clone of the popular e-commerce website Flipkart, built using React and Spring Boot.

<!-- > **Note:** This project is currently in development. -->

## Preview

![Flipkart Home](preview/Flipkart%20Clone-1.gif)

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

## Features

- [x] <b>Browse through the Product Catalog</b>, including categories, subcategories, and individual products, for easy exploration.
- [x] <b>Search for products</b> using a robust search functionality to find specific items quickly.
- [x] <b>Improved User Experience with Debouncing</b>: Implement debouncing techniques in search and input fields to enhance performance and responsiveness. Debouncing helps reduce unnecessary API calls by intelligently consolidating and delaying user input, resulting in smoother interactions and improved user experience.
- [x] Experience <b>search auto-complete</b> suggestions, which dynamically provide recommendations as you type.
- [x] <b>Dynamic Filters</b>: Filter products by various attributes such as brand, Flipkart Assured and more, to narrow down your search results.
- [x] <b>Sort Search results</b> by price, ratings and search relevance.
- [x] Secure <b>Authentication with Keycloak</b>: Implement secure authentication using Keycloak, an open-source identity and access management solution, ensuring robust user authentication and protection of sensitive information.
- [x] <b>JWT (JSON Web Token) Integration</b>: Utilize JWT for secure and efficient token-based authentication, enhancing the authentication process between the front-end and back-end systems.
- [x] <b>Role-Based Authorization with Keycloak</b>: Implement role-based access control using Keycloak, allowing different user roles (e.g., admin, customer) to access specific functionalities and features within the application.
- [x] Access an intuitive <b>Admin API Control Screen</b> for effortless management and control over the application's APIs.
- [x] Achieve <b>continuous synchronization between the product catalog and search index</b> using Monstache, ensuring up-to-date and accurate search results.
- [x] <b>Add or remove products to your cart</b>, enabling convenient shopping and easy management of selected items.
- [x] Seamlessly <b>proceed to checkout</b>, complete your purchase, and securely process payments with <b>Stripe</b>, streamlining the payment process for a smooth and secure transaction.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
