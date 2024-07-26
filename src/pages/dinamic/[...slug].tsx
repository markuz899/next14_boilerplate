import { GlobalPageProps } from "@/utils/interface";
import { WithAuth } from "@/hoc";
import Layout from "@/containers/Layout";
import React from "react";

interface DinamicProps extends GlobalPageProps {
  pageName?: string[];
}

const Slug = ({ global, pageName }: DinamicProps) => {
  return (
    <Layout global={global} title="Homepage">
      SLUG{" "}
      {pageName?.map((el: any) => (
        <div key={el}>{el}</div>
      ))}
    </Layout>
  );
};

export async function getServerSideProps(ctx: {
  req: any;
  params: { slug: string[] };
}) {
  const { slug } = ctx.params;

  console.log(slug);
  return {
    props: {
      pageName: slug,
    },
  };
}

export default WithAuth(React.memo(Slug));
