function ViewPost(props) {
  const post = props.post;
  return (
    <div>
      <section className='mx-7 pb-4'>
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
          <button
            className='bg-slate-900 text-white rounded px-3 py-1 ml-4 hover:darker-bg'
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            Back
          </button>
        </div>
      </section>
    </div>
  );
}

export default ViewPost;
