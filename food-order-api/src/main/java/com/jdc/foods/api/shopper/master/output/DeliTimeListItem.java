package com.jdc.foods.api.shopper.master.output;

import java.time.LocalDateTime;
import java.time.LocalTime;

import com.jdc.foods.model.master.entity.DeliveryTime;
import com.jdc.foods.model.master.entity.DeliveryTime_;
import com.jdc.foods.utils.consts.Status;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record DeliTimeListItem(
		int id,
		String name,
		LocalTime timeFrom,
		LocalTime timeTo,
		Status status,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt) {

	public static void select(CriteriaBuilder cb, CriteriaQuery<DeliTimeListItem> cq, Root<DeliveryTime> root) {

		cq.select(cb.construct(DeliTimeListItem.class,
			root.get(DeliveryTime_.id),
			cb.concat(cb.concat(root.get(DeliveryTime_.timeFrom), " - "), root.get(DeliveryTime_.timeTo)),
			root.get(DeliveryTime_.timeFrom).as(LocalTime.class),
			root.get(DeliveryTime_.timeTo).as(LocalTime.class),
			cb.selectCase()
				.when(cb.isNull(root.get(DeliveryTime_.deletedAt)), Status.Enable)
				.otherwise(Status.Disable),
			root.get(DeliveryTime_.createdAt),
			root.get(DeliveryTime_.modifiedAt)
		));

		cq.orderBy(cb.asc(root.get(DeliveryTime_.id)));
	}

}
