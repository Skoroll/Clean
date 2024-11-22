import React, { useState } from "react";
import "./UserForm.scss";

function UserRooms({ onRoomsChange }) {
  const rooms = [
    "Cuisine", "Salon", "Salle à manger", "Salle de bain", "Toilettes",
    "Chambre", "Cellier", "Débarras", "Entrée", "Bureau"
  ];

  const [formData, setFormData] = useState(() =>
    rooms.reduce((acc, room) => {
      acc[room] = false;
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: checked };
      const selectedRooms = Object.keys(updatedFormData).filter(
        (room) => updatedFormData[room]
      );
      onRoomsChange(selectedRooms);
      return updatedFormData;
    });
  };

  return (
    <div className="form-basic">
      <p className="form-heading">Votre maison comporte :</p>
      <div className="user-form">
        {rooms.map((room) => {
          const roomId = room.replace(/\s+/g, "").toLowerCase();
          return (
            <div className="form-group" key={roomId}>
              <input
                type="checkbox"
                id={roomId}
                name={room}
                checked={formData[room]}
                onChange={handleChange}
              />
              <label className="label-choice" htmlFor={roomId}>{room}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserRooms;
