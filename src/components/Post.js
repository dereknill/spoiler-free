import moment from "moment";

function Post(props) {
  function formatDate(timestamp) {
    const date = timestamp.toDate();
    let m = moment(date);
    m.locale();
    return m.format("LLL");
  }
  const post = props.post;
  return (
    <article className='shadow-lg bg-slate-100 shadow-slate-600/50 rounded'>
      <div className='bg-slate-100 py-2 rounded-t px-4 flex flex-col sm:flex-row gap-2 justify-between'>
        <div className='max-w-[70%]'>
          <h2 className='font-bold text-lg text-slate-800'>{post.title}</h2>
          <h3 className='text-black/75'>{`Season ${post.season}, Episode ${post.episode}`}</h3>
          <h3 className='text-black/75 flex flex-col'>
            <div>
              Posted by <span className='font-bold'>{post.displayName}</span>{" "}
            </div>
            <span className='ml-0'>{formatDate(post.timestamp)}</span>
          </h3>
        </div>
        <div className='text-white hidden sm:flex gap-4 justify-center items-center'>
          <div className='h-16 sm:h-20 w-full sm:min-w-[7rem] bg-slate-800 rounded shadow shadow-black/50 flex flex-col align-center justify-center'>
            <span className='text-center text-2xl sm:text-4xl'>
              {post.views + 1}
            </span>
            <span className='text-center text-base'>Views</span>
          </div>
          <div className='h-16 sm:h-20 w-full sm:min-w-[7rem] bg-slate-800 rounded shadow shadow-black/50 flex flex-col align-center justify-center'>
            <span className='text-center text-2xl sm:text-4xl'>
              {post.replies ? post.replies.length : "0"}
            </span>
            <span className='text-center text-base'>Comments</span>
          </div>
        </div>
      </div>
      <div className='bg-slate-200 py-3 px-4 rounded-b whitespace-pre-line'>
        {post.text}
      </div>
    </article>
  );
}

export default Post;
