import FormInput from "./utils/FormInput";
import { useState } from "react";

function CreatePost(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  //   const [season, setSeason] = useState(null);
  //   const [episode, setEpisode] = useState(null);
  //   const [error, setError] = useState(null);
  function handlePost(event) {
    event.preventDefault();
  }
  return (
    <section className='mb-10 mt-5 md:mt-10 w-full mx-auto max-w-[95%] bg-slate-300 p-5 rounded shadow-lg shadow-black/75'>
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
          <button className='bg-red-900 font-bold text-white w-full sm:w-24 rounded px-3 py-2 hover:darker-bg'>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
