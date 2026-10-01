import { Path } from '@/common/routing';
import { useLoginMutation } from '../../api/authApi';

const redirectUri = import.meta.env.VITE_DOMAIN_ADDRESS + Path.OAuthRedirect;
const url = `${import.meta.env.VITE_BASE_URL}/auth/oauth-redirect?callbackUrl=${redirectUri}`;

const Login = () => {
  const [login] = useLoginMutation();

  const loginHandler = () => {
    window.open(url, 'oauthPopup');

    const recieveMessage = (event: MessageEvent) => {
      if (event.origin !== import.meta.env.VITE_DOMAIN_ADDRESS) return;

      const { code } = event.data;

      if (!code) return;

      login({
        code,
        redirectUri,
        rememberMe: false,
      });

      window.removeEventListener('message', recieveMessage);
    };

    window.addEventListener('message', recieveMessage);
  };

  return (
    <button type="button" onClick={loginHandler}>
      Login
    </button>
  );
};

export default Login;
