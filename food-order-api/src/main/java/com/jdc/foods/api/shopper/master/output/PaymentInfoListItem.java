package com.jdc.foods.api.shopper.master.output;

import java.time.LocalDateTime;

import com.jdc.foods.model.consts.Status;

public record PaymentInfoListItem(
		int id,
		String name,
		String provider,
		String accountNo,
		String accountName,
		Status status,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt) {

}
