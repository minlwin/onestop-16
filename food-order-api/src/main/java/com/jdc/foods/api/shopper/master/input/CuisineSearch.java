package com.jdc.foods.api.shopper.master.input;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.StringUtils;

import com.jdc.foods.model.master.entity.Category_;
import com.jdc.foods.model.master.entity.Cuisine;
import com.jdc.foods.model.master.entity.Cuisine_;
import com.jdc.foods.utils.consts.Status;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record CuisineSearch(
	Status status,
	String keyword
) {

	public List<Predicate> where(CriteriaBuilder cb, Root<Cuisine> root) {
		var prediates = new ArrayList<Predicate>();

		if(null != status) {
			prediates.add(status == Status.Enable ?
					cb.isNull(root.get(Cuisine_.deletedAt)) :
					cb.isNotNull(root.get(Cuisine_.deletedAt)));
		}

		if(StringUtils.hasLength(keyword)) {
			var param = keyword.toLowerCase().concat("%");
			prediates.add(cb.or(
				cb.like(cb.lower(root.get(Cuisine_.name)), param),
				cb.like(cb.lower(root.get(Cuisine_.category).get(Category_.name)), param)
			));
		}

		return prediates;
	}
}
