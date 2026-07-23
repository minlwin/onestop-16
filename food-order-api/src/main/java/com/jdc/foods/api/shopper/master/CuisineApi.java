package com.jdc.foods.api.shopper.master;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jdc.foods.api.shopper.master.input.CuisineForm;
import com.jdc.foods.api.shopper.master.input.CuisineSearch;
import com.jdc.foods.api.shopper.master.input.UpdateCoverPhotoForm;
import com.jdc.foods.api.shopper.master.output.CuisineDetails;
import com.jdc.foods.api.shopper.master.output.CuisineForEdit;
import com.jdc.foods.api.shopper.master.output.CuisineListItem;
import com.jdc.foods.api.shopper.master.service.CuisineManagementService;
import com.jdc.foods.utils.dto.ModificationResult;
import com.jdc.foods.utils.dto.PageResult;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController("cuisineMasterApi")
@RequestMapping("shopper/cuisines")
public class CuisineApi {
	
	private final CuisineManagementService service;

	@GetMapping
	PageResult<CuisineListItem> search(
			CuisineSearch form,
			@RequestParam(required = false, defaultValue = "0") Integer page,
			@RequestParam(required = false, defaultValue = "10") Integer size) {
		return service.search(form, page, size);
	}

	@GetMapping("{id}")
	CuisineDetails findById(@PathVariable int id) {
		return service.findById(id);
	}

	@GetMapping("{id}/edit")
	CuisineForEdit findForEdit(@PathVariable int id) {
		return service.findForEdit(id);
	}

	@PostMapping
	ModificationResult<Integer> create(
			@RequestBody @Validated CuisineForm form) {
		return service.create(form);
	}

	@PutMapping("{id}")
	ModificationResult<Integer> update(
			@PathVariable int id,
			@RequestBody @Validated CuisineForm form) {
		return service.update(id, form);
	}

	@PostMapping("{id}/photos")
	ModificationResult<Integer> uploadPhoto(
			@PathVariable int id,
			@RequestParam MultipartFile[] files) {
		return service.uploadPhotos(id, files);
	}

	@PutMapping("{id}/cover-photo")
	ModificationResult<Integer> updateCoverPhoto(
			@PathVariable int id,
			@RequestBody @Validated UpdateCoverPhotoForm form) {
		return service.update(id,  form);
	}

}
