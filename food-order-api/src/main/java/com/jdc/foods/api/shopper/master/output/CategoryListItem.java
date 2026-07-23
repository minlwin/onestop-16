package com.jdc.foods.api.shopper.master.output;

import java.time.LocalDateTime;

import com.jdc.foods.model.master.entity.Category;
import com.jdc.foods.model.master.entity.Category_;
import com.jdc.foods.model.master.entity.Cuisine_;
import com.jdc.foods.utils.consts.Status;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;

public record CategoryListItem(
		int id,
		String name,
		long cusines,
		LocalDateTime deletedAt,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt) {
	
	public Status getStatus() {
		return deletedAt == null ? Status.Enable : Status.Disable;
	}

	public static void select(CriteriaBuilder cb, CriteriaQuery<CategoryListItem> cq, Root<Category> root) {
		
		var cuisine = root.join(Category_.cuisine, JoinType.LEFT);
		
		cq.select(cb.construct(CategoryListItem.class, 
			root.get(Category_.id),
			root.get(Category_.name),
			cb.count(cuisine.get(Cuisine_.id)),
			root.get(Category_.deletedAt),
			root.get(Category_.createdAt),
			root.get(Category_.modifiedAt)
		));
		
		cq.groupBy(
			root.get(Category_.id),
			root.get(Category_.name),
			root.get(Category_.createdAt),
			root.get(Category_.createdAt),
			root.get(Category_.modifiedAt)
		);
		
		cq.orderBy(cb.asc(root.get(Category_.id)));
	}

}
