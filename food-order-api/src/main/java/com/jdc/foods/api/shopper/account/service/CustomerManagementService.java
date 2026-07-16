package com.jdc.foods.api.shopper.account.service;

import static com.jdc.foods.utils.EntityUtils.safeCall;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.api.shopper.account.input.CustomerSearch;
import com.jdc.foods.api.shopper.account.output.CustomerDetails;
import com.jdc.foods.api.shopper.account.output.CustomerListItem;
import com.jdc.foods.api.shopper.account.output.OrderStatusSummary;
import com.jdc.foods.model.account.entity.Customer;
import com.jdc.foods.model.account.repo.CustomerRepo;
import com.jdc.foods.model.management.entity.DeliveryAddress_;
import com.jdc.foods.model.management.entity.Invoice;
import com.jdc.foods.model.management.entity.Invoice_;
import com.jdc.foods.model.management.repo.InvoiceRepo;
import com.jdc.foods.utils.dto.PageResult;

import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerManagementService {

	private final CustomerRepo repo;
	private final InvoiceRepo invoiceRepo;

	@Transactional(readOnly = true)
	public PageResult<CustomerListItem> search(CustomerSearch form, Integer page, Integer size) {
		return repo.search(cb -> {
			var cq = cb.createQuery(CustomerListItem.class);
			var root = cq.from(Customer.class);

			CustomerListItem.select(cb, cq, root);

			cq.where(form.where(cb, root).toArray(Predicate[]::new));

			return cq;
		}, cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(Customer.class);

			cq.select(cb.count(root));
			cq.where(form.where(cb, root).toArray(Predicate[]::new));

			return cq;
		}, page, size);
	}

	@Transactional(readOnly = true)
	public CustomerDetails findById(int id) {
		var customer = safeCall(repo.findById(id))
				.apply("customer").apply("id").apply(id);

		var invoices = invoiceRepo.search(cb -> {
			var cq = cb.createQuery(Invoice.class);
			var root = cq.from(Invoice.class);

			cq.select(root);
			cq.where(cb.equal(root.get(Invoice_.address).get(DeliveryAddress_.customer), customer));

			return cq;
		});

		return CustomerDetails.from(customer, OrderStatusSummary.summarize(invoices));
	}

}
