"use client";
import { useEffect, useState } from "react";
import { Loader2, LogOut, Calendar, Clock, Users } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/me').then(res => res.json()),
      fetch('/api/reservations/me').then(res => res.json())
    ])
      .then(([userData, resData]) => {
        if (userData.user) {
          setUser(userData.user);
          if (resData.reservations) {
            setReservations(resData.reservations);
          }
        } else {
          window.location.href = "/login";
        }
      })
      .catch(() => window.location.href = "/login")
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = "/";
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin text-secondary w-8 h-8" /></div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-32 px-6 pb-24">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-outline-variant/20">
            <div>
              <h1 className="font-display text-4xl text-primary">Welcome, {user.name}</h1>
              <p className="text-on-surface-variant mt-2">{user.email} | {user.phone}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm tracking-widest uppercase border border-outline-variant/50 px-6 py-3 hover:border-red-500 hover:text-red-500 transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="font-display text-2xl text-secondary uppercase tracking-widest">Your Reservations</h2>
            
            {reservations.length === 0 ? (
              <div className="bg-surface border border-outline-variant/20 p-8 text-center text-on-surface-variant">
                You have no upcoming reservations.
                <br/><br/>
                <a href="/#reservations" className="text-secondary hover:underline">Book a table now</a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reservations.map((res: any) => (
                  <div key={res.id} className="bg-surface border border-outline-variant/20 p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
                      <h3 className="font-display text-xl text-primary">Booking #{res.bookingId}</h3>
                      <span className={`text-xs px-2 py-1 uppercase tracking-wider ${
                        res.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400' :
                        res.status === 'REJECTED' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {res.status}
                      </span>
                    </div>
                    <div className="text-sm text-on-surface-variant flex flex-col gap-2">
                      <span className="flex items-center gap-2"><Calendar size={16} className="text-secondary"/> {res.date}</span>
                      <span className="flex items-center gap-2"><Clock size={16} className="text-secondary"/> {res.time}</span>
                      <span className="flex items-center gap-2"><Users size={16} className="text-secondary"/> {res.guests} Guests</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
