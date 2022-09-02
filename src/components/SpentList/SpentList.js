import React from "react";
import "./SpentList.css";
import SpentItemMemo from "../SpentItem/SpentItem";

const SpentList = React.memo(() => {

  const API_URL = "http://localhost:4000/spents";

  const [spentList, setSpentList] = React.useState([]);
  const [newSpent, setNewSpent] = React.useState({ name: "", ammount: 0 });
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const sum = spentList.reduce((acum, spent) => acum + spent.ammount, 0);
    setTotal(sum);
  }, [spentList]);

  // Pedimos los gastos cuando se crea el componente
  React.useEffect(() => {
    getAllSpentsFromApi();
  }, []);

  const getAllSpentsFromApi = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setSpentList(data));
  }

  const deleteSpent = React.useCallback((spent) => {
    fetch(`${API_URL}/${spent.id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => getAllSpentsFromApi());
  }, []);

  const addNewSpent = (event) => {
    event.preventDefault();

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(newSpent),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(() => {
        getAllSpentsFromApi();
        // Limpiamos el formulario
        setNewSpent({
          name: "",
          ammount: 0,
        });
      });
  }

  return (
    <div className="spent-linst">
      <h2>Listado de gastos estimados:</h2>

      {/* listado de gastos */}
      {spentList.map(spent =>
        <SpentItemMemo
          key={spent.id}
          spent={spent}
          deleteItem={deleteSpent}
        ></SpentItemMemo>)}

      <p>TOTAL: {total}€</p>

      {/* formulario para añadir gastos */}
      <h2>Añadir nuevo gasto</h2>
      <form onSubmit={(event) => addNewSpent(event)}>
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
            ammount: event.target.value ? parseInt(event.target.value) : '',
          })} />
        </p>
        <p>
          <label>URL de la imagen:</label>
          <input type="text" name="imageUrl" id="imageUrl" value={newSpent.imageUrl} onChange={(event) => setNewSpent({
            ...newSpent,
            imageUrl: event.target.value,
          })} />
        </p>

        <button type="submit">Añadir gasto</button>

      </form>
    </div>
  );

});

export default SpentList;