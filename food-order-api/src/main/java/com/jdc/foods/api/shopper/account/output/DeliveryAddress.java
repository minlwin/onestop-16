package com.jdc.foods.api.shopper.account.output;

public record DeliveryAddress(
		int id,
		String label,
		String address,
		String township,
		boolean isDefault) {

	public static DeliveryAddress from(com.jdc.foods.model.management.entity.DeliveryAddress entity) {
		return new DeliveryAddress(
				entity.getId().hashCode(),
				entity.getLabel(),
				entity.getAddress(),
				entity.getTownship(),
				entity.isDefault());
	}

}
