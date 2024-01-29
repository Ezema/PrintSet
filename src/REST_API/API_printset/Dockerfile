FROM eclipse-temurin:21-jdk-alpine
COPY take_new_orders/target /app
WORKDIR /app
RUN mv *.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]