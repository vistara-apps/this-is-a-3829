import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import styles from "./styles/tailwind.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "icon", href: "/favicon.ico" },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-bg">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Oops!</title>
      </head>
      <body className="min-h-screen bg-bg">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="card">
            <h1 className="text-3xl font-semibold text-text-primary mb-4">
              {isRouteErrorResponse(error)
                ? `${error.status} ${error.statusText}`
                : "Application Error"}
            </h1>
            <p className="text-text-secondary mb-6">
              {isRouteErrorResponse(error)
                ? error.data?.message || "Something went wrong!"
                : error instanceof Error
                ? error.message
                : "Unknown error occurred. Please try again later."}
            </p>
            <a href="/" className="btn-primary inline-block">
              Back to Home
            </a>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

