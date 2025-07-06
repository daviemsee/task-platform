import { useState } from "react";

export default function SettingsTab() {
  const [mpesaName, setMpesaName] = useState("");
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [fundPass, setFundPass] = useState("");
  const [fundPassRepeat, setFundPassRepeat] = useState("");
  const [fundShow, setFundShow] = useState(false);
  const [loginPass, setLoginPass] = useState("");
  const [loginPassNew, setLoginPassNew] = useState("");
  const [loginPassRepeat, setLoginPassRepeat] = useState("");
  const [loginShow, setLoginShow] = useState(false);

  const setFundPassword = e => {
    e.preventDefault();
    if (fundPass !== fundPassRepeat) {
      alert("Fund passwords do not match");
      return;
    }
    alert("Fund password set!");
  };

  const changeLoginPassword = e => {
    e.preventDefault();
    if (loginPassNew !== loginPassRepeat) {
      alert("Login passwords do not match");
      return;
    }
    alert("Login password changed!");
  };

  return (
    <div>
      <div className="font-bold mb-2">Set Fund Password</div>
      <form onSubmit={setFundPassword} className="bg-white p-3 rounded shadow mb-4">
        <input type="text" value={mpesaName} onChange={e=>setMpesaName(e.target.value)} className="w-full border p-2 rounded mb-2" placeholder="Mpesa Name" required />
        <input type="tel" pattern="0[0-9]{9}" maxLength={10} value={mpesaNumber} onChange={e=>setMpesaNumber(e.target.value.replace(/[^0-9]/g,''))} className="w-full border p-2 rounded mb-2" placeholder="Mpesa Number e.g. 0712345678" required />
        <div className="relative mb-2">
          <input type={fundShow ? "text":"password"} minLength={6} maxLength={6} value={fundPass} onChange={e=>setFundPass(e.target.value)} className="w-full border p-2 rounded" placeholder="Fund Password (6 digits)" required />
          <span className="absolute right-2 top-2 cursor-pointer" onClick={()=>setFundShow(s=>!s)}>{fundShow ? "🙈":"👁️"}</span>
        </div>
        <div className="relative mb-2">
          <input type={fundShow ? "text":"password"} minLength={6} maxLength={6} value={fundPassRepeat} onChange={e=>setFundPassRepeat(e.target.value)} className="w-full border p-2 rounded" placeholder="Repeat Fund Password" required />
        </div>
        <button className="bg-primary text-white w-full p-2 rounded">Set Fund Password</button>
      </form>
      <div className="font-bold mb-2">Change Login Password</div>
      <form onSubmit={changeLoginPassword} className="bg-white p-3 rounded shadow">
        <div className="relative mb-2">
          <input type={loginShow ? "text":"password"} minLength={6} maxLength={6} value={loginPass} onChange={e=>setLoginPass(e.target.value)} className="w-full border p-2 rounded" placeholder="Current Password" required />
          <span className="absolute right-2 top-2 cursor-pointer" onClick={()=>setLoginShow(s=>!s)}>{loginShow ? "🙈":"👁️"}</span>
        </div>
        <div className="relative mb-2">
          <input type={loginShow ? "text":"password"} minLength={6} maxLength={6} value={loginPassNew} onChange={e=>setLoginPassNew(e.target.value)} className="w-full border p-2 rounded" placeholder="New Password" required />
        </div>
        <div className="relative mb-2">
          <input type={loginShow ? "text":"password"} minLength={6} maxLength={6} value={loginPassRepeat} onChange={e=>setLoginPassRepeat(e.target.value)} className="w-full border p-2 rounded" placeholder="Repeat New Password" required />
        </div>
        <button className="bg-primary text-white w-full p-2 rounded">Change Password</button>
      </form>
    </div>
  );
}