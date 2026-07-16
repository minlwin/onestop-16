package com.jdc.foods.utils.security;

import static com.jdc.foods.utils.EntityUtils.safeCall;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.jdc.foods.model.account.entity.Account;
import com.jdc.foods.model.account.entity.Account.Role;
import com.jdc.foods.model.account.repo.AccountRepo;
import com.jdc.foods.model.account.repo.EmployeeRepo;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {
	
	private final AccountRepo accountRepo;
	private final EmployeeRepo employeeRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		var account = safeCall(accountRepo.findByEmail(username).map(UserDetailsAdaptor::new))
				.apply("account").apply("email").apply(username);
		
		
		return User.withUsername(username)
				.password(account.getPassword())
				.authorities(account.getAuthorities())
				.accountExpired(account.expired())
				.disabled(!account.enabled())
				.build();
	}
	
	private class UserDetailsAdaptor {
		
		private Account account;
		private boolean enabled = true;
		private boolean expired = false;
		private List<String> authorities = new ArrayList<>();
		
		UserDetailsAdaptor(Account account) {
			this.account = account;
			this.authorities = account.getRoles().stream().map(role -> role.name()).toList();
			
			if(account.getRoles().contains(Role.Shopper)) {
				var employee = safeCall(employeeRepo.findByAccountEmail(account.getEmail()))
						.apply("employee").apply("email").apply(account.getEmail());
				
				var today = LocalDate.now();
				var entryDate = employee.getEntryAt();
				var retireDate = employee.getRetireAt();
				
				this.enabled = today.equals(entryDate) || today.isAfter(entryDate);
				this.expired = retireDate != null && (today.equals(retireDate) || today.isBefore(retireDate));
				
				if(!this.enabled || this.expired) {
					this.authorities.remove(Role.Shopper.name());
				}
				
				if(!this.authorities.isEmpty()) {
					this.enabled = true;
					this.expired = false;
				}
			}
		}

		public boolean enabled() {
			return this.enabled;
		}

		public boolean expired() {
			return this.expired;
		}

		public String[] getAuthorities() {
			return this.authorities.toArray(size -> new String[size]);
		}

		public String getPassword() {
			return account.getPassword();
		}
		
	}

}
