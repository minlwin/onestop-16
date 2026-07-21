package com.jdc.foods.utils.exceptions;

import java.util.List;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApplicationExceptionHandler {

	@ExceptionHandler
	List<String> handle(BusinessRuleViolationException e) {
		return null;
	}
}
