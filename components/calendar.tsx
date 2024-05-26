import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import localePtBr from "dayjs/locale/pt-br";
import { Controller } from "react-hook-form";

export default function DatePickerOpenTo({ value, setValue }: { value: Date | null; setValue: (data: Dayjs) => any }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={localePtBr.name}>
      <DatePicker
        data-testid="input-date-search"
        minDate={dayjs(new Date("01/05/2000"))}
        maxDate={dayjs(new Date())}
        label={"Mes de referencia"}
        openTo="year"
        views={["year", "month"]}
        value={value ? dayjs(new Date(value)) : null}
        onChange={(newValue) => {
          const valueSend = newValue as Dayjs;
          setValue(valueSend);
        }}
      />
    </LocalizationProvider>
  );
}
export function DatePickerChoseDate({
  value,
  setValue,
  control,
}: {
  value: Date | null;
  setValue: (data: Dayjs | Date) => any;
  control: any;
}) {
  return (
    <Controller
      control={control}
      name="date"
      rules={{ required: "Opening time is required" }}
      render={({ field: { onBlur, name, ref }, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={localePtBr.name}   data-test="input-date-form">
            <DatePicker
            
              sx={
                error && !value
                  ? {
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#b71c1c",
                        },
                        "&:hover fieldset": {
                          borderColor: "#b71c1c",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#b71c1c",
                        },
                        "& input": { color: "#b71c1c" },
                        "& label": { color: "#b71c1c" },
                      },
                      "&& label": { color: "#b71c1c" },
                      "& label": { color: "#b71c1c" },
                    }
                  : {}
              }
              ref={ref}
              label={"Mes de referencia"}
              openTo="year"
              views={["year", "month"]}
              minDate={dayjs(new Date("01/05/2000"))}
              maxDate={dayjs(new Date())}
              value={value ? dayjs(new Date(value)) : null}
              onChange={(newValue) => {
                const valueSend = newValue as Dayjs;
                setValue(valueSend);
              }}
            />
          </LocalizationProvider>
        </>
      )}
    />
  );
}
