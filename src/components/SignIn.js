import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import LineBreak from "./utils/LineBreak";

function SignIn(props) {
  let [user] = useOutletContext();
  const navigate = useNavigate();

  function startSignIn(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}: ${errorMessage}`);
      });
  }
  function getSignedInDisplay() {
    if (user) {
      return <h3>{user.displayName} is signed in.</h3>;
    } else {
      return <h3>User not signed in.</h3>;
    }
  }

  return (
    <section className='my-6 w-96 mx-auto max-w-[95%] bg-slate-300 p-5 rounded shadow-lg shadow-black/75'>
      <h2 className='text-center mb-4 text-xl font-bold'>Sign In</h2>
      <form onSubmit={startSignIn} className='flex flex-col gap-5'>
        <div className='w-full flex flex-col gap-1'>
          <label htmlFor='email' className='font-bold'>
            Email
          </label>

          <input
            type='email'
            name='email'
            required={true}
            className='w-full px-3 py-1 border-slate-400 rounded border'
          ></input>
        </div>
        <div className='w-full flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <label htmlFor='password' className='font-bold'>
              Password
            </label>
            <Link to='/' className='text-sm hover:underline'>
              Forgot your password?
            </Link>
          </div>
          <input
            type='password'
            name='password'
            required={true}
            className='w-full px-3 py-1 border-slate-400 rounded border'
          ></input>
        </div>
        <button
          type='submit'
          className='bg-slate-900 text-white w-full rounded mt-5 px-3 py-2 hover:darker-bg'
        >
          Sign-In
        </button>
      </form>

      <LineBreak type='margin-10'></LineBreak>
      <h3 className='mb-3 text-center'>Don't have an account yet?</h3>
      <Link to='/signup'>
        <button className='bg-slate-600 text-white w-full rounded px-3 py-2 hover:darker-bg'>
          Create your account
        </button>
      </Link>
      {getSignedInDisplay()}
    </section>
  );
}
export default SignIn;
