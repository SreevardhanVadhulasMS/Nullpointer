import { useState, useEffect, useRef } from "react";
import HomeNavbar from "../components/HomeNavbar";
import "./SoftSkills.css";

/* ═══════════════════════════════════════════════════
   CURRICULUM DATA
═══════════════════════════════════════════════════ */
const CHAPTERS = [
  {
    id: "verbal",
    title: "Verbal Communication",
    icon: "ri-chat-voice-line",
    color: "#e07a5f",
    tagline: "What you say — and how you say it",
    intro: "Verbal communication is the foundation of human connection. It's not just about speaking — it's about crafting messages that land exactly the way you intend them to.",
    sections: [
      {
        heading: "The 7 Cs of Effective Communication",
        type: "framework",
        items: [
          { label: "Clear", desc: "Use simple, direct language. Avoid jargon unless your audience shares it. One idea per sentence.", icon: "ri-eye-line" },
          { label: "Concise", desc: "Respect the listener's time. Cut filler words. Say more with less.", icon: "ri-scissors-cut-line" },
          { label: "Concrete", desc: "Use specific facts and examples. 'Revenue grew 23%' beats 'revenue improved significantly'.", icon: "ri-anchor-line" },
          { label: "Correct", desc: "Verify facts before speaking. Grammar and tone must fit the context.", icon: "ri-shield-check-line" },
          { label: "Coherent", desc: "Ideas must flow logically. Use connective words: 'therefore', 'however', 'as a result'.", icon: "ri-git-branch-line" },
          { label: "Complete", desc: "Cover who, what, when, where, why. Never leave your listener guessing next steps.", icon: "ri-list-check-2" },
          { label: "Courteous", desc: "Tone matters as much as content. Always acknowledge the other person's perspective first.", icon: "ri-heart-line" },
        ]
      },
      {
        heading: "Active Listening vs. Passive Hearing",
        type: "compare",
        left: {
          label: "Passive Hearing",
          color: "#e07a5f",
          points: [
            "Waiting for your turn to speak",
            "Half-attention — phone in hand",
            "Responding before the person finishes",
            "Preparing your rebuttal mentally",
            "Missing emotional undertones",
          ]
        },
        right: {
          label: "Active Listening",
          color: "#81b29a",
          points: [
            "Full presence — eyes, body, mind",
            "Paraphrasing to confirm understanding",
            "Asking clarifying questions",
            "Noticing tone, pace, and pauses",
            "Responding to what was meant, not just said",
          ]
        }
      },
      {
        heading: "Structuring Powerful Spoken Messages",
        type: "steps",
        steps: [
          { n: "01", title: "Hook", desc: "Open with a question, statistic, or bold claim. You have 8 seconds to capture attention." },
          { n: "02", title: "Context", desc: "Brief background. Why does this matter right now? Make it relevant to your listener." },
          { n: "03", title: "Core Message", desc: "One clear main point. Everything else supports this. Say it simply and confidently." },
          { n: "04", title: "Evidence", desc: "Two or three supporting examples, data points, or stories. Make the abstract tangible." },
          { n: "05", title: "Call to Action", desc: "What do you want the listener to do, think, or feel after this? Always end with direction." },
        ]
      },
      {
        heading: "Voice Modulation Toolkit",
        type: "toolkit",
        tools: [
          { name: "Pace", tip: "Slow down for important points. Speed up for energy and enthusiasm. Vary it intentionally." },
          { name: "Pause", tip: "Silence is powerful. A 2-second pause after a key point gives it weight and lets it sink in." },
          { name: "Pitch", tip: "Rising pitch signals questions or uncertainty. Falling pitch signals authority and finality." },
          { name: "Volume", desc: "Speak louder to signal importance. Speak softer to create intimacy — people lean in." },
          { name: "Emphasis", tip: "Stress the right word. 'I never said she stole money' has 7 meanings depending on emphasis." },
        ]
      },
      {
        heading: "Real-World Scenario",
        type: "scenario",
        scenario: "You're presenting your project to a panel of senior managers. Three minutes in, you notice two of them checking their phones.",
        options: [
          { text: "Speed up to get through your content faster", outcome: "❌ Rushing signals panic and loses the audience further.", good: false },
          { text: "Pause, make direct eye contact, and ask: 'Is this the right level of detail for you all?'", outcome: "✅ Shows confidence, self-awareness, and audience focus. This is what great communicators do.", good: true },
          { text: "Ignore it and continue exactly as planned", outcome: "⚠️ Safe, but a missed opportunity to build connection and adapt in real-time.", good: false },
          { text: "Apologize for being boring and skip ahead", outcome: "❌ Undermines your credibility immediately. Never apologize for your content.", good: false },
        ]
      }
    ],
    quiz: [
      { q: "What does the 'C' for Concise mean in the 7 Cs?", opts: ["Using complex vocabulary", "Eliminating unnecessary words while keeping full meaning", "Covering every possible detail", "Speaking confidently"], ans: 1 },
      { q: "Active listening primarily involves:", opts: ["Preparing your response while the other person speaks", "Full presence and paraphrasing to confirm understanding", "Speaking louder to be understood", "Asking yes/no questions only"], ans: 1 },
      { q: "A 2-second pause in spoken communication:", opts: ["Signals that you forgot your point", "Creates awkwardness and should be avoided", "Gives weight to important statements and lets them land", "Is only useful in presentations"], ans: 2 },
      { q: "Rising pitch at the end of a sentence typically signals:", opts: ["Authority and finality", "Questions or uncertainty", "Enthusiasm and energy", "Anger or frustration"], ans: 1 },
      { q: "The best first element of a structured spoken message is:", opts: ["Detailed background context", "A hook — question, statistic, or bold claim", "Your main conclusion", "A list of agenda items"], ans: 1 },
      { q: "When two senior managers check their phones during your talk, the best response is:", opts: ["Speed up to finish faster", "Apologize for being boring", "Ask if the detail level is right for them", "Ignore it and continue"], ans: 2 },
      { q: "Which is NOT one of the 7 Cs of communication?", opts: ["Clear", "Coherent", "Creative", "Courteous"], ans: 2 },
      { q: "Stressing different words in 'I never said she stole money' demonstrates:", opts: ["Incorrect grammar", "How emphasis changes meaning entirely", "A rude communication style", "Lack of confidence"], ans: 1 },
      { q: "'Concrete' communication means:", opts: ["Speaking slowly and deliberately", "Using specific facts and examples rather than vague statements", "Being formal and professional", "Writing everything down"], ans: 1 },
      { q: "The most critical difference between hearing and listening is:", opts: ["Volume of sound processed", "Active engagement and comprehension vs. passive sound reception", "The language used", "The speed of the conversation"], ans: 1 },
    ]
  },
  {
    id: "nonverbal",
    title: "Non-Verbal Communication",
    icon: "ri-body-scan-line",
    color: "#81b29a",
    tagline: "93% of impact is never spoken",
    intro: "Research by Albert Mehrabian showed that in emotional communication, only 7% comes from words. 38% is tone of voice. 55% is body language. Master the unspoken language.",
    sections: [
      {
        heading: "The Silent Language: Key Channels",
        type: "cards_grid",
        cards: [
          { icon: "ri-eye-2-line", title: "Eye Contact", desc: "Direct eye contact signals confidence and trust. Breaking eye contact downward signals shame. Breaking sideways signals thinking. Holding it too long signals aggression." },
          { icon: "ri-hand-line", title: "Gestures", desc: "Open palms signal honesty and openness. Pointing fingers signal aggression. Steepled fingers signal authority. Crossed arms signal defensiveness (but also cold)." },
          { icon: "ri-user-line", title: "Posture", desc: "Upright open posture = confidence. Slumped shoulders = low energy/sadness. Leaning forward = interest. Leaning back = disengagement or arrogance." },
          { icon: "ri-arrow-left-right-line", title: "Proxemics (Space)", desc: "Intimate (0–45cm): close relationships. Personal (45cm–1.2m): friends. Social (1.2–3.7m): colleagues. Public (3.7m+): audiences." },
          { icon: "ri-emotion-line", title: "Facial Expressions", desc: "Paul Ekman identified 7 universal micro-expressions: happiness, sadness, disgust, fear, surprise, anger, contempt. They're cross-cultural and difficult to fake." },
          { icon: "ri-time-line", title: "Chronemics (Time)", desc: "How you use time communicates power. Arriving late = disrespect. Responding quickly to messages = prioritizing. Being present = respect." },
        ]
      },
      {
        heading: "Congruence: When Body and Words Align",
        type: "insight_block",
        insight: "When someone says 'I'm fine' with crossed arms, downcast eyes, and a flat tone — which do you believe? Incongruence between verbal and non-verbal signals destroys trust instantly. Your body leaks your true emotional state even when your words conceal it.",
        takeaway: "The professional goal isn't to fake confidence — it's to understand your genuine state, then consciously align your body language with your intended message."
      },
      {
        heading: "Power Poses & Their Real Effect",
        type: "steps",
        steps: [
          { n: "01", title: "The Expansion Principle", desc: "High-power individuals naturally take up more space. Low-power individuals make themselves small. Consciously expanding your physical presence shifts your mental state." },
          { n: "02", title: "Before High-Stakes Situations", desc: "Research suggests 2 minutes of expansive posture before interviews, presentations, or negotiations can increase feelings of confidence — even if the hormonal data is debated." },
          { n: "03", title: "The Mirror Effect", desc: "Subtly mirroring another person's posture and pace builds subconscious rapport. It signals 'I am like you.' Use it deliberately in interviews and negotiations." },
          { n: "04", title: "The Handshake Signal", desc: "Firm (not crushing) handshake = confidence and warmth. Palm-down = dominance. Palm-up = submission. Vertical palm = equality. Match the situation." },
        ]
      },
      {
        heading: "Reading the Room: Practice Scenario",
        type: "scenario",
        scenario: "You walk into a team meeting. Your colleague is sitting with arms crossed, leaning slightly back, minimal eye contact, and answering questions with short one-word responses.",
        options: [
          { text: "They are being rude and disrespectful to the team", outcome: "⚠️ Possible, but jumping to conclusions without context is a cognitive error. Could be cold, tired, or anxious.", good: false },
          { text: "They are cold and should wear a jacket", outcome: "😄 Literally possible! Arms crossing isn't always defensive.", good: false },
          { text: "They may be disengaged, defensive, or uncomfortable — worth a private check-in", outcome: "✅ Contextual interpretation + empathetic action. This is the skilled response.", good: true },
          { text: "Ignore the signals — only words matter", outcome: "❌ Dismissing non-verbal cues causes missed connections and unresolved tension.", good: false },
        ]
      }
    ],
    quiz: [
      { q: "According to Mehrabian's research on emotional communication, what % comes from body language?", opts: ["7%", "38%", "55%", "80%"], ans: 2 },
      { q: "Open palm gestures typically signal:", opts: ["Aggression and dominance", "Honesty and openness", "Nervousness", "Boredom"], ans: 1 },
      { q: "Proxemics refers to:", opts: ["Facial expressions", "The use of time in communication", "How physical space and distance communicate meaning", "Voice tone modulation"], ans: 2 },
      { q: "Paul Ekman's 7 universal micro-expressions are:", opts: ["Culturally specific to Western countries", "Cross-cultural and difficult to fake", "Only visible in high-stress situations", "Learned behaviors from childhood"], ans: 1 },
      { q: "When someone's words say 'I'm fine' but their body signals discomfort, what happens?", opts: ["The words are more credible", "Trust is maintained because intent matters", "Incongruence destroys credibility and trust", "Nothing — people don't notice"], ans: 2 },
      { q: "The mirror effect in communication works by:", opts: ["Copying someone's accent", "Subtly mirroring posture and pace to build subconscious rapport", "Repeating back their exact words", "Matching their clothing style"], ans: 1 },
      { q: "A palm-vertical handshake signals:", opts: ["Dominance", "Submission", "Equality", "Aggression"], ans: 2 },
      { q: "Chronemics as a non-verbal channel relates to:", opts: ["Body posture", "How time usage communicates respect and power", "Facial expressions", "Spatial distance"], ans: 1 },
      { q: "Someone leaning forward during a conversation most likely signals:", opts: ["Aggression", "Disengagement", "Interest and engagement", "Dominance"], ans: 2 },
      { q: "The professional goal of understanding body language is to:", opts: ["Fake confidence at all times", "Manipulate others effectively", "Align your body language authentically with your intended message", "Ignore others' non-verbal cues"], ans: 2 },
    ]
  },
  {
    id: "ei",
    title: "Emotional Intelligence",
    icon: "ri-mental-health-line",
    color: "#a09bc9",
    tagline: "IQ gets you hired. EQ gets you promoted.",
    intro: "Daniel Goleman's landmark research found that EQ — not IQ — was the strongest predictor of professional success. Leaders with high EQ outperform those without by 20% in performance ratings. Here's the science behind it.",
    sections: [
      {
        heading: "The 5 Pillars of EQ (Goleman Framework)",
        type: "framework",
        items: [
          { label: "Self-Awareness", desc: "Knowing your own emotions, strengths, weaknesses, and how they affect others. The foundation of everything else.", icon: "ri-user-search-line" },
          { label: "Self-Regulation", desc: "Managing disruptive emotions and impulses. Thinking before acting. Not letting a bad morning ruin your whole day.", icon: "ri-settings-3-line" },
          { label: "Motivation", desc: "Internal drive beyond money and status. A passion to work for intrinsic reasons. Resilience in the face of setbacks.", icon: "ri-rocket-line" },
          { label: "Empathy", desc: "Understanding the emotional makeup of other people. Skill in treating people according to their reactions.", icon: "ri-heart-2-line" },
          { label: "Social Skills", desc: "Proficiency in managing relationships. Finding common ground. Building networks. Managing conflict skillfully.", icon: "ri-team-line" },
        ]
      },
      {
        heading: "The EQ vs. IQ Debate",
        type: "compare",
        left: {
          label: "IQ (Intelligence Quotient)",
          color: "#5fb8c8",
          points: [
            "Measures cognitive ability and problem-solving",
            "Largely stable after age 16",
            "Predicts academic performance strongly",
            "Threshold competency for most professional roles",
            "Cannot be significantly trained",
          ]
        },
        right: {
          label: "EQ (Emotional Quotient)",
          color: "#a09bc9",
          points: [
            "Measures emotional recognition and regulation",
            "Can be significantly developed with practice",
            "Strongest predictor of leadership success",
            "Differentiator in collaborative environments",
            "Improves with age and self-reflection",
          ]
        }
      },
      {
        heading: "The 4-Second Rule: Managing Emotional Hijack",
        type: "steps",
        steps: [
          { n: "01", title: "Recognize the Trigger", desc: "Notice when you feel your heart rate spike, jaw clench, or thoughts race. That's your amygdala taking over — the 'fight or flight' hijack." },
          { n: "02", title: "Name the Emotion", desc: "Research shows simply labeling an emotion ('I feel frustrated') activates the prefrontal cortex and reduces amygdala activity by up to 50%." },
          { n: "03", title: "Buy 4 Seconds", desc: "Take a deep breath. Count to 4. This allows the neocortex to re-engage and override the impulsive emotional response." },
          { n: "04", title: "Choose Your Response", desc: "Now you respond from your best self, not your triggered self. This is self-regulation in action. It's the difference between reacting and responding." },
        ]
      },
      {
        heading: "Empathy in Practice: 3 Levels",
        type: "toolkit",
        tools: [
          { name: "Cognitive Empathy", tip: "Understanding intellectually how someone feels. 'I can see why you'd be frustrated with that deadline.' Useful in negotiations and leadership." },
          { name: "Emotional Empathy", tip: "Actually feeling what another person feels — you physically experience their pain or joy. Can lead to emotional burnout if unmanaged." },
          { name: "Compassionate Empathy", tip: "Understanding + feeling + acting. This is the highest form. You acknowledge the emotion AND take steps to help. The gold standard in leadership." },
        ]
      },
      {
        heading: "EQ in a High-Pressure Scenario",
        type: "scenario",
        scenario: "Your team member publicly disagrees with your idea in a meeting — in a sharp tone that feels disrespectful in front of the whole team.",
        options: [
          { text: "Shut them down immediately to maintain authority", outcome: "❌ Low EQ response. Escalates tension, damages trust, and models poor emotional regulation to the team.", good: false },
          { text: "Say nothing but plan to address it later with HR", outcome: "⚠️ Avoidance. The tension remains and others saw the exchange. Silence signals you have no response.", good: false },
          { text: "Say 'That's a strong point — let's dig into it after the meeting' and move on professionally", outcome: "✅ High EQ: acknowledges the challenge without escalating. Maintains authority while showing confidence and emotional control.", good: true },
          { text: "Agree with everything they said to keep the peace", outcome: "❌ People-pleasing, not emotional intelligence. Destroys your credibility as a leader.", good: false },
        ]
      }
    ],
    quiz: [
      { q: "According to Goleman's research, what is the strongest predictor of professional success?", opts: ["IQ", "Technical skills", "EQ (Emotional Intelligence)", "Networking ability"], ans: 2 },
      { q: "Self-regulation in emotional intelligence means:", opts: ["Suppressing all emotions professionally", "Managing disruptive emotions and thinking before acting", "Only expressing positive emotions", "Following rules strictly"], ans: 1 },
      { q: "Naming an emotion ('I feel frustrated') does what neurologically?", opts: ["Increases amygdala activity", "Has no effect on brain activity", "Reduces amygdala activity and re-engages the prefrontal cortex", "Causes emotional hijack"], ans: 2 },
      { q: "Compassionate empathy is best described as:", opts: ["Feeling what others feel and becoming overwhelmed", "Understanding emotions intellectually without feeling them", "Understanding + feeling + taking action to help", "Offering advice to solve others' problems"], ans: 2 },
      { q: "Unlike IQ, EQ:", opts: ["Declines significantly after age 30", "Cannot be measured", "Can be significantly developed with practice", "Is fixed from birth"], ans: 2 },
      { q: "The 'emotional hijack' refers to:", opts: ["Deliberately manipulating others' emotions", "The amygdala overriding rational thinking in high-stress moments", "Feeling overly empathetic towards colleagues", "The process of naming your emotions"], ans: 1 },
      { q: "When a team member disrespects you publicly, the high-EQ response is:", opts: ["Shut them down to maintain authority", "Say 'That's a strong point — let's dig into it after the meeting'", "Agree with everything they said", "File a complaint with HR immediately"], ans: 1 },
      { q: "Which pillar of EQ involves internal drive beyond money and status?", opts: ["Self-awareness", "Empathy", "Self-regulation", "Motivation"], ans: 3 },
      { q: "Cognitive empathy means:", opts: ["Actually feeling another's pain physically", "Understanding intellectually how someone feels", "Feeling emotions but not acting on them", "Suppressing your own emotions to focus on others"], ans: 1 },
      { q: "EQ research shows leaders with high EQ outperform others by approximately:", opts: ["5%", "20%", "50%", "75%"], ans: 1 },
    ]
  },
  {
    id: "conflict",
    title: "Conflict Resolution",
    icon: "ri-scales-3-line",
    color: "#5fb8c8",
    tagline: "Conflict is inevitable. Poor resolution is not.",
    intro: "Workplace conflict costs companies an estimated $359 billion annually in lost productivity (CPP Global). Yet research shows teams that navigate conflict well are 20% more innovative. The goal isn't conflict avoidance — it's conflict mastery.",
    sections: [
      {
        heading: "The Thomas-Kilmann Conflict Modes",
        type: "framework",
        items: [
          { label: "Competing", desc: "High assertiveness, low cooperativeness. 'My way or the highway.' Useful for emergencies, but toxic as default behavior.", icon: "ri-sword-line" },
          { label: "Accommodating", desc: "Low assertiveness, high cooperativeness. 'Whatever you want.' Preserves relationships short-term, builds resentment long-term.", icon: "ri-hand-heart-line" },
          { label: "Avoiding", desc: "Low assertiveness, low cooperativeness. Neither confronting nor yielding. Delay is sometimes strategic — but it rarely resolves anything.", icon: "ri-run-line" },
          { label: "Compromising", desc: "Middle ground on both dimensions. 'We both give a little.' Quick fix, but often leaves both parties partially dissatisfied.", icon: "ri-scales-line" },
          { label: "Collaborating", desc: "High assertiveness AND high cooperativeness. 'Let's find a solution that works for both of us.' Takes longer but creates the strongest outcomes.", icon: "ri-team-line" },
        ]
      },
      {
        heading: "The DEAR MAN Framework (Assertive Communication)",
        type: "steps",
        steps: [
          { n: "D", title: "Describe", desc: "Describe the situation using only observable facts. 'You interrupted me three times in today's meeting.' Not: 'You always disrespect me.'" },
          { n: "E", title: "Express", desc: "Express how you feel using 'I' statements. 'I felt dismissed and undervalued.' Not: 'You make me feel stupid.'" },
          { n: "A", title: "Assert", desc: "Clearly state what you want. 'I'd like you to let me finish my points before responding.'" },
          { n: "R", title: "Reinforce", desc: "Explain the positive outcome: 'When we communicate this way, our ideas are sharper and our collaboration improves.'" },
          { n: "M", title: "Mindful", desc: "Stay focused on your goal. Don't get sidetracked by counter-attacks or blame. Broken record if needed." },
          { n: "A", title: "Appear Confident", desc: "Maintain eye contact, even tone, upright posture. Your body language must match your message." },
          { n: "N", title: "Negotiate", desc: "Offer alternatives if your original request can't be met. Flexibility signals collaborative intent." },
        ]
      },
      {
        heading: "Hot vs. Cool Conflict",
        type: "compare",
        left: {
          label: "Hot Conflict",
          color: "#e07a5f",
          points: [
            "Loud, emotional, visible tension",
            "Easier to identify and address",
            "Short-lived if resolved quickly",
            "Risk of saying things in the heat of the moment",
            "Clears the air when handled well",
          ]
        },
        right: {
          label: "Cold Conflict",
          color: "#5fb8c8",
          points: [
            "Silent, passive, underground tension",
            "Hard to detect — often mistaken for harmony",
            "Festers for months or years if unaddressed",
            "Expressed through avoidance, gossip, and withdrawal",
            "Far more damaging to teams long-term",
          ]
        }
      },
      {
        heading: "The Resolution Scenario",
        type: "scenario",
        scenario: "Two team members have been passively avoiding each other for 3 weeks after a project disagreement. Work quality in the team has dropped and others are picking up the tension.",
        options: [
          { text: "Wait for them to sort it out naturally", outcome: "❌ Cold conflict rarely resolves itself. 3 more weeks will make it worse. Team morale continues to suffer.", good: false },
          { text: "Call a full team meeting to air all grievances openly", outcome: "⚠️ Risky. Public confrontation can embarrass people and escalate tension. Better to start privately.", good: false },
          { text: "Have individual private conversations with each person, then a structured facilitated discussion", outcome: "✅ Best practice. Understand both perspectives privately, then create a safe space for collaborative resolution.", good: true },
          { text: "Separate their responsibilities so they never need to interact", outcome: "⚠️ Avoidance strategy. Temporarily reduces friction but doesn't resolve the underlying conflict and limits team cohesion.", good: false },
        ]
      }
    ],
    quiz: [
      { q: "In the Thomas-Kilmann model, which conflict mode combines high assertiveness AND high cooperativeness?", opts: ["Competing", "Compromising", "Accommodating", "Collaborating"], ans: 3 },
      { q: "The 'avoiding' conflict mode is characterized by:", opts: ["High assertiveness and low cooperativeness", "Low assertiveness and low cooperativeness", "High cooperativeness and low assertiveness", "Equal assertiveness and cooperativeness"], ans: 1 },
      { q: "In DEAR MAN, the 'E' stands for:", opts: ["Engage with facts", "Express feelings using I-statements", "Evaluate the situation", "Emphasize your position"], ans: 1 },
      { q: "Cold conflict is more dangerous than hot conflict because:", opts: ["It is louder and more visible", "It festers silently and is harder to detect and address", "It always leads to someone quitting", "It only affects two people"], ans: 1 },
      { q: "When giving feedback in conflict using DEAR MAN, you should say:", opts: ["'You always make me feel stupid'", "'You interrupted me — you're disrespectful'", "'I felt dismissed when I was interrupted three times today'", "'Everyone agrees you were wrong'"], ans: 2 },
      { q: "Compromising as a conflict mode means:", opts: ["One party wins completely", "Both parties give a little to find middle ground", "The conflict is avoided entirely", "An authority figure decides the outcome"], ans: 1 },
      { q: "The best first step when two team members have a prolonged cold conflict is:", opts: ["Full team meeting to air all grievances", "Individual private conversations with each person", "Separating their responsibilities permanently", "Waiting for it to resolve naturally"], ans: 1 },
      { q: "Workplace conflict costs companies approximately how much annually per CPP research?", opts: ["$50 billion", "$150 billion", "$359 billion", "$1 trillion"], ans: 2 },
      { q: "Teams that navigate conflict well tend to be:", opts: ["More hierarchical", "Less productive", "20% more innovative", "Smaller in size"], ans: 2 },
      { q: "The 'Reinforce' step in DEAR MAN involves:", opts: ["Repeating your demand until it's accepted", "Explaining the positive outcomes of the desired behavior", "Using a firm tone of voice", "Writing a formal complaint"], ans: 1 },
    ]
  },
  {
    id: "teamwork",
    title: "Teamwork & Collaboration",
    icon: "ri-team-line",
    color: "#c9a96e",
    tagline: "None of us is as smart as all of us.",
    intro: "Google's two-year Project Aristotle study analyzed 180 teams to find what makes them successful. The answer wasn't who was on the team — it was how they worked together. Psychological safety was the #1 predictor.",
    sections: [
      {
        heading: "Tuckman's Stages of Team Development",
        type: "steps",
        steps: [
          { n: "01", title: "Forming", desc: "Team members are polite, guarded, and figuring out roles. Conflict is minimal — but so is productivity. Everyone is on their best behavior." },
          { n: "02", title: "Storming", desc: "The honeymoon ends. Personalities clash, authority is challenged, and roles are contested. This is the most critical stage — most teams fail here." },
          { n: "03", title: "Norming", desc: "Norms emerge. Roles are accepted. Collaboration deepens. Trust is established. Teams that survive storming become genuinely cohesive here." },
          { n: "04", title: "Performing", desc: "The team operates at high efficiency. Conflict is managed constructively. Interdependence is high. Results speak for themselves." },
          { n: "05", title: "Adjourning", desc: "Project ends. Acknowledging contributions and celebrating success is critical for future team formation and individual closure." },
        ]
      },
      {
        heading: "The 5 Dysfunctions of a Team (Lencioni)",
        type: "framework",
        items: [
          { label: "Absence of Trust", desc: "Members are unwilling to be vulnerable. They hide weaknesses and mistakes. Foundation of all other dysfunctions.", icon: "ri-lock-line" },
          { label: "Fear of Conflict", desc: "Teams avoid passionate debate. Artificial harmony masks tension. The best ideas never surface.", icon: "ri-alarm-warning-line" },
          { label: "Lack of Commitment", desc: "Without honest debate, buy-in is fake. Members nod in meetings and undermine decisions afterwards.", icon: "ri-checkbox-indeterminate-line" },
          { label: "Avoidance of Accountability", desc: "Without commitment, people avoid holding each other to standards. 'Not my problem' culture spreads.", icon: "ri-shield-cross-line" },
          { label: "Inattention to Results", desc: "Individual status and ego override team outcomes. Members prioritize personal agendas over collective success.", icon: "ri-focus-3-line" },
        ]
      },
      {
        heading: "Psychological Safety: The #1 Team Factor",
        type: "insight_block",
        insight: "Amy Edmondson's research at Harvard shows that psychological safety — the belief that you won't be punished for speaking up — is the single greatest predictor of team performance. Teams with high psychological safety take more risks, admit mistakes faster, learn quicker, and innovate more boldly.",
        takeaway: "Creating psychological safety is a leadership skill and a personal responsibility. It starts with you saying: 'I don't know. I was wrong. What do you think?'"
      },
      {
        heading: "Your Role in Team Dynamics",
        type: "toolkit",
        tools: [
          { name: "The Contributor", tip: "Does the work reliably. Meets commitments. The backbone of every high-functioning team. Often undervalued." },
          { name: "The Challenger", tip: "Questions assumptions. Devil's advocate. Prevents groupthink. Can be abrasive — but teams without one make poor decisions." },
          { name: "The Connector", tip: "Bridges people and ideas. Reduces silo thinking. Often the informal leader people actually trust." },
          { name: "The Creator", tip: "Generates ideas freely. Energizes the room. Needs collaborators to ground and execute their vision." },
          { name: "The Completer", tip: "Focuses on quality and follow-through. Finishes what others start. Keeps the team accountable to standards." },
        ]
      },
      {
        heading: "Team Conflict Scenario",
        type: "scenario",
        scenario: "Your team is in the 'Storming' phase. Two dominant personalities are arguing about project direction in every meeting. Others have gone silent and disengaged.",
        options: [
          { text: "Let the two dominant people figure it out — the best idea will win", outcome: "❌ The silent majority disengages further. The team misses diverse perspectives. Power dynamics, not merit, decide.", good: false },
          { text: "Tell the two members to take their debate offline and create a structured decision framework for the team", outcome: "✅ Redirects energy productively. Creates a fair process. Protects team participation and speeds norming.", good: true },
          { text: "Remove one of the dominant personalities from the team", outcome: "⚠️ Extreme and usually counterproductive. Dominant personalities are often the most engaged. Redirect, don't remove.", good: false },
          { text: "Have a team meeting where everyone must rank the options by vote", outcome: "⚠️ Democratic but can silence quiet members. Combine with structured dialogue for best results.", good: false },
        ]
      }
    ],
    quiz: [
      { q: "What was the #1 predictor of team success in Google's Project Aristotle?", opts: ["Individual IQ of team members", "Technical skill diversity", "Psychological safety", "Clear hierarchy"], ans: 2 },
      { q: "In Tuckman's model, which stage involves the most conflict and is where most teams fail?", opts: ["Forming", "Storming", "Norming", "Performing"], ans: 1 },
      { q: "The first dysfunction in Lencioni's model is:", opts: ["Fear of conflict", "Absence of trust", "Lack of commitment", "Avoidance of accountability"], ans: 1 },
      { q: "Psychological safety is best defined as:", opts: ["Feeling physically safe at work", "The belief that you won't be punished for speaking up", "Having clear job security", "Being liked by your colleagues"], ans: 1 },
      { q: "A team in the 'Norming' stage is characterized by:", opts: ["Politeness and guarded behavior", "Personality clashes and authority challenges", "Emerging trust and accepted roles", "Maximum output and efficiency"], ans: 2 },
      { q: "The 'Challenger' role in teams primarily:", opts: ["Connects people and bridges silos", "Questions assumptions to prevent groupthink", "Generates new ideas freely", "Focuses on quality follow-through"], ans: 1 },
      { q: "When two dominant members dominate discussion and others go silent, the best action is:", opts: ["Let the best idea win through debate", "Remove one dominant member", "Create structured decision frameworks and redirect offline debate", "Take a vote immediately"], ans: 2 },
      { q: "'Fear of Conflict' as a team dysfunction leads to:", opts: ["Too many ideas being generated", "Artificial harmony that masks real tension and suppresses the best ideas", "Excessive competition between members", "Overcommitment to decisions"], ans: 1 },
      { q: "Creating psychological safety starts with a leader saying:", opts: ["'I have all the answers — trust the process'", "'Performance will be evaluated strictly'", "'I don't know. I was wrong. What do you think?'", "'Only the best ideas will be considered'"], ans: 2 },
      { q: "In Tuckman's 'Performing' stage, teams:", opts: ["Are polite but not yet productive", "Have maximum conflict between members", "Operate at high efficiency with constructive conflict management", "Are wrapping up and disbanding"], ans: 2 },
    ]
  },
  {
    id: "adaptability",
    title: "Adaptability",
    icon: "ri-refresh-line",
    color: "#e07a5f",
    tagline: "The most valuable skill in an uncertain world.",
    intro: "The World Economic Forum ranked adaptability as the #1 skill needed by 2025. In a world where industries transform in months, the ability to learn, unlearn, and relearn is the only sustainable competitive advantage.",
    sections: [
      {
        heading: "The 3 Levels of Adaptability",
        type: "framework",
        items: [
          { label: "Cognitive Adaptability", desc: "Flexibility in thinking. Willingness to change your mind with new evidence. Separating belief from identity.", icon: "ri-brain-line" },
          { label: "Emotional Adaptability", desc: "Regulating emotional responses to change. Tolerating ambiguity and uncertainty without shutdown.", icon: "ri-emotion-normal-line" },
          { label: "Dispositional Adaptability", desc: "The underlying orientation toward change — growth mindset, openness, resilience, and comfort with novelty.", icon: "ri-seedling-line" },
        ]
      },
      {
        heading: "Fixed vs. Growth Mindset (Carol Dweck)",
        type: "compare",
        left: {
          label: "Fixed Mindset",
          color: "#e07a5f",
          points: [
            "Abilities are static and unchangeable",
            "Failure is a judgment of self-worth",
            "Avoids challenges to protect self-image",
            "Threatened by others' success",
            "'I'm not a math person' (identity as ceiling)",
          ]
        },
        right: {
          label: "Growth Mindset",
          color: "#81b29a",
          points: [
            "Abilities are developed through effort",
            "Failure is data — a chance to learn",
            "Embraces challenges as growth opportunities",
            "Inspired by others' success",
            "'I can't do this yet' (yet as the key word)",
          ]
        }
      },
      {
        heading: "The VUCA Framework: Navigating Modern Change",
        type: "toolkit",
        tools: [
          { name: "V — Volatility", tip: "Change is rapid and unstable. Response: Build buffers, create flexible plans, develop scenario-thinking." },
          { name: "U — Uncertainty", tip: "Future is unpredictable. Response: Gather information, make smaller bets, test before committing." },
          { name: "C — Complexity", tip: "Multiple interconnected variables. Response: Seek diverse perspectives, systems thinking, consult experts." },
          { name: "A — Ambiguity", tip: "Causes and outcomes are unclear. Response: Start with what you know, take action, adjust based on feedback." },
        ]
      },
      {
        heading: "The Learning Loop: Adapt in Real Time",
        type: "steps",
        steps: [
          { n: "01", title: "Notice", desc: "Pay attention to signals that your current approach isn't working. Discomfort is data. Don't ignore the feedback." },
          { n: "02", title: "Pause", desc: "Resist the urge to double down on what's not working. The definition of insanity is doing the same thing and expecting different results." },
          { n: "03", title: "Reframe", desc: "Ask: 'What if everything I assumed here was wrong?' This unlocks new possibilities and breaks cognitive fixation." },
          { n: "04", title: "Experiment", desc: "Make the smallest possible change that tests your new hypothesis. Fail fast, learn quickly, adjust." },
          { n: "05", title: "Integrate", desc: "What did you learn? How does this update your mental model for next time? The loop closes with integration." },
        ]
      },
      {
        heading: "Adaptability Under Pressure Scenario",
        type: "scenario",
        scenario: "Your company has just announced a major pivot. Your entire team's roadmap is scrapped. Two years of work, restarted from scratch. Your manager asks for your thoughts.",
        options: [
          { text: "'This is a terrible decision. Two years wasted. I can't believe this happened.'", outcome: "❌ Understandable emotionally, but expressing this publicly signals low adaptability and emotional regulation to leadership.", good: false },
          { text: "'I need 24 hours to process this properly. Can we schedule a detailed discussion tomorrow?'", outcome: "✅ Shows self-awareness and emotional regulation. Buys time to respond from your best self, not your reactive self.", good: true },
          { text: "'I'm fully supportive of any direction the company takes!' (immediately)", outcome: "⚠️ Sycophantic and not credible. Instant unquestioning compliance is as problematic as instant resistance.", good: false },
          { text: "Say nothing and start updating your LinkedIn profile", outcome: "❌ Avoidance and disengagement. Signals you've already quit mentally before anything has even started.", good: false },
        ]
      }
    ],
    quiz: [
      { q: "According to the World Economic Forum, adaptability is ranked as:", opts: ["A nice-to-have soft skill", "The #1 skill needed by 2025", "Less important than technical skills", "Relevant only for leadership roles"], ans: 1 },
      { q: "In Carol Dweck's research, a growth mindset means:", opts: ["Always feeling positive about challenges", "Believing abilities are developed through effort and learning", "Avoiding failure at all costs", "Having natural talent in a domain"], ans: 1 },
      { q: "The 'U' in VUCA stands for:", opts: ["Unstable", "Uncertainty", "Unprepared", "Underdeveloped"], ans: 1 },
      { q: "The key word in 'I can't do this yet' reflects:", opts: ["Fixed mindset", "Avoidance", "Growth mindset", "Overconfidence"], ans: 2 },
      { q: "Cognitive adaptability is best described as:", opts: ["Managing emotional responses to change", "Flexibility in thinking and willingness to change views with evidence", "An underlying orientation toward novelty", "Physical ability to adapt to new environments"], ans: 1 },
      { q: "When your major project is scrapped, responding with 'I need 24 hours to process this' shows:", opts: ["Weakness and inability to cope", "Self-awareness and emotional regulation", "Lack of loyalty to the company", "Passive-aggressive behavior"], ans: 1 },
      { q: "In the Learning Loop, 'Reframe' means:", opts: ["Doing the same thing harder", "Blaming others for what isn't working", "Asking 'What if everything I assumed was wrong?'", "Immediately executing the new plan"], ans: 2 },
      { q: "Dispositional adaptability refers to:", opts: ["Your response speed to change", "The underlying growth mindset orientation toward change", "A specific skill you practice", "How quickly you learn new software"], ans: 1 },
      { q: "A fixed mindset person's response to failure is typically:", opts: ["To see it as data for learning", "To be inspired by others' success", "To treat it as a judgment of self-worth", "To embrace it as a growth opportunity"], ans: 2 },
      { q: "Emotional adaptability involves:", opts: ["Always being positive and upbeat", "Tolerating ambiguity and regulating emotional responses to change", "Suppressing negative emotions professionally", "Predicting the future accurately"], ans: 1 },
    ]
  },
  {
    id: "timemanagement",
    title: "Time Management",
    icon: "ri-timer-2-line",
    color: "#b07fd4",
    tagline: "Time is the only resource you can't earn back.",
    intro: "McKinsey research shows that knowledge workers waste 28% of their day on unnecessary email. The average professional is interrupted every 11 minutes and takes 23 minutes to recover focus. Time management is the meta-skill that enables every other skill.",
    sections: [
      {
        heading: "The Eisenhower Matrix",
        type: "framework",
        items: [
          { label: "Q1: Urgent + Important", desc: "Crises, emergencies, deadlines. Do immediately. But if you live here, your systems are broken.", icon: "ri-alarm-warning-line" },
          { label: "Q2: Not Urgent + Important", desc: "Planning, relationships, learning, health. This is where peak performers live. The most neglected quadrant.", icon: "ri-star-line" },
          { label: "Q3: Urgent + Not Important", desc: "Most meetings, most emails, most interruptions. Delegate or decline. These kill your day quietly.", icon: "ri-delete-back-2-line" },
          { label: "Q4: Not Urgent + Not Important", desc: "Social media spirals, passive TV, gossip. Eliminate ruthlessly. This is pure time debt.", icon: "ri-delete-bin-line" },
        ]
      },
      {
        heading: "Deep Work vs. Shallow Work (Cal Newport)",
        type: "compare",
        left: {
          label: "Shallow Work",
          color: "#e07a5f",
          points: [
            "Logistically easy, often in distraction",
            "Email, admin, routine meetings",
            "Produces little long-term value",
            "Easy to replicate — not a differentiator",
            "Feels busy but isn't productive",
          ]
        },
        right: {
          label: "Deep Work",
          color: "#b07fd4",
          points: [
            "Cognitively demanding, requires full focus",
            "The work that pushes your abilities",
            "Produces rare, high-value output",
            "Builds skills and professional reputation",
            "Rare in the modern world — and therefore valuable",
          ]
        }
      },
      {
        heading: "High-Performance Time Systems",
        type: "toolkit",
        tools: [
          { name: "Time Blocking", tip: "Schedule every hour of your day in advance. Assign specific tasks to specific blocks. Treat them like meetings you can't cancel." },
          { name: "The 2-Minute Rule", tip: "If a task takes under 2 minutes, do it immediately. Don't add it to your list. The list overhead costs more than the task." },
          { name: "Pomodoro Technique", tip: "25 minutes of focused work, 5 minute break. 4 cycles = 1 long break. Trains focus, prevents burnout, makes progress tangible." },
          { name: "Weekly Review", tip: "Every Friday or Sunday: review what you completed, what slipped, and plan next week. 30 minutes that saves 5 hours of reactive chaos." },
          { name: "Single-Tasking", tip: "Research shows multitasking reduces productivity by 40%. It's not multitasking — it's context-switching with a cognitive cost each time." },
        ]
      },
      {
        heading: "The Energy-Time Matrix",
        type: "steps",
        steps: [
          { n: "AM", title: "Peak Energy Window", desc: "Most people have 2–4 hours of peak cognitive energy in the morning. Protect this for your hardest, most important deep work." },
          { n: "MID", title: "Trough Period", desc: "Post-lunch energy dip (1–3 PM for most). Schedule administrative tasks, email, and routine meetings here." },
          { n: "PM", title: "Recovery Window", desc: "Late afternoon energy often partially rebounds. Good for collaborative work, brainstorming, and light creative tasks." },
          { n: "EVE", title: "Shut-Down Ritual", desc: "A defined end to your workday. Review tomorrow's priorities, close tabs, write one sentence on today's outcome. Your brain needs a clear off-switch." },
        ]
      },
      {
        heading: "Time Management Under Pressure",
        type: "scenario",
        scenario: "It's 10 AM. You have a major deliverable due at 5 PM. Your inbox has 47 unread messages, your phone is buzzing with Slack notifications, and a colleague wants to 'quickly chat for 5 minutes'.",
        options: [
          { text: "Answer all 47 emails first — inbox zero before starting work", outcome: "❌ Classic shallow work trap. You'll lose 3 hours and have 2 hours left for a 6-hour task.", good: false },
          { text: "Accept the quick chat — being available is important", outcome: "❌ The 5-minute chat will become 30 minutes and break your focus momentum entirely.", good: false },
          { text: "Block 9 AM–3 PM as deep work, set status to unavailable, and acknowledge messages at 3 PM", outcome: "✅ Protects your peak hours for the critical deliverable. Batches communications for a defined window.", good: true },
          { text: "Start the deliverable and check emails every 15 minutes to stay responsive", outcome: "❌ Destroys deep work. 23 minutes to regain focus after each interruption. You will not finish.", good: false },
        ]
      }
    ],
    quiz: [
      { q: "In the Eisenhower Matrix, where do peak performers primarily live?", opts: ["Q1: Urgent + Important", "Q2: Not Urgent + Important", "Q3: Urgent + Not Important", "Q4: Not Urgent + Not Important"], ans: 1 },
      { q: "McKinsey research says knowledge workers waste what % of their day on unnecessary emails?", opts: ["10%", "20%", "28%", "40%"], ans: 2 },
      { q: "Cal Newport's 'Deep Work' is characterized by:", opts: ["Responding to all messages immediately", "Cognitively demanding work that pushes your abilities and produces rare value", "Efficient multitasking across many tasks", "Quick routine administrative tasks"], ans: 1 },
      { q: "The 2-Minute Rule states:", opts: ["Spend at least 2 minutes planning before any task", "If a task takes under 2 minutes, do it immediately", "Never work for more than 2 hours without a break", "Check email every 2 hours maximum"], ans: 1 },
      { q: "Research shows multitasking reduces productivity by approximately:", opts: ["10%", "25%", "40%", "60%"], ans: 2 },
      { q: "Q3 in the Eisenhower Matrix (Urgent + Not Important) should primarily be:", opts: ["Done first thing in the morning", "Done during peak energy hours", "Delegated or declined", "Eliminated entirely"], ans: 2 },
      { q: "The best time to schedule your most demanding deep work is:", opts: ["After lunch during the energy trough", "During your peak energy window (typically morning)", "Late evening when the office is quiet", "During meetings to maximize time"], ans: 1 },
      { q: "In the deliverable scenario, setting status to unavailable and batching communications demonstrates:", opts: ["Poor team collaboration skills", "Protecting deep work time for high-priority output", "Ignoring colleagues inappropriately", "Prioritizing personal comfort over deadlines"], ans: 1 },
      { q: "The Weekly Review in time management serves to:", opts: ["Create detailed 6-month plans", "Review past performance and plan next week to prevent reactive chaos", "Log time spent on every activity", "Set new long-term goals each week"], ans: 1 },
      { q: "A Shut-Down Ritual is valuable because:", opts: ["It allows you to work longer without burnout", "Your brain needs a clear off-switch to separate work from rest", "It ensures inbox zero every day", "It replaces the need for deep work sessions"], ans: 1 },
    ]
  },
];

