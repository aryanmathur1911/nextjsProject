"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [data, setData] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const getUserName = async () => {
    try {
      const res = await axios.get("/api/users/me");
      const username = res.data.data.username;
      setUsername(username);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching username:", error.message);
      }
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      const data = res.data.data._id;
      setData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching user details:", error.message);
      }
    }
  };

  return (
    <div>
      <div>
        <h1>Profile {username}</h1>
        <p>Profile page</p>
        <h1>
          {data === null ? (
            "No data about user"
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
        Get user details
      </button>
    </div>
  );
}
