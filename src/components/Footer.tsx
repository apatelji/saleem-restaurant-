export default function Footer() {
  return (
    <>
      <section id="location" className="py-24 px-6 max-w-7xl mx-auto border-t border-outline-variant/10 w-full">
        <div className="flex flex-col gap-16">
          <div className="text-center flex flex-col gap-2">
            <span className="text-sm tracking-[0.2em] text-secondary uppercase">Visit Our Space</span>
            <h2 className="font-display text-4xl md:text-5xl text-primary">Find Us</h2>
            <p className="text-on-surface-variant font-light max-w-xl mx-auto mt-2 text-lg">
              HS-24, Kailash Colony Market, Greater Kailash, New Delhi, Delhi 110048
            </p>
          </div>
          <div className="relative w-full aspect-square md:aspect-video border border-outline-variant/20 overflow-hidden group">
            <iframe
              allowFullScreen={false}
              className="absolute inset-0 w-full h-full grayscale invert opacity-80 contrast-125"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.606775688941!2d77.2393356!3d28.5515328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3cae235e2eb%3A0xc66579fc26da2011!2sSaleem&#39;s%20Restaurant!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              style={{ border: 0 }}
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border-2 border-secondary/0 group-hover:border-secondary/20 transition-all duration-500"></div>
          </div>
          <div className="flex justify-center">
            <a
              href="https://maps.app.goo.gl/g6z2eC4Z9T1"
              target="_blank"
              className="w-full md:w-auto text-center text-sm tracking-[0.2em] uppercase py-4 px-12 border border-secondary text-primary gold-interactive bg-transparent hover:bg-secondary/10 transition-all duration-300"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-surface-container-lowest border-t border-outline-variant/10">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 py-8 max-w-7xl mx-auto gap-4">
          <div className="font-display text-2xl text-primary uppercase tracking-[0.2em] text-center md:text-left">
            SALEEM
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            <a href="tel:01141631786" className="text-on-surface-variant text-xs tracking-widest uppercase hover:text-secondary transition-colors">Call: 01141631786</a>
            <a href="#" className="text-on-surface-variant text-xs tracking-widest uppercase hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="text-on-surface-variant text-xs tracking-widest uppercase hover:text-secondary transition-colors">Terms of Service</a>
          </nav>
          <div className="text-on-surface-variant text-center md:text-right text-xs tracking-widest">
            © 2024 SALEEM RESTAURANT. SERVING SINCE 1977.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/919810570198"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform duration-300 z-50 group"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </>
  );
}
