package com.jdc.foods.api.anonymous.output;

import java.util.List;

public record AuthResult(
		String name,
		List<String> roles,
		String accessToken,
		String refreshToken) {
	
	public static Builder builder() {
		return new Builder();
	}
	
	public static class Builder {
		private String name;
		private List<String> roles;
		private String accessToken;
		private String refreshToken;
		
		public AuthResult build() {
			return new AuthResult(name, roles, accessToken, refreshToken);
		}
		
		public Builder name(String name) {
			this.name = name;
			return this;
		}
		public Builder roles(List<String> roles) {
			this.roles = roles;
			return this;
		}
		public Builder accessToken(String accessToken) {
			this.accessToken = accessToken;
			return this;
		}
		public Builder refreshToken(String refreshToken) {
			this.refreshToken = refreshToken;
			return this;
		}
		
		
	}
}
