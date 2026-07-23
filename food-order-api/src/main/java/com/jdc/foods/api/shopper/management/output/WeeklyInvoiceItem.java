package com.jdc.foods.api.shopper.management.output;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.foods.model.management.InvoicePk;
import com.jdc.foods.model.management.InvoicePk_;
import com.jdc.foods.model.management.entity.Invoice;
import com.jdc.foods.model.management.entity.Invoice_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record WeeklyInvoiceItem(
		String id,
		String customer,
		LocalDate confirmDate,
		LocalDate deliveryDate) {
	
	public WeeklyInvoiceItem(
			LocalDate issueAt, 
			int seqNum, 
			String customer, 
			LocalDateTime confirmDate, 
			LocalDate deliveryDate) {
		this(new InvoicePk(issueAt, seqNum).getCode(), customer, confirmDate.toLocalDate(), deliveryDate);
	}

	public static void select(CriteriaBuilder cb, CriteriaQuery<WeeklyInvoiceItem> cq, Root<Invoice> root) {
		cq.select(cb.construct(
			WeeklyInvoiceItem.class, 
			root.get(Invoice_.id).get(InvoicePk_.issueAt),
			root.get(Invoice_.id).get(InvoicePk_.seqNumber),
			root.get(Invoice_.name),
			root.get(Invoice_.confirmedAt),
			root.get(Invoice_.deliveryDate)
		));
	}

}
