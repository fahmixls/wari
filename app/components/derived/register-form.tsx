import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { useState } from "react";
import { EyeIcon, EyeClosedIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { passwordRegex } from "@/lib/constants";

type RegisterFormProps = {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  className?: string;
};

export function RegisterForm({
  form,
  onSubmit,
  className,
  ...props
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {String(errors.email.message)}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="pr-10"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: passwordRegex,
                        message:
                          "Must be at least 8 characters with uppercase, lowercase, number, and special character",
                      },
                    })}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeIcon size={18} />
                    ) : (
                      <EyeClosedIcon size={18} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {String(errors.password.message)}
                  </p>
                )}
              </div>

              {/* Repeat Password */}
              <div className="grid gap-2">
                <Label htmlFor="repeat_password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="repeat_password"
                    type={showRepeatPassword ? "text" : "password"}
                    className="pr-10"
                    {...register("repeat_password", {
                      required: "Please confirm your password",
                    })}
                    aria-invalid={errors.repeat_password ? "true" : "false"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRepeatPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showRepeatPassword ? (
                      <EyeIcon size={18} />
                    ) : (
                      <EyeClosedIcon size={18} />
                    )}
                  </button>
                </div>
                {errors.repeat_password && (
                  <p className="text-sm text-red-500">
                    {String(errors.repeat_password.message)}
                  </p>
                )}
              </div>

              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">
                    {String(errors.name.message)}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>
            </div>

            {/* Link to Sign In */}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/signin" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
