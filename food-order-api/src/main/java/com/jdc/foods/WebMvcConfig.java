package com.jdc.foods;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jackson.autoconfigure.JsonMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import tools.jackson.databind.ext.javatime.deser.LocalDateDeserializer;
import tools.jackson.databind.ext.javatime.deser.LocalDateTimeDeserializer;
import tools.jackson.databind.ext.javatime.ser.LocalDateSerializer;
import tools.jackson.databind.ext.javatime.ser.LocalDateTimeSerializer;
import tools.jackson.databind.module.SimpleModule;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	@Value("${app.storage.path}")
	private String storagePath;
	
	@Value("${spring.mvc.format.date}")
	private String dateFormat;
	@Value("${spring.mvc.format.date-time}")
	private String dateTimeFormat;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/resources/**")
			.addResourceLocations("file:%s/".formatted(storagePath));
	}
	
	@Bean
	JsonMapperBuilderCustomizer jsonMapperBuilderCustomizer() {
		return builder -> {
			var module = new SimpleModule();
			var dateFormatter = DateTimeFormatter.ofPattern(dateFormat);
			var dateTimeFormatter = DateTimeFormatter.ofPattern(dateTimeFormat);
			
			module.addDeserializer(
					LocalDate.class, 
					new LocalDateDeserializer(dateFormatter)
			);
			
			module.addDeserializer(
					LocalDateTime.class, 
					new LocalDateTimeDeserializer(dateTimeFormatter)
			);
			
			module.addSerializer(
					LocalDate.class, 
					new LocalDateSerializer(dateFormatter)
			);
			
			module.addSerializer(
					LocalDateTime.class, 
					new LocalDateTimeSerializer(dateTimeFormatter)
			);
			
			builder.addModule(module);
		};
	}
}
