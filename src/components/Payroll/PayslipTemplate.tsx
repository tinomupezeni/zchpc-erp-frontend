import React from "react";
import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";

// Register font (you'll need to have the font files)
Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf" }, // Regular
    { src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf", fontWeight: 700 }, // Bold
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
    paddingBottom: 15
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563eb"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },
  section: {
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2563eb"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5
  },
  label: {
    fontWeight: "bold",
    width: "60%"
  },
  value: {
    width: "40%",
    textAlign: "right"
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    fontWeight: "bold"
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 10,
    color: "#666"
  }
});

const PayslipTemplate = ({ employee, payrollData, period }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.companyName}>COMPANY NAME</Text>
            <Text>123 Business Address</Text>
            <Text>City, Country</Text>
          </View>
          <View>
            <Text>Pay Period: {period}</Text>
            <Text>Issue Date: {new Date().toLocaleDateString()}</Text>
            <Text>Employee ID: {employee.id}</Text>
          </View>
        </View>

        <Text style={styles.title}>PAYSLIP</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Employee Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Employee Name:</Text>
            <Text style={styles.value}>{employee.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Position:</Text>
            <Text style={styles.value}>{employee.position}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Department:</Text>
            <Text style={styles.value}>{employee.department}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Earnings</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Basic Salary:</Text>
            <Text style={styles.value}>${payrollData.baseSalary.toFixed(2)}</Text>
          </View>
          {payrollData.allowances.map((item, index) => (
            <View style={styles.row} key={`allowance-${index}`}>
              <Text style={styles.label}>{item.name}:</Text>
              <Text style={styles.value}>+${item.amount.toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.label}>Total Earnings:</Text>
            <Text style={styles.value}>
              ${(payrollData.baseSalary + payrollData.totalAllowances).toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deductions</Text>
          {payrollData.deductions.map((item, index) => (
            <View style={styles.row} key={`deduction-${index}`}>
              <Text style={styles.label}>{item.name}:</Text>
              <Text style={styles.value}>-${item.amount.toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.label}>Total Deductions:</Text>
            <Text style={styles.value}>-${payrollData.totalDeductions.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.totalRow, { borderTopWidth: 2, borderTopColor: "#2563eb" }]}>
            <Text style={[styles.label, { fontSize: 16 }]}>NET PAY:</Text>
            <Text style={[styles.value, { fontSize: 16, color: "#2563eb" }]}>
              ${payrollData.netSalary.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>This is a computer generated payslip and does not require signature</Text>
          <Text>For any queries, please contact HR department</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PayslipTemplate;