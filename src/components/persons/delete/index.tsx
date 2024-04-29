import React from 'react'
import { deletePerson } from '../../../api/Api';

type personType = {
  person_id: number | null;
  toggleHideDeleteModal: () => void;
};


const DeletePerson: React.FC<personType> = ({
  person_id,
  toggleHideDeleteModal,
}) => {
  const handleDeletePerson = async () => {
    try {
      const response = await fetch(`${deletePerson}/${person_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete person");
      }

      // Handle success (if needed)
    } catch (error) {
      console.error("Error deleting person:", error);
    }
    toggleHideDeleteModal()
  };

  return (
    <div>
      <span>Cancel</span>

      <button onClick={handleDeletePerson}>Delete</button>
    </div>
  );
};

export default DeletePerson