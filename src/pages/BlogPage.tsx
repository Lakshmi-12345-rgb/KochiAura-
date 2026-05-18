import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import SEO from '../components/SEO';

const BLOG_POSTS = [
  {
    id: '1',
    title: 'The Silent Appreciation: Why Fort Kochi Heritage Villas are Invaluable',
    excerpt: 'Beyond bricks and mortar, heritage properties in Fort Kochi represent a diminishing stock of Dutch and Portuguese history...',
    category: 'Market Insights',
    author: 'Reji K.',
    date: 'May 15, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Waterfront Penthouses vs. Gated Villas: The HNI Dilemma',
    excerpt: 'The shift in Kochi’s luxury market shows an interesting trend between high-rise living and private estates...',
    category: 'Lifestyle',
    author: 'Aura Editorial',
    date: 'May 10, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Integrating Smart Home Automation in Traditional Kerala Architecture',
    excerpt: 'How we are invisibly integrating futuristic smart-grid tech into Vastu-compliant historical structures...',
    category: 'Architecture',
    author: 'Design Desk',
    date: 'May 02, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=800'
  }
];

export default function BlogPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#070707] text-neutral-300">
      <SEO 
        title="Luxury Real Estate Blog Kochi | Aura Kochi Chronicles"
        description="Stay updated with Kochi's real estate trends, luxury lifestyle guides, and architectural news. Expert market insights by Aura Kochi."
      />

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden bg-neutral-950/50 border-b border-neutral-900">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-[#d4af37]/10 px-4 py-2 rounded-full border border-[#d4af37]/30"
          >
            <BookOpen className="w-4 h-4 text-[#d4af37]" />
            <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest">Aura Chronicles</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight italic">
            Market <span className="text-[#d4af37]">Perspectives</span>
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm font-sans leading-relaxed">
            Thought leadership on Kochi's real estate evolution, architectural ethics, and the future of luxury acquisitions.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {BLOG_POSTS.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Bar */}
      <section className="py-20 bg-[#0a0a0a] border-y border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
           <h3 className="text-2xl font-serif text-white italic">Join our Exclusive Brief</h3>
           <p className="text-sm text-neutral-500 font-sans max-w-md mx-auto">
             Get the first brief on off-market listings and monthly market sentiment reports delivered to your inbox.
           </p>
           <div className="flex max-w-md mx-auto bg-neutral-900/50 border border-neutral-800 p-1 rounded-2xl">
              <input 
                type="email" 
                placeholder="Your private email" 
                className="flex-1 bg-transparent px-4 text-xs outline-none text-white border-0 focus:ring-0"
              />
              <button className="px-6 py-3 bg-[#d4af37] text-black font-bold font-mono text-[9px] uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-95 transition-all">
                Subscribe
              </button>
           </div>
        </div>
      </section>
    </div>
  );
}

interface BlogCardProps {
  post: any;
  key?: React.Key;
}

function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.article 
      whileHover={{ y: -10 }}
      className="flex flex-col h-full bg-neutral-950 border border-neutral-900 rounded-3xl overflow-hidden group hover:border-[#d4af37]/30 transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover brightness-75 group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-[#d4af37]/30 text-[#d4af37] text-[9px] font-mono uppercase tracking-widest rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
            <span className="flex items-center"><Calendar className="w-3 h-3 mr-1.5" /> {post.date}</span>
            <span className="flex items-center"><Clock className="w-3 h-3 mr-1.5" /> {post.readTime}</span>
          </div>
          <h2 className="text-xl font-serif text-white group-hover:text-[#d4af37] transition-colors leading-tight italic">
            {post.title}
          </h2>
          <p className="text-xs leading-relaxed text-neutral-500 font-sans line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <button className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37] border-b border-[#d4af37]/20 pb-1 w-fit hover:border-[#d4af37] transition-all">
          <span>Read Full Brief</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.article>
  );
}
