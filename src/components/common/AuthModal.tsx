import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Cloud, 
  Sparkles,
  ArrowRight,
  KeyRound,
  RotateCcw
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup' | 'forgot';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultMode = 'signin' }) => {
  const { 
    signInWithEmail, 
    signUpWithEmail, 
    sendPasswordResetEmail, 
    resendConfirmationEmail, 
    showToast,
    authModalMode,
    setAuthModalMode
  } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [migrateDemoData, setMigrateDemoData] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [canResendConfirmation, setCanResendConfirmation] = useState(false);

  useEffect(() => {
    if (authModalMode) {
      setMode(authModalMode);
    }
  }, [authModalMode]);

  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setCanResendConfirmation(false);
  }, [mode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (mode !== 'forgot' && (!password || password.length < 6)) {
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
          setCanResendConfirmation(true);
        }
      } else if (mode === 'forgot') {
        const result = await sendPasswordResetEmail(email.trim());
        if (result.error) {
          setErrorMessage(result.error);
        } else {
          setSuccessMessage(result.message || 'Password reset link sent! Check your email.');
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
          onClose();
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
      setSuccessMessage(res.message || 'Confirmation link resent! Check your inbox.');
      showToast('Confirmation email resent!', 'success');
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
                {mode === 'signin' && 'Sign In to StyleSync'}
                {mode === 'signup' && 'Create Free Account'}
                {mode === 'forgot' && 'Reset Password'}
              </h3>
              <p className="text-[11px] text-[#8C7E6D]">
                {mode === 'signin' && 'Access your private wardrobe & saved looks'}
                {mode === 'signup' && 'Cloud sync, AI styling & smart wardrobe curation'}
                {mode === 'forgot' && 'Receive a secure reset link in your inbox'}
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
                <strong className="text-[#1A1A1A] block mb-0.5">Configuration Required</strong>
                Add <code className="bg-[#FAF6F0] px-1 py-0.5 rounded font-mono text-[10px]">VITE_SUPABASE_URL</code> and <code className="bg-[#FAF6F0] px-1 py-0.5 rounded font-mono text-[10px]">VITE_SUPABASE_ANON_KEY</code> to your <code className="bg-[#FAF6F0] px-1 py-0.5 rounded font-mono text-[10px]">.env</code> file.
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

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{successMessage}</span>
                {canResendConfirmation && (
                  <button
                    type="button"
                    onClick={handleResendConfirmation}
                    className="mt-1.5 block font-bold text-emerald-700 hover:underline"
                  >
                    Didn't receive email? Resend verification link
                  </button>
                )}
              </div>
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
                    placeholder="e.g. Sarah Jenkins"
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
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
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
                      onClick={() => {
                        setMode('forgot');
                        setAuthModalMode('forgot');
                      }}
                      className="text-[11px] text-[#C86D51] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
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
            )}

            {mode === 'signup' && (
              <label className="flex items-start gap-2.5 text-xs text-[#5C5245] cursor-pointer bg-[#FAF8F5] p-3 rounded-xl border border-[#EAE3D8]">
                <input
                  type="checkbox"
                  checked={migrateDemoData}
                  onChange={(e) => setMigrateDemoData(e.target.checked)}
                  className="accent-[#C86D51] mt-0.5 rounded"
                />
                <span>
                  <strong>Sync Guest Wardrobe:</strong> Automatically migrate items, saved looks, and calendar schedules into your permanent cloud account.
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
                  {mode === 'signin' && (
                    <>
                      <Sparkles className="w-4 h-4 text-[#E07A5F]" />
                      <span>Sign In to Cloud</span>
                    </>
                  )}
                  {mode === 'signup' && (
                    <>
                      <Sparkles className="w-4 h-4 text-[#E07A5F]" />
                      <span>Create Cloud Account</span>
                    </>
                  )}
                  {mode === 'forgot' && (
                    <>
                      <KeyRound className="w-4 h-4 text-[#E07A5F]" />
                      <span>Send Reset Link</span>
                    </>
                  )}
                </>
              )}
            </button>
          </form>

          {/* Toggle between Sign In, Sign Up, and Forgot Password */}
          <div className="pt-2 text-center text-xs text-[#6B5E50] space-y-1">
            {mode === 'signin' && (
              <p>
                Don't have a cloud account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setAuthModalMode('signup');
                  }}
                  className="font-bold text-[#C86D51] hover:underline ml-1"
                >
                  Create one now
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setAuthModalMode('signin');
                  }}
                  className="font-bold text-[#C86D51] hover:underline ml-1"
                >
                  Sign in here
                </button>
              </p>
            )}
            {mode === 'forgot' && (
              <p>
                Remembered your password?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setAuthModalMode('signin');
                  }}
                  className="font-bold text-[#C86D51] hover:underline ml-1"
                >
                  Back to Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
