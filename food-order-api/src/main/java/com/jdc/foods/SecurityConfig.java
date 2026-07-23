package com.jdc.foods;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.ExceptionTranslationFilter;

import com.jdc.foods.utils.exceptions.SecurityExceptionResolver;
import com.jdc.foods.utils.security.JwtTokenFilter;

@Configuration
@EnableJpaAuditing
public class SecurityConfig {

	@Bean
	SecurityFilterChain securityFilterChain(
			HttpSecurity http,
			JwtTokenFilter jwtTokenFilter,
			SecurityExceptionResolver securityExceptionResolver) {
		
		http.csrf(csrf -> csrf.disable());
		
		http.authorizeHttpRequests(request -> {
			request.requestMatchers("/anonymous/**", "/resources/**").permitAll();
			request.requestMatchers("/shopper/**").hasAnyAuthority("Shopper", "Admin");
			request.requestMatchers("/customer/**").hasAuthority("Customer");
			request.anyRequest().denyAll();
		});
		
		http.addFilterAfter(jwtTokenFilter, ExceptionTranslationFilter.class);
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		http.exceptionHandling(exception -> {
			exception.accessDeniedHandler(securityExceptionResolver);
			exception.authenticationEntryPoint(securityExceptionResolver);
		});
		
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

}
