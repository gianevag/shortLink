/**
 * flowbite block => login page, slate color, remove dark mode
 * @see https://flowbite.com/blocks/marketing/login/
 *
 * Note: In sign up page, I have used react-hook-form with zod resolver to validate the form data, both in client and server side.
 * We have a central validatiion schema in zod/signUp.ts file.
 */

"use client";

import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";
import { signUpUser } from "@/actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SignupFormData } from "definitions";
import { validateSignupForm } from "@/zod/signUp";
import Link from "next/link";
import { ErrorMessage } from "@/components/errorMessage/errorMessage";

export default function Login() {
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(validateSignupForm),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { message } = await signUpUser(data);

      if (message) {
        setServerErrorMessage(message);
      }
    } catch (error) {
      setServerErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign up to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Label htmlFor="email">Your email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="name@company.com"
                  error={errors.email}
                  {...register("email")}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  error={errors.password}
                  {...register("password")}
                />
              </div>
              <div>
                <Label htmlFor="repeatedPassword">Repeat Password</Label>
                <Input
                  type="password"
                  id="repeatedPassword"
                  placeholder="••••••••"
                  {...register("repeatedPassword")}
                  error={errors.repeatedPassword}
                />
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Do you already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
              {serverErrorMessage && (
                <ErrorMessage message={serverErrorMessage} />
              )}
              <Button type="submit">Sign up</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
