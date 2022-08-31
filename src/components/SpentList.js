import React from "react";

const SpentList = () => {

  const [spentList, setSpentList] = React.useState([
    { name: "Gasolina", ammount: 200, id: 1 },
    { name: "Netflix", ammount: 15, id: 2},
    { name: "Móvil", ammount: 30, id: 3},
  ]);

  const [newSpent, setNewSpent] = React.useState({
    name: "",
    ammount: 0,
  });

  return(
    <div className="spent-linst">
      <h2>Listado de gastos estimados:</h2>

      {spentList.map(spent => <div key={spent.id}>
        <strong>{spent.name}</strong> - {spent.ammount} €
      </div>) }

      <h2>Añadir nuevo gasto</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        console.log("Bloqueado el comportamiento por defecto del formulario");
      }}>
        <p>
          <label>Nombre del gasto:</label>
          <input type="text" name="name" id="name" value={newSpent.name} onChange={(event) => setNewSpent({
            ...newSpent,
            name: event.target.value,
          })} />
        </p>
        <p>
          <label>Importe estimado del gasto:</label>
          <input type="number" name="ammount" id="ammount" value={newSpent.ammount} onChange={(event) => setNewSpent({
            ...newSpent,
            ammount: event.target.value,
          })} />
        </p>

        <button type="submit">Añadir gasto</button>

      </form>
    </div>
  );

}

export default SpentList;