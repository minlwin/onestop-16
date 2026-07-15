package com.jdc.foods.model.management.entity;

import java.time.LocalDateTime;

import com.jdc.foods.model.AuditableEntity;
import com.jdc.foods.model.management.InvoicePk;
import com.jdc.foods.model.master.entity.PaymentInfo;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class InvoicePayment extends AuditableEntity {

	@Embedded
	private InvoicePk id;
	
	@OneToOne(optional = false)
	@JoinColumn(name = "issue_at", insertable = false, updatable = false)
	@JoinColumn(name = "seq_number", insertable = false, updatable = false)
	private Invoice invoice;
	
	@ManyToOne(optional = false)
	private PaymentInfo payment;
	
	@Column(nullable = false)
	private LocalDateTime paidAt;
}
