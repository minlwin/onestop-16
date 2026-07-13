package com.jdc.foods.model.account.entity;

import java.time.LocalDate;

import com.jdc.foods.model.AuditableEntity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Employee extends AuditableEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false)
	private String name;
	
	@OneToOne(optional = false)
	private Account account;
	
	@Column(nullable = false)
	private String phone;
	
	@Column(nullable = false)
	private LocalDate entryAt;

	private LocalDate retireAt;

}
