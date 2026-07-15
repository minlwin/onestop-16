package com.jdc.foods.api.shopper.management.input;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.util.StringUtils;

import com.jdc.foods.model.management.InvoicePk_;
import com.jdc.foods.model.management.entity.DeliveryAddress_;
import com.jdc.foods.model.management.entity.Invoice;
import com.jdc.foods.model.management.entity.Invoice_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record InvoiceSearch(
	String status,
	LocalDate from,
	LocalDate to,
	String keyword
) {

	public List<Predicate> where(CriteriaBuilder cb, Root<Invoice> root) {
		var prediates = new ArrayList<Predicate>();

		if(StringUtils.hasLength(status)) {
			prediates.add(cb.equal(root.get(Invoice_.status), Invoice.Status.valueOf(status)));
		}

		if(null != from) {
			prediates.add(cb.greaterThanOrEqualTo(root.get(Invoice_.id).get(InvoicePk_.issueAt), from));
		}

		if(null != to) {
			prediates.add(cb.lessThanOrEqualTo(root.get(Invoice_.id).get(InvoicePk_.issueAt), to));
		}

		if(StringUtils.hasLength(keyword)) {
			var param = keyword.toLowerCase().concat("%");
			prediates.add(cb.or(
				cb.like(cb.lower(root.get(Invoice_.name)), param),
				cb.like(root.get(Invoice_.address).get(DeliveryAddress_.phone), keyword.concat("%"))
			));
		}

		return prediates;
	}

}
