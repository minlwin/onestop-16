package com.jdc.foods.utils;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public abstract class FormatUtils {

	private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("yyyyMMdd");
	private static final DecimalFormat CURRENCY_FMT = new DecimalFormat("#,##0");

	public static String formatDate(LocalDate date) {
		return date.format(DATE_FMT);
	}

	public static String formatCurrency(BigDecimal amount) {
		return "%s MMK".formatted(CURRENCY_FMT.format(amount));
	}
}
