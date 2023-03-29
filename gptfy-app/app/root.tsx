import { MetaFunction, LinksFunction, json, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossOrigin: 'use-credentials' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com' }
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader = async () => {
  return json({
    ENV: {
      CLIENT_ID: process.env.CLIENT_ID,
      CLIENT_SECRET: process.env.CLIENT_SECRET,
      REDIRECT_URI: process.env.REDIRECT_URI,
      SCOPE: process.env.SCOPE,
    }
  });
}

export default function App() {
  const { ENV } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        {/* This is the inline script tag */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.process = ${JSON.stringify({ env: ENV })}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
