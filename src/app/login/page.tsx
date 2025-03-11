"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [loginButton, setLoginButton] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setLoginButton(true);
    }
  }, [user]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/login", user);
      console.log(`succesfully logged in : ${response.data}`);
      toast.success("login successfull")
      setUser({ ...user, email: "", password: "" });
      setLoginButton(false);
      router.push("/profile");
    } catch (error: any) {
      console.log(`login failed : ${error.message}`);
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen">
      <div className="">
        <div className="m-auto p-2 flex flex-col justify-center h-screen items-center">
          <h1 className="font-bold text-xl bg-white border-2 rounded-t-md text-center w-1/4">
            Login here
          </h1>
          <form
            onSubmit={submitHandler}
            action=""
            method="post"
            className="flex flex-col p-2 gap-2 bg-purple-700 items-center w-1/4"
          >
            <input
              type="email"
              placeholder="EMAIL"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              className="border-2 rounded-md p-2 bg-white"
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              className="border-2 rounded-md p-2 bg-white"
            />

            <div>
              {loginButton ?
              <button
                type="submit"
                className="bg-yellow-500 p-2 rounded-md hover:cursor-pointer hover:scale-105 active:bg-yellow-600"
              >
                Login
              </button>
              :
              <h1 className="bg-yellow-500 p-2 rounded-md hover:cursor-pointer ">
                Login
              </h1>}
            </div>
            <span>
              new?
              <Link className="font-semibold hover:underline" href="/signup">
                create an account
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
