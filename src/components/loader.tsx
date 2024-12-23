import { PuffLoader } from "react-spinners";
interface ILoader {
  color?: string;
}
export default function Loader({ color }: ILoader) {
  return (
    <PuffLoader
      color={color ?? "white"}
      loading={true}
      // cssOverride={override}
      size={15}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
