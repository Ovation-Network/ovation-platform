import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";
// import Link from "next/link";


export default function SignIn() {
  const emailWhitelist = "ggarcia@theovationnetwork.com pogarcia@theovationnetwork.com jalbright@theovationnetwork.com".split(" ")

  return (
    <>
      <Head>
        <title>OvationNetwork Admin Signin</title>
        <meta name="description" content="Admin App for ON IA Portal Dynamic Content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#5f5f5f]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-[hsl(195,100%,71%)] sm:text-[5rem]">
            Who&apos;s signing in?
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {/* CONTENT FOR LINKS TO THE PUBLIC LINK FOR OVATION PAGES */}
          </div>
          <div className="flex flex-col items-center gap-2">
            
            <AuthShowcase emailWhitelist={emailWhitelist}/>
          </div>
        </div>
      </main>
    </>
  );
}

function AuthShowcase({ emailWhitelist }: { emailWhitelist: string[]}) {
  const router = useRouter();
  const { data: sessionData } = useSession();

  if (sessionData?.user) {
    // redirect to admin page
    router.push("/admin");
  }

  const signInWithEmail = async (email: string) => {
    return signIn("email", { email });
  };


  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <div className="grid grid-cols-2"></div>
    </div>
  );
}
