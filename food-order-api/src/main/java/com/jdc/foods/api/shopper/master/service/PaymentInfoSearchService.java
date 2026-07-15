package com.jdc.foods.api.shopper.master.service;

import java.util.List;

import com.jdc.foods.api.shopper.master.input.PaymentInfoSearch;
import com.jdc.foods.api.shopper.master.output.PaymentInfoListItem;

public interface PaymentInfoSearchService {

	List<PaymentInfoListItem> search(PaymentInfoSearch form);

}