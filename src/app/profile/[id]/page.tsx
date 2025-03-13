"use client";

import { useParams } from "next/navigation";

export default function UserProfile() {
  const params = useParams();
  const userid = params?.id || "Unknown";

  return (
    <div>
      <h1>Profile</h1>
      <p>profile page {userid}</p>
    </div>
  );
}