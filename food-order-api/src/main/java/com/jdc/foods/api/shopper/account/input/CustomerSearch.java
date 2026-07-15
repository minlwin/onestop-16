package com.jdc.foods.api.shopper.account.input;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.util.StringUtils;

import com.jdc.foods.model.account.entity.Account_;
import com.jdc.foods.model.account.entity.Customer;
import com.jdc.foods.model.account.entity.Customer_;

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

		if(null != from) {
			prediates.add(cb.greaterThanOrEqualTo(root.get(Customer_.registeredAt), from.atStartOfDay()));
		}

		if(null != to) {
			prediates.add(cb.lessThan(root.get(Customer_.registeredAt), to.plusDays(1).atStartOfDay()));
		}

		if(StringUtils.hasLength(keyword)) {
			var param = keyword.toLowerCase().concat("%");
			prediates.add(cb.or(
				cb.like(cb.lower(root.get(Customer_.name)), param),
				cb.like(root.get(Customer_.phone), keyword.concat("%")),
				cb.like(cb.lower(root.get(Customer_.account).get(Account_.email)), param)
			));
		}

		return prediates;
	}

}
