package com.jdc.foods.api.shopper.management.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.api.shopper.account.output.OrderStatusSummary;
import com.jdc.foods.api.shopper.management.output.DashboardSummary;
import com.jdc.foods.api.shopper.management.output.OrderStatusCount;
import com.jdc.foods.api.shopper.management.output.RevenueTrendPoint;
import com.jdc.foods.model.account.repo.CustomerRepo;
import com.jdc.foods.model.management.InvoicePk_;
import com.jdc.foods.model.management.entity.Invoice;
import com.jdc.foods.model.management.entity.Invoice.Status;
import com.jdc.foods.model.management.entity.Invoice_;
import com.jdc.foods.model.management.repo.InvoiceRepo;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ManagementDashboardService {

	private final InvoiceRepo repo;
	private final CustomerRepo customerRepo;

	@Transactional(readOnly = true)
	public DashboardSummary getSummary() {
		var today = LocalDate.now();

		var todayInvoices = repo.search(cb -> {
			var cq = cb.createQuery(Invoice.class);
			var root = cq.from(Invoice.class);

			cq.select(root);
			cq.where(cb.equal(root.get(Invoice_.id).get(InvoicePk_.issueAt), today));

			return cq;
		});

		var todayRevenue = todayInvoices.stream()
				.map(OrderStatusSummary::amountOf)
				.reduce(BigDecimal.ZERO, BigDecimal::add);

		var pendingInvoices = repo.search(cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(Invoice.class);

			cq.select(cb.count(root));
			cq.where(root.get(Invoice_.status).in(Status.Invoiced, Status.Confirmed));

			return cq;
		}).get(0);

		return new DashboardSummary(
				todayRevenue,
				todayInvoices.size(),
				pendingInvoices.intValue(),
				(int) customerRepo.count());
	}

	@Transactional(readOnly = true)
	public List<RevenueTrendPoint> getTrends() {
		var today = LocalDate.now();
		var from = today.minusDays(6);

		var invoices = repo.search(cb -> {
			var cq = cb.createQuery(Invoice.class);
			var root = cq.from(Invoice.class);

			cq.select(root);
			cq.where(cb.between(root.get(Invoice_.id).get(InvoicePk_.issueAt), from, today));

			return cq;
		});

		Map<LocalDate, BigDecimal> byDate = invoices.stream().collect(Collectors.groupingBy(
				entity -> entity.getId().issueAt(),
				Collectors.reducing(BigDecimal.ZERO, OrderStatusSummary::amountOf, BigDecimal::add)));

		return Stream.iterate(from, date -> date.plusDays(1))
				.limit(7)
				.map(date -> new RevenueTrendPoint(
						date.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH),
						byDate.getOrDefault(date, BigDecimal.ZERO)))
				.toList();
	}

	@Transactional(readOnly = true)
	public List<OrderStatusCount> getOrdersByStatus() {
		var list =  repo.search(cb -> {
			var cq = cb.createQuery(OrderStatusCount.class);
			var root = cq.from(Invoice.class);

			OrderStatusCount.select(cb, cq, root);

			return cq;
		});
		
		return list;
	}

}
