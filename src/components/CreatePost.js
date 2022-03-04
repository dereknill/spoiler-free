import FormInput from "./utils/FormInput";
import { useState } from "react";
import { db } from "../index";
import { doc, updateDoc, setDoc, Timestamp } from "firebase/firestore";
import uuid from "react-uuid";

function CreatePost(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  function handlePost(event) {
    event.preventDefault();
    const docRef = doc(db, `comments`, props.showId.toString());
    if (props.user) {
      if (props.postsExist) {
        const id = uuid();
        const key = `posts.${id}`;
        const updatePost = async () =>
          await updateDoc(docRef, {
            [key]: {
              displayName: props.user.displayName,
              episode: props.episode,
              season: props.season,
              replies: [],
              text: text,
              title: title,
              views: 0,
              timestamp: Timestamp.fromDate(new Date()),
              uid: props.user.uid,
              id: id,
            },
          });

        updatePost()
          .then((result) => {
            props.setPosting(false);
            props.setForumReady(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const id = uuid();
        const create = async () =>
          await setDoc(docRef, {
            posts: {
              [id]: {
                displayName: props.user.displayName,
                episode: props.episode,
                season: props.season,
                replies: [],
                text: text,
                title: title,
                views: 0,
                timestamp: Timestamp.fromDate(new Date()),
                uid: props.user.uid,
                id: id,
              },
            },
          });

        create().then((result) => {
          props.setPosting(false);
          props.setForumReady(false);
        });
      }
    }
  }

  function handleCancel(event) {
    event.preventDefault();
    props.setPosting(false);
  }
  return (
    <section className='mb-10 mt-5 w-full mx-auto max-w-[95%] bg-slate-300 p-5 rounded shadow-lg shadow-black/75'>
      <h2 className='text-center mb-4 text-xl font-bold'>Create New Post</h2>
      <form onSubmit={handlePost} className='flex flex-col gap-5'>
        <FormInput
          type='text'
          name='title'
          change={setTitle}
          value={title}
        ></FormInput>
        <FormInput
          textArea={true}
          name='content'
          value={text}
          change={setText}
        ></FormInput>

        {/* {error && <div className='text-red-500'>{error}</div>} */}
        <div className='flex justify-end gap-3'>
          <button
            type='submit'
            className='bg-green-900 font-bold text-white w-full sm:w-24 rounded px-3 py-2 hover:darker-bg'
          >
            Submit
          </button>
          <button
            className='bg-red-900 font-bold text-white w-full sm:w-24 rounded px-3 py-2 hover:darker-bg'
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
