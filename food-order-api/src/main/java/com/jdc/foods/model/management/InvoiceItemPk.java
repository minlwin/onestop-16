package com.jdc.foods.model.management;

import java.time.LocalDate;

import jakarta.persistence.Column;

public record InvoiceItemPk(
		@Column(name = "issue_at")
		LocalDate issueAt, 
		@Column(name = "seq_number")
		int seqNumber,
		@Column(name = "cuisine_id")
		int cuisineId
) {

}
