```
users (collection)
  {userId} (document)
    phone: string
    referral: string  // referrer's userId or code
    createdAt: timestamp
    ip: string
    package: string  // e.g., "intern", "job1", ...
    package_expiry: timestamp
    balance: number
    fundPasswordSet: bool
    mpesaName: string
    mpesaNumber: string
    inviteCode: string
    totalEarnings: number
    referralEarnings: number
    taskMgmtEarnings: number
    // ... other relevant fields

referrals (collection)
  {userId} (document)
    referrer: string  // direct referrer userId
    level1: [userId]  // users directly referred by this user
    level2: [userId]  // second-level referrals
    level3: [userId]  // third-level referrals

tasks (collection)
  {userId}_{date} (document) // e.g., "uid_20250705"
    userId: string
    date: date
    tasks: [
      {
        appName: string,
        completed: bool,
        completedAt: timestamp
      }
    ]
    package: string // current package

packages (collection)
  {packageId} (document)
    name: string
    deposit: number
    tasksPerDay: number
    perTask: number
    duration: number (days)
    openingSoon: boolean

transactions (collection)
  {transactionId} (document)
    userId: string
    type: string // "deposit" | "withdrawal"
    amount: number
    status: string // "pending", "approved", "rejected"
    createdAt: timestamp
    mpesaMsg: string
    processedBy: string // adminId
    processedAt: timestamp

redeemCodes (collection)
  {code} (document)
    value: number
    redeemedBy: [userId]
    active: boolean

incomeStats (collection)
  {userId} (document)
    today: number
    yesterday: number
    week: number
    month: number
    total: number
    taskMgmt: number
    referral: number
```