import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./utils/FormInput";

function SignUp(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  function createUser(newName, newEmail, newPassword) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, newEmail, newPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: newName }).then(() => {
          navigate("/profile");
        });
      })
      .catch((error) => {});
  }

  function startSignUp(event) {
    const auth = getAuth();
    event.preventDefault();
    if (password !== passwordConfirm) {
      setError("Password must match");
    } else {
      fetchSignInMethodsForEmail(auth, email).then((result) => {
        if (result.length > 0) {
          setError("Email already attached to an account");
        } else {
          setError(null);
          createUser(name, email, password);
        }
      });
    }
  }

  return (
    <div className='w-full absolute rounded-xl h-full bg-slate-600'>
      <section className='mb-10 mt-5 md:mt-10 w-96 mx-auto max-w-[95%] bg-slate-300 p-5 rounded shadow-lg shadow-black/75'>
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
    </div>
  );
}
export default SignUp;
