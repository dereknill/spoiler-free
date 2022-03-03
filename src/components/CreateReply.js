import FormInput from "./utils/FormInput";
import { useState } from "react";
import { db } from "../index";
import { doc, updateDoc, Timestamp, arrayUnion } from "firebase/firestore";
import uuid from "react-uuid";

function CreateReply(props) {
  const [text, setText] = useState("");
  function handleReply(event) {
    event.preventDefault();
    const docRef = doc(db, `comments`, props.showid.toString());

    const key = `posts.${props.postid}.replies`;
    const updateReply = async () =>
      await updateDoc(docRef, {
        [key]: arrayUnion({
          displayName: props.user.displayName,
          text: text,
          timestamp: Timestamp.fromDate(new Date()),
          uid: props.user.uid,
          id: uuid(),
        }),
      });

    updateReply()
      .then((result) => {
        props.setReplying(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCancel(event) {
    event.preventDefault();
    props.setReplying(false);
  }

  return (
    <section className='mb-10 mt-5 w-full bg-slate-200 px-5 py-2 rounded shadow-lg shadow-slate-600/50'>
      <h2 className='text-center mb-1 text-xl font-bold'>Create Reply</h2>
      <form onSubmit={handleReply} className='flex flex-col gap-5'>
        <FormInput
          textArea={true}
          name={""}
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

export default CreateReply;
