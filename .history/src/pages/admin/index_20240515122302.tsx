import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { AdminSupplierDatabaseTable } from "~/components/AdminSupplierDatabaseTable";
import { useRouter } from "next/navigation";


export default function Home() {

  return (
    <>
      <Head>
        <title>OvationNetwork Portal Admin</title>
        <meta name="description" content="Admin App for ON IA Portal Dynamic Content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="relative h-[100px] w-4/5 rounded-lg mb-auto">
            <Image fill src="/ovation-logo.png" alt="logo" className="object-fill" />
        </div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
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
  const router = useRouter();
  const { data: sessionData } = useSession();

  if (!sessionData) {
    router.push("/auth/sign-in");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.email}</span>}
      </p>
      <button
        className="rounded-full px-10 py-3 font-semibold no-underline transition"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
