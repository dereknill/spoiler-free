import { useState, useEffect } from "react";
import { db } from "../index";
import { doc, getDoc } from "firebase/firestore";
import PostPreview from "./PostPreview";
import uuid from "react-uuid";
import CreatePost from "./CreatePost";

function Forum(props) {
  const [posts, setPosts] = useState(null);
  const [ready, setReady] = useState(false);

  function getPosts(showId) {
    const docRef = doc(db, "comments", showId.toString());
    const getResult = async () => await getDoc(docRef);
    getResult().then((result) => {
      if (result.exists()) {
        setPosts(result.data().posts);
      }
      setReady(true);
    });
  }

  function displayPosts() {
    if (!posts) {
      return <h2>Be the first to post about this show!</h2>;
    }
    return posts.map((post) => {
      return <PostPreview post={post} key={uuid()}></PostPreview>;
    });
  }
  useEffect(() => {
    getPosts(props.showId);
  }, [props.showId]);

  if (!ready) return null;

  if (props.posting)
    return (
      <section className='px-1 md:px-5 py-10 bg-slate-600 flex flex-col gap-2 min-h-[800px] rounded-b-2xl'>
        <CreatePost></CreatePost>
      </section>
    );
  return (
    <section className='px-1 md:px-5 py-10 bg-slate-300 flex flex-col gap-2 min-h-[800px] rounded-b-2xl'>
      <button
        className='bg-slate-900 text-white rounded px-3 py-1 hover:darker-bg'
        onClick={() => {
          props.setPosting(true);
        }}
      >
        Edit
      </button>
      {displayPosts()}
    </section>
  );
}

export default Forum;
