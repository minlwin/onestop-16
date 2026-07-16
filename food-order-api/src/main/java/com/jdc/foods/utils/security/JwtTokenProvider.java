package com.jdc.foods.utils.security;

import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
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
	
	private Key securityKey = Jwts.SIG.HS512.key().build();

	public String access(Authentication authentication) {
		return generate(authentication, Type.Access);
	}

	public String refresh(Authentication authentication) {
		return generate(authentication, Type.Refersh);
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
