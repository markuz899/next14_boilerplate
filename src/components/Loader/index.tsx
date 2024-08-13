import styled from "styled-components";

const Loader = () => {
  return (
    <LoadStyle>
      <div className="loader"></div>
    </LoadStyle>
  );
};

export default Loader;

const LoadStyle = styled.div`
  z-index: 1099;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100svh;
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  .loader {
    border: 10px solid #f3f3f3;
    border-top: 10px solid #3498db;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
