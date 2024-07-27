import { GlobalPageProps } from "@/utils/interface";
import { WithAuth } from "@/hoc";
import Counter from "@/utils/redux/example";
import Layout from "@/containers/Layout";
import React from "react";

const Home = ({ global, info }: GlobalPageProps) => {
  return (
    <Layout global={global} title="Homepage">
      <main>
        <Counter />
        {info.sections?.map((sec: any) => (
          <div key={sec.sectionName}>{sec.sectionName}</div>
        ))}
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
  const info = req.headers["route"];
  return {
    props: { info: JSON.parse(info) },
  };
}

export default WithAuth(React.memo(Home));
