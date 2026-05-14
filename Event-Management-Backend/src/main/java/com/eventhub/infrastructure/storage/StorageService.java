package com.eventhub.infrastructure.storage;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface StorageService {
    // Hàm upload file lên Cloudinary, folderName dùng để chia thư mục (ví dụ: "avatars", "events")
    String uploadFile(MultipartFile file, String folderName) throws IOException;

    // Hàm xóa file trên Cloudinary khi người dùng muốn đổi ảnh khác
    void deleteFile(String fileUrl) throws IOException;
}
