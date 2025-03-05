"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [state, loginAction] = useActionState(login, undefined);

  if (state?.redirectTo) {
    router.push(state.redirectTo);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        action={loginAction}
        className="w-full max-w-md p-8 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Admin Login
        </h2>

        {/* Email input */}
        <div className="mt-4">
          <label htmlFor="email" className="text-gray-600 font-medium">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
          )}
        </div>

        {/* Password input */}
        <div className="mt-4">
          <label htmlFor="password" className="text-gray-600 font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {state?.errors?.password && (
            <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={`mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 text-white font-medium rounded-md ${
        pending
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      } transition duration-300`}
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}
