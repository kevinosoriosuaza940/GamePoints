import React, { useState } from "react";

const WithdrawPointsModal = ({ totalPoints, onWithdraw, onCancel,user }) => {
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const handleWithdraw = () => {
    if (withdrawAmount <= totalPoints) {
      onWithdraw(withdrawAmount);
    } else {
      // Manejar el caso cuando el retiro es mayor a los puntos disponibles
      alert('El rerito es mayor a los Puntos disponibles')
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
        <p>Puntos disponibles: {user.numeroDePuntos}</p>
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
