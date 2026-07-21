package com.jdc.foods.utils.exceptions;

import org.springframework.security.core.AuthenticationException;

public class JwtTokenAccessExpirationException extends AuthenticationException{

	private static final long serialVersionUID = 1L;

	public JwtTokenAccessExpirationException() {
		super("Access token has been expired.");
	}

}
