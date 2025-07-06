import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import TasksTab from "../tabs/TasksTab";
import IncomeTab from "../tabs/IncomeTab";
import DepositTab from "../tabs/DepositTab";
import WithdrawTab from "../tabs/WithdrawTab";
import SettingsTab from "../tabs/SettingsTab";
import GiftTab from "../tabs/GiftTab";

const tabs = [
  { name: "Tasks", icon: "📱" },
  { name: "Income", icon: "💰" },
  { name: "Deposit", icon: "💳" },
  { name: "Withdraw", icon: "🏧" },
  { name: "Gift", icon: "🎁" },
  { name: "Settings", icon: "⚙️" },
];

export default function Dashboard() {
  const [tab, setTab] = useState("Tasks");

  return (
    <div className="min-h-screen bg-light-blue flex flex-col">
      <div className="flex items-center justify-between p-4">
        <div className="font-bold text-lg text-primary">TaskReward</div>
        <button onClick={()=>signOut(auth)} className="text-sm text-red-500">Logout</button>
      </div>
      <div className="flex justify-around bg-white rounded-lg mx-2 py-2 shadow mb-2">
        {tabs.map(t => (
          <button key={t.name} className={tab === t.name ? "font-bold text-primary" : ""} onClick={()=>setTab(t.name)}>
            <span className="text-xl">{t.icon}</span><br />
            <span className="text-xs">{t.name}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 p-2">
        {tab === "Tasks" && <TasksTab />}
        {tab === "Income" && <IncomeTab />}
        {tab === "Deposit" && <DepositTab />}
        {tab === "Withdraw" && <WithdrawTab />}
        {tab === "Gift" && <GiftTab />}
        {tab === "Settings" && <SettingsTab />}
      </div>
    </div>
  );
}