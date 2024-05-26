"use client";

import { findMonthByDate } from "@/utils/dates/moths";
import { ListDaum } from "@/utils/interafce/fees";
import { maskCurrency } from "@/utils/mask/values";
import { Skeleton } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

import { axisClasses } from "@mui/x-charts/ChartsAxis";

const chartSetting = {
  yAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  // width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

export default function ChartBard({ data }: { data: ListDaum[] }) {
  return (
    <div className="flex w-full ">
      <BarChart
        className="w-fit max-w-[180px] min-w-[180px] md:max-w-[360px] lg:max-w-[450px]"
        dataset={data as []}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "referenceDate",
            valueFormatter: (month) => `${findMonthByDate(month)}`,
          },
        ]}
        series={[
          { dataKey: "total", label: "Valor pago", valueFormatter: (value) => maskCurrency(value) },
          { dataKey: "energiaCompensadaPrice", label: "Econômia:", valueFormatter: (value) => maskCurrency(value) },
          // { dataKey: "energiaEletricaPrice", label: "Compensada", valueFormatter },
        ]}
        margin={{ top: 30, bottom: 30, left: 40, right: 10 }}
        {...chartSetting}
      />
    </div>
  );
}

export const ChartBartSkeleton = () => (
  <Skeleton className="w-full max-w-[180px] min-w-[180px] md:max-w-[360px] lg:max-w-[450px] h-10 lg:h-20 " />
);
