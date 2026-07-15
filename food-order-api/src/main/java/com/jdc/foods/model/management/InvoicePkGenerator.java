package com.jdc.foods.model.management;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.model.management.entity.InvoiceSeq;
import com.jdc.foods.model.management.repo.InvoiceSeqRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InvoicePkGenerator {

	private final InvoiceSeqRepo repo;
	
	@Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
	public InvoicePk next(LocalDate date) {
		var seq = repo.findById(date).orElseGet(() -> {
			var entity = new InvoiceSeq();
			entity.setIssueAt(date);
			return repo.save(entity);
		});
		return seq.next();
	}
}
