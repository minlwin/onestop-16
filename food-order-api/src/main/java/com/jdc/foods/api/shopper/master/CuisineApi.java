package com.jdc.foods.api.shopper.master;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
import com.jdc.foods.utils.dto.ModificationResult;
import com.jdc.foods.utils.dto.PageResult;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController("cuisineMasterApi")
@RequestMapping("shopper/cuisines")
public class CuisineApi {

	@GetMapping
	PageResult<CuisineListItem> search(
			CuisineSearch form,
			@RequestParam(required = false, defaultValue = "0") Integer page,
			@RequestParam(required = false, defaultValue = "10") Integer size) {
		return new PageResult<CuisineListItem>(List.of(), null);
	}

	@GetMapping("{id}")
	CuisineDetails findById(@PathVariable int id) {
		return null;
	}

	@GetMapping("{id}/edit")
	CuisineForEdit findForEdit(@PathVariable int id) {
		return null;
	}

	@PostMapping
	ModificationResult<Integer> create(
			@RequestBody @Validated CuisineForm form) {
		return new ModificationResult<Integer>(1);
	}

	@PostMapping("{id}")
	ModificationResult<Integer> update(
			@PathVariable int id,
			@RequestBody @Validated CuisineForm form) {
		return new ModificationResult<Integer>(id);
	}

	@PostMapping("{id}/photos")
	ModificationResult<Integer> uploadPhoto(
			@PathVariable int id,
			@RequestParam MultipartFile[] files) {
		return new ModificationResult<Integer>(id);
	}

	@PostMapping("{id}/cover-photo")
	ModificationResult<Integer> updateCoverPhoto(
			@PathVariable int id,
			@RequestBody @Validated UpdateCoverPhotoForm form) {
		return new ModificationResult<Integer>(id);
	}

}
