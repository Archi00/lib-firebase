import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import { registerWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { auth } from "./App";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/dashboard");
  }, [user, loading]);

  return (
        <div className="login">
      <div class="text-center px-14 py-6 max-w-[40vh] min-w-[40vh] min-h-[50vh] max-h-[50vh] bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-600">
        <form class="flex flex-col space-y-4" action="#">
            <div>
                <label for="email" class="block mb-2 text-3xl font-medium text-gray-900 dark:text-gray-300">Name</label>
                <input onChange={(e) => setEmail(e.target.value)} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name" required />
            </div>
            <div className="pb-12">
                <label for="email" class="block mb-2 text-3xl font-medium text-gray-900 dark:text-gray-300">Your email</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@placeholder.com" required />
            </div>
            <div>
                <label for="password" class="block mb-2 text-3xl font-medium text-gray-900 dark:text-gray-300">Your password</label>
                <input onChange={() => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div className="pb-20">
                <label for="password" class="block mb-2 text-3xl font-medium text-gray-900 dark:text-gray-300">Confirm password</label>
                <input onChange={() => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <button onClick={() => registerWithEmailAndPassword(name, email, password)} type="submit" class="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800">Register new account</button>
            <div class="text-xl font-medium text-gray-500 dark:text-gray-300">
                Already registered? <a href="/login" class="text-blue-700 hover:underline dark:text-blue-500">Log in</a>
            </div>
        </form>
      </div>
    </div>
  );
}
export default Register;

    // <div className="register">
    //   <div className="register__container">
    //     <input
    //       type="text"
    //       className="register__textBox"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //       placeholder="Full Name"
    //     />
    //     <input
    //       type="text"
    //       className="register__textBox"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="E-mail Address"
    //     />
    //     <input
    //       type="password"
    //       className="register__textBox"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //     />
    //     <button className="register__btn" onClick={register}>
    //       Register
    //     </button>
    //     <div>
    //       Already have an account? <Link to="/">Login</Link> now.
    //     </div>
    //   </div>
    // </div>