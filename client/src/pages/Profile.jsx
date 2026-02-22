import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

/* ── 3 built-in avatar options ── */
const AVATARS = [
  {
    id: "boy",
    label: "Boy",
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="av-svg">
        {/* background circle */}
        <circle cx="50" cy="50" r="50" fill="#1e2a3a"/>
        {/* body */}
        <ellipse cx="50" cy="85" rx="26" ry="18" fill="#2d4a6b"/>
        {/* neck */}
        <rect x="44" y="62" width="12" height="12" rx="4" fill="#f5c5a3"/>
        {/* head */}
        <ellipse cx="50" cy="52" rx="22" ry="24" fill="#f5c5a3"/>
        {/* hair */}
        <ellipse cx="50" cy="32" rx="22" ry="12" fill="#3d2b1f"/>
        <rect x="28" y="30" width="8" height="14" rx="4" fill="#3d2b1f"/>
        <rect x="64" y="30" width="8" height="14" rx="4" fill="#3d2b1f"/>
        {/* eyes */}
        <ellipse cx="42" cy="52" rx="4" ry="4.5" fill="#fff"/>
        <ellipse cx="58" cy="52" rx="4" ry="4.5" fill="#fff"/>
        <circle cx="43" cy="53" r="2.5" fill="#2d1b0e"/>
        <circle cx="59" cy="53" r="2.5" fill="#2d1b0e"/>
        <circle cx="44" cy="51.5" r="1" fill="#fff"/>
        <circle cx="60" cy="51.5" r="1" fill="#fff"/>
        {/* eyebrows */}
        <path d="M38 47 Q42 45 46 47" stroke="#3d2b1f" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M54 47 Q58 45 62 47" stroke="#3d2b1f" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* nose */}
        <ellipse cx="50" cy="59" rx="2" ry="1.5" fill="#e8a882"/>
        {/* smile */}
        <path d="M44 65 Q50 70 56 65" stroke="#c27a5a" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* ears */}
        <ellipse cx="28" cy="52" rx="3.5" ry="5" fill="#f5c5a3"/>
        <ellipse cx="72" cy="52" rx="3.5" ry="5" fill="#f5c5a3"/>
        {/* collar */}
        <path d="M37 76 L50 72 L63 76" stroke="#e07a5f" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: "girl",
    label: "Girl",
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="av-svg">
        <circle cx="50" cy="50" r="50" fill="#2a1e3a"/>
        {/* body */}
        <ellipse cx="50" cy="85" rx="26" ry="18" fill="#9b5de5"/>
        {/* neck */}
        <rect x="44" y="62" width="12" height="12" rx="4" fill="#f5c5a3"/>
        {/* head */}
        <ellipse cx="50" cy="52" rx="22" ry="24" fill="#f5c5a3"/>
        {/* long hair back */}
        <ellipse cx="50" cy="35" rx="23" ry="14" fill="#1a0a00"/>
        <rect x="26" y="34" width="10" height="38" rx="5" fill="#1a0a00"/>
        <rect x="64" y="34" width="10" height="38" rx="5" fill="#1a0a00"/>
        {/* hair top */}
        <ellipse cx="50" cy="30" rx="22" ry="10" fill="#1a0a00"/>
        {/* eyes */}
        <ellipse cx="42" cy="52" rx="4.5" ry="5" fill="#fff"/>
        <ellipse cx="58" cy="52" rx="4.5" ry="5" fill="#fff"/>
        <circle cx="43" cy="53" r="2.8" fill="#3d1f0e"/>
        <circle cx="59" cy="53" r="2.8" fill="#3d1f0e"/>
        <circle cx="44" cy="51.5" r="1" fill="#fff"/>
        <circle cx="60" cy="51.5" r="1" fill="#fff"/>
        {/* lashes */}
        <path d="M38 48 L37 46" stroke="#1a0a00" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M40 47 L40 45" stroke="#1a0a00" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M42 47 L42.5 44.8" stroke="#1a0a00" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M54 47 L53.5 44.8" stroke="#1a0a00" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M56 47 L56 45" stroke="#1a0a00" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M58 48 L59 46" stroke="#1a0a00" strokeWidth="1.2" strokeLinecap="round"/>
        {/* nose */}
        <ellipse cx="50" cy="59" rx="1.8" ry="1.2" fill="#e8a882"/>
        {/* smile */}
        <path d="M44 65 Q50 71 56 65" stroke="#c27a5a" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* blush */}
        <ellipse cx="38" cy="60" rx="4" ry="2.5" fill="rgba(255,150,150,0.3)"/>
        <ellipse cx="62" cy="60" rx="4" ry="2.5" fill="rgba(255,150,150,0.3)"/>
        {/* ears */}
        <ellipse cx="28" cy="52" rx="3.5" ry="5" fill="#f5c5a3"/>
        <ellipse cx="72" cy="52" rx="3.5" ry="5" fill="#f5c5a3"/>
        {/* earring */}
        <circle cx="28" cy="57" r="2" fill="#f5d76e"/>
        <circle cx="72" cy="57" r="2" fill="#f5d76e"/>
      </svg>
    )
  },
  {
    id: "other",
    label: "Other",
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="av-svg">
        <circle cx="50" cy="50" r="50" fill="#0d2b1e"/>
        {/* body */}
        <ellipse cx="50" cy="85" rx="26" ry="18" fill="#2d6a4f"/>
        {/* neck */}
        <rect x="44" y="62" width="12" height="12" rx="4" fill="#d4a5c9"/>
        {/* head */}
        <ellipse cx="50" cy="52" rx="22" ry="24" fill="#d4a5c9"/>
        {/* hair — short colourful */}
        <ellipse cx="50" cy="30" rx="22" ry="11" fill="#5e2d8a"/>
        <rect x="28" y="30" width="7" height="10" rx="3.5" fill="#5e2d8a"/>
        <rect x="65" y="30" width="7" height="10" rx="3.5" fill="#5e2d8a"/>
        {/* hair streak */}
        <rect x="44" y="27" width="5" height="8" rx="2.5" fill="#e07a5f"/>
        <rect x="51" y="27" width="5" height="8" rx="2.5" fill="#81b29a"/>
        {/* eyes — star shaped pupils */}
        <ellipse cx="42" cy="52" rx="4.5" ry="5" fill="#fff"/>
        <ellipse cx="58" cy="52" rx="4.5" ry="5" fill="#fff"/>
        <circle cx="43" cy="53" r="2.8" fill="#5e2d8a"/>
        <circle cx="59" cy="53" r="2.8" fill="#5e2d8a"/>
        <circle cx="44" cy="51.5" r="1" fill="#fff"/>
        <circle cx="60" cy="51.5" r="1" fill="#fff"/>
        {/* nose */}
        <ellipse cx="50" cy="59" rx="1.8" ry="1.2" fill="#c490b8"/>
        {/* smile */}
        <path d="M44 65 Q50 71 56 65" stroke="#a86090" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* freckles */}
        <circle cx="39" cy="60" r="1.2" fill="rgba(160,100,180,0.4)"/>
        <circle cx="36" cy="58" r="1" fill="rgba(160,100,180,0.4)"/>
        <circle cx="61" cy="60" r="1.2" fill="rgba(160,100,180,0.4)"/>
        <circle cx="64" cy="58" r="1" fill="rgba(160,100,180,0.4)"/>
        {/* ears */}
        <ellipse cx="28" cy="52" rx="3.5" ry="5" fill="#d4a5c9"/>
        <ellipse cx="72" cy="52" rx="3.5" ry="5" fill="#d4a5c9"/>
        {/* earring hoop */}
        <circle cx="28" cy="56" r="3" fill="none" stroke="#e07a5f" strokeWidth="1.5"/>
        <circle cx="72" cy="56" r="3" fill="none" stroke="#81b29a" strokeWidth="1.5"/>
        {/* collar rainbow */}
        <path d="M37 76 L50 72 L63 76" stroke="url(#rainbow)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <defs>
          <linearGradient id="rainbow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#e07a5f"/>
            <stop offset="50%"  stopColor="#81b29a"/>
            <stop offset="100%" stopColor="#a09bc9"/>
          </linearGradient>
        </defs>
      </svg>
    )
  }
];

