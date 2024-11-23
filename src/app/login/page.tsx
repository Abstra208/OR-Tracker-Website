"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, get, child, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const client_id = process.env.REACT_DISCORD_CLIENT_ID || '';
const client_secret = process.env.REACT_DISCORD_CLIENT_SECRET || '';

let app = null;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getDatabase(app);

const LoginPage = () => {
  const redirect_url = typeof window !== 'undefined' ? window.location.origin + '/login' : '';
  useEffect(() => {
    const fetchUserData = async (code: string) => {
      try {
        // Échange le code d'autorisation contre un jeton d'accès
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
          client_id: client_id,
          client_secret: client_secret,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirect_url,
          scope: 'identify'
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        const accessToken = tokenResponse.data.access_token;
        Cookies.set('access_token', accessToken);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
      window.location.href = '/dashboard';
    };

    // Récupère le code d'autorisation de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (Cookies.get('access_token') !== undefined) {
      window.location.href = '/dashboard';
    } else if (code === 'guest') {
      Cookies.set('access_token', 'guest');
      window.location.href = '/dashboard';
    } else if (code) {
      fetchUserData(code);
    } else {
      window.location.href = `https://discord.com/oauth2/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_url}&scope=identify`;
    }
  }, []);
};

export default LoginPage;