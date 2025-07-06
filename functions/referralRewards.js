const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.handleReferralBonuses = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    // If package was upgraded
    if (before.package !== after.package) {
      // Load package configs (assume stored in Firestore)
      const packagesSnap = await admin.firestore().collection("packages").get();
      const packages = {};
      packagesSnap.forEach(doc => {
        packages[doc.id] = doc.data();
      });

      const newPackage = packages[after.package];
      if (!newPackage) return;

      // Get referral chain
      const referralSnap = await admin.firestore().collection("referrals").doc(context.params.userId).get();
      const referralData = referralSnap.data();
      if (!referralData || !referralData.referrer) return;

      const userId = context.params.userId;
      const packageDeposit = newPackage.deposit;

      // Level 1 (direct referrer)
      const level1Id = referralData.referrer;
      if (level1Id) {
        await processReferralBonus(level1Id, userId, 1, packageDeposit, after.package, packages);
      }
      // Level 2
      const level2Snap = await admin.firestore().collection("referrals").doc(level1Id).get();
      if (level2Snap.exists && level2Snap.data().referrer) {
        const level2Id = level2Snap.data().referrer;
        await processReferralBonus(level2Id, userId, 2, packageDeposit, after.package, packages);
        // Level 3
        const level3Snap = await admin.firestore().collection("referrals").doc(level2Id).get();
        if (level3Snap.exists && level3Snap.data().referrer) {
          const level3Id = level3Snap.data().referrer;
          await processReferralBonus(level3Id, userId, 3, packageDeposit, after.package, packages);
        }
      }
    }
  });

// Helper for bonus logic
async function processReferralBonus(referrerId, newUserId, level, purchasedAmount, purchasedPackage, packages) {
  const bonusPercents = [0, 0.10, 0.04, 0.02]; // [dummy, level1, level2, level3]
  const refUserSnap = await admin.firestore().collection("users").doc(referrerId).get();
  if (!refUserSnap.exists) return;
  const refUser = refUserSnap.data();

  // Find referrer package amount
  const refPkg = packages[refUser.package] || { deposit: 0 };
  let bonusAmount = 0;

  // If referee purchases higher than referrer, bonus is on referrer's deposit only
  if (refPkg.deposit < purchasedAmount) {
    bonusAmount = refPkg.deposit * bonusPercents[level];
  } else {
    bonusAmount = purchasedAmount * bonusPercents[level];
  }

  if (bonusAmount > 0) {
    // Credit referrer
    await admin.firestore().collection("users").doc(referrerId)
      .update({
        balance: admin.firestore.FieldValue.increment(bonusAmount),
        referralEarnings: admin.firestore.FieldValue.increment(bonusAmount),
      });
    // (Optional) Log transaction
    await admin.firestore().collection("transactions").add({
      userId: referrerId,
      type: `referral-level${level}`,
      amount: bonusAmount,
      fromUser: newUserId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "completed"
    });
  }
}