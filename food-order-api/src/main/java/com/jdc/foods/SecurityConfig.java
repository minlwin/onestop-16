package com.jdc.foods;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.jdc.foods.utils.security.JwtTokenFilter;
import com.jdc.foods.utils.security.JwtTokenProvider;

@Configuration
public class SecurityConfig {

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) {
		
		http.csrf(csrf -> csrf.disable());
		
		http.authorizeHttpRequests(request -> {
			request.requestMatchers("/anonymous/**", "/resources/**").permitAll();
			request.requestMatchers("/shopper/**").hasAnyAuthority("Shopper", "Admin");
			request.requestMatchers("/customer/**").hasAuthority("Customer");
			request.anyRequest().denyAll();
		});
		
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		return http.build();
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) {
		return config.getAuthenticationManager();
	}
	
	@Bean
	JwtTokenFilter jwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
		return new JwtTokenFilter(jwtTokenProvider);
	}
}
