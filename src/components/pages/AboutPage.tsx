import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Target, 
  HelpCircle, 
  Lightbulb, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  Layers,
  HeartHandshake,
  Zap,
  Globe
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. Header & Vision Statement */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] text-xs font-semibold text-[#8C533E]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fashion Technology Startup</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A]">
          About StyleSync
        </h1>
        <p className="text-base sm:text-lg text-[#5C5245] leading-relaxed">
          "Your Wardrobe. Your Style. Smarter Choices."
        </p>
        <p className="text-xs sm:text-sm text-[#7A6B5D] max-w-2xl mx-auto leading-relaxed">
          Bridging the gap between chaotic physical closets and intelligent outfit coordination. Designed for young professionals, creative leaders, and conscious consumers seeking style confidence without excessive spending.
        </p>
      </div>

      {/* 2. Problem We Solve (5 Real Pain Points) */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51]">
            Root Consumer Friction
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-1">
            The Five Problems We Solve
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              title: 'Morning Outfit Decision Paralysis',
              desc: 'Students and young employees spend 15–20 minutes daily debating what to wear, leading to unnecessary morning rush and stress.'
            },
            {
              num: '02',
              title: 'Occasion Uncertainty',
              desc: 'Finding outfits suited for specific event dress codes (placement presentations, campus fests, casual meetups) is confusing and time-consuming.'
            },
            {
              num: '03',
              title: 'Isolated Impulse Purchases',
              desc: 'Shoppers often buy fashionable items on impulse only to realize back home that the garment matches nothing in their existing wardrobe.'
            },
            {
              num: '04',
              title: 'Overwhelming Fashion Discovery',
              desc: 'Generic e-commerce platforms bombard users with millions of irrelevant products instead of curating cohesive, capsule-friendly ensembles.'
            },
            {
              num: '05',
              title: 'Budget Inefficiency & Textile Waste',
              desc: 'Consumers need smarter ways to re-wear and recombine existing garments instead of throwing money at single-use fast fashion.'
            },
            {
              num: '06',
              title: 'Fragmented Wardrobe Visibility',
              desc: 'Clothes get pushed to the back of wardrobes and forgotten. Without digital inventory visibility, people re-buy identical staple pieces.'
            }
          ].map((item) => (
            <div
              key={item.num}
              className="p-6 rounded-3xl bg-white border border-[#EDE8E0] shadow-sm hover:border-[#1A1A1A] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-2xl font-bold text-[#DCD4C8] mb-2 block">
                  {item.num}
                </span>
                <h3 className="font-serif text-base font-bold text-[#1A1A1A] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6B5E50] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. The StyleSync Solution */}
      <div className="bg-[#FAF6F0] rounded-3xl p-8 sm:p-12 border border-[#E8DFC8] space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C533E]">
            Our Technological Solution
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-1">
            The Digital Fashion Assistant
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5245] mt-3 leading-relaxed">
            StyleSync integrates personal digital wardrobe management with algorithmic outfit generation and curated commerce discovery. We treat styling as an optimization problem: maximizing aesthetic harmony and occasion appropriateness while minimizing budget expenditure and closet redundancy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {[
            { title: 'Digital Inventory', desc: 'Secure browser storage of existing owned apparel with color and seasonality tags.' },
            { title: 'Scoring Engine', desc: 'Rule-based multi-factor algorithms evaluating occasion, aesthetic, and color harmony.' },
            { title: 'Canvas Composer', desc: 'Mix owned pieces with affordable catalogue essentials on an interactive mannequin layer.' },
            { title: 'Calendar Sync', desc: 'Pre-schedule weekly looks to eliminate day-of dressing stress.' },
          ].map((sol, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-[#E5DACD] space-y-2">
              <h4 className="font-serif text-sm font-bold text-[#1A1A1A]">{sol.title}</h4>
              <p className="text-xs text-[#6B5E50] leading-relaxed">{sol.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Target Market & Value Proposition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Target Market */}
        <div className="bg-white rounded-3xl p-8 border border-[#EDE8E0] shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] text-xs font-semibold text-[#8C533E]">
            <Target className="w-3.5 h-3.5" /> Initial Segment
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            Target Demographic: 18–30 in India
          </h3>
          <p className="text-xs text-[#5C5245] leading-relaxed">
            Our beachhead market comprises undergraduate and postgraduate university students, management interns, and early-career corporate and creative professionals in Tier-1 and Tier-2 Indian cities (Delhi NCR, Bengaluru, Mumbai, Pune, Hyderabad, Jaipur).
          </p>
          <ul className="space-y-2 text-xs text-[#4A4237]">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51]"></span>
              <span><strong>Budget-Conscious:</strong> Value outfits between ₹800 and ₹3,500.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51]"></span>
              <span><strong>Style-Conscious:</strong> Highly active on visual media (Instagram, Pinterest).</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51]"></span>
              <span><strong>Time-Poor:</strong> Busy balancing coursework, interviews, and social events.</span>
            </li>
          </ul>
        </div>

        {/* Business Model */}
        <div className="bg-white rounded-3xl p-8 border border-[#EDE8E0] shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] text-xs font-semibold text-[#8C533E]">
            <TrendingUp className="w-3.5 h-3.5" /> Commercial Strategy
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            Four-Pillar Monetization Model
          </h3>
          <p className="text-xs text-[#5C5245] leading-relaxed">
            Designed for lean capital efficiency with scalable revenue streams:
          </p>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3D8]">
              <strong className="text-[#1A1A1A]">1. Affiliate Commissions:</strong> 8–15% commission on eligible apparel purchases completed via retailer partner links.
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3D8]">
              <strong className="text-[#1A1A1A]">2. Brand Sponsorships:</strong> Sponsored capsule placements from Indian sustainable and D2C fashion labels.
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3D8]">
              <strong className="text-[#1A1A1A]">3. Premium "StyleSync Pro":</strong> ₹199/month for unlimited virtual styling sessions, travel packing lists, and weather alerts.
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3D8]">
              <strong className="text-[#1A1A1A]">4. Retailer B2B Analytics:</strong> Anonymized trend forecasting insights shared with domestic fashion brands.
            </div>
          </div>
        </div>
      </div>

      {/* 5. Startup Roadmap & Scaling Architecture */}
      <div className="bg-[#1C1A18] text-white rounded-3xl p-8 sm:p-10 border border-[#38332E] shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C86D51] text-white text-[11px] font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" /> Technology Roadmap
        </div>
        <h3 className="font-serif text-2xl font-bold text-white">
          Product Architecture & Future Expansion
        </h3>
        <p className="text-xs sm:text-sm text-[#B5ABA0] leading-relaxed max-w-3xl">
          StyleSync is expanding its algorithmic curation with next-generation computer vision, automated silhouette background removal, and direct API partnerships with ethical fashion retailers. Our mission remains constant: helping users make intentional, high-confidence wardrobe decisions every single day.
        </p>

        <div className="pt-2 flex flex-wrap gap-4">
          <button
            onClick={() => navigateTo('business-plan')}
            className="py-3 px-6 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            Review Business Model <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => navigateTo('team')}
            className="py-3 px-6 rounded-xl bg-[#2D2824] hover:bg-[#3D352E] text-white text-xs font-bold uppercase tracking-wider border border-[#4A423A] transition-all"
          >
            Meet Our Leadership Team
          </button>
        </div>
      </div>
    </div>
  );
};
