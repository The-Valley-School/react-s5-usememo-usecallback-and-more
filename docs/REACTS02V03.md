# VIDEO 03 - React.memo (Parte 1)

**React memo** permite hacer componentes puros. Un componente puro es un componente que solo depende de sus props.

Referencia a la docu oficial: [https://reactjs.org/docs/react-api.html#reactmemo](https://reactjs.org/docs/react-api.html#reactmemo)

Cuando hacemos uso de React.memo, React se encargará de optimizar nuestro componente, pintándolo solo cuando sea necesario, es decir:

- Cuando cambien sus props
- Cuando modifiquemos su estado
- Cuando hagamos uso de useContext o useReducer (lo veremos más adelante)

Una vez apliquemos useMemo a nuestros componentes, la aplicación quedará tal que así:

```jsx
import React from "react";
import SpentItemMemo from "./SpentItem";

const SpentList = React.memo(() => {
  console.log("Ejecutado render SpentList");

  const [spentList, setSpentList] = React.useState([
    { name: "Gasolina", ammount: 200, id: 1 },
    { name: "Netflix", ammount: 15, id: 2 },
    { name: "Móvil", ammount: 30, id: 3 },
  ]);

  const [newSpent, setNewSpent] = React.useState({
    name: "",
    ammount: 0,
  });

  const addNewSpent = (event) => {
    event.preventDefault();
    console.log("Bloqueado el comportamiento por defecto del formulario");

    const newSpentToAdd = {
      ...newSpent,
      id: spentList[spentList.length - 1].id + 1,
    };

    // NO HACER ESTO -> Inmutabilidad
    // spentList.push(newSpentToAdd);

    // Forma correcta:
    setSpentList([...spentList, newSpentToAdd]);

    // Limpiamos el formulario
    setNewSpent({
      name: "",
      ammount: 0,
    });
  };

  return (
    <div className="spent-linst">
      <h2>Listado de gastos estimados:</h2>

      {/* listado de gastos */}
      {spentList.map((spent) => (
        <SpentItemMemo key={spent.id} spent={spent}></SpentItemMemo>
      ))}

      {/* formulario para añadir gastos */}
      <h2>Añadir nuevo gasto</h2>
      <form onSubmit={(event) => addNewSpent(event)}>
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
});

export default SpentList;
```

Y nuestro componente hijo **SpentItem** quedaría así.

```jsx
import React from "react";

const SpentItem = (props) => {
  console.log("Ejecutado render SpentItem: " + props.spent.name);

  return (
    <div key={props.spent.id}>
      <strong>{props.spent.name}</strong> - {props.spent.ammount} €
    </div>
  );
};

const SpentItemMemo = React.memo(SpentItem);

export default SpentItemMemo;
```
