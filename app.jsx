// Sublime Character PWA — Full Application
// React 18 + CSS-in-JS, zero dependencies beyond React
// Deployable as static HTML on Netlify/GitHub Pages

import { useState, useEffect, useCallback, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const HABITS = [
  {
    id: "1", title: "The Intentional Sleep", category: "Personal Habits & The Home", categorySlug: "personal",
    emoji: "🌙", shortDesc: "He approached sleep with profound intentionality — not as an unconscious collapse, but as a deliberate act of surrender.",
    story: "Rather than yielding to sleep as an unconscious collapse, the Prophet ﷺ approached it with profound intentionality. He rested on a humble leather mattress stuffed with coarse palm fibers, categorically rejecting the luxurious silk bedding typical of Byzantine or Sassanid monarchs. In preparation for sleep, he performed Wudu (ritual ablution), ensuring he ended his day in a state of physical and spiritual purity. He then laid on his right side, placing his right hand gently beneath his right cheek — a posture that modern somnology increasingly acknowledges for its physiological benefits. As he settled, he would utter: \"Allahumma bismika amutu wa ahya\" (O Allah, in Your name I die and I live).",
    modernApplication: "Create a deliberate 'digital sunset' 30 minutes before bed. Put the phone face-down, perform wudu or wash your face, and lie on your right side. Replace the doom-scroll with a short du'a or reflection. This single transition ritual signals to your nervous system that the day is truly done.",
    citation: "Sahih al-Bukhari, Hadith 247; Ibn al-Qayyim, Zad al-Ma'ad", sunnahLink: "https://sunnah.com/bukhari:247",
    tags: ["sleep", "routine", "night", "purification"]
  },
  {
    id: "2", title: "Waking to Wonder", category: "Personal Habits & The Home", categorySlug: "personal",
    emoji: "🌅", shortDesc: "His first waking act was to anchor his consciousness in divine majesty — looking to the sky and reciting verses about creation.",
    story: "His transition from sleep to wakefulness was equally deliberate. Upon waking in the pre-dawn stillness, he would sit up and physically wipe the remnants of sleep from his face with his hands. He would then turn his gaze toward the sky, immediately grounding his consciousness in the cosmos by reciting the final ten verses of Surah Aal-Imran (Quran 3:190-200), which reflect on the creation of the heavens and the earth. His first spoken words were an articulation of profound gratitude: \"Al-hamdu Lillah alladhi ahyana ba'd ma amatana wa ilayhi Al-nushur\" (All praise is for Allah who gave us life after having taken it from us).",
    modernApplication: "Before checking your phone, sit up slowly and look out a window or toward the sky. Take three conscious breaths. Let your first thought be gratitude for being alive. This 60-second 'wonder ritual' rewires the brain's default morning response away from anxiety and toward presence.",
    citation: "Sahih al-Bukhari, Hadith 183; Quran 3:190-200", sunnahLink: "https://sunnah.com/bukhari:183",
    tags: ["morning", "gratitude", "mindfulness", "dhikr"]
  },
  {
    id: "3", title: "The Miswak Threshold", category: "Personal Habits & The Home", categorySlug: "personal",
    emoji: "🏠", shortDesc: "The moment he crossed the threshold of his home, his very first action was to cleanse his mouth — a psychological transition ritual.",
    story: "Upon crossing the threshold of his home, the Prophet's ﷺ very first action was to use the Miswak. Aisha reported that whenever he entered his house, he would immediately cleanse his mouth. This was not merely dental hygiene — it served as a psychological mechanism to transition from the dusty, demanding public sphere into the sanctity of the home, ensuring he greeted his family in the most pleasant and refined state possible. He also applied fragrant oils (Attar), favoring musk, oud, and amber, stating that pleasant fragrance is from the ways of the Prophets.",
    modernApplication: "Establish a 'decompression threshold' habit the moment you walk through your front door: change clothes, freshen up, and consciously set down the stress of the workday. This physical ritual signals to your family — and your own nervous system — that you have fully arrived home.",
    citation: "Sahih Muslim, Hadith 253; Musnad Ahmad 26194", sunnahLink: "https://sunnah.com/muslim:253",
    tags: ["home", "family", "hygiene", "transition", "presence"]
  },
  {
    id: "4", title: "The Serving Leader", category: "Personal Habits & The Home", categorySlug: "personal",
    emoji: "🧵", shortDesc: "He mended his own clothes, milked the sheep, and served himself — the leader of a nation doing household chores without a second thought.",
    story: "When asked what the Prophet ﷺ did when he was alone with his family, Aisha summarized with striking clarity: \"He was a human being like any other; he would clean his garment, milk his sheep, and serve himself.\" He did not view household chores as beneath his prophetic dignity. Narrations confirm he would stitch his own garments, mend his own leather shoes, repair his water bucket, and busy himself in the service of his family right up until the call to prayer was made.",
    modernApplication: "No matter your corporate rank or community status, engage in mundane household chores — washing dishes, folding laundry, preparing a meal — without viewing these tasks as beneath you. The dissolution of ego-driven domestic hierarchy is one of the most powerful acts of love you can perform for your family.",
    citation: "Musnad Ahmad, Hadith 26194; Sahih al-Bukhari, Hadith 676", sunnahLink: "https://sunnah.com/bukhari:676",
    tags: ["home", "humility", "service", "family", "household"]
  },
  {
    id: "5", title: "Grace at the Table", category: "Personal Habits & The Home", categorySlug: "personal",
    emoji: "🍽️", shortDesc: "He never criticized any food placed before him. If he liked it, he ate. If not, he left it without a word of complaint.",
    story: "Abu Huraira documented: \"The Prophet ﷺ never criticized any food presented to him. If he liked it, he would eat it; otherwise, he would leave it without expressing his dislike.\" If a meal was delayed or completely absent, he exhibited no frustration. On days when he found no food prepared in the house, he would calmly declare, \"Then, I am fasting,\" transforming a moment of domestic scarcity into an act of voluntary worship.",
    modernApplication: "Practice a zero-complaint policy at the dinner table. If a meal isn't to your taste, eat what you can and say nothing — or find one genuine thing to appreciate about it. This single habit creates an atmosphere of psychological safety where family members feel their efforts are seen and valued.",
    citation: "Sahih al-Bukhari, Hadith 5409; Sahih Muslim, Hadith 2064", sunnahLink: "https://sunnah.com/bukhari:5409",
    tags: ["food", "gratitude", "home", "manners", "patience"]
  },
  {
    id: "6", title: "Romantic Micro-Gestures", category: "Interpersonal Relationships", categorySlug: "relationships",
    emoji: "💛", shortDesc: "He would find the exact spot where Aisha's lips touched a vessel, and place his own lips there. Small acts of intentional love.",
    story: "The romantic disposition of the Prophet ﷺ was marked by profound tenderness and intentional micro-gestures. He would wait for Aisha to drink from a vessel, locate the exact spot where her lips had touched the rim, and place his own lips on that very spot to drink. He used endearing nicknames — affectionately calling Aisha \"Humaira\" (the rosy-cheeked one) — and he famously raced her in the desert, losing in their youth and winning years later, playfully remarking: \"This is for that.\"",
    modernApplication: "Revive the art of intentional micro-romance. It's not grand gestures — it's remembering how your spouse takes their coffee, sitting on their side of the couch, texting a memory mid-day. These small, deliberate acts of attunement communicate: 'I see you. I choose you. Every day.'",
    citation: "Sunan Abi Dawud, Hadith 19; Ash-Shamail Al-Muhammadiyyah", sunnahLink: "https://sunnah.com/abudawud:19",
    tags: ["marriage", "love", "romance", "spouse", "intimacy"]
  },
  {
    id: "7", title: "De-escalating with Grace", category: "Interpersonal Relationships", categorySlug: "relationships",
    emoji: "🕊️", shortDesc: "When Aisha broke a dish in jealousy before guests, he smiled, got on his knees, and quietly cleaned it up.",
    story: "During a gathering, another wife sent a beautifully prepared dish to the Prophet ﷺ and his guests. Overcome with jealousy, Aisha struck the servant's hand, shattering the plate. Instead of exploding in anger at this public display, the Prophet ﷺ simply smiled, got down on his knees, and began gathering the broken pieces and food, telling his guests: \"Your mother became jealous. Eat.\" He then quietly replaced the broken plate from Aisha's house — resolving the incident with immaculate justice and profound psychological grace.",
    modernApplication: "When a domestic dispute escalates in front of others, resist the urge to 'win.' Choose to de-escalate publicly and address privately. Clean up a mess, literally or figuratively, without announcing your sacrifice. The absence of retaliation in a moment of embarrassment is one of the highest forms of marital maturity.",
    citation: "Sunan an-Nasa'i, Hadith 3408; Ash-Shamail Al-Muhammadiyyah", sunnahLink: "https://sunnah.com/nasai:3408",
    tags: ["marriage", "conflict", "patience", "de-escalation", "emotional-intelligence"]
  },
  {
    id: "8", title: "Greeting the Children First", category: "Interpersonal Relationships", categorySlug: "relationships",
    emoji: "🐦", shortDesc: "He would walk through Medina's streets and initiate the greeting of peace with the children playing.",
    story: "In 7th-century Arabia, children were frequently marginalized. The Prophet ﷺ systematically dismantled this through his public behavior. He was known to walk through the streets of Medina, actively seek out children playing, and initiate the greeting of Salaam with them, validating their existence. When he noticed a young boy, Abu Umair, grieving over the death of his pet bird (Nughayr), he stopped to console him, playfully rhyming: \"O Abu Umair, what did the Nughayr do?\" — prioritizing one child's emotional pain over his own schedule.",
    modernApplication: "When you encounter a child, get down to their level and greet them first. Ask about something specific to their world: a toy, a friend, a show they like. This single act communicates to a child that they are significant, seen, and valued in the adult world.",
    citation: "Sunan Abi Dawud, Hadith 4969; Al-Adab Al-Mufrad, Hadith 253", sunnahLink: "https://sunnah.com/adab:253",
    tags: ["children", "kindness", "parenting", "community", "empathy"]
  },
  {
    id: "9", title: "The Prolonged Prostration", category: "Interpersonal Relationships", categorySlug: "relationships",
    emoji: "🤲", shortDesc: "During prayer, a child climbed his back. He prolonged the prostration until the child was satisfied — then calmly continued.",
    story: "During a congregational prostration (Sujud), a child climbed onto the back of the Prophet ﷺ. He prolonged the prostration so significantly that companions feared something had happened. When asked if he received revelation during that long pause, he clarified: \"Nothing at all happened, but my son was on my back and I did not wish to disturb him until he had had enough.\" He also stated: \"When I stand for prayer, I intend to prolong it, but on hearing the cries of a child, I cut it short, as I dislike to trouble the child's mother.\"",
    modernApplication: "When a child interrupts something important — a meeting, a prayer, a conversation — honor the interruption before resuming. This communicates to the child that they are not an inconvenience. The brief pause costs you seconds; the message it sends them will last a lifetime.",
    citation: "Sunan an-Nasa'i, Hadith 1141; Sahih al-Bukhari, Hadith 707", sunnahLink: "https://sunnah.com/bukhari:707",
    tags: ["children", "prayer", "patience", "parenting", "mercy"]
  },
  {
    id: "10", title: "Whole-Body Listening", category: "Interpersonal Relationships", categorySlug: "relationships",
    emoji: "👂", shortDesc: "When someone spoke to him, he turned his entire torso to face them — absolute, undivided physical and psychological attention.",
    story: "When someone called out to him or spoke to him, the Prophet ﷺ did not merely turn his neck or offer a dismissive sidelong glance. He turned his entire torso to face the speaker squarely, granting them his absolute, undivided physical and psychological attention. His speech was equally disciplined: he would allow a speaker to finish their thought entirely without interruption. Only when the speaker had completely exhausted their words would he ask, \"Have you finished?\" before delivering his response.",
    modernApplication: "Practice 'whole-body listening.' When someone speaks to you, physically turn toward them — put down your phone, close the laptop, make eye contact. Allow them to finish completely before formulating your response. This single habit, applied consistently, will transform your relationships.",
    citation: "Ash-Shamail Al-Muhammadiyyah; Al-Adab Al-Mufrad, Hadith 1115", sunnahLink: "https://sunnah.com/adab:1115",
    tags: ["communication", "listening", "presence", "relationships", "emotional-intelligence"]
  },
  {
    id: "11", title: "The Perpetual Smile", category: "Interpersonal Relationships", categorySlug: "relationships",
    emoji: "☀️", shortDesc: "His resting expression was perpetually cheerful. Abdullah ibn Al-Harith said: 'I have never seen anyone smile more.'",
    story: "The physical presence of the Prophet ﷺ was described by companions as perpetually cheerful. Abdullah ibn Al-Harith noted: \"I have never seen anyone smile more than Allah's Messenger.\" Yet his joy was refined — he rarely engaged in uproarious, open-mouthed laughter that compromised his dignity. His laughter was predominantly a broad smile that illuminated his face, with companions poetically likening his teeth to hailstones. His walk was purposeful, dynamic, and energetic — brisk, lifting his feet firmly and leaning slightly forward, as if descending a slope.",
    modernApplication: "Consciously soften your resting expression. Most people's default face communicates stress, distance, or disapproval. A gentle, relaxed facial expression is one of the most powerful gifts you can give the people around you — it signals safety, warmth, and welcome. Smiling at a stranger is Sadaqah (charity).",
    citation: "Ash-Shamail Al-Muhammadiyyah, Chapter 9; Jami' at-Tirmidhi, Hadith 3641", sunnahLink: "https://sunnah.com/tirmidhi:3641",
    tags: ["demeanor", "smile", "community", "character", "joy"]
  },
  {
    id: "12", title: "Ethical Commerce", category: "Commerce & Public Life", categorySlug: "commerce",
    emoji: "🤝", shortDesc: "He prayed for Allah's mercy upon the lenient buyer, seller, and debt-collector. Ease was his commercial ethic.",
    story: "The Prophet ﷺ actively participated in the marketplace, modeling an attitude of grace, leniency, and absolute honesty. He established the ethical baseline: \"May Allah's mercy be on him who is lenient in his buying, selling, and in demanding back his money.\" He once came across a companion riding a tired camel that could barely move. He ﷺ struck it gently, made du'a for it, and the camel immediately became vigorous. He then bought the camel, allowed the companion to ride it home, and sent payment above the agreed price — embodying overdelivering on a transaction.",
    modernApplication: "In every commercial transaction, ask: 'Am I being the lenient party here?' In negotiations, invoices, and debt collection, build in generosity. If you owe someone money, pay them back with a gift of gratitude. If someone owes you, grant them ease. This is not weakness; it is prophetic financial character.",
    citation: "Sahih al-Bukhari, Hadith 2076; Sahih Muslim, Hadith 1579", sunnahLink: "https://sunnah.com/bukhari:2076",
    tags: ["commerce", "business", "ethics", "finance", "generosity"]
  },
  {
    id: "13", title: "Smiling at Rudeness", category: "Emotional Intelligence & Crisis", categorySlug: "emotional",
    emoji: "🧘", shortDesc: "A Bedouin grabbed his cloak so violently it left a mark on his neck. The Prophet ﷺ turned — and smiled.",
    story: "During his time distributing wealth, a Bedouin approached the Prophet ﷺ from behind and grabbed his cloak with such force that it left a visible red mark on his neck. He then demanded rudely: \"Muhammad! Give me some of Allah's wealth that you possess!\" The Prophet ﷺ turned to the man, smiled, and then instructed his companions to give him what he needed. There was no anger, no public humiliation of the man, and no wounded pride. Only de-escalation and generosity.",
    modernApplication: "The next time someone is rude or aggressive with you publicly — a difficult customer, an aggressive driver, an impatient colleague — practice the pause before the response. Let a beat pass. A calm, measured response to hostility is not weakness; it is the highest form of social mastery.",
    citation: "Sahih al-Bukhari, Hadith 3149; Ash-Shamail Al-Muhammadiyyah", sunnahLink: "https://sunnah.com/bukhari:3149",
    tags: ["patience", "anger", "emotional-intelligence", "public-life", "character"]
  },
  {
    id: "14", title: "Witnessing Grief Fully", category: "Emotional Intelligence & Crisis", categorySlug: "emotional",
    emoji: "💧", shortDesc: "When his infant son Ibrahim died in his arms, he wept openly: 'The eyes weep, the heart grieves — and we say only what pleases Allah.'",
    story: "When the Prophet's ﷺ infant son Ibrahim passed away in his arms, he did not suppress his tears in an attempt to project strength. He wept openly and visibly. When companions appeared surprised, he explained: \"The eyes weep, the heart grieves, and we say only what pleases our Lord. O Ibrahim, we are grieved by your parting.\" This was a man who led armies and arbitrated the fates of nations, weeping without shame over the death of a child.",
    modernApplication: "Give yourself full permission to grieve. Suppressing tears — especially for men — is a cultural norm with no Prophetic basis. Acknowledging loss, sitting with pain, and expressing grief openly (without complaint against Allah) is not weakness. It is emotional wholeness. Honor those you have lost by grieving them fully.",
    citation: "Sahih al-Bukhari, Hadith 1303; Sahih Muslim, Hadith 2315", sunnahLink: "https://sunnah.com/bukhari:1303",
    tags: ["grief", "emotional-intelligence", "loss", "vulnerability", "men-mental-health"]
  },
  {
    id: "15", title: "The First to Investigate", category: "Emotional Intelligence & Crisis", categorySlug: "emotional",
    emoji: "🐎", shortDesc: "When a loud noise woke Medina in panic, he was already riding out bareback — alone — before the guards even stirred.",
    story: "When a terrifying, loud noise woke the city of Medina in the middle of the night, causing mass panic, the Prophet ﷺ did not wait for his guards. He was the very first to ride out — bareback on a slow horse belonging to Abu Talha — to investigate the perimeter. He returned before the panicking crowd even reached the perceived danger, calmly reassuring the terrified residents: \"Do not be afraid. Do not be afraid.\"",
    modernApplication: "In a crisis, before others have processed what is happening, be the person who moves toward the problem to assess it calmly. Whether it's a family emergency, a business crisis, or a community incident — the first calm voice that says 'I've assessed this, here is what we know' is worth more than any other resource.",
    citation: "Sahih al-Bukhari, Hadith 2908; Sahih Muslim, Hadith 2307", sunnahLink: "https://sunnah.com/bukhari:2908",
    tags: ["courage", "leadership", "crisis", "community", "action"]
  },
  {
    id: "16", title: "The Grateful Slave", category: "Emotional Intelligence & Crisis", categorySlug: "emotional",
    emoji: "⭐", shortDesc: "He prayed until his feet cracked and bled. When asked why — since all was forgiven — he replied: 'Should I not be a grateful slave?'",
    story: "The Prophet's ﷺ dedication to the night prayer (Tahajjud) was so intense that he would stand in prayer until his feet swelled and cracked from the exertion. When Aisha observed this and asked why he endured such hardship given that all his shortcomings were forgiven, he replied: \"Should I not be a grateful slave?\" His worship was not transactional, driven by fear or desire for reward. It arose from sheer, overflowing gratitude for existence itself.",
    modernApplication: "Examine your own acts of worship and service. Are they primarily transactional — seeking reward or avoiding consequence? Practice shifting the intention to pure gratitude. Do something beautiful — a prayer, an act of charity, a kind gesture — not because you need something, but simply because you are grateful to be alive and capable.",
    citation: "Sahih al-Bukhari, Hadith 4836; Sahih Muslim, Hadith 2819", sunnahLink: "https://sunnah.com/bukhari:4836",
    tags: ["gratitude", "worship", "intention", "spiritual", "motivation"]
  },
  {
    id: "17", title: "Defending the Voiceless", category: "The Natural World & Environment", categorySlug: "environment",
    emoji: "🐫", shortDesc: "A camel wept upon seeing him, complaining of overwork. He confronted the owner directly: 'Fear Allah regarding this creature.'",
    story: "The Prophet's ﷺ empathy extended deeply into the animal kingdom. Once, companions took the chicks of a bird from her nest, causing the mother bird to flutter around in visible distress. The Prophet ﷺ immediately commanded: \"Who has distressed this bird by taking its chicks? Return them at once!\" On another occasion, he entered an orchard and found a starving, overworked camel that began to weep upon seeing him. He confronted the owner directly, warning him to fear Allah regarding his treatment of the defenseless creature.",
    modernApplication: "Actively speak up when you witness mistreatment of animals or exploitation of those who cannot defend themselves. Whether it is a neighbor's neglected pet or an underpaid worker — the Prophetic standard is not passive witnessing. It is direct, compassionate intervention.",
    citation: "Sunan Abi Dawud, Hadith 2675 and 2549", sunnahLink: "https://sunnah.com/abudawud:2675",
    tags: ["animals", "environment", "advocacy", "compassion", "justice"]
  },
  {
    id: "18", title: "Conserving the Sacred River", category: "The Natural World & Environment", categorySlug: "environment",
    emoji: "💧", shortDesc: "He forbade wasting water during ablution — even on the banks of a powerfully flowing river. Abundance is not permission to waste.",
    story: "The Prophet ﷺ was incredibly strict regarding resource management. He explicitly commanded his companions not to waste water, even when performing ablution on the banks of a powerfully flowing river. The flowing water all around them did not change his principle: waste is waste, regardless of apparent abundance. He modeled using the minimum necessary and framed excess consumption as a transgression with moral weight.",
    modernApplication: "Turn off the tap while brushing your teeth, be conscious of resource consumption — not just for environmental reasons, but as an act of worship rooted in the Prophetic example. The river is still flowing; the standard still applies.",
    citation: "Sunan Ibn Majah, Hadith 425; Musnad Ahmad, Hadith 7065", sunnahLink: "https://sunnah.com/ibnmajah:425",
    tags: ["environment", "water", "conservation", "worship", "character"]
  },
  {
    id: "19", title: "The Art of the Farewell", category: "Nuanced Personal Expressions", categorySlug: "nuanced",
    emoji: "👋", shortDesc: "He never rose from a gathering without sincerely inquiring about the needs of each person present before departing.",
    story: "The Prophet ﷺ treated every gathering as a trust. He was known to never rise to leave without sincerely inquiring about the needs of each person present before departing. After long gatherings, he would conclude with the expiation of the assembly (Kaffaratul-Majlis): \"Subhanakallahumma wa bihamdika, ash-hadu an la ilaha illa anta, astaghfiruka wa atubu ilayk.\" This served as both a spiritual seal on the gathering and a conscious acknowledgment that any shortcomings in conversation were being offered up for forgiveness.",
    modernApplication: "Before leaving any gathering — a dinner party, a work meeting, a family visit — pause and ask: 'Is there anything anyone needs?' Then close with a small moment of gratitude or reflection. These final 60 seconds transform a routine goodbye into a meaningful farewell that people will remember.",
    citation: "Jami' at-Tirmidhi, Hadith 3433; Sunan Abi Dawud, Hadith 4858", sunnahLink: "https://sunnah.com/tirmidhi:3433",
    tags: ["social", "gatherings", "endings", "presence", "community"]
  },
  {
    id: "20", title: "Laughing without Losing Dignity", category: "Nuanced Personal Expressions", categorySlug: "nuanced",
    emoji: "😄", shortDesc: "He had a sharp, warm sense of humor — and used it often. Humor is not frivolity; it is a form of emotional intelligence.",
    story: "The Prophet ﷺ had a sharp, playful, and warm sense of humor that he employed with full intentionality. In one famous exchange, an elderly woman came to him and asked if she would enter Paradise. He teased her: \"O mother, there are no old women in Paradise.\" She began to weep, until he completed the joke with profound kindness: \"Did you not read that Allah says He will create them anew, making them virgins, youthful companions?\" In another narration, he told a man who wanted to borrow a camel: \"I will give you the child of a camel\" — and when the man expressed confusion, smiled and clarified: \"Every camel is the child of a camel.\"",
    modernApplication: "Humor is not frivolity — it is a form of emotional intelligence. Use wit and warmth in your interactions, particularly with the elderly and children, who are most likely to be spoken to with formality and distance. The goal of the joke is always to end with the other person smiling, never to leave them in doubt.",
    citation: "Jami' at-Tirmidhi, Hadith 3893; Ash-Shamail Al-Muhammadiyyah, Chapter on Humor", sunnahLink: "https://sunnah.com/tirmidhi:3893",
    tags: ["humor", "joy", "character", "social", "lightness"]
  }
];

const CATEGORIES = [
  { slug: "all", label: "All", emoji: "✨" },
  { slug: "personal", label: "Personal & Home", emoji: "🏠" },
  { slug: "relationships", label: "Relationships", emoji: "💛" },
  { slug: "commerce", label: "Commerce", emoji: "🤝" },
  { slug: "emotional", label: "Emotional Intelligence", emoji: "🧘" },
  { slug: "environment", label: "Nature & Environment", emoji: "🌿" },
  { slug: "nuanced", label: "Nuanced Expressions", emoji: "✨" },
];

// ─── STORAGE ─────────────────────────────────────────────────────────────────
const STORAGE_KEYS = { routine: "sc_routine", streak: "sc_streak", lastLogin: "sc_lastLogin", checked: "sc_checked", onboarded: "sc_onboarded" };

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

// ─── STYLES ──────────────────────────────────────────────────────────────────
const S = {
  // Design system inspired by: Spotify Light warmth + Islamic geometric organics
  // Palette: Turmeric gold, terracotta, sage, warm white, deep forest text
  css: `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --gold: #E8A020;
      --gold-light: #F5C842;
      --gold-pale: #FDF3D0;
      --terra: #C4622D;
      --terra-light: #E8855A;
      --terra-pale: #FDE8D8;
      --sage: #5A7A4A;
      --sage-light: #7AA05A;
      --sage-pale: #E8F0E0;
      --teal: #2A7A6A;
      --teal-pale: #D8F0E8;
      --cream: #FDFAF2;
      --parchment: #F5EED8;
      --warm-white: #FFFEF8;
      --ink: #1A1208;
      --ink-mid: #3D2E12;
      --ink-soft: #6B5530;
      --ink-muted: #9A8060;
      --border: #E8D8B8;
      --border-soft: #F0E4C8;
      --shadow-warm: rgba(200, 140, 40, 0.12);
      --shadow-deep: rgba(50, 25, 5, 0.15);
      --radius: 16px;
      --radius-sm: 10px;
      --radius-lg: 24px;
      --tab-h: 68px;
    }

    html, body { height: 100%; }

    body {
      font-family: 'DM Sans', system-ui, sans-serif;
      background: var(--cream);
      color: var(--ink);
      overflow: hidden;
      height: 100dvh;
    }

    #root { height: 100dvh; display: flex; flex-direction: column; }

    /* ── Scrollbars ── */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

    /* ── Typography ── */
    .font-display { font-family: 'Playfair Display', Georgia, serif; }

    /* ── Animations ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.92); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes slideRight {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(232, 160, 32, 0.4); }
      50% { box-shadow: 0 0 0 8px rgba(232, 160, 32, 0); }
    }
    @keyframes checkDraw {
      from { stroke-dashoffset: 100; }
      to { stroke-dashoffset: 0; }
    }
    @keyframes particleBurst {
      0% { transform: scale(0) translate(0,0); opacity: 1; }
      100% { transform: scale(1) translate(var(--tx), var(--ty)); opacity: 0; }
    }
    @keyframes streakCount {
      0% { transform: translateY(8px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes spinCrescent {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes bloomIn {
      0% { transform: scale(0) rotate(-30deg); opacity: 0; }
      60% { transform: scale(1.1) rotate(5deg); opacity: 1; }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }

    .anim-fade-up { animation: fadeUp 0.4s ease both; }
    .anim-fade-up-1 { animation: fadeUp 0.4s 0.05s ease both; }
    .anim-fade-up-2 { animation: fadeUp 0.4s 0.1s ease both; }
    .anim-fade-up-3 { animation: fadeUp 0.4s 0.15s ease both; }
    .anim-scale-in { animation: scaleIn 0.35s ease both; }

    /* ── Screen ── */
    .screen {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding-bottom: calc(var(--tab-h) + 16px);
      -webkit-overflow-scrolling: touch;
    }

    /* ── Nav Tabs ── */
    .tab-bar {
      height: var(--tab-h);
      background: var(--warm-white);
      border-top: 1.5px solid var(--border);
      display: flex;
      align-items: center;
      padding: 0 8px;
      flex-shrink: 0;
      backdrop-filter: blur(12px);
    }
    .tab-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: 8px 4px;
      border: none;
      background: none;
      cursor: pointer;
      color: var(--ink-muted);
      font-family: 'DM Sans', sans-serif;
      font-size: 10.5px;
      font-weight: 500;
      letter-spacing: 0.01em;
      border-radius: var(--radius-sm);
      transition: color 0.2s, background 0.2s;
      -webkit-tap-highlight-color: transparent;
    }
    .tab-btn.active { color: var(--terra); }
    .tab-btn .tab-icon {
      width: 28px; height: 28px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 8px;
      font-size: 17px;
      transition: background 0.2s, transform 0.2s;
    }
    .tab-btn.active .tab-icon { background: var(--terra-pale); transform: scale(1.05); }

    /* ── Cards ── */
    .card {
      background: var(--warm-white);
      border: 1.5px solid var(--border-soft);
      border-radius: var(--radius);
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .card:active { transform: scale(0.98); }
    .card-hover:hover { box-shadow: 0 8px 24px var(--shadow-warm); transform: translateY(-2px); }

    /* ── Habit Tag ── */
    .category-pill {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px; font-weight: 600; letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    /* ── Checklist Item ── */
    .checklist-item {
      display: flex; align-items: center; gap: 14px;
      padding: 14px 16px;
      background: var(--warm-white);
      border: 1.5px solid var(--border-soft);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s, transform 0.15s;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    .checklist-item:active { transform: scale(0.98); }
    .checklist-item.completed {
      background: var(--sage-pale);
      border-color: var(--sage-light);
    }

    .check-circle {
      width: 28px; height: 28px; flex-shrink: 0;
      border-radius: 50%;
      border: 2.5px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    .check-circle.done {
      border-color: var(--sage);
      background: var(--sage);
      animation: pulseGlow 0.6s ease;
    }
    .check-circle.done svg { display: block; }
    .check-circle svg { display: none; }
    .check-stroke {
      stroke-dasharray: 100;
      stroke-dashoffset: 0;
      animation: checkDraw 0.35s ease both;
    }

    /* ── Geometric Pattern ── */
    .geo-pattern {
      position: absolute; inset: 0;
      opacity: 0.06;
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c4622d' fill-opacity='1'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      pointer-events: none;
    }

    /* ── Detail Sheet ── */
    .detail-overlay {
      position: fixed; inset: 0;
      background: rgba(10, 5, 0, 0.5);
      z-index: 100;
      backdrop-filter: blur(4px);
      animation: fadeIn 0.25s ease;
    }
    .detail-sheet {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      background: var(--cream);
      border-radius: 24px 24px 0 0;
      max-height: 92dvh;
      overflow-y: auto;
      z-index: 101;
      animation: scaleIn 0.3s ease;
      padding-bottom: env(safe-area-inset-bottom, 16px);
    }
    .sheet-handle {
      width: 40px; height: 4px;
      background: var(--border);
      border-radius: 2px;
      margin: 12px auto 0;
    }

    /* ── Onboarding ── */
    .onboard-screen {
      position: fixed; inset: 0;
      background: var(--cream);
      z-index: 200;
      display: flex; flex-direction: column;
      animation: fadeIn 0.4s ease;
    }

    /* ── Streak Card ── */
    .streak-bg {
      background: linear-gradient(135deg, var(--terra) 0%, var(--gold) 100%);
      border-radius: var(--radius);
      position: relative;
      overflow: hidden;
    }

    /* ── Input ── */
    .search-input {
      width: 100%;
      padding: 11px 16px 11px 40px;
      border: 1.5px solid var(--border);
      border-radius: 12px;
      background: var(--warm-white);
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      color: var(--ink);
      outline: none;
      transition: border-color 0.2s;
    }
    .search-input:focus { border-color: var(--gold); }
    .search-input::placeholder { color: var(--ink-muted); }

    /* ── Floating Action Button ── */
    .fab {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      padding: 14px 24px;
      border: none;
      border-radius: 50px;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      -webkit-tap-highlight-color: transparent;
    }
    .fab:active { transform: scale(0.96); }
    .fab-primary {
      background: linear-gradient(135deg, var(--terra) 0%, var(--terra-light) 100%);
      color: white;
      box-shadow: 0 4px 16px rgba(196, 98, 45, 0.4);
    }
    .fab-primary:hover { box-shadow: 0 6px 20px rgba(196, 98, 45, 0.5); transform: translateY(-1px); }
    .fab-secondary {
      background: var(--sage-pale);
      color: var(--sage);
      border: 1.5px solid var(--sage-light);
    }
    .btn-ghost {
      background: none; border: none;
      cursor: pointer; padding: 8px;
      color: var(--ink-soft);
      border-radius: 8px;
      display: flex; align-items: center;
      -webkit-tap-highlight-color: transparent;
      transition: background 0.15s;
    }
    .btn-ghost:active { background: var(--border-soft); }
  `
};

// ─── CATEGORY COLORS ─────────────────────────────────────────────────────────
const CAT_COLORS = {
  personal: { bg: "var(--gold-pale)", color: "var(--gold)", border: "var(--gold-light)" },
  relationships: { bg: "var(--terra-pale)", color: "var(--terra)", border: "var(--terra-light)" },
  commerce: { bg: "var(--teal-pale)", color: "var(--teal)", border: "var(--teal)" },
  emotional: { bg: "var(--sage-pale)", color: "var(--sage)", border: "var(--sage-light)" },
  environment: { bg: "#E8F4E8", color: "#2A6A3A", border: "#5A9A5A" },
  nuanced: { bg: "var(--parchment)", color: "var(--ink-soft)", border: "var(--border)" },
};

// ─── PARTICLE BURST ──────────────────────────────────────────────────────────
function ParticleBurst({ active }) {
  if (!active) return null;
  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * 360;
    const tx = Math.cos((angle * Math.PI) / 180) * 24;
    const ty = Math.sin((angle * Math.PI) / 180) * 24;
    const colors = ["var(--gold)", "var(--sage-light)", "var(--terra-light)", "var(--gold-light)"];
    return { tx, ty, color: colors[i % colors.length] };
  });
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          width: 6, height: 6, borderRadius: "50%",
          background: p.color,
          "--tx": `${p.tx}px`, "--ty": `${p.ty}px`,
          animation: `particleBurst 0.5s ${i * 0.03}s ease-out both`,
          transform: "translate(-50%, -50%)",
        }} />
      ))}
    </div>
  );
}

