package com.jdc.foods.model.management;

import static com.jdc.foods.utils.FormatUtils.formatDate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record InvoicePk(
	@Column(name = "issue_at")
	LocalDate issueAt,
	@Column(name = "seq_number")
	int seqNumber
) {
	private static final DateTimeFormatter CODE_DATE_FMT = DateTimeFormatter.ofPattern("yyyyMMdd");

	public String getCode() {
		return "%s%04d".formatted(formatDate(issueAt), seqNumber);
	}

	public static InvoicePk fromCode(String code) {
		return new InvoicePk(
				LocalDate.parse(code.substring(0, 8), CODE_DATE_FMT),
				Integer.parseInt(code.substring(8)));
	}
}
