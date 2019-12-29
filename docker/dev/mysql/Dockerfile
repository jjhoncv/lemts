FROM mysql:5.6
RUN apt-get update && apt-get install -y pv
COPY my.cnf /etc/mysql/my.cnf
ADD db.sql /docker-entrypoint-initdb.d
