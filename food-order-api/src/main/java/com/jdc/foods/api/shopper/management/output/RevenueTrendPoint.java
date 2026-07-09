package com.jdc.foods.api.shopper.management.output;

import java.math.BigDecimal;

public record RevenueTrendPoint(
		String day,
		BigDecimal revenue) {

}
