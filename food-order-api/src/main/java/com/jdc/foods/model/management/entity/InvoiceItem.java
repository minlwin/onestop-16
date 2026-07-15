package com.jdc.foods.model.management.entity;

import java.math.BigDecimal;

import com.jdc.foods.model.management.InvoiceItemPk;
import com.jdc.foods.model.master.entity.Cuisine;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class InvoiceItem {
	
	@Embedded
	private InvoiceItemPk id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "issue_at", insertable = false, updatable = false)
	@JoinColumn(name = "seq_number", insertable = false, updatable = false)
	private Invoice invoice;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "cuisine_id", insertable = false, updatable = false)
	private Cuisine cuisine;
	
	@Column(nullable = false)
	private BigDecimal unitPrice;
	
	@Column(nullable = false)
	private int quantity;
}