// ─── CHECK CIRCLE ────────────────────────────────────────────────────────────
function CheckCircle({ done, onToggle, burst }) {
  return (
    <div onClick={e => { e.stopPropagation(); onToggle(); }}
      className={`check-circle ${done ? "done" : ""}`}
      style={{ position: "relative" }}>
      {done && <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="white" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round" className="check-stroke" />
      </svg>}
      <ParticleBurst active={burst} />
    </div>
  );
}

// ─── CATEGORY PILL ───────────────────────────────────────────────────────────
function CategoryPill({ slug, label }) {
  const c = CAT_COLORS[slug] || CAT_COLORS.nuanced;
  return (
    <span className="category-pill" style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
      {label}
    </span>
  );
}

// ─── HABIT CARD ──────────────────────────────────────────────────────────────
function HabitCard({ habit, inRoutine, onAddRemove, onClick, style, delay }) {
  const c = CAT_COLORS[habit.categorySlug] || CAT_COLORS.nuanced;
  return (
    <div className="card card-hover anim-fade-up" style={{ ...style, animationDelay: `${delay || 0}ms` }}
      onClick={() => onClick(habit)}>
      <div style={{ padding: "18px 18px 14px", borderLeft: `4px solid ${c.color}` }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28, lineHeight: 1 }}>{habit.emoji}</span>
            <div>
              <h3 className="font-display" style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", lineHeight: 1.25, marginBottom: 4 }}>
                {habit.title}
              </h3>
              <CategoryPill slug={habit.categorySlug} label={habit.category.split("&")[0].trim()} />
            </div>
          </div>
          <button onClick={e => { e.stopPropagation(); onAddRemove(habit.id); }}
            style={{
              flexShrink: 0,
              width: 32, height: 32,
              border: `1.5px solid ${inRoutine ? c.color : "var(--border)"}`,
              borderRadius: "50%",
              background: inRoutine ? c.bg : "transparent",
              color: inRoutine ? c.color : "var(--ink-muted)",
              fontSize: 16, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}>
            {inRoutine ? "✓" : "+"}
          </button>
        </div>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.55, marginBottom: 10 }}>
          {habit.shortDesc}
        </p>
        <p style={{ fontSize: 11, color: "var(--ink-muted)", fontStyle: "italic" }}>
          📚 {habit.citation}
        </p>
      </div>
    </div>
  );
}

