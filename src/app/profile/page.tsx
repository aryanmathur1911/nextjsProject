"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState("")

  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserName = async () => {
    //me has a function that returns the user's info in response , therefore we are firing an axios get request to get the user's info
    const res = await axios.get("/api/users/me");
    const username = res.data.data.username;//user is stored in a key "data" in response
    setUsername(username);
  };

  useEffect(() => {
    getUserName();
  }, []);
  

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    const data = res.data.data._id;
    setData(data);
  };

  return (
    <div>
      <div>
        <h1>Profile {username}</h1>
        <p>profile page</p>
        <h1>
          {data === null ? (
            "no data about user"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h1>
      </div>
      <button
        onClick={logout}
        className="bg-red-400 p-2 rounded-md hover:scale-105 hover:bg-500 active:bg-600"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-400 p-2 rounded-md hover:scale-105 hover:bg-green-500 active:bg-green-600 block m-2"
      >
        get user details
      </button>
    </div>
  );
}
