FROM opensearchproject/logstash-oss-with-opensearch-output-plugin:8.6.1
RUN bin/logstash-plugin install logstash-input-mongodb 
USER root
RUN apt-get install netbase
RUN mkdir -p /logstash-mongodb
RUN chown -R logstash:logstash /logstash-mongodb
USER logstash