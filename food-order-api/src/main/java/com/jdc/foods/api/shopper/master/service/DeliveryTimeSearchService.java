package com.jdc.foods.api.shopper.master.service;

import java.util.List;

import com.jdc.foods.api.shopper.master.input.DeliTimeSearch;
import com.jdc.foods.api.shopper.master.output.DeliTimeListItem;

public interface DeliveryTimeSearchService {

	List<DeliTimeListItem> search(DeliTimeSearch form);

}