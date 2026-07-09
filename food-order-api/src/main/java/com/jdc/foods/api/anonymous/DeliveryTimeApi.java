package com.jdc.foods.api.anonymous;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.shopper.master.input.DeliTimeSearch;
import com.jdc.foods.api.shopper.master.output.DeliTimeListItem;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("anonymous/delivery-times")
public class DeliveryTimeApi {

	@GetMapping
	List<DeliTimeListItem> search(DeliTimeSearch form) {
		return List.of();
	}

}
