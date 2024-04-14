"use client";
import ButtonClose from "@/components/button-close";
import Loader from "@/components/loader";
import { useMachine, useMachineId, useMachineMutation } from "@/lib/api/services/machines";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { DEFAULT_LIMIT } from "@/utils/constants";
import { isUUID } from "@/utils/id";
import { NumParams } from "@/utils/params";
import { removeKeysFromQuery } from "@/utils/quey";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { formSchema } from "./constants";

const FormProducts = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const hasUUid = isUUID(id);
  const pathname = usePathname();
  const url = `${pathname}?${searchParams}`;
  const axiosAuth = useAxiosAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      id: undefined,
    },
  });
  const { register, control, setValue } = form;
  const { isSubmitting, errors } = form.formState;
  const queryClient = useQueryClient();
  const { isSuccess: hasMachineForm, data: machineForm } = useMachineId(id);

  useEffect(() => {
    if (hasMachineForm && machineForm.id === id) {
      const data = machineForm;
      setValue("name", data.name);
      setValue("id", data.id);
      setValue("type", data.type);
    }
  }, [id, hasMachineForm, machineForm, setValue]);
  let pagination = {
    page: NumParams(searchParams.get("page"), 1),
    count: 1,
    limit: NumParams(searchParams.get("limit"), DEFAULT_LIMIT),
    search: searchParams.get("search") || undefined,
  };

  const { isFetching: isLoading } = useMachine(pagination);
  const clearForm = () => {
    form.reset();
    if (!id) return;

    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["id"],
    });
    router.push(`${newUrl}`, { scroll: false });
  };
  const mutate = useMachineMutation(() => clearForm());
  const { isPending: isSubmittingForm, mutate: sendMutate } = mutate;

  const sendMutation = async (values: z.infer<typeof formSchema>) => {
    const res = sendMutate({
      ...values,
    });
  };

  return (
    <>
      <ButtonClose classNameButton="top-2" onClick={() => clearForm()} />
      <form
        onSubmit={form.handleSubmit(sendMutation)}
        className="rounded-lg border w-full  px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 pb-4"
        data-test="form-machine"
      >
        <TextField
          data-test="name-form"
          className="border-1 border-r-emerald-400 col-span-6 "
          {...register("name", {
            required: "Nome é obrigatorio",
          })}
          disabled={isLoading || isSubmitting}
          error={!!errors.name}
          helperText={!!errors.name?.message}
          value={form.watch("name") || ""}
          label="Nome da maquina"
          type="text"
          variant="outlined"
        />
        <TextField
          disabled={isLoading || isSubmitting}
          data-test="type-form"
          className="border-1 border-r-emerald-400 col-span-4 "
          {...register("type", {
            required: "Tipo é obrigatorio",
          })}
          error={!!errors.name}
          helperText={!!errors.name?.message}
          value={form.watch("type") || ""}
          label="Tipo"
          type="text"
          variant="outlined"
        />

        <Button
          variant="outlined"
          type="submit"
          className="col-span-12 md:col-span-2 w-full py-4  mt-auto mb-auto"
          disabled={isLoading || isSubmittingForm}
        >
          {isSubmitting ? "..." : ""}
          {hasUUid && form.getValues("id") === id ? "atualizar " : "criar"}
        </Button>
      </form>
      {isSubmitting && (
        <>
          <div className="p-8 rounded-lg w-full flex item-center justify-center bg-muted">
            <Loader />
          </div>
        </>
      )}
    </>
  );
};

export default FormProducts;

/* <FormControl
          fullWidth
          className="border-1 border-r-emerald-400 col-span-4 md:col-span-2 min-w-[80px]"
        >
          <InputLabel id="type-machine-label">Tipo</InputLabel>
          <Select
            labelId="type-machine-label"
            id="type-machine"
            value={form.watch("type") || ""}
            defaultValue={""}
            label="Tipo"
            onChange={(event: SelectChangeEvent) => {
              const value = event.target.value;
              form.setValue("type", event.target.value as string);
            }}
          >
            <MenuItem value={"Pneumatic"}>RT-40</MenuItem>
            <MenuItem value={"Rotation"}>RT-41</MenuItem>
            <MenuItem value={"Fluid"}>RT-42</MenuItem>
          </Select>
        </FormControl> */
