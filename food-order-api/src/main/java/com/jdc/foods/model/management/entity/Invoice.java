package com.jdc.foods.model.management.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.jdc.foods.model.AuditableEntity;
import com.jdc.foods.model.management.InvoicePk;
import com.jdc.foods.model.master.entity.DeliveryTime;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Invoice extends AuditableEntity {
	
	@EmbeddedId
	private InvoicePk id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String email;
	
	@ManyToOne(optional = false)
	private DeliveryAddress address;
	
	@Column(nullable = false)
	private LocalDate deliveryDate;

	@ManyToOne(optional = false)
	private DeliveryTime deliveryTime;
	
	@OneToMany(mappedBy = "invoice")
	private List<InvoiceItem> items;
	
	@Column(nullable = false)
	private Status status;
	
	@Column(nullable = false)
	private LocalDateTime invoicedAt;

	private LocalDateTime confirmedAt;
	private LocalDateTime finishedAt;
	
	private String remark;
	
	@OneToOne(mappedBy = "invoice")
	private InvoicePayment payment;
	
	public enum Status {
		Invoiced, Cancled, Confirmed, Finished
	}
	
}
