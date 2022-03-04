import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import FormInput from "./utils/FormInput";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile,
  updateEmail,
  updatePassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

function Profile(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [edit, setEdit] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [error, setError] = useState(null);
  const [reauth, setReauth] = useState("");
  const navigate = useNavigate();
  const [user] = useOutletContext();

  function editOrSave(event) {
    event.preventDefault();
    if (!edit && !editPassword) {
      setEdit(true);
    } else if (edit) {
      const auth = getAuth();
      fetchSignInMethodsForEmail(auth, email)
        .then((result) => {
          if (result.length > 0) {
            setError("Email already attached to an account");
          } else {
            updateProfile(auth.currentUser, { displayName: name }).then(() => {
              updateEmail(auth.currentUser, email).then(() => {
                setEdit(false);
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (editPassword) {
      const auth = getAuth();
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        reauth
      );
      const reauthenticate = async () =>
        await reauthenticateWithCredential(auth.currentUser, credential);

      reauthenticate()
        .then(() => {
          if (
            password.length > 0 &&
            passwordConfirm.length > 0 &&
            password === passwordConfirm
          ) {
            const auth = getAuth();
            updatePassword(auth.currentUser, password).then(() => {
              setEditPassword(false);
            });
          } else {
            setError("Password must match");
          }
        })
        .catch((error) => {
          setError("Error reauthenticating");
          return;
        });
    }
  }

  function handleCancel(event) {
    event.preventDefault();
    setName(user.displayName);
    setEmail(user.email);
    setPassword("");
    setPasswordConfirm("");
    setEdit(false);
    setEditPassword(false);
  }
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      setName(user.displayName);
      setEmail(user.email);
    }
  }, [navigate, user]);

  useEffect(() => {
    setError("");
  }, [edit, editPassword]);

  function changePassword(event) {
    event.preventDefault();
    setEditPassword(true);
  }
  function displayButtons() {
    if (!edit && !editPassword) {
      return (
        <div className='flex flex-col gap-5 mt-5'>
          <button
            type='submit'
            className='bg-slate-900 text-white w-full rounded px-3 py-2 hover:darker-bg'
            onClick={editOrSave}
          >
            Edit Account
          </button>
          <button
            type='submit'
            className='bg-slate-900 text-white w-full rounded px-3 py-2 hover:darker-bg'
            onClick={changePassword}
          >
            Change Password
          </button>
        </div>
      );
    } else {
      return (
        <div className='flex flex-col gap-5 mt-5'>
          <button
            className='bg-red-900 text-white w-full rounded px-3 py-2 hover:darker-bg'
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type='submit'
            className='bg-green-900 text-white w-full rounded px-3 py-2 hover:darker-bg'
            onClick={editOrSave}
          >
            Save
          </button>
        </div>
      );
    }
  }
  return (
    <div className='w-full rounded-xl min-h-screen bg-slate-600 pt-5 md:pt-10 pb-10'>
      <section className='mb-10 mt-5 md:mt-10 w-96 mx-auto max-w-[95%] bg-slate-300 p-5 rounded shadow-lg shadow-black/75'>
        <h2 className='text-center mb-4 text-xl font-bold'>Profile</h2>
        <form className='flex flex-col gap-5 mb-4'>
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
          {editPassword && (
            <div className='flex flex-col gap-5'>
              <FormInput
                type='password'
                name='old_password'
                value={reauth}
                change={setReauth}
              ></FormInput>
              <FormInput
                type='password'
                name='new_password'
                value={password}
                change={setPassword}
              ></FormInput>
              <FormInput
                type='password'
                name='re-enter_password'
                value={passwordConfirm}
                change={setPasswordConfirm}
              ></FormInput>
            </div>
          )}
          {error && <div className='text-red-500'>{error}</div>}
          {displayButtons()}
        </form>
      </section>
    </div>
  );
}
export default Profile;
