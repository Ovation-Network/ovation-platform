import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";
// import Link from "next/link";


export default function SignIn() {

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
            
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
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
      <h1 className="text-lg mx-auto">WHO&apos;S SIGNING IN?</h1>
      <div className="grid grid-cols-2 space-x-3">
        {/* BUTTONS AS SIGN INS */}
        <button
          onClick={async () => await signInWithEmail('aarcila@theovationnetwork.com')}
          className="p-4 text-2xl font-bold text-white bg-[#3b5998] rounded-lg"
        >
          ALEX
        </button>
        <button
          onClick={() => signInWithEmail('ggarcia@theovationnetwork.com')}
          className="p-4 text-2xl font-bold text-white bg-[#3b5998] rounded-lg"
        >
          VON
        </button>
        <button
          onClick={() => signInWithEmail('jalbright@theovationnetwork.com')}
          className="p-4 text-2xl font-bold text-white bg-[#3b5998] rounded-lg"
        >
          JORDAN
        </button>
        <button
          onClick={() => signInWithEmail('pogarcia@theovationnetwork.com')}
          className="p-4 text-2xl font-bold text-white bg-[#3b5998] rounded-lg"
        >
          POLO
        </button>
      </div>
    </div>
  );
}
