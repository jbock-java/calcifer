import { FC } from "react";

interface Parameters {
  month: string;
}

const Month: FC<Parameters> = ({ month }) => {
  return (
    <h1 className="text-3xl font-bold underline">
      {month}
    </h1>
  )
}

export { Month };