// ─── HABIT DETAIL SHEET ──────────────────────────────────────────────────────
function HabitDetail({ habit, inRoutine, onAddRemove, onClose }) {
  if (!habit) return null;
  const c = CAT_COLORS[habit.categorySlug] || CAT_COLORS.nuanced;

  const handleShare = () => {
    const text = `✨ ${habit.title}\n\n${habit.shortDesc}\n\n"${habit.story.slice(0, 200)}..."\n\n📚 Source: ${habit.citation}\n\n🌱 Discover Prophetic habits on Sublime Character`;
    if (navigator.share) {
      navigator.share({ title: habit.title, text });
    } else {
      const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(wa, "_blank");
    }
  };

  return (
    <>
      <div className="detail-overlay" onClick={onClose} />
      <div className="detail-sheet">
        <div className="sheet-handle" />

        {/* Header */}
        <div style={{ padding: "20px 20px 0", borderBottom: `1px solid var(--border-soft)`, paddingBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <CategoryPill slug={habit.categorySlug} label={habit.category} />
            <button className="btn-ghost" onClick={onClose} style={{ fontSize: 20 }}>✕</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 44, lineHeight: 1 }}>{habit.emoji}</span>
            <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, color: "var(--ink)" }}>
              {habit.title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "20px" }}>
          {/* The Story */}
          <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 10 }}>
            The Prophetic Narrative
          </h4>
          <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--ink-mid)", marginBottom: 24 }}>
            {habit.story}
          </p>

          {/* Modern Application */}
          <div style={{ background: `linear-gradient(135deg, ${c.bg} 0%, var(--warm-white) 100%)`,
            border: `1.5px solid ${c.border}`, borderRadius: var(--radius-sm),
            borderRadius: 12, padding: "16px", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>🌱</span>
              <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: c.color }}>
                Modern Application
              </h4>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--ink-mid)" }}>
              {habit.modernApplication}
            </p>
          </div>

          {/* Citation */}
          <div style={{ background: "var(--parchment)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "12px 14px", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 14 }}>📚</span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
                Exact Source
              </span>
            </div>
            <p style={{ fontSize: 13, color: "var(--ink-soft)", fontStyle: "italic", lineHeight: 1.5 }}>
              {habit.citation}
            </p>
            {habit.sunnahLink && (
              <a href={habit.sunnahLink} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: "var(--teal)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, marginTop: 8 }}
                onClick={e => e.stopPropagation()}>
                View on Sunnah.com →
              </a>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button className="fab fab-primary" style={{ width: "100%" }}
              onClick={() => onAddRemove(habit.id)}>
              {inRoutine ? "✓ In Your Daily Routine" : "+ Add to My Daily Routine"}
            </button>
            <button className="fab fab-secondary" style={{ width: "100%" }} onClick={handleShare}>
              📤 Share this Story
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── ONBOARDING ──────────────────────────────────────────────────────────────
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const steps = [
    {
      emoji: "✨",
      title: "Welcome to\nSublime Character",
      body: "Discover the daily habits, manners, and emotional wisdom of Prophet Muhammad ﷺ — verified from classical Islamic sources.",
      art: "onboard-1"
    },
    {
      emoji: "📖",
      title: "Read Authentic\nStories",
      body: "Every habit comes with its full narrative, modern application, and exact Hadith citation linked to primary sources.",
      art: "onboard-2"
    },
    {
      emoji: "🌱",
      title: "Build Your Daily\nSublime Character",
      body: "Add habits to your routine, check them off each day, and build a streak of consistent, beautiful character.",
      art: "onboard-3"
    }
  ];
  const current = steps[step];

  const artColors = ["var(--terra)", "var(--teal)", "var(--sage)"];
  const artEmojis = ["🌙✨🕌", "📚🌿☀️", "🌱🔥🌟"];

  return (
    <div className="onboard-screen" style={{ background: "var(--cream)" }}>
      {/* Art area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 32px 24px", gap: 0 }}>
        {/* Geometric illustration */}
        <div style={{ width: 200, height: 200, position: "relative", marginBottom: 32, animation: "bloomIn 0.6s ease both" }}>
          {/* Outer ring */}
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `3px solid ${artColors[step]}`, opacity: 0.2 }} />
          <div style={{ position: "absolute", inset: 12, borderRadius: "50%", border: `2px solid ${artColors[step]}`, opacity: 0.15 }} />
          {/* Octagon geometric */}
          <svg viewBox="0 0 200 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}>
            <polygon points="100,20 156,44 180,100 156,156 100,180 44,156 20,100 44,44" fill="none" stroke={artColors[step]} strokeWidth="2" />
            <polygon points="100,40 140,60 160,100 140,140 100,160 60,140 40,100 60,60" fill="none" stroke={artColors[step]} strokeWidth="1.5" />
          </svg>
          {/* Center */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: `linear-gradient(135deg, ${artColors[step]}22, ${artColors[step]}44)`,
              width: 100, height: 100, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 40, border: `2px solid ${artColors[step]}40` }}>
              {current.emoji}
            </div>
          </div>
        </div>

        <h1 className="font-display" style={{ fontSize: 30, fontWeight: 700, color: "var(--ink)", textAlign: "center",
          lineHeight: 1.2, marginBottom: 16, whiteSpace: "pre-line", animation: "fadeUp 0.5s 0.1s ease both" }}>
          {current.title}
        </h1>
        <p style={{ fontSize: 16, color: "var(--ink-soft)", textAlign: "center", lineHeight: 1.65,
          maxWidth: 300, animation: "fadeUp 0.5s 0.2s ease both" }}>
          {current.body}
        </p>
      </div>

      {/* Bottom */}
      <div style={{ padding: "0 32px 48px", display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
        {/* Dots */}
        <div style={{ display: "flex", gap: 8 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ width: i === step ? 24 : 8, height: 8, borderRadius: 4,
              background: i === step ? artColors[step] : "var(--border)",
              transition: "all 0.3s ease" }} />
          ))}
        </div>

        <button className="fab fab-primary" style={{ width: "100%", maxWidth: 340, justifyContent: "center" }}
          onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : onComplete()}>
          {step < steps.length - 1 ? "Continue" : "Begin My Journey →"}
        </button>

        {step < steps.length - 1 && (
          <button onClick={onComplete} style={{ background: "none", border: "none", color: "var(--ink-muted)", fontSize: 14, cursor: "pointer" }}>
            Skip
          </button>
        )}
      </div>
    </div>
  );
}

