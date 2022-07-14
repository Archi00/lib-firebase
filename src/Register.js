import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import { registerWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { auth } from "./UserApp";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("")
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/dashboard");
  }, [user, loading]);

  const handleRegister = () => {
    if (password === confirmPwd) {
      registerWithEmailAndPassword(name, email, password)
    }
  }

  return (
        <div className="login">
      <div className="text-center px-14 py-6 max-w-[40vh] min-w-[40vh] min-h-[50vh] max-h-[50vh] rounded-lg border border-gray-200 shadow-lg bg-gray-800 border-gray-600">
        <form className="flex flex-col space-y-4" action="">
            <div>
                <label htmlFor="email" className="block mb-2 text-2xl font-medium text-gray-300 text-gray-300">Your name</label>
                <input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="border border-gray-300 text-gray-300 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="name" required />
            </div>
            <div className="pb-12">
                <label htmlFor="email" className="block mb-2 text-2xl font-medium text-gray-300 text-gray-300">Your email</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="border border-gray-300 text-gray-300 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="name@placeholder.com" required />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-2xl font-medium text-gray-300 text-gray-300">Your password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="border border-gray-300 text-gray-300 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required />
            </div>
            <div className="pb-20">
                <label htmlFor="password" className="block mb-2 text-2xl font-medium text-gray-300 text-gray-300">Confirm your password</label>
                <input onChange={(e) => setConfirmPwd(e.target.value)} type="password" name="password" id="confirm-password" placeholder="••••••••" className="border border-gray-300 text-gray-300 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required />
            </div>
            <button onClick={(e) => (e.preventDefault(), handleRegister())} type="submit" className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl px-5 py-2.5 text-center bg-blue-700 hover:bg-blue-800 focus:ring-blue-800">Register new account</button>
            <div className="text-xl font-medium text-gray-500 text-gray-300">
                Already registered? <a href="/" className="text-blue-700 hover:underline text-blue-500">Log in</a>
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