export default function Profile() {
  const { user } = useAuth();

  const [editing, setEditing]       = useState(false);
  const [form, setForm]             = useState(user);
  const [saved, setSaved]           = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatarId || "boy");
  const [pickingAvatar, setPickingAvatar]   = useState(false);

  if (!user) return (
    <div className="pf-loading">
      <i className="ri-loader-4-line" /> Loading...
    </div>
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setEditing(false);
    setForm(user);
    setSelectedAvatar(user?.avatarId || "boy");
    setPickingAvatar(false);
  };

  const handleSave = () => {
    // 🔥 later connect backend here
    console.log("UPDATED DATA:", { ...form, avatarId: selectedAvatar });
    setEditing(false);
    setPickingAvatar(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const joinYear = user.createdAt
    ? new Date(user.createdAt).getFullYear()
    : "—";

  const currentAv = AVATARS.find(a => a.id === selectedAvatar) || AVATARS[0];

  return (
    <div className="pf-page">
      <div className="pf-dots" />
      <div className="pf-glow" />

      <div className="pf-shell">

        {/* ══ LEFT PANEL ══ */}
        <aside className="pf-left">
          <div className="pf-left-accent" />

          {/* ── Avatar display ── */}
          <div className="pf-avatar-wrap">
            <div className="pf-avatar-ring" />
            <div className="pf-avatar">
              {currentAv.svg}
            </div>
            <div className="pf-avatar-status" />
            {/* Change avatar button */}
            {editing && (
              <button
                className="pf-change-av"
                onClick={() => setPickingAvatar(p => !p)}
                title="Change avatar"
              >
                <i className="ri-camera-line" />
              </button>
            )}
          </div>

          {/* ── Avatar picker (only while editing) ── */}
          {editing && pickingAvatar && (
            <div className="pf-av-picker">
              <p className="pf-av-picker-title">Choose your avatar</p>
              <div className="pf-av-options">
                {AVATARS.map(av => (
                  <button
                    key={av.id}
                    className={`pf-av-opt ${selectedAvatar === av.id ? "chosen" : ""}`}
                    onClick={() => { setSelectedAvatar(av.id); setPickingAvatar(false); }}
                  >
                    <div className="pf-av-opt-img">{av.svg}</div>
                    <span>{av.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Identity ── */}
          <div className="pf-identity">
            <h2 className="pf-name">{form.name || user.name || "Anonymous"}</h2>
            <span className="pf-role-badge">
              <i className="ri-shield-star-line" />
              {user.role || "Student"}
            </span>
          </div>

          {/* ── Stats ── */}
          <div className="pf-stats">
            <div className="pf-stat">
              <span className="pf-stat-value">{joinYear}</span>
              <span className="pf-stat-label">Joined</span>
            </div>
            <div className="pf-stat-divider" />
            <div className="pf-stat">
              <span className="pf-stat-value">∞</span>
              <span className="pf-stat-label">Potential</span>
            </div>
            <div className="pf-stat-divider" />
            <div className="pf-stat">
              <span className="pf-stat-value">01</span>
              <span className="pf-stat-label">Universe</span>
            </div>
          </div>

          {/* ── Tag ── */}
          <div className="pf-tag">
            <i className="ri-code-s-slash-line" /> NullPointer Member
          </div>
        </aside>

        {/* ══ RIGHT PANEL ══ */}
        <main className="pf-right">

          {/* Header */}
          <div className="pf-right-header">
            <div>
              <h1 className="pf-right-title">Account Profile</h1>
              <p className="pf-right-sub">
                {editing
                  ? "Make your changes and save."
                  : "Your personal information and account details."}
              </p>
            </div>
            {saved && (
              <div className="pf-saved-badge">
                <i className="ri-checkbox-circle-line" /> Saved
              </div>
            )}
          </div>

          {/* Form */}
          <div className="pf-form">

            {/* Name — editable */}
            <div className="pf-field full">
              <label className="pf-label">
                <i className="ri-user-line" /> Full Name
              </label>
              <div className={`pf-input-wrap ${editing ? "active" : ""}`}>
                <input
                  name="name"
                  value={form.name || ""}
                  disabled={!editing}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="pf-input"
                />
                {editing && <i className="ri-pencil-line pf-input-icon" />}
              </div>
            </div>

            {/* Email — locked */}
            <div className="pf-field full">
              <label className="pf-label">
                <i className="ri-mail-line" /> Email Address
                <span className="pf-locked"><i className="ri-lock-line" /> locked</span>
              </label>
              <div className="pf-input-wrap locked">
                <input value={user.email} disabled className="pf-input" />
              </div>
            </div>

            {/* Role */}
            <div className="pf-field half">
              <label className="pf-label">
                <i className="ri-shield-star-line" /> Role
                <span className="pf-locked"><i className="ri-lock-line" /> locked</span>
              </label>
              <div className="pf-input-wrap locked">
                <input value={user.role || "Student"} disabled className="pf-input" />
              </div>
            </div>

            {/* Joined */}
            <div className="pf-field half">
              <label className="pf-label">
                <i className="ri-calendar-line" /> Member Since
                <span className="pf-locked"><i className="ri-lock-line" /> locked</span>
              </label>
              <div className="pf-input-wrap locked">
                <input value={joinYear} disabled className="pf-input" />
              </div>
            </div>

          </div>

          <div className="pf-divider" />

          {/* Actions */}
          <div className="pf-actions">
            {!editing ? (
              <button className="pf-btn primary" onClick={() => setEditing(true)}>
                <i className="ri-pencil-line" /> Edit Profile
              </button>
            ) : (
              <>
                <button className="pf-btn primary" onClick={handleSave}>
                  <i className="ri-save-line" /> Save Changes
                </button>
                <button className="pf-btn ghost" onClick={handleCancel}>
                  <i className="ri-close-line" /> Cancel
                </button>
              </>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
