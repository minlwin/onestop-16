package com.jdc.foods.api.shopper.account.output;

import java.time.LocalDateTime;

import com.jdc.foods.model.account.entity.Account_;
import com.jdc.foods.model.account.entity.Customer;
import com.jdc.foods.model.account.entity.Customer_;
import com.jdc.foods.model.management.entity.DeliveryAddress_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;

public record CustomerListItem(
		int id,
		String name,
		String phone,
		String email,
		LocalDateTime registeredAt,
		long invoices) {

	public static void select(CriteriaBuilder cb, CriteriaQuery<CustomerListItem> cq, Root<Customer> root) {

		var account = root.join(Customer_.account);
		var address = root.join(Customer_.address, JoinType.LEFT);
		var invoice = address.join(DeliveryAddress_.invoice, JoinType.LEFT);

		cq.select(cb.construct(CustomerListItem.class,
			root.get(Customer_.id),
			root.get(Customer_.account).get(Account_.name),
			root.get(Customer_.phone),
			account.get(Account_.email),
			root.get(Customer_.registeredAt),
			cb.count(invoice)
		));

		cq.groupBy(
			root.get(Customer_.id),
			root.get(Customer_.account).get(Account_.name),
			root.get(Customer_.phone),
			account.get(Account_.email),
			root.get(Customer_.registeredAt)
		);

		cq.orderBy(cb.asc(root.get(Customer_.id)));
	}

}
