package com.eventhub.infrastructure.qrcode;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class QrCodeService {

    private final Cloudinary cloudinary;

    private static final int QR_SIZE = 300;

    public String generateQrImage(String content) {
        try {
            byte[] pngBytes = generateQrPngBytes(content);
            return uploadToCloudinary(pngBytes);
        } catch (Exception e) {
            log.error("Failed to generate QR code for content '{}': {}", content, e.getMessage());
            return null;
        }
    }

    private byte[] generateQrPngBytes(String content) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, QR_SIZE, QR_SIZE);
        BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, "png", baos);
        return baos.toByteArray();
    }

    private String uploadToCloudinary(byte[] imageBytes) throws IOException {
        Map<String, Object> uploadParams = ObjectUtils.asMap(
                "folder", "eventhub/qrcodes",
                "resource_type", "image"
        );
        Map uploadResult = cloudinary.uploader().upload(imageBytes, uploadParams);
        return uploadResult.get("secure_url").toString();
    }
}
