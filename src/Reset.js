import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { sendPswResetEmail } from "./firebase";
import { auth } from "./UserApp";
import "./Reset.css";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/dashboard");
  }, [user, loading]);

  return (
    <div className="login">
      <div class="text-center p-14 max-w-[40vh] min-w-[40vh] min-h-[45vh] max-h-[45vh] rounded-lg border border-gray-200 shadow-lg bg-gray-800 border-gray-600">
        <form class="flex flex-col space-y-4 pt-36" action="">
            <div class="pb-48">
                <label for="email" class="block mb-2 text-2xl font-medium text-gray-300 text-gray-300">Your email</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" class=" border border-gray-300 text-gray-300 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="name@placeholder.com" required />
            </div>
            <button onClick={(e) => (e.preventDefault(), sendPswResetEmail(email), history.replace("/"))} type="submit" class="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl px-5 py-2.5 text-center bg-blue-700 hover:bg-blue-800 focus:ring-blue-800">Send reset password e-mail</button>
            <div className="text-xl font-medium text-gray-500 text-gray-300">
                Already registered? <a href="/" className="text-blue-700 hover:underline text-blue-500">Log in</a>
            </div>
            <div class="text-xl font-medium text-gray-500 text-gray-300">
                Not registered? <a href="/register" class="text-blue-700 hover:underline text-blue-500">Create account</a>
            </div>
        </form>
      </div>
    </div>
  );
}
export default Reset;
