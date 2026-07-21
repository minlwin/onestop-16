package com.jdc.foods.utils.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@Data
@ConfigurationProperties(prefix = "app.admin")
public class AdminUserConfig {

	private String name;
	private String email;
	private String password;
}
