import { LoginForm } from "@/components/derived/login-form";
import { createAuthClient } from "better-auth/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignInPage() {
  const authClient = createAuthClient();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const handleLoginGoogle = async () => {
    await authClient.signIn.social(
      { provider: "google" },
      {
        onRequest() {
          toast.info("Signing in with Google...");
        },
        onSuccess() {
          toast.success("Signed in with Google successfully!");
        },
        onError() {
          toast.error("Failed to sign in with Google.");
        },
      },
    );
  };

  const handleLoginEmailAndPassword = async (data: any) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest() {
          toast.info("Signing in...");
        },
        onSuccess() {
          toast.success("Signed in successfully!");
        },
        onError() {
          toast.error("Failed to sign in.");
        },
      },
    );
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          form={form}
          onSubmit={handleLoginEmailAndPassword}
          onGoogleLogin={handleLoginGoogle}
        />
      </div>
    </div>
  );
}
