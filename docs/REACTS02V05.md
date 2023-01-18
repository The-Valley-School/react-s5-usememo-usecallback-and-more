# VIDEO 05 - React.useCallback()

**React.useCallback** permite generar funciones que no cambian cada vez que repintamos, por lo que permite mejorar rendimiento al no pintar los hijos.

Referencia de la documentación oficial: [https://reactjs.org/docs/hooks-reference.html#usecallback](https://reactjs.org/docs/hooks-reference.html#usecallback)

Vamos a modificar nuestra aplicación para permitir eliminar los elementos de la lista, esto va a provocar que en cada renderizado del componente padre, la función se regenere y provoque un repintado de los hijos.

Aquí es donde entra **useCallback** para evitar esos renderizados extra:

```jsx
import React from "react";
import SpentItemMemo from "./SpentItem";

const SpentList = React.memo(() => {
  const [spentList, setSpentList] = React.useState([
    { name: "Gasolina", ammount: 200, id: 1 },
    { name: "Netflix", ammount: 15, id: 2 },
    { name: "Móvil", ammount: 30, id: 3 },
  ]);

  const [newSpent, setNewSpent] = React.useState({
    name: "",
    ammount: 0,
  });

  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const sum = spentList.reduce((acum, spent) => acum + spent.ammount, 0);
    setTotal(sum);
  }, [spentList]);

  const deleteSpent = React.useCallback(
    (spent) => {
      const newSpentList = spentList.filter((item) => item.id !== spent.id);
      setSpentList(newSpentList);
    },
    [spentList]
  );

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
        <SpentItemMemo
          key={spent.id}
          spent={spent}
          deleteItem={deleteSpent}
        ></SpentItemMemo>
      ))}

      <p>TOTAL: {total}€</p>

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
                ammount: event.target.value ? parseInt(event.target.value) : "",
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

Y nuestro componente **SpentItem** quedaría así:

```jsx
import React from "react";

const SpentItem = (props) => {
  console.log("Ejecutado render SpentItem: " + props.spent.name);

  return (
    <div key={props.spent.id}>
      <strong>{props.spent.name}</strong> - {props.spent.ammount} €
      <button onClick={() => props.deleteItem(props.spent)}>ELIMINAR</button>
    </div>
  );
};

// const propsAreEqual = (previousProps, currentProps) => {
//   return previousProps.spent === currentProps.spent;
// }

// const SpentItemMemo = React.memo(SpentItem, propsAreEqual);

const SpentItemMemo = React.memo(SpentItem);

export default SpentItemMemo;
```
