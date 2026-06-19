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
        "CREB asks a lot more than a normal app. You connect your bank and move real savings into something most people have never bought before. That is a heavy moment.",
        "The old flows worked, but they felt anxious. Steps were not explained. Jargon showed up at the worst times. The dashboard never reassured people that their money was doing anything.",
        "In a money app, that anxiety is the thing that loses you customers. I came to design from .NET engineering, so I think in states. The state I kept seeing here was doubt, and nothing in the product answered it."
      ] },
      { "label": "02 / GAPS", "kind": "gaps", "groupKey": null, "title": "Three things were missing", "titleSerif": "", "body": [
        "Before I drew a single screen, I named the gaps. Each one mapped to a reason a real person would stall and leave."
      ], "items": [
        { "n": "01", "title": "Trust", "body": "People needed proof at every step. What is verified, where the money goes, what happens next. Without that, every tap felt like a risk." },
        { "n": "02", "title": "Plain language", "body": "APY, bond units, accrued interest, maturity. Obvious to the business, confusing to a first-timer. The words were a wall." },
        { "n": "03", "title": "System", "body": "Every screen was a one-off. It needed a shared system so the whole thing felt like one product, not fifty separate pages." }
      ] },
      { "label": "03 / PROCESS", "kind": "process", "groupKey": "system", "title": "Map first, then", "titleSerif": "draw", "body": [
        "I did not start in the UI. I started by understanding the whole product, then traced every path a person could take, including the ones that fail."
      ], "items": [
        { "n": "01", "title": "Map the whole product first", "body": "Before touching a screen, I mapped the whole product: dashboard, investing, redemption, account, rewards, support. The sitemap became the thing we all agreed on." },
        { "n": "02", "title": "Trace every journey end to end", "body": "I drew the flows: first purchase, recurring investment, withdrawal, ID and bank linking, plus every success and failure state. The master user flow put the whole journey on one canvas." },
        { "n": "03", "title": "Low fidelity then high", "body": "Wireframes locked the structure while it was cheap to change. Then final UI once the bones were solid. Mapping success and failure side by side kept the build from missing edge cases." }
      ] },
      { "label": "04 / DASHBOARD", "kind": "narrative", "groupKey": "overview", "title": "The dashboard became the product trust", "titleSerif": "hub", "body": [
        "Every big moment answers the question before you ask it. What is verified, which account is connected, where the money goes, what happens next.",
        "The home screen opens with portfolio value and interest earned, with detail tucked underneath. Calm to glance at, detailed when you dig in. The order is deliberate: portfolio value and 8.9% APY lead, then lifetime interest, compounding progress, monthly-interest and portfolio charts, then investment breakdown, auto-investment, and recent activity.",
        "I wanted the first glance to say one thing clearly. Your money is here, it is growing, and you can see exactly how. Everything else waits for the people who want to dig."
      ] },
      { "label": "05 / TRUST", "kind": "narrative", "groupKey": "trust", "title": "Explain before you", "titleSerif": "ask", "body": [
        "The hardest moments are bank linking, ID, and buying. These are the points where a first-timer freezes. So I put plain explanations right where the doubt used to be.",
        "Before I ask for your bank, I say why and what happens to it. Before ID, I say what gets verified and where it goes. Before a purchase, I show what you are buying and what comes next. No jargon dropped on you mid-flow.",
        "Trust is the funnel. Every unexplained step is a place someone quietly decides not to continue. I treated explanation as a feature, not a footnote."
      ] },
      { "label": "06 / INVEST", "kind": "narrative", "groupKey": "invest", "title": "Buying, made", "titleSerif": "legible", "body": [
        "Investing is where the business jargon hits hardest. Bond units, accrued interest, APY, maturity. I rewrote these moments so a first-timer can follow what they are doing and why.",
        "The purchase flow confirms in plain terms: this is what you are committing, this is what you will earn, this is when. Recurring investment uses the same structure so the second time feels familiar, not new.",
        "I designed the confirm and success states to close the loop. You do not just buy and wonder. You see it land, and you see what changes on your dashboard."
      ] },
      { "label": "07 / WITHDRAW", "kind": "narrative", "groupKey": "withdraw", "title": "Taking money out is where trust gets", "titleSerif": "tested", "body": [
        "Pulling money out is the moment an app proves it is honest. If withdrawal feels slow, vague, or hidden, people stop trusting everything else.",
        "I designed the full set of screens: confirm, success, failure, and help. The bad paths get the same care as the good ones. A failed withdrawal tells you what happened and what to do, instead of leaving you staring at a dead end.",
        "This is the engineer in me. The states people skip are the states that matter most. I would rather over-design the error than let someone feel abandoned with their own money."
      ] },
      { "label": "08 / SYSTEM", "kind": "narrative", "groupKey": "system", "title": "One system, not fifty", "titleSerif": "screens", "body": [
        "I built CREB mobile-first, and every step (link, verify, buy, confirm) is designed to clear up doubt right when it shows up.",
        "Underneath the screens is a shared system: components, patterns, and language reused across the whole journey. The sitemap and master flow fed straight into it, so the dashboard, investing, and withdrawal all speak the same way.",
        "A system is also a handoff tool. When everything is one set of parts, engineers build faster and the product stays consistent as it grows. That mattered, because this shipped to production and keeps moving."
      ] },
      { "label": "09 / IMPACT", "kind": "impact", "groupKey": null, "title": "Trust moved the", "titleSerif": "numbers", "body": [
        "Taking the doubt out of each step did what I hoped. More people finished, more money moved in, and the funnel held. When you explain before you ask, people commit."
      ], "metrics": [
        { "v": "5x", "k": "Active investors", "sub": "400 to 2,000" },
        { "v": "10x", "k": "Value held", "sub": "$400k to $4M" },
        { "v": "~70%", "k": "Conversion lift", "sub": "across the journey" }
      ] },
      { "label": "10 / REFLECTION", "kind": "reflection", "groupKey": null, "title": "What I would push", "titleSerif": "further", "body": [
        "The biggest lesson held up. In a money app, the design problem is rarely the layout. It is the doubt. Solve the doubt and the metrics follow.",
        "If I kept going, I would push harder on the reporting and statements. People trust what they can verify over time, and there is room to make the long-term view as reassuring as the first impression. Trust is not a screen you ship once. It is something you keep earning."
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
        "Accredited investors look closely. A $10,000 minimum makes every screen matter more. When the ticket is that size, a moment of doubt does not just cost a tap. It costs the whole deposit.",
        "The product had to feel trustworthy enough for real money while staying as easy to read as an everyday app. Precise without showing off. Premium without ever being confusing. Those two pulls fight each other, and most fintech lands on cold and complicated.",
        "I came to design from .NET engineering, so I read this as a states problem before a styling problem. Trust is the funnel. If a screen cannot explain itself before it asks for money or a bank login, people stop. So I planned to explain first, then ask, on every screen that mattered."
      ] },
      { "label": "02 / GAPS", "kind": "gaps", "groupKey": null, "title": "What was missing on day", "titleSerif": "one", "body": [
        "There was a product idea and a high minimum. There was no brand, no flow, and no system. I had to build all three at once and keep them in agreement."
      ], "items": [
        { "n": "01", "title": "No brand to lean on", "body": "A gold-bond product with no identity yet. I had to invent the look and prove it could feel premium without decoration, since decoration reads as cheap at this price point." },
        { "n": "02", "title": "No mapped journey", "body": "Accreditation, bank connection, customizing the investment, buying, redeeming. None of it was sequenced. A high-stakes path with no map hits dead ends, and dead ends kill trust." },
        { "n": "03", "title": "One designer, every screen", "body": "Sole product designer across brand, UX, UI, and the system. No team to absorb the edge cases, so the system itself had to carry the consistency." }
      ] },
      { "label": "03 / PROCESS", "kind": "process", "groupKey": "system", "title": "How I worked it", "titleSerif": "out", "body": [
        "I built the system so the screens could stay calm. The premium feel gets decided in the spacing, long before any color lands."
      ], "items": [
        { "n": "01", "title": "Structure the journey", "body": "Accreditation, bank connection, customizing the investment, buying, redeeming. I mapped the full flow first so a high-stakes journey never hit a dead end. Knowing the order told me where to slow down." },
        { "n": "02", "title": "Wireframe the stakes", "body": "From rough to final, every screen earned its place. Wherever a money decision happened, the layout slowed down and explained itself. I would rather add a line of explanation than a moment of doubt." },
        { "n": "03", "title": "Build the brand in", "body": "A new gold-forward identity, kept restrained. The premium feel comes from precision and space, not decoration. A quiet palette, a tight type scale, and components built to feel exact. The system did the heavy lifting." }
      ] },
      { "label": "04 / OVERVIEW", "kind": "narrative", "groupKey": "overview", "title": "One system, not fifty", "titleSerif": "screens", "body": [
        "I treated this as one system, not a pile of screens. A quiet palette, a tight type scale, and components built to feel exact. When the parts are exact, the whole thing reads as careful, and careful is what earns a $10k deposit.",
        "Every screen follows the same rule: explain first, then ask. That consistency is the actual product. It means a person never has to relearn the interface halfway through a money decision.",
        "The restraint is deliberate. I left space instead of filling it. At this price point, calm is the signal that someone serious built this."
      ] },
      { "label": "05 / DASHBOARD", "kind": "narrative", "groupKey": "buy", "title": "Buying, made plain and", "titleSerif": "exact", "body": [
        "The dashboard opens with the numbers that matter and a clear picture of where the money sits. Portfolio value and accrued interest lead, then holdings, the interest-rate options, and recent activity. The whole picture in one calm scroll.",
        "Buying, the calculator, deposits, and redemption all follow the same rule: explain first, then ask. The calculator shows what a choice means before the person commits to it, so the buy step is a confirmation, not a surprise.",
        "I thought hard about the states people skip. Empty portfolio, pending deposit, mid-redemption. Each one gets a real screen, because the gaps are where trust leaks out."
      ] },
      { "label": "06 / TRUST", "kind": "narrative", "groupKey": "trust", "title": "Reassurance, not", "titleSerif": "friction", "body": [
        "Bank linking and accreditation are the heaviest trust moments. They are where most people hesitate, because you are asking for proof and access at the same time. So I designed them to feel like reassurance instead of friction.",
        "Before each ask, the screen says what it needs and why. Explain before you ask. When someone understands the reason for a bank connection, the connection stops feeling like a risk and starts feeling like a step.",
        "This is the part of the funnel where designs usually go cold and legal. I kept the same calm palette and spacing here, so the high-stakes screens look like the rest of the product, not like a separate compliance wall."
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
        "The restraint paid off. The premium feel really did come from spacing and precision, not decoration, and that held up under a $10k ask. I would make that bet again.",
        "What I would push further is the trust moments. Bank linking and accreditation are calmer than usual here, but there is more to win by showing progress and proof even earlier, before the person feels asked. The next version is where I would test that."
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
