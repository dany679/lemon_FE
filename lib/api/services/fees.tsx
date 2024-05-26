import { axiosAuth } from "@/lib/axios";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { findMonthByString } from "@/utils/dates/moths";
import { IPaginationFees } from "@/utils/types.d";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IDashboardFees } from "../../../utils/interafce/fees";

export function useFees<T>(pagination: IPaginationFees) {
  const axiosAuth = useAxiosAuth();
  const fessList = useQuery({
    queryKey: [
      "fees",
      {
        nClient: pagination.nClient,
        page: pagination.page,
        date: pagination.date,
        limit: pagination.limit,
        keepPreviousData: true,
        type: "list",
      },
    ],
    queryFn: async () => {
      console.log(pagination.date);
      const thisDate = pagination.date ? pagination.date.toLocaleString() : "";
      const thisMonth = findMonthByString(pagination.months) > -1 ? findMonthByString(pagination.months) : "";
      const { data } = await axiosAuth.get(
        `/fees?page=${pagination.page}&limit=${pagination.limit}&NClient=${pagination.nClient}&date=${thisDate}`
      );
      return data;
    },
    placeholderData: keepPreviousData,
    // enabled: true,
  });
  return fessList;
}
export function useFeesById<T>(id: string | null, open: boolean = false) {
  const axiosAuth = useAxiosAuth();
  const Fees = useQuery({
    queryKey: ["fees", { id, open }],
    queryFn: async () => {
      if (!id) {
        return false;
      }
      const { data } = await axiosAuth.get(`/fees/${id}`);

      return data;
    },

    enabled: true,
  });

  return Fees;
}
export function useDashboardFees<T>() {
  const axiosAuth = useAxiosAuth();
  const Fees = useQuery({
    retry: 2,
    queryKey: ["dashboard"],
    queryFn: async () => {
      const { data } = await axiosAuth.get(`/fees/dashboard`);

      return data as IDashboardFees;
    },

    enabled: true,
  });

  return Fees;
}

export const deleteFees = async (id: string) => {
  // const axiosAuth = useAxiosAuth();
  const toastId = toast.loading("Deletando fatura de acesso");
  const req = await axiosAuth.delete(`/fees/${id}`);
  toast.success(`fatura deletada com sucesso`, {
    id: toastId,
  });
  return { ...req, toastId };
};
export function useDeleteFeesMutation<T>() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const toastId = toast.loading("Deletando conta de acesso");
      const req = await axiosAuth.delete(`/fees/${id}`);
      toast.success(`Conta de acesso deletado com sucesso`, {
        id: toastId,
      });
      return { ...req, toastId };
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["fees", { type: "list" }],
      });
      toast.remove(data.toastId);
      return true;
    },
    onError: (error) => {
      console.log(error);
      toast.remove();
      toast.error("Erro ao deletar ponto de acesso");
    },
  });
}