/* ═══════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════ */
export default function SoftSkills() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [quizMode, setQuizMode]           = useState(false);
  const [quizAnswers, setQuizAnswers]     = useState({});   // { chapterIdx_qIdx: optIdx }
  const [checked, setChecked]             = useState({});   // { chapterIdx_qIdx: true }
  const [completedChapters, setCompleted] = useState(new Set());
  const [readProgress, setReadProgress]   = useState({});   // { chapterIdx: % }
  const contentRef = useRef(null);

  const chapter = CHAPTERS[activeChapter];

  // Track reading scroll progress
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onScroll = () => {
      const pct = Math.min(100, Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100));
      setReadProgress(p => ({ ...p, [activeChapter]: Math.max(p[activeChapter] || 0, pct) }));
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [activeChapter]);

  const switchChapter = (idx) => {
    setActiveChapter(idx);
    setQuizMode(false);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  const setQuizAns = (key, val) => {
    if (checked[key]) return;
    setQuizAnswers(p => ({ ...p, [key]: val }));
  };

  const checkOne = (key) => {
    if (quizAnswers[key] === undefined) return;
    setChecked(p => ({ ...p, [key]: true }));
  };

  const quizScore = () => {
    return chapter.quiz.reduce((acc, q, qi) => {
      const key = `${activeChapter}_${qi}`;
      if (!checked[key]) return acc;
      return acc + (quizAnswers[key] === q.ans ? 1 : 0);
    }, 0);
  };

  const allChecked = chapter.quiz.every((_, qi) => checked[`${activeChapter}_${qi}`]);

  const handleFinishQuiz = () => {
    setCompleted(p => new Set([...p, activeChapter]));
  };

  return (
    <>
      <HomeNavbar />
      <div className="ss-layout">

        {/* ── SIDEBAR ── */}
        <aside className="ss-sidebar">
          <div className="ss-sidebar-header">
            <i className="ri-speak-line" />
            <div>
              <h2>Soft Skills</h2>
              <span>{completedChapters.size} / {CHAPTERS.length} complete</span>
            </div>
          </div>

          {/* Overall progress */}
          <div className="ss-overall-bar">
            <div className="ss-overall-fill"
              style={{ width: `${(completedChapters.size / CHAPTERS.length) * 100}%` }} />
          </div>

          <nav className="ss-nav">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                className={`ss-nav-item ${activeChapter === idx ? "active" : ""} ${completedChapters.has(idx) ? "done" : ""}`}
                style={ activeChapter === idx ? { "--cc": ch.color, borderLeftColor: ch.color } : { "--cc": ch.color } }
                onClick={() => switchChapter(idx)}
              >
                <div className="ss-nav-icon" style={ activeChapter === idx ? { background: ch.color + "20", color: ch.color } : {} }>
                  <i className={ch.icon} />
                </div>
                <div className="ss-nav-text">
                  <span className="ss-nav-title">{ch.title}</span>
                  <span className="ss-nav-sub">{ch.tagline}</span>
                </div>
                {completedChapters.has(idx) && (
                  <i className="ri-checkbox-circle-fill ss-done-icon" style={{ color: "#81b29a" }} />
                )}
                {!completedChapters.has(idx) && (
                  <div className="ss-read-ring">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="none" stroke="#242424" strokeWidth="2.5" />
                      <circle cx="12" cy="12" r="10" fill="none" stroke={ch.color} strokeWidth="2.5"
                        strokeDasharray={`${((readProgress[idx] || 0) / 100) * 62.8} 62.8`}
                        strokeLinecap="round" transform="rotate(-90 12 12)" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="ss-main" ref={contentRef}>

          {/* Chapter hero */}
          <div className="ss-hero" style={{ "--cc": chapter.color }}>
            <div className="ss-hero-accent" style={{ background: `radial-gradient(circle at 80% 50%, ${chapter.color}22, transparent 60%)` }} />
            <div className="ss-hero-tag" style={{ color: chapter.color, borderColor: chapter.color + "40", background: chapter.color + "10" }}>
              Chapter {activeChapter + 1} of {CHAPTERS.length}
            </div>
            <div className="ss-hero-icon" style={{ background: chapter.color + "18", border: `1px solid ${chapter.color}30`, color: chapter.color }}>
              <i className={chapter.icon} />
            </div>
            <h1 className="ss-hero-title">{chapter.title}</h1>
            <p className="ss-hero-tagline">{chapter.tagline}</p>
            <p className="ss-hero-intro">{chapter.intro}</p>

            {!quizMode && (
              <button className="ss-quiz-trigger" onClick={() => setQuizMode(true)}
                style={{ borderColor: chapter.color + "50", color: chapter.color }}>
                <i className="ri-question-line" /> Jump to Chapter Quiz
              </button>
            )}
          </div>

          {/* Sections */}
          {!quizMode && (
            <div className="ss-sections">
              {chapter.sections.map((sec, si) => (
                <Section key={si} sec={sec} color={chapter.color} />
              ))}

              {/* Enter quiz CTA */}
              <div className="ss-quiz-cta" style={{ borderColor: chapter.color + "30" }}>
                <div className="ss-quiz-cta-left">
                  <i className="ri-quill-pen-line" style={{ color: chapter.color }} />
                  <div>
                    <div className="ss-quiz-cta-title">Chapter Quiz</div>
                    <div className="ss-quiz-cta-sub">10 questions · Test your understanding</div>
                  </div>
                </div>
                <button className="ss-start-quiz-btn"
                  style={{ background: chapter.color, boxShadow: `0 4px 20px ${chapter.color}40` }}
                  onClick={() => { setQuizMode(true); if (contentRef.current) contentRef.current.scrollTop = 0; }}>
                  Start Quiz <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          )}

          {/* Quiz mode */}
          {quizMode && (
            <div className="ss-quiz">
              <div className="ss-quiz-header">
                <button className="ss-back-btn" onClick={() => setQuizMode(false)}>
                  <i className="ri-arrow-left-line" /> Back to Chapter
                </button>
                <div className="ss-quiz-score-badge" style={{ borderColor: chapter.color + "40" }}>
                  <span style={{ color: chapter.color }}>{quizScore()}</span> / {chapter.quiz.length}
                </div>
              </div>

              <div className="ss-quiz-questions">
                {chapter.quiz.map((q, qi) => {
                  const key      = `${activeChapter}_${qi}`;
                  const userAns  = quizAnswers[key];
                  const isChkd   = checked[key];
                  const isCorr   = userAns === q.ans;
                  const hasAns   = userAns !== undefined;

                  return (
                    <div key={qi} className={`ss-q-card ${isChkd ? (isCorr ? "q-correct" : "q-wrong") : ""}`}
                      style={{ "--cc": chapter.color }}>
                      <div className="ss-q-top">
                        <span className="ss-q-num" style={{ color: chapter.color }}>Q{qi + 1}</span>
                        {isChkd && (
                          <span className={`ss-q-verdict ${isCorr ? "verd-correct" : "verd-wrong"}`}>
                            {isCorr ? <><i className="ri-checkbox-circle-line" /> Correct</> : <><i className="ri-close-circle-line" /> Wrong</>}
                          </span>
                        )}
                      </div>
                      <p className="ss-q-text">{q.q}</p>
                      <div className="ss-opts">
                        {q.opts.map((opt, oi) => {
                          const isSel    = userAns === oi;
                          const isRight  = isChkd && oi === q.ans;
                          const isWrong  = isChkd && isSel && oi !== q.ans;
                          return (
                            <button key={oi}
                              className={`ss-opt ${isSel && !isChkd ? "ss-opt-sel" : ""} ${isRight ? "ss-opt-right" : ""} ${isWrong ? "ss-opt-wrong" : ""}`}
                              style={isSel && !isChkd ? { borderColor: chapter.color, color: chapter.color, background: chapter.color + "12" } : {}}
                              onClick={() => setQuizAns(key, oi)}
                              disabled={isChkd}
                            >
                              <span className="ss-opt-letter">{String.fromCharCode(65 + oi)}</span>
                              {opt}
                              {isRight && <i className="ri-check-line ss-opt-icon" style={{ color: "#81b29a" }} />}
                              {isWrong && <i className="ri-close-line ss-opt-icon" style={{ color: "#e07a5f" }} />}
                            </button>
                          );
                        })}
                      </div>
                      {!isChkd && (
                        <div className="ss-check-row">
                          <button className="ss-check-btn"
                            style={hasAns ? { borderColor: chapter.color + "60", color: chapter.color } : {}}
                            onClick={() => checkOne(key)}
                            disabled={!hasAns}
                          >
                            <i className="ri-shield-check-line" /> Check Answer
                          </button>
                          {!hasAns && <span className="ss-check-hint">Select an option first</span>}
                        </div>
                      )}
                      {isChkd && !isCorr && (
                        <p className="ss-correct-reveal">
                          <i className="ri-lightbulb-flash-line" style={{ color: "#c9a96e" }} />
                          Correct answer: <strong style={{ color: "#81b29a" }}>{q.opts[q.ans]}</strong>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {allChecked && !completedChapters.has(activeChapter) && (
                <div className="ss-quiz-finish">
                  <div className="ss-final-score" style={{ borderColor: chapter.color + "30" }}>
                    <div className="ss-final-num" style={{ color: chapter.color }}>{quizScore()}<span>/10</span></div>
                    <div className="ss-final-label">
                      {quizScore() >= 8 ? "🎉 Excellent!" : quizScore() >= 6 ? "👍 Good work" : "📚 Review recommended"}
                    </div>
                  </div>
                  <button className="ss-finish-btn"
                    style={{ background: chapter.color, boxShadow: `0 4px 20px ${chapter.color}40` }}
                    onClick={handleFinishQuiz}>
                    <i className="ri-checkbox-circle-line" /> Mark Chapter Complete
                    {activeChapter < CHAPTERS.length - 1 && " & Next →"}
                  </button>
                </div>
              )}

              {completedChapters.has(activeChapter) && (
                <div className="ss-quiz-finish">
                  <div className="ss-completed-banner" style={{ borderColor: "#81b29a40", background: "rgba(129,178,154,0.06)" }}>
                    <i className="ri-checkbox-circle-fill" style={{ color: "#81b29a", fontSize: "1.5rem" }} />
                    <span>Chapter completed! Score: <strong style={{ color: "#81b29a" }}>{quizScore()}/10</strong></span>
                  </div>
                  {activeChapter < CHAPTERS.length - 1 && (
                    <button className="ss-finish-btn"
                      style={{ background: CHAPTERS[activeChapter + 1].color, boxShadow: `0 4px 20px ${CHAPTERS[activeChapter + 1].color}40` }}
                      onClick={() => switchChapter(activeChapter + 1)}>
                      Next Chapter: {CHAPTERS[activeChapter + 1].title} <i className="ri-arrow-right-line" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

/* ── SECTION RENDERER ── */
function Section({ sec, color }) {
  const [activeScenario, setActiveScenario] = useState(null);

  if (sec.type === "framework") {
    return (
      <div className="sec-block">
        <h2 className="sec-heading">{sec.heading}</h2>
        <div className="framework-grid">
          {sec.items.map((item, i) => (
            <div key={i} className="fw-card" style={{ "--cc": color, animationDelay: `${i * 0.06}s` }}>
              <div className="fw-icon" style={{ color, background: color + "15" }}>
                <i className={item.icon} />
              </div>
              <div className="fw-label" style={{ color }}>{item.label}</div>
              <div className="fw-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sec.type === "compare") {
    return (
      <div className="sec-block">
        <h2 className="sec-heading">{sec.heading}</h2>
        <div className="compare-grid">
          <div className="compare-col">
            <div className="compare-label" style={{ color: sec.left.color }}>{sec.left.label}</div>
            {sec.left.points.map((p, i) => (
              <div key={i} className="compare-point" style={{ borderLeftColor: sec.left.color + "50" }}>
                <i className="ri-close-circle-line" style={{ color: sec.left.color }} />
                {p}
              </div>
            ))}
          </div>
          <div className="compare-divider" />
          <div className="compare-col">
            <div className="compare-label" style={{ color: sec.right.color }}>{sec.right.label}</div>
            {sec.right.points.map((p, i) => (
              <div key={i} className="compare-point" style={{ borderLeftColor: sec.right.color + "50" }}>
                <i className="ri-checkbox-circle-line" style={{ color: sec.right.color }} />
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (sec.type === "steps") {
    return (
      <div className="sec-block">
        <h2 className="sec-heading">{sec.heading}</h2>
        <div className="steps-list">
          {sec.steps.map((step, i) => (
            <div key={i} className="step-item" style={{ "--cc": color }}>
              <div className="step-n" style={{ color, borderColor: color + "40", background: color + "10" }}>{step.n}</div>
              <div className="step-connector" style={{ background: color + "20" }} />
              <div className="step-body">
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sec.type === "toolkit") {
    return (
      <div className="sec-block">
        <h2 className="sec-heading">{sec.heading}</h2>
        <div className="toolkit-list">
          {sec.tools.map((tool, i) => (
            <div key={i} className="tool-item" style={{ "--cc": color }}>
              <div className="tool-name" style={{ color }}>{tool.name}</div>
              <div className="tool-tip">{tool.tip || tool.desc}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sec.type === "insight_block") {
    return (
      <div className="sec-block">
        <h2 className="sec-heading">{sec.heading}</h2>
        <div className="insight-block" style={{ borderLeftColor: color, background: color + "08" }}>
          <i className="ri-double-quotes-l insight-quote-icon" style={{ color: color + "40" }} />
          <p className="insight-text">{sec.insight}</p>
          <div className="insight-takeaway" style={{ borderTopColor: color + "20" }}>
            <i className="ri-lightbulb-flash-line" style={{ color: "#c9a96e" }} />
            <span>{sec.takeaway}</span>
          </div>
        </div>
      </div>
    );
  }

  if (sec.type === "cards_grid") {
    return (
      <div className="sec-block">
        <h2 className="sec-heading">{sec.heading}</h2>
        <div className="cards-grid-sec">
          {sec.cards.map((card, i) => (
            <div key={i} className="sg-card" style={{ "--cc": color, animationDelay: `${i * 0.05}s` }}>
              <div className="sg-icon" style={{ color, background: color + "15" }}>
                <i className={card.icon} />
              </div>
              <div className="sg-title">{card.title}</div>
              <div className="sg-desc">{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sec.type === "scenario") {
    return (
      <div className="sec-block">
        <h2 className="sec-heading">{sec.heading}</h2>
        <div className="scenario-block" style={{ borderColor: color + "30" }}>
          <div className="scenario-label" style={{ color }}>
            <i className="ri-focus-3-line" /> Scenario
          </div>
          <p className="scenario-text">{sec.scenario}</p>
          <div className="scenario-opts">
            {sec.options.map((opt, i) => (
              <div key={i}>
                <button
                  className={`scenario-opt ${activeScenario === i ? "sc-active" : ""}`}
                  style={activeScenario === i ? {
                    borderColor: opt.good ? "#81b29a60" : "#e07a5f60",
                    background: opt.good ? "rgba(129,178,154,0.06)" : "rgba(224,122,95,0.06)"
                  } : {}}
                  onClick={() => setActiveScenario(activeScenario === i ? null : i)}
                >
                  <span className="sc-opt-letter" style={{ background: color + "20", color }}>{String.fromCharCode(65 + i)}</span>
                  <span>{opt.text}</span>
                  <i className={`ri-arrow-${activeScenario === i ? "up" : "down"}-s-line sc-arrow`} />
                </button>
                {activeScenario === i && (
                  <div className={`scenario-outcome ${opt.good ? "outcome-good" : "outcome-bad"}`}>
                    {opt.outcome}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
