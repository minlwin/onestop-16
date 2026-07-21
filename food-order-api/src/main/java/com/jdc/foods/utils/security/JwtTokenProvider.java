package com.jdc.foods.utils.security;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;

@Service
public class JwtTokenProvider {
	
	public enum Type {
		Access, Refersh
	}

	private static final String ROLES = "rol";
	private static final String TYPE = "typ";

	@Value("${app.token.issuer}")
	private String issuer;
	@Value("${app.token.access-life}")
	private int accessLife;
	@Value("${app.token.refresh-life}")
	private int refreshLife;
	
	private SecretKey securityKey = Jwts.SIG.HS512.key().build();

	public String access(Authentication authentication) {
		return generate(authentication, Type.Access);
	}

	public String refresh(Authentication authentication) {
		return generate(authentication, Type.Refersh);
	}
	
	public Authentication parseAccess(String token) {
		return parse(token, Type.Access);
	}

	public Authentication parseRefresh(String token) {
		return parse(token, Type.Refersh);
	}
	
	private Authentication parse(String token, Type type) {
		var payload = Jwts.parser()
			.requireIssuer(issuer)
			.verifyWith(securityKey)
			.build().parseSignedClaims(token).getPayload();
		
		var tokenType = payload.get(TYPE, Type.class);
		
		if(tokenType != type) {
			// TODO Throw Exception
		}
		
		var username = payload.getSubject();
		var authorities = Arrays.stream(payload.get(ROLES, String.class).split(","))
				.map(SimpleGrantedAuthority::new)
				.toList();
				
		return UsernamePasswordAuthenticationToken.authenticated(username, null, authorities);
	}

	private String generate(Authentication authentication, Type type) {
		
		var issueAt = new Date();
		var authorities = authentication.getAuthorities().stream().map(a -> a.getAuthority())
				.collect(Collectors.joining(","));
		
		return Jwts.builder()
			.subject(authentication.getName())
			.issuer(issuer)
			.issuedAt(issueAt)
			.expiration(expiration(issueAt, type))
			.claim(ROLES, authorities)
			.claim(TYPE, type)
			.signWith(securityKey)
			.compact();
	}

	private Date expiration(Date issueAt, Type type) {
		
		var calendar = Calendar.getInstance();
		calendar.setTime(issueAt);
		calendar.add(Calendar.MINUTE, type == Type.Access ? accessLife : refreshLife);
		
		return calendar.getTime();
	}
}
