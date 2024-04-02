import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleApiError = async (errorMessage: string, error: AxiosError | Error) => {
  console.error(error);
  toast.remove();
  toast.error(errorMessage);
};
