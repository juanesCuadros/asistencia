# Empaquetamos el proyecto con Maven
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
# Fíjate que aquí ya no hay punto ni barra antes de "mvn"
RUN mvn clean package -DskipTests

# Usamos la versión oficial actual de Java (Eclipse Temurin)
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]