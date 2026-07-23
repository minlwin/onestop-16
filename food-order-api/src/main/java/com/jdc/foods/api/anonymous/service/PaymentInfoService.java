package com.jdc.foods.api.anonymous.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.api.shopper.master.input.PaymentInfoSearch;
import com.jdc.foods.api.shopper.master.output.PaymentInfoListItem;
import com.jdc.foods.api.shopper.master.service.PaymentInfoSearchService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentInfoService {
	
	private final PaymentInfoSearchService service;
	
	@Transactional(readOnly = true)
	public List<PaymentInfoListItem> findAll() {
		return service.search(PaymentInfoSearch.getDefault())
				.stream()
				.filter(a -> a.deletedAt() == null)
				.toList();
	}

}
