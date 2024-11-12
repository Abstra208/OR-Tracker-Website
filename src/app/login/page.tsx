"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

if (Cookies.get('access_token') !== undefined) {
  window.location.href = '/dashboard';
}

const LoginPage = () => {
  useEffect(() => {
    const fetchUserData = async (code: string) => {
      try {
        // Échange le code d'autorisation contre un jeton d'accès
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
          client_id: '1294873348387635230',
          client_secret: 'PbYHrLjnpxiwA0vBpQ4r8-gzfjUFMX9q',
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: window.location.origin + window.location.pathname,
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

    if (code) {
      fetchUserData(code);
    } else {
      window.location.href = 'https://discord.com/oauth2/authorize?client_id=1294873348387635230&response_type=code&redirect_uri=https%3A%2F%2For-tracker-website.vercel.app%2Flogin&scope=identify';
    }
  }, []);
};

export default LoginPage();