"use client";
import { useState, useEffect } from "react";
import { Users, Calendar, Clock, Check, X, Bell } from "lucide-react";

// Mock data until Prisma is fully integrated on the backend
const MOCK_RESERVATIONS = [
  { id: "SLM1024", name: "Rahul Sharma", phone: "+91 9876543210", guests: 4, date: "2026-05-10", time: "19:30", status: "PENDING" },
  { id: "SLM1025", name: "Priya Singh", phone: "+91 8765432109", guests: 2, date: "2026-05-10", time: "20:00", status: "CONFIRMED" },
  { id: "SLM1026", name: "Amit Kumar", phone: "+91 7654321098", guests: 6, date: "2026-05-11", time: "21:00", status: "PENDING" },
];

export default function AdminDashboard() {
  const [reservations, setReservations] = useState(MOCK_RESERVATIONS);

  const handleStatusChange = (id: string, newStatus: string) => {
    setReservations(reservations.map(r => r.id === id ? { ...r, status: newStatus } : r));
    // In a real app, hit /api/reservations/[id]
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <header className="bg-surface border-b border-outline-variant/20 p-6 flex justify-between items-center">
        <h1 className="font-display text-2xl tracking-[0.2em] text-primary uppercase">SALEEM ADMIN</h1>
        <div className="flex items-center gap-4">
          <Bell className="text-on-surface-variant hover:text-secondary cursor-pointer" />
          <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold">
            AD
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 flex flex-col gap-4">
          <button className="bg-surface-container-high p-4 text-left border-l-4 border-secondary text-primary font-bold">Reservations</button>
          <button className="bg-surface p-4 text-left text-on-surface-variant hover:bg-surface-container-high">Menu Items</button>
          <button className="bg-surface p-4 text-left text-on-surface-variant hover:bg-surface-container-high">Settings</button>
        </aside>

        <section className="md:col-span-3 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="font-display text-3xl text-primary">Recent Reservations</h2>
            <div className="bg-surface px-4 py-2 text-sm text-on-surface-variant border border-outline-variant/20">
              Total: {reservations.length}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {reservations.map((res) => (
              <div key={res.id} className="bg-surface p-6 border border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-primary">{res.name}</span>
                    <span className={`text-[10px] px-2 py-1 rounded-sm uppercase tracking-wider ${
                      res.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400' :
                      res.status === 'REJECTED' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {res.status}
                    </span>
                  </div>
                  <div className="text-sm text-on-surface-variant flex gap-4 flex-wrap">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {res.date}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {res.time}</span>
                    <span className="flex items-center gap-1"><Users size={14} /> {res.guests} Guests</span>
                    <span>{res.phone}</span>
                  </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  {res.status === 'PENDING' && (
                    <>
                      <button 
                        onClick={() => handleStatusChange(res.id, 'CONFIRMED')}
                        className="p-2 border border-green-500 text-green-500 hover:bg-green-500/10 flex-1 md:flex-none flex justify-center items-center gap-1"
                      >
                        <Check size={18} /> Accept
                      </button>
                      <button 
                        onClick={() => handleStatusChange(res.id, 'REJECTED')}
                        className="p-2 border border-red-500 text-red-500 hover:bg-red-500/10 flex-1 md:flex-none flex justify-center items-center gap-1"
                      >
                        <X size={18} /> Reject
                      </button>
                    </>
                  )}
                  <button className="px-4 py-2 bg-surface-container-high text-on-surface hover:text-primary transition-colors flex-1 md:flex-none">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
