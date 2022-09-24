# ---- Dependencies ---- 
FROM alpine:latest as base 

WORKDIR /app

# download backend
RUN wget https://github.com/INL/BlackLab/releases/download/v3.0.0/blacklab-server-3.0.0.war 

# ------ Indexer ------
FROM openjdk:11 as indexer

WORKDIR /indexer

COPY --from=base /app/blacklab-server-3.0.0.war  ./

RUN unzip ./blacklab-server-3.0.0.war

COPY ./indexer ./


# ------ Server ------
FROM tomcat:9.0 as server

COPY --from=base /app/blacklab-server-3.0.0.war  /usr/local/tomcat/webapps/blacklab-server.war

ADD ./server/blacklab-server.yaml /etc/blacklab/

EXPOSE 8080

CMD ["catalina.sh", "run"]