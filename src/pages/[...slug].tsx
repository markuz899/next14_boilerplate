import { GlobalPageProps } from "@/utils/interface";
import { WithAuth } from "@/hoc";
import Layout from "@/containers/Layout";
import React from "react";

interface DinamicProps extends GlobalPageProps {
  pageName?: string[];
  infoPage?: any;
}

const Slug = ({ global, pageName, infoPage }: DinamicProps) => {
  return (
    <Layout global={global} title="Homepage">
      SLUG{" "}
      {pageName?.map((el: any) => (
        <div key={el}>{el}</div>
      ))}
      {infoPage.sections?.map((sec: any) => (
        <div key={sec.sectionName}>{sec.sectionName}</div>
      ))}
    </Layout>
  );
};

export async function getServerSideProps(ctx: {
  req: any;
  resolvedUrl: string;
  params: { slug: string[] };
}) {
  const { req, params } = ctx;
  const { slug } = params;
  const path = ctx.resolvedUrl;
  const infoPage = req.headers["route"];
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
      infoPage: infoPage ? JSON.parse(infoPage) : {},
    },
  };
}

export default WithAuth(React.memo(Slug));
