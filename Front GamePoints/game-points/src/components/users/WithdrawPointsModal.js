import React, { useState, useEffect } from "react";

const WithdrawPointsModal = ({ totalPoints, onWithdraw, onCancel, user }) => {
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [availablePoints, setAvailablePoints] = useState(0);

  useEffect(() => {
    const fetchAvailablePoints = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${user._id}`);
        const data = await response.json();
        setAvailablePoints(data.numeroDePuntos);
      } catch (error) {
        console.error("Error fetching available points:", error);
      }
    };

    fetchAvailablePoints();
  }, [user._id]);

  const handleWithdraw = async () => {
    if (withdrawAmount <= availablePoints) {
      await onWithdraw(withdrawAmount);

      const nuevosPuntos = availablePoints - withdrawAmount;

      try {
        await fetch(`http://localhost:3001/api/users/${user._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ numeroDePuntos: nuevosPuntos }),
        });

        setAvailablePoints(nuevosPuntos);
      } catch (error) {
        console.error("Error updating user points:", error);
      }
    } else {
      alert("El retiro es mayor a los Puntos disponibles");
      console.log("El retiro no puede ser mayor a los puntos disponibles");
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Retirar puntos</h2>
        <p>Puntos disponibles: {availablePoints}</p>
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(parseInt(e.target.value))}
        />
        <button onClick={handleWithdraw}>Retirar</button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default WithdrawPointsModal;
