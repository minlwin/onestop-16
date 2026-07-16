package com.jdc.foods.api.anonymous.input;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import jakarta.validation.constraints.NotEmpty;

public record SignInForm(
		@NotEmpty(message = "Please enter your login id.")
		String username,
		@NotEmpty(message = "Please enter password.")
		String password) {

	public Authentication autentication() {
		return UsernamePasswordAuthenticationToken.unauthenticated(username, password);
	}

}
