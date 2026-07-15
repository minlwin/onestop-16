package com.jdc.foods.api.shopper.management;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.shopper.management.input.DeliSearch;
import com.jdc.foods.api.shopper.management.output.DeliveryListItem;
import com.jdc.foods.api.shopper.management.service.InvoiceManagementService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController("deliveryManagementApi")
@RequestMapping("shopper/management/deliveries")
public class DeliveryManagementApi {
	
	private final InvoiceManagementService service;

	@GetMapping
	List<DeliveryListItem> search(DeliSearch form) {
		return service.search(form);
	}

}
