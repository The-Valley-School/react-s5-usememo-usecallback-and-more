const SpentItem = (props) => {
  return (
    <div key={props.spent.id}>
      <strong>{props.spent.name}</strong> - {props.spent.ammount} €
    </div>
  );
}

export default SpentItem;