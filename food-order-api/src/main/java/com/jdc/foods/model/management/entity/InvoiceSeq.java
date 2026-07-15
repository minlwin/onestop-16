package com.jdc.foods.model.management.entity;

import java.time.LocalDate;

import com.jdc.foods.model.management.InvoicePk;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class InvoiceSeq {

	@Id
	private LocalDate issueAt;
	
	@Column(nullable = false)
	private int seqNumber;

	public InvoicePk next() {
		seqNumber ++;
		return new InvoicePk(issueAt, seqNumber);
	}
}
