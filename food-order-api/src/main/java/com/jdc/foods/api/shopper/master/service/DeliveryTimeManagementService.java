package com.jdc.foods.api.shopper.master.service;

import static com.jdc.foods.utils.EntityUtils.safeCall;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.api.shopper.master.input.DeliTimeForm;
import com.jdc.foods.api.shopper.master.input.DeliTimeSearch;
import com.jdc.foods.api.shopper.master.output.DeliTimeDetails;
import com.jdc.foods.api.shopper.master.output.DeliTimeListItem;
import com.jdc.foods.model.master.entity.DeliveryTime;
import com.jdc.foods.model.master.repo.DeliveryTimeRepo;
import com.jdc.foods.utils.consts.Status;
import com.jdc.foods.utils.dto.ModificationResult;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DeliveryTimeManagementService implements DeliveryTimeSearchService {

	private final DeliveryTimeRepo repo;

	@Override
	public List<DeliTimeListItem> search(DeliTimeSearch form) {
		return repo.search(cb -> {
			var cq = cb.createQuery(DeliTimeListItem.class);
			var root = cq.from(DeliveryTime.class);

			DeliTimeListItem.select(cb, cq, root);

			cq.where(form.where(cb, root));

			return cq;
		});
	}

	public DeliTimeDetails findById(int id) {
		return safeCall(repo.findById(id).map(DeliTimeDetails::from))
				.apply("delivery time", id);
	}

	@Transactional
	public ModificationResult<Integer> create(DeliTimeForm form) {
		var entity = new DeliveryTime();
		entity.setTimeFrom(form.timeFrom().toString());
		entity.setTimeTo(form.timeTo().toString());
		entity.setDeletedAt(form.status() == Status.Enable ? null : LocalDateTime.now());

		return ModificationResult.ok(repo.save(entity).getId());
	}

	@Transactional
	public ModificationResult<Integer> update(int id, DeliTimeForm form) {
		var entity = safeCall(repo.findById(id))
				.apply("delivery time", id);

		entity.setTimeFrom(form.timeFrom().toString());
		entity.setTimeTo(form.timeTo().toString());
		entity.setDeletedAt(form.status() == Status.Enable ? null : LocalDateTime.now());

		return ModificationResult.ok(id);
	}

}
