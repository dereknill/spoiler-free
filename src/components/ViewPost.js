import { useNavigate } from "react-router-dom";
import Post from "./Post";

function ViewPost(props) {
  const navigate = useNavigate();
  const post = props.post;
  return (
    <div className='mx-7'>
      <section className='pb-4'>
        <h2 className='text-3xl font-bold'>{props.showName}</h2>
        <div className='mt-2'>
          <div className='flex sm:gap-1 flex-col sm:flex-row sm:items-center sm:items-start'>
            <span>This post references content through</span>
            <span className='font-bold'>
              {`Season ${post.season}, Episode ${post.episode}`}
            </span>
          </div>

          <div className='text-red-800 text-sm'>
            Do not reference any content past this episode
          </div>
          <button
            className='bg-slate-900 text-white rounded px-3 py-1 mt-2 hover:darker-bg'
            onClick={(event) => {
              event.preventDefault();
              navigate(`/shows/${props.showid}/discussion`);
            }}
          >
            Discussion Home
          </button>
        </div>
      </section>

      <Post post={post}></Post>
    </div>
  );
}

export default ViewPost;
