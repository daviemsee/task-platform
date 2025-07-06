import { useState } from "react";

// Dummy apps for tasks
const appNames = [
  "Facebook", "Facebook Lite", "WhatsApp", "Instagram", "Messenger", "TikTok", "Snapchat", "Twitter", "Telegram", "LinkedIn"
];

const packageOptions = [
  { name: "intern", label: "Intern", days: 2, tasks: 4, perTask: 100, deposit: 0 },
  { name: "job1", label: "Job 1", days: 365, tasks: 4, perTask: 25, deposit: 3000 },
  { name: "job2", label: "Job 2", days: 365, tasks: 5, perTask: 60, deposit: 8500 },
  { name: "job3", label: "Job 3", days: 365, tasks: 6, perTask: 150, deposit: 24000 },
  { name: "job4", label: "Job 4", days: 365, tasks: 10, perTask: 230, deposit: 60000, soon: true },
  { name: "job5", label: "Job 5", days: 365, tasks: 15, perTask: 270, deposit: 100000, soon: true },
  { name: "job6", label: "Job 6", days: 365, tasks: 20, perTask: 350, deposit: 200000, soon: true },
];

export default function TasksTab() {
  const [done, setDone] = useState([]);
  const [installing, setInstalling] = useState(null);

  const handleInstall = (app, idx) => {
    setInstalling(idx);
    setTimeout(() => {
      setDone(d => [...d, idx]);
      setInstalling(null);
    }, 4000);
  };

  return (
    <div>
      <div className="mb-2 font-bold">Today's Tasks</div>
      <div>
        {appNames.slice(0, 4).map((app, idx) => (
          <div key={app} className="flex items-center mb-2 bg-white rounded p-2 shadow">
            <div className="flex-1">{app}</div>
            {done.includes(idx) ? (
              <span className="text-green-500">✅ Installed</span>
            ) : installing === idx ? (
              <span className="text-blue-400 animate-pulse">Installing...</span>
            ) : (
              <button className="bg-primary text-white px-3 py-1 rounded" onClick={()=>handleInstall(app, idx)}>
                Install
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="font-bold mb-2">Packages</div>
        {packageOptions.map(pkg => (
          <div key={pkg.name} className="flex items-center justify-between bg-white rounded p-2 mb-2 shadow">
            <div>
              <div className="font-bold">{pkg.label}</div>
              <div className="text-xs">{pkg.tasks} tasks/day • KES {pkg.perTask}/task • Deposit: {pkg.deposit === 0 ? "Free" : "KES " + pkg.deposit}</div>
              <div className="text-xs">Duration: {pkg.days} days</div>
            </div>
            {pkg.soon ? (
              <div className="text-gray-400 text-xs">Opening Soon</div>
            ) : (
              <button className="bg-primary text-white px-2 py-1 rounded text-xs">
                {pkg.deposit === 0 ? "Active" : "Upgrade"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}