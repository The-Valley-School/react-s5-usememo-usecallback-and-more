import React from "react";
import "./SpentList.css";
import SpentItemMemo from "../SpentItem/SpentItem";

const SpentList = React.memo(() => {

  const API_URL = "http://localhost:4000/spents";

  const [spentList, setSpentList] = React.useState([]);
  const [newSpent, setNewSpent] = React.useState({ name: "", surname: "", phone: "", imageUrl: "" });
  const [search, setSearch] = React.useState("");
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    setTotal(spentList.length);
  }, [spentList]);

  // Pedimos los gastos cuando se crea el componente
  React.useEffect(() => {
    getAllSpentsFromApi();
  }, []);

  // Pedimos los usuarios cuando se hace una búsqueda
  React.useEffect(() => {
    fetch(`${API_URL}?q=${search}`)
      .then(response => response.json())
      .then(data => setSpentList(data));
  }, [search]);

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
          surname: "",
          phone: "",
          imageUrl: "",
        });
      });
  }

  return (
    <div className="spent-linst">
      <h2>Mi agenda ({total})</h2>

      {/* listado de gastos */}
      {spentList.map(spent =>
        <SpentItemMemo
          key={spent.id}
          spent={spent}
          deleteItem={deleteSpent}
        ></SpentItemMemo>)}

      {/* Buscador de contactos */}
      <h2>Buscar</h2>
      <form onSubmit={(event) => addNewSpent(event)}>
        <p>
          <label>Buscar:</label>
          <input type="text" name="search" id="search" value={search} onChange={(event) => setSearch(event.target.value)} />
        </p>
      </form>

      {/* formulario para añadir gastos */}
      <h2>Añadir nuevo contacto</h2>
      <form onSubmit={(event) => addNewSpent(event)}>
        <p>
          <label>Nombre:</label>
          <input type="text" name="name" id="name" value={newSpent.name} onChange={(event) => setNewSpent({
            ...newSpent,
            name: event.target.value,
          })} />
        </p>
        <p>
          <label>Apellidos:</label>
          <input type="text" name="surname" id="surname" value={newSpent.surname} onChange={(event) => setNewSpent({
            ...newSpent,
            surname: event.target.value,
          })} />
        </p>
        <p>
          <label>Teléfono:</label>
          <input type="text" name="phone" id="phone" value={newSpent.phone} onChange={(event) => setNewSpent({
            ...newSpent,
            phone: event.target.value,
          })} />
        </p>
        <p>
          <label>URL de la imagen:</label>
          <input type="text" name="imageUrl" id="imageUrl" value={newSpent.imageUrl} onChange={(event) => setNewSpent({
            ...newSpent,
            imageUrl: event.target.value,
          })} />
        </p>

        <button type="submit">Añadir contacto</button>

      </form>
    </div>
  );

});

export default SpentList;