import { getFormatDate } from "@/utils/dates/dates";
import { maskCurrency, maskValueToKValue } from "@/utils/mask/values";
import { Document, PDFDownloadLink, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { IFees } from "../../utils/interafce/fees";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontSize: 13,
    lineHeight: 1.5,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingVertical: 5,
  },
  rowCreated: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingRight: 35,
    paddingTop: 10,
  },
  col: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 4,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: 1,
  },
  text: {
    display: "flex",
    width: "100%",
    textAlign: "right",
  },
  viewer: {},
  rowDetails: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingRight: 35,
    paddingTop: 7,
  },
  pageDownload: {
    padding: 35,
    paddingTop: 40,
    backgroundColor: "#fff",
    fontSize: 12,
    lineHeight: 1.5,
  },
  image: {
    paddingVertical: 10,
    height: 200,
    width: 200,
  },
  Divider: {
    height: 1,
    border: 1,
    borderStyle: "dotted",
    width: "100%",
  },
  textImage: {
    // borderColor: "#64748b",
    // borderWidth: 5,
    height: 100,
    width: 200,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 110,
    textAlign: "center",
    paddingBotton: 10,
  },
});

export const MyDocPDFDownload = ({ data }: { data: IFees }) => {
  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text>Numero do Cliente </Text>
          <Text>{data.nClient}</Text>
        </View>
        <View style={styles.col}></View>
        <View style={styles.col}>
          <Text>Mês de referencia</Text>
          <Text> {getFormatDate(data.referenceDate)}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text>Energia Elétrica </Text>
          <Text>{maskValueToKValue(String(data.energiaEletricaWh))}</Text>
        </View>
        <View style={styles.col}>
          <Text>Energia Injetada </Text>
          <Text>{maskValueToKValue(String(data.energiaInjetadaWh))}</Text>
        </View>
        <View style={styles.col}>
          <Text>Energia Compensada </Text>
          <Text>{maskValueToKValue(String(data.energiaCompensadaWh))}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text>Energia Elétrica </Text>
          <Text>{maskCurrency(String(data.energiaEletricaPrice))}</Text>
        </View>
        <View style={styles.col}>
          <Text>Energia Injetada </Text>
          <Text>{maskCurrency(String(data.energiaInjetadaPrice))}</Text>
        </View>
        <View style={styles.col}>
          <Text>Energia Compensada </Text>
          <Text>{maskCurrency(String(data.energiaCompensadaPrice))}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text>Total </Text>
          <Text>{` ${maskCurrency(data.total)}`}</Text>
        </View>
        <View style={styles.col}></View>
        <View style={styles.col}>
          <Text>Contribuição Publica </Text>
          <Text>{maskCurrency(String(data.contribPublic))}</Text>
        </View>
      </View>
      <View style={styles.Divider}></View>
      <View style={styles.rowDetails}>
        <Text style={styles.text}>Fatura criada em {getFormatDate(data.created_at)}</Text>
      </View>
      <View style={styles.rowDetails}>
        <Text style={styles.text}>Código da fatura {data.id}</Text>
      </View>
    </View>
  );
};
// children ? ({ blob, url, loading, error }) => loading && "Loading document..." :
function DownloadPdf({ name, data }: { name: string; data: IFees }) {
  return (
    <div className="App">
      {data && (
        <div>
          <PDFDownloadLink
            document={
              <Document>
                <Page wrap>
                  <View wrap={false}>
                    <MyDocPDFDownload data={data} />
                  </View>
                </Page>
              </Document>
            }
            fileName="somename.pdf"
          >
            {({ blob, url, loading, error }) => (loading ? "Loading document..." : error ? "error: " : "Download now!")}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}

export default DownloadPdf;
