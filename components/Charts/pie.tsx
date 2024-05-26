"use client";
import { cn } from "@/lib/utils";
import { Skeleton, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import Empty from "../empty";

interface IData {
  id: number;
  value: number;
  label: string;
}
export default function ChartPie({
  className,
  data,
  isLoading,
}: {
  className: string;
  data: IData[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className={cn("flex flex-col min-w-[400px]  ml-8 mb-4", className)}>
        <Skeleton variant="rectangular" width={200} height={200} />
      </div>
    );
  }
  const empty = !data || data.length === 0;

  return (
    <div className={cn("flex flex-col min-w-[400px]  ", className)}>
      <Typography color="text.primary" className=" ml-4 text-center mb-2">
        Dados gerais econômia da sua energia de sua
      </Typography>
      {empty ? (
        <Empty label="Sem dados" image />
      ) : (
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          height={200}
        />
      )}
    </div>
  );
}


