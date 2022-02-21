import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";

import FormInput from "./utils/FormInput";

function SignUp(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [error, setError] = useState(null);

  function createUser(newName, newEmail, newPassword) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, newEmail, newPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: newName });
      })
      .catch((error) => {});
  }

  function startSignUp(event) {
    event.preventDefault();
    if (password !== passwordConfirm) {
      setError("Password must match");
    } else {
      setError(null);
      createUser(name, email, password);
    }
  }

  return (
    <section className='my-10 w-96 mx-auto max-w-[95%] bg-slate-300 p-5 rounded shadow-lg shadow-black/75'>
      <h2 className='text-center mb-4 text-xl font-bold'>Create Account</h2>
      <form onSubmit={startSignUp} className='flex flex-col gap-5'>
        <FormInput
          type='text'
          name='display_name'
          change={setName}
          value={name}
        ></FormInput>
        <FormInput
          type='email'
          name='email'
          value={email}
          change={setEmail}
        ></FormInput>
        <FormInput
          type='password'
          name='password'
          value={password}
          change={setPassword}
        ></FormInput>
        <FormInput
          type='password'
          name='re-enter_password'
          value={passwordConfirm}
          change={setPasswordConfirm}
        ></FormInput>

        {error && <div className='text-red-500'>{error}</div>}
        <button
          type='submit'
          className='bg-slate-900 text-white w-full rounded px-3 py-2 hover:darker-bg'
        >
          Create Account
        </button>
      </form>
    </section>
  );
}
export default SignUp;
