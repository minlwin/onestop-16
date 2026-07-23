package com.jdc.foods.api.customer.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.api.shopper.management.output.InvoiceListItem;
import com.jdc.foods.api.shopper.management.output.OrderCuisineSummary;
import com.jdc.foods.model.management.InvoicePk_;
import com.jdc.foods.model.management.entity.DeliveryAddress_;
import com.jdc.foods.model.management.entity.Invoice;
import com.jdc.foods.model.management.entity.InvoiceItem;
import com.jdc.foods.model.management.entity.InvoiceItem_;
import com.jdc.foods.model.management.entity.Invoice_;
import com.jdc.foods.model.management.repo.InvoiceItemRepo;
import com.jdc.foods.model.management.repo.InvoiceRepo;
import com.jdc.foods.model.master.entity.Cuisine_;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerDashboardService {

	private static final int RECENT_LIMIT = 5;
	private static final int FAV_CUISINE_LIMIT = 5;

	private final CurrentCustomerService currentCustomer;
	private final InvoiceRepo invoiceRepo;
	private final InvoiceItemRepo invoiceItemRepo;

	@Transactional(readOnly = true)
	public List<InvoiceListItem> findRecent() {
		var customer = currentCustomer.get();

		return invoiceRepo.search(cb -> {
			var cq = cb.createQuery(InvoiceListItem.class);
			var root = cq.from(Invoice.class);

			InvoiceListItem.select(cb, cq, root);
			cq.where(cb.equal(root.get(Invoice_.address).get(DeliveryAddress_.customer), customer));
			cq.orderBy(
				cb.desc(root.get(Invoice_.id).get(InvoicePk_.issueAt)),
				cb.desc(root.get(Invoice_.id).get(InvoicePk_.seqNumber)));

			return cq;
		}).stream().limit(RECENT_LIMIT).toList();
	}

	@Transactional(readOnly = true)
	public List<OrderCuisineSummary> getFavCuisines() {
		var customer = currentCustomer.get();

		return invoiceItemRepo.search(cb -> {
			var cq = cb.createQuery(OrderCuisineSummary.class);
			var root = cq.from(InvoiceItem.class);

			var cuisine = root.join(InvoiceItem_.cuisine);
			var invoice = root.join(InvoiceItem_.invoice);
			var address = invoice.join(Invoice_.address);

			var totalQty = cb.sum(root.get(InvoiceItem_.quantity));

			cq.select(cb.construct(OrderCuisineSummary.class,
				cuisine.get(Cuisine_.name),
				totalQty
			));

			cq.where(cb.equal(address.get(DeliveryAddress_.customer), customer));
			cq.groupBy(cuisine.get(Cuisine_.name));
			cq.orderBy(cb.desc(totalQty));

			return cq;
		}).stream().limit(FAV_CUISINE_LIMIT).toList();
	}

}
