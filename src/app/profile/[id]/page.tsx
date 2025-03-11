//write the url something like this http://localhost:3000/profile/abc
//you will get profile pageabc
"use client";

import { useParams } from "next/navigation";

export default function UserProfile(){

    const params = useParams()
    
    const userid = params ?.id || "Unknown"

    return (
        <div>
            <div>
                <h1>Profile</h1>
                <p>profile page{userid}</p>

            </div>
        </div>
    )
}