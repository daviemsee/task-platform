import { useState } from "react";

export default function GiftTab() {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const handleRedeem = e => {
    e.preventDefault();
    setMsg("Gift code redeemed!");
  };

  return (
    <div>
      <div className="font-bold mb-2">Redeem Gift</div>
      <form onSubmit={handleRedeem} className="bg-white p-3 rounded shadow">
        <input type="text" value={code} onChange={e=>setCode(e.target.value)} className="w-full border p-2 rounded mb-2" placeholder="Enter gift code" />
        <button className="bg-primary text-white w-full p-2 rounded">Redeem</button>
      </form>
      {msg && <div className="text-green-500 p-2">{msg}</div>}
    </div>
  );
}