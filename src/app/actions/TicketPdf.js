import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// 🔹 Image URLs
const imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/budapest_bitcoin_cover.jpeg`;
const safeIconUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/shield.png`;
const qrIconUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/qr-code.png`;
const saveIconUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/save-the-planet.png`;

// 🔹 Styles
const styles = StyleSheet.create({
  page: { padding: 40, flexDirection: "column", alignItems: "center" },
  headerImage: {
    width: 500,
    height: "auto",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "left",
    width: "100%",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "left",
    width: "100%",
  },
  text: { fontSize: 12, fontWeight: "300", textAlign: "left", width: "100%" },
  section: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", // 👈 Text starts from the top
    paddingVertical: 10,
  },
  qrCode: { width: 120, height: 120 },
  horizontalLine: {
    borderBottom: "1px solid #000",
    width: "100%",
    marginTop: 2, // 👈 Closer to the title
    marginBottom: 10, // 👈 Extra space before the sections below
  },
  instructionsTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  instructionIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 5,
  },
  instructionBox: {
    width: "30%",
    textAlign: "left",
    alignItems: "flex-start", // 👈 Ensures left alignment
  },
  instructionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginLeft: 4,
  },
  instructionText: { fontSize: 10, marginTop: 2, textAlign: "left" },
  icon: { width: 16, height: 16 },
  iconTitleRow: {
    flexDirection: "row",
    alignItems: "center", // 👈 Icons now properly align
    marginBottom: 3,
  },
});

// 📌 **PDF Component**
const TicketPdf = ({ ticketData }) => (
  <Document>
    {ticketData.items.map((item) =>
      [...Array(item.quantity)].map((_, i) => (
        <Page size="A4" style={styles.page} key={`${item.ticketName}-${i}`}>
          {/* 🎨 Header Image */}
          <Image src={imageUrl} style={styles.headerImage} />

          {/* 🔹 Ticket Information and QR Code */}
          <View style={styles.section}>
            <View>
              <Text style={styles.title}>Budapest Bitcoin Conference</Text>
              <Text style={styles.subtitle}>Ticket: {item.ticketName}</Text>
              <Text style={styles.text}>
                Validity: August 08, 2024 - August 09, 2024
              </Text>
            </View>
            <Image src={item.qrCodes[i]} style={styles.qrCode} />
          </View>

          {/* 🔹 "How to use this ticket" + Line */}
          <View style={styles.instructionsTitleContainer}>
            <Text style={styles.subtitle}>How to use this ticket</Text>
            <View style={styles.horizontalLine} />
          </View>

          {/* 🔹 Instructions Section with Icons */}
          <View style={styles.instructionIconsContainer}>
            {/* 🛡️ Keep it Safe */}
            <View style={styles.instructionBox}>
              <View style={styles.iconTitleRow}>
                <Image src={safeIconUrl} style={styles.icon} />
                <Text style={styles.instructionTitle}>Keep it Safe!</Text>
              </View>
              <Text style={styles.instructionText}>
                Don’t let anyone make copies or recordings of your ticket or the
                code on it! In case of any ticket abuse we don’t give out
                additional lanyard pass, one ticket can only be exchanged once!
              </Text>
            </View>

            {/* 🔲 Have the QR Code */}
            <View style={styles.instructionBox}>
              <View style={styles.iconTitleRow}>
                <Image src={qrIconUrl} style={styles.icon} />
                <Text style={styles.instructionTitle}>
                  Have the QR Code with you!
                </Text>
              </View>
              <Text style={styles.instructionText}>
                We will only exchange this ticket to a lanyard pass for the
                person who has successfully completed the check-in process.
              </Text>
            </View>

            {/* 🌱 Think before Print */}
            <View style={styles.instructionBox}>
              <View style={styles.iconTitleRow}>
                <Image src={saveIconUrl} style={styles.icon} />
                <Text style={styles.instructionTitle}>Think before print!</Text>
              </View>
              <Text style={styles.instructionText}>
                In case you have a smartphone you don’t have to print this
                ticket, you can download it and show the above QR code on your
                screen.
              </Text>
            </View>
          </View>
        </Page>
      ))
    )}
  </Document>
);

export default TicketPdf;
