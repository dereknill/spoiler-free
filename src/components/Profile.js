import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import FormInput from "./utils/FormInput";

function Profile(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [edit, setEdit] = useState(false);
  //   const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [user] = useOutletContext();

  //   function createUser(newName, newEmail, newPassword) {
  //     const auth = getAuth();
  //     createUserWithEmailAndPassword(auth, newEmail, newPassword)
  //       .then((userCredential) => {
  //         const user = userCredential.user;
  //         updateProfile(user, { displayName: newName });
  //       })
  //       .catch((error) => {});
  //   }

  //   function startSignUp(event) {
  //     event.preventDefault();
  //     if (password !== passwordConfirm) {
  //       setError("Password must match");
  //     } else {
  //       setError(null);
  //       createUser(name, email, password);
  //     }
  //   }
  function editOrSave(event) {
    event.preventDefault();
    if (!edit) {
      setEdit(true);
    }
  }

  function handleCancel(event) {
    event.preventDefault();
    setName(user.displayName);
    setEmail(user.email);
    setPassword("");
    setPasswordConfirm("");
    setEdit(false);
  }
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      setName(user.displayName);
      setEmail(user.email);
    }
  }, [navigate, user]);

  function displayButtons() {
    if (!edit) {
      return (
        <button
          type='submit'
          className='bg-slate-900 text-white w-full rounded px-3 py-2 hover:darker-bg'
        >
          Edit Account
        </button>
      );
    } else {
      return (
        <div className='flex flex-col gap-5'>
          <button
            className='bg-red-900 text-white w-full rounded px-3 py-2 hover:darker-bg'
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type='submit'
            className='bg-green-900 text-white w-full rounded px-3 py-2 hover:darker-bg'
          >
            Save
          </button>
        </div>
      );
    }
  }
  return (
    <div className='w-full absolute rounded-xl h-full bg-slate-600'>
      <section className='my-10 w-96 mx-auto max-w-[95%] bg-slate-300 p-5 rounded shadow-lg shadow-black/75'>
        <h2 className='text-center mb-4 text-xl font-bold'>Profile</h2>
        <form onSubmit={editOrSave} className='flex flex-col gap-5'>
          <FormInput
            type='text'
            name='display_name'
            change={setName}
            value={name}
            disabled={!edit}
          ></FormInput>
          <FormInput
            type='email'
            name='email'
            value={email}
            change={setEmail}
            disabled={!edit}
          ></FormInput>
          <FormInput
            type='password'
            name='new_password'
            value={password}
            change={setPassword}
            disabled={!edit}
          ></FormInput>
          <FormInput
            type='password'
            name='re-enter_password'
            value={passwordConfirm}
            change={setPasswordConfirm}
            disabled={!edit}
          ></FormInput>
          {/* {error && <div className='text-red-500'>{error}</div>} */}
          {displayButtons()}
        </form>
      </section>
    </div>
  );
}
export default Profile;
