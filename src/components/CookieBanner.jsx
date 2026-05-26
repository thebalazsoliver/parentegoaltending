import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookieConsent");

    if (!savedConsent) {
      setShowBanner(true);
    }
  }, []);

  function saveConsent(settings) {
    localStorage.setItem("cookieConsent", JSON.stringify(settings));
    setShowBanner(false);
    setShowPreferences(false);
  }

  function acceptAll() {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
    });
  }

  function rejectNonEssential() {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
    });
  }

  function savePreferences() {
    saveConsent({
      essential: true,
      analytics,
      marketing,
    });
  }

  if (!showBanner) {
    return null;
  }

  return (
    <div className="cookie-banner">
      {!showPreferences ? (
        <>
          <p>
            We use cookies to improve your browsing experience, analyze website
            traffic, and support our services. You can accept all cookies, reject
            non-essential cookies, or manage your preferences.
          </p>

          <div className="cookie-buttons">
            <button onClick={acceptAll}>Accept all</button>
            <button onClick={rejectNonEssential}>Reject non-essential</button>
            <button onClick={() => setShowPreferences(true)}>
              Manage preferences
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>Cookie Preferences</h3>

          <div className="cookie-option">
            <strong>Essential cookies</strong>
            <p>
              Required for the website to function properly. These cookies
              cannot be disabled.
            </p>
          </div>

          <label className="cookie-check">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
            Analytics cookies
          </label>

          <label className="cookie-check">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
            />
            Marketing cookies
          </label>

          <div className="cookie-buttons">
            <button onClick={savePreferences}>Save preferences</button>
            <button onClick={() => setShowPreferences(false)}>Back</button>
          </div>
        </>
      )}
    </div>
  );
}