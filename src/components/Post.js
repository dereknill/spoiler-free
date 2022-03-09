import moment from "moment";
import { db } from "../index";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Post(props) {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  function formatDate(timestamp) {
    const date = timestamp.toDate();
    let m = moment(date);
    m.locale();
    return m.format("LLL");
  }
  const post = props.post;

  function displayDeleteConfirm() {
    if (deleting) {
      return (
        <div className='h-48 w-[26rem] max-w-[85%] p-5 flex items-center justify-center flex-col gap-5 fixed z-[100000] bg-slate-400 rounded top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 shadow-lg shadow-black/50 gap-10'>
          <div className='text-base sm:text-xl font-bold w-full text-center'>
            Are you sure you want to delete this post?
          </div>
          <div className='flex justify-between w-full'>
            <button
              className='bg-red-900 hover:darker-bg px-3 py-1 text-white rounded'
              onClick={(event) => {
                event.preventDefault();
                setDeleting(false);
              }}
            >
              NO
            </button>
            <button
              className='bg-green-900 hover:darker-bg px-3 py-1 text-white rounded'
              onClick={handleDelete}
            >
              YES
            </button>
          </div>
        </div>
      );
    }
  }

  function handleDelete(event) {
    event.preventDefault();

    const docRef = doc(db, "comments", props.showid.toString());
    const getPosts = async () => await getDoc(docRef);
    const delPost = async (newPosts) =>
      await setDoc(docRef, {
        posts: newPosts,
      });

    getPosts().then((result) => {
      let posts = result.data().posts;
      delete posts[post.id];
      delPost(posts).then((deleted) => {
        props.setForumReady(false);
        navigate(`/shows/${props.showid}/discussion`);
      });
    });
  }
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
      <div className='bg-slate-200 py-3 px-4 rounded-b whitespace-pre-line break-words'>
        <div>{post.text}</div>
        {post.uid === props.user.uid && (
          <div className='w-full flex justify-end'>
            <button
              className='bg-red-900 text-white rounded px-3 py-1 hover:darker-bg w-fit'
              onClick={() => {
                setDeleting(true);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {displayDeleteConfirm()}
    </article>
  );
}

export default Post;
