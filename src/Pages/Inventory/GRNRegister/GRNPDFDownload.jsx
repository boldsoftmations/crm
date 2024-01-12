import React, { useCallback, useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import InventoryServices from "../../../services/InventoryService";
import { CustomLoader } from "../../../Components/CustomLoader";

// Register a font if necessary
// Font.register({ family: 'Oswald', src: 'http://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf' });

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  title: {
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
  },
  tableRowHeader: {
    backgroundColor: "#CCCCCC",
    height: 20,
  },
  tableColHeader: {
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontWeight: "bold",
  },
  tableCol: {
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: "auto",
    margin: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCell: {
    margin: "auto",
    margin: 5,
    fontSize: 10,
  },
  footer: {
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#000",
    borderTopStyle: "solid",
  },
});

export const GRNPDFDownload = ({ GRN_ID }) => {
  const [grnRegisterPDFData, setGRNRegisterPDFData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch GRN data
  const fetchGRNData = useCallback(async () => {
    if (GRN_ID) {
      try {
        setIsLoading(true);
        const response = await InventoryServices.getGRNDataById(GRN_ID);
        setGRNRegisterPDFData(response.data.results);
      } catch (error) {
        console.error("Error fetching GRN data", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [GRN_ID]);

  useEffect(() => {
    fetchGRNData();
  }, [fetchGRNData]);

  console.log("grnRegisterPDFData", grnRegisterPDFData);
  return (
    <>
      <CustomLoader open={isLoading} />
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>GOODS RECEIVED NOTE</Text>
            <Text style={styles.title}>
              GRN No. {grnRegisterPDFData.grn_no}
            </Text>
          </View>

          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableRowHeader]}>
              <View
                style={[
                  styles.tableCol,
                  styles.tableColHeader,
                  { width: "10%" },
                ]}
              >
                <Text style={styles.tableCellHeader}>Sr. No.</Text>
              </View>
              <View
                style={[
                  styles.tableCol,
                  styles.tableColHeader,
                  { width: "20%" },
                ]}
              >
                <Text style={styles.tableCellHeader}>Item Code</Text>
              </View>
              <View
                style={[
                  styles.tableCol,
                  styles.tableColHeader,
                  { width: "40%" },
                ]}
              >
                <Text style={styles.tableCellHeader}>Item Description</Text>
              </View>
              {/* Add other headers as per the original form, adjusting the width accordingly */}
            </View>

            {/* Table Row for each item */}
            {/* Repeat this structure for each item in the list */}
            <View style={styles.tableRow}>
              <View style={[styles.tableCol, { width: "10%" }]}>
                <Text style={styles.tableCell}>1</Text>
              </View>
              <View style={[styles.tableCol, { width: "20%" }]}>
                <Text style={styles.tableCell}>0001</Text>
              </View>
              <View style={[styles.tableCol, { width: "40%" }]}>
                <Text style={styles.tableCell}>Description here</Text>
              </View>
              {/* Add other columns as per the original form */}
            </View>
          </View>

          <View style={styles.footer}>
            <Text>Stores Supervisor's Name: _______________</Text>
            {/* Add other footer elements as per the original form */}
          </View>
        </Page>
      </Document>
    </>
  );
};
