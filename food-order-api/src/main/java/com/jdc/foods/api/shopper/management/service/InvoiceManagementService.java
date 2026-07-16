package com.jdc.foods.api.shopper.management.service;

import static com.jdc.foods.utils.EntityUtils.safeCall;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.api.shopper.management.input.DeliSearch;
import com.jdc.foods.api.shopper.management.input.InvoiceSearch;
import com.jdc.foods.api.shopper.management.output.DeliveryListItem;
import com.jdc.foods.api.shopper.management.output.InvoiceDetails;
import com.jdc.foods.api.shopper.management.output.InvoiceListItem;
import com.jdc.foods.model.management.InvoicePk;
import com.jdc.foods.model.management.InvoicePk_;
import com.jdc.foods.model.management.entity.Invoice;
import com.jdc.foods.model.management.entity.Invoice_;
import com.jdc.foods.model.management.repo.InvoiceRepo;
import com.jdc.foods.utils.dto.PageResult;

import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class InvoiceManagementService {

	private final InvoiceRepo repo;

	@Transactional(readOnly = true)
	public List<DeliveryListItem> search(DeliSearch form) {
		return repo.search(cb -> {
			var cq = cb.createQuery(Invoice.class);
			var root = cq.from(Invoice.class);

			cq.select(root);
			cq.where(form.where(cb, root).toArray(Predicate[]::new));
			cq.orderBy(cb.asc(root.get(Invoice_.dilveryDate)));

			return cq;
		}).stream().map(DeliveryListItem::from).toList();
	}

	@Transactional(readOnly = true)
	public PageResult<InvoiceListItem> search(InvoiceSearch form, Integer page, Integer size) {
		var result = repo.search(cb -> {
			var cq = cb.createQuery(Invoice.class);
			var root = cq.from(Invoice.class);

			cq.select(root);
			cq.where(form.where(cb, root).toArray(Predicate[]::new));
			cq.orderBy(
				cb.desc(root.get(Invoice_.id).get(InvoicePk_.issueAt)),
				cb.desc(root.get(Invoice_.id).get(InvoicePk_.seqNumber)));

			return cq;
		}, cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(Invoice.class);

			cq.select(cb.count(root));
			cq.where(form.where(cb, root).toArray(Predicate[]::new));

			return cq;
		}, page, size);

		return new PageResult<>(result.contents().stream().map(InvoiceListItem::from).toList(), result.pager());
	}

	@Transactional(readOnly = true)
	public InvoiceDetails findById(String id) {
		return safeCall(repo.findById(InvoicePk.fromCode(id)).map(InvoiceDetails::from))
				.apply("invoice").apply("id").apply(id);
	}

}
