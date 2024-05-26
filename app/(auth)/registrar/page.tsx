"use client";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
// import { useToast } from "@/components/ui/use-toast";
// import { ToastAction } from "@/components/ui/toast";
import { signIn } from "next-auth/react";

import { Heading } from "@/components/Heading";
// import { FormControl } from "@/components/ui/form";
import InputPassword from "@/components/inputs/password";
import axios from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { formSchema } from "./constants";

export default function UserRegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);
  const onSubmitting = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/auth/signup`, {
        ...values,
        provider: "EMAIL",
      });
      const res = await signIn<"credentials">("credentials", {
        ...values,
        redirect: false,
      });
      if (res?.ok) router.push("/");
      form.reset();
    } catch (error: any) {
      console.log(error);
      // if (error?.response?.status === 409)
      setError(error?.response?.data?.message || "Error creating account");
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });
  const { register, control } = form;
  const { isSubmitting, errors } = form.formState;

  return (
    <div className={cn("flex flex-col w-full m-10 max-w-md gap-4")}>
      <Heading.title title="Registre-se" description="Crie sua conta ou faca login" />
      <Box>
        <form onSubmit={form.handleSubmit(onSubmitting)}>
          <Stack spacing={2} className="border-2 border-red-500/900  ">
            <TextField
              className="border-1 border-r-emerald-400"
              {...register("name", {
                required: "Nome é obrigatorio",
              })}
              error={!!errors.name}
              helperText={!!errors.name?.message}
              label="Nome"
              type="text"
              variant="outlined"
            />
            <TextField
              className="border-1 border-r-emerald-400"
              {...register("email", {
                required: "Email é obrigatorio",
              })}
              error={!!errors.email}
              helperText={!!errors.email?.message}
              label="Email"
              type="email"
              variant="outlined"
            />
            <InputPassword name="password" register={register} error={errors.password} />
            {error && (
              <Typography className="bg-red-100 text-red-500 rounded" px={1} py={1}>
                {error}
              </Typography>
            )}
            <Button type="submit" disabled={isSubmitting} variant="contained" className="col-span-12  w-full  mt-4  ">
              {isSubmitting ? (
                <Box sx={{ width: "100%", py: 1 }}>
                  <LinearProgress />
                </Box>
              ) : (
                " Criar conta"
              )}
            </Button>
          </Stack>
        </form>
      </Box>
      <Stack direction="row" width={"100%"} justifyContent="flex-end" mt={2}>
        <Typography mr={1}>Já possui conta?</Typography>
        <Link href="/login">
          <Typography color="blue">Login</Typography>
        </Link>
      </Stack>
    </div>
  );
}
