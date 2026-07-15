package com.jdc.foods.api.shopper.account.input;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.util.StringUtils;

import com.jdc.foods.model.account.entity.Account_;
import com.jdc.foods.model.account.entity.Employee;
import com.jdc.foods.model.account.entity.Employee_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record EmployeeSearch(
	Boolean retired,
	String keyword
) {

	public List<Predicate> where(CriteriaBuilder cb, Root<Employee> root) {
		var prediates = new ArrayList<Predicate>();

		if(null != retired) {
			var isRetired = cb.and(
					cb.isNotNull(root.get(Employee_.retireAt)),
					cb.lessThan(root.get(Employee_.retireAt), LocalDate.now()));

			prediates.add(retired ? isRetired : cb.not(isRetired));
		}

		if(StringUtils.hasLength(keyword)) {
			var param = keyword.toLowerCase().concat("%");
			prediates.add(cb.or(
				cb.like(cb.lower(root.get(Employee_.name)), param),
				cb.like(root.get(Employee_.phone), keyword.concat("%")),
				cb.like(cb.lower(root.get(Employee_.account).get(Account_.email)), param)
			));
		}

		return prediates;
	}

}
