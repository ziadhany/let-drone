import React from 'react';

export default function Logout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    return (
        <>
           <h1>Logout</h1>
        </>
    );
}
