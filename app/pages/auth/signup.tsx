import { RegisterForm } from "@/components/derived/register-form";
import { createAuthClient } from "better-auth/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignUpPage() {
  const authClient = createAuthClient();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      repeat_password: "",
      name: "",
    },
    mode: "onBlur",
  });

  const passwordValue = form.watch("password");

  form.register("repeat_password", {
    required: "Please confirm your password",
    validate: (value) => value === passwordValue || "Passwords do not match",
  });

  const handleSignUpEmailAndPassword = async (data: any) => {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onRequest() {
          toast.info("Creating your account...");
        },
        onSuccess() {
          toast.success("Account created successfully!");
        },
        onError() {
          toast.error("Failed to create account.");
        },
      },
    );
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm form={form} onSubmit={handleSignUpEmailAndPassword} />
      </div>
    </div>
  );
}
