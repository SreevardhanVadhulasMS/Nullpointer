import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import HomeNavbar from "../components/HomeNavbar";
import "./Community.css";

/* ─── API base ─── */
const API = "http://localhost:5000/api";

const REACTIONS = [
  { emoji: "🔥", label: "Fire" },
  { emoji: "💡", label: "Insightful" },
  { emoji: "👏", label: "Clap" },
  { emoji: "😂", label: "Haha" },
  { emoji: "🤯", label: "Mind-blown" },
  { emoji: "❤️", label: "Love" },
];

const TAGS = ["All","DSA","System Design","AI & ML","Networks","DBMS","Cloud","Career","General"];

const TAG_COLOR = {
  DSA:"#81b29a","System Design":"#a09bc9","AI & ML":"#e07a5f",
  Networks:"#5fb8c8",DBMS:"#c9a96e",Cloud:"#b07fd4",
  Career:"#e8c468",General:"#888",
};

/* ── auth helpers ── */
function getToken(tokenFromContext) {
  return tokenFromContext || localStorage.getItem("np_token") || "";
}

function authHeaders(tokenFromContext) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken(tokenFromContext)}`,
  };
}

/* ── normalise MongoDB doc → component shape ── */
function normalisePost(p) {
  return {
    ...p,
    id: p._id || p.id,
    createdAt: new Date(p.createdAt).getTime(),
    reactions: p.reactions || {},
    comments: (p.comments || []).map(c => ({
      ...c,
      id: c._id || c.id,
      createdAt: new Date(c.createdAt).getTime(),
    })),
  };
}

/* ── MiniAvatar (inline SVG) ── */
function MiniAvatar({ id, size = 36 }) {
  const palettes = {
    boy:   { bg:"#1e2a3a", skin:"#f5c5a3", hair:"#3d2b1f", shirt:"#2d4a6b", accent:"#e07a5f" },
    girl:  { bg:"#2a1e3a", skin:"#f5c5a3", hair:"#1a0a00", shirt:"#9b5de5", accent:"#f5d76e" },
    other: { bg:"#0d2b1e", skin:"#d4a5c9", hair:"#5e2d8a", shirt:"#2d6a4f", accent:"#81b29a" },
  };
  const p = palettes[id] || palettes.boy;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ borderRadius:"50%", flexShrink:0 }}>
      <circle cx="20" cy="20" r="20" fill={p.bg}/>
      <ellipse cx="20" cy="34" rx="11" ry="8" fill={p.shirt}/>
      <rect x="16" y="24" width="8" height="6" rx="3" fill={p.skin}/>
      <ellipse cx="20" cy="20" rx="10" ry="11" fill={p.skin}/>
      <ellipse cx="20" cy="12" rx="10" ry="6" fill={p.hair}/>
      <rect x="10" y="11" width="4" height="6" rx="2" fill={p.hair}/>
      <rect x="26" y="11" width="4" height="6" rx="2" fill={p.hair}/>
      <circle cx="17" cy="20" r="2" fill="#fff"/>
      <circle cx="23" cy="20" r="2" fill="#fff"/>
      <circle cx="17.6" cy="20.5" r="1.1" fill="#2d1b0e"/>
      <circle cx="23.6" cy="20.5" r="1.1" fill="#2d1b0e"/>
      <path d="M16 25 Q20 28 24 25" stroke={p.accent} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* ── timeAgo ── */
function timeAgo(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
export default function Community() {
  const { user, token } = useAuth();
  
  const [posts, setPosts]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");
  const [view, setView]                 = useState("feed");
  const [activeTag, setActiveTag]       = useState("All");
  const [composing, setComposing]       = useState(false);
  const [draft, setDraft]               = useState("");
  const [draftTag, setDraftTag]         = useState("General");
  const [submitting, setSubmitting]     = useState(false);
  const [reactionPop, setReactionPop]   = useState(null);
  const [editingPost, setEditingPost]   = useState(null);
  const [commentOpen, setCommentOpen]   = useState(null);
  const [commentDraft, setCommentDraft] = useState("");
  const [bookmarks, setBookmarks]       = useState({});
  const [search, setSearch]             = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const textareaRef = useRef(null);

  const myName   = user?.name   || user?.username || "Anonymous";
  const myEmail  = user?.email  || "";
  const myAvatar = user?.avatarId || "boy";

  /* auto-grow textarea */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [draft]);

  /* ══ FETCH POSTS FROM MONGODB ══ */
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API}/posts`, { headers: authHeaders(token) }); 
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setPosts(data.map(normalisePost));
    } catch {
      setError("Could not load posts. Is the server running?");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  /* ── filtered & sorted list ── */
  const filtered = useMemo(() => {
    let list = view === "myposts"
      ? posts.filter(p => p.authorEmail === myEmail)
      : posts;
    if (activeTag !== "All") list = list.filter(p => p.tag === activeTag);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.content.toLowerCase().includes(q) ||
        p.authorName.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => b.createdAt - a.createdAt);
  }, [posts, view, activeTag, search, myEmail]);

  /* ══ CREATE  POST /api/posts ══ */
  const submitPost = async () => {
    if (!draft.trim() || submitting) return;
    try {
      setSubmitting(true);
      const res = await fetch(`${API}/posts`, {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify({ content: draft.trim(), tag: draftTag, avatarId: myAvatar }),
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      setPosts(prev => [normalisePost(created), ...prev]);
      setDraft("");
      setComposing(false);
    } catch {
      alert("Failed to post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ══ REACT  POST /api/posts/:id/react ══ */
  const addReaction = async (postId, emoji) => {
    setReactionPop(null);
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return { ...p, reactions: { ...p.reactions, [emoji]: (p.reactions[emoji] || 0) + 1 } };
    }));
    try {
      const res = await fetch(`${API}/posts/${postId}/react`, {
        method: "POST",
        headers: authHeaders(token), // FIX: Added token
        body: JSON.stringify({ emoji }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setPosts(prev => prev.map(p => p.id === postId ? normalisePost(updated) : p));
    } catch {
      fetchPosts(); 
    }
  };

  /* ── bookmark (client-only) ── */
  const toggleBookmark = (postId) =>
    setBookmarks(prev => ({ ...prev, [postId]: !prev[postId] }));

  /* ══ COMMENT  POST /api/posts/:id/comment ══ */
  const submitComment = async (postId) => {
    if (!commentDraft.trim()) return;
    const text = commentDraft.trim();
    setCommentDraft("");
    try {
      const res = await fetch(`${API}/posts/${postId}/comment`, {
        method: "POST",
        headers: authHeaders(token), // FIX: Added token
        body: JSON.stringify({ text, avatarId: myAvatar }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setPosts(prev => prev.map(p => p.id === postId ? normalisePost(updated) : p));
    } catch {
      alert("Failed to post comment.");
    }
  };

  /* ══ DELETE  DELETE /api/posts/:id ══ */
  const deletePost = async (postId) => {
    setDeleteConfirm(null);
    setPosts(prev => prev.filter(p => p.id !== postId)); 
    try {
      const res = await fetch(`${API}/posts/${postId}`, {
        method: "DELETE",
        headers: authHeaders(token), // FIX: Added token
      });
      if (!res.ok) throw new Error();
    } catch {
      fetchPosts(); 
    }
  };

  /* ══ EDIT  PUT /api/posts/:id ══ */
  const saveEdit = async () => {
    if (!editingPost?.content.trim()) return;
    const { id, content, tag } = editingPost;
    setEditingPost(null);
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, content, tag, edited: true } : p
    )); 
    try {
      const res = await fetch(`${API}/posts/${id}`, {
        method: "PUT",
        headers: authHeaders(token), // FIX: Added token
        body: JSON.stringify({ content, tag }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setPosts(prev => prev.map(p => p.id === id ? normalisePost(updated) : p));
    } catch {
      fetchPosts(); 
    }
  };

  const isOwn = (post) => post.authorEmail === myEmail;

  return (
    <>
      <HomeNavbar />
      <div className="cm-page">
        <div className="cm-dots" />
        <div className="cm-glow1" />
        <div className="cm-glow2" />
        <div className="cm-layout">
          {/* LEFT SIDEBAR */}
          <aside className="cm-left">
            <div className="cm-brand">
              <i className="ri-planet-line" />
              <span>Community</span>
            </div>
            <nav className="cm-sidenav">
              <button className={`cm-navbtn ${view === "feed" ? "active" : ""}`} onClick={() => setView("feed")}>
                <i className="ri-home-4-line" /> Feed
              </button>
              <button className={`cm-navbtn ${view === "myposts" ? "active" : ""}`} onClick={() => setView("myposts")}>
                <i className="ri-draft-line" /> My Posts
              </button>
              <button className="cm-navbtn">
                <i className="ri-bookmark-line" /> Bookmarks
                <span className="cm-nav-count">{Object.values(bookmarks).filter(Boolean).length}</span>
              </button>
            </nav>
            <div className="cm-tag-section">
              <p className="cm-tag-heading">Topics</p>
              <div className="cm-tag-list">
                {TAGS.filter(t => t !== "All").map(t => (
                  <button
                    key={t}
                    className={`cm-tag-pill ${activeTag === t ? "active" : ""}`}
                    style={activeTag === t ? {
                      background: TAG_COLOR[t] + "22",
                      borderColor: TAG_COLOR[t] + "55",
                      color: TAG_COLOR[t],
                    } : {}}
                    onClick={() => { setActiveTag(t === activeTag ? "All" : t); setView("feed"); }}
                  >
                    <span className="cm-tag-dot" style={{ background: TAG_COLOR[t] || "#888" }} />
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="cm-user-card">
              <MiniAvatar id={myAvatar} size={38} />
              <div className="cm-user-info">
                <span className="cm-user-name">{myName}</span>
                <span className="cm-user-email">{myEmail}</span>
              </div>
            </div>
          </aside>

          {/* MAIN FEED */}
          <main className="cm-main">
            <div className="cm-feed-header">
              <div className="cm-feed-title-row">
                <h1 className="cm-feed-title">
                  {view === "feed" ? (activeTag === "All" ? "All Posts" : activeTag) : "My Posts"}
                </h1>
                <span className="cm-post-count">{filtered.length} posts</span>
              </div>
              <div className="cm-search-wrap">
                <i className="ri-search-line cm-search-icon" />
                <input
                  className="cm-search"
                  placeholder="Search posts…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button className="cm-search-clear" onClick={() => setSearch("")}>
                    <i className="ri-close-line" />
                  </button>
                )}
              </div>
            </div>

            {!composing ? (
              <div className="cm-compose-closed" onClick={() => setComposing(true)}>
                <MiniAvatar id={myAvatar} size={38} />
                <span className="cm-compose-placeholder">
                  What's on your mind, {myName.split(" ")[0]}?
                </span>
                <button className="cm-post-btn-sm">Post</button>
              </div>
            ) : (
              <div className="cm-compose-open">
                <div className="cm-compose-top">
                  <MiniAvatar id={myAvatar} size={38} />
                  <div className="cm-compose-body">
                    <textarea
                      ref={textareaRef}
                      className="cm-compose-area"
                      placeholder="Share something with the NullPointer community…"
                      value={draft}
                      onChange={e => setDraft(e.target.value)}
                      maxLength={1000}
                    />
                    <div className="cm-compose-footer">
                      <div className="cm-compose-left-actions">
                        <select
                          className="cm-tag-select"
                          value={draftTag}
                          onChange={e => setDraftTag(e.target.value)}
                        >
                          {TAGS.filter(t => t !== "All").map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <span className="cm-char-count">{draft.length}/1000</span>
                      </div>
                      <div className="cm-compose-right-actions">
                        <button className="cm-btn-ghost" onClick={() => { setComposing(false); setDraft(""); }}>
                          Cancel
                        </button>
                        <button
                          className="cm-btn-post"
                          onClick={submitPost}
                          disabled={!draft.trim() || submitting}
                        >
                          {submitting ? <><i className="ri-loader-4-line" /> Posting…</> : <><i className="ri-send-plane-fill" /> Post</>}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {loading && <div className="cm-loading"><i className="ri-loader-4-line cm-spin" /> Loading...</div>}
            {error && !loading && <div className="cm-error"><i className="ri-wifi-off-line" /> <p>{error}</p></div>}

            {!loading && !error && (
              <div className="cm-posts">
                {filtered.map((post, idx) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    idx={idx}
                    isOwn={isOwn(post)}
                    bookmarked={!!bookmarks[post.id]}
                    reactionPop={reactionPop}
                    commentOpen={commentOpen}
                    commentDraft={commentDraft}
                    deleteConfirm={deleteConfirm}
                    editingPost={editingPost}
                    onReact={addReaction}
                    onToggleReactionPop={(id) => setReactionPop(prev => prev === id ? null : id)}
                    onBookmark={toggleBookmark}
                    onCommentToggle={(id) => { setCommentOpen(prev => prev === id ? null : id); setCommentDraft(""); }}
                    onCommentDraft={setCommentDraft}
                    onCommentSubmit={submitComment}
                    onDelete={(id) => setDeleteConfirm(id)}
                    onDeleteConfirm={deletePost}
                    onDeleteCancel={() => setDeleteConfirm(null)}
                    onEdit={(post) => setEditingPost({ id: post.id, content: post.content, tag: post.tag })}
                    onEditChange={(field, val) => setEditingPost(prev => ({ ...prev, [field]: val }))}
                    onEditSave={saveEdit}
                    onEditCancel={() => setEditingPost(null)}
                  />
                ))}
              </div>
            )}
          </main>

          {/* RIGHT SIDEBAR */}
          <aside className="cm-right">
            <div className="cm-right-section">
              <h3 className="cm-right-title"><i className="ri-bar-chart-line" /> Stats</h3>
              <div className="cm-stats-grid">
                <div className="cm-stat-item"><span className="cm-stat-n">{posts.length}</span><span className="cm-stat-l">Posts</span></div>
                <div className="cm-stat-item">
                  <span className="cm-stat-n">{posts.reduce((a, p) => a + Object.values(p.reactions).reduce((s, n) => s + n, 0), 0)}</span>
                  <span className="cm-stat-l">Reactions</span>
                </div>
              </div>
            </div>
            <div className="cm-right-section">
              <h3 className="cm-right-title"><i className="ri-award-line" /> Guidelines</h3>
              <ul className="cm-rules">
                <li><i className="ri-check-line" /> Be respectful</li>
                <li><i className="ri-check-line" /> Share tech-relevant content</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   POST CARD COMPONENT (Keep as is)
═══════════════════════════════════════════════ */
function PostCard({
  post, idx, isOwn, bookmarked,
  reactionPop, commentOpen, commentDraft, deleteConfirm, editingPost,
  onReact, onToggleReactionPop, onBookmark, onCommentToggle,
  onCommentDraft, onCommentSubmit, onDelete, onDeleteConfirm, onDeleteCancel,
  onEdit, onEditChange, onEditSave, onEditCancel,
}) {
  const isEditing    = editingPost?.id === post.id;
  const isDeleting   = deleteConfirm   === post.id;
  const isCommenting = commentOpen     === post.id;
  const isReacting   = reactionPop     === post.id;
  const totalReacts  = Object.values(post.reactions).reduce((s, n) => s + n, 0);
  const topReactions = Object.entries(post.reactions).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([e])=>e);

  return (
    <div className="cm-post-card" style={{ animationDelay: `${idx * 0.04}s` }}>
      {isDeleting && (
        <div className="cm-delete-overlay">
          <div className="cm-delete-box">
            <p>Delete permanently?</p>
            <div className="cm-delete-actions">
              <button className="cm-btn-del-confirm" onClick={() => onDeleteConfirm(post.id)}>Delete</button>
              <button className="cm-btn-ghost" onClick={onDeleteCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isEditing ? (
        <div className="cm-edit-mode">
          <textarea className="cm-edit-area" value={editingPost.content} onChange={e => onEditChange("content", e.target.value)} />
          <div className="cm-edit-btns">
            <button className="cm-btn-ghost" onClick={onEditCancel}>Cancel</button>
            <button className="cm-btn-post" onClick={onEditSave}>Save</button>
          </div>
        </div>
      ) : (
        <>
          <div className="cm-post-header">
            <div className="cm-post-meta">
              <MiniAvatar id={post.avatarId} size={36} />
              <div className="cm-post-author-block">
                <span className="cm-post-author">{post.authorName}</span>
                <span className="cm-post-time">{timeAgo(post.createdAt)}</span>
              </div>
            </div>
            {isOwn && (
              <div className="cm-own-actions">
                <button className="cm-icon-btn" onClick={() => onEdit(post)}><i className="ri-pencil-line" /></button>
                <button className="cm-icon-btn danger" onClick={() => onDelete(post.id)}><i className="ri-delete-bin-line" /></button>
              </div>
            )}
          </div>
          <p className="cm-post-content">{post.content}</p>
          <div className="cm-action-bar">
             <div className="cm-react-wrap">
              <button className={`cm-action-btn ${isReacting ? "active-react" : ""}`} onClick={() => onToggleReactionPop(post.id)}>
                <i className="ri-emotion-line" /> <span>{totalReacts || "React"}</span>
              </button>
              {isReacting && (
                <div className="cm-reaction-pop">
                  {REACTIONS.map(r => (
                    <button key={r.emoji} className="cm-emoji-btn" onClick={() => onReact(post.id, r.emoji)}>{r.emoji}</button>
                  ))}
                </div>
              )}
            </div>
            <button className="cm-action-btn" onClick={() => onCommentToggle(post.id)}><i className="ri-chat-3-line" /> <span>{post.comments.length || "Reply"}</span></button>
            <button className={`cm-action-btn ${bookmarked ? "bookmarked" : ""}`} onClick={() => onBookmark(post.id)}><i className={bookmarked ? "ri-bookmark-fill" : "ri-bookmark-line"} /></button>
          </div>
          {isCommenting && (
            <div className="cm-comments-section">
              {post.comments.map(c => (
                <div key={c.id} className="cm-comment">
                  <MiniAvatar id={c.avatarId} size={24} />
                  <div className="cm-comment-body"><b>{c.authorName}</b>: {c.text}</div>
                </div>
              ))}
              <div className="cm-comment-input-row">
                <input className="cm-comment-input" placeholder="Reply..." value={commentDraft} onChange={e => onCommentDraft(e.target.value)} />
                <button onClick={() => onCommentSubmit(post.id)}><i className="ri-send-plane-fill" /></button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}