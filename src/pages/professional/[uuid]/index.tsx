import { GlobalPageProps } from "@/utils/interface";
import { WithAuth } from "@/hoc";
import Layout from "@/containers/Layout";
import React, { useEffect, useRef, useState } from "react";
import { Column, ContentDetail } from "@/theme/styled";
import styled from "styled-components";
import theme from "@/theme";
import { useBreakpoints } from "@/hooks";
import { useRouter } from "next/router";
import { specialist } from "@/utils/constants";
import { Button, Dropdown, Icon, Map, Markers, Rating } from "@/components";

const ProfessionalDetail = ({ global, query }: GlobalPageProps) => {
  const { isSmall } = useBreakpoints();
  const router = useRouter();
  const { uuid } = router.query;
  const refMap = useRef<HTMLDivElement | null>(null);
  const [userInfo, setUserInfo] = useState(
    specialist.find((el: any) => el.id == uuid)
  );

  useEffect(() => {}, []);

  const scrollToMap = () => {
    if (refMap.current) {
      refMap.current.scrollIntoView({ behavior: "smooth" }); // Scrolla in modo fluido
    }
  };

  const renderTarget = ({ show, close, visible }: any) => {
    const handleShow = () => {
      if (visible) return close();
      if (!visible) return show();
    };
    return (
      <Button kind={visible ? "action" : "ghost"} onClick={handleShow}>
        <Icon name="threePoint" size={theme.spaces.space4} />
      </Button>
    );
  };

  const renderDropdown = ({ show, close, visible }: any) => {
    return (
      <RenderDrop>
        <p className="signal">Segnala {userInfo?.name}</p>
      </RenderDrop>
    );
  };

  return (
    <Layout global={global} title="Dettaglio">
      <ContentDetail>
        <StyledDetail>
          <div className="content-detail">
            <Column cols={35}>
              <div className="content-left">
                <div className="content-img">
                  <img
                    src={`https://i.pravatar.cc/150?img=${uuid}`}
                    alt="image profile"
                  />
                </div>
              </div>
            </Column>
            <Column cols={60}>
              <div className="content-info">
                <SectionStyle>
                  <div className="row justify margin">
                    <p className="bold">
                      {userInfo?.name} <span>({userInfo?.rating})</span>
                    </p>
                    <Rating
                      className="rating"
                      rate={userInfo?.rating}
                      size={theme.spaces.space4}
                      disable
                    />
                  </div>
                  <div className="row start">
                    <div className="action">
                      <Button kind="primary">SELEZIONA</Button>
                      <Button kind="ghost" onClick={scrollToMap}>
                        <Icon name="pin-map-fill" size={theme.spaces.space4} />
                      </Button>
                      <Button kind="ghost">
                        <Icon name="share" size={theme.spaces.space4} />
                      </Button>
                      <Dropdown
                        fullWidth={false}
                        includeTarget={true}
                        showArrow={false}
                        renderTarget={renderTarget}
                        renderDropdown={renderDropdown}
                      />
                    </div>
                  </div>
                </SectionStyle>
                <Section
                  icon="user-manual"
                  title={`Ciao! Sono ${userInfo?.name}`}
                  content={`Laboris dolor sint esse sit tempor tempor pariatur ea laborum velit.
        Sint non nulla pariatur eu. Ea magna est proident cupidatat consequat do
        velit deserunt labore exercitation eiusmod sint dolore ad. Sunt elit
        deserunt reprehenderit ut cupidatat est anim eiusmod do aute adipisicing
        reprehenderit. Qui irure consequat occaecat laboris reprehenderit
        exercitation id. Laborum aliqua culpa in do adipisicing. Amet consequat
        ea eu enim adipisicing nulla qui eu dolore quis. Laboris adipisicing
        aliqua ea esse sit eu. Fugiat veniam culpa aliquip sit. Aute non veniam
        culpa ad et consectetur eiusmod nisi. Eu nostrud laborum dolor nulla
        minim et magna cupidatat et consequat. Esse minim irure duis dolore
        fugiat. Sint cupidatat ipsum officia sunt qui culpa officia. Aute dolor
        sint deserunt tempor est. Ad duis pariatur eiusmod sint ea fugiat. Enim
        et et reprehenderit culpa eiusmod.`}
                />
                <Section
                  icon="folder-document"
                  title={"Esperienza"}
                  content="Esperienza da > 5 anni"
                />
                <Section icon="paste" title={"Competenze"}>
                  <ul>
                    <li>Teoria Musicale</li>
                    <li>Capacità di Improvvisazione</li>
                    <li>Orecchio Musicale</li>
                  </ul>
                </Section>
                <Section
                  reference={refMap}
                  icon="pin-map-fill"
                  title={`La posizione di ${userInfo?.name} ${
                    userInfo?.range ? `(Range: ${userInfo?.range}km)` : ""
                  }`}
                >
                  <Map
                    gestureHandling
                    height={"450px"}
                    zoom={13}
                    center={userInfo?.position}
                  >
                    <Markers
                      disabled
                      selected={userInfo}
                      isSmall={isSmall}
                      options={[userInfo]}
                    />
                  </Map>
                </Section>
              </div>
            </Column>
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

const Section = ({ reference, icon, title, content, children }: any) => {
  useEffect(() => {}, []);
  return (
    <SectionStyle ref={reference}>
      <div className="title">
        {icon && (
          <Icon
            name={icon}
            size={theme.spaces.space5}
            color={theme.colors.dark}
            margin="0 10px 0 0"
          />
        )}
        {title}
      </div>
      <div className="content">{content || children}</div>
    </SectionStyle>
  );
};

const StyledDetail = styled.div`
  .content-detail {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .content-left {
      width: 100%;
      .content-img {
        width: 100%;
        overflow: hidden;
        img {
          border-radius: ${theme.extra.radiusRound};
          width: 100%;
          max-width: 500px;
          object-fit: cover;
        }
      }
    }
    .content-info {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    .content-detail {
      padding: 0 ${theme.spaces.space4} ${theme.spaces.space4};
      .content-img {
        width: 100%;
        margin-top: ${theme.spaces.space4};
        margin-bottom: ${theme.spaces.space4};
        img {
          max-width: 300px;
        }
      }
      .content-info {
        margin-top: 0;
      }
    }
  }
`;

const SectionStyle = styled.section`
  padding: ${theme.spaces.space4} 0;
  border-bottom: 2px solid ${theme.colors.greyIcon};
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
  }
  .row {
    display: flex;
    align-items: center;
    text-align: left;
    p {
      color: ${({ theme }) => theme.text};
      font-size: ${theme.font.size.large};
    }
    .rating {
      gap: ${theme.spaces.space1};
    }
    &.margin {
      margin-bottom: ${theme.spaces.space4};
    }
    &.start {
      justify-content: flex-start;
    }
    &.justify {
      justify-content: space-between;
    }
    &.center {
      margin-bottom: 0;
      justify-content: center;
    }
    .action {
      display: flex;
      align-items: center;
      gap: ${theme.spaces.space4};
      button {
        padding: 0 ${theme.spaces.space2};
        &:first-child {
          padding: 0 ${theme.spaces.space4};
        }
      }
      .target {
        button {
          padding: 0 ${theme.spaces.space2};
        }
      }
    }
  }
  .title {
    font-size: ${theme.font.size.large};
    font-weight: bold;
    margin-bottom: ${theme.spaces.space2};
  }
  .content {
    font-size: ${theme.font.size.normal};
  }
`;

const RenderDrop = styled.div`
  padding: ${theme.spaces.space4};
  .signal {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
