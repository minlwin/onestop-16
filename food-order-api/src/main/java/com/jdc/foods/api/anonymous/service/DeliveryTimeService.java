package com.jdc.foods.api.anonymous.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.api.shopper.master.input.DeliTimeSearch;
import com.jdc.foods.api.shopper.master.output.DeliTimeListItem;
import com.jdc.foods.api.shopper.master.service.DeliveryTimeSearchService;
import com.jdc.foods.utils.consts.Status;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DeliveryTimeService {
	
	private final DeliveryTimeSearchService service;
	
	@Transactional(readOnly = true)
	public List<DeliTimeListItem> findAll() {
		return service.search(DeliTimeSearch.getDefault())
				.stream()
				.filter(a -> a.status() == Status.Enable)
				.toList();
	}

}
