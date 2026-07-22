package com.jdc.foods.api.shopper.master.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;

@Service
public class StorageService {

	@Value("${app.storage.path}")
	private String storagePath;
	
	private static final DateTimeFormatter DF = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
	
	@PostConstruct
	void init() {
		var storage = Path.of(storagePath);
		
		if(!Files.exists(storage, LinkOption.NOFOLLOW_LINKS)) {
			try {
				Files.createDirectory(storage);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
	}

	public List<String> savePhotos(int id, MultipartFile[] files) {
		
		try {
			var result = new ArrayList<String>();
			var storage = Path.of(storagePath);
			var createdAt = LocalDateTime.now();
			
			for(var file : files) {
				var name = getFileName(file, id, createdAt);
				Files.copy(file.getInputStream(), storage.resolve(name), StandardCopyOption.REPLACE_EXISTING);
				result.add(name);
			}
			
			return result;
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private String getFileName(MultipartFile file, int id, LocalDateTime createdAt) {
		return "%04d-%s.%s".formatted(id, createdAt.format(DF), extension(file));
	}
	
	private String extension(MultipartFile file) {
		var array = file.getOriginalFilename().split("\\.");
		return array[array.length - 1];
	}

}
