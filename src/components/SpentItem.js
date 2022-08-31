import React from "react";

const SpentItem = (props) => {
  console.log("Ejecutado render SpentItem: " + props.spent.name);

  return (
    <div key={props.spent.id}>
      <strong>{props.spent.name}</strong> - {props.spent.ammount} €
    </div>
  );
}

const SpentItemMemo = React.memo(SpentItem);

export default SpentItemMemo;