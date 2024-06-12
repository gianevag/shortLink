/**
 * flowbite block => login page, slate color, remove dark mode
 * @see https://flowbite.com/blocks/marketing/login/
 */

"use client";

import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";
import { signInUser } from "@/actions/user";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

export default function Login() {
  const [errorMesssage, dispatch] = useFormState(signInUser, undefined);

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action={dispatch}>
              <div>
                <Label htmlFor="email">Your email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                />
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
              {errorMesssage && (
                <p
                  id="standard_error_help"
                  className="mt-2 text-xs text-red-600 dark:text-red-400"
                >
                  <span className="font-medium">Oh, snapp! </span>
                  {errorMesssage}.
                </p>
              )}
              <SubmitButton />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      Sign in
    </Button>
  );
};
