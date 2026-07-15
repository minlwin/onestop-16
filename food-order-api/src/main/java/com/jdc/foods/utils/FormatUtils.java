package com.jdc.foods.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public abstract class FormatUtils {

	private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("yyyyMMdd");
	
	public static String formatDate(LocalDate date) {
		return date.format(DATE_FMT);
	}
}
