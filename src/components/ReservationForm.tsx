"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Clock, Loader2 } from "lucide-react";

export default function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setSuccessData(result.reservation);
        (e.target as HTMLFormElement).reset();
      } else {
        alert(result.error || 'Something went wrong');
      }
    } catch (error) {
      alert('Network Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppLink = (data: any) => {
    const text = `Thank you for reserving with Saleem Restaurant.
Your reservation is confirmed.

Booking ID: #${data.bookingId}
Name: ${data.name}
Date: ${data.date}
Time: ${data.time}
Guests: ${data.guests}

We look forward to serving you.`;
    return `https://wa.me/919810570198?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="reservations" className="py-24 px-6 bg-background relative border-t border-outline-variant/10">
      <div className="max-w-3xl mx-auto flex flex-col gap-16">
        <div className="text-center flex flex-col gap-2">
          <span className="text-sm tracking-[0.2em] text-secondary uppercase">Secure Your Table</span>
          <h2 className="font-display text-4xl md:text-5xl text-primary">Reservations</h2>
          <p className="text-on-surface-variant font-light mt-2">
            Join us for an evening of understated elegance.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-surface p-8 md:p-12 border border-outline-variant/20 relative">
          <AnimatePresence>
            {successData && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-10 bg-surface/95 backdrop-blur flex flex-col items-center justify-center p-8 text-center border border-secondary"
              >
                <div className="w-16 h-16 rounded-full border-2 border-secondary flex items-center justify-center mb-4">
                  <span className="text-secondary text-2xl">✓</span>
                </div>
                <h3 className="font-display text-3xl text-primary mb-2">Reservation Confirmed</h3>
                <p className="text-on-surface-variant mb-6 text-lg">Booking ID: <span className="text-secondary">#{successData.bookingId}</span></p>
                
                {(successData.customerEmailUrl || successData.ownerEmailUrl) && (
                  <div className="bg-secondary/10 border border-secondary/50 p-4 mb-6 w-full text-left text-sm text-on-surface">
                    <p className="text-secondary font-bold mb-2">Local Testing Emails Sent:</p>
                    {successData.customerEmailUrl && <p>Customer Email: <a href={successData.customerEmailUrl} target="_blank" className="underline text-primary hover:text-secondary">View Email</a></p>}
                    {successData.ownerEmailUrl && <p className="mt-1">Owner Notification: <a href={successData.ownerEmailUrl} target="_blank" className="underline text-primary hover:text-secondary">View Email</a></p>}
                  </div>
                )}

                <div className="flex gap-4">
                  <button type="button" onClick={() => setSuccessData(null)} className="px-6 py-3 border border-outline-variant text-on-surface hover:border-primary transition-colors uppercase tracking-wider text-sm">
                    New Booking
                  </button>
                  <a href={getWhatsAppLink(successData)} target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#25D366] text-white uppercase tracking-wider text-sm flex items-center gap-2 hover:bg-[#20b858] transition-colors">
                    Get WhatsApp Pass
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2 relative pt-4">
              <label className="text-xs tracking-[0.2em] text-on-surface-variant uppercase absolute top-0 left-0">Name</label>
              <input required name="name" type="text" className="w-full bg-transparent border-0 border-b border-secondary/30 focus:border-secondary focus:ring-0 px-0 py-2 font-display text-xl text-primary outline-none gold-interactive" placeholder="Your full name" />
            </div>
            
            <div className="flex flex-col gap-2 relative pt-4">
              <label className="text-xs tracking-[0.2em] text-on-surface-variant uppercase absolute top-0 left-0">Phone</label>
              <input required name="phone" type="tel" className="w-full bg-transparent border-0 border-b border-secondary/30 focus:border-secondary focus:ring-0 px-0 py-2 font-display text-xl text-primary outline-none gold-interactive" placeholder="+91" />
            </div>

            <div className="flex flex-col gap-2 relative pt-4">
              <label className="text-xs tracking-[0.2em] text-on-surface-variant uppercase absolute top-0 left-0">Date</label>
              <div className="relative">
                <input required name="date" type="date" min={new Date().toISOString().split('T')[0]} className="w-full bg-transparent border-0 border-b border-secondary/30 focus:border-secondary focus:ring-0 px-0 py-2 font-display text-xl text-primary outline-none gold-interactive appearance-none" />
                <Calendar className="absolute right-0 top-3 text-secondary/50 pointer-events-none" size={20} />
              </div>
            </div>

            <div className="flex flex-col gap-2 relative pt-4">
              <label className="text-xs tracking-[0.2em] text-on-surface-variant uppercase absolute top-0 left-0">Time</label>
              <div className="relative">
                <select required name="time" className="w-full bg-transparent border-0 border-b border-secondary/30 focus:border-secondary focus:ring-0 px-0 py-2 font-display text-xl text-primary outline-none gold-interactive appearance-none">
                  <option value="" className="bg-surface">Select Time</option>
                  <option value="19:00" className="bg-surface text-primary">7:00 PM</option>
                  <option value="19:30" className="bg-surface text-primary">7:30 PM</option>
                  <option value="20:00" className="bg-surface text-primary">8:00 PM</option>
                  <option value="20:30" className="bg-surface text-primary">8:30 PM</option>
                  <option value="21:00" className="bg-surface text-primary">9:00 PM</option>
                  <option value="21:30" className="bg-surface text-primary">9:30 PM</option>
                </select>
                <Clock className="absolute right-0 top-3 text-secondary/50 pointer-events-none" size={20} />
              </div>
            </div>

            <div className="flex flex-col gap-2 relative pt-4 md:col-span-2">
              <label className="text-xs tracking-[0.2em] text-on-surface-variant uppercase absolute top-0 left-0">Guests</label>
              <div className="relative">
                <select required name="guests" className="w-full bg-transparent border-0 border-b border-secondary/30 focus:border-secondary focus:ring-0 px-0 py-2 font-display text-xl text-primary outline-none gold-interactive appearance-none">
                  <option value="2" className="bg-surface text-primary">2 Guests</option>
                  <option value="3" className="bg-surface text-primary">3 Guests</option>
                  <option value="4" className="bg-surface text-primary">4 Guests</option>
                  <option value="5+" className="bg-surface text-primary">5+ Guests</option>
                </select>
                <Users className="absolute right-0 top-3 text-secondary/50 pointer-events-none" size={20} />
              </div>
            </div>
            
            <div className="flex flex-col gap-2 relative pt-4 md:col-span-2">
              <label className="text-xs tracking-[0.2em] text-on-surface-variant uppercase absolute top-0 left-0">Special Requests</label>
              <input name="requests" type="text" className="w-full bg-transparent border-0 border-b border-secondary/30 focus:border-secondary focus:ring-0 px-0 py-2 font-display text-xl text-primary outline-none gold-interactive" placeholder="Any dietary requirements or occasions?" />
            </div>
          </div>

          <button 
            disabled={isSubmitting}
            type="submit" 
            className="mt-8 w-full text-sm tracking-[0.2em] uppercase py-5 px-8 border border-secondary text-primary gold-interactive bg-transparent hover:bg-secondary/10 transition-all duration-300 flex justify-center items-center h-16"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Request Reservation"}
          </button>
        </form>
      </div>
    </section>
  );
}
