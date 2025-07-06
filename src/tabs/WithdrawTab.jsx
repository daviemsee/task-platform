import { useState } from "react";

const withdrawOptions = [500, 1000, 2000, 5000, 10000, 20000];

export default function WithdrawTab() {
  const [amount, setAmount] = useState("");
  const [fundPassword, setFundPassword] = useState("");
  const [history, setHistory] = useState([
    { date: "2025-07-01", amount: 1000, status: "Pending" },
    { date: "2025-06-28", amount: 2000, status: "Completed" },
  ]);

  const handleWithdraw = e => {
    e.preventDefault();
    // Call backend for withdraw
    alert("Withdrawal request submitted.");
  };

  return (
    <div>
      <div className="font-bold mb-2">Withdraw</div>
      <form onSubmit={handleWithdraw} className="bg-white p-3 rounded shadow mb-4">
        <div className="mb-2">
          <label>Amount</label>
          <select value={amount} onChange={e=>setAmount(e.target.value)} className="w-full border p-2 rounded">
            <option value="">Select</option>
            {withdrawOptions.map(opt => (
              <option key={opt} value={opt}>KES {opt}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label>Fund Password</label>
          <input type="password" minLength={6} maxLength={6} value={fundPassword} onChange={e=>setFundPassword(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <button className="bg-primary text-white w-full p-2 rounded">Withdraw</button>
      </form>
      <div>
        <div className="font-bold mb-2">Withdrawal History</div>
        <table className="w-full text-sm bg-white rounded shadow">
          <thead>
            <tr>
              <th>Date</th><th>Amount</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h,i) => (
              <tr key={i}>
                <td>{h.date}</td>
                <td>KES {h.amount}</td>
                <td>{h.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}