function LineBreak(props) {
  if (props.type === "margin-4") {
    return <div className={`border-t border-slate-400 my-4 mx-auto`}></div>;
  } else {
    return <div className={`border-t border-slate-400 my-1.5 mx-auto`}></div>;
  }
}

export default LineBreak;
