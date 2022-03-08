import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../index";
import { getDocs, collection } from "firebase/firestore";
import PageSelector from "./utils/PageSelector";
import PostPreview from "./PostPreview";

function MyPosts(props) {
  const [user] = useOutletContext();
  const [page, setPage] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [posts, setPosts] = useState(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setNumPages(0);
      const collectionRef = collection(db, "comments");
      const getAllComments = async () => await getDocs(collectionRef);

      getAllComments().then((snapshot) => {
        let shows = [];
        let posts = [];
        snapshot.forEach((doc) => {
          shows = [...shows, doc.data().posts];
        });

        shows.forEach((show) => {
          Object.entries(show).forEach((post) => {
            if (post[1].uid === user.uid) {
              posts.push(post[1]);
            }
          });
        });
        setPosts(posts);
        setReady(true);
      });
    }
  }, [user]);

  function handlePostClick(event) {
    event.preventDefault();
    const postid = event.currentTarget.getAttribute("postid");
    navigate(`/shows/${props.showId}/discussion/${postid}`);
  }

  function displayPosts(posts) {
    if (posts.length < 1) {
      return <h2>No posts found</h2>;
    }

    return posts.map((post) => {
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
  if (!ready) {
    return null;
  }

  return (
    <div className='mb-4 flex justify-center flex-col'>
      <h2 className='flex items-center font-bold justify-center w-full bg-slate-400 h-10 rounded-t-2xl'>
        Your Posts
      </h2>
      <section className='px-1 md:px-5 py-10 bg-slate-300 flex flex-col gap-2 min-h-[800px] rounded-b-2xl'>
        {displayPosts(posts)}
        <PageSelector
          page={page}
          setPage={setPage}
          numPages={numPages}
        ></PageSelector>
      </section>
    </div>
  );
}

export default MyPosts;
