import { useState } from "react";
const depositOptions = [1000, 3000, 8500, 24000, 60000, 100000, 200000];

export default function DepositTab() {
  const [amount, setAmount] = useState("");
  const [fundPassword, setFundPassword] = useState("");
  const [mpesaMsg, setMpesaMsg] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmit = e => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div>
      <div className="font-bold mb-2">Deposit</div>
      {step === 1 ? (
        <form onSubmit={handleSubmit} className="bg-white p-3 rounded shadow">
          <div className="mb-2">
            <label>Amount</label>
            <select value={amount} onChange={e=>setAmount(e.target.value)} className="w-full border p-2 rounded">
              <option value="">Select</option>
              {depositOptions.map(opt => (
                <option key={opt} value={opt}>KES {opt}</option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label>Fund Password</label>
            <input type="password" minLength={6} maxLength={6} value={fundPassword} onChange={e=>setFundPassword(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <button className="bg-primary text-white w-full p-2 rounded">Next</button>
        </form>
      ) : (
        <div className="bg-white p-3 rounded shadow">
          <div className="mb-2">Go to Mpesa and send money to <b>0718989672</b></div>
          <div className="mb-2">After sending, paste your Mpesa message below:</div>
          <textarea className="w-full border rounded p-2" rows={3} value={mpesaMsg} onChange={e=>setMpesaMsg(e.target.value)} placeholder="Paste Mpesa message here"></textarea>
          <button className="bg-primary text-white w-full p-2 rounded mt-2">Submit</button>
        </div>
      )}
    </div>
  );
}