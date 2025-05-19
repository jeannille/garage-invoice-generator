"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { Listing } from "@/lib/schemas/listing.schema";

// Register fonts
Font.register({
  family: "Helvetica",
  fonts: [{ src: "Helvetica" }, { src: "Helvetica-Bold", fontWeight: 700 }],
});

// react pdf stylesheet 
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#333",
    backgroundColor: "#fff",
    lineHeight: 1.3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerLeft: { maxWidth: "60%" },
  headerTitle: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 14,
    color: "#1a202c",
  },
  invoiceDetail: { marginBottom: 2, color: "#4a5568" },
  headerRight: { textAlign: "right", alignItems: "flex-end" },
  logo: { width: 80, height: 20, marginBottom: 10 },
  companyName: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 4,
    color: "#1a202c",
  },
  companyDetail: { marginBottom: 2, color: "#4a5568" },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 6,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    color: "#1a202c",
  },
  listingTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 10,
    color: "#1a202c",
  },
  image: {
    width: 140,
    height: 105,
    marginBottom: 15,
    borderRadius: 2,
  },
  detailsTable: {
    flexDirection: "column",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tableRowLast: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  tableLabel: {
    width: "35%",
    fontWeight: 700,
    color: "#4a5568",
  },
  tableValue: {
    width: "65%",
    color: "#1a202c",
  },
  description: {
    marginTop: 8,
    marginBottom: 15,
    lineHeight: 1.4,
    color: "#4a5568",
    fontSize: 9,
  },
  // Add this in your styles:

priceRow: {
  flexDirection: "row",
  paddingVertical: 8,
  paddingHorizontal: 6,
  borderTopWidth: 2,
  borderTopColor: "#1a202c",
  backgroundColor: "#f9fafb",
  marginTop: 10,
},

priceLabel: {
  width: "35%",
  fontWeight: 700,
  fontSize: 12,
  color: "#1a202c",
},

priceValue: {
  width: "65%",
  fontWeight: 700,
  fontSize: 14,
  color: "#1a202c",
  textAlign: "right",
},

});

// Reusable detail row
const DetailRow = ({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: string | number | null | undefined;
  isLast?: boolean;
}) => (
  <View style={isLast ? styles.tableRowLast : styles.tableRow}>
    <Text style={styles.tableLabel}>{label}</Text>
    <Text style={styles.tableValue}>{value ?? "-"}</Text>
  </View>
);

const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`; // Example: INV-123456

// Main PDF Component
export const InvoicePDF = ({ listing }: { listing: Listing }) => (
  <Document>
    <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Invoice</Text>
            <Text style={styles.invoiceDetail}> Invoice #: {invoiceNumber}</Text>
            <Text style={styles.invoiceDetail}> Date: {new Date().toLocaleDateString()}</Text>
          </View>
          <View style={styles.headerRight}>
            <Image style={styles.logo} src="/images/with_garage.png" />
            <Text style={styles.companyName}>Garage Technologies, Inc.</Text>
            <Text style={styles.companyDetail}>637 Wyckoff Ave</Text>
            <Text style={styles.companyDetail}>Wyckoff, NJ 07417</Text>
            <Text style={styles.companyDetail}>support@withgarage.com</Text>
            <Text style={styles.companyDetail}>(201) 293-7164</Text>
          </View>
        </View>

        <View style={styles.divider} />

           {/* Listing title */}
      <Text style={styles.sectionTitle}>Listing Details</Text>
      <Text style={styles.listingTitle}>{listing.listingTitle}</Text>
      {listing.imageUrls?.[0] && (
        <Image style={styles.image} src={listing.imageUrls[0]} />
      )}


      <View style={styles.divider} />

      <View style={styles.detailsTable}>
  <DetailRow label="Category" value={listing.categoryV2?.name} />
  <DetailRow label="Brand" value={listing.itemBrand} />
  <DetailRow label="Item Age (years)" value={listing.itemAge} />
  <DetailRow label="Mileage" value={listing.mileage} />
  <DetailRow label="Length" value={listing.itemLength ? `${listing.itemLength}"` : "-"} />
  <DetailRow label="Width" value={listing.itemWidth ? `${listing.itemWidth}"` : "-"} />
  <DetailRow label="Height" value={listing.itemHeight ? `${listing.itemHeight}"` : "-"} />
  <DetailRow label="Weight" value={listing.itemWeight ? `${listing.itemWeight} lbs` : "-"} />
  <DetailRow label="VIN" value={listing.vin} />

  {/* Selling Price at the bottom with invoice style */}
  <View style={styles.priceRow}>
    <Text style={styles.priceLabel}>Selling Price</Text>
    <Text style={styles.priceValue}>
      {listing.sellingPrice ? `$${listing.sellingPrice.toFixed(2)}` : "-"}
    </Text>
  </View>
  </View>

      {listing.listingDescription && (
        <Text style={styles.description}>{listing.listingDescription}</Text>
      )}
    </Page>
  </Document>
);
