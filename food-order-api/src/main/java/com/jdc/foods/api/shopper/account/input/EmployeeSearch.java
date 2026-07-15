package com.jdc.foods.api.shopper.account.input;

import java.util.ArrayList;
import java.util.List;

import com.jdc.foods.model.account.entity.Employee;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record EmployeeSearch(
	Boolean retired,
	String keyword
) {

	public List<Predicate> where(CriteriaBuilder cb, Root<Employee> root) {
		var prediates = new ArrayList<Predicate>();
				
		return prediates;
	}

}
