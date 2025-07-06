const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.approveTransaction = functions.https.onCall(async (data, context) => {
  // Only allow admin
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError("permission-denied", "Admins only");
  }
  const { transactionId } = data;
  const txRef = admin.firestore().collection("transactions").doc(transactionId);
  const txSnap = await txRef.get();
  if (!txSnap.exists) throw new functions.https.HttpsError("not-found", "Transaction not found");

  const tx = txSnap.data();
  if (tx.status !== "pending") return "Already processed";

  // Deposit
  if (tx.type === "deposit") {
    await admin.firestore().collection("users").doc(tx.userId)
      .update({ balance: admin.firestore.FieldValue.increment(tx.amount) });
  }
  // Withdraw
  if (tx.type === "withdrawal") {
    // Here, admin will process payment externally then mark as completed
    // Optionally, deduct funds at request and refund if rejected
  }
  await txRef.update({
    status: "approved",
    processedBy: context.auth.uid,
    processedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return "Transaction approved";
});

exports.rejectTransaction = functions.https.onCall(async (data, context) => {
  // Only allow admin
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError("permission-denied", "Admins only");
  }
  const { transactionId } = data;
  await admin.firestore().collection("transactions").doc(transactionId)
    .update({
      status: "rejected",
      processedBy: context.auth.uid,
      processedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  // Optionally: for withdrawal, refund balance if already deducted at request
  return "Transaction rejected";
});