package com.jdc.foods.api.shopper.master.output;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.jdc.foods.model.master.entity.Category_;
import com.jdc.foods.model.master.entity.Cuisine;
import com.jdc.foods.model.master.entity.Cuisine.SpiceLevel;
import com.jdc.foods.model.master.entity.Cuisine_;
import com.jdc.foods.utils.consts.Status;
import com.jdc.foods.utils.dto.IdAndName;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record CuisineListItem(
		int id,
		String name,
		IdAndName category,
		SpiceLevel spiceLevel,
		boolean isRegular,
		BigDecimal price,
		String description,
		String coverPhoto,
		LocalDateTime deletedAt,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt) {
	
	public Status getStatus() {
		return deletedAt == null ? Status.Enable : Status.Disable;
	}

	public static void select(CriteriaBuilder cb, CriteriaQuery<CuisineListItem> cq, Root<Cuisine> root) {

		var category = root.join(Cuisine_.category);

		cq.select(cb.construct(CuisineListItem.class,
			root.get(Cuisine_.id),
			root.get(Cuisine_.name),
			cb.construct(IdAndName.class,
				category.get(Category_.id),
				category.get(Category_.name)),
			root.get(Cuisine_.spiceLevel),
			root.get(Cuisine_.isRegular),
			root.get(Cuisine_.price),
			root.get(Cuisine_.description),
			root.get(Cuisine_.coverPhoto),
			root.get(Cuisine_.deletedAt),
			root.get(Cuisine_.createdAt),
			root.get(Cuisine_.modifiedAt)
		));

		cq.orderBy(cb.asc(root.get(Cuisine_.id)));
	}


	public static CuisineListItem from(Cuisine entity) {
		return new CuisineListItem(
				entity.getId(),
				entity.getName(),
				new IdAndName(entity.getCategory().getId(), entity.getCategory().getName()),
				entity.getSpiceLevel(),
				entity.isRegular(),
				entity.getPrice(),
				entity.getDescription(),
				entity.getCoverPhoto(),
				entity.getDeletedAt(),
				entity.getCreatedAt(),
				entity.getModifiedAt());
	}

}
