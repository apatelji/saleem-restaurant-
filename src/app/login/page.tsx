"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      
      if (!res.ok) {
        setMessage({ text: result.error || "An error occurred", type: "error" });
      } else {
        setMessage({ text: result.message || "Success!", type: "success" });
        if (isLogin) {
          window.location.href = "/dashboard";
        } else {
          setIsLogin(true); // switch to login after signup
          if (result.verifyLink) {
            setMessage({ text: `Success! For local testing, click here to verify: ${result.verifyLink}`, type: "verify" });
          }
        }
      }
    } catch (err) {
      setMessage({ text: "Network error", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 pt-24 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwOg3NIOIQMNeAX9ofp0F98JnmqkVPJoSNoJ0Gf2UZTwdZ44M1Ut7vAoH8ljHB3vPyM6IgNOSBeq_CLZAna4Ca1CwG2Y7HOyDRJjKFQJdKbZ6BpjiXkGldIGjbKa3hYQqyrirkL5L5LRgTOexl7flsUMxaO5mMxtnuYlWWKMRN4EA2GUPt9BPee87rI7rStZvplPDxlNh-5emp3HsH6Or8sItBp6jibTE8BQ07CB7y0LSGFt5ohfniLy4AvKC4u8cRwMw_hEhZPzbB"
          alt="Background"
          className="w-full h-full object-cover opacity-20 scale-105 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-surface/40 backdrop-blur-xl border border-secondary/20 p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl tracking-[0.2em] text-primary uppercase mb-2">Saleem</h1>
          <p className="text-sm tracking-widest text-secondary uppercase">
            {isLogin ? "Welcome Back" : "Join the Legacy"}
          </p>
        </div>

        {message.text && (
          <div className={`p-4 mb-6 border text-sm ${
            message.type === 'error' ? 'border-red-500/50 text-red-400 bg-red-500/10' : 
            message.type === 'verify' ? 'border-secondary/50 text-secondary bg-secondary/10 break-all' :
            'border-green-500/50 text-green-400 bg-green-500/10'
          }`}>
            {message.type === 'verify' ? (
              <div>
                Success! For local testing, please click here to verify your email:<br/><br/>
                <a href={message.text.split('verify: ')[1]} className="underline text-primary break-all hover:text-secondary">
                  {message.text.split('verify: ')[1]}
                </a>
              </div>
            ) : (
              message.text
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-2 relative pt-4">
                  <label className="text-xs tracking-[0.2em] text-on-surface-variant uppercase absolute top-0 left-0">Full Name</label>
                  <input required={!isLogin} name="name" type="text" className="w-full bg-transparent border-0 border-b border-secondary/30 focus:border-secondary focus:ring-0 px-0 py-2 font-display text-lg text-primary outline-none transition-colors" />
                </div>
                <div className="flex flex-col gap-2 relative pt-4">
                  <label className="text-xs tracking-[0.2em] text-on-surface-variant uppercase absolute top-0 left-0">Phone</label>
                  <input required={!isLogin} name="phone" type="tel" className="w-full bg-transparent border-0 border-b border-secondary/30 focus:border-secondary focus:ring-0 px-0 py-2 font-display text-lg text-primary outline-none transition-colors" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-2 relative pt-4">
            <label className="text-xs tracking-[0.2em] text-on-surface-variant uppercase absolute top-0 left-0">Email</label>
            <input required name="email" type="email" className="w-full bg-transparent border-0 border-b border-secondary/30 focus:border-secondary focus:ring-0 px-0 py-2 font-display text-lg text-primary outline-none transition-colors" />
          </div>

          <div className="flex flex-col gap-2 relative pt-4">
            <label className="text-xs tracking-[0.2em] text-on-surface-variant uppercase absolute top-0 left-0">Password</label>
            <input required name="password" type="password" className="w-full bg-transparent border-0 border-b border-secondary/30 focus:border-secondary focus:ring-0 px-0 py-2 font-display text-lg text-primary outline-none transition-colors" />
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="mt-4 w-full text-sm tracking-[0.2em] uppercase py-4 border border-secondary text-primary hover:bg-secondary hover:text-on-secondary transition-all duration-300 flex justify-center items-center h-14"
          >
            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? "Sign In" : "Create Account")}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            type="button"
            onClick={() => { setIsLogin(!isLogin); setMessage({text:'', type:''}); }}
            className="text-sm text-on-surface-variant hover:text-secondary transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
