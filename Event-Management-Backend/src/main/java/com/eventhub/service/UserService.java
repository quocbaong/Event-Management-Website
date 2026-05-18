package com.eventhub.service;

import com.eventhub.domain.entity.AttendeeProfile;
import com.eventhub.domain.entity.User;
import com.eventhub.exception.ResourceNotFoundException;
import com.eventhub.infrastructure.storage.StorageService;
import com.eventhub.repository.UserRepository;
import com.eventhub.web.dto.request.UpdatePreferencesRequest;
import com.eventhub.web.dto.request.UpdateUserProfileRequest;
import com.eventhub.web.dto.response.UserProfileResponse;
import com.eventhub.web.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final StorageService storageService;

    @Transactional(readOnly = true)
    public UserProfileResponse getMyProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userMapper.toProfileResponse(user);
    }

    public UserProfileResponse updateMyProfile(String email, UpdateUserProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        AttendeeProfile profile = user.getAttendeeProfile();
        if (profile == null) {
            profile = AttendeeProfile.builder()
                    .user(user)
                    .build();
            user.setAttendeeProfile(profile);
        }

        if (request.getDisplayName() != null) profile.setDisplayName(request.getDisplayName());
        if (request.getPhone() != null) profile.setPhone(request.getPhone());
        if (request.getDateOfBirth() != null) profile.setDateOfBirth(request.getDateOfBirth());
        if (request.getAddress() != null) profile.setAddress(request.getAddress());

        user = userRepository.save(user);
        return userMapper.toProfileResponse(user);
    }

    public UserProfileResponse updateAvatar(String email, MultipartFile file) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        AttendeeProfile profile = user.getAttendeeProfile();
        if (profile == null) {
            profile = AttendeeProfile.builder()
                    .user(user)
                    .build();
            user.setAttendeeProfile(profile);
        }

        try {
            // Delete old avatar if exists
            if (profile.getAvatarUrl() != null) {
                storageService.deleteFile(profile.getAvatarUrl());
            }

            // Upload new avatar
            String avatarUrl = storageService.uploadFile(file, "avatars");
            profile.setAvatarUrl(avatarUrl);

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload avatar", e);
        }

        user = userRepository.save(user);
        return userMapper.toProfileResponse(user);
    }

    public UserProfileResponse updatePreferences(String email, UpdatePreferencesRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setPreferences(request.getPreferences());

        user = userRepository.save(user);
        return userMapper.toProfileResponse(user);
    }
}
