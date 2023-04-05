FROM nginx:stable-alpine3.17-slim
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY key.pem /etc/nginx/ssl/key.pem
COPY cert.pem /etc/nginx/ssl/cert.pem
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]