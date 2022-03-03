import { useNavigate } from "react-router-dom";
import Post from "./Post";
import CreateReply from "./CreateReply";
import { useState, useRef } from "react";
import Reply from "./Reply";

function ViewPost(props) {
  const navigate = useNavigate();
  const post = props.post;
  const [replying, setReplying] = useState(false);
  const replyRef = useRef();

  function handleReply(event) {
    event.preventDefault();
    replyRef.current.scrollIntoView({ behavior: "smooth" });
    setReplying(true);
  }

  function displayReplies(replies) {
    return replies.map((reply) => {
      return <Reply reply={reply}></Reply>;
    });
  }
  return (
    <div>
      <section className='pb-4 mx-7'>
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
        </div>
      </section>
      <div className='flex justify-between items-center gap-2 px-1 md:px-5 mb-2'>
        <button
          className='bg-slate-900 text-white rounded px-3 py-1 mt-2 hover:darker-bg w-full sm:w-fit'
          onClick={handleReply}
        >
          Reply
        </button>
        <button
          className='bg-slate-900 text-white rounded px-3 py-1 mt-2 hover:darker-bg w-full sm:w-fit'
          onClick={(event) => {
            event.preventDefault();
            navigate(`/shows/${props.showid}/discussion`);
          }}
        >
          Discussion Home
        </button>
      </div>
      <div className='px-1 md:px-5 flex flex-col gap-4'>
        <Post post={post}></Post>
        {displayReplies(post.replies)}
      </div>
      <div ref={replyRef} className='px-1 md:px-5 mb-2'>
        {replying && (
          <CreateReply
            postid={props.postid}
            showid={props.showid}
            user={props.user}
            setReplying={setReplying}
            replyRef={replyRef}
          ></CreateReply>
        )}
      </div>
    </div>
  );
}

export default ViewPost;
