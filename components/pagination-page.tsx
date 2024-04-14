"use client";
import { NumParams } from "@/utils/params";
import { formUrlQuery } from "@/utils/quey";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
export default function PaginationPage({
  page = 1,
  count,
  limit = 0,
}: {
  page?: number;
  count: number;
  limit?: number;
}) {
  const [receiveNumber, setUpdateCount] = useState<number>(() => {
    if (count) return count;
    else return 1;
  });
  const lastCount = useMemo(() => {
    if (!count) return receiveNumber;
    // save the last count if is pending
    setUpdateCount(() => count);
    return count;
  }, [count, receiveNumber]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasPage = !!searchParams.get("page");
  const urlPage = NumParams(searchParams.get("page"), 1);
  let url = `${pathname}?${searchParams}`;

  const newPage = (change: number) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: `${urlPage + change}`,
    });
    router.push(newUrl, { scroll: false });
  };

  const totalPages = Math.ceil(lastCount / limit);

  return (
    <div className="flex flex-row w-full justify-center items-center text-gray-500">
      <ArrowBackIosNewIcon className="text-sm  text-center cursor-pointer" onClick={() => page >= 2 && newPage(-1)} />
      <h5 className="text-md  text-center bold mx-3">
        Page {page || 1} / {totalPages || 1}
      </h5>
      <ArrowForwardIosIcon
        className="text-sm  text-center cursor-pointer"
        onClick={() => totalPages > page && newPage(+1)}
      />
    </div>
  );
}
