import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { verifyLogin, createUserSession, getUser } from "~/utils/session.server";

export const meta = () => {
  return [
    { title: "Login - PetPicShowcase" },
    { name: "description", content: "Login to your PetPicShowcase account" },
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
  const redirectTo = formData.get("redirectTo") || "/dashboard";
  
  // Validate form data
  if (!email || typeof email !== "string") {
    return json({ errors: { email: "Email is required" } }, { status: 400 });
  }
  
  if (!password || typeof password !== "string") {
    return json({ errors: { password: "Password is required" } }, { status: 400 });
  }
  
  // Verify login
  const user = await verifyLogin(email, password);
  if (!user) {
    return json({ errors: { form: "Invalid email or password" } }, { status: 400 });
  }
  
  // Create user session
  return createUserSession(user.id, redirectTo);
}

export default function Login() {
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
            Sign in to your account
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
                  autoComplete="current-password"
                  required
                  className="input"
                />
                {actionData?.errors?.password && (
                  <p className="error-message">{actionData.errors.password}</p>
                )}
              </div>
            </div>
            
            {actionData?.errors?.form && (
              <div className="error-message text-center">{actionData.errors.form}</div>
            )}
            
            <div>
              <button type="submit" className="btn-primary w-full">
                Sign in
              </button>
            </div>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              Don't have an account?{" "}
              <Link
                to={{
                  pathname: "/register",
                  search: searchParams.toString(),
                }}
                className="text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

