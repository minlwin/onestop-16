package com.jdc.foods.api.anonymous.output;

import java.util.List;

import com.jdc.foods.model.account.entity.Account;
import com.jdc.foods.model.account.entity.Account.Role;

public record AuthResult(
		String name,
		List<Role> roles,
		String accessToken,
		String refreshToken) {

	public static AuthResult from(Account account, String access, String refresh) {
		return new AuthResult(
			account.getName(), 
			account.getRoles(), 
			access, 
			refresh
		);
	}

}
