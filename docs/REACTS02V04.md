# VIDEO 04 - React.memo (Parte 2)

En este vídeo veremos una forma de optimizar aún más nuestra aplicación, haciendo que React.memo sea un poco más “inteligente” y sepa cuándo las propiedades que nos interesan han cambiado.

React.memo acepta como argumento una función de comparación, que podemos implementar como queramos para indicarle si las propiedades que ha recibido han cambiado o no. Esto puede ser interesante para que ignoremos los cambios en ciertas propiedades que no nos afectan al renderizado del componente.

Vamos a realizar un caso práctico en el generaremos una nueva propiedad “total” que cambiará cuando añadimos un gasto. Esta propiedad no afecta a la vista de un **SpentItem** por lo que no queremos que se repinte cuando cambie.

El código del componente SpentList quedará así:

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

  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const sum = spentList.reduce((acum, spent) => acum + spent.ammount, 0);
    setTotal(sum);
  }, [spentList]);

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
          total={total}
          key={spent.id}
          spent={spent}
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

Y el código de nuestro SpentItem quedaría así:

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

const propsAreEqual = (previousProps, currentProps) => {
  return previousProps.spent === currentProps.spent;
};

const SpentItemMemo = React.memo(SpentItem, propsAreEqual);

export default SpentItemMemo;
```
