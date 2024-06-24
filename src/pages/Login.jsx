import { LoginForm } from "@/features/authentication/LoginForm";

function Login() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6">
      <img src="/logo-light.png" alt="logo" className="h-32 w-auto" />
      <h1 className="text-2xl font-bold">Log in to your account</h1>
      <LoginForm />
    </div>
  );
}

export default Login;
