# Event Management Backend (Spring Boot)

## Công nghệ sử dụng
- Java 21
- Spring Boot 3.3.0
- PostgreSQL (Primary Database)
- Redis (Caching & Rate Limiting)
- Flyway (Migration)
- Spring Security + JWT (Authentication)
- Docker & Docker Compose

## Yêu cầu hệ thống
- JDK 21
- Maven 3.9+
- Docker (Khuyến nghị)

## Hướng dẫn cài đặt nhanh

### 1. Cấu hình môi trường
Sao chép tệp `.env.example` thành `.env` và cập nhật các thông số cần thiết:
```bash
cp .env.example .env
```

### 2. Chạy với Docker (Khuyên dùng)
```bash
docker compose up -d
```
Sau khi chạy, API sẽ có sẵn tại `http://localhost:8080`.
Tài liệu API (Swagger UI): `http://localhost:8080/swagger-ui.html`

### 3. Chạy local không dùng Docker
- Đảm bảo đã cài đặt và chạy PostgreSQL + Redis.
- Cập nhật thông số trong `application.yml` hoặc đặt biến môi trường.
- Chạy lệnh Maven:
```bash
mvn spring-boot:run
```

## Cấu trúc thư mục
- `src/main/java/com/eventhub/config`: Cấu hình hệ thống.
- `src/main/java/com/eventhub/domain`: Entity, Enum và Domain logic.
- `src/main/java/com/eventhub/repository`: Tầng truy cập dữ liệu (JPA).
- `src/main/java/com/eventhub/service`: Tầng xử lý nghiệp vụ.
- `src/main/java/com/eventhub/web`: Tầng Presentation (Controller, DTO, Advice).
- `src/main/resources/db/migration`: Các tệp migration SQL của Flyway.
