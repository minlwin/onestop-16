package com.jdc.foods.utils.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@Data
@ConfigurationProperties(prefix = "app.storage")
public class StorageConfigProps {

	private String path;
}
