import theme from "@/theme";
import styled from "styled-components";

export const columns = [
  {
    Header: "",
    accessor: "hcode",
    Cell: (props: any) => {
      const { row } = props;
      const { original } = row;
      return <Row>{original.hcode}</Row>;
    },
  },
  {
    Header: "LU",
    accessor: "lu",
    Cell: ({ row }: any) => {
      const { original } = row;
      var dt = new Date().toISOString();
      return <Row>OK</Row>;
    },
  },
  {
    Header: "MA",
    accessor: "ma",
    Cell: ({ row }: any) => {
      const { original } = row;
      var dt = new Date().toISOString();
      return <Row>OK</Row>;
    },
  },
  {
    Header: "ME",
    accessor: "me",
    Cell: ({ row }: any) => {
      const { original } = row;
      var dt = new Date().toISOString();
      return <Row>OK</Row>;
    },
  },
  {
    Header: "GI",
    accessor: "gi",
    Cell: ({ row }: any) => {
      const { original } = row;
      var dt = new Date().toISOString();
      return <Row>OK</Row>;
    },
  },
  {
    Header: "VE",
    accessor: "ve",
    Cell: ({ row }: any) => {
      const { original } = row;
      var dt = new Date().toISOString();
      return <Row>OK</Row>;
    },
  },
  {
    Header: "SA",
    accessor: "sa",
    Cell: ({ row }: any) => {
      const { original } = row;
      var dt = new Date().toISOString();
      return <Row>OK</Row>;
    },
  },
  {
    Header: "DO",
    accessor: "do",
    Cell: ({ row }: any) => {
      const { original } = row;
      var dt = new Date().toISOString();
      return <Row>OK</Row>;
    },
  },
];

const Row = styled.div<{ $hovered?: boolean }>`
  font-size: ${theme.font.size.small};
  color: ${theme.colors.dark};
  &:hover {
    color: ${(p) => (p.$hovered ? "white" : "inherit")};
  }
  .text {
    display: flex;
    align-items: center;
    font-size: ${theme.font.size.small};
  }
  .round {
    width: ${theme.spaces.space3};
    height: ${theme.spaces.space3};
    border-radius: 50%;
    &.warning {
      background: ${theme.colors.warning};
    }
    &.success {
      background: ${theme.colors.success};
    }
    &.error {
      background: ${theme.colors.error};
    }
  }
  &.flex {
    display: flex;
    align-items: center;
    .tags {
      margin-right: ${theme.spaces.space2};
    }
  }
`;
