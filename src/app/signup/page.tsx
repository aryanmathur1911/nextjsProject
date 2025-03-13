"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [signupButton, setSignupButton] = useState(false);

  useEffect(() => {
    if (user.username && user.email && user.password) {
      setSignupButton(true);
    }
  }, [user]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Successfully signed up:", response.data);
      setUser({ username: "", email: "", password: "" });
      setSignupButton(false);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen">
      <div>
        <div className="m-auto p-2 flex flex-col justify-center h-screen items-center">
          <h1 className="font-bold text-xl bg-white border-2 rounded-t-md text-center w-1/4">
            Sign Up here
          </h1>
          <form
            onSubmit={submitHandler}
            className="flex flex-col p-2 gap-2 bg-purple-700 items-center w-1/4"
          >
            <input
              type="text"
              placeholder="USERNAME"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="border-2 rounded-md p-2 bg-white"
            />
            <input
              type="email"
              placeholder="EMAIL"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="border-2 rounded-md p-2 bg-white"
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="border-2 rounded-md p-2 bg-white"
            />
            <div>
              {signupButton ? (
                <button
                  type="submit"
                  className="bg-yellow-500 p-2 rounded-md hover:cursor-pointer hover:scale-105 active:bg-yellow-600"
                >
                  sign up
                </button>
              ) : (
                <h1 className="bg-yellow-500 p-2 rounded-md">sign up</h1>
              )}
            </div>
            <span>
              already a user ,{" "}
              <Link className="font-semibold hover:underline" href="/login">
                login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
