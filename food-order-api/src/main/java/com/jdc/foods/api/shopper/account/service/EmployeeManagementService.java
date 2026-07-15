package com.jdc.foods.api.shopper.account.service;

import static com.jdc.foods.utils.EntityUtils.safeCall;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.api.shopper.account.input.EmployeeForm;
import com.jdc.foods.api.shopper.account.input.EmployeeSearch;
import com.jdc.foods.api.shopper.account.output.EmployeeDetails;
import com.jdc.foods.api.shopper.account.output.EmployeeListItem;
import com.jdc.foods.model.account.entity.Account;
import com.jdc.foods.model.account.entity.Account.Role;
import com.jdc.foods.model.account.entity.Employee;
import com.jdc.foods.model.account.entity.Employee_;
import com.jdc.foods.model.account.repo.AccountRepo;
import com.jdc.foods.model.account.repo.EmployeeRepo;
import com.jdc.foods.utils.dto.ModificationResult;

import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class EmployeeManagementService {

	private final EmployeeRepo repo;
	private final AccountRepo accountRepo;

	@Transactional(readOnly = true)
	public List<EmployeeListItem> search(EmployeeSearch form) {
		return repo.search(cb -> {
			var cq = cb.createQuery(Employee.class);
			var root = cq.from(Employee.class);

			cq.select(root);
			cq.where(form.where(cb, root).toArray(Predicate[]::new));
			cq.orderBy(cb.asc(root.get(Employee_.name)));

			return cq;
		}).stream().map(EmployeeListItem::from).toList();
	}

	@Transactional(readOnly = true)
	public EmployeeDetails findById(int id) {
		return safeCall(repo.findById(id).map(EmployeeDetails::from))
				.apply("employee", id);
	}

	public ModificationResult<Integer> create(EmployeeForm form) {
		var account = new Account();
		account.setEmail(form.email());
		account.setPassword(UUID.randomUUID().toString().substring(0, 8));
		account.setRoles(List.of(Role.Shopper));
		accountRepo.save(account);

		var entity = new Employee();
		entity.setAccount(account);
		apply(entity, form);

		return ModificationResult.ok(repo.save(entity).getId());
	}

	public ModificationResult<Integer> update(int id, EmployeeForm form) {
		var entity = safeCall(repo.findById(id)).apply("employee", id);

		apply(entity, form);
		entity.getAccount().setEmail(form.email());

		return ModificationResult.ok(id);
	}

	private void apply(Employee entity, EmployeeForm form) {
		entity.setName(form.name());
		entity.setPhone(form.phone());
		entity.setEntryAt(form.entryAt());
		entity.setRetireAt(form.retireAt());
	}

}
