import Head from "next/head";
import Image from "next/image";
import { EditSupplierForm } from "~/components/EditSupplierForm";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Suppliers() {

  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>OvationNetwork - Suppliers</title>
        <meta name="description" content="Listed contacts for ON suppliers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#5f5f5f]">
        <div className="relative h-[100px] w-4/5 rounded-lg mb-auto">
            <Image fill src="/ovation-logo.png" alt="logo" className="object-fill" />
        </div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {sessionData ? <EditSupplierForm /> : (
            <>
              <p className="text-2xl text-gray-300 mb-20">
                Please sign in to edit a property / supplier.
              </p>
              <Link href="/auth/sign-in" className="btn btn-wide bg-teal-400 text-white">
                SIGN IN
              </Link>
            </>
          )}
        </div>
      </main>
    </>
  );
}