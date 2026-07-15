package com.jdc.foods.model.management.entity;

import java.util.List;
import java.util.UUID;

import com.jdc.foods.model.account.entity.Customer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;

@Data
@Entity
@Table(uniqueConstraints = {
		@UniqueConstraint(columnNames = {
				"phone",
				"address",
				"township"
		})
})
public class DeliveryAddress {

	@Id
	@GeneratedValue
	private UUID id;
	
	@Column(nullable = false)
	private String phone;
	
	@Column(nullable = false)
	private String address;

	@Column(nullable = false)
	private String township;
	
	@ManyToOne(optional = true)
	private Customer customer;
	
	@OneToMany(mappedBy = "address")
	private List<Invoice> invoice;
}
