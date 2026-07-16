package com.jdc.foods.model.account.entity;

import java.time.LocalDate;

import com.jdc.foods.model.AuditableEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Employee extends AuditableEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@OneToOne(optional = false)
	private Account account;
	
	@Column(nullable = false)
	private String phone;
	
	@Column(nullable = false)
	private LocalDate entryAt;

	private LocalDate retireAt;

}
