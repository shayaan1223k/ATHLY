import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, ShieldCheck, Sparkles, AlertCircle, ArrowRight, Lock, Mail, User } from 'lucide-react';

/**
 * AuthModal
 * Editorial authentication modal for ATHLY.
 * Adheres to the luxury wellness aesthetic: Warm Ivory backdrop, hairline Stone rules,
 * Fraunces serif headlines, and understated Graphite controls.
 */
export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    authModalMode, 
    closeAuthModal, 
    openAuthModal,
    login, 
    register, 
    authError, 
    isFirebaseConfigured 
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  if (!isAuthModalOpen) return null;

  const isRegister = authModalMode === 'register';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError('Please complete all required fields.');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must contain at least 6 characters.');
      return;
    }

    setSubmitting(true);
    let result;
    if (isRegister) {
      result = await register(email, password, displayName);
    } else {
      result = await login(email, password);
    }
    setSubmitting(false);

    if (result?.success) {
      setEmail('');
      setPassword('');
      setDisplayName('');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171916]/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeAuthModal}
    >
      <div 
        className="w-full max-w-md bg-[#FAF8F3] border border-[#D9D5CB] rounded-2xl shadow-2xl overflow-hidden text-[#171916]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Editorial Modal Header */}
        <div className="relative px-8 pt-8 pb-6 border-b border-[#D9D5CB] bg-[#F4F1E9]/50">
          <button
            type="button"
            onClick={closeAuthModal}
            aria-label="Close authentication modal"
            className="absolute top-6 right-6 p-1.5 rounded-full text-[#4B4F48] hover:text-[#171916] hover:bg-[#EBE7DC] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#171916]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="font-serif text-lg tracking-[0.14em] font-medium text-[#171916]">
              ATHLY
            </span>
            <span className="w-1 h-1 rounded-full bg-[#171916]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#4B4F48]">
              {isRegister ? 'Member Enrollment' : 'Member Access'}
            </span>
          </div>

          <h2 className="font-serif text-2xl font-normal tracking-tight text-[#171916]">
            {isRegister ? 'Initialize your dossier' : 'Return to your protocol'}
          </h2>
          <p className="mt-1 text-xs text-[#4B4F48] font-sans leading-relaxed">
            {isRegister
              ? 'Establish encrypted biometric records, customized nutrition plans, and daily athletic cadence.'
              : 'Sign in to access your synchronized biometrics, training split, and live database record.'}
          </p>

          {/* Configuration Badge */}
          <div className="mt-4 flex items-center gap-2">
            {isFirebaseConfigured ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBF2DC] border border-[#C5D99A] text-[10px] font-mono uppercase tracking-wider text-[#171916]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#171916]" />
                <span>Firebase Authentication Active</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBE7DC] border border-[#D9D5CB] text-[10px] font-mono uppercase tracking-wider text-[#4B4F48]" title="Client credentials not provided; operating in offline simulation mode">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9B8F7D]" />
                <span>Preview Mode &bull; Simulated Session</span>
              </span>
            )}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
          {(localError || authError) && (
            <div className="p-3.5 rounded-lg bg-[#FAF0ED] border border-[#E8B4A6] text-xs text-[#9E3424] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#9E3424]" />
              <span className="leading-snug">{localError || authError}</span>
            </div>
          )}

          {isRegister && (
            <div>
              <label 
                htmlFor="auth-display-name" 
                className="block text-[11px] font-mono uppercase tracking-[0.14em] text-[#4B4F48] mb-1.5"
              >
                Member Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#9B8F7D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="auth-display-name"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Alex Hunter"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-[#D9D5CB] text-xs text-[#171916] placeholder-[#9B8F7D] focus:border-[#171916] focus:outline-none focus:ring-1 focus:ring-[#171916] transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label 
              htmlFor="auth-email" 
              className="block text-[11px] font-mono uppercase tracking-[0.14em] text-[#4B4F48] mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9B8F7D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@athly.luxury"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-[#D9D5CB] text-xs text-[#171916] placeholder-[#9B8F7D] focus:border-[#171916] focus:outline-none focus:ring-1 focus:ring-[#171916] transition-colors font-mono"
              />
            </div>
          </div>

          <div>
            <label 
              htmlFor="auth-password" 
              className="block text-[11px] font-mono uppercase tracking-[0.14em] text-[#4B4F48] mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9B8F7D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-[#D9D5CB] text-xs text-[#171916] placeholder-[#9B8F7D] focus:border-[#171916] focus:outline-none focus:ring-1 focus:ring-[#171916] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3 px-4 rounded-full bg-[#171916] text-[#F4F1E9] hover:bg-[#282B26] disabled:opacity-50 text-xs uppercase tracking-[0.14em] font-medium transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5D99A]"
          >
            {submitting ? (
              <span>Processing dossier...</span>
            ) : (
              <>
                <span>{isRegister ? 'Create Member Dossier' : 'Sign In to Protocol'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5D99A]" />
              </>
            )}
          </button>

          <div className="relative my-3 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#D9D5CB]" />
            </div>
            <span className="relative bg-[#FAF8F3] px-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#4B4F48]">
              Or Presentation Mode
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              login('alex.hunter@athly.luxury', 'demo123');
            }}
            className="w-full py-2.5 px-4 rounded-full bg-[#FAF8F3] hover:bg-[#EBE7DC] border border-[#D9D5CB] text-[#171916] text-xs uppercase tracking-[0.12em] font-medium transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C88E32]" />
            <span>Explore Demo (Instant Access)</span>
          </button>
        </form>

        {/* Modal Footer Mode Switch */}
        <div className="px-8 py-4 bg-[#F4F1E9] border-t border-[#D9D5CB] flex items-center justify-between text-xs text-[#4B4F48]">
          <span>
            {isRegister ? 'Already established?' : 'New athlete?'}
          </span>
          <button
            type="button"
            onClick={() => openAuthModal(isRegister ? 'signin' : 'register')}
            className="font-medium text-[#171916] hover:underline uppercase tracking-wider text-[11px] focus-visible:outline-none"
          >
            {isRegister ? 'Sign In Instead' : 'Create an Account'}
          </button>
        </div>
      </div>
    </div>
  );
};
