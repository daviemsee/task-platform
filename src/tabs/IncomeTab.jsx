export default function IncomeTab() {
  // Dummy earnings, replace with Firestore data
  const earnings = {
    today: 200,
    yesterday: 200,
    week: 1400,
    month: 6000,
    total: 12000,
    taskMgmt: 400,
    referral: 300,
  };

  return (
    <div>
      <div className="font-bold mb-2">Income</div>
      <table className="w-full text-sm bg-white rounded shadow">
        <tbody>
          <tr><td>Today's Earnings</td><td className="text-right">KES {earnings.today}</td></tr>
          <tr><td>Yesterday's Earnings</td><td className="text-right">KES {earnings.yesterday}</td></tr>
          <tr><td>This Week</td><td className="text-right">KES {earnings.week}</td></tr>
          <tr><td>This Month</td><td className="text-right">KES {earnings.month}</td></tr>
          <tr><td>Total</td><td className="text-right">KES {earnings.total}</td></tr>
          <tr><td>Task Management Earnings</td><td className="text-right">KES {earnings.taskMgmt}</td></tr>
          <tr><td>Referral Bonus</td><td className="text-right">KES {earnings.referral}</td></tr>
        </tbody>
      </table>
    </div>
  );
}