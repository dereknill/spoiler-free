import moment from "moment";

function Reply(props) {
  function formatDate(timestamp) {
    const date = timestamp.toDate();
    let m = moment(date);
    m.locale();
    return m.format("LLL");
  }
  const reply = props.reply;
  return (
    <article className='shadow-lg bg-slate-100 shadow-slate-600/50 rounded'>
      <div className='bg-slate-100 py-2 rounded-t px-4 flex flex-col sm:flex-row gap-2 justify-between'>
        <div>
          <h3 className='text-black/50 flex flex-col'>
            {`Posted by ${reply.displayName}`}{" "}
            <span className='ml-0'>{formatDate(reply.timestamp)}</span>
          </h3>
        </div>
      </div>
      <div className='bg-slate-200 py-3 px-4 rounded-b whitespace-pre-line'>
        {reply.text}
      </div>
    </article>
  );
}

export default Reply;
