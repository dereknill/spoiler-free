import { useNavigate } from "react-router-dom";
import Post from "./Post";
import CreateReply from "./CreateReply";
import { useState, useEffect } from "react";
import { db } from "../index";
import Reply from "./Reply";
import { doc, updateDoc, increment } from "firebase/firestore";
import uuid from "react-uuid";
import PageSelector from "./utils/PageSelector";

function ViewPost(props) {
  const navigate = useNavigate();
  const post = props.post;
  const [replying, setReplying] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(0);

  function handleReply(event) {
    event.preventDefault();
    setReplying(true);
  }

  useEffect(() => {
    setNumPages(Math.ceil(post.replies.length / 10));
  }, [post.replies.length]);

  useEffect(() => {
    if (replying) {
      window.scrollTo({ top: window.innerHeight, left: 0, behavior: "smooth" });
    }
  }, [replying]);

  useEffect(() => {
    const docRef = doc(db, "comments", props.showid.toString());
    const key = `posts.${props.postid}.views`;
    const update = async () =>
      await updateDoc(docRef, {
        [key]: increment(1),
      });

    update().then(() => {});
  }, [props.showid, props.postid]);

  function displayReplies(replies) {
    const firstIndex = page * 10;
    const lastIndex = firstIndex + 9;

    return replies
      .filter((reply, index) => {
        return index >= firstIndex && index <= lastIndex;
      })
      .map((reply) => {
        return <Reply reply={reply} key={uuid()} user={props.user}></Reply>;
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
            props.setForumReady(false);
            navigate(`/shows/${props.showid}/discussion`);
          }}
        >
          Discussion Home
        </button>
      </div>
      <div className='px-1 md:px-5 flex flex-col gap-4'>
        {page === 0 && (
          <Post
            post={post}
            user={props.user}
            showid={props.showid}
            setForumReady={props.setForumReady}
          ></Post>
        )}
        {displayReplies(post.replies)}
        {!replying && (
          <PageSelector
            page={page}
            setPage={setPage}
            numPages={numPages}
          ></PageSelector>
        )}
      </div>
      <div className='px-1 md:px-5 mb-2'>
        {replying && (
          <CreateReply
            postid={props.postid}
            showid={props.showid}
            user={props.user}
            setReplying={setReplying}
            setForumReady={props.setForumReady}
          ></CreateReply>
        )}
      </div>
    </div>
  );
}

export default ViewPost;
