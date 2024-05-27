"use client";
import ButtonClear from "@/components/button-clear";
import DatePickerOpenTo from "@/components/calendar";
import Loader from "@/components/loader";
import PDFModal from "@/components/modal/fees-modal";
import { formSearchFeesSchema } from "@/forms/fees";
import { useDebounce } from "@/hooks/useDebounce";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { DEFAULT_LIMIT } from "@/utils/constants";
import { isUUID } from "@/utils/id";
import { maskOnlyNumbers } from "@/utils/mask/values";
import { NumParams, StringParams, StringParamsCheck } from "@/utils/params";
import { formUrlQueries } from "@/utils/quey";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormControl, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useFees } from "../../../lib/api/services/fees";
import { monthCompleteStringList } from "../../../utils/dates/moths";

const FormSearch = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const hasUUid = isUUID(id);
  const pathname = usePathname();
  const url = `${pathname}?${searchParams}`;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const param = StringParams(searchParams.get("date"));
  const myDate = param ? new Date("02-" + param) : null;
  const pagination = {
    page: NumParams(searchParams.get("page"), 1),
    count: 1,
    limit: NumParams(searchParams.get("limit"), DEFAULT_LIMIT),
    nClient: StringParams(searchParams.get("nClient")),
    // months: StringParamsCheck(searchParams.get("mes"), "todos", [...monthCompleteStringList]) as string,
    months: StringParamsCheck(searchParams.get("mes"), "todos", [...monthCompleteStringList]) as string,
    date: myDate,
  };

  const form = useForm<z.infer<typeof formSearchFeesSchema>>({
    resolver: zodResolver(formSearchFeesSchema),
    defaultValues: {
      nClient: pagination.nClient,
      months: pagination.months,
      date: pagination.date,
      // id: undefined,
    },
  });
  const { register, control, formState, setValue } = form;
  const { isSubmitting, errors } = formState;
  const debouncedNCLient = useDebounce<string>(form.watch("nClient"), 400);
  const debouncedDate = useDebounce<string>(form.watch("date"), 200);

  const handleEditUrlArray = useCallback(
    async ({ valuesEdit }: { valuesEdit: { key: string; param: string }[] }) => {
      const modify = valuesEdit.map((elem) => ({
        key: elem.key,
        value: elem.param,
      }));
      console.log(modify);
      const newUrl = formUrlQueries({
        params: searchParams.toString(),
        values: [{ key: "page", value: "1" }, ...modify],
      });
      router.push(newUrl, { scroll: false });
    },
    [searchParams, router]
  );

  useEffect(() => {
    let values: { key: string; param: string }[] = [];
    if (pagination.nClient !== debouncedNCLient) {
      values.push({ key: "nClient", param: form.watch("nClient") });
    }
    if (pagination.date !== form.watch("date")) {
      console.log(form.watch("date"));
      const param = form.watch("date");
      const ifHasDate = param ? new Date(param) : null;
      const yearQuery = ifHasDate ? ifHasDate.getFullYear() : null;
      const monthQuery = ifHasDate ? ifHasDate.getMonth() : null;
      ifHasDate && form.watch("date") && values.push({ key: "date", param: `${Number(monthQuery) + 1}-${yearQuery}` });
      !ifHasDate && values.push({ key: "date", param: "" });
    }
    if (values && values.length > 0) handleEditUrlArray({ valuesEdit: values });
  }, [
    debouncedNCLient,
    debouncedDate,
    form,
    handleEditUrlArray,
    pagination.nClient,
    pagination.months,
    debouncedDate,
    pagination.date,
  ]);

  const { data: pointsResponse, isFetching: isLoading } = useFees(pagination);

  return (
    <>
      <PDFModal update={false} openModal={openModal} closeModal={() => setOpenModal(false)} />
      <ButtonClear
        data-test="button-clear-points"
        classNameButton="top-2"
        onClick={() => {
          if (!id) {
            setValue("date", null);
            form.reset();
            return;
          }
        }}
      />

      <form className="rounded-lg border w-full  px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 pb-4">
        <TextField
          className="border-1 border-r-emerald-400 col-span-6 md:col-span-5  "
          {...register("nClient", {
            required: "Numero do cliente é obrigatorio",
          })}
          onChange={(e) => setValue("nClient", maskOnlyNumbers(e.target.value))}
          data-test="nClient-id"
          disabled={isLoading}
          error={!!errors.nClient}
          helperText={!!errors.nClient?.message}
          value={form.watch("nClient") || ""}
          label="Numero do cliente"
          type="text"
          variant="outlined"
        />

        <FormControl
          fullWidth
          className="border-1 border-r-emerald-400 col-span-6  md:col-span-5 min-w-[150px]"
          data-test="months-modal-id"
        >
          <DatePickerOpenTo value={form.watch("date") || null} setValue={(value) => setValue("date", value)} />
         
        </FormControl>

        <Button
          variant="outlined"
          data-test="button-new-fees-id"
          type="button"
          className="col-span-12 md:col-span-2 w-full py-4  mt-auto mb-auto"
          disabled={isSubmitting || isLoading}
          onClick={() => setOpenModal(true)}
        >
          {isSubmitting ? "..." : ""}
          Novo
        </Button>
      </form>
      {isSubmitting && (
        <div className="p-8 rounded-lg w-full flex item-center justify-center bg-muted">
          <Loader />
        </div>
      )}
    </>
  );
};

export default FormSearch;
