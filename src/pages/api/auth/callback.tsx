import { useRouter } from "next/router";
import { loginWithCustomToken } from "./firebase";
import { useEffect } from "react";

export default function Callback() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      fetch(`/api/auth/discord?code=${code}`)
        .then((res) => res.json())
        .then(async (data) => {
          const { token } = data;
          await loginWithCustomToken(token);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données utilisateur:', error);
        });
    }
  }, [code]);

  return(
    <div>
      <a href="https://discord.com/oauth2/authorize?client_id=1294873348387635230&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback&scope=identify+email">Discord</a>
    </div>
  );
}