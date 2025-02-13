import prisma from "../../../utils/db";

// export async function saveVoucher({ voucherId, orderId, pdfPath, expiresAt }) {
//   console.log("i have run");
//   return prisma.voucher.create({
//     data: {
//       id: voucherId,
//       orderId,
//       pdfPath,
//       expiresAt,
//     },
//   });
// }

export async function createVoucher(voucherId, orderId, pdfPath, expiresAt) {
  console.log("Data:", voucherId, orderId, pdfPath, expiresAt);
  try {
    const newVoucher = await prisma.voucher.create({
      data: {
        id: BigInt(voucherId),
        orderId: orderId,
        pdfPath: pdfPath,
        expiresAt: expiresAt,
      },
    });
    return { success: true, voucher: newVoucher };
  } catch (error) {
    console.error("Hiba a voucher létrehozásakor:", error.stack); // Itt írjuk ki a stack-et
    return { success: false, message: "Nem sikerült létrehozni a vouchert." };
  }
}
