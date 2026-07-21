package com.jdc.foods.api.anonymous.service;

import static com.jdc.foods.utils.EntityUtils.safeCall;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.api.anonymous.output.AuthResult;
import com.jdc.foods.model.account.repo.AccountRepo;
import com.jdc.foods.utils.security.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthResultService {
	
	private final JwtTokenProvider tokenProvider;
	private final AccountRepo accountRepo;

	@Transactional(readOnly = true)
	public AuthResult generate(Authentication authentication) {
		
		var account = safeCall(accountRepo.findByEmail(authentication.getName()))
				.apply("account").apply("email").apply(authentication.getName());
		
		return AuthResult.builder()
				.name(account.getName())
				.roles(authentication.getAuthorities()
						.stream().map(GrantedAuthority::getAuthority).toList())
				.accessToken(tokenProvider.access(authentication))
				.refreshToken(tokenProvider.refresh(authentication))
				.build();
	}

}
