import { Document, Page, Image, StyleSheet, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
  },
});

const GeneralReportPDF = ({ year, reportImage, renewalImage, bandsImage, rejectionImage, clientImage }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Gráfica de Renovación de Llantas - {year}</Text>
      {renewalImage && <Image style={styles.image} src={renewalImage} />}
    </Page>
    
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Gráfica de Clientes - {year}</Text>
      {clientImage && <Image style={styles.image} src={clientImage} />}
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Gráfica de Rechazo de Llantas - {year}</Text>
      {rejectionImage && <Image style={styles.image} src={rejectionImage} />}
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Resumen General - {year}</Text>
      {reportImage && <Image style={styles.image} src={reportImage} />}
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Gráficas de Bandas - {year}</Text>
      {bandsImage && <Image style={styles.image} src={bandsImage} />}
    </Page>
  </Document>
);

export default GeneralReportPDF;
