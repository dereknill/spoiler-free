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
    <article
      onClick={props.click}
      postid={props.postid}
      showid={props.showid}
      className='bg-slate-100 py-2 px-4 rounded flex flex-col sm:flex-row gap-2 justify-between shadow-lg shadow-slate-600/50 cursor-pointer'
    >
      <div className='max-w-[70%]'>
        <h2 className='font-bold text-lg text-slate-800'>{post.title}</h2>
        {props.showName && <h3 className='text-black/75'>{props.showName}</h3>}
        <h3 className='text-black/75'>{`Season ${post.season}, Episode ${post.episode}`}</h3>
        <h3 className='text-black/75 flex flex-col'>
          <div>
            Posted by <span className='font-bold'>{post.displayName}</span>
          </div>
          <span className='ml-0'>{formatDate(post.timestamp)}</span>
        </h3>
      </div>
      <div className='text-white flex gap-4 justify-center items-center'>
        <div className='h-16 sm:h-20 w-full sm:min-w-[7rem] bg-slate-800 rounded shadow shadow-black/50 flex flex-col align-center justify-center'>
          <span className='text-center text-2xl sm:text-4xl'>{post.views}</span>
          <span className='text-center text-base'>Views</span>
        </div>
        <div className='h-16 sm:h-20 w-full sm:min-w-[7rem] bg-slate-800 rounded shadow shadow-black/50 flex flex-col align-center justify-center'>
          <span className='text-center text-2xl sm:text-4xl'>
            {post.replies ? post.replies.length : "0"}
          </span>
          <span className='text-center text-base'>Comments</span>
        </div>
      </div>
    </article>
  );
}

export default PostPreview;
