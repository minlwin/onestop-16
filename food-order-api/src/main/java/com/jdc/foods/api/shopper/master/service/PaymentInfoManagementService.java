package com.jdc.foods.api.shopper.master.service;

import static com.jdc.foods.utils.EntityUtils.safeCall;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.api.shopper.master.input.PaymentInfoForm;
import com.jdc.foods.api.shopper.master.input.PaymentInfoSearch;
import com.jdc.foods.api.shopper.master.output.PaymentInfoDetails;
import com.jdc.foods.api.shopper.master.output.PaymentInfoListItem;
import com.jdc.foods.model.master.entity.PaymentInfo;
import com.jdc.foods.model.master.repo.PaymentInfoRepo;
import com.jdc.foods.utils.consts.Status;
import com.jdc.foods.utils.dto.ModificationResult;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PaymentInfoManagementService implements PaymentInfoSearchService {

	private final PaymentInfoRepo repo;

	@Override
	public List<PaymentInfoListItem> search(PaymentInfoSearch form) {
		return repo.search(cb -> {
			var cq = cb.createQuery(PaymentInfoListItem.class);
			var root = cq.from(PaymentInfo.class);

			PaymentInfoListItem.select(cb, cq, root);

			cq.where(form.where(cb, root));

			return cq;
		});
	}

	public PaymentInfoDetails findById(int id) {
		return safeCall(repo.findById(id).map(PaymentInfoDetails::from))
				.apply("payment info").apply("id").apply(id);
	}

	@Transactional
	public ModificationResult<Integer> create(PaymentInfoForm form) {
		var entity = new PaymentInfo();
		entity.setProvider(form.bank());
		entity.setAccountNo(form.accountNo());
		entity.setAccountName(form.accountName());
		entity.setDeletedAt(form.status() == Status.Enable ? null : LocalDateTime.now());

		return ModificationResult.ok(repo.save(entity).getId());
	}

	@Transactional
	public ModificationResult<Integer> update(int id, PaymentInfoForm form) {
		var entity = safeCall(repo.findById(id))
				.apply("payment info").apply("id").apply(id);

		entity.setProvider(form.bank());
		entity.setAccountNo(form.accountNo());
		entity.setAccountName(form.accountName());
		entity.setDeletedAt(form.status() == Status.Enable ? null : LocalDateTime.now());

		return ModificationResult.ok(id);
	}

}
