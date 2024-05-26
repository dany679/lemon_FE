"use client";

// import { statesList } from "@/app/(dashboard)/points/constants";
import { handleApiError } from "@/lib/api/erros";
import { deleteFees } from "@/lib/api/services/fees";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { cn } from "@/lib/utils";
import { DEFAULT_LIMIT } from "@/utils/constants";
import { getFormatDate } from "@/utils/dates/dates";
import { isUUID } from "@/utils/id";
import { IFeesList } from "@/utils/interafce/fees";
import { maskCurrency, maskValueToKValue } from "@/utils/mask/values";
import { NumParams, StringParams } from "@/utils/params";
import { formUrlQuery, removeKeysFromQuery } from "@/utils/quey";
import { IPagination } from "@/utils/types";
import EditIcon from "@mui/icons-material/Edit";
import FileDownload from "@mui/icons-material/FileDownload";
import { Button, Skeleton, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useIsFetching, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import PDFModalRender from "../download/pdf-modal";
import Empty from "../empty";
import ActionDeleteModal from "../modal/delete";
import PDFModal from "../modal/fees-modal";
import PaginationPage from "../pagination-page";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableFees = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const hasId = isUUID(id);
  const [openModal, setOpenModal] = useState(hasId);
  const [pdfMOdal, setPdfModal] = useState<string | null>(null);
  const pathname = usePathname();
  const pagination = {
    page: NumParams(searchParams.get("page"), 1),
    count: 1,
    limit: NumParams(searchParams.get("limit"), DEFAULT_LIMIT),
    months: StringParams(searchParams.get("mes")),
    nClient: StringParams(searchParams.get("nClient")),
  };
  const param = StringParams(searchParams.get("date"));
  const myDate = param ? new Date("02-" + param) : null;
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  const keyQuery = [
    "fees",
    {
      date: myDate,
      nClient: pagination.nClient,
      page: pagination.page,
      limit: pagination.limit,
      keepPreviousData: true,
      type: "list",
    },
  ];
  const cache = queryClient.getQueryData<any>(keyQuery);
  const fees = cache?.fees || [];
  const data = fees as IFeesList;
  const dataLength = data?.length || 0;
  const lastPagination = cache?.pagination as IPagination;
  const isFetching = useIsFetching({ queryKey: keyQuery });
  const searching = !!isFetching 
  const cleanAfterRemove = useCallback(async () => {
    if (dataLength === 1 && pagination.page > 1) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "page",
        value: ` ${pagination.page - 1}`,
      });
      router.push(newUrl, { scroll: false });
      return;
    }
    await queryClient.invalidateQueries({
      queryKey: ["fees", { type: "list" }],
    });
  }, [queryClient, dataLength, searchParams, pagination.page, router]);

  const { mutate: deletePoint } = useMutation({
    mutationFn: async (idMutate: string) => await deleteFees(idMutate),
    onSuccess: async (data) => {
      cleanAfterRemove();
      return true;
    },
    onError: (error) => {
      handleApiError("Erro ao deletar fatura", error);
    },
  });

  const handleEditUrl = async (idFees: string, clean = true) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: idFees,
    });
    router.push(`${newUrl}`, { scroll: false });
    setOpenModal(clean);
  };

  return (
    <>
      <PDFModal
        update={true}
        openModal={openModal && hasId}
        closeModal={() => {
          setOpenModal(false);
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["id"],
          });
          router.push(`${newUrl}`, { scroll: false });
        }}
      />
      <PDFModalRender open={!!pdfMOdal && pdfMOdal !== ""} id={pdfMOdal} closeModal={() => setPdfModal(null)} />
      <div className="h-full px-6 ">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {/* <StyledTableCell>Index</StyledTableCell> */}
                <StyledTableCell align="left">Index</StyledTableCell>
                <StyledTableCell align="left">NClient</StyledTableCell>
                <StyledTableCell align="left">Khw Compensada</StyledTableCell>
                <StyledTableCell align="left">Valor Injetado</StyledTableCell>
                <StyledTableCell align="left">Total </StyledTableCell>
                <StyledTableCell align="left">Data</StyledTableCell>
                <StyledTableCell align="right">Ações</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!searching &&
                data &&
                data.length > 0 &&
                data.map((row, index) => (
                  <StyledTableRow
                    data-test={`row-point-${index}`}
                    key={row.id}
                    className={cn("cursor-pointer hover:bg-sky-200", id === row.id && "bg-yellow-200")}
                  >
                    <StyledTableCell component="th" scope="row">
                      {(pagination.page - 1) * 5 + index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.nClient}</StyledTableCell>
                    <StyledTableCell align="left">{maskValueToKValue(`${row.energiaCompensadaWh}`)}</StyledTableCell>
                    <StyledTableCell align="left">{maskCurrency(row.energiaInjetadaPrice)}</StyledTableCell>
                    {/* <StyledTableCell align="left">{maskCurrency(row.energiaEletricaPrice)}</StyledTableCell> */}
                    <StyledTableCell align="left">{maskCurrency(row.total)}</StyledTableCell>
                    <StyledTableCell align="left">{getFormatDate(row.referenceDate)}</StyledTableCell>
                    <StyledTableCell align="right">
                      <div className="flex flex-row items-center ">
                        <hr />

                        <Button type="button">
                          <Tooltip
                            title="Download"
                            data-test={`download-row-${index}`}
                            onClick={() => setPdfModal(row.id)}
                          >
                            <FileDownload htmlColor="black" />
                          </Tooltip>
                        </Button>
                        <Button onClick={() => handleEditUrl(row.id)} type="button">
                          <Tooltip title="Editar" onClick={() => handleEditUrl(row.id)} data-test={`edit-row-${index}`}>
                            <EditIcon htmlColor="black" />
                          </Tooltip>
                        </Button>
                        <ActionDeleteModal
                          title="Deseja deletar esse ponto de acesso"
                          onConfirm={() => deletePoint(row.id)}
                        />
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {searching &&
          Array.from(Array(5), (_, i) => (
            <Skeleton data-test={`skeleton-row-fees-${i}`} key={i} variant="rectangular" height={60} className="mt-2" />
          ))}
        {!searching && data && data.length === 0 && <Empty label={"Nenhuma Conta cadastrada"} />}
      </div>
      <div className="flex flex-col px-6 mt-0 ">
        <PaginationPage page={pagination.page} count={lastPagination?.count} limit={pagination.limit} />
      </div>
    </>
  );
};

export default TableFees;
