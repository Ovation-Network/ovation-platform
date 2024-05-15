import Head from "next/head";
import Image from "next/image";
import { AddSupplierForm } from "~/components/AddSupplierForm";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AddSupplier() {

  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>OvationNetwork - Suppliers</title>
        <meta name="description" content="Listed contacts for ON suppliers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="relative h-[100px] w-4/5 rounded-lg mb-auto">
            <Image fill src="/ovation-logo.png" alt="logo" className="object-fill" />
        </div>
        {sessionData ? (
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-md font-extrabold tracking-tight text-[hsla(195,100%,71%,1)] sm:text-[5rem]">
              ADD A PROPERTY / SUPPLIER
            </h1>
            <Link href="/admin" className="btn btn-wide bg-red-400 text-white">
              CANCEL / GO BACK
            </Link >
            <div className="flex">
              < AddSupplierForm />
            </div>
          </div>
        ) : (
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <p className="text-2xl text-slate mb-20">
              Please sign in to add a property / supplier.
            </p>
            <Link href="/auth/sign-in" className="btn btn-wide bg-teal-400 text-white">
              SIGN IN
            </Link>
          </div>

        )}
        
      </main>
    </>
  );
}