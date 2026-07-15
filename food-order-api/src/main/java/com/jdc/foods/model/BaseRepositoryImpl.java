package com.jdc.foods.model;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.IntStream;

import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import com.jdc.foods.utils.dto.Pager;
import com.jdc.foods.utils.dto.PageResult;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;

public class BaseRepositoryImpl<T, ID> extends SimpleJpaRepository<T, ID> implements BaseRepository<T, ID> {

	private EntityManager em;
	
	public BaseRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
		super(entityInformation, entityManager);
		this.em = entityManager;
	}

	@Override
	public <R> List<R> search(Function<CriteriaBuilder, CriteriaQuery<R>> queryFunc) {
		
		var criteriaQuery = queryFunc.apply(em.getCriteriaBuilder());
		var query = em.createQuery(criteriaQuery);
		
		return query.getResultList();
	}

	@Override
	public <R> PageResult<R> search(Function<CriteriaBuilder, CriteriaQuery<R>> queryFunc,
			Function<CriteriaBuilder, CriteriaQuery<Long>> countFunc, int page, int size) {

		var cb = em.getCriteriaBuilder();

		var totalCount = em.createQuery(countFunc.apply(cb)).getSingleResult();

		var criteriaQuery = queryFunc.apply(cb);
		var query = em.createQuery(criteriaQuery);
		query.setFirstResult(page * size);
		query.setMaxResults(size);

		var contents = query.getResultList();

		var totalPage = (int) Math.ceil(totalCount / (double) size);
		var links = IntStream.range(0, totalPage).boxed().toList();

		return new PageResult<>(contents, new Pager(page, size, totalCount.intValue(), totalPage, links));
	}

	@Override
	public <R> Optional<R> searchOne(Function<CriteriaBuilder, CriteriaQuery<R>> queryFunc) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

}
