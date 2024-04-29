import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { postPersons } from "../../../api/Api";
import "bootstrap/dist/css/bootstrap.min.css";



type AddPersonProps = {
  setShowAddForm: (show: boolean) => void;
};

const AddPerson: React.FC<AddPersonProps> = ({ setShowAddForm }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(postPersons, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add person");
      }

      // Reset the form inputs
      setFirstName("");
      setLastName("");
      setEmail("")

      // Hide the add form
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding person:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />{" "}
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Add</button>
    </Form>
  );
};

export default AddPerson;
