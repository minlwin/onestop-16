package com.jdc.foods.api.shopper.management.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jdc.foods.api.shopper.management.output.OrderCuisineSummary;
import com.jdc.foods.api.shopper.management.output.WeeklyInvoiceItem;
import com.jdc.foods.model.management.entity.Invoice;
import com.jdc.foods.model.management.entity.Invoice.Status;
import com.jdc.foods.model.management.entity.InvoiceItem;
import com.jdc.foods.model.management.entity.InvoiceItem_;
import com.jdc.foods.model.management.entity.Invoice_;
import com.jdc.foods.model.management.repo.InvoiceItemRepo;
import com.jdc.foods.model.management.repo.InvoiceRepo;
import com.jdc.foods.model.master.entity.Cuisine_;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderManagementService {
	
	private final InvoiceRepo repo;
	private final InvoiceItemRepo itemRepo;

	public List<WeeklyInvoiceItem> search() {
		return repo.search(cb -> {
			var cq = cb.createQuery(WeeklyInvoiceItem.class);
			var root = cq.from(Invoice.class);
			
			cq.where(cb.equal(root.get(Invoice_.status), Status.Confirmed));
			WeeklyInvoiceItem.select(cb, cq, root);
			
			return cq;
		});
	}

	public List<OrderCuisineSummary> searchCuisine() {
		return itemRepo.search(cb -> {
			var cq = cb.createQuery(OrderCuisineSummary.class);
			var root = cq.from(InvoiceItem.class);
			var invoice = root.join(InvoiceItem_.invoice);
			var cuisine = root.join(InvoiceItem_.cuisine);
			
			cq.where(cb.equal(invoice.get(Invoice_.status), Status.Confirmed));
			cq.select(cb.construct(
				OrderCuisineSummary.class, 
				cuisine.get(Cuisine_.name),
				cb.sum(root.get(InvoiceItem_.quantity))
			));
			
			cq.groupBy(cuisine.get(Cuisine_.name));
			
			return cq;
		});
	}

}
