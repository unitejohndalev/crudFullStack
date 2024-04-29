/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { personTypes } from "../../types/persons";
import { getAllPersons } from "../../api/Api";
import AddPerson from "./add";
import DeletePerson from "./delete";

const Person: React.FC = () => {
  const [fetchAllPersons, setFetchAllPersons] = useState<personTypes[]>();
  const [personId, setPersonId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  useEffect(() => {
    fetch(`${getAllPersons}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFetchAllPersons(data);
      });
  }, []);

  console.log("fetchAllPersons: ", fetchAllPersons);

  //toggle show form function
  const toggleShowAddForm = () => {
    setShowAddForm((prev) => !prev);
  };
  
  //toggle delete modal
  const toggleHideDeleteModal = () => {
    setShowDeleteModal(false)
  }
  return (
    <>
      <Button onClick={toggleShowAddForm}>Add Person</Button>
      {showAddForm && <AddPerson setShowAddForm={setShowAddForm} />}
      <Table>
        <thead>
          <tr>
            <th>Person ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fetchAllPersons?.map((person: personTypes) => {
            const { id, firstName, lastName, email } = person;
            return (
              <tr>
                <td key={id}>{id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>
                  <span
                    onClick={() => {
                      setPersonId(id);
                      setShowDeleteModal(true);
                      console.log("delete button onClick", id);
                    }}>
                    Delete
                  </span>
                  <span>Edit</span>
                </td>
                {showDeleteModal && personId === id && (
                  <DeletePerson
                    person_id={id}
                    toggleHideDeleteModal={toggleHideDeleteModal}
                  />
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Person;
