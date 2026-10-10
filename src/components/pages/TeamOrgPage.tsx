import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Code, 
  TrendingUp, 
  DollarSign, 
  UserCheck, 
  Headphones, 
  Layers, 
  ChevronRight, 
  Briefcase,
  GitBranch,
  Lock,
  Compass,
  CheckCircle2
} from 'lucide-react';

export const TeamOrgPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>('tech_lead');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] text-xs font-semibold text-[#8C533E]">
          <Users className="w-3.5 h-3.5" />
          <span>Management Structure & Organizational Design</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A]">
          Team & Organizational Structure
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5E50] leading-relaxed">
          Operational hierarchy, cross-functional collaboration channels, and governance principles based on the 12-person startup staffing specified in the college assignment.
        </p>
      </div>

      {/* 1. VISUAL ORGANIZATIONAL HIERARCHY CHART */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EDE8E0] shadow-sm space-y-10">
        <div className="flex items-center justify-between pb-4 border-b border-[#F5F2EB]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51]">
              Hierarchical Architecture
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Visual Reporting Tree
            </h2>
          </div>
          <span className="text-xs bg-[#FAF8F5] text-[#8C7E6D] px-3 py-1 rounded-xl border border-[#EAE3D8]">
            Click any role card to view delegated authority
          </span>
        </div>

        {/* Level 0: Founder / Coordinating Project Lead */}
        <div className="flex flex-col items-center">
          <div 
            onClick={() => setSelectedRole('lead')}
            className={`cursor-pointer max-w-md w-full bg-[#1A1A1A] text-white p-5 rounded-2xl shadow-lg border text-center transition-all hover:scale-105 ${
              selectedRole === 'lead' ? 'ring-4 ring-[#C86D51]/30 border-[#C86D51]' : 'border-[#333]'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#E07A5F] mb-1">
              Top Coordination & Governance
            </div>
            <h3 className="font-serif text-lg font-bold">
              Founder / Project Lead
            </h3>
            <p className="text-[11px] text-[#B5ABA0] mt-1">
              Strategy, Major Budget Approvals, Partnership Sign-offs & Inter-departmental Alignment
            </p>
          </div>

          {/* Central Stem */}
          <div className="w-0.5 h-8 bg-[#DDD5CB]" />
        </div>

        {/* Level 1: Functional Departments Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative">
          {/* Dept 1: Product & Engineering */}
          <div 
            onClick={() => setSelectedRole('eng')}
            className={`cursor-pointer p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
              selectedRole === 'eng' || selectedRole === 'tech_lead'
                ? 'bg-[#FAF6F0] border-[#C86D51] ring-2 ring-[#C86D51]/20'
                : 'bg-[#FAF8F5] border-[#EAE3D8] hover:bg-white'
            }`}
          >
            <div>
              <div className="flex items-center gap-1.5 text-[#C86D51] text-xs font-bold mb-2">
                <Code className="w-4 h-4" />
                <span>Product & Eng</span>
              </div>
              <h4 className="font-serif text-sm font-bold text-[#1A1A1A]">
                Engineering Division
              </h4>
              <p className="text-[11px] text-[#6B5E50] mt-1">
                7 Members (5 Developers + 1 AI Engineer + 1 UX Designer)
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#8C533E] mt-3 block">
              Lead: Technical Lead →
            </span>
          </div>

          {/* Dept 2: Marketing */}
          <div 
            onClick={() => setSelectedRole('marketing')}
            className={`cursor-pointer p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
              selectedRole === 'marketing'
                ? 'bg-[#FAF6F0] border-[#C86D51] ring-2 ring-[#C86D51]/20'
                : 'bg-[#FAF8F5] border-[#EAE3D8] hover:bg-white'
            }`}
          >
            <div>
              <div className="flex items-center gap-1.5 text-[#C86D51] text-xs font-bold mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Marketing</span>
              </div>
              <h4 className="font-serif text-sm font-bold text-[#1A1A1A]">
                Growth & Partners
              </h4>
              <p className="text-[11px] text-[#6B5E50] mt-1">
                1 Marketing Manager
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#8C533E] mt-3 block">
              Reports to Lead →
            </span>
          </div>

          {/* Dept 3: Finance */}
          <div 
            onClick={() => setSelectedRole('finance')}
            className={`cursor-pointer p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
              selectedRole === 'finance'
                ? 'bg-[#FAF6F0] border-[#C86D51] ring-2 ring-[#C86D51]/20'
                : 'bg-[#FAF8F5] border-[#EAE3D8] hover:bg-white'
            }`}
          >
            <div>
              <div className="flex items-center gap-1.5 text-[#C86D51] text-xs font-bold mb-2">
                <DollarSign className="w-4 h-4" />
                <span>Finance</span>
              </div>
              <h4 className="font-serif text-sm font-bold text-[#1A1A1A]">
                Financial Planning
              </h4>
              <p className="text-[11px] text-[#6B5E50] mt-1">
                1 Finance Manager
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#8C533E] mt-3 block">
              Controls Budget →
            </span>
          </div>

          {/* Dept 4: Human Resources */}
          <div 
            onClick={() => setSelectedRole('hr')}
            className={`cursor-pointer p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
              selectedRole === 'hr'
                ? 'bg-[#FAF6F0] border-[#C86D51] ring-2 ring-[#C86D51]/20'
                : 'bg-[#FAF8F5] border-[#EAE3D8] hover:bg-white'
            }`}
          >
            <div>
              <div className="flex items-center gap-1.5 text-[#C86D51] text-xs font-bold mb-2">
                <UserCheck className="w-4 h-4" />
                <span>Human Resources</span>
              </div>
              <h4 className="font-serif text-sm font-bold text-[#1A1A1A]">
                People & Culture
              </h4>
              <p className="text-[11px] text-[#6B5E50] mt-1">
                1 HR Manager
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#8C533E] mt-3 block">
              Talent Alignment →
            </span>
          </div>

          {/* Dept 5: Cybersecurity */}
          <div 
            onClick={() => setSelectedRole('security')}
            className={`cursor-pointer p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
              selectedRole === 'security'
                ? 'bg-[#FAF6F0] border-[#C86D51] ring-2 ring-[#C86D51]/20'
                : 'bg-[#FAF8F5] border-[#EAE3D8] hover:bg-white'
            }`}
          >
            <div>
              <div className="flex items-center gap-1.5 text-[#C86D51] text-xs font-bold mb-2">
                <Lock className="w-4 h-4" />
                <span>Cybersecurity</span>
              </div>
              <h4 className="font-serif text-sm font-bold text-[#1A1A1A]">
                Privacy & Audit
              </h4>
              <p className="text-[11px] text-[#6B5E50] mt-1">
                1 Security Specialist
              </p>
            </div>
            <span className="text-[10px] font-bold text-rose-700 mt-3 block">
              Direct Escalation Line →
            </span>
          </div>

          {/* Dept 6: Customer Experience */}
          <div 
            onClick={() => setSelectedRole('cx')}
            className={`cursor-pointer p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
              selectedRole === 'cx'
                ? 'bg-[#FAF6F0] border-[#C86D51] ring-2 ring-[#C86D51]/20'
                : 'bg-[#FAF8F5] border-[#EAE3D8] hover:bg-white'
            }`}
          >
            <div>
              <div className="flex items-center gap-1.5 text-[#C86D51] text-xs font-bold mb-2">
                <Headphones className="w-4 h-4" />
                <span>Customer Care</span>
              </div>
              <h4 className="font-serif text-sm font-bold text-[#1A1A1A]">
                Experience & Loops
              </h4>
              <p className="text-[11px] text-[#6B5E50] mt-1">
                1 CX Manager
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#8C533E] mt-3 block">
              Feedback to Product →
            </span>
          </div>
        </div>

        {/* Detailed Breakdown for Product & Engineering (Sub-tree) */}
        <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#EAE3D8] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[#C86D51]" />
              Product and Engineering Internal Sub-Reporting Structure
            </span>
            <span className="text-[10px] text-[#8C7E6D]">
              Technical Lead coordinates 4 developers + 2 cross-functional collaborators
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Tech Lead + 4 Developers */}
            <div className="bg-white p-4 rounded-xl border border-[#EDE8E0] space-y-2">
              <span className="font-bold text-[#1A1A1A] block">Technical Lead + 4 Software Developers</span>
              <p className="text-[11px] text-[#6B5E50] leading-relaxed">
                One developer is assigned lead responsibility to direct sprint backlogs, code reviews, and releases. The remaining 4 developers build modular components (Catalogue, Wardrobe, Calendar, Shopping Cart).
              </p>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-semibold inline-block">
                Direct Reporting to Tech Lead
              </span>
            </div>

            {/* AI Engineer */}
            <div className="bg-white p-4 rounded-xl border border-[#EDE8E0] space-y-2">
              <span className="font-bold text-[#1A1A1A] block">1 AI Engineer</span>
              <p className="text-[11px] text-[#6B5E50] leading-relaxed">
                Develops scoring mathematical equations, manages color harmony rules, and tests future LLM foundation model APIs. Collaborates directly with Engineering for data contracts.
              </p>
              <span className="text-[10px] bg-[#FAF6F0] text-[#8C533E] px-2 py-0.5 rounded font-semibold inline-block border border-[#E8DFC8]">
                Cross-Functional Collaboration
              </span>
            </div>

            {/* UX Designer */}
            <div className="bg-white p-4 rounded-xl border border-[#EDE8E0] space-y-2">
              <span className="font-bold text-[#1A1A1A] block">1 UX Designer</span>
              <p className="text-[11px] text-[#6B5E50] leading-relaxed">
                Conducts student user interviews, designs editorial mobile/desktop layouts, and ensures intuitive contrast and accessibility. Coordinates design tokens with developers.
              </p>
              <span className="text-[10px] bg-[#FAF6F0] text-[#8C533E] px-2 py-0.5 rounded font-semibold inline-block border border-[#E8DFC8]">
                Cross-Functional Collaboration
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE FOUR KEY MANAGEMENT DECISION CRITERIA */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51]">
            Organizational Governance
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-1">
            Core Management Decisions Explained
          </h2>
          <p className="text-xs text-[#7A6B5D] mt-2">
            Addressing the foundational questions of hierarchy, delegation, and power allocation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Decision 1: Who Reports to Whom */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8E0] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] text-[#C86D51] flex items-center justify-center font-serif font-bold text-lg">
              1
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
              Who Reports to Whom?
            </h3>
            <ul className="space-y-2 text-xs text-[#5C5245] leading-relaxed">
              <li>• <strong>Four Developers</strong> report directly to the assigned <strong>Technical Lead</strong> for daily standups, code merges, and sprint tasks.</li>
              <li>• <strong>AI Engineer & UX Designer</strong> collaborate alongside engineering while maintaining functional alignment with overall product strategy.</li>
              <li>• <strong>Functional Managers</strong> (Marketing, Finance, HR, CX) report directly to the <strong>Founder / Project Lead</strong>.</li>
              <li>• <strong>Cybersecurity Specialist</strong> has a direct independent reporting line to the Project Lead to ensure unbiased security veto power.</li>
            </ul>
          </div>

          {/* Decision 2: Which Departments */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8E0] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] text-[#C86D51] flex items-center justify-center font-serif font-bold text-lg">
              2
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
              Which Departments Are Formed?
            </h3>
            <p className="text-xs text-[#5C5245] leading-relaxed">
              The startup is structured into six focused functional departments:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#4A4237]">
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D8]">
                <strong>1. Product & Engineering:</strong> 7 personnel delivering technology.
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D8]">
                <strong>2. Marketing:</strong> Growth, user acquisition, brand campaigns.
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D8]">
                <strong>3. Finance:</strong> Budgeting, unit economics, runway monitoring.
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D8]">
                <strong>4. Human Resources:</strong> Team alignment, policies, hiring.
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D8]">
                <strong>5. Cybersecurity:</strong> Data privacy, audits, risk mitigation.
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D8]">
                <strong>6. Customer Experience:</strong> Student feedback, support procedures.
              </div>
            </div>
          </div>

          {/* Decision 3: Who Has Authority */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8E0] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] text-[#C86D51] flex items-center justify-center font-serif font-bold text-lg">
              3
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
              Who Has Authority & Veto Power?
            </h3>
            <ul className="space-y-2 text-xs text-[#5C5245] leading-relaxed">
              <li>• <strong>Founder / Project Lead:</strong> Holds ultimate authority over company vision, major resource allocation, pricing changes, and partnership agreements.</li>
              <li>• <strong>Technical Lead:</strong> Possesses authority over code repository merges, architecture standards, and daily task assignments.</li>
              <li>• <strong>Finance Manager:</strong> Controls expense processing and possesses authority to block expenditures that violate approved budget limits.</li>
              <li>• <strong>Cybersecurity Specialist:</strong> Possesses mandatory escalation authority to delay an unsafe software release if privacy or security standards are breached.</li>
            </ul>
          </div>

          {/* Decision 4: Centralized vs Delegated */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8E0] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] text-[#C86D51] flex items-center justify-center font-serif font-bold text-lg">
              4
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
              Centralization vs. Decentralization
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3D8]">
                <strong className="text-[#1A1A1A] block mb-1">Centralized Decisions:</strong>
                <ul className="space-y-1 text-[#5C5245]">
                  <li>• High-level strategic roadmap</li>
                  <li>• Major commercial pricing tiers</li>
                  <li>• Privacy & data compliance rules</li>
                  <li>• Capital expenditures & hiring headcount</li>
                </ul>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3D8]">
                <strong className="text-[#1A1A1A] block mb-1">Delegated Decisions:</strong>
                <ul className="space-y-1 text-[#5C5245]">
                  <li>• Component refactoring & bug fixes</li>
                  <li>• Daily visual UI palette decisions</li>
                  <li>• Social media post scheduling</li>
                  <li>• Individual customer dispute resolutions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
