import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  User as UserIcon, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  ShieldCheck, 
  Cloud, 
  Layers, 
  Compass, 
  Calendar,
  KeyRound,
  RotateCcw
} from 'lucide-react';

interface AuthPageProps {
  redirectTarget?: string;
}

export const AuthPage: React.FC<AuthPageProps> = ({ redirectTarget = 'profile' }) => {
  const { 
    signInWithEmail, 
    signUpWithEmail, 
    sendPasswordResetEmail,
    resendConfirmationEmail,
    navigateTo, 
    showToast,
    currentUser 
  } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [migrateDemoData, setMigrateDemoData] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [canResendConfirmation, setCanResendConfirmation] = useState(false);

  // If already authenticated, redirect to home or target
  if (currentUser) {
    navigateTo(redirectTarget as any || 'profile');
    return null;
  }

  const getTargetLabel = () => {
    switch (redirectTarget) {
      case 'wardrobe':
        return 'your private Digital Wardrobe';
      case 'builder':
        return 'the interactive Outfit Canvas';
      case 'planner':
        return 'your Weekly Outfit Planner';
      case 'profile':
      default:
        return 'your personalized Dashboard & Wardrobe';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Strict validation: Do not pretend authentication works if Supabase is unconfigured
    if (!isSupabaseConfigured) {
      setErrorMessage(
        'Supabase authentication is not configured. Please supply VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to enable authentication.'
      );
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (mode !== 'forgot' && (!password || password.length < 6)) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'signup') {
        const result = await signUpWithEmail(
          email.trim(),
          password,
          fullName.trim() || undefined,
          migrateDemoData
        );

        if (result.error) {
          setErrorMessage(result.error);
        } else {
          setSuccessMessage(
            result.message || 'Account created successfully! Check your email to confirm registration or sign in.'
          );
          showToast('Account registered successfully!', 'success');
          setCanResendConfirmation(true);
        }
      } else if (mode === 'forgot') {
        const result = await sendPasswordResetEmail(email.trim());
        if (result.error) {
          setErrorMessage(result.error);
        } else {
          setSuccessMessage(result.message || 'Password reset link sent! Check your inbox.');
          showToast('Password reset link sent!', 'success');
        }
      } else {
        const result = await signInWithEmail(email.trim(), password);
        if (result.error) {
          setErrorMessage(result.error);
          if (result.error.toLowerCase().includes('confirm') || result.error.toLowerCase().includes('verified')) {
            setCanResendConfirmation(true);
          }
        } else {
          showToast('Welcome back! Cloud sync active.', 'success');
          navigateTo((redirectTarget as any) || 'profile');
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected authentication error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!email.trim()) {
      setErrorMessage('Please enter your email address first.');
      return;
    }
    setIsLoading(true);
    const res = await resendConfirmationEmail(email.trim());
    setIsLoading(false);
    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage(res.message || 'Verification link resent! Please check your inbox.');
      showToast('Confirmation email resent!', 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Target redirection alert if user was intercepted from a private page */}
      {redirectTarget && ['wardrobe', 'builder', 'planner', 'profile'].includes(redirectTarget) && (
        <div className="max-w-md mx-auto mb-6 p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFC8] flex items-center gap-3 shadow-sm animate-in fade-in">
          <div className="w-9 h-9 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#C86D51] shrink-0 border border-[#E0D7CC]">
            <Lock className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-[#1A1A1A] block">Member Authentication Required</span>
            <span className="text-[#6B5E50]">Please sign in or create an account to access {getTargetLabel()}.</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto">
        {/* Left Side: Brand & Feature Value Proposition */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] text-xs font-semibold text-[#8C533E]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Secure Cloud Fashion Technology</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight">
            Your Personal Closet, <br />
            <span className="italic font-normal text-[#C86D51]">Secured in the Cloud.</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#5C5245] leading-relaxed">
            Sign in to unlock private PostgreSQL storage, multi-device synchronization, and user-isolated wardrobe image storage powered by Supabase.
          </p>

          <div className="space-y-3 pt-2">
            {[
              {
                icon: <Layers className="w-4 h-4 text-[#C86D51]" />,
                title: 'Private Digital Wardrobe',
                desc: 'Upload and catalog your owned garments with isolated Row Level Security (RLS).'
              },
              {
                icon: <Sparkles className="w-4 h-4 text-[#C86D51]" />,
                title: 'Saved Custom Outfits',
                desc: 'Preserve your AI-curated and manually built looks across sessions and devices.'
              },
              {
                icon: <Calendar className="w-4 h-4 text-[#C86D51]" />,
                title: 'Weekly Style Calendar',
                desc: 'Map outfits to occasions and upcoming events with real-time sync.'
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white border border-[#EDE8E0] flex items-start gap-3 shadow-sm">
                <div className="p-2 rounded-xl bg-[#FAF8F5] border border-[#EAE3D8] shrink-0 mt-0.5">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">{feature.title}</h4>
                  <p className="text-[11px] text-[#6B5E50] mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick link to public catalogue */}
          <div className="pt-2">
            <button
              onClick={() => navigateTo('home')}
              className="text-xs font-semibold text-[#8C7E6D] hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5"
            >
              <span>← Back to Public Exploration (Home, Stylist & Catalogue)</span>
            </button>
          </div>
        </div>

        {/* Right Side: Auth Form Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8E0] shadow-xl space-y-6">
          {/* Form Tabs */}
          <div className="flex p-1 bg-[#FAF8F5] rounded-2xl border border-[#EAE3D8]">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                mode === 'signin'
                  ? 'bg-white text-[#1A1A1A] shadow-sm'
                  : 'text-[#6B5E50] hover:text-[#1A1A1A]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                mode === 'signup'
                  ? 'bg-white text-[#1A1A1A] shadow-sm'
                  : 'text-[#6B5E50] hover:text-[#1A1A1A]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Environment Status Check */}
          {!isSupabaseConfigured ? (
            <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-[#F3DACD] text-xs text-[#6B5E50] space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-[#C86D51]">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Supabase Configuration Required</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Supabase credentials have not been configured yet. Authentication is protected and cannot be simulated with dummy credentials.
              </p>
              <div className="p-2.5 rounded-xl bg-white border border-[#EAE3D8] font-mono text-[10px] space-y-1 text-[#333]">
                <div># Add to .env in project root:</div>
                <div className="text-[#8C533E]">VITE_SUPABASE_URL=https://your-project-id.supabase.co</div>
                <div className="text-[#8C533E]">VITE_SUPABASE_ANON_KEY=your-supabase-anon-key</div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900">
              <Cloud className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Supabase Backend Connected • Session Persistence Enabled</span>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-2 text-xs animate-in fade-in">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{errorMessage}</span>
                {canResendConfirmation && (
                  <button
                    type="button"
                    onClick={handleResendConfirmation}
                    className="mt-1.5 block font-bold text-[#C86D51] hover:underline"
                  >
                    Resend verification email →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2 text-xs animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{successMessage}</span>
                {canResendConfirmation && (
                  <button
                    type="button"
                    onClick={handleResendConfirmation}
                    className="mt-1.5 block font-bold text-emerald-700 hover:underline"
                  >
                    Didn't get the email? Resend verification link
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-[#8C7E6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    disabled={!isSupabaseConfigured || isLoading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] disabled:opacity-60"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C7E6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  disabled={!isSupabaseConfigured || isLoading}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] disabled:opacity-60"
                  required
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-[#1A1A1A]">
                    Password *
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-[#C86D51] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C7E6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    disabled={!isSupabaseConfigured || isLoading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] disabled:opacity-60"
                    required
                  />
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <label className="flex items-start gap-2.5 text-xs text-[#5C5245] cursor-pointer bg-[#FAF8F5] p-3 rounded-xl border border-[#EAE3D8]">
                <input
                  type="checkbox"
                  checked={migrateDemoData}
                  onChange={(e) => setMigrateDemoData(e.target.checked)}
                  disabled={!isSupabaseConfigured || isLoading}
                  className="accent-[#C86D51] mt-0.5 rounded"
                />
                <span className="text-[11px] leading-relaxed">
                  <strong>Sync Guest Wardrobe:</strong> Automatically migrate items, saved looks, and calendar schedules into your permanent cloud account.
                </span>
              </label>
            )}

            <button
              type="submit"
              disabled={isLoading || !isSupabaseConfigured}
              className="w-full py-3.5 px-4 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#E07A5F]" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {mode === 'signin' && (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#E07A5F]" />
                      <span>Sign In & Open Dashboard</span>
                    </>
                  )}
                  {mode === 'signup' && (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
                      <span>Create Free Account</span>
                    </>
                  )}
                  {mode === 'forgot' && (
                    <>
                      <KeyRound className="w-3.5 h-3.5 text-[#E07A5F]" />
                      <span>Send Password Reset Link</span>
                    </>
                  )}
                </>
              )}
            </button>
          </form>

          {mode === 'forgot' && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-xs font-bold text-[#C86D51] hover:underline"
              >
                ← Back to Sign In
              </button>
            </div>
          )}

          {/* Security notice */}
          <div className="pt-2 border-t border-[#F5F2EB] flex items-center justify-between text-[11px] text-[#8C7E6D]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>TLS 256-bit Encrypted</span>
            </span>
            <span>Passwords hashed via bcrypt</span>
          </div>
        </div>
      </div>
    </div>
  );
};
