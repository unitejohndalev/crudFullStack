package com.crudtest.crudtest.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crudtest.crudtest.Model.Persons;

@Repository
public interface PersonRepository extends JpaRepository<Persons, Long>{

}
