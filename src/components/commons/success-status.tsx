import { CorrectIcon } from "@src/components/commons/icons";
import classNames from "classnames";

type Props = {
  className?: string;
};

export default function SuccessStatus({ className }: Props) {
  return (
    <div
      className={classNames(
        className,
        " border-4 border-white shadow  bg-green-500 w-[100px] h-[100px] rounded-full flex justify-center items-center text-4xl font-black text-white"
      )}
    >
      <CorrectIcon width={40} fill="white" />
    </div>
  );
}
