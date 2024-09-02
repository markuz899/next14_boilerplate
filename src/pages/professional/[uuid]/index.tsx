import { GlobalPageProps } from "@/utils/interface";
import { WithAuth } from "@/hoc";
import Layout from "@/containers/Layout";
import React, { useEffect, useState } from "react";
import { Column, ContentDetail, StyledDetail } from "@/theme/styled";
import styled from "styled-components";
import theme from "@/theme";
import { useBreakpoints } from "@/hooks";
import { useRouter } from "next/router";

const ProfessionalDetail = ({ global, query }: GlobalPageProps) => {
  const router = useRouter();
  const { isSmall } = useBreakpoints();
  const { uuid } = router.query;

  return (
    <Layout global={global} title="Homepage" footer={false}>
      <ContentDetail>
        <h2>Titolo pagina</h2>
        <StyledDetail>
          <div className="content-detail">
            <Column cols={30}>dettaglio {uuid}</Column>
            <Column cols={70}>dettaglio {uuid}</Column>
          </div>
        </StyledDetail>
      </ContentDetail>
    </Layout>
  );
};

export async function getServerSideProps(ctx: { req: any; query: any }) {
  // const delay = (s: number) => new Promise((resolve) => setTimeout(resolve, s));
  // await delay(2000);
  const { req, query } = ctx;
  // const customVariable = req.headers["x-custom-variable"];
  return {
    props: { query },
  };
}

export default WithAuth(React.memo(ProfessionalDetail));
