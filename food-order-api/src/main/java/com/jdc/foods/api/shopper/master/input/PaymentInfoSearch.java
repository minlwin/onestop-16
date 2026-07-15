package com.jdc.foods.api.shopper.master.input;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.StringUtils;

import com.jdc.foods.model.master.entity.PaymentInfo;
import com.jdc.foods.model.master.entity.PaymentInfo_;
import com.jdc.foods.utils.consts.Status;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record PaymentInfoSearch(
	Status status,
	String bank,
	String account
) {

	public List<Predicate> where(CriteriaBuilder cb, Root<PaymentInfo> root) {
		var prediates = new ArrayList<Predicate>();

		if(null != status) {
			prediates.add(status == Status.Enable ?
					cb.isNull(root.get(PaymentInfo_.deletedAt)) :
					cb.isNotNull(root.get(PaymentInfo_.deletedAt)));
		}

		if(StringUtils.hasLength(bank)) {
			prediates.add(
					cb.like(cb.lower(root.get(PaymentInfo_.provider)),
							bank.toLowerCase().concat("%")));
		}

		if(StringUtils.hasLength(account)) {
			prediates.add(cb.or(
					cb.like(root.get(PaymentInfo_.accountNo), account.concat("%")),
					cb.like(cb.lower(root.get(PaymentInfo_.accountName)),
							account.toLowerCase().concat("%"))));
		}

		return prediates;
	}

	public static PaymentInfoSearch getDefault() {
		return new PaymentInfoSearch(null, null, null);
	}


}
