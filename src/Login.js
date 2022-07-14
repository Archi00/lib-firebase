import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailPassword } from "./firebase";
import { auth } from "./UserApp";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      history.replace("/dashboard");
      window.location.reload()
    }
  }, [user, loading]);

  return (
    <div className="bg-gray-900 min-h-[0vh] max-h-[0vh] z-1">
      <div class="text-center p-14 max-w-[40vh] min-w-[40vh] min-h-[45vh] max-h-[45vh] rounded-lg border border-gray-200 shadow-lg bg-gray-800 border-gray-600">
        <form class="flex flex-col space-y-12 pt-2" action="#">
            <div>
                <label for="email" class="block mb-2 text-2xl font-medium text-gray-300">Your email</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" class="border border-gray-300 text-gray-300 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="name@placeholder.com" required />
            </div>
            <div className="pb-24">
                <label for="password" class="block mb-2 text-2xl font-medium text-gray-300">Your password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class=" border border-gray-300 text-gray-300 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required />
            </div>
            <button onClick={(e) => (e.preventDefault(), signInWithEmailPassword(email, password))} type="submit" class="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl px-5 py-2.5 text-center bg-blue-700 hover:bg-blue-800 focus:ring-blue-800">Login to your account</button>
            <div class="text-xl font-medium text-gray-500 text-gray-300">
                Not registered? <a href="/register" class="text-blue-700 hover:underline text-blue-500">Create account</a>
              <div>
                <a href="/reset" class="ml-auto my-8 text-lg text-blue-700 hover:underline text-blue-500">Lost Password?</a>
              </div>
            </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
