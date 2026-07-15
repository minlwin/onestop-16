package com.jdc.foods.model.management;

import static com.jdc.foods.utils.FormatUtils.formatDate;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record InvoicePk(
	@Column(name = "issue_at")
	LocalDate issueAt, 
	@Column(name = "seq_number")
	int seqNumber
) {
	public String getCode() {
		return "%s%04d".formatted(formatDate(issueAt), seqNumber);
	}
}
