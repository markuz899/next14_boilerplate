import dynamic from "next/dynamic";

const Loader = dynamic(() => import("./Loader"));

export { Loader };
