package com.jdc.foods.api.shopper.management.output;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.foods.model.management.InvoicePk;
import com.jdc.foods.model.management.InvoicePk_;
import com.jdc.foods.model.management.entity.DeliveryAddress_;
import com.jdc.foods.model.management.entity.Invoice;
import com.jdc.foods.model.management.entity.Invoice.Status;
import com.jdc.foods.model.management.entity.InvoiceItem_;
import com.jdc.foods.model.management.entity.Invoice_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;

public record InvoiceListItem(
		String id,
		String customer,
		String phone,
		LocalDate invoiceDate,
		Status status,
		LocalDateTime statusChangedAt,
		BigDecimal deliveryFee,
		BigDecimal amount) {
	
	public InvoiceListItem(
			LocalDate issueAt,
			int seqNumber,
			String customer, 
			String phone, 
			Status status,
			LocalDateTime statusChangedAt, 
			BigDecimal deliveryFee,
			BigDecimal amount) {
		this(
			new InvoicePk(issueAt, seqNumber).getCode(), 
			customer,
			phone,
			issueAt,
			status,
			statusChangedAt,
			deliveryFee,
			amount
		);
	}


	public static void select(CriteriaBuilder cb, CriteriaQuery<InvoiceListItem> cq, Root<Invoice> root) {
		
		var items = root.join(Invoice_.items, JoinType.INNER);
		
		cq.select(cb.construct(InvoiceListItem.class, 
			root.get(Invoice_.id).get(InvoicePk_.issueAt),
			root.get(Invoice_.id).get(InvoicePk_.seqNumber),
			root.get(Invoice_.name),
			root.get(Invoice_.address).get(DeliveryAddress_.phone),
			root.get(Invoice_.status),
			root.get(Invoice_.modifiedAt),
			root.get(Invoice_.address).get(DeliveryAddress_.deliveryFee),
			cb.sum(cb.prod(items.get(InvoiceItem_.quantity), items.get(InvoiceItem_.unitPrice)))
		));
		
		cq.groupBy(
			root.get(Invoice_.id).get(InvoicePk_.issueAt),
			root.get(Invoice_.id).get(InvoicePk_.seqNumber),
			root.get(Invoice_.name),
			root.get(Invoice_.address).get(DeliveryAddress_.phone),
			root.get(Invoice_.status),
			root.get(Invoice_.modifiedAt),
			root.get(Invoice_.address).get(DeliveryAddress_.deliveryFee)				
		);
	}
}
