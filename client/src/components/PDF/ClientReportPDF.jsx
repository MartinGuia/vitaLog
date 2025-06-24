import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import * as images from "../../img"; // Asegúrate que ImgReport y LogoBandag estén bien importadas

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20, // antes 40
    paddingVertical: 20, // antes 30
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
  },

  // Portada
  headerImage: {
    width: "100%",
    height: 160,
    objectFit: "cover",
    marginBottom: 10,
  },
  titleContainer: {
    backgroundColor: "#0A0F1F",
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
  },
  subTitle: {
    fontSize: 11,
    textAlign: "center",
    color: "#FFFFFF",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 10,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222", // texto oscuro visible sobre fondo blanco
    marginBottom: 10,
  },
  period: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 8,
  },
  logoBandag: {
    width: 100,
    alignSelf: "center",
    marginTop: 20,
  },

  summary: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#f7f5f6",
    padding: 10,
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 1,
    gap: 6,
  },

  summaryCard: {
    backgroundColor: "#ffffff",
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    minWidth: "30%",
    textAlign: "center",
  },
  image: {
    width: "100%",
    marginBottom: 20,
  },

  // Tabla
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "0A0F1F",
    color: "#fff",
    padding: 6,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableRowOdd: {
    backgroundColor: "#f9f9f9",
  },
  cell: {
    flex: 1,
    fontSize: 8,
    textAlign: "center",
  },
});

const ClientReportPDF = ({ report, chartImage, rejectionImage }) => {
  const tires = report.tires || [];
  const rowsPerPage = 31;

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const tireChunks = chunkArray(tires, rowsPerPage);

  return (
    <Document>
      {/* 1. Portada profesional */}
      <Page style={styles.page}>
        <Image src={images.ImgReport} style={styles.headerImage} />
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>INFORME INSTANTÁNEO DE LA FLOTA</Text>
          <Text style={styles.subTitle}>Informe de gestión al cliente</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.boldText}>Nombre del Cliente:</Text>
          <Text>{report.clientName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.boldText}>Informe de:</Text>
          <Text>VITA-BAJIO S.A. de C.V.</Text>
          <Text>San Juan de la Presa Hidalgo 1500</Text>
          <Text>San Juan de la Presa, Salamanca, México</Text>
        </View>

        <Text style={styles.period}>
          Durante el período: {report.startDate || "01/01/2024"} -{" "}
          {report.endDate || "31/12/2024"}
        </Text>

        {/* <Image src={images.LogoBandag} style={styles.logoBandag} /> */}
      </Page>

      {/* 2. Resumen */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Resumen de Actividad</Text>
        <View style={styles.summary}>
          <View style={styles.summaryCard}>
            <Text>Total de órdenes</Text>
            <Text>{report.totalOrders ?? "-"}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text>Total de llantas</Text>
            <Text>{report.totalTires ?? tires.length}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text>Total de rechazos</Text>
            <Text>{report.totalRejections ?? "-"}</Text>
          </View>
        </View>
        {/* Página con TODAS las gráficas excepto rechazo */}
        {chartImage && <Image src={chartImage} style={styles.image} />}
      </Page>

      {/* Página con gráfica de rechazo */}
      {rejectionImage && (
        <Page style={styles.page}>
          <Text style={styles.mainTitle}>Motivos de Rechazo</Text>
          <Image src={rejectionImage} style={styles.image} />
        </Page>
      )}

      {/* 3. Tabla de llantas paginada */}
      {tireChunks.map((group, index) => (
        <Page key={index} style={styles.page}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.cell}>O.T.</Text>
              <Text style={styles.cell}>Código Barras</Text>
              <Text style={styles.cell}>Quemado</Text>
              <Text style={styles.cell}>Banda</Text>
              <Text style={styles.cell}>Marca</Text>
              <Text style={styles.cell}>Modelo</Text>
              <Text style={styles.cell}>Medida</Text>
              <Text style={styles.cell}>DOT</Text>
              <Text style={styles.cell}>Rechazo</Text>
            </View>
            {group.map((tire, i) => (
              <View
                key={i}
                style={[
                  styles.tableRow,
                  i % 2 === 1 ? styles.tableRowOdd : null,
                ]}
              >
                <Text style={styles.cell}>{tire.orderNumber || "-"}</Text>
                <Text style={styles.cell}>{tire.barCode || "-"}</Text>
                <Text style={styles.cell}>{tire.serialNumber || "-"}</Text>
                <Text style={styles.cell}>{tire.appliedBand || "-"}</Text>
                <Text style={styles.cell}>{tire.brand || "-"}</Text>
                <Text style={styles.cell}>{tire.model || "-"}</Text>
                <Text style={styles.cell}>{tire.helmetMeasurement || "-"}</Text>
                <Text style={styles.cell}>{tire.antiquityDot || "-"}</Text>
                <Text style={styles.cell}>{tire.rejection || "-"}</Text>
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default ClientReportPDF;
