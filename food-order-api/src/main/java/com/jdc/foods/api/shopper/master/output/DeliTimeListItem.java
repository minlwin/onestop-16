package com.jdc.foods.api.shopper.master.output;

import java.time.LocalDateTime;

import com.jdc.foods.model.master.entity.DeliveryTime;
import com.jdc.foods.model.master.entity.DeliveryTime_;
import com.jdc.foods.utils.consts.Status;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record DeliTimeListItem(
		int id,
		String name,
		String timeFrom,
		String timeTo,
		LocalDateTime deletedAt,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt) {

	public Status getStatus() {
		return deletedAt == null ? Status.Enable : Status.Disable;
	}

	public static void select(CriteriaBuilder cb, CriteriaQuery<DeliTimeListItem> cq, Root<DeliveryTime> root) {

		cq.select(cb.construct(DeliTimeListItem.class,
			root.get(DeliveryTime_.id),
			cb.concat(cb.concat(root.get(DeliveryTime_.timeFrom), " - "), root.get(DeliveryTime_.timeTo)),
			root.get(DeliveryTime_.timeFrom),
			root.get(DeliveryTime_.timeTo),
			root.get(DeliveryTime_.deletedAt),
			root.get(DeliveryTime_.createdAt),
			root.get(DeliveryTime_.modifiedAt)
		));

		cq.orderBy(cb.asc(root.get(DeliveryTime_.id)));
	}

}
