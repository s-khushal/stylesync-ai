import React, { useState } from 'react';
import { 
  Target, 
  Users, 
  Cpu, 
  Calendar, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  BarChart3, 
  Briefcase,
  Layers,
  ArrowRight
} from 'lucide-react';

export const BusinessPlanPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | '1' | '2' | '3' | '4' | '5' | '6'>('all');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] text-xs font-semibold text-[#8C533E]">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Coursework Planning Framework</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A]">
          StyleSync Business Plan
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5E50] leading-relaxed">
          Structured strictly according to the six fundamental management planning components for the Essentials of Management business project.
        </p>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { id: 'all', label: 'All 6 Components' },
          { id: '1', label: '1. Strategic Objectives' },
          { id: '2', label: '2. Target Market' },
          { id: '3', label: '3. Resources Required' },
          { id: '4', label: '4. Implementation Timeline' },
          { id: '5', label: '5. Business Risks' },
          { id: '6', label: '6. Contingencies & KPIs' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`text-xs px-4 py-2 rounded-xl font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-[#1A1A1A] text-white shadow-md'
                : 'bg-white text-[#5C5245] border border-[#DDD5CB] hover:bg-[#FAF8F5]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* COMPONENT 1: OBJECTIVES */}
      {(activeTab === 'all' || activeTab === '1') && (
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EDE8E0] shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#F5F2EB]">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#C86D51]">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51]">
                Management Component 01
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                1. Organizational Objectives
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                Core Strategic Mission
              </h3>
              <p className="text-xs text-[#5C5245] leading-relaxed">
                Our objective is to create an accessible, personalized fashion assistant that helps users discover outfits, organize digital wardrobes, and make budget-conscious, confident fashion choices every single day.
              </p>
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE3D8] text-xs">
                <strong className="text-[#1A1A1A] block mb-1">Guiding Principle:</strong>
                "Maximize wardrobe utility before encouraging unnecessary consumer purchases."
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                Initial Operational Goals
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { title: 'Launch Working MVP', desc: 'Deploy an interactive local prototype to validate core user journeys without external paid dependencies.' },
                  { title: 'Audience Utility Validation', desc: 'Verify whether college students and young professionals actively solve their morning dressing dilemmas.' },
                  { title: 'Algorithmic Refinement', desc: 'Continuously improve multi-factor recommendation accuracy and harmony across occasions and budgets.' },
                  { title: 'Encourage Reusability', desc: 'Drive repeat usage metrics where users save, revisit, and synchronize outfits into calendar schedules.' },
                  { title: 'Establish Commercial Partnerships', desc: 'Explore affiliate agreements with emerging Indian sustainable fashion labels.' },
                  { title: 'Academic Rigor', desc: 'Demonstrate principles of planning, organizing, staffing, and controlling from Essentials of Management.' },
                ].map((g, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D8] space-y-1">
                    <span className="font-bold text-[#1A1A1A] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      {g.title}
                    </span>
                    <p className="text-[11px] text-[#6B5E50]">{g.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* COMPONENT 2: TARGET MARKET */}
      {(activeTab === 'all' || activeTab === '2') && (
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EDE8E0] shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#F5F2EB]">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#C86D51]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51]">
                Management Component 02
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                2. Target Market Analysis
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 bg-[#FAF8F5] p-6 rounded-2xl border border-[#EAE3D8] space-y-3">
              <span className="text-xs font-bold uppercase text-[#C86D51]">Primary Customer Segment</span>
              <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                Young Urban Consumers (Ages 18–30)
              </h3>
              <p className="text-xs text-[#5C5245] leading-relaxed">
                Undergraduate and postgraduate students, MBA candidates, corporate trainees, and entry-level professionals across major university hubs in India.
              </p>
              <div className="pt-2 border-t border-[#E0D7CC] text-xs text-[#4A4237] space-y-1">
                <div>• Geography: Tier-1 & Tier-2 Indian Urban Centers</div>
                <div>• Budget Capacity: ₹800 – ₹3,500 per garment</div>
                <div>• Primary Devices: Mobile Web & Modern Desktops</div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                Validated Customer Needs & Value Proposition
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {[
                  { need: 'Affordable Fashion Suggestions', sol: 'Stylist budget slider filters options strictly within student pocket limits.' },
                  { need: 'Quick Morning Decisions', sol: 'Pre-assembled ensembles remove the 20-minute daily decision fatigue.' },
                  { need: 'Context & Occasion Fit', sol: 'Specific dress codes for placement interviews, festivals, parties, and everyday lectures.' },
                  { need: 'Convenient Closet Tracking', sol: 'Personal digital wardrobe to prevent buying duplicates of white shirts or blue jeans.' },
                  { need: 'Aesthetic Discovery', sol: 'Harmonious style recommendations combining colors, silhouettes, and layers.' },
                  { need: 'Transparent Data Privacy', sol: 'Private browser storage ensuring uploaded personal clothing photos are never leaked.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[#EDE8E0] bg-[#FAF8F5] space-y-1">
                    <span className="font-bold text-[#1A1A1A] block">Customer Need: {item.need}</span>
                    <span className="text-[#8C533E] font-medium block text-[11px]">StyleSync Response: {item.sol}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* COMPONENT 3: RESOURCES REQUIRED */}
      {(activeTab === 'all' || activeTab === '3') && (
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EDE8E0] shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#F5F2EB]">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#C86D51]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51]">
                Management Component 03
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                3. Resources Required (Human & Technical)
              </h2>
            </div>
          </div>

          {/* Specified Staffing (12 Members) */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-3">
              Prescribed Human Staffing (12 Core Team Roles)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {[
                { count: '5', role: 'Software Developers', focus: 'Frontend architecture, component modularity, state management, and testing. One designated as Tech Lead.' },
                { count: '1', role: 'AI Engineer', focus: 'Rule-based scoring algorithms, multi-factor styling math, and future Gemini LLM endpoints.' },
                { count: '1', role: 'UX Designer', focus: 'Editorial visual hierarchy, design system, user research, wireframes, and usability testing.' },
                { count: '1', role: 'Marketing Manager', focus: 'Campus ambassador campaigns, social proof, influencer seeding, and affiliate partnerships.' },
                { count: '1', role: 'Finance Manager', focus: 'Unit economics, server cost modeling, pricing tiers, and budget compliance tracking.' },
                { count: '1', role: 'HR Manager', focus: 'Role clarity, onboarding, developer talent acquisition, and performance culture.' },
                { count: '1', role: 'Cybersecurity Specialist', focus: 'Client storage boundaries, vulnerability review, safe uploads, and independent reporting.' },
                { count: '1', role: 'Customer Service Manager', focus: 'User feedback triage, bug ticketing, satisfaction reporting, and product feedback loops.' },
              ].map((staff, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D8] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-serif font-bold text-[#C86D51]">{staff.count}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7E6D]">Startup Staff</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#1A1A1A]">{staff.role}</h4>
                  <p className="text-[11px] text-[#6B5E50] leading-relaxed">{staff.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Resources: Available vs. Future */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-[#F5F2EB]">
            <div className="p-6 rounded-2xl bg-[#F4F9F5] border border-emerald-200 space-y-3 text-xs">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Resources Currently Available (Current MVP)
              </span>
              <ul className="space-y-2 text-[#2C4A33] leading-relaxed">
                <li>• <strong>Development Workstations:</strong> Local Node.js 24 and Vite build tools.</li>
                <li>• <strong>Frontend Stack:</strong> React 19, TypeScript, Tailwind CSS, Lucide icons.</li>
                <li>• <strong>Catalogue & Media:</strong> Curated 28-piece demo product database with Indian Rupee pricing.</li>
                <li>• <strong>Storage Infrastructure:</strong> Browser LocalStorage with zero cloud hosting bills.</li>
                <li>• <strong>Algorithm:</strong> Client-side multi-factor scoring recommendation engine.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#E8DFC8] space-y-3 text-xs">
              <span className="text-xs font-bold text-[#8C533E] uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#C86D51]" />
                Future Resources to be Acquired
              </span>
              <ul className="space-y-2 text-[#5C5245] leading-relaxed">
                <li>• <strong>Foundation AI API Budget:</strong> Token allocation for Gemini 2.5 Flash / Vision multimodal processing.</li>
                <li>• <strong>Cloud Infrastructure:</strong> AWS/Vercel production deployment and Postgres database.</li>
                <li>• <strong>Device Testing Lab:</strong> Cross-device testing across iOS and diverse Android screen ratios.</li>
                <li>• <strong>Commercial Affiliates:</strong> Approved developer API agreements with Myntra/Tata CliQ/Ajio.</li>
                <li>• <strong>Marketing Budget:</strong> Seed capital for university campus launch activations.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* COMPONENT 4: IMPLEMENTATION TIMELINE */}
      {(activeTab === 'all' || activeTab === '4') && (
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EDE8E0] shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#F5F2EB]">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#C86D51]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51]">
                Management Component 04
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                4. Implementation Timeline (Proposed Milestones)
              </h2>
            </div>
          </div>

          <p className="text-xs text-[#8C7E6D]">
            Note: Presented as proposed forward-looking milestones for business strategy evaluation, not completed historical claims.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                time: 'MONTH 1',
                phase: 'Research & Prototype',
                status: 'Completed for Project Demo',
                color: 'border-[#1A1A1A] bg-[#FAF8F5]',
                tasks: [
                  'Research 18–30 student customer habits',
                  'Finalize product functional requirements',
                  'Draft editorial UI visual direction',
                  'Architect client data models & slots',
                  'Populate 28-item catalogue in INR'
                ]
              },
              {
                time: 'MONTH 3',
                phase: 'MVP Launch',
                status: 'Current Operational Stage',
                color: 'border-[#C86D51] bg-[#FDF8F5]',
                tasks: [
                  'Complete all 12 operational pages',
                  'Implement digital wardrobe with image upload',
                  'Implement rule-based AI stylist with swapping',
                  'Test responsive desktop/mobile layouts',
                  'Present interactive MVP to college professor'
                ]
              },
              {
                time: 'MONTH 6',
                phase: 'Validation & Improvement',
                status: 'Proposed Milestone',
                color: 'border-[#EAE3D8] bg-white',
                tasks: [
                  'Collect feedback from pilot campus test group',
                  'Fine-tune occasion scoring weights',
                  'Fix usability edge cases on mobile views',
                  'Measure retention and repeat look saves',
                  'Initiate outreach with D2C apparel brands'
                ]
              },
              {
                time: 'MONTH 12',
                phase: 'Expansion & Scale',
                status: 'Proposed Milestone',
                color: 'border-[#EAE3D8] bg-white',
                tasks: [
                  'Evaluate production Gemini AI multimodal integration',
                  'Roll out verified affiliate commerce links',
                  'Assess demand for StyleSync Pro subscription',
                  'Implement hardened database backend and auth',
                  'Formulate evidence-based Series-A expansion plan'
                ]
              }
            ].map((milestone, idx) => (
              <div key={idx} className={`p-6 rounded-2xl border ${milestone.color} space-y-3 flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif text-sm font-bold text-[#C86D51]">{milestone.time}</span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#E0D7CC] font-semibold">{milestone.status}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1A1A1A] mt-2 mb-3">
                    {milestone.phase}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#5C5245]">
                    {milestone.tasks.map((t, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#C86D51] font-bold">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* COMPONENT 5: BUSINESS RISKS */}
      {(activeTab === 'all' || activeTab === '5') && (
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EDE8E0] shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#F5F2EB]">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#C86D51]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51]">
                Management Component 05
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                5. Comprehensive Business Risk Assessment
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {[
              {
                id: 'R1',
                title: 'Recommendation Quality Mismatch',
                severity: 'High',
                desc: 'Stylist recommends clashing aesthetics or inappropriate silhouettes for formal interviews, damaging user trust.'
              },
              {
                id: 'R2',
                title: 'Low User Adoption & Churn',
                severity: 'High',
                desc: 'Users test the app once but fail to digitize their wardrobe due to perceived data-entry friction.'
              },
              {
                id: 'R3',
                title: 'Competition from E-Commerce Giants',
                severity: 'Medium',
                desc: 'Established players like Myntra or Ajio launch native AI stylist features backed by massive ad budgets.'
              },
              {
                id: 'R4',
                title: 'Wardrobe Photo Privacy Concerns',
                severity: 'High',
                desc: 'Users hesitate to upload personal clothing photos fearing privacy leaks or server exploitation.'
              },
              {
                id: 'R5',
                title: 'Cloud API Cost Overhead',
                severity: 'Medium',
                desc: 'Surging multimodal AI token calls create negative unit economics if monetized purely via free tiers.'
              },
              {
                id: 'R6',
                title: 'Outdated Catalogue Information',
                severity: 'Medium',
                desc: 'Partner inventory sells out or prices change, leading to broken checkout links and frustrated shoppers.'
              },
              {
                id: 'R7',
                title: 'Retailer Partnership Friction',
                severity: 'Medium',
                desc: 'Difficulty negotiating direct affiliate agreements before reaching substantial active user volume.'
              },
              {
                id: 'R8',
                title: 'Bootstrapped Budget Constraints',
                severity: 'High',
                desc: 'Limited early runway preventing heavy performance marketing or extensive mobile native dev.'
              },
            ].map((risk) => (
              <div key={risk.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D8] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1A1A1A]">{risk.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    risk.severity === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {risk.severity} Severity
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-[#1A1A1A]">{risk.title}</h4>
                <p className="text-[11px] text-[#6B5E50] leading-relaxed">{risk.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* COMPONENT 6: CONTINGENCY PLANS & PROPOSED KPIS */}
      {(activeTab === 'all' || activeTab === '6') && (
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EDE8E0] shadow-sm space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-[#F5F2EB]">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#C86D51]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51]">
                Management Component 06
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                6. Practical Contingency Responses & Key Performance Indicators
              </h2>
            </div>
          </div>

          {/* Contingency Matrix */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-3">
              Contingency Action Matrix
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#EAE3D8] text-[#8C7E6D] uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Identified Risk</th>
                    <th className="py-3 px-4">Management Contingency Response</th>
                    <th className="py-3 px-4">Responsible Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F2EB]">
                  {[
                    { risk: 'Poor Recommendation Quality', sol: 'Implement immediate user feedback loop, adjust multi-factor weight scoring, and enforce curated stylistic rules.', owner: 'AI Engineer & Tech Lead' },
                    { risk: 'Low User Adoption', sol: 'Conduct structured student interviews on campus, simplify upload friction with preset tags, and run styling workshops.', owner: 'UX Designer & Marketing Manager' },
                    { risk: 'Privacy & Upload Concerns', sol: 'Enforce local device storage, zero cloud transmission without consent, and one-click data purge buttons.', owner: 'Cybersecurity Specialist' },
                    { risk: 'AI Service Downtime / Cost Outage', sol: 'Deploy deterministic local rule-based scoring engine as an instantaneous, zero-cost fallback.', owner: 'Technical Lead' },
                    { risk: 'Budget & Resource Constraints', sol: 'Ruthlessly prioritize the web MVP, eliminate non-essential paid tooling, and utilize open-source frameworks.', owner: 'Finance Manager & Project Lead' },
                    { risk: 'Outdated Product Information', sol: 'Clearly label demo data, implement automated inventory web-scraping checks, and provide product swap alternatives.', owner: 'Software Developers' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-[#FAF8F5]">
                      <td className="py-3 px-4 font-bold text-[#1A1A1A]">{row.risk}</td>
                      <td className="py-3 px-4 text-[#5C5245] leading-relaxed">{row.sol}</td>
                      <td className="py-3 px-4 text-[#8C533E] font-semibold">{row.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Proposed KPIs */}
          <div className="pt-4 border-t border-[#F5F2EB]">
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-1">
              Future Key Performance Indicators (Target Measurement Metrics)
            </h3>
            <p className="text-xs text-[#8C7E6D] mb-4">
              Presented as forward-looking performance metrics to evaluate post-launch traction:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
              {[
                { metric: 'Onboarding Completion', target: '≥ 75%', note: 'Users setting initial style preferences' },
                { metric: 'Outfits Generated', target: '≥ 5 per user', note: 'Engagement with stylist engine' },
                { metric: 'Outfits Saved', target: '≥ 2 per user', note: 'Indicator of genuine stylistic value' },
                { metric: '30-Day Retention', target: '≥ 40%', note: 'Repeat visits for weekly scheduling' },
                { metric: 'User Satisfaction', target: '≥ 4.5 / 5', note: 'Measured via feedback module' },
                { metric: 'Affiliate CTR', target: '≥ 8.5%', note: 'Clicks to external product partners' },
              ].map((kpi, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D8] space-y-1">
                  <span className="text-[10px] font-bold text-[#8C7E6D] uppercase block">{kpi.metric}</span>
                  <span className="font-serif text-lg font-bold text-[#1A1A1A] block">{kpi.target}</span>
                  <span className="text-[10px] text-[#6B5E50] block">{kpi.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
