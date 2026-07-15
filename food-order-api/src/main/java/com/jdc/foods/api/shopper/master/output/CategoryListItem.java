package com.jdc.foods.api.shopper.master.output;

import java.time.LocalDateTime;

import com.jdc.foods.model.master.entity.Category;
import com.jdc.foods.model.master.entity.Category_;
import com.jdc.foods.model.master.entity.Cuisine;
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
		Status status,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt) {

	public static void select(CriteriaBuilder cb, CriteriaQuery<CategoryListItem> cq, Root<Category> root) {
		
		var cuisine = root.join(Cuisine.class, JoinType.LEFT);
		
		cq.select(cb.construct(CategoryListItem.class, 
			root.get(Category_.id),
			root.get(Category_.name),
			cb.count(cuisine.get(Cuisine_.id)),
			cb.selectCase()
				.when(cb.isNull(root.get(Category_.deletedAt)), Status.Enable)
				.otherwise(Status.Disable),
			root.get(Category_.createdAt),
			root.get(Category_.modifiedAt)
		));
		
		cq.groupBy(
			root.get(Category_.id),
			root.get(Category_.name),
			cb.selectCase()
				.when(cb.isNull(root.get(Category_.deletedAt)), Status.Enable)
				.otherwise(Status.Disable),
			root.get(Category_.createdAt),
			root.get(Category_.modifiedAt)
		);
		
		cq.orderBy(cb.asc(root.get(Category_.id)));
	}

}
