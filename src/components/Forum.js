import { useState, useEffect } from "react";
import { db } from "../index";
import { doc, getDoc } from "firebase/firestore";
import PostPreview from "./PostPreview";
import ViewPost from "./ViewPost";
import CreatePost from "./CreatePost";
import { useNavigate } from "react-router-dom";
import PageSelector from "./utils/PageSelector";

function Forum(props) {
  const [posts, setPosts] = useState([]);
  const [ready, setReady] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const navigate = useNavigate();

  function handlePostClick(event) {
    event.preventDefault();
    const postid = event.currentTarget.getAttribute("postid");
    navigate(`/shows/${props.showId}/discussion/${postid}`);
  }

  function displayPosts() {
    console.log(page);
    if (posts.length < 1) {
      if (empty) {
        return (
          <h2 className='my-3 text-center'>
            Be the first to post about this show!
          </h2>
        );
      } else {
        return (
          <h2 className='my-3 text-center'>
            No spoiler free posts that match your watch progress
          </h2>
        );
      }
    }

    const firstIndex = page * 10;
    const lastIndex = firstIndex + 9;
    return posts
      .filter((post, index) => {
        return index >= firstIndex && index <= lastIndex;
      })
      .map((post, index) => {
        return (
          <PostPreview
            post={post}
            key={post.id}
            postid={post.id}
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

    function getPosts(showId) {
      const docRef = doc(db, "comments", showId.toString());
      const getResult = async () => await getDoc(docRef);
      getResult()
        .then((result) => {
          if (result.exists()) {
            filterPosts(result.data().posts);
          } else {
            setReady(true);
          }
        })
        .catch((error) => {
          setError("post not found");
        });

      function filterPosts(rawPosts) {
        const postArray = Object.values(rawPosts);
        if (postArray.length > 0) {
          setEmpty(false);
        }
        const filteredArray = postArray.filter((post) => {
          if (parseInt(post.season) < parseInt(props.season)) {
            return true;
          }
          if (
            post.season === props.season &&
            parseInt(post.episode) <= parseInt(props.episode)
          ) {
            return true;
          }
          return false;
        });
        sortPosts(filteredArray);
      }

      function sortPosts(filteredPosts) {
        filteredPosts.sort((a, b) => {
          return b.timestamp.seconds - a.timestamp.seconds;
        });
        setPosts(filteredPosts);
        setNumPages(Math.ceil(filteredPosts.length / 10));
        setReady(true);
      }
    }
  }, [props.showId, props.posting, props, ready]);

  if (!ready) return null;

  if (error) {
    return (
      <section className='flex flex-col gap-2 min-h-[800px] rounded-b-2xl'>
        {error}
      </section>
    );
  }
  if (props.postid) {
    return (
      <section className='flex flex-col gap-2 min-h-[800px] rounded-b-2xl'>
        <ViewPost
          post={posts.find((post) => post.id === props.postid)}
          showName={props.showName}
          showid={props.showId}
          postid={props.postid}
          user={props.user}
          setForumReady={setReady}
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
          postsExist={posts.length > 0}
          season={props.season}
          episode={props.episode}
          user={props.user}
          setForumReady={setReady}
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
      <PageSelector
        page={page}
        setPage={setPage}
        numPages={numPages}
      ></PageSelector>
    </section>
  );
}

export default Forum;
