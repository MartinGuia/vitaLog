import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import * as images from "../img";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#f7f7f7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#007BFF",
  },
  logo: {
    width: 80,
    height: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 12,
    color: "#555",
  },
  sectionBold: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "bold",
  },
  table: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: 8,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableRowOdd: {
    backgroundColor: "#f9f9f9",
  },
  tableCell: {
    flex: 1, // Tamaño estándar para las demás columnas
    fontSize: 10,
    textAlign: "center",
  },
  tableCellWO: {
    flex: 0.6, // Reducir espacio para la columna de Línea
    fontSize: 10,
    textAlign: "center",
  },
  tableCellDO: {
    flex: 0.2, // Reducir espacio para la columna de Línea
    fontSize: 10,
    textAlign: "center",
  },
});

const DeliveryOrderPDF = ({ deliveryOrder }) => {
  if (!deliveryOrder) return null; // Asegúrate de que deliveryOrder no sea null

  return (
    <Document>
      <Page style={styles.page} orientation="landscape"> {/* Cambiando la orientación */}
        {/* Encabezado */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Orden de Entrega: {deliveryOrder.numero}</Text>
            <Text style={styles.sectionContent}>VITA-BAJIO S.A de C.V</Text>
            <Text style={styles.sectionContent}>
              Hidalgo 1500 San Juan de La Presa, Salamanca
            </Text>
          </View>
          <Image src={images.logoVB} style={styles.logo} />
        </View>

        {/* Detalles de la recolección */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles de la Recolección</Text>
          <Text style={styles.sectionContent}>
            Recolector: <Text style={styles.sectionBold}>{deliveryOrder.createdBy?.name} {deliveryOrder.createdBy?.lastName}</Text>
          </Text>
          <Text style={styles.sectionContent}>
            Fecha de recolección: <Text style={styles.sectionBold}>{deliveryOrder.formattedCreatedAt}</Text>
          </Text>
        </View>

        {/* Tabla */}
        <View style={styles.table}>
          {/* Encabezado de la tabla */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableCellDO}></Text>
            <Text style={styles.tableCellWO}>Orden de trabajo</Text>
            <Text style={styles.tableCell}>Reparaciones</Text>
            <Text style={styles.tableCell}>Cantidad de Rep.</Text>
            <Text style={styles.tableCell}>Código de Ítem</Text>
            <Text style={styles.tableCell}>Código de Barras</Text>
            <Text style={styles.tableCell}>Medida</Text>
            <Text style={styles.tableCell}>Marca</Text>
            <Text style={styles.tableCell}>Banda Aplicada</Text>
            <Text style={styles.tableCell}>DOT</Text>
          </View>
          {/* Filas */}
          {deliveryOrder.tires.map((tire, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                index % 2 === 1 ? styles.tableRowOdd : null,
              ]}
            >
              <Text style={styles.tableCellDO}>{tire.linea || "-"}</Text>
              <Text style={styles.tableCellWO}>{tire.workOrder.numero || "-"} </Text>
              <Text style={styles.tableCell}>{tire.patch || "-"} </Text>
              <Text style={styles.tableCell}>{tire.numberPatches || "-"} </Text>
              <Text style={styles.tableCell}>{tire.itemCode || "-"}</Text>
              <Text style={styles.tableCell}>{tire.barCode || "-"}</Text>
              <Text style={styles.tableCell}>{tire.helmetMeasurement || "-"}</Text>
              <Text style={styles.tableCell}>{tire.brand || "-"}</Text>
              <Text style={styles.tableCell}>{tire.helmetDesign || "-"}</Text>
              <Text style={styles.tableCell}>{tire.antiquityDot || "-"}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default DeliveryOrderPDF;