package com.jdc.foods.utils.exceptions;

public class BusinessRuleViolationException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public BusinessRuleViolationException(String message) {
		super(message);
	}
}
