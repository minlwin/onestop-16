package com.jdc.foods.api.shopper.account.output;

public record DeliveryAddress(
		int id,
		String label,
		String address,
		String township,
		boolean isDefault) {

}
