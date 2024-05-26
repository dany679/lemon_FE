import { formSchemaFees } from "@/forms/fees";
import { useFeesById } from "@/lib/api/services/fees";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { cn } from "@/lib/utils";
import { basicValuesFees } from "@/utils/convert/payments";
import { findMonthByString } from "@/utils/dates/moths";
import { isUUID } from "@/utils/id";
import {
  defaultBRLReal,
  defaultKWh,
  maskCurrency,
  maskOnlyNumbers,
  maskRealBRL,
  maskValueToKValue,
  unMaskMoneyToNumber,
  unMaskToInt,
  unMaskValueToNumber,
} from "@/utils/mask/values";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import { FormControl, Skeleton, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";
import { z } from "zod";
import { convertStringNumber } from "../../utils/convert/stringNumber";
import ButtonClear from "../button-clear";
import { DatePickerChoseDate } from "../calendar";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 500,
  bgcolor: "background.paper",
  border: "1px solid transparent ",
  boxShadow: 24,
  p: 4,
  borderRadius: "4px",
};

type Props = {
  update: boolean;
  openModal?: boolean;
  closeModal?: () => void;
  children?: ReactNode;
  title?: string;
  onConfirm?: () => void;
};

type MachineProps = {
  id: string;
  name: string;
  type: string;
};

