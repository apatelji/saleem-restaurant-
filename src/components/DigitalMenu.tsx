"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuData } from "@/lib/data";

export default function DigitalMenu() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].category);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "VEG" | "NON_VEG">("ALL");

  const categories = menuData.map((d) => d.category);

  // Get current category data
  const currentCategoryData = menuData.find((d) => d.category === activeCategory);
  
  // Filter items
  let displayItems = currentCategoryData ? currentCategoryData.items : [];
  
  // Apply Search
  if (searchQuery) {
    displayItems = menuData.flatMap(cat => cat.items).filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply Veg/Non-Veg
  if (filterType !== "ALL") {
    displayItems = displayItems.filter(item => item.type === filterType);
  }

  return (
    <section id="menu" className="py-24 px-6 bg-surface-container-low border-y border-outline-variant/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="text-center flex flex-col gap-2">
          <span className="text-sm tracking-[0.2em] text-secondary uppercase">The Curation</span>
          <h2 className="font-display text-4xl md:text-5xl text-primary">Digital Menu</h2>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Categories Slider */}
          <div className="flex overflow-x-auto gap-4 pb-2 w-full md:w-auto no-scrollbar border-b border-outline-variant/20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setSearchQuery(""); }}
                className={`whitespace-nowrap px-4 py-2 text-sm tracking-widest uppercase transition-colors border-b-2 ${
                  activeCategory === cat && !searchQuery
                    ? "border-secondary text-secondary"
                    : "border-transparent text-on-surface-variant hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search dishes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface border border-outline-variant/20 px-4 py-2 text-primary focus:border-secondary outline-none w-full md:w-64"
            />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="bg-surface border border-outline-variant/20 px-4 py-2 text-primary focus:border-secondary outline-none"
            >
              <option value="ALL">All</option>
              <option value="VEG">Veg</option>
              <option value="NON_VEG">Non-Veg</option>
            </select>
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {displayItems.length > 0 ? displayItems.map((item, idx) => (
              <motion.div
                key={item.name + idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-surface p-6 border border-outline-variant/20 flex flex-col gap-4 gold-interactive relative overflow-hidden group"
              >
                {item.isChefRecommended && (
                  <div className="absolute top-0 right-0 bg-secondary text-on-secondary text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                    Chef's Special
                  </div>
                )}
                
                <div className="flex justify-between items-start border-b border-secondary/30 pb-2 gap-4">
                  <h3 className="font-display text-xl text-primary flex items-start gap-2">
                    <span className={`min-w-3 h-3 rounded-full mt-1.5 ${item.type === 'VEG' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {item.name}
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="font-display text-xl text-secondary block">₹{item.priceFull}</span>
                    {item.priceHalf && <span className="text-sm text-on-surface-variant block mt-1">Half: ₹{item.priceHalf}</span>}
                  </div>
                </div>
                {item.description && (
                  <p className="text-base text-on-surface-variant font-light">
                    {item.description}
                  </p>
                )}
              </motion.div>
            )) : (
              <div className="col-span-full text-center text-on-surface-variant py-12">
                No items found matching your criteria.
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
