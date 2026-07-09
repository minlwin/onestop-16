package com.jdc.foods.api.shopper.management.output;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public record DeliveryInfo(
		String label,
		String address,
		String township,
		BigDecimal fees,
		LocalDate dispatchDate,
		LocalTime timeFrom,
		LocalTime timeTo,
		String remark) {

}
