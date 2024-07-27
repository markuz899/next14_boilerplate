import Image from "next/image";
import Link from "next/link";
import { GlobalPageProps } from "@/utils/interface";
import { WithAuth } from "@/hoc";
import Counter from "@/utils/redux/example";
import Layout from "@/containers/Layout";
import React from "react";

const Home = ({ global }: GlobalPageProps) => {
  return (
    <Layout global={global} title="Homepage">
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <Counter />
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-100 bg-gray-800 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4">
            Get started by editing&nbsp;
            <code className="font-mono font-bold">src/pages/index.tsx</code>
          </p>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className="dark:invert"
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <Link href={"/login"}>
            <h2 className={`mb-3 text-2xl font-semibold`}>Login</h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Test fake login service
            </p>
          </Link>

          <Link href={"/hoc"}>
            <h2 className={`mb-3 text-2xl font-semibold`}>Hoc</h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              List of enabled Hoc
            </p>
          </Link>

          <Link href={"/hoc"}>
            <h2 className={`mb-3 text-2xl font-semibold`}>Hooks</h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              List of Hooks
            </p>
          </Link>

          <Link href={"/hoc"}>
            <h2 className={`mb-3 text-2xl font-semibold`}>Theme</h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Docs of theme
            </p>
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export async function getServerSideProps(ctx: { req: any }) {
  // const delay = (s: number) => new Promise((resolve) => setTimeout(resolve, s));
  // await delay(2000);
  const { req } = ctx;
  // console.log(req.custom);
  // const customVariable = req.headers["x-custom-variable"];
  // console.log(req.user);
  console.log("page", req);
  return {
    props: {},
  };
}

export default WithAuth(React.memo(Home));
