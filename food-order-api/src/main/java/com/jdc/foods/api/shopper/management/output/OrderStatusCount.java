package com.jdc.foods.api.shopper.management.output;

import com.jdc.foods.model.management.entity.Invoice;
import com.jdc.foods.model.management.entity.Invoice_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record OrderStatusCount(
		String status,
		long count) {

	public static void select(CriteriaBuilder cb, CriteriaQuery<OrderStatusCount> cq, Root<Invoice> root) {

		cq.select(cb.construct(OrderStatusCount.class,
			root.get(Invoice_.status).as(String.class),
			cb.count(root)
		));

		cq.groupBy(root.get(Invoice_.status));
	}

}
