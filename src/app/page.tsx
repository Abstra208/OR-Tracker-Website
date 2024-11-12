"use client";

import Image from "next/image";
import Cookies from 'js-cookie';

if (Cookies.get('access_token') !== undefined) {
  window.location.href = '/dashboard';
}

export default function Home() {
  return (
    <div>
      <Image
      src="/record_tracker.png"
      alt="Record Tracker Logo"
      layout="intrinsic"
      height={290}
      width={290}
      priority
      className="animated-image-dropdown"
      />
      <div className="animated-dropdown">
        <h1>
          OR Tracker V.2
        </h1>
        <nav>
          <li><a href="/login">Login</a></li>
          <li><a href="https://discord.com/oauth2/authorize?client_id=1294873348387635230">Invite OR Tracker</a></li>
          <li><a href="https://discord.gg/qHt6dKqTJ3">Join the server</a></li>
        </nav>
      </div>
    </div>
  );
}