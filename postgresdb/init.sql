-- Create keycloak database and admin
\set kc_db_name `echo "$KC_DB_NAME"` 
\set kc_db_user `echo "$KC_DB_USER"` 
\set kc_db_password `echo "$KC_DB_PASSWORD"`  
\set pg_user `echo "$POSTGRES_USER"`

CREATE DATABASE :kc_db_name;
\c :kc_db_name :pg_user
CREATE USER :kc_db_user WITH PASSWORD :'kc_db_password';
GRANT ALL PRIVILEGES ON DATABASE :kc_db_name TO :kc_db_user;
GRANT USAGE ON SCHEMA public TO :kc_db_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO :kc_db_user;

