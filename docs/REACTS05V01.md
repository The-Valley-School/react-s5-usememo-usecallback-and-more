# VIDEO 01 - Formularios (Parte 1)

En este vídeo veremos cómo manejar formularios en React haciendo uso de varias funcionalidades de React.

En primer lugar declaramos un estado para manejar el formulario mediante **useState**:

```
const [newSpent, setNewSpent] = React.useState({
  name: "",
  ammount: 0,
});
```

Después conectamos el valor del input mediante `value={newspent.name}` , recogemos el valor nuevo mediante `onChange={(event)` y seteamos el nuevo valor haciendo uso del setter del estado `setNewSpent({...` .

Quedaría de la siguiente forma:

```jsx
<label>Nombre del gasto:</label>
<input type="text" name="name" id="name" value={newSpent.name} onChange={(event) => setNewSpent({
  ...newSpent,
  name: event.target.value,
})} />
```

Por último, es importante que evitemos el comportamiento por defecto de los formularios, que sería realizar una petición GET mandando los valores como queryParams. Esto provocaría refrescar toda la aplicación perdiendo el estado actual.

Para prevenirlo capturamos el evento de submit del form de la siguiente manera:

```jsx
<form onSubmit={(event) => {
  event.preventDefault();
  console.log("Bloqueado el comportamiento por defecto del formulario");
}}>
```

Así es cómo quedaría nuestro componente:

```jsx
import React from "react";

const SpentList = () => {
  const [spentList, setSpentList] = React.useState([
    { name: "Gasolina", ammount: 200, id: 1 },
    { name: "Netflix", ammount: 15, id: 2 },
    { name: "Móvil", ammount: 30, id: 3 },
  ]);

  const [newSpent, setNewSpent] = React.useState({
    name: "",
    ammount: 0,
  });

  return (
    <div className="spent-linst">
      <h2>Listado de gastos estimados:</h2>

      {spentList.map((spent) => (
        <div key={spent.id}>
          <strong>{spent.name}</strong> - {spent.ammount} €
        </div>
      ))}

      <h2>Añadir nuevo gasto</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log("Bloqueado el comportamiento por defecto del formulario");
        }}
      >
        <p>
          <label>Nombre del gasto:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={newSpent.name}
            onChange={(event) =>
              setNewSpent({
                ...newSpent,
                name: event.target.value,
              })
            }
          />
        </p>
        <p>
          <label>Importe estimado del gasto:</label>
          <input
            type="number"
            name="ammount"
            id="ammount"
            value={newSpent.ammount}
            onChange={(event) =>
              setNewSpent({
                ...newSpent,
                ammount: event.target.value,
              })
            }
          />
        </p>

        <button type="submit">Añadir gasto</button>
      </form>
    </div>
  );
};

export default SpentList;
```
