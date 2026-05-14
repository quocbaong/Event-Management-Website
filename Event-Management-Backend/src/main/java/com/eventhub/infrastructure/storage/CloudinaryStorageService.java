package com.eventhub.infrastructure.storage;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CloudinaryStorageService implements StorageService {

    // Spring sẽ tự động tiêm Bean Cloudinary (mà bạn đã tạo ở Bước 4) vào đây
    private final Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file, String folderName) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // Cấu hình tham số upload: gom chung vào thư mục gốc là "eventhub"
        Map<String, Object> uploadParams = ObjectUtils.asMap(
                "folder", "eventhub/" + folderName,
                "resource_type", "auto" // Tự động nhận diện ảnh/video
        );

        // Đẩy byte của file lên Cloudinary
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadParams);

        // Lấy đường dẫn HTTPS an toàn trả về
        return uploadResult.get("secure_url").toString();
    }

    @Override
    public void deleteFile(String fileUrl) throws IOException {
        String publicId = extractPublicIdFromUrl(fileUrl);
        if (publicId != null) {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            log.info("Deleted file on Cloudinary: {}", publicId);
        }
    }

    /**
     * Hàm phụ trợ: Để xóa ảnh trên Cloudinary, ta cần ID của nó (Public ID) chứ không phải URL.
     * Hàm này cắt bỏ phần domain và extension (.jpg, .png) trong URL để lấy được đúng ID.
     */
    private String extractPublicIdFromUrl(String fileUrl) {
        if (fileUrl == null || fileUrl.isEmpty()) return null;
        try {
            int uploadIndex = fileUrl.indexOf("upload/");
            if (uploadIndex != -1) {
                // Lấy phần phía sau chữ "upload/v123456789/"
                String afterUpload = fileUrl.substring(uploadIndex + 7);
                int firstSlash = afterUpload.indexOf("/");
                String publicIdWithExt = afterUpload.substring(firstSlash + 1);

                // Bỏ đuôi .jpg, .png
                int lastDot = publicIdWithExt.lastIndexOf(".");
                if (lastDot != -1) {
                    return publicIdWithExt.substring(0, lastDot);
                }
                return publicIdWithExt;
            }
        } catch (Exception e) {
            log.error("Lỗi khi trích xuất Public ID từ URL: {}", fileUrl, e);
        }
        return null;
    }
}
