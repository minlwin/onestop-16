package com.jdc.foods.api.shopper.master.service;

import static com.jdc.foods.utils.EntityUtils.safeCall;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.jdc.foods.api.shopper.master.input.CuisineForm;
import com.jdc.foods.api.shopper.master.input.CuisineSearch;
import com.jdc.foods.api.shopper.master.input.UpdateCoverPhotoForm;
import com.jdc.foods.api.shopper.master.output.CuisineDetails;
import com.jdc.foods.api.shopper.master.output.CuisineForEdit;
import com.jdc.foods.api.shopper.master.output.CuisineListItem;
import com.jdc.foods.model.master.entity.Cuisine;
import com.jdc.foods.model.master.entity.Cuisine.SpiceLevel;
import com.jdc.foods.model.master.repo.CategoryRepo;
import com.jdc.foods.model.master.repo.CuisineRepo;
import com.jdc.foods.utils.consts.Status;
import com.jdc.foods.utils.dto.ModificationResult;
import com.jdc.foods.utils.dto.PageResult;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CuisineManagementService implements CuisineSearchService {

	private final CuisineRepo repo;
	private final CategoryRepo categoryRepo;

	@Override
	@Transactional(readOnly = true)
	public PageResult<CuisineListItem> search(CuisineSearch form, Integer page, Integer size) {
		return repo.search(cb -> {
			var cq = cb.createQuery(CuisineListItem.class);
			var root = cq.from(Cuisine.class);

			CuisineListItem.select(cb, cq, root);

			cq.where(form.where(cb, root));

			return cq;
		}, cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(Cuisine.class);

			cq.select(cb.count(root));
			cq.where(form.where(cb, root));

			return cq;
		}, page, size);
	}

	@Override
	@Transactional(readOnly = true)
	public CuisineDetails findById(int id) {
		return safeCall(repo.findById(id).map(CuisineDetails::from))
				.apply("cuisine", id);
	}

	@Transactional(readOnly = true)
	public CuisineForEdit findForEdit(int id) {
		return safeCall(repo.findById(id).map(CuisineForEdit::from))
				.apply("cuisine", id);
	}

	public ModificationResult<Integer> create(CuisineForm form) {
		var entity = new Cuisine();
		apply(entity, form);

		return ModificationResult.ok(repo.save(entity).getId());
	}

	public ModificationResult<Integer> update(int id, CuisineForm form) {
		var entity = safeCall(repo.findById(id))
				.apply("cuisine", id);

		apply(entity, form);

		return ModificationResult.ok(id);
	}

	private void apply(Cuisine entity, CuisineForm form) {
		var category = safeCall(categoryRepo.findById(Integer.parseInt(form.category())))
				.apply("category", form.category());

		entity.setName(form.name());
		entity.setDescription(form.description());
		entity.setCategory(category);
		entity.setRegular(form.isRegular());
		entity.setSpiceLevel(SpiceLevel.valueOf(form.spiceLevel()));
		entity.setPrice(form.price());
		entity.setIngredients(form.ingredients());
		entity.setDeletedAt(form.status() == Status.Enable ? null : LocalDateTime.now());
	}

	public ModificationResult<Integer> uploadPhotos(int id, MultipartFile[] files) {
		// TODO Auto-generated method stub
		return null;
	}

	public ModificationResult<Integer> update(int id, UpdateCoverPhotoForm form) {
		var entity = safeCall(repo.findById(id))
				.apply("cuisine", id);

		entity.setCoverPhoto(form.photo());

		return ModificationResult.ok(id);
	}

}
