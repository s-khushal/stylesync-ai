import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Cloud, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultMode = 'signin' }) => {
  const { signInWithEmail, signUpWithEmail, showToast } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [migrateDemoData, setMigrateDemoData] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (!isSupabaseConfigured) {
      setErrorMessage(
        'Supabase backend credentials are not yet configured in .env. The app is operating in local demo mode.'
      );
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'signup') {
        const result = await signUpWithEmail(email.trim(), password, fullName.trim() || undefined, migrateDemoData);
        if (result.error) {
          setErrorMessage(result.error);
        } else {
          setSuccessMessage(
            result.message || 'Account created successfully! Check your email to confirm registration or sign in.'
          );
          showToast('Account registered successfully!', 'success');
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      } else {
        const result = await signInWithEmail(email.trim(), password);
        if (result.error) {
          setErrorMessage(result.error);
        } else {
          showToast('Welcome back! Cloud sync active.', 'success');
          onClose();
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected authentication error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#EDE8E0] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EFECE6] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1A1A1A] text-white flex items-center justify-center font-serif text-lg font-bold">
              S
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                {mode === 'signin' ? 'Sign In to StyleSync' : 'Create Free Account'}
              </h3>
              <p className="text-[11px] text-[#8C7E6D]">
                {mode === 'signin' ? 'Access your cloud wardrobe & saved looks' : 'Cloud sync & personalized styling'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#EAE4DC] flex items-center justify-center text-[#1A1A1A] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Supabase Status Alert */}
          {!isSupabaseConfigured ? (
            <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E8DFC8] flex items-start gap-3 text-xs text-[#6B5E50]">
              <AlertCircle className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1A1A1A] block mb-0.5">Local Demo Mode Active</strong>
                Supabase credentials have not been configured in <code className="bg-[#FAF6F0] px-1 py-0.5 rounded font-mono text-[10px]">.env</code> yet. You can continue testing all features locally using localStorage. To enable live cloud accounts, add your project URL and publishable key.
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900">
              <Cloud className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Connected to Supabase PostgreSQL & Cloud Storage.</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-2 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-[#8C7E6D] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aanya Sharma"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C7E6D] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@campus.ac.in"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8C7E6D] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
                  required
                />
              </div>
            </div>

            {mode === 'signup' && (
              <label className="flex items-start gap-2.5 text-xs text-[#5C5245] cursor-pointer bg-[#FAF8F5] p-3 rounded-xl border border-[#EAE3D8]">
                <input
                  type="checkbox"
                  checked={migrateDemoData}
                  onChange={(e) => setMigrateDemoData(e.target.checked)}
                  className="accent-[#C86D51] mt-0.5 rounded"
                />
                <span>
                  <strong>Sync Guest Data:</strong> Automatically copy my current local demo wardrobe items, saved looks, and calendar schedules into my new cloud account.
                </span>
              </label>
            )}

            <button
              type="submit"
              disabled={isLoading || !isSupabaseConfigured}
              className="w-full py-3.5 px-4 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#E07A5F]" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#E07A5F]" />
                  <span>{mode === 'signin' ? 'Sign In to Cloud' : 'Create Cloud Account'}</span>
                </>
              )}
            </button>
          </form>

          {/* Toggle between Sign In and Sign Up */}
          <div className="pt-2 text-center text-xs text-[#6B5E50]">
            {mode === 'signin' ? (
              <p>
                Don't have a cloud account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage(null);
                  }}
                  className="font-bold text-[#C86D51] hover:underline ml-1"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setErrorMessage(null);
                  }}
                  className="font-bold text-[#C86D51] hover:underline ml-1"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
