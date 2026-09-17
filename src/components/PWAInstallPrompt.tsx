import React, { useState, useEffect } from 'react';
import { Download, X, Share } from 'lucide-react';
import { Translations } from '../types/i18n';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAInstallPromptProps {
  t: Translations;
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ t }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (installed)
    const checkStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(checkStandalone);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  // If already installed or dismissed, don't show
  if (isStandalone || isDismissed) return null;

  // Show only if installable prompt is captured OR if on iOS and not standalone
  if (!deferredPrompt && !isIOS) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-emerald-500/30 rounded-2xl p-4 shadow-xl dark:shadow-2xl backdrop-blur-xl animate-fade-in transition-colors">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-glow-emerald border border-emerald-500/40 shrink-0 bg-slate-100 dark:bg-slate-950">
          <img src="/icon-192.png" alt="App Icon" className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white font-['Cairo',sans-serif]">
            {t.pwaTitle}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
            {isIOS ? t.pwaDescriptionIos : t.pwaDescriptionOther}
          </p>

          <div className="mt-3 flex items-center gap-2">
            {deferredPrompt && (
              <button
                type="button"
                onClick={handleInstallClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 active:scale-95 transition-all shadow-glow-emerald"
              >
                <Download className="w-3.5 h-3.5" />
                {t.pwaInstallNow}
              </button>
            )}

            {isIOS && !deferredPrompt && (
              <div className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                <Share className="w-3 h-3" />
                <span>Share &gt; Add to Home Screen</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 px-2 py-1"
            >
              {t.pwaMaybeLater}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1"
          aria-label="Close install banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
