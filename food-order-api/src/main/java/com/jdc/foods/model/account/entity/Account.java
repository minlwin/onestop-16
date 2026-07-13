package com.jdc.foods.model.account.entity;

import java.util.List;

import com.jdc.foods.model.AuditableEntity;
import com.jdc.foods.utils.converter.RolesConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Account extends AuditableEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false, unique = true)
	private String email;
	
	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	@Convert(converter = RolesConverter.class)
	private List<Role> roles;
	
	public enum Role {
		Admin, Customer, Shopper
	}
}
