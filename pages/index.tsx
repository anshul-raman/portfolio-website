import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <main className="flex flex-col justify-center content-center min-h-screen p-3 ">
      {/* Man center div */}
      <div className="  max-w-2xl mx-auto ">
        <h1 className="font-mono text-2xl">Hi!, I&apos;m Anshul.</h1>
        <h2 className="font-mono text-xl">I&apos;m a full stack developer.</h2>
        <div className="mt-2">
          <Link href={"/blogs"}>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <p className="font-mono">Read Blog</p>
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
