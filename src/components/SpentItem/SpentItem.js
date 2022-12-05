import React from "react";
import "./SpentItem.css";

const SpentItem = (props) => {
  console.log("Ejecutado render SpentItem: " + props.spent.name);

  return (
    <div className="spent-item" key={props.spent.id}>
      <img className="spent-item__image" src={props.spent.imageUrl} alt={"Imagen de " + props.spent.name} />
      <div className="spent-item__info">
        <p className="spent-item__name">{props.spent.name} {props.spent.surname}</p>
        <p className="spent-item__ammount">{props.spent.phone}</p>
        <button className="spent-item__delete-button" onClick={() => props.deleteItem(props.spent)}>ELIMINAR</button>
      </div>
    </div>
  );
}

// const propsAreEqual = (previousProps, currentProps) => {
//   return previousProps.spent === currentProps.spent;
// }

// const SpentItemMemo = React.memo(SpentItem, propsAreEqual);

const SpentItemMemo = React.memo(SpentItem);

export default SpentItemMemo;