export default function PDFModal({ children, update, openModal = false, closeModal = () => {} }: Props) {
  const axiosAuth = useAxiosAuth();
  const searchParams = useSearchParams();
  const findID = searchParams.get("id");
  const id = isUUID(findID) ? findID : null;

  const queryClient = useQueryClient();
  const callback = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["access_points", { type: "list" }],
    });
  };

  const [fileName, setFileName] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchemaFees>>({
    resolver: zodResolver(formSchemaFees),
    defaultValues: {
      nClient: "",
      energiaCompensadaKwh: defaultKWh,
      energiaCompensadaPrice: defaultBRLReal,
      energiaInjetadaKwh: defaultKWh,
      energiaInjetadaPrice: defaultBRLReal,
      energiaEletricaKwh: defaultKWh,
      energiaEletricaPrice: defaultBRLReal,
      contribPublic: defaultBRLReal,
      total: defaultBRLReal,
      id: undefined,
    },
  });
  const { register, reset, setValue, control } = form;
  const { isSubmitting, errors } = form.formState;

  const { isSuccess, data, isError, isFetching: isLoading } = useFeesById(id, openModal);
  useEffect(() => {
    if (!isSuccess) return;
    if (!id) {
      reset();
      setFileName(null);
      return;
    } else if (data?.id === id) {
      setValue("nClient", data.nClient);
      setValue("referenceDate", data.referenceDate);
      setValue("total", maskCurrency(data.total));
      setValue("energiaCompensadaKwh", maskValueToKValue(String(data.energiaCompensadaWh)));
      setValue("energiaCompensadaPrice", maskCurrency(data.energiaCompensadaPrice));
      setValue("energiaEletricaKwh", maskValueToKValue(String(data.energiaEletricaWh)));
      setValue("energiaEletricaPrice", maskCurrency(data.energiaEletricaPrice));
      setValue("energiaInjetadaKwh", maskValueToKValue(String(data.energiaEletricaWh)));
      setValue("energiaInjetadaPrice", maskCurrency(data.energiaInjetadaPrice));
      setValue("contribPublic", maskCurrency(data.contribPublic));
      setValue("id", maskCurrency(data.id));
    }
    if (isError) {
      closeModal();
    }

    return () => {
      reset();
      setFileName(null);
    };
  }, [id, data, reset, isSuccess, setValue, closeModal, isError]);

  const onSubmitting = async (values: z.infer<typeof formSchemaFees>) => {
    console.log(unMaskValueToNumber(values.energiaCompensadaPrice), "----------================-----------------");
    // return;

    const toastId = toast.loading("Salvando...");
    try {
      const update = values.id || id;
      const req = update
        ? await axiosAuth.put(`/fees/${id}`, {
            nClient: values.nClient,
            energiaEletricaWh: unMaskToInt(values.energiaEletricaKwh),
            energiaEletricaPrice: unMaskMoneyToNumber(values.energiaEletricaPrice),
            energiaInjetadaWh: unMaskToInt(values.energiaInjetadaKwh),
            energiaInjetadaPrice: unMaskMoneyToNumber(values.energiaInjetadaPrice),
            energiaCompensadaWh: unMaskToInt(values.energiaCompensadaKwh),
            energiaCompensadaPrice: unMaskMoneyToNumber(values.energiaCompensadaPrice),
            contribPublic: unMaskMoneyToNumber(values.contribPublic),
            total: unMaskMoneyToNumber(values.total),
            referenceDate: values.referenceDate,
          })
        : await axiosAuth.post(`/fees`, {
            nClient: values.nClient,
            energiaEletricaWh: unMaskToInt(values.energiaEletricaKwh),
            energiaEletricaPrice: unMaskMoneyToNumber(values.energiaEletricaPrice),
            energiaInjetadaWh: unMaskToInt(values.energiaInjetadaKwh),
            energiaInjetadaPrice: unMaskMoneyToNumber(values.energiaInjetadaPrice),
            energiaCompensadaWh: unMaskToInt(values.energiaCompensadaKwh),
            energiaCompensadaPrice: unMaskMoneyToNumber(values.energiaCompensadaPrice),
            contribPublic: unMaskMoneyToNumber(values.contribPublic),
            total: unMaskMoneyToNumber(values.total),
            referenceDate: values.referenceDate,
          });
      // removeUUI();
      toast.success(`Conta ${update ? "atualizada" : "cadastrado"} com sucesso`, {
        id: toastId,
        duration: 5000,
      });
      await queryClient.invalidateQueries({
        queryKey: ["fees", { type: "list" }],
      });
      callback();
    } catch (error: any) {
      toast.error(`Erro ao ${update ? "atualizar" : "cadastrar"} conta`, {
        id: toastId,
      });
    } finally {
      closeModal();
    }
  };

  async function extractText(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      event.preventDefault();
      if (!event.target.files) {
        console.log("not found");
        return;
      }
      const file = event.target.files[0];
      // console.log(file, "file---------");
      event.preventDefault();
      if (!file) {
        console.log("not found file");
        return;
      }
      setFileName(() => file.name);
      const PDFFile = await pdfToText(file);
      const textExtract = PDFFile.split("Energia Elétrica")?.[1];
      const findPrinciPalData = PDFFile.split("Referente a   Vencimento   Valor a pagar (R$)");
      const hasNumClient = PDFFile.split("Nº DO CLIENTE")?.[1] || null;
      const splitValues = textExtract.split(/kWh /gi);
      if (!textExtract || !findPrinciPalData || !hasNumClient || !splitValues) {
        toast.error("Erro ao ler dados");
        return;
      }
      const hasUserNumber = hasNumClient
        ?.split("Nº DA INSTALAÇÃO")?.[1]
        ?.split(" ")
        ?.filter((item: any) => item !== "")?.[1];
      const userNumber = hasUserNumber && !isNaN(Number(hasUserNumber)) ? Number(hasUserNumber) : null;
      const date = findPrinciPalData[1].split(" ").filter((item: string) => item !== "")[0];
      const enjElec = PDFFile.split("Energia Elétrica")?.[1]?.split(/kWh /gi)?.[1]?.split(" ");
      const enjInj = PDFFile.split("Energia injetada")?.[1]?.split(/kWh /gi)?.[1]?.split(" ");
      const enjComp = PDFFile.split("En comp. s/ ICMS")?.[1]?.split(/kWh /gi)?.[1]?.split(" ");

      const moth = date.split("/")[0];
      const year = date.split("/")[1];
      const findMonth = findMonthByString(moth);
      const createDate = new Date(year, findMonth, 2);
      createDate && setValue("referenceDate", createDate);
      const publicValueAndTotal = splitValues[3]
        .split("Contrib Ilum Publica Municipal ")[1]
        .split(" ")
        .filter((item: string) => item !== "");
      const publicValue =
        publicValueAndTotal && Number(convertStringNumber(publicValueAndTotal[0])) ? publicValueAndTotal[0] : "0";
      const total =
        publicValueAndTotal && Number(convertStringNumber(publicValueAndTotal[2])) ? publicValueAndTotal[2] : "0";

      if (!splitValues) {
        toast.error("Erro ao ler dados");
        return;
      }
      const fees = {
        energiaEletrica: basicValuesFees(enjElec),
        energiaInjetada: basicValuesFees(enjInj),
        energiaCompensada: basicValuesFees(enjComp),
        contribuicaoPublica: publicValue ? convertStringNumber(publicValue) : 0,
        total: total ? convertStringNumber(total) : 0,
      };
      setValue("energiaCompensadaKwh", maskValueToKValue(String(fees.energiaCompensada.qnt)));
      setValue("energiaCompensadaPrice", maskCurrency(fees.energiaCompensada.price));
      setValue("energiaEletricaKwh", maskValueToKValue(String(fees.energiaEletrica.qnt)));
      setValue("energiaEletricaPrice", maskCurrency(fees.energiaEletrica.price));
      setValue("energiaInjetadaKwh", maskValueToKValue(String(fees.energiaInjetada.qnt)));
      setValue("energiaInjetadaPrice", maskCurrency(fees.energiaInjetada.price));
      setValue("nClient", String(userNumber));
      setValue("total", maskCurrency(fees.total));
      setValue("contribPublic", maskCurrency(fees.contribuicaoPublica));
    } catch (error) {
      setFileName(null);
      toast.error("Erro ao ler dados");
    }
  }
  return (
    <>
      {children && children}
      <Modal
        className=" border-radius"
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-[80%]  min-w-[350px] max-w-[820px] ">
          <Stack
            sx={{
              justifyContent: "space-between",
              flexDirection: "row",
              flexGrow: 1,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Preencha as informações para {update ? "atualizar" : "criar uma nova"} fatura
            </Typography>
            <div className="absolute top-2 right-0">
              <Button type="button" onClick={closeModal}>
                <CloseIcon htmlColor="black" />
              </Button>
            </div>
          </Stack>
          {!update && (
            <ButtonClear
              classNameButton="top-2"
              onClick={() => {
                form.reset();
                setFileName(null);
              }}
            />
          )}

          {isLoading ? (
            <Skeleton variant="rectangular" height={30} data-test="skeleton-modal-fees" />
          ) : (
            <form
              {...form}
              onSubmit={form.handleSubmit(onSubmitting)}
              className={cn(
                "rounded-lg border w-full  focus-within:shadow-sm grid grid-cols-12 gap-3",
                update && "pt-4 "
              )}
            >
              <div className="col-span-12 mb-4">
                <input
                  data-test="file-input"
                  style={{ display: "none" }}
                  id="contained-button-file"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => extractText(e)}
                  value={""} //keep reset case not like remove and the default weel be perfect
                />
                <div className="flex">
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                      Ler fatura
                    </Button>
                  </label>
                  <p className="ml-2 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                    {fileName || ""}
                  </p>
                </div>
                <p className="ml-1 mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                  Somente PDF
                </p>
              </div>
              <TextField
                className="border-1 border-r-emerald-400 col-span-6 "
                data-test="nCLient"
                {...register("nClient", {
                  required: "Numero do cliente é obrigatorio",
                })}
                onChange={(e) => setValue("nClient", maskOnlyNumbers(e.target.value))}
                disabled={isLoading}
                error={!!errors.nClient}
                helperText={!!errors.nClient?.message}
                value={form.watch("nClient") || ""}
                label="Numero do Cliente"
                type="text"
                variant="outlined"
              />
              <FormControl
                fullWidth
                className="border-1 border-r-emerald-400 col-span-6 min-w-[80px]"
                data-test="input-form-date"
              >
                <DatePickerChoseDate
                  value={form.watch("referenceDate") || null}
                  setValue={(value) => setValue("referenceDate", value)}
                  control={control}
                />
              </FormControl>
              <TextField
                data-test="energiaEletricaPrice"
                className="border-1 border-r-emerald-400 col-span-6 "
                {...register("energiaEletricaPrice", {
                  required: "Numero do cliente é obrigatorio",
                })}
                onChange={(e) => {
                  setValue("energiaEletricaPrice", maskRealBRL(e.target.value));
                }}
                disabled={isLoading}
                error={!!errors.energiaEletricaPrice}
                helperText={!!errors?.energiaEletricaPrice?.message}
                value={form.watch("energiaEletricaPrice") || ""}
                label="Valor da energia Eletrica"
                type="text"
                variant="outlined"
              />
              <TextField
                data-test="energiaEletricaKwh"
                className="border-1 border-r-emerald-400 col-span-6 "
                {...register("energiaEletricaKwh")}
                onChange={(e) => {
                  setValue("energiaEletricaKwh", maskValueToKValue(e.target.value));
                }}
                disabled={isLoading}
                error={!!errors.energiaEletricaKwh}
                helperText={!!errors?.energiaEletricaKwh?.message}
                value={form.watch("energiaEletricaKwh") || ""}
                label="KWH da energia Eletrica"
                type="text"
                variant="outlined"
              />
              <TextField
                className="border-1 border-r-emerald-400 col-span-6 "
                {...register("energiaCompensadaPrice")}
                onChange={(e) => {
                  setValue("energiaCompensadaPrice", maskRealBRL(e.target.value));
                }}
                data-test="energiaCompensadaPrice"
                disabled={isLoading}
                error={!!errors.energiaCompensadaPrice}
                helperText={!!errors?.energiaCompensadaPrice?.message}
                value={form.watch("energiaCompensadaPrice") || ""}
                label="Valor da energia Compensada"
                type="text"
                variant="outlined"
              />
              <TextField
                className="border-1 border-r-emerald-400 col-span-6 "
                {...register("energiaCompensadaKwh")}
                onChange={(e) => {
                  setValue("energiaCompensadaKwh", maskValueToKValue(e.target.value));
                }}
                data-test="energiaCompensadaKwh"
                disabled={isLoading}
                error={!!errors.energiaCompensadaKwh}
                helperText={!!errors?.energiaCompensadaKwh?.message}
                value={form.watch("energiaCompensadaKwh") || ""}
                label="KWH da energia Compensada"
                type="text"
                variant="outlined"
              />
              <TextField
                className="border-1 border-r-emerald-400 col-span-6 "
                {...register("energiaInjetadaPrice")}
                onChange={(e) => {
                  setValue("energiaInjetadaPrice", maskRealBRL(e.target.value));
                }}
                data-test="energiaInjetadaPrice"
                disabled={isLoading}
                error={!!errors.energiaInjetadaPrice}
                helperText={!!errors?.energiaInjetadaPrice?.message}
                value={form.watch("energiaInjetadaPrice") || ""}
                label="Valor da energia Injetada"
                type="text"
                variant="outlined"
              />
              <TextField
                className="border-1 border-r-emerald-400 col-span-6 "
                {...register("energiaInjetadaKwh")}
                onChange={(e) => {
                  setValue("energiaInjetadaKwh", maskValueToKValue(e.target.value));
                }}
                data-test="energiaInjetadaKwh"
                disabled={isLoading}
                error={!!errors.energiaInjetadaKwh}
                helperText={!!errors?.energiaInjetadaKwh?.message}
                value={form.watch("energiaInjetadaKwh") || ""}
                label="KWH da energia Injetada"
                type="text"
                variant="outlined"
              />

              <TextField
                className="border-1 border-r-emerald-400 col-span-6 "
                {...register("contribPublic")}
                onChange={(e) => {
                  setValue("contribPublic", maskRealBRL(e.target.value));
                }}
                data-test="contribPublic"
                disabled={isLoading}
                error={!!errors.contribPublic}
                helperText={!!errors?.contribPublic?.message}
                value={form.watch("contribPublic") || ""}
                label="Contribuição Publica"
                type="text"
                variant="outlined"
              />
              <TextField
                className="border-1 border-r-emerald-400 col-span-6 "
                // InputProps={{ disableUnderline: true }}
                {...register("total")}
                onChange={(e) => {
                  setValue("total", maskRealBRL(e.target.value));
                }}
                data-test="total"
                disabled={isLoading}
                error={!!errors.total}
                helperText={!!errors?.total?.message}
                value={form.watch("total") || ""}
                label="Total"
                type="text"
                variant="outlined"
              />
              <Stack className="col-span-12 pt-1" direction="row-reverse">
                <Button
                  variant="contained"
                  type="submit"
                  color="success"
                  disabled={isSubmitting}
                  data-test="form-fees-button"
                  onClick={form.handleSubmit(onSubmitting)}
                >
                  Enviar
                </Button>
                <Button variant="contained" color="inherit" className="mx-2" onClick={closeModal}>
                  Cancelar
                </Button>
              </Stack>
            </form>
          )}
        </Box>
      </Modal>
    </>
  );
}
