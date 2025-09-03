import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { createUser, createUserSession, getUser } from "~/utils/session.server";
import { getUserByEmail } from "~/models/user.server";

export const meta = () => {
  return [
    { title: "Register - PetPicShowcase" },
    { name: "description", content: "Create a new PetPicShowcase account" },
  ];
};

export async function loader({ request }) {
  const user = await getUser(request);
  if (user) return redirect("/dashboard");
  return json({});
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const redirectTo = formData.get("redirectTo") || "/dashboard";
  
  // Validate form data
  const errors = {};
  
  if (!email || typeof email !== "string" || !email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }
  
  if (!password || typeof password !== "string" || password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  
  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  
  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }
  
  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json({ errors: { email: "A user with this email already exists" } }, { status: 400 });
  }
  
  // Create user
  const user = await createUser(email, password);
  
  // Create user session
  return createUserSession(user.id, redirectTo);
}

export default function Register() {
  const actionData = useActionData();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-bold text-text-primary">
            PetPicShowcase
          </h1>
          <h2 className="mt-6 text-center text-2xl font-semibold text-text-primary">
            Create your account
          </h2>
        </div>
        
        <div className="card">
          <Form method="post" className="space-y-6">
            <input type="hidden" name="redirectTo" value={redirectTo} />
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input"
                />
                {actionData?.errors?.email && (
                  <p className="error-message">{actionData.errors.email}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="input"
                />
                {actionData?.errors?.password && (
                  <p className="error-message">{actionData.errors.password}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="input"
                />
                {actionData?.errors?.confirmPassword && (
                  <p className="error-message">{actionData.errors.confirmPassword}</p>
                )}
              </div>
            </div>
            
            <div>
              <button type="submit" className="btn-primary w-full">
                Create Account
              </button>
            </div>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              Already have an account?{" "}
              <Link
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
                className="text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

