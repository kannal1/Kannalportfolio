// Full written case studies, keyed by project id. Written by the case-study
// workflow: grounded in the original case pages, expanded, first person, em-dash free.
// Shape: { hero:{eyebrow,title,titleSerif,lead,meta:[{k,v}]},
//   chapters:[{ groupKey, label, kind, title, titleSerif, body:[..], items:[{n,title,body}], metrics:[{v,k,sub}] }] }
export const caseStudies = {
  "creb": {
    "hero": {
      "eyebrow": "CONSUMER FINTECH, COMPOUND, SINCE 2024",
      "title": "I rebuilt trust into Compound",
      "titleSerif": "Real Estate Bonds",
      "lead": "CREB lets regular people invest in real-estate-backed bonds. I redesigned the whole journey: signing up, verifying ID, buying, withdrawing, and the reports. One rule guided every decision. Take the doubt away before you ask someone to commit.",
      "meta": [
        { "k": "ROLE", "v": "Sole Product Designer" },
        { "k": "SCOPE", "v": "UX, UI, system, handoff" },
        { "k": "TIMELINE", "v": "2024 to present" },
        { "k": "STATUS", "v": "Live in production" }
      ]
    },
    "chapters": [
      { "label": "01 / CONTEXT", "kind": "narrative", "groupKey": null, "title": "It worked, but it made people", "titleSerif": "nervous", "body": [
        "CREB asks far more than a normal app. You link a real bank account and move real savings into a real-estate-backed bond, a product most first-timers have never bought. That is a heavy moment, and the old flows treated it like any other form.",
        "Steps were not explained. Jargon landed at the worst possible time, right as someone was deciding whether to commit money. The dashboard showed balances but never reassured anyone that their money was actually working.",
        "I came to design from two years writing .NET, so I read products as states, not screens. The state I kept hitting here was doubt, and nothing in the flow answered it. That was the real design problem, not the layout."
      ] },
      { "label": "02 / GAPS", "kind": "gaps", "groupKey": null, "title": "Three things were missing", "titleSerif": "", "body": [
        "Before drawing a screen I named the gaps. Each one mapped to a specific place a real person would stall, get nervous, and close the app."
      ], "items": [
        { "n": "01", "title": "Proof at every step", "body": "People needed to see what was verified, where their money sat, and what happened next. Identity, bank, and accreditation status were invisible, so every tap felt like a leap of faith." },
        { "n": "02", "title": "Plain language", "body": "APY, bond units, accrued interest, maturity, IRA. Obvious to the business, a wall to a first-timer. The words themselves were stopping people." },
        { "n": "03", "title": "One system, not fifty pages", "body": "Every screen was a one-off. Mobile and web drifted apart. It needed a shared system so the whole journey felt like one product built by one careful team." }
      ] },
      { "label": "03 / PROCESS", "kind": "process", "groupKey": "system", "title": "Map first, then", "titleSerif": "draw", "body": [
        "I did not open the UI first. I mapped the whole product, traced every path a person could take including the ones that fail, then designed against that map."
      ], "items": [
        { "n": "01", "title": "Map the whole product", "body": "Dashboard, investing, redemption, account and security, rewards, support. The sitemap became the single artifact the whole team agreed on before a pixel moved." },
        { "n": "02", "title": "Trace every journey end to end", "body": "First purchase, recurring investment, withdrawal, Plaid identity and bank linking, two-factor setup, plus every success and failure state. The master flow put the entire journey on one canvas." },
        { "n": "03", "title": "Wireframe, then final UI", "body": "Annotated wireframes locked structure while it was still cheap to change. Mapping success and failure side by side meant the build shipped the edge cases instead of discovering them in production." }
      ] },
      { "label": "04 / DASHBOARD", "kind": "narrative", "groupKey": "overview", "title": "The dashboard became the trust", "titleSerif": "hub", "body": [
        "The home screen leads with portfolio value and the APY, then lifetime interest, compounding progress, and the monthly-interest chart, then breakdown, auto-investment, and recent activity. Calm at a glance, detailed when you dig.",
        "A How It Works explainer sits one tap away, so the model is never a mystery. Auto-investment and reinvesting are surfaced on the home screen, because the easiest way to grow trust is to show money quietly compounding without being asked.",
        "I wanted the first glance to say one thing. Your money is here, it is growing, and you can see exactly how. Everything else waits for the people who want to dig deeper."
      ] },
      { "label": "05 / TRUST", "kind": "narrative", "groupKey": "trust", "title": "Explain before you", "titleSerif": "ask", "body": [
        "The heaviest moments are identity, bank linking, and the security setup. These are where a first-timer freezes, because you are asking for proof and access at once. I built each one to explain itself before it asked for anything.",
        "Plaid identity verification and the Plaid bank connection both open with what gets checked, where it goes, and why it is safe. Two-factor authentication is framed as protection for your money, not a chore. A clear verified state closes the loop so people know the hard part is done.",
        "Trust is the funnel. Every unexplained step is a place someone quietly decides not to continue, so I treated explanation as a feature, not a footnote."
      ] },
      { "label": "06 / INVEST", "kind": "narrative", "groupKey": "invest", "title": "Buying, made", "titleSerif": "legible", "body": [
        "Investing is where the jargon hits hardest. Bond units, accrued interest, APY, maturity. I rewrote these moments so a first-timer can follow exactly what they are doing and what it earns.",
        "Funding a deposit, buying bonds, and confirming all read in plain terms: this is what you commit, this is what you earn, this is when. The success screen closes the loop so you see the purchase land and see your dashboard change, instead of buying and wondering.",
        "Auto-investment, reinvesting, and refer-and-earn reuse the same structure, so the second and third actions feel familiar instead of new. Compounding only works if people trust it enough to leave it on."
      ] },
      { "label": "07 / WITHDRAW", "kind": "narrative", "groupKey": "withdraw", "title": "Taking money out is where trust gets", "titleSerif": "tested", "body": [
        "Pulling money out is the moment an app proves it is honest. If withdrawal feels slow, vague, or hidden, people stop trusting everything else they cannot see.",
        "I designed the full set: the withdraw request, the successful state, and the failed state. The bad path gets the same care as the good one. A failed withdrawal says what happened and what to do next, instead of leaving someone staring at a dead end with their own money.",
        "This is the engineer in me. The states people skip are the states that matter most, so I would rather over-design the error than let anyone feel abandoned mid-transaction."
      ] },
      { "label": "08 / SYSTEM", "kind": "narrative", "groupKey": "system", "title": "One system, not fifty", "titleSerif": "screens", "body": [
        "CREB is mobile-first, with a web dashboard that shares the same language. Every step, link, verify, buy, confirm, withdraw, is built to clear up doubt the moment it shows up.",
        "Underneath sits a shared system: components, patterns, and copy reused across the journey. The sitemap and master flow fed straight into it, so dashboard, investing, and withdrawal all behave the same way and never make someone relearn the interface.",
        "A system is also a handoff tool. When everything is one set of parts, engineers move faster and the product stays consistent as it grows. That mattered, because this shipped to production and keeps shipping."
      ] },
      { "label": "09 / IMPACT", "kind": "impact", "groupKey": null, "title": "Trust moved the", "titleSerif": "numbers", "body": [
        "Taking the doubt out of each step did what I hoped. More people finished onboarding, more money moved in, and the funnel held all the way to a deposit. When you explain before you ask, people commit."
      ], "metrics": [
        { "v": "5x", "k": "Active investors", "sub": "400 to 2,000" },
        { "v": "10x", "k": "Value held", "sub": "$400k to $4M" },
        { "v": "~70%", "k": "Conversion lift", "sub": "across the journey" }
      ] },
      { "label": "10 / REFLECTION", "kind": "reflection", "groupKey": null, "title": "What I would push", "titleSerif": "further", "body": [
        "The lesson held. In a money app the design problem is rarely the layout, it is the doubt. Solve the doubt and the metrics follow.",
        "If I kept going I would push the reporting and interest statements further. People trust what they can verify over time, and there is room to make the long-term view as reassuring as the first deposit. Trust is not a screen you ship once, it is something you keep earning."
      ] }
    ]
  },
  "cgb": {
    "hero": {
      "eyebrow": "PREMIUM FINTECH, COMPOUND, 2025",
      "title": "Compound Gold Bonds, where I kept it",
      "titleSerif": "restrained",
      "lead": "A gold-bond product for accredited investors, with a $10,000 minimum. New brand, full system, every screen from scratch. I was the sole product designer, and we shipped it in three months. The whole job was making serious money feel calm to move.",
      "meta": [
        { "k": "ROLE", "v": "Sole Product Designer" },
        { "k": "SCOPE", "v": "Brand, UX, UI, system" },
        { "k": "TIMELINE", "v": "3-month sprint, 2025" },
        { "k": "SHIPPED", "v": "100% of screens at v1" }
      ]
    },
    "chapters": [
      { "label": "01 / CONTEXT", "kind": "narrative", "groupKey": null, "title": "Serious money raises the", "titleSerif": "bar", "body": [
        "Accredited investors look closely, and a $10,000 minimum makes every screen matter more. At that ticket size a moment of doubt does not cost a tap, it costs the whole deposit.",
        "The product had to feel trustworthy enough for real money while reading as easily as an everyday app. Precise without showing off, premium without ever being confusing. Those two pulls fight each other, and most fintech lands on cold and complicated.",
        "I came to design from .NET engineering, so I read this as a states problem before a styling one. Trust is the funnel. If a screen cannot explain itself before it asks for money or a bank login, people stop. So the plan was simple: explain first, then ask, on every screen that mattered."
      ] },
      { "label": "02 / GAPS", "kind": "gaps", "groupKey": null, "title": "What was missing on day", "titleSerif": "one", "body": [
        "There was a product idea and a high minimum. There was no brand, no mapped journey, and no system. I had to build all three at once and keep them in agreement."
      ], "items": [
        { "n": "01", "title": "No brand to lean on", "body": "A gold-bond product with no identity yet. I had to invent the look and prove it could feel premium without decoration, because at this price point decoration reads as cheap." },
        { "n": "02", "title": "No mapped journey", "body": "Accreditation, bank connection, customizing the investment, buying, redeeming. None of it was sequenced, and a high-stakes path with no map hits dead ends. Dead ends kill trust." },
        { "n": "03", "title": "One designer, every screen", "body": "Sole product designer across brand, UX, UI, and the system. No team to absorb the edge cases, so the system itself had to carry the consistency." }
      ] },
      { "label": "03 / PROCESS", "kind": "process", "groupKey": "system", "title": "How I worked it", "titleSerif": "out", "body": [
        "I built the system so the screens could stay calm. The premium feel gets decided in the spacing, long before any color lands."
      ], "items": [
        { "n": "01", "title": "Structure the journey", "body": "Accreditation, bank connection, customizing the investment, buying, redeeming. I mapped the full flow first so a high-stakes journey never hit a dead end. Knowing the order told me exactly where to slow down." },
        { "n": "02", "title": "Wireframe the stakes", "body": "From rough to final, every screen earned its place. Wherever a money decision happened, the layout slowed down and explained itself. I would rather add a line of explanation than a moment of doubt." },
        { "n": "03", "title": "Build the brand in", "body": "A new gold-forward identity, kept restrained. The premium feel comes from precision and space, not decoration. A quiet palette, a tight type scale, and components built to feel exact." }
      ] },
      { "label": "04 / OVERVIEW", "kind": "narrative", "groupKey": "overview", "title": "One system, not fifty", "titleSerif": "screens", "body": [
        "I treated this as one system, not a pile of screens. A quiet, gold-forward palette, a tight type scale, and components built to feel exact. When the parts are exact the whole thing reads as careful, and careful is what earns a $10k deposit.",
        "The dashboard leads with portfolio value and the interest rate, then holdings, the bond detail, and recent activity. The whole picture in one calm scroll. A bond detail page lets a serious investor inspect a position without leaving the flow.",
        "The restraint is deliberate. I left space instead of filling it. At this price point, calm is the signal that someone serious built this."
      ] },
      { "label": "05 / BUYING", "kind": "narrative", "groupKey": "buy", "title": "Buying, made plain and", "titleSerif": "exact", "body": [
        "Buying gold bonds, reviewing terms, and confirming all follow one rule: explain first, then ask. The buy step shows what you commit and what you earn before you agree to anything, so the review-and-accept screen is a confirmation, not a surprise.",
        "A clear terms screen puts the legal language where a serious investor expects it, in plain layout instead of a wall of fine print. The success state closes the loop so the deposit feels finished, not floating.",
        "I thought hard about the states people skip. Pending deposit, failed purchase, mid-redemption. Each gets a real screen, because at this ticket size the gaps are exactly where trust leaks out."
      ] },
      { "label": "06 / TRUST", "kind": "narrative", "groupKey": "trust", "title": "Reassurance, not", "titleSerif": "friction", "body": [
        "Accreditation and bank linking are the heaviest trust moments. You are asking for proof of wealth and account access at the same time, which is where most people hesitate. I designed them to feel like reassurance, not friction.",
        "Self-accreditation offers a clear path, whether someone qualifies by income, net worth, or license, and each option says what it needs and why before it asks. The Plaid bank connection and a clear verified state mean people always know what is checked and what is done.",
        "This is the part of the funnel where designs usually go cold and legal. I kept the same calm palette and spacing here, so the high-stakes screens look like the rest of the product, not a separate compliance wall."
      ] },
      { "label": "07 / KEY SCREENS", "kind": "narrative", "groupKey": "system", "title": "A high-stakes journey made", "titleSerif": "calm", "body": [
        "Accredit, connect, customize, buy, confirm, redeem. The full path, built from one set of components. Because they share a system, the journey feels like a single product moving forward, not six handoffs between teams.",
        "The system is what made one designer shipping every screen possible. Define the components once, build them to feel exact, and the consistency takes care of itself across the whole flow.",
        "From wireframes to final UI, the decisions that mattered were spacing and order, not color. Color was the last thing to land, and it stayed quiet on purpose."
      ] },
      { "label": "08 / IMPACT", "kind": "impact", "groupKey": null, "title": "Brand to launch in three", "titleSerif": "months", "body": [
        "A new brand, a full system, and every screen, shipped at v1 in a three-month sprint. The high minimum stayed intact, and the journey from accreditation to redemption holds together as one calm product. Restraint did the work."
      ], "metrics": [
        { "v": "$10k", "k": "Minimum ticket", "sub": "Accredited investors" },
        { "v": "3 mo", "k": "Brand to launch", "sub": "Single sprint, 2025" },
        { "v": "100%", "k": "Screens shipped", "sub": "At v1" }
      ] },
      { "label": "09 / REFLECTION", "kind": "reflection", "groupKey": null, "title": "What I would push", "titleSerif": "further", "body": [
        "The restraint paid off. The premium feel really did come from spacing and precision, not decoration, and it held up under a $10k ask. I would make that bet again.",
        "What I would push further is the trust moments. Accreditation and bank linking are calmer than usual here, but there is more to win by showing progress and proof even earlier, before the person feels asked. The next version is where I would test that."
      ] }
    ]
  },
  "3eco": {
    "hero": {
      "eyebrow": "B2B OPERATIONS, FIBONALABS",
      "title": "3Eco: one platform, four kinds of",
      "titleSerif": "users",
      "lead": "3Eco is delivery-operations software for coordinators, drivers, compliance officers, and admins. They share the same data, but not the same job. The work was designing for difference instead of the average, so each role gets the surface its day actually needs without splitting the product into four disconnected apps.",
      "meta": [
        { "k": "ROLE", "v": "Product Designer" },
        { "k": "SCOPE", "v": "UX, UI, four roles" },
        { "k": "DOMAIN", "v": "B2B logistics ops" },
        { "k": "SURFACES", "v": "Web + on-route" }
      ]
    },
    "chapters": [
      { "label": "01 / THE PROBLEM", "kind": "narrative", "groupKey": null, "title": "One product cannot be the average of four", "titleSerif": "jobs", "body": [
        "Picture four people on the same system at the same time. A coordinator scanning forty orders, looking for the one that is about to slip. A driver mid-route with one hand free. A compliance officer building an audit trail that has to hold up later. An admin setting up the whole org from scratch.",
        "They touch the same records. Revenue, penalties, timelines, order states. But their workflows have nothing in common. The coordinator wants density. The driver wants one decision at a time. Compliance wants proof. Admin wants control.",
        "If you design for the average user, you serve none of them. Every person gets a tool that is a little bit wrong all day. So the goal was not one screen that pleases everyone. It was the right density, the right tap targets, and the right focus for each role, all sitting on one shared system."
      ] },
      { "label": "02 / WHO IT IS FOR", "kind": "gaps", "groupKey": null, "title": "Four roles, four different days", "titleSerif": "", "body": [
        "Before any layout, I wrote down what each role actually does in a shift. The differences between them are the whole design, so I treated them as the brief, not as a detail to smooth over."
      ], "items": [
        { "n": "01", "title": "Coordinator: dense and fast", "body": "Assigns work, watches the exceptions, and fixes them before they blow up. This surface earns its keep with information density. More on screen, fewer clicks to act, exceptions surfaced first." },
        { "n": "02", "title": "Driver: one decision at a time", "body": "Mid-route, often one hand free, often in direct sun. Big tap targets, usable with gloves, high contrast, and a single clear action per step. No dense tables here." },
        { "n": "03", "title": "Compliance: timestamped and defensible", "body": "Builds an audit trail. Everything timestamped, filterable, and exportable so it holds up to a regulator and to a dispute. The record is the product for this role." }
      ] },
      { "label": "03 / PROCESS", "kind": "process", "groupKey": "roles", "title": "How I worked the difference into one system", "titleSerif": "", "body": [
        "Coming from .NET engineering, I think about the data model first and the screens second. If four roles share one record, the record has to be the single source of truth, and each role just frames it differently. That framing was the design work."
      ], "items": [
        { "n": "01", "title": "Map the shared data, then the divergence", "body": "I started from the records underneath: orders, revenue, penalties, timelines. One foundation. Then I mapped where each role needs to read or write that data, and where their needs split. The split is where the four surfaces come from." },
        { "n": "02", "title": "Set density and tap targets per role", "body": "I tuned each surface to its context. Coordinator gets tables and bulk actions. Driver gets large targets and a single action per view. Compliance gets filters, timestamps, and export. Same components, different rules for spacing and emphasis." },
        { "n": "03", "title": "Design every state, not just the happy path", "body": "In operations software the edge case is the common case. A failed handoff, a missing signature, a penalty in dispute. I designed the empty, error, and in-between states alongside the main flow so nothing dead-ends." }
      ] },
      { "label": "04 / THE SYSTEM", "kind": "narrative", "groupKey": "overview", "title": "Same data, four surfaces", "titleSerif": "", "body": [
        "The records underneath are shared. Revenue, penalties, timelines, order states all live in one place. What changes is the frame. Each role sees the same data shaped for the decision it has to make.",
        "Admin and operations views are built on the same foundation, so an order a coordinator assigns is the same order compliance later audits and admin reports on. No reconciliation between systems, no two versions of the truth.",
        "This is the part I care about most: it is one system, not fifty screens stitched together. The consistency is not cosmetic. It is what lets a record move from creation to dispute to export without anyone re-entering it or trusting a copy."
      ] },
      { "label": "05 / REVENUE FLOW", "kind": "narrative", "groupKey": "revenue", "title": "A flow that survives the edge", "titleSerif": "cases", "body": [
        "Revenue records are add, edit, and complete. I designed those as one flow rather than three disconnected screens. Adding a record, editing it later, and completing it all follow the same path, so there is one mental model to learn.",
        "Every state is accounted for. A record half-entered, a value in dispute, a completion that fails validation. In ops software these are not rare. They are the daily reality, so they get real designs, not a generic error toast.",
        "One flow, every state, no dead ends. If something goes wrong, the screen tells you what and what to do next, instead of leaving you stuck with a record you cannot move forward or back."
      ] },
      { "label": "06 / COMPLIANCE SURFACE", "kind": "narrative", "groupKey": "roles", "title": "Checklists built to be", "titleSerif": "defensible", "body": [
        "The compliance surface is checklists and timestamps designed to hold up under scrutiny. Every action is traceable. Who did what, when, on which order.",
        "Every export is ready for someone else to check. That was the test I held it to: would this stand in front of a regulator, and would it settle a dispute. If the answer was no, the surface was not done.",
        "For compliance, trust is the whole job. The data has to be there, framed plainly, and exportable without cleanup. So I built the trail as a first-class part of the system, not as logging bolted on at the end."
      ] },
      { "label": "07 / IMPACT", "kind": "impact", "groupKey": null, "title": "One foundation, four jobs", "titleSerif": "served", "body": [
        "3Eco serves four user types across two surfaces on one shared data foundation. The win is not a feature count. It is that four very different jobs run on the same records without forking into four products. The data stays consistent, and each role still gets a surface tuned to its day."
      ], "metrics": [
        { "v": "4", "k": "User types", "sub": "one platform" },
        { "v": "2", "k": "Surfaces", "sub": "web + on-route" },
        { "v": "1", "k": "Data foundation", "sub": "shared across roles" }
      ] },
      { "label": "08 / REFLECTION", "kind": "reflection", "groupKey": null, "title": "What I would push", "titleSerif": "further", "body": [
        "Designing for difference is harder to hold together than designing for an average, but it is the honest answer when the users genuinely do different work. The discipline was keeping one data foundation while letting the surfaces diverge as much as the roles needed.",
        "If I pushed further, I would spend more time with real drivers on real routes. Sun, gloves, and one free hand are easy to state and hard to design for well. I would also want to watch a real audit happen, end to end, to see where the export trail still makes someone do manual cleanup."
      ] }
    ]
  },
  "ola": {
    "hero": {
      "eyebrow": "AUTOMOTIVE UI, OLA",
      "title": "Ola: read at",
      "titleSerif": "60 km/h",
      "lead": "This is a scooter instrument cluster built for the half-second glance. Speed and range come first. Everything else recedes until you ask for it. I treated motion as a safety feature, not a flourish, because the screen has to answer two questions before the rider looks back at the road.",
      "meta": [
        { "k": "ROLE", "v": "UI / Motion Designer" },
        { "k": "SCOPE", "v": "Cluster UI + states" },
        { "k": "CONTEXT", "v": "In-motion, glanceable" },
        { "k": "CONSTRAINT", "v": "The half-second glance" }
      ]
    },
    "chapters": [
      { "label": "01 / CONTEXT", "kind": "narrative", "groupKey": null, "title": "Designed for the glance, not the", "titleSerif": "stare", "body": [
        "A rider can spare about half a second. That is the whole brief. In that window the cluster has to answer two things, how fast am I going and how far can I go, then let everything else fall away.",
        "So the hierarchy is strict. Speed and range dominate. The smaller controls step back. Nothing fights for your eye at the moment it matters most, which is the moment your eyes should be on the road, not the screen.",
        "I came to design from engineering, so I think in states. A cluster is not one screen. It is ready and parked, in motion and idle, full battery and low. The job was one visual language that changes what it says without changing how it reads."
      ] },
      { "label": "02 / WHERE IT GETS HARD", "kind": "gaps", "groupKey": null, "title": "What made this", "titleSerif": "hard", "body": [
        "A dashboard you read at a desk is forgiving. A dashboard you read at speed is not. The constraints were physical, not aesthetic."
      ], "items": [
        { "n": "01", "title": "No time to parse", "body": "At half a second, reading is recognition, not parsing. If a rider has to think about what a number means, the design has already failed. Layout had to be learnable in one trip." },
        { "n": "02", "title": "Two modes, one language", "body": "Ready and parked are different states with different priorities, but they cannot look like two different products. The risk was a cluster that felt inconsistent and made the rider re-learn it every time." },
        { "n": "03", "title": "Depth that hides", "body": "Settings, sound, display, connectivity. Real depth lives behind the glance. The trap is letting that depth leak into the main view and crowd out the two numbers that actually matter in motion." }
      ] },
      { "label": "03 / PROCESS", "kind": "process", "groupKey": "secure", "title": "How I built the calm", "titleSerif": "", "body": [
        "I worked from the constraint outward. The half-second glance set the hierarchy, and every decision after that had to earn its place against it."
      ], "items": [
        { "n": "01", "title": "Rank by the glance", "body": "I started by ranking everything a rider could need against the half-second test. Speed and range passed. Most of the rest did not, so they moved to secondary screens. The main view earns its quiet by saying less." },
        { "n": "02", "title": "One system, two modes", "body": "I built ready and parked from the same grid, the same type scale, the same color logic. The cluster changes what it shows without changing how it reads. Switch modes and your eye does not have to relearn anything." },
        { "n": "03", "title": "Tune the motion", "body": "I treated motion as behavior, not decoration. The needle eases into place instead of snapping. I tuned the timing so a glance reads as calm, not alarm, and so the eye trusts the movement on first sight." }
      ] },
      { "label": "04 / THE CLUSTER", "kind": "narrative", "groupKey": "cluster", "title": "Speed and range, everything else", "titleSerif": "recedes", "body": [
        "The main cluster is the half-second glance made literal. Two metrics carry the screen, speed and range, sized so they are read, not studied. Being readable is the entire point.",
        "There are two modes, ready and parked. Same visual language, different message. In motion the cluster leans into speed and range. Parked, it settles and reports state without shouting. The rider never feels like they switched to a new device.",
        "I kept the secondary controls present but subordinate. They are there when you look for them and invisible when you do not. That restraint is the design. A cluster that tries to say everything says nothing at 60 km/h."
      ] },
      { "label": "05 / STATES AND SETTINGS", "kind": "narrative", "groupKey": "settings", "title": "Depth without the", "titleSerif": "noise", "body": [
        "Behind the glance sits the real depth: settings, sound, display, connectivity. The cluster carries all of it, but it stays out of the way until you ask for it.",
        "Every secondary screen uses the same calm hierarchy as the main view. There is no separate design language for the deep menus, because two languages would make a rider re-orient every time they go in. One system, top to bottom.",
        "Modals and passcode entry were the edge cases I cared about most. I built them so you can use them without losing track of where you are. You always know how to get back. The depth never traps you."
      ] },
      { "label": "06 / MOTION", "kind": "narrative", "groupKey": "secure", "title": "Motion as a safety", "titleSerif": "decision", "body": [
        "The needle eases into place instead of snapping. That single choice does more work than any visual flourish could. A snap reads as an event, something to react to. An ease reads as state, something to trust.",
        "I tuned the motion so a glance reads as calm, not alarm. The timing is slow enough to feel settled and fast enough to feel responsive. Your eye trusts it right away, which means it can leave the screen sooner.",
        "This is where engineering and design met. Motion here is not animation for delight. It is a behavior tuned against the half-second glance, and it is the reason the cluster feels safe to read at speed."
      ] },
      { "label": "07 / IMPACT", "kind": "impact", "groupKey": null, "title": "Read in one", "titleSerif": "glance", "body": [
        "The cluster was designed against a single number, the half-second glance, and everything else followed from it. Speed and range carry the main view, the depth stays behind it, and the motion is tuned so the eye trusts what it sees. The result is a cluster a rider can read in one glance and then look back at the road."
      ], "metrics": [
        { "v": "0.5s", "k": "design target", "sub": "one glance" },
        { "v": "2", "k": "primary metrics", "sub": "speed, range" },
        { "v": "100%", "k": "glanceable hierarchy", "sub": "main view" }
      ] },
      { "label": "08 / REFLECTION", "kind": "reflection", "groupKey": null, "title": "What I would push", "titleSerif": "further", "body": [
        "The hardest discipline was leaving things out. Every feature wanted to be on the main screen, and the right answer was almost always no. I would push that restraint even further next time, and pressure-test the layout with real riders in motion, not just in review.",
        "If I had more room, I would instrument the glance itself. Measure how long eyes actually rest on the cluster, then tune the hierarchy and the motion against real data instead of a target. The half-second was the right brief. I would want to prove we hit it."
      ] }
    ]
  }
}
