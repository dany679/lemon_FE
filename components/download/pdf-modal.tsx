import { useFeesById } from "@/lib/api/services/fees";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { getFormatDate } from "@/utils/dates/dates";
import { isUUID } from "@/utils/id";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Button, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Document, Image, Page, pdf, Text, View } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { IFees } from "../../utils/interafce/fees";
import { MyDocPDFDownload, styles } from "./pdf";

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
  open?: boolean;
  closeModal?: () => void;
  children?: ReactNode;
  id: string | null;
};

export default function PDFModalRender({ children, id, open = false, closeModal = () => {} }: Props) {
  const axiosAuth = useAxiosAuth();
  const searchParams = useSearchParams();
  const isUUid = isUUID(id) ? id : null;
  const { isSuccess, data: fees, isError, isFetching: isLoading } = useFeesById(id, open);

  const Download = ({ values }: { values: IFees }) => {
    const handleDownload = async () => {
      const blob = await pdf(
        <Document>
          <Page size="A4" style={styles.pageDownload}>
            <View style={styles.container}>
              <Image style={styles.image} src={"./lumi_logo.jpeg"} alt={"Logo lumi"} />
              <Text style={styles.textImage}>Lumi </Text>
            </View>
            <MyDocPDFDownload data={values as IFees} />
          </Page>
        </Document>
      ).toBlob();
      saveAs(blob, `fatura ${values.nClient}  -  ${getFormatDate(values.referenceDate)} .pdf`);
    };

    return (
      <Button className="mt-4" onClick={handleDownload}>
        Download
      </Button>
    );
  };

  return (
    <>
      {children && children}
      <Modal
        className=" border-radius"
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-[80%]  min-w-[350px] max-w-[820px] ">
          <Stack
            sx={{
              justifyContent: "space-between",
              padding: 2,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2" className="mh-2">
              Resumo da Fatura
            </Typography>
            <div className="absolute top-2 right-0">
              <Button type="button" onClick={closeModal}>
                <CloseIcon htmlColor="black" />
              </Button>
            </div>
            {isError ? (
              <Alert>Erro ao carregar fatura</Alert>
            ) : isLoading ? (
              "Carregando..."
            ) : fees && fees.id && fees.id === id ? (
              <>
                <Document style={styles.page}>
                  <Page size="A4" style={styles.page}>
                    <MyDocPDFDownload data={fees as IFees} />
                  </Page>
                </Document>
                <Download values={fees as IFees} />
              </>
            ) : null}
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
