package com.jdc.foods.utils.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@Data
@ConfigurationProperties(prefix = "app.token")
public class AuthTokenConfigProps {

	private String issuer;
	private int accessLife;
	private int refreshLife;
}
