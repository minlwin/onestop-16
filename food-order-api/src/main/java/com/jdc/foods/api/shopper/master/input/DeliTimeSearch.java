package com.jdc.foods.api.shopper.master.input;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.StringUtils;

import com.jdc.foods.model.master.entity.DeliveryTime;
import com.jdc.foods.model.master.entity.DeliveryTime_;
import com.jdc.foods.utils.consts.Status;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record DeliTimeSearch(
	Status status,
	String time
) {

	public List<Predicate> where(CriteriaBuilder cb, Root<DeliveryTime> root) {
		var prediates = new ArrayList<Predicate>();

		if(null != status) {
			prediates.add(status == Status.Enable ?
					cb.isNull(root.get(DeliveryTime_.deletedAt)) :
					cb.isNotNull(root.get(DeliveryTime_.deletedAt)));
		}

		if(StringUtils.hasLength(time)) {
			prediates.add(cb.or(
					cb.like(root.get(DeliveryTime_.timeFrom), time.concat("%")),
					cb.like(root.get(DeliveryTime_.timeTo), time.concat("%"))));
		}

		return prediates;
	}

	public static DeliTimeSearch getDefault() {
		return new DeliTimeSearch(null, null);
	}

}
