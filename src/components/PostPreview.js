import moment from "moment";

function PostPreview(props) {
  function formatDate(timestamp) {
    const date = timestamp.toDate();
    let m = moment(date);
    m.locale();
    return m.format("LLL");
  }
  const post = props.post;
  return (
    <article className='bg-slate-100 py-2 px-4 rounded flex gap-2 justify-between shadow-lg shadow-slate-600/50'>
      <div className='max-w-[70%]'>
        <h2 className='font-bold text-lg text-slate-800'>{post.title}</h2>
        <h3 className='text-black/50'>{`Season ${post.season}, Episode ${post.episode}`}</h3>
        <h3 className='text-black/50'>
          {`Posted by ${post.displayName}`}{" "}
          <span className='ml-4'>{formatDate(post.timestamp)}</span>
        </h3>
      </div>
      <div className='text-white flex gap-4'>
        <div className='h-20 min-w-[7rem] bg-slate-800 rounded shadow shadow-black/50 flex flex-col align-center justify-center'>
          <span className='text-center text-4xl'>0</span>
          <span className='text-center'>Views</span>
        </div>
        <div className='h-20 min-w-[7rem] bg-slate-800 rounded shadow shadow-black/50 flex flex-col align-center justify-center'>
          <span className='text-center text-4xl'>
            {post.replies ? post.replies.length : "0"}
          </span>
          <span className='text-center'>Comments</span>
        </div>
      </div>
    </article>
  );
}

export default PostPreview;
