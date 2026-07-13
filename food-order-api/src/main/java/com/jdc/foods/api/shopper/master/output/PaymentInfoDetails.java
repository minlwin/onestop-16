package com.jdc.foods.api.shopper.master.output;

import com.jdc.foods.utils.consts.Status;

public record PaymentInfoDetails(
		int id,
		String bank,
		String accountNo,
		String accountName,
		Status status) {

}
