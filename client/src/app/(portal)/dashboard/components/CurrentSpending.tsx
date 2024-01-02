import Image from 'next/image';

interface Props {
  data: {
    currMonthSpending: number;
    percentChange: number;
  };
}

export default function CurrentSpending({ data }: Props) {
  const renderTriangle = () => {
    if (data.percentChange < 0) {
      return '/triangleDown.svg';
    } else {
      return '/triangleUp.svg';
    }
  };

  return (
    <>
      <div className="flex flex-none flex-col gap-3 p-5">
        <h2 className="text-2xl">Current spending</h2>
        <div className="text-4xl font-medium">${data.currMonthSpending}</div>
        <div className="flex gap-2">
          <Image
            src={renderTriangle()}
            width={20}
            height={20}
            alt={'triangle up icon'}
            className="h-auto w-auto"
          />
          <div className="text-xl">{data.percentChange}%</div>
        </div>
      </div>
      <div className="h-4/5 w-full flex-grow self-end">
        {/* MONTHLY BART CHART */}
      </div>
    </>
  );
}
