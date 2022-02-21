function FormInput(props) {
  return (
    <div className='w-full flex flex-col gap-1'>
      <label htmlFor={props.name} className='font-bold'>
        {formatName(props.name)}
      </label>
      <input
        type={props.type}
        name={props.name}
        onChange={(event) => {
          props.change(event.target.value);
        }}
        value={props.value}
        required={true}
        className='w-full px-3 py-1 border-slate-400 rounded border'
      ></input>
    </div>
  );
}

function formatName(string) {
  return (string.charAt(0).toUpperCase() + string.slice(1)).replaceAll(
    "_",
    " "
  );
}

export default FormInput;
