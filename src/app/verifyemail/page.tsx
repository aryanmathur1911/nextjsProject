"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      const errorMsg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Verification failed";
      console.log(errorMsg);
      setError(errorMsg);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify your email</h1>
      <h2 className="bg-orange-500 p-2 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div className="text-black">
          <h1>Email Verified</h1>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h1 className="text-3xl text-black">Error!{error}</h1>
        </div>
      )}
    </div>
  );
}
