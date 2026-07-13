package com.jdc.foods.api.shopper.master.input;

import com.jdc.foods.utils.consts.Status;

public record PaymentInfoSearch(
	Status status,
	String bank,
	String account
) {

}
