import { useEffect, useState } from "react";

interface IUseKentico {
  entity: string;
}

const useKentico = ({ entity }: IUseKentico) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getKenticoData = async () => {
      try {
        const data = ""; // rest service pass "entity"
        setData(data);
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };

    getKenticoData();
  }, []);

  return {
    data,
    loading,
    error,
  };
};

export default useKentico;
