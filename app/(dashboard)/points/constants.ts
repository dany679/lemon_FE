import * as z from "zod";
export const sensorsList = ["TcAg", "TcAs", "HF+"];
export const sensorIn = ["TcAg", "TcAs", "HF+", " "] as const;
export const sensorInSend = ["TcAg", "TcAs", "HF+"] as const;
export type sensorTypeSend = "TcAg" | "TcAs" | "HF+";
export type sensorT = "TcAg" | "TcAs" | "HF+" | " ";
export const formSearchSchema = z.object({
  name: z.string().optional(),
  sensor: z.enum(sensorIn),
  sensorID: z.string().optional(),
  id: z
    .string()
    .min(1, {
      message: " id obrigatorio",
    })
    .optional(),
});

export const formSchemaPoint = z.object({
  name: z.string().min(3, {
    message: " nome obrigatorio",
  }),
  machineId: z.string(),
  // .min(28, {
  //   message: " Id da maquina é obrigatorio",
  // })
  // .max(28)
  sensor: z.enum(sensorInSend),
  sensorID: z.string().min(3, {
    message: " nome obrigatorio",
  }),
  id: z
    .string()
    .min(1, {
      message: " id obrigatorio",
    })
    .optional(),
});
