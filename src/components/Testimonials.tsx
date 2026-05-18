import { Star, Quote, Shield } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-24 px-4 md:px-8 bg-[#070707] font-sans border-t border-neutral-900 overflow-hidden relative">
      
      {/* Decorative luxury pattern */}
      <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#d4af37 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#d4af37]/4 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3.5">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#d4af37] font-semibold block">
            VERIFIED RESIDENTIAL LEGACY
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-semibold tracking-wide">
            Endorsements of Elite Distinction
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
        </div>

        {/* Testimonial Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#0b0b0b] border border-neutral-900 rounded-xl p-6 relative flex flex-col justify-between hover:border-[#d4af37]/40 hover:-translate-y-1 transition-all duration-300 shadow-2xl"
            >
              {/* Gold Quote Mark Deco */}
              <div className="absolute top-6 right-6 text-neutral-800">
                <Quote className="w-8 h-8 text-[#d4af37]/10" />
              </div>

              {/* Endorsement Star Rating */}
              <div className="flex items-center space-x-1 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-neutral-300 font-sans text-xs sm:text-sm leading-relaxed mb-6 font-light italic">
                "{testimonial.text}"
              </p>

              {/* Purchaser Profile */}
              <div className="flex items-center space-x-3.5 pt-4 border-t border-neutral-900">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-[#d4af37]/35"
                />
                <div>
                  <h4 className="text-xs font-semibold text-white tracking-wide">
                    {testimonial.name}
                  </h4>
                  <p className="text-[10px] text-[#d4af37] font-mono mt-0.5 uppercase tracking-wider">
                    {testimonial.role}
                  </p>
                  <span className="block text-[9px] text-neutral-500 font-sans mt-0.5">
                    Purchased: {testimonial.propertyPurchased}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Security / Privacy Trust Badge */}
        <div className="max-w-2xl mx-auto rounded-lg bg-neutral-950 p-4 border border-neutral-850 flex items-center justify-center space-x-3 text-center">
          <Shield className="w-4.5 h-4.5 text-[#d4af37] shrink-0" />
          <span className="text-[10px] sm:text-xs font-mono text-neutral-400 tracking-wider uppercase">
            All client credentials and banking transfers are secured with private family trusts of high confidentiality.
          </span>
        </div>

      </div>
    </section>
  );
}
