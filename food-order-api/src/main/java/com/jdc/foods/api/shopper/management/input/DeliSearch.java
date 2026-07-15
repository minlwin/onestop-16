package com.jdc.foods.api.shopper.management.input;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.util.StringUtils;

import com.jdc.foods.model.management.entity.DeliveryAddress_;
import com.jdc.foods.model.management.entity.Invoice;
import com.jdc.foods.model.management.entity.Invoice_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record DeliSearch(
	LocalDate from,
	LocalDate to,
	String keyword
) {

	public List<Predicate> where(CriteriaBuilder cb, Root<Invoice> root) {
		var prediates = new ArrayList<Predicate>();

		if(null != from) {
			prediates.add(cb.greaterThanOrEqualTo(root.get(Invoice_.dilveryDate), from));
		}

		if(null != to) {
			prediates.add(cb.lessThanOrEqualTo(root.get(Invoice_.dilveryDate), to));
		}

		if(StringUtils.hasLength(keyword)) {
			var param = keyword.toLowerCase().concat("%");
			prediates.add(cb.or(
				cb.like(cb.lower(root.get(Invoice_.name)), param),
				cb.like(cb.lower(root.get(Invoice_.address).get(DeliveryAddress_.address)), param)
			));
		}

		return prediates;
	}

}
