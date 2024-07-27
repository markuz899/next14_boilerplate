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
  resolvedUrl: string;
  params: { slug: string[] };
}) {
  const { slug } = ctx.params;
  const path = ctx.resolvedUrl;

  // const routes = [
  //   { path: "/", sections: [], shield: false },
  //   { path: "/contact", sections: [], shield: false },
  //   { path: "/dinamic/contact", sections: [], shield: false },
  //   { path: "/user/profile", sections: [], shield: false },
  // ];

  // const route = routes.find((route) => route.path === path);

  // if (!route) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      pageName: slug,
    },
  };
}

export default WithAuth(React.memo(Slug));
