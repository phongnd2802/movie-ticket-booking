FROM gradle:jdk21-alpine as build

WORKDIR /app

EXPOSE 8080

COPY build.gradle.kts settings.gradle.kts ./

COPY src ./src

RUN gradle clean build -x test

FROM amazoncorretto:21-alpine

WORKDIR /app

COPY --from=build /app/build/libs/*.jar movieticket.jar

ENTRYPOINT ["java", "-jar", "movieticket.jar" ]


