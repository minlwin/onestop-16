package com.jdc.foods.model.account.repo;

import java.util.Optional;

import com.jdc.foods.model.BaseRepository;
import com.jdc.foods.model.account.entity.Employee;

public interface EmployeeRepo extends BaseRepository<Employee, Integer>{

	Optional<Employee> findByAccountEmail(String email);

}
