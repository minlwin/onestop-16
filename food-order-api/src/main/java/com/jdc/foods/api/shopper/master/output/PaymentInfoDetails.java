package com.jdc.foods.api.shopper.master.output;

import com.jdc.foods.model.master.entity.PaymentInfo;
import com.jdc.foods.utils.consts.Status;

public record PaymentInfoDetails(
		int id,
		String bank,
		String accountNo,
		String accountName,
		Status status) {

	public static PaymentInfoDetails from(PaymentInfo entity) {
		return new PaymentInfoDetails(
				entity.getId(),
				entity.getProvider(),
				entity.getAccountNo(),
				entity.getAccountName(),
				entity.getDeletedAt() == null ? Status.Enable : Status.Disable);
	}
}
