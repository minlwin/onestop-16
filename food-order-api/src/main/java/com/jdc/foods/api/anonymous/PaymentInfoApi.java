package com.jdc.foods.api.anonymous;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.shopper.master.input.PaymentInfoSearch;
import com.jdc.foods.api.shopper.master.output.PaymentInfoListItem;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("anonymous/payment-infos")
public class PaymentInfoApi {

	@GetMapping
	List<PaymentInfoListItem> search(PaymentInfoSearch form) {
		return List.of();
	}

}
