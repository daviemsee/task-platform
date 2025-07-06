import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function validatePhone(phone) {
  return /^0\d{9}$/.test(phone);
}

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [show, setShow] = useState(false);
  const [referral, setReferral] = useState(""); // Prefill from link, readonly
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    if (!validatePhone(phone)) {
      setError("Phone number must start with 0 and have 10 digits.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be 6 characters.");
      return;
    }
    if (isRegister && password !== repeat) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (isRegister) {
        // Firebase does not allow phone only, so use phone@domain as email
        const email = `${phone}@app.com`;
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), {
          phone,
          referral,
          createdAt: serverTimestamp(),
          ip: "TODO:GET_IP", // Needs backend or cloud function to get IP
          role: "user",
          package: "intern",
          package_expiry: Date.now() + 2 * 24 * 60 * 60 * 1000,
          balance: 0,
          fundPasswordSet: false,
        });
        navigate("/");
      } else {
        const email = `${phone}@app.com`;
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center gap-6 mb-4">
        <button onClick={()=>setIsRegister(false)} className={!isRegister ? "font-bold" : ""}>Login</button>
        <button onClick={()=>setIsRegister(true)} className={isRegister ? "font-bold" : ""}>Register</button>
      </div>
      <form onSubmit={handleAuth}>
        <input
          type="tel"
          pattern="0[0-9]{9}"
          maxLength={10}
          value={phone}
          onChange={e=>setPhone(e.target.value.replace(/[^0-9]/g,''))}
          placeholder="Phone (e.g. 0712345678)"
          className="mb-2 w-full p-2 border rounded"
          required
        />
        <div className="mb-2 relative">
          <input
            type={show ? "text" : "password"}
            value={password}
            minLength={6}
            maxLength={6}
            onChange={e=>setPassword(e.target.value)}
            placeholder="Password (6 digits)"
            className="w-full p-2 border rounded"
            required
          />
          <span
            className="absolute right-2 top-2 cursor-pointer"
            onClick={()=>setShow(s=>!s)}
          >{show ? "🙈" : "👁️"}</span>
        </div>
        {isRegister && (
          <div className="mb-2 relative">
            <input
              type={show ? "text" : "password"}
              value={repeat}
              minLength={6}
              maxLength={6}
              onChange={e=>setRepeat(e.target.value)}
              placeholder="Repeat Password"
              className="w-full p-2 border rounded"
              required
            />
            <span
              className="absolute right-2 top-2 cursor-pointer"
              onClick={()=>setShow(s=>!s)}
            >{show ? "🙈" : "👁️"}</span>
          </div>
        )}
        {isRegister && (
          <input
            type="text"
            value={referral}
            readOnly
            placeholder="Referral code"
            className="mb-2 w-full p-2 border rounded bg-gray-100"
          />
        )}
        <button type="submit" disabled={loading} className="bg-blue-400 w-full text-white p-2 rounded">{isRegister ? "Register" : "Login"}</button>
      </form>
      {error && <div className="text-red-500 p-2">{error}</div>}
      {!isRegister && (
        <button className="mt-2 text-blue-500 underline">Forgot Password? Contact Support</button>
      )}
    </div>
  );
}