package com.jdc.foods.api.shopper.master.output;

import java.time.LocalDateTime;

import com.jdc.foods.model.master.entity.PaymentInfo;
import com.jdc.foods.model.master.entity.PaymentInfo_;
import com.jdc.foods.utils.consts.Status;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record PaymentInfoListItem(
		int id,
		String name,
		String provider,
		String accountNo,
		String accountName,
		Status status,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt) {

	public static void select(CriteriaBuilder cb, CriteriaQuery<PaymentInfoListItem> cq, Root<PaymentInfo> root) {

		cq.select(cb.construct(PaymentInfoListItem.class,
			root.get(PaymentInfo_.id),
			root.get(PaymentInfo_.provider),
			root.get(PaymentInfo_.provider),
			root.get(PaymentInfo_.accountNo),
			root.get(PaymentInfo_.accountName),
			cb.selectCase()
				.when(cb.isNull(root.get(PaymentInfo_.deletedAt)), Status.Enable)
				.otherwise(Status.Disable),
			root.get(PaymentInfo_.createdAt),
			root.get(PaymentInfo_.modifiedAt)
		));

		cq.orderBy(cb.asc(root.get(PaymentInfo_.id)));
	}
}
