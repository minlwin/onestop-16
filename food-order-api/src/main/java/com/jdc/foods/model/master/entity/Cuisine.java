package com.jdc.foods.model.master.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.jdc.foods.model.AuditableEntity;
import com.jdc.foods.utils.converter.IngredientsConverter;
import com.jdc.foods.utils.converter.StringListConverter;
import com.jdc.foods.utils.dto.Ingredient;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Cuisine extends AuditableEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false)
	private String name;
	
	@ManyToOne(optional = false)
	private Category category;

	@Column(nullable = false)
	private BigDecimal price;
	
	@Column(columnDefinition = "TEXT")
	private String description;
	private SpiceLevel spiceLevel;
	private boolean isRegular;
	
	private String coverPhoto;
	
	@Column(columnDefinition = "TEXT")
	@Convert(converter = StringListConverter.class)
	private List<String> photos;

	@Column(columnDefinition = "TEXT")
	@Convert(converter = IngredientsConverter.class)
	private List<Ingredient> ingredients;

	public enum SpiceLevel {
		Low, Medium, Heigh
	}

	public void addPhotos(List<String> list) {
		if(photos == null) {
			photos = new ArrayList<>();
		}
		photos.addAll(list);
	}
}
