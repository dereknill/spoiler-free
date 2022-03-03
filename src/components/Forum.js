import { useState, useEffect } from "react";
import { db } from "../index";
import { doc, getDoc } from "firebase/firestore";
import PostPreview from "./PostPreview";
import ViewPost from "./ViewPost";
import CreatePost from "./CreatePost";
import { useNavigate } from "react-router-dom";

function Forum(props) {
  const [posts, setPosts] = useState(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  function handlePostClick(event) {
    event.preventDefault();
    const postid = event.currentTarget.getAttribute("postid");

    navigate(`/shows/${props.showId}/discussion/${postid}`);
  }

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
    return Object.keys(posts).map((key, index) => {
      return (
        <PostPreview
          post={posts[key]}
          key={key}
          postid={key}
          click={handlePostClick}
        ></PostPreview>
      );
    });
  }
  useEffect(() => {
    if (!ready) {
      getPosts(props.showId);
    }
    props.postid
      ? props.setFromPost(`/${props.postid}`)
      : props.setFromPost("");
  }, [props.showId, props.posting, props, ready]);

  if (!ready) return null;

  if (props.postid) {
    return (
      <section className='flex flex-col gap-2 min-h-[800px] rounded-b-2xl'>
        <ViewPost
          post={posts[props.postid]}
          showName={props.showName}
          showid={props.showId}
          postid={props.postid}
          user={props.user}
        ></ViewPost>
      </section>
    );
  }
  if (props.posting)
    return (
      <section className='px-1 md:px-5 py-10 bg-slate-400 flex flex-col gap-2 min-h-[800px] rounded-b-2xl'>
        <CreatePost
          showId={props.showId}
          setPosting={props.setPosting}
          postsExist={posts ? true : false}
          season={props.season}
          episode={props.episode}
          user={props.user}
        ></CreatePost>
      </section>
    );
  return (
    <section className='px-1 md:px-5 py-10 bg-slate-300 flex flex-col gap-2 min-h-[800px] rounded-b-2xl'>
      <button
        className='bg-slate-900 text-white rounded px-3 py-1 hover:darker-bg w-full sm:w-fit'
        onClick={() => {
          props.setPosting(true);
        }}
      >
        New Post
      </button>
      {displayPosts()}
    </section>
  );
}

export default Forum;
