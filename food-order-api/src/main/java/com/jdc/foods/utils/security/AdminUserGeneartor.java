package com.jdc.foods.utils.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.jdc.foods.model.account.entity.Account;
import com.jdc.foods.model.account.entity.Account.Role;
import com.jdc.foods.model.account.repo.AccountRepo;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class AdminUserGeneartor {
	
	private final AccountRepo accountRepo;
	private final PasswordEncoder passwordEncoder;
	
	@Value("${app.admin.name}")
	private String name;
	@Value("${app.admin.email}")
	private String email;
	@Value("${app.admin.password}")
	private String password;

	@Bean
	ApplicationRunner applicationRunner() {
		return _ -> {
			if(accountRepo.count() == 0L) {
				var admin = new Account();
				admin.setName(name);
				admin.setEmail(email);
				admin.setPassword(passwordEncoder.encode(password));
				admin.setRoles(List.of(Role.Admin));
				
				accountRepo.save(admin);
			}
		};
	}
}
