import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet
} from "@react-pdf/renderer";

const pdfStyles = StyleSheet.create({
    page: {
        padding: 0,
        backgroundColor: "#FFFFFF",
        fontFamily: "Helvetica"
    },
    topBar: {
        height: 60,
        backgroundColor: "#1e293b",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    brandTitle: { fontSize: 18, fontWeight: "bold", color: "#FFFFFF", letterSpacing: 1 },
    orderIdText: { fontSize: 10, color: "#cbd5e1" },
    content: { padding: 30 },
    row: { flexDirection: 'row', borderBottom: 1, borderColor: "#f1f5f9", paddingVertical: 15 },
    column: { flex: 1 },
    label: {
        fontSize: 8,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 3
    },
    value: { fontSize: 11, color: "#1e293b", fontWeight: "bold" },
    sectionHeader: {
        backgroundColor: "#f8fafc",
        padding: 8,
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 4
    },
    sectionTitle: { fontSize: 9, fontWeight: "bold", color: "#64748b", textTransform: "uppercase" },
    statusBadge: {
        marginTop: 4,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 4,
        fontSize: 9,
        fontWeight: "bold",
        color: "#FFFFFF",
        width: 70,
        textAlign: 'center'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        backgroundColor: "#f8fafc",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: 1,
        borderColor: "#e2e8f0"
    },
    footerText: { fontSize: 8, color: "#94a3b8" }
});

const MyVoucherPDF = ({ item }) => (
    <Document>
        <Page size="A4" orientation="landscape" style={pdfStyles.page}>
            <View style={pdfStyles.topBar}>
                <Text style={pdfStyles.brandTitle}>JY RESIDENCE</Text>
                <Text style={pdfStyles.orderIdText}>VOUCHER #{item.orderId}</Text>
            </View>

            <View style={pdfStyles.content}>
                <View style={pdfStyles.sectionHeader}>
                    <Text style={pdfStyles.sectionTitle}>Guest Details</Text>
                </View>
                <View style={pdfStyles.row}>
                    <View style={pdfStyles.column}>
                        <Text style={pdfStyles.label}>Full Name</Text>
                        <Text style={pdfStyles.value}>{item.guestName || "N/A"}</Text>
                    </View>
                    <View style={pdfStyles.column}>
                        <Text style={pdfStyles.label}>Contact Info</Text>
                        <Text style={pdfStyles.value}>{item.guestPhone || "-"} / {item.guestEmail}</Text>
                    </View>
                </View>

                <View style={pdfStyles.sectionHeader}>
                    <Text style={pdfStyles.sectionTitle}>Accommodation</Text>
                </View>
                <View style={pdfStyles.row}>
                    <View style={pdfStyles.column}>
                        <Text style={pdfStyles.label}>Room Type</Text>
                        <Text style={pdfStyles.value}>{item.roomId?.name} ({item.qtyRoom} Unit)</Text>
                    </View>
                    <View style={pdfStyles.column}>
                        <Text style={pdfStyles.label}>Stay Duration</Text>
                        <Text style={pdfStyles.value}>{item.nights} Malam</Text>
                    </View>
                </View>

                <View style={pdfStyles.row}>
                    <View style={pdfStyles.column}>
                        <Text style={pdfStyles.label}>Check-In / Out</Text>
                        <Text style={pdfStyles.value}>
                            {new Date(item.checkIn).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })} - {new Date(item.checkOut).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </Text>
                    </View>
                    <View style={pdfStyles.column}>
                        <Text style={pdfStyles.label}>Payment Status</Text>
                        <Text style={[pdfStyles.statusBadge, {
                            backgroundColor: item.paymentStatus === 'PAID' ? '#10b981' : '#f59e0b'
                        }]}>
                            {item.paymentStatus}
                        </Text>
                    </View>
                </View>

                <View style={{ marginTop: 15, alignItems: 'flex-end' }}>
                    <Text style={pdfStyles.label}>Total Paid Amount</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1e293b' }}>
                        Rp {item.totalPrice?.toLocaleString('id-ID')}
                    </Text>
                </View>
            </View>

            <View style={pdfStyles.footer}>
                <Text style={pdfStyles.footerText}>Wonosari, Yogyakarta | Digital Confirmation</Text>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#cbd5e1' }}>JYRES OFFICIAL</Text>
            </View>
        </Page>
    </Document>
);

export default MyVoucherPDF;