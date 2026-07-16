package com.jdc.foods.api.anonymous;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.anonymous.input.SignInForm;
import com.jdc.foods.api.anonymous.input.TokenForm;
import com.jdc.foods.api.anonymous.output.AuthResult;
import com.jdc.foods.api.anonymous.service.AuthResultService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("anonymous/token")
public class AuthTokenApi {
	
	private final AuthenticationManager authenticationManager;
	private final AuthResultService authResultService;

	@PostMapping("generate")
	AuthResult generate(@RequestBody @Validated SignInForm form) {
		
		// Authenticate
		var authentication = authenticationManager.authenticate(form.autentication());	
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		return authResultService.generate(authentication);
	}
	
	
	@PostMapping("refresh")
	AuthResult refresh(@RequestBody @Validated TokenForm form) {
		return null;
	}
}
