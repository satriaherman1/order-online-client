import classNames from "classnames";

type Props = {
  className?: string;
};

export default function WarningIcon({ className }: Props) {
  return (
    <div
      className={classNames(
        className,
        " border-4 border-white shadow  bg-amber-500 w-[100px] h-[100px] rounded-full flex justify-center items-center text-4xl font-black text-white"
      )}
    >
      !
    </div>
  );
}
