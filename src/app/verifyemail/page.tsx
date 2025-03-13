"use client";

import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const verifyUserEmail = useCallback(async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: unknown) {
      let errorMsg = "Verification failed";
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMsg = error.response.data.message;
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }
      console.log(errorMsg);
      setError(errorMsg);
    }
  }, [token]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlToken = searchParams.get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify your email</h1>
      <h2 className="bg-orange-500 p-2 text-black">
        {token ? token : "no token"}
      </h2>
      {verified && (
        <div className="text-black">
          <h1>Email Verified</h1>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h1 className="text-3xl text-black">Error! {error}</h1>
        </div>
      )}
    </div>
  );
}
