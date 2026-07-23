package com.jdc.foods.api.customer.service;

import static com.jdc.foods.utils.EntityUtils.safeCall;

import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.api.shopper.management.input.InvoiceSearch;
import com.jdc.foods.api.shopper.management.output.InvoiceDetails;
import com.jdc.foods.api.shopper.management.output.InvoiceListItem;
import com.jdc.foods.model.account.entity.Customer;
import com.jdc.foods.model.management.InvoicePk;
import com.jdc.foods.model.management.InvoicePk_;
import com.jdc.foods.model.management.entity.DeliveryAddress_;
import com.jdc.foods.model.management.entity.Invoice;
import com.jdc.foods.model.management.entity.Invoice_;
import com.jdc.foods.model.management.repo.InvoiceRepo;
import com.jdc.foods.utils.dto.PageResult;
import com.jdc.foods.utils.exceptions.BusinessRuleViolationException;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerInvoiceService {

	private final CurrentCustomerService currentCustomer;
	private final InvoiceRepo repo;

	@Transactional(readOnly = true)
	public PageResult<InvoiceListItem> search(InvoiceSearch form, Integer page, Integer size) {
		var customer = currentCustomer.get();

		return repo.search(cb -> {
			var cq = cb.createQuery(InvoiceListItem.class);
			var root = cq.from(Invoice.class);

			InvoiceListItem.select(cb, cq, root);
			cq.where(where(cb, root, form, customer));
			cq.orderBy(
				cb.desc(root.get(Invoice_.id).get(InvoicePk_.issueAt)),
				cb.desc(root.get(Invoice_.id).get(InvoicePk_.seqNumber)));

			return cq;
		}, cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(Invoice.class);

			cq.select(cb.count(root));
			cq.where(where(cb, root, form, customer));

			return cq;
		}, page, size);
	}

	@Transactional(readOnly = true)
	public InvoiceDetails findById(String id) {
		var customer = currentCustomer.get();
		var entity = safeCall(repo.findById(InvoicePk.fromCode(id)))
				.apply("invoice")
				.apply("id").apply(id);

		var owner = entity.getAddress().getCustomer();

		if(null == owner || owner.getId() != customer.getId()) {
			throw new BusinessRuleViolationException("You have no permission for invoice id %s.".formatted(id));
		}

		return InvoiceDetails.from(entity);
	}

	private Predicate[] where(CriteriaBuilder cb, Root<Invoice> root, InvoiceSearch form, Customer customer) {
		var predicates = new ArrayList<>(form.where(cb, root));
		predicates.add(cb.equal(root.get(Invoice_.address).get(DeliveryAddress_.customer), customer));

		return predicates.toArray(Predicate[]::new);
	}

}
