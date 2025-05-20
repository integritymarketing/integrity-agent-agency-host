import { atom, useAtom } from "jotai";

const hostTestCount = atom(0);

const useCount = () => useAtom(hostTestCount);

export default useCount;