// ─── DISCOVER TAB ────────────────────────────────────────────────────────────
function DiscoverTab({ routine, onAddRemove, onHabitClick }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = HABITS.filter(h => {
    const matchCat = category === "all" || h.categorySlug === category;
    const matchSearch = !search || h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
      h.tags.some(t => t.includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = HABITS[new Date().getDate() % HABITS.length];

  return (
    <div className="screen">
      {/* Header */}
      <div style={{ padding: "20px 20px 0", background: "var(--warm-white)", borderBottom: "1px solid var(--border-soft)" }}>
        <div className="anim-fade-up" style={{ marginBottom: 4 }}>
          <p style={{ fontSize: 12, color: "var(--ink-muted)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1 className="font-display anim-fade-up-1" style={{ fontSize: 26, fontWeight: 700, color: "var(--ink)", lineHeight: 1.2, marginBottom: 16 }}>
            Discover Habits
          </h1>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 14 }}>
          <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--ink-muted)", fontSize: 15 }}>🔍</span>
          <input className="search-input" placeholder="Search habits, tags..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Category Filters */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 14, scrollbarWidth: "none" }}>
          {CATEGORIES.map(cat => (
            <button key={cat.slug} onClick={() => setCategory(cat.slug)}
              style={{
                flexShrink: 0,
                padding: "6px 14px",
                borderRadius: 20,
                border: `1.5px solid ${category === cat.slug ? "var(--terra)" : "var(--border)"}`,
                background: category === cat.slug ? "var(--terra-pale)" : "transparent",
                color: category === cat.slug ? "var(--terra)" : "var(--ink-soft)",
                fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}>
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px" }}>
        {/* Featured - only when no search/filter */}
        {category === "all" && !search && (
          <div className="anim-fade-up" style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 10 }}>
              ✨ Today's Inspiration
            </p>
            <div className="streak-bg" onClick={() => onHabitClick(featured)}
              style={{ padding: "20px", cursor: "pointer", position: "relative", overflow: "hidden" }}>
              <div className="geo-pattern" />
              <div style={{ position: "relative" }}>
                <span style={{ fontSize: 36, display: "block", marginBottom: 10 }}>{featured.emoji}</span>
                <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 8, lineHeight: 1.2 }}>
                  {featured.title}
                </h3>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.55, marginBottom: 14 }}>
                  {featured.shortDesc}
                </p>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>
                  📚 {featured.citation}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Habit Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((h, i) => (
            <HabitCard key={h.id} habit={h}
              inRoutine={routine.includes(h.id)}
              onAddRemove={onAddRemove}
              onClick={onHabitClick}
              delay={i * 40}
            />
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--ink-muted)" }}>
              <span style={{ fontSize: 40, display: "block", marginBottom: 12 }}>🔍</span>
              <p style={{ fontSize: 15 }}>No habits found for "{search}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CHECKLIST TAB ───────────────────────────────────────────────────────────
function ChecklistTab({ routine, checked, onToggle, burst, onHabitClick }) {
  const myHabits = HABITS.filter(h => routine.includes(h.id));
  const completedCount = myHabits.filter(h => checked.includes(h.id)).length;
  const progress = myHabits.length ? (completedCount / myHabits.length) : 0;

  const allDone = myHabits.length > 0 && completedCount === myHabits.length;

  return (
    <div className="screen">
      {/* Header */}
      <div style={{ padding: "20px 20px 16px", background: "var(--warm-white)", borderBottom: "1px solid var(--border-soft)" }}>
        <p style={{ fontSize: 11, color: "var(--ink-muted)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Today's Practice</p>
        <h1 className="font-display anim-fade-up" style={{ fontSize: 26, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>
          My Daily Routine
        </h1>

        {myHabits.length > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "var(--ink-soft)", fontWeight: 500 }}>
                {completedCount} of {myHabits.length} complete
              </span>
              <span style={{ fontSize: 13, color: "var(--sage)", fontWeight: 600 }}>
                {Math.round(progress * 100)}%
              </span>
            </div>
            <div style={{ height: 8, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress * 100}%`,
                background: "linear-gradient(90deg, var(--sage) 0%, var(--sage-light) 100%)",
                borderRadius: 4, transition: "width 0.4s ease" }} />
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: "16px" }}>
        {myHabits.length === 0 ? (
          <div className="anim-scale-in" style={{ textAlign: "center", padding: "60px 24px" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🌱</div>
            <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)", marginBottom: 10 }}>
              Your routine is empty
            </h3>
            <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6 }}>
              Head to Discover and add habits that resonate with you to build your daily sublime character.
            </p>
          </div>
        ) : (
          <>
            {allDone && (
              <div className="anim-scale-in" style={{ background: "linear-gradient(135deg, var(--sage), var(--sage-light))",
                borderRadius: var(--radius-sm), borderRadius: 12, padding: "16px 20px", marginBottom: 16, textAlign: "center" }}>
                <p style={{ color: "white", fontSize: 15, fontWeight: 600 }}>🌟 Masha'Allah! All habits complete for today!</p>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {myHabits.map((h, i) => {
                const done = checked.includes(h.id);
                const c = CAT_COLORS[h.categorySlug] || CAT_COLORS.nuanced;
                return (
                  <div key={h.id} className={`checklist-item anim-fade-up`}
                    style={{ animationDelay: `${i * 50}ms` }}
                    onClick={() => onHabitClick(h)}>
                    <CheckCircle done={done} burst={burst === h.id} onToggle={() => onToggle(h.id)} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 15, fontWeight: 600, color: done ? "var(--sage)" : "var(--ink)",
                        marginBottom: 3, textDecoration: done ? "none" : "none", lineHeight: 1.3 }}>
                        {h.emoji} {h.title}
                      </p>
                      <p style={{ fontSize: 12, color: "var(--ink-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {h.category}
                      </p>
                    </div>
                    <span style={{ fontSize: 18, opacity: 0.3 }}>›</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── STREAK TAB ──────────────────────────────────────────────────────────────
function StreakTab({ streak, routine, checked }) {
  const myHabits = HABITS.filter(h => routine.includes(h.id));
  const completedCount = myHabits.filter(h => checked.includes(h.id)).length;

  const milestones = [
    { days: 3, emoji: "🌱", label: "Sapling" },
    { days: 7, emoji: "🌿", label: "Growing" },
    { days: 21, emoji: "🌳", label: "Established" },
    { days: 40, emoji: "🌟", label: "Sunnah Forty" },
    { days: 100, emoji: "🔥", label: "Century" },
  ];

  const nextMilestone = milestones.find(m => m.days > streak) || milestones[milestones.length - 1];
  const prevMilestone = [...milestones].reverse().find(m => m.days <= streak);

  return (
    <div className="screen">
      <div style={{ padding: "20px 20px 16px", background: "var(--warm-white)", borderBottom: "1px solid var(--border-soft)" }}>
        <p style={{ fontSize: 11, color: "var(--ink-muted)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Your Journey</p>
        <h1 className="font-display anim-fade-up" style={{ fontSize: 26, fontWeight: 700, color: "var(--ink)" }}>
          Streak & Progress
        </h1>
      </div>

      <div style={{ padding: "16px" }}>
        {/* Streak Card */}
        <div className="streak-bg anim-fade-up" style={{ padding: "28px 24px", marginBottom: 16, textAlign: "center" }}>
          <div className="geo-pattern" />
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 64, lineHeight: 1, marginBottom: 4, animation: "streakCount 0.4s ease both" }}>
              🔥
            </div>
            <div className="font-display" style={{ fontSize: 72, fontWeight: 700, color: "white", lineHeight: 0.9, marginBottom: 8 }}>
              {streak}
            </div>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, fontWeight: 500 }}>
              day{streak !== 1 ? "s" : ""} streak
            </p>
            {prevMilestone && (
              <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "6px 14px" }}>
                <span>{prevMilestone.emoji}</span>
                <span style={{ color: "white", fontSize: 13, fontWeight: 600 }}>{prevMilestone.label}</span>
              </div>
            )}
          </div>
        </div>

        {/* Today's stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          <div className="card anim-fade-up-1" style={{ padding: "16px", textAlign: "center", cursor: "default" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>📋</div>
            <div className="font-display" style={{ fontSize: 28, fontWeight: 700, color: "var(--terra)" }}>{myHabits.length}</div>
            <p style={{ fontSize: 12, color: "var(--ink-muted)" }}>Habits in Routine</p>
          </div>
          <div className="card anim-fade-up-2" style={{ padding: "16px", textAlign: "center", cursor: "default" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>✅</div>
            <div className="font-display" style={{ fontSize: 28, fontWeight: 700, color: "var(--sage)" }}>{completedCount}</div>
            <p style={{ fontSize: 12, color: "var(--ink-muted)" }}>Completed Today</p>
          </div>
        </div>

        {/* Milestones */}
        <h3 className="font-display anim-fade-up" style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>
          Milestones
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {milestones.map((m, i) => {
            const reached = streak >= m.days;
            return (
              <div key={m.days} className="anim-fade-up" style={{ animationDelay: `${i * 60}ms`,
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 16px",
                background: reached ? "var(--sage-pale)" : "var(--warm-white)",
                border: `1.5px solid ${reached ? "var(--sage-light)" : "var(--border-soft)"}`,
                borderRadius: 12,
              }}>
                <span style={{ fontSize: 28, opacity: reached ? 1 : 0.35 }}>{m.emoji}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: reached ? "var(--sage)" : "var(--ink-muted)" }}>
                    {m.days} Days — {m.label}
                  </p>
                  <p style={{ fontSize: 12, color: "var(--ink-muted)" }}>
                    {reached ? "Achieved ✓" : `${m.days - streak} more day${m.days - streak !== 1 ? "s" : ""} to go`}
                  </p>
                </div>
                {reached && <span style={{ fontSize: 20 }}>🌟</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [onboarded, setOnboarded] = useState(() => load(STORAGE_KEYS.onboarded, false));
  const [tab, setTab] = useState("discover");
  const [routine, setRoutine] = useState(() => load(STORAGE_KEYS.routine, []));
  const [checked, setChecked] = useState(() => {
    const today = new Date().toDateString();
    const stored = load(STORAGE_KEYS.checked, { date: today, ids: [] });
    if (stored.date !== today) return [];
    return stored.ids;
  });
  const [streak, setStreak] = useState(() => load(STORAGE_KEYS.streak, 0));
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [burstId, setBurstId] = useState(null);

  // Update streak on open
  useEffect(() => {
    const today = new Date().toDateString();
    const lastLogin = load(STORAGE_KEYS.lastLogin, null);
    if (lastLogin !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const wasYesterday = lastLogin === yesterday.toDateString();
      const newStreak = wasYesterday ? streak + 1 : (lastLogin ? 0 : streak);
      setStreak(newStreak);
      save(STORAGE_KEYS.streak, newStreak);
      save(STORAGE_KEYS.lastLogin, today);
    }
  }, []);

  // Persist
  useEffect(() => { save(STORAGE_KEYS.routine, routine); }, [routine]);
  useEffect(() => {
    save(STORAGE_KEYS.checked, { date: new Date().toDateString(), ids: checked });
  }, [checked]);
  useEffect(() => { save(STORAGE_KEYS.onboarded, onboarded); }, [onboarded]);

  const handleAddRemove = useCallback((id) => {
    setRoutine(r => r.includes(id) ? r.filter(x => x !== id) : [...r, id]);
  }, []);

  const handleToggle = useCallback((id) => {
    setBurstId(id);
    setTimeout(() => setBurstId(null), 600);
    setChecked(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);
    // Increment streak if first check of day
    const today = new Date().toDateString();
    const lastLogin = load(STORAGE_KEYS.lastLogin, null);
    if (lastLogin !== today) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      save(STORAGE_KEYS.streak, newStreak);
      save(STORAGE_KEYS.lastLogin, today);
    }
  }, [streak]);

  const TABS = [
    { id: "discover", icon: "🔍", label: "Discover" },
    { id: "checklist", icon: "☑️", label: "My Routine" },
    { id: "streak", icon: "🔥", label: `${streak} Day${streak !== 1 ? "s" : ""}` },
  ];

  if (!onboarded) return (
    <>
      <style>{S.css}</style>
      <Onboarding onComplete={() => setOnboarded(true)} />
    </>
  );

  return (
    <>
      <style>{S.css}</style>

      {/* Screens */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {tab === "discover" && (
          <DiscoverTab routine={routine} onAddRemove={handleAddRemove} onHabitClick={setSelectedHabit} />
        )}
        {tab === "checklist" && (
          <ChecklistTab routine={routine} checked={checked} onToggle={handleToggle} burst={burstId} onHabitClick={setSelectedHabit} />
        )}
        {tab === "streak" && (
          <StreakTab streak={streak} routine={routine} checked={checked} />
        )}
      </div>

      {/* Bottom Tab Bar */}
      <nav className="tab-bar">
        {TABS.map(t => (
          <button key={t.id} className={`tab-btn ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}>
            <span className="tab-icon">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>

      {/* Habit Detail Sheet */}
      {selectedHabit && (
        <HabitDetail
          habit={selectedHabit}
          inRoutine={routine.includes(selectedHabit.id)}
          onAddRemove={(id) => { handleAddRemove(id); }}
          onClose={() => setSelectedHabit(null)}
        />
      )}
    </>
  );
}
