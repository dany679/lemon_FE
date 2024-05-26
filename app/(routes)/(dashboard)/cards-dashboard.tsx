"use client";

import ChartBard, { ChartBartSkeleton } from "@/components/Charts/bar";
import ChartCard from "@/components/Charts/cards";
import ChartPie from "@/components/Charts/pie";
import Empty from "@/components/empty";
import { useDashboardFees } from "@/lib/api/services/fees";
import { ListDaum } from "@/utils/interafce/fees";
import { maskCurrency, maskValueToKValue } from "@/utils/mask/values";
import { Typography } from "@mui/material";
export default function CardsDasboard() {
  const { data: dashboardData, isFetching: isLoading } = useDashboardFees();
  const places = dashboardData?.places;
  const valuesData = dashboardData?.valuesData?.[0]?._sum;
  const myPieNotpProhibited = ["total", "energiaCompensadaPrice"];
  const dataPie = valuesData
    ? Object.entries(valuesData)
        .filter((item) => myPieNotpProhibited.some((canGo) => canGo.includes(item[0])))
        .map((item, index) => {
          const labels = item[0] === "total" ? "Total" : "Econômia";
          return { label: labels, value: item[1], id: index };
        })
    : [];

  const listData = dashboardData?.listData;
  console.log(dataPie);
  console.log(valuesData);
  let lastNClient: null | string = null;
  let order = new Map();

  listData &&
    listData.length > 0 &&
    listData.map((item) => {
      if (!listData || lastNClient !== item.nClient) {
        order.set(item.nClient, [item]);
        lastNClient = item.nClient;
      } else {
        const data2 = order.get(item.nClient);
        order.set(item.nClient, [...data2, item]);
      }
    });

  let mapIter = order.entries();

  return (
    <article className="mx-6 mt-8  flex flex-col ">
      <div className=" flex flex-col  ">
        <div className="flex flex-row w-full ">
          {/* //cards */}
          <div className="grid grid-cols-1  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5  gap-2  w-full sm:w-fit mb-4 h-fit">
            <ChartCard type="local" value={`${places || "Sem dados"}`} isLoading={isLoading} />
            <ChartCard
              isLoading={isLoading}
              type="lightEconomic"
              value={`${
                valuesData?.energiaInjetadaWh ? maskValueToKValue(String(valuesData?.energiaInjetadaWh)) : "Sem dados"
              }`}
            />
            <ChartCard
              isLoading={isLoading}
              type="light"
              value={`${
                valuesData?.energiaCompensadaWh
                  ? maskValueToKValue(String(valuesData?.energiaCompensadaWh))
                  : "Sem dados"
              }`}
            />
            <ChartCard
              isLoading={isLoading}
              type="moneyEconomic"
              value={`${
                valuesData?.energiaCompensadaWh ? maskCurrency(valuesData?.energiaCompensadaPrice) : "Sem dados"
              }`}
            />
            <ChartCard
              isLoading={isLoading}
              type="total"
              value={`${valuesData?.energiaInjetadaPrice ? maskCurrency(valuesData?.total) : "Sem dados"}`}
            />
          </div>
          <ChartPie className="hidden xl:flex" data={dataPie} isLoading={isLoading} />
        </div>
        <div className="flex flex-col items-start justify-start mb-4  xl:relative top-[-130px] ">
          <div className="flex flex-col  xl:hidden">
            <ChartPie className=" items-start justify-start " data={dataPie} isLoading={isLoading} />
          </div>
          <div className="fle flex-col">
            <Typography> Os dados abaixo mostra os valores dos ulitmos meses de seu uso</Typography>
            {isLoading && <ChartBartSkeleton />}
            {!order || order.size === 0 || !listData || (listData.length === 0 && <Empty label="Sem dados" image />)}
            {!isLoading &&
              order &&
              order.size > 1 &&
              Array.from(Array(order.size), (_, i) => {
                const dataGrafic = mapIter.next().value;
                const findkey = dataGrafic?.[0];
                const listData = dataGrafic?.[1] as ListDaum[];
                return (
                  <div key={i} className="my-4">
                    <Typography className="text-semi-bold"> Número do cliente {findkey}</Typography>{" "}
                    <ChartBard data={listData} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </article>
  );
}
