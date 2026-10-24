import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles,
  ShieldCheck,
  List
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { submitFeedback, feedbackList, showToast } = useApp();

  const [name, setName] = useState('Aanya Sharma');
  const [email, setEmail] = useState('aanya.sharma@campus.ac.in');
  const [category, setCategory] = useState<'Stylist Feedback' | 'Feature Request' | 'Catalogue Bug' | 'Business Inquiry' | 'General'>('Stylist Feedback');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
    if (!message.trim() || message.trim().length < 10) newErrors.message = 'Please provide at least 10 characters of feedback';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix validation errors before submitting.', 'error');
      return;
    }

    submitFeedback({
      name: name.trim(),
      email: email.trim(),
      category,
      message: message.trim()
    });

    setSubmittedSuccessfully(true);
    setMessage('');
    setTimeout(() => {
      setSubmittedSuccessfully(false);
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] text-xs font-semibold text-[#8C533E]">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Customer Experience & Feedback Loop</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A]">
          Contact & Evaluation Feedback
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5E50] leading-relaxed">
          Have observations, bug reports, or partnership ideas for StyleSync? Submit your thoughts below; all responses persist in LocalStorage for demo evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Interactive Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8E0] shadow-sm space-y-6">
          <div className="pb-4 border-b border-[#F5F2EB]">
            <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
              Send Us Your Thoughts
            </h2>
            <p className="text-xs text-[#8C7E6D] mt-0.5">
              Managed under the Customer Experience department protocol.
            </p>
          </div>

          {submittedSuccessfully && (
            <div className="p-4 rounded-2xl bg-[#F4F9F5] border border-emerald-200 text-emerald-950 flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <div className="text-xs">
                <strong>Feedback recorded successfully!</strong> Your response has been written into local demonstration storage.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none ${
                    errors.name ? 'border-rose-400' : 'border-[#DDD5CB]'
                  }`}
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-[10px] text-rose-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none ${
                    errors.email ? 'border-rose-400' : 'border-[#DDD5CB]'
                  }`}
                  placeholder="name@campus.ac.in"
                />
                {errors.email && <p className="text-[10px] text-rose-600 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                Feedback Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
              >
                <option value="Stylist Feedback">Stylist Recommendation Quality</option>
                <option value="Feature Request">New Feature Request</option>
                <option value="Catalogue Bug">Product Catalogue Bug</option>
                <option value="Business Inquiry">Brand Partnership / Business Inquiry</option>
                <option value="General">General Inquiries / Coursework Evaluation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                Message / Feedback Notes *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none ${
                  errors.message ? 'border-rose-400' : 'border-[#DDD5CB]'
                }`}
                placeholder="Share your thoughts on the outfit suggestions, UI experience, or business plan feasibility..."
              />
              {errors.message && <p className="text-[10px] text-rose-600 mt-1">{errors.message}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-[#E07A5F]" /> Submit Feedback
              </button>
            </div>
          </form>
        </div>

        {/* Right: Project Office Info & Saved Submissions Log */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-7 border border-[#EAE3D8] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
              Project Information
            </h3>

            <div className="space-y-3 text-xs text-[#5C5245]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A1A1A] block">Academic Institution:</strong>
                  Department of Management Studies, University Campus
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A1A1A] block">Project Inquiries:</strong>
                  stylesync.ai.project@gmail.com
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A1A1A] block">Course Evaluation Window:</strong>
                  Autumn Academic Semester 2026
                </div>
              </div>
            </div>
          </div>

          {/* Persisted Demo Submissions */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE8E0] shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#F5F2EB]">
              <h4 className="font-serif text-base font-bold text-[#1A1A1A] flex items-center gap-2">
                <List className="w-4 h-4 text-[#C86D51]" />
                Recent Feedback Submissions ({feedbackList.length})
              </h4>
              <span className="text-[10px] text-[#8C7E6D]">Saved locally</span>
            </div>

            {feedbackList.length === 0 ? (
              <p className="text-xs text-[#8C7E6D] italic">
                No submissions yet. Test the form above to record your evaluator feedback!
              </p>
            ) : (
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {feedbackList.map((item) => (
                  <div key={item.id} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3D8] text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#1A1A1A]">{item.name}</span>
                      <span className="text-[10px] text-[#8C7E6D]">{item.createdAt}</span>
                    </div>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#DDD5CB] text-[#8C533E] font-medium inline-block">
                      {item.category}
                    </span>
                    <p className="text-[#5C5245] mt-1 line-clamp-2">"{item.message}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
