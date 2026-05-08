import Navbar from "@/components/Navbar";
import DigitalMenu from "@/components/DigitalMenu";
import ReservationForm from "@/components/ReservationForm";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[100dvh] flex flex-col justify-end pb-24 pt-32 px-6 max-w-7xl mx-auto">
          <div className="absolute inset-0 -z-10 vignette-image h-full w-full overflow-hidden">
            <img
              alt="Cinematic Indian cuisine"
              className="w-full h-full object-cover object-center opacity-50 scale-105 animate-[pulse_20s_ease-in-out_infinite]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwOg3NIOIQMNeAX9ofp0F98JnmqkVPJoSNoJ0Gf2UZTwdZ44M1Ut7vAoH8ljHB3vPyM6IgNOSBeq_CLZAna4Ca1CwG2Y7HOyDRJjKFQJdKbZ6BpjiXkGldIGjbKa3hYQqyrirkL5L5LRgTOexl7flsUMxaO5mMxtnuYlWWKMRN4EA2GUPt9BPee87rI7rStZvplPDxlNh-5emp3HsH6Or8sItBp6jibTE8BQ07CB7y0LSGFt5ohfniLy4AvKC4u8cRwMw_hEhZPzbB"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          </div>
          
          <div className="flex flex-col gap-8 relative z-10 max-w-3xl md:pl-12">
            <div className="flex flex-col gap-2">
              <span className="text-secondary tracking-[0.3em] text-sm uppercase">Serving Since 1977</span>
              <h1 className="font-display text-5xl md:text-7xl text-primary uppercase leading-tight drop-shadow-2xl">
                Experience Authentic Taste & Luxury Dining
              </h1>
            </div>
            
            <div className="flex flex-col gap-4 md:flex-row md:gap-6 mt-4">
              <a href="#reservations" className="w-full md:w-auto text-center text-sm tracking-[0.2em] uppercase py-4 px-8 border border-secondary text-primary gold-interactive bg-transparent hover:bg-secondary/10 flex items-center justify-center gap-2">
                Book a Table
              </a>
              <a href="#menu" className="w-full md:w-auto text-center text-sm tracking-[0.2em] uppercase py-4 px-8 border border-outline-variant/50 text-on-surface-variant hover:text-primary hover:border-primary transition-all duration-300 flex items-center justify-center gap-2">
                View Menu
              </a>
              <a href="https://wa.me/919810570198" target="_blank" rel="noreferrer" className="w-full md:w-auto text-center text-sm tracking-[0.2em] uppercase py-4 px-8 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300 flex items-center justify-center gap-2">
                WhatsApp Order
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-8 md:col-start-3 flex flex-col gap-6 text-center">
              <span className="text-sm tracking-[0.2em] text-secondary uppercase">Our Heritage</span>
              <h2 className="font-display text-4xl md:text-5xl text-primary">A Legacy of Spices</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto font-light text-lg">
                Rooted in the royal kitchens of the Mughal era, Saleem brings a centuries-old culinary tradition to the modern palate. Every dish is a carefully crafted symphony of spices, slow-cooked to perfection in an atmosphere of refined minimalism. Serving Greater Kailash since 1977.
              </p>
            </div>
          </div>
        </section>

        <DigitalMenu />
        <ReservationForm />
      </main>

      <Footer />
    </>
  );
}
