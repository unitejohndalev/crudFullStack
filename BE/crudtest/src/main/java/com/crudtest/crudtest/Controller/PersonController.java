package com.crudtest.crudtest.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crudtest.crudtest.Ecxeption.NotFoundException;
import com.crudtest.crudtest.Model.Persons;
import com.crudtest.crudtest.Repository.PersonRepository;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1")
public class PersonController {


    @Autowired
    private PersonRepository personRepository;

    //get all persons
    @GetMapping("/persons")
    public List<Persons> getAllPersons() {
        return personRepository.findAll();
    }

    //create a new person
    @PostMapping("/persons")
    public Persons createPerson(@RequestBody Persons person) {
        return personRepository.save(person);
    }

    //get person by id
    @GetMapping("person/{id}")
    public ResponseEntity<Persons> getPersonById(@PathVariable Long id) {
        Persons person = personRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Person not exist with id:" + id ));
        return ResponseEntity.ok(person);
    }

    //update person by id
    @PutMapping("person/{id}")
    public ResponseEntity<Persons> updatePerson(@PathVariable Long id, @RequestBody Persons personDetails) {
        Persons person = personRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Person not exist with id:" + id ));
        person.setFirstName(personDetails.getFirstName());
        person.setLastName(personDetails.getLastName());
        person.setEmail(personDetails.getEmail());

        Persons updatedPersons = personRepository.save(person);
        return ResponseEntity.ok(updatedPersons);

        
    }

    //delete person by id
    @DeleteMapping("/person/{id}")
    public ResponseEntity<Map<String, Boolean>> deletePerson(@PathVariable Long id) {
        Persons person = personRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Person not exist with id:" + id));

        personRepository.delete(person);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }
    
}
