package com.jdc.foods.api.shopper.management.input;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.jdc.foods.model.management.entity.Invoice;

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
				
		return prediates;
	}

}
