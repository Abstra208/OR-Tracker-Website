"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

if (typeof window !== 'undefined' && Cookies.get('access_token') !== undefined) {
  window.location.href = '/login';
}

const LoginPage = () => {
  const redirect_url = window.location.origin + window.location.pathname
  useEffect(() => {
    const fetchUserData = async (code: string) => {
      try {
        // Échange le code d'autorisation contre un jeton d'accès
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
          client_id: '1294873348387635230',
          client_secret: 'PbYHrLjnpxiwA0vBpQ4r8-gzfjUFMX9q',
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

    if (code) {
      fetchUserData(code);
    } else {
      window.location.href = `https://discord.com/oauth2/authorize?client_id=1294873348387635230&response_type=code&redirect_uri=${redirect_url}&scope=identify`;
    }
  }, []);
};

export default LoginPage;