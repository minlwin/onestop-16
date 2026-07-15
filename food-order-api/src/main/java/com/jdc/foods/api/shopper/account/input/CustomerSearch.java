package com.jdc.foods.api.shopper.account.input;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.jdc.foods.model.account.entity.Customer;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record CustomerSearch(
	LocalDate from,
	LocalDate to,
	String keyword,
	Integer page,
	Integer size
) {

	public List<Predicate> where(CriteriaBuilder cb, Root<Customer> root) {
		var prediates = new ArrayList<Predicate>();
				
		return prediates;
	}

}
