import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
// import Link from "next/link";
import { AdminSupplierDatabaseTable } from "~/components/AdminSupplierDatabaseTable";

import { api } from "~/utils/api";

export default function Home() {

  return (
    <>
      <Head>
        <title>OvationNetwork Portal Admin</title>
        <meta name="description" content="Admin App for ON IA Portal Dynamic Content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-[hsl(195,100%,71%)] sm:text-[5rem]">
            OvationNetwork<span className="text-[hsl(195,100%,71%)]">IA</span>Admin Portal
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {/* CONTENT FOR LINKS TO THE PUBLIC LINK FOR OVATION PAGES */}
          </div>
          <div className="flex flex-col items-center gap-2">
            {/* BUTTON TO SIGN IN -> REDIRECT TO THE ADMIN DASHBOARD */}
            <AuthShowcase />
            <AdminSupplierDatabaseTable />
          </div>
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.email}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
