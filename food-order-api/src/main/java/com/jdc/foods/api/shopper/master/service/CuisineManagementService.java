package com.jdc.foods.api.shopper.master.service;

import static com.jdc.foods.utils.EntityUtils.safeCall;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.jdc.foods.api.shopper.master.input.CuisineForm;
import com.jdc.foods.api.shopper.master.input.CuisineSearch;
import com.jdc.foods.api.shopper.master.input.UpdateCoverPhotoForm;
import com.jdc.foods.api.shopper.master.output.CuisineDetails;
import com.jdc.foods.api.shopper.master.output.CuisineForEdit;
import com.jdc.foods.api.shopper.master.output.CuisineListItem;
import com.jdc.foods.model.master.entity.Cuisine;
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
	private final StorageService storageService;

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
				.apply("cuisine").apply("id").apply(id);
	}

	@Transactional(readOnly = true)
	public CuisineForEdit findForEdit(int id) {
		return safeCall(repo.findById(id).map(CuisineForEdit::from))
				.apply("cuisine").apply("id").apply(id);
	}

	public ModificationResult<Integer> create(CuisineForm form) {
		var entity = new Cuisine();
		apply(entity, form);

		if(form.status() == Status.Disable) {
			entity.setDeletedAt(LocalDateTime.now());
		}

		return ModificationResult.ok(repo.save(entity).getId());
	}

	public ModificationResult<Integer> update(int id, CuisineForm form) {
		var entity = safeCall(repo.findById(id))
				.apply("cuisine").apply("id").apply(id);

		apply(entity, form);
		entity.setDeletedAt(form.status() == Status.Disable ? LocalDateTime.now() : null);

		return ModificationResult.ok(id);
	}
	
	public ModificationResult<Integer> uploadPhotos(int id, MultipartFile[] files) {

		var entity = safeCall(repo.findById(id))
				.apply("cuisine").apply("id").apply(id);
		
		var photos = storageService.savePhotos(id, files);
		
		entity.addPhotos(photos);
		
		if(!StringUtils.hasLength(entity.getCoverPhoto())) {
			entity.setCoverPhoto(photos.getFirst());
		}
		
		return ModificationResult.ok(id);
	}

	public ModificationResult<Integer> update(int id, UpdateCoverPhotoForm form) {
		var entity = safeCall(repo.findById(id))
				.apply("cuisine").apply("id").apply(id);

		entity.setCoverPhoto(form.photo());

		return ModificationResult.ok(id);
	}	

	private void apply(Cuisine entity, CuisineForm form) {
		var category = safeCall(categoryRepo.findById(form.category()))
				.apply("category").apply("id").apply(form.category());

		entity.setName(form.name());
		entity.setDescription(form.description());
		entity.setCategory(category);
		entity.setRegular(form.isRegular());
		entity.setSpiceLevel(form.spiceLevel());
		entity.setPrice(form.price());
		entity.setIngredients(form.ingredients());
		entity.setDeletedAt(form.status() == Status.Enable ? null : LocalDateTime.now());
	}

}
