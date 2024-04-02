import { axiosAuth } from "@/lib/axios";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { IMachine } from "@/utils/interafce/points";
import { IPaginationRequest } from "@/utils/types.d";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useMachine<T>(pagination: IPaginationRequest) {
  const axiosAuth = useAxiosAuth();
  const Machine = useQuery({
    queryKey: [
      "machines",
      {
        page: pagination.page,
        limit: pagination.limit,
        keepPreviousData: true,
        type: "list",
      },
    ],
    queryFn: async ({}) => {
      const res = await axiosAuth.get(`machines/?page=${pagination.page}&limit=${pagination.limit}`);

      const data = res.data;

      return data;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    // enabled: true,
  });
  // if (Machine && Machine.isError) {
  //   console.error(Machine.error);
  //   toast.error("Erro ao carregar maquinas");

  //   // HandleErrorModal({connectionError:Machine.n});
  // }
  // if (Machine && Machine.isPaused) {
  //   console.error(Machine.error);
  //   toast.error("offline");
  // }
  return Machine;
}
export function useMachineId<T>(id: string | null) {
  const axiosAuth = useAxiosAuth();
  const Machine = useQuery({
    queryKey: ["machines", { id }],
    queryFn: async ({}) => {
      if (!id) return true;
      const res = await axiosAuth.get(`machines/${id}`);
      const data = res.data;
      return data;
    },
    // enabled: true,
  });

  return Machine;
}
export function useMachineMutation<T>(reset = () => {}) {
  // const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: IMachine) => {
      const update = values.id;
      const toastId = toast.loading(update ? "Atualizando maquina" : "Criando maquina");
      const req = update
        ? await axiosAuth.put(`/machines/${values.id}`, {
            ...values,
          })
        : await axiosAuth.post(`/machines`, {
            ...values,
          });
      toast.success(`maquina ${update ? "atualizado" : "cadastrado"} com sucesso`, {
        id: toastId,
      });

      return { ...req, update, toastId };
    },
    onSuccess: async (data) => {
      reset();
      await queryClient.invalidateQueries({
        queryKey: ["machines", { type: "list" }],
      });
      toast.remove(data.toastId);
      return true;
    },
    onError: (error) => {
      console.log(error);
      toast.remove();
      toast.error("Erro ao cadastrar maquina");
    },
  });
}
