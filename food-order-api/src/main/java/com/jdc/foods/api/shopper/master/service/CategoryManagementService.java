package com.jdc.foods.api.shopper.master.service;

import static com.jdc.foods.utils.EntityUtils.safeCall;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.api.shopper.master.input.CategoryForm;
import com.jdc.foods.api.shopper.master.input.CategorySearch;
import com.jdc.foods.api.shopper.master.output.CategoryDetails;
import com.jdc.foods.api.shopper.master.output.CategoryListItem;
import com.jdc.foods.model.master.entity.Category;
import com.jdc.foods.model.master.repo.CategoryRepo;
import com.jdc.foods.utils.dto.ModificationResult;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryManagementService implements CategorySearchService {

	private final CategoryRepo repo;

	@Override
	public List<CategoryListItem> search(CategorySearch form) {
		return repo.search(cb -> {
			var cq = cb.createQuery(CategoryListItem.class);
			var root = cq.from(Category.class);
			
			CategoryListItem.select(cb, cq, root);
			
			cq.where(form.where(cb, root));
			
			return cq;
		});
	}

	public CategoryDetails findById(int id) {
		return safeCall(repo.findById(id).map(CategoryDetails::from))
				.apply("category").apply("id").apply(id);
	}

	@Transactional
	public ModificationResult<Integer> create(CategoryForm form) {
		var entity = new Category();
		entity.setName(form.name());
		return ModificationResult.ok(repo.save(entity).getId());
	}

	@Transactional
	public ModificationResult<Integer> update(int id, CategoryForm form) {
		var entity =  safeCall(repo.findById(id))
				.apply("category").apply("id").apply(id);
		
		entity.setName(form.name());
		
		return ModificationResult.ok(id);
	}

}
