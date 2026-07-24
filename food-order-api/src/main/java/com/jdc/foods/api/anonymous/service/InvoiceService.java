package com.jdc.foods.api.anonymous.service;

import static com.jdc.foods.utils.EntityUtils.safeCall;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.api.anonymous.input.CheckoutForm;
import com.jdc.foods.api.shopper.management.output.InvoiceDetails;
import com.jdc.foods.model.account.repo.CustomerRepo;
import com.jdc.foods.model.management.InvoiceItemPk;
import com.jdc.foods.model.management.InvoicePk;
import com.jdc.foods.model.management.InvoicePkGenerator;
import com.jdc.foods.model.management.entity.DeliveryAddress;
import com.jdc.foods.model.management.entity.Invoice;
import com.jdc.foods.model.management.entity.Invoice.Status;
import com.jdc.foods.model.management.entity.InvoiceItem;
import com.jdc.foods.model.management.repo.DeliveryAddressRepo;
import com.jdc.foods.model.management.repo.InvoiceItemRepo;
import com.jdc.foods.model.management.repo.InvoiceRepo;
import com.jdc.foods.model.master.repo.CuisineRepo;
import com.jdc.foods.model.master.repo.DeliveryTimeRepo;
import com.jdc.foods.utils.dto.ModificationResult;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InvoiceService {
	
	private final InvoiceRepo invoiceRepo;
	private final InvoicePkGenerator idGenerator;
	private final DeliveryAddressRepo addressRepo;
	private final DeliveryTimeRepo deliTimeRepo;
	private final CuisineRepo cuisineRepo;
	private final InvoiceItemRepo itemRepo;
	
	private final CustomerRepo customerRepo;

	@Transactional
	public ModificationResult<String> create(CheckoutForm form) {
		
		var id = idGenerator.next(LocalDate.now());
		var entity = new Invoice();
		entity.setId(id);
		
		var address = addressRepo.findOne(form.phone(), form.township(), form.address())
				.orElseGet(() -> {
					var deli = new DeliveryAddress();
					deli.setAddress(form.address());
					deli.setPhone(form.phone());
					deli.setTownship(form.township());
					return addressRepo.save(deli);
				});
		
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		
		if(!(authentication instanceof AnonymousAuthenticationToken)) {
			var username = authentication.getName();
			customerRepo.findByAccountEmail(username).ifPresent(address::setCustomer);
		}		
		
		entity.setEmail(form.email());
		entity.setName(form.name());

		entity.setAddress(address);
		entity.setDeliveryDate(form.deliveryDate());
		
		entity.setStatus(Status.Invoiced);
		entity.setInvoicedAt(LocalDateTime.now());
		entity.setDeliveryTime(deliTimeRepo.getReferenceById(form.deliveryTimeId()));
		
		entity.setRemark(form.remark());
		
		entity = invoiceRepo.save(entity);
				
		for(var item : form.items()) {
			var itemPk = new InvoiceItemPk(id.issueAt(), id.seqNumber(), item.cuisineId());
			var invoiceItem = new InvoiceItem();
			invoiceItem.setId(itemPk);
			invoiceItem.setQuantity(item.quantity());
			var cuisine = cuisineRepo.getReferenceById(item.cuisineId());
			invoiceItem.setCuisine(cuisine);
			invoiceItem.setUnitPrice(cuisine.getPrice());
			invoiceItem.setInvoice(entity);
			itemRepo.save(invoiceItem);
		}
		
		return ModificationResult.ok(id.getCode());
	}

	public InvoiceDetails findById(String id) {
		return safeCall(invoiceRepo.findById(InvoicePk.fromCode(id)).map(InvoiceDetails::from))
				.apply("Invoice").apply("code").apply(id);
	}

}
