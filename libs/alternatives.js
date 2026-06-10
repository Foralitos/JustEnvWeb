// Data for the /alternatives/[slug] comparison cluster.
// SEO target: "<competitor> alternative" keywords (see vault note justenvs-seo).
// Every entry carries UNIQUE prose (intro, wins, FAQs) — the template is shared,
// the content is not. Honesty in "whereTheyWin" is deliberate: it ranks and converts.
// Competitor pricing verified against live pages as of lastUpdated — refresh yearly.

export const ALTERNATIVES = [
  {
    slug: "doppler",
    name: "Doppler",
    title: "Doppler Alternative for Mac Developers (2026)",
    metaDescription:
      "Looking for a Doppler alternative? JustEnvs is a native Mac app for .env files — end-to-end encrypted, one-time $20, free for solo devs. No cloud platform to babysit.",
    tagline:
      "Doppler is a cloud secrets platform built for teams syncing configs across many environments. JustEnvs is a native Mac app for developers who just want their .env files stored, encrypted, and shareable.",
    segment: "Cloud secrets-management platform for teams",
    pricing: {
      competitor: "Free up to 3 users, then per-seat monthly (Team tier), Enterprise custom",
      justenvs: "Free for solo devs (5 projects) · $20 one-time for Pro, lifetime",
    },
    intro: [
      "Doppler earned its place. If your team runs dozens of services across dev, staging, and production, Doppler's centralized dashboard, environment branching, and CI/CD integrations genuinely solve the config-drift problem. It syncs secrets into Kubernetes, Vercel, GitHub Actions, and just about anything else with an API.",
      "But that power comes with a shape that doesn't fit everyone. Doppler is a web dashboard plus a CLI agent — there's no native Mac app. Your secrets live on Doppler's servers, where the service can technically read them (server-side encryption, not zero-knowledge). And pricing is per-seat per-month, which makes sense for a platform you operate, less sense for a tool you just use.",
      "If you're a solo developer or a small Mac-based team whose actual problem is \"my .env files are scattered across twelve projects and I keep pasting them into Slack\", you don't need a secrets platform. You need a place to put them. That's JustEnvs: a native macOS app where your variables are encrypted on your machine, organized by project, and shareable through self-destructing links.",
    ],
    compareRows: [
      { feature: "Native Mac app", justenvs: "Yes — built for macOS", competitor: "No — web dashboard + CLI" },
      { feature: "Encryption model", justenvs: "End-to-end, zero-knowledge", competitor: "Server-side (Doppler can decrypt)" },
      { feature: "One-time secret links", justenvs: "Built in — burn after reading", competitor: "Not a feature" },
      { feature: "Pricing", justenvs: "$20 one-time, free for solo devs", competitor: "Per-seat monthly after 3 users" },
      { feature: "Runtime injection / CI sync", justenvs: "No — store and share, not inject", competitor: "Yes — CLI, agents, integrations" },
      { feature: "Works offline", justenvs: "Yes — local-first vault", competitor: "No — cloud service" },
    ],
    whereTheyWin: [
      {
        title: "Multi-environment sync at scale",
        body: "Branching configs across dev/staging/prod for dozens of services is Doppler's core job, and it does it well.",
      },
      {
        title: "CI/CD and platform integrations",
        body: "First-class integrations with Kubernetes, Vercel, AWS, GitHub Actions and more inject secrets at runtime — JustEnvs doesn't do runtime injection.",
      },
      {
        title: "Team access control",
        body: "RBAC, audit logs, and SCIM matter when you have an org chart. If you need per-environment permissions for 40 engineers, use Doppler.",
      },
    ],
    whereWeWin: [
      {
        title: "It's an actual Mac app",
        body: "Menu bar access, native UI, Touch ID — not a browser tab you keep losing. Your secrets tool should feel like part of your machine.",
      },
      {
        title: "Zero-knowledge by design",
        body: "Encryption happens on your Mac before anything is uploaded. JustEnvs cannot read your secrets. Doppler's servers can.",
      },
      {
        title: "One price, not a subscription",
        body: "Free for solo devs, $20 once for Pro. No per-seat math, no monthly line item for storing text files.",
      },
      {
        title: "Sharing that self-destructs",
        body: "Send a .env to a teammate with a link that burns after reading. In Doppler you'd invite them to your workspace instead.",
      },
    ],
    faqs: [
      {
        q: "Is JustEnvs a drop-in replacement for Doppler?",
        a: "No, and it doesn't try to be. Doppler injects secrets into running apps and CI pipelines; JustEnvs stores, organizes, and shares your .env files from a native Mac app. If you need runtime injection across many services, stay with Doppler. If your real problem is storing and sharing env files safely, JustEnvs is the simpler tool.",
      },
      {
        q: "Why switch from Doppler to JustEnvs?",
        a: "Three common reasons: you want a native Mac app instead of a web dashboard, you want zero-knowledge encryption where the vendor can't read your secrets, or you're tired of per-seat monthly pricing for what is, for you, a single-player tool. JustEnvs is free for solo devs and $20 one-time for Pro.",
      },
      {
        q: "Does Doppler have a free plan?",
        a: "Yes — Doppler's Developer plan is free for up to 3 users, with paid per-seat tiers above that (as of 2026). JustEnvs is free for solo developers with up to 5 projects, and Pro is a $20 one-time purchase with unlimited projects.",
      },
      {
        q: "Can JustEnvs sync secrets to CI/CD like Doppler?",
        a: "Not today. JustEnvs focuses on the store-and-share half of the problem: encrypted local vault, project organization, and one-time share links. If CI injection is your main need, Doppler or Infisical fit better.",
      },
      {
        q: "Is JustEnvs more secure than Doppler?",
        a: "The encryption models differ. Doppler encrypts your secrets server-side, meaning their infrastructure can decrypt them. JustEnvs encrypts on your Mac and never sees plaintext — shares travel as ciphertext with the key in the URL fragment, which browsers never send to servers. For threat models where you don't want any vendor able to read your secrets, zero-knowledge wins.",
      },
    ],
    lastUpdated: "2026-06-10",
  },

  {
    slug: "infisical",
    name: "Infisical",
    title: "Infisical Alternative for Mac Developers (2026)",
    metaDescription:
      "Looking for an Infisical alternative? JustEnvs is a native Mac app for .env files — zero-knowledge by default, no server to self-host, $20 one-time. Free for solo devs.",
    tagline:
      "Infisical is an open-source secrets platform you can self-host, aimed at teams managing secrets across infrastructure. JustEnvs is a native Mac app with nothing to deploy — your vault lives on your machine.",
    segment: "Open-source secrets-management platform (cloud or self-hosted)",
    pricing: {
      competitor: "Free up to 5 identities, then Pro per-identity monthly (~$18)",
      justenvs: "Free for solo devs (5 projects) · $20 one-time for Pro, lifetime",
    },
    intro: [
      "Infisical is probably the most interesting player in the secrets space: open source, self-hostable, with secret scanning, rotation, and even free one-time secret sharing bundled into the platform. If your org wants an auditable, self-hosted alternative to enterprise secrets managers, Infisical is a serious choice.",
      "The catch is the word \"platform\". To get Infisical's benefits you either trust their cloud or run their server yourself — provisioning, upgrading, and securing it. Identity-based pricing kicks in as your team grows. And like most of the category, it's a web dashboard plus CLI, designed for infrastructure, not for the developer sitting at a Mac with a folder of .env files.",
      "JustEnvs starts from the opposite end. There is no server to run and no dashboard to log into: a native macOS app encrypts your variables locally, organizes them by project, and generates self-destructing share links when you need to hand secrets to someone. Zero-knowledge isn't a deployment option — it's the only mode.",
    ],
    compareRows: [
      { feature: "Native Mac app", justenvs: "Yes — built for macOS", competitor: "No — web dashboard + CLI" },
      { feature: "Anything to deploy or operate", justenvs: "Nothing — local-first app", competitor: "Self-host server, or use their cloud" },
      { feature: "Zero-knowledge encryption", justenvs: "Always — encrypted on your Mac", competitor: "Depends on deployment and configuration" },
      { feature: "One-time secret links", justenvs: "Built in, .env-aware", competitor: "Yes — web-based secret sharing" },
      { feature: "Pricing", justenvs: "$20 one-time, free for solo devs", competitor: "Per-identity monthly after free tier" },
      { feature: "Secret rotation / scanning", justenvs: "No", competitor: "Yes — platform features" },
    ],
    whereTheyWin: [
      {
        title: "Open source and self-hostable",
        body: "You can read Infisical's code and run it on your own infrastructure. If auditability or data residency is a hard requirement, that matters.",
      },
      {
        title: "Platform features",
        body: "Secret rotation, scanning for leaked credentials, Kubernetes operators, and machine identities — real infrastructure tooling JustEnvs doesn't attempt.",
      },
      {
        title: "Free secret sharing on the web",
        body: "Infisical bundles one-time secret sharing at no cost. If you only ever need a web text box, that's enough.",
      },
    ],
    whereWeWin: [
      {
        title: "Nothing to operate",
        body: "No server to self-host, no cloud workspace to configure. Download the app, your vault is local, done.",
      },
      {
        title: "Native Mac craft",
        body: "JustEnvs is a real macOS app — menu bar, Touch ID, native feel. Infisical's interface is a web dashboard.",
      },
      {
        title: "Store-first, not share-only",
        body: "Your projects and their variables live organized in the vault; sharing is one feature of it. Infisical's secret sharing is a detached text box — it doesn't remember your projects.",
      },
      {
        title: "Simpler mental model",
        body: "No identities, no machine auth, no environments matrix. Projects, variables, share links. That's the whole tool.",
      },
    ],
    faqs: [
      {
        q: "Isn't Infisical free and open source? Why pay for JustEnvs?",
        a: "Infisical's code is open source, but using it means either trusting their cloud (free up to 5 identities, then per-identity pricing as of 2026) or running the server yourself — which costs time and infrastructure. JustEnvs is free for solo devs, and Pro is $20 once. You're paying for a polished native app and zero operations, not for the idea of secrets management.",
      },
      {
        q: "Infisical already has one-time secret sharing. How is JustEnvs different?",
        a: "Infisical's sharing is a web text box: paste, get link. JustEnvs sharing starts from your vault — pick a project's variables, set burn conditions, send. The secrets are already organized and encrypted on your Mac; sharing is one click from where they live, with full .env formatting preserved.",
      },
      {
        q: "Is JustEnvs open source?",
        a: "No. JustEnvs is a commercial native Mac app. The security model is documented openly — client-side AES-GCM encryption, keys in URL fragments, zero-knowledge server — and the share viewer decrypts in your browser where you can inspect it, but the app itself is closed source.",
      },
      {
        q: "Can I self-host JustEnvs?",
        a: "There's nothing to self-host: the vault is local to your Mac by design. The only server component is the share-link relay, which stores ciphertext it cannot decrypt. If self-hosting everything is a requirement, Infisical is the better fit.",
      },
      {
        q: "Who should choose Infisical over JustEnvs?",
        a: "Teams that need secret rotation, leak scanning, machine identities, or Kubernetes-native workflows — or orgs with a self-hosting mandate. JustEnvs is for developers on Macs whose secrets problem is .env files, not infrastructure.",
      },
    ],
    lastUpdated: "2026-06-10",
  },

  {
    slug: "dotenv-vault",
    name: "dotenv-vault",
    title: "dotenv-vault Alternative for Mac Developers (2026)",
    metaDescription:
      "dotenv-vault's free tier is gone and the project moved to dotenvx. JustEnvs is the alternative: a native Mac app for .env files, still free for solo devs, $20 one-time.",
    tagline:
      "dotenv-vault — from the creator of dotenv — pioneered encrypt-and-commit .env workflows, but the project has shifted to dotenvx and the free tier was discontinued in 2025. JustEnvs picks up where it left off for Mac developers.",
    segment: "CLI-based .env encryption (now dotenvx, paid Armor tiers)",
    pricing: {
      competitor: "dotenvx CLI is OSS; hosted features moved to paid Armor plans (free tier discontinued in 2025)",
      justenvs: "Free for solo devs (5 projects) · $20 one-time for Pro, lifetime",
    },
    intro: [
      "If you're searching for a dotenv-vault alternative, chances are you were a user — and then the ground moved. The creator of dotenv refocused the project into dotenvx, an encrypt-your-.env-and-commit-it CLI, and the hosted free tier that made dotenv-vault attractive was discontinued in 2025. What's left is an open-source CLI plus paid \"Armor\" tiers for the managed features.",
      "The encrypt-and-commit model itself is clever: your encrypted .env travels with the repo, and a private key decrypts it locally. But it's CLI-only, per-repository, and the workflow lives in git — there's no place where you can see all your projects' secrets, and nothing built in for handing a secret to another person.",
      "JustEnvs takes the same core conviction — .env files deserve real tooling — and builds it as a native Mac app instead of a CLI. Your projects sit in one encrypted vault, organized and searchable, with Touch ID instead of key files, and one-time self-destructing links for the moments you need to share. And the part that stings about dotenv-vault's pivot doesn't apply here: JustEnvs is free for solo developers, with Pro as a $20 one-time purchase — no subscription to discontinue.",
    ],
    compareRows: [
      { feature: "Interface", justenvs: "Native Mac app", competitor: "CLI only" },
      { feature: "Free tier", justenvs: "Yes — free for solo devs", competitor: "Hosted free tier discontinued (2025)" },
      { feature: "All projects in one place", justenvs: "Yes — vault organized by project", competitor: "No — per-repo encrypted files" },
      { feature: "Share with another person", justenvs: "One-time self-destructing links", competitor: "Not built in — share keys manually" },
      { feature: "Encryption", justenvs: "Local AES-GCM, zero-knowledge shares", competitor: "Public-key encrypt-and-commit" },
      { feature: "Pricing", justenvs: "$20 one-time", competitor: "OSS CLI + paid Armor subscription tiers" },
    ],
    whereTheyWin: [
      {
        title: "Secrets travel with the repo",
        body: "Encrypt-and-commit means a cloned repo carries its own encrypted config — elegant for teams that live entirely in git.",
      },
      {
        title: "Open-source CLI",
        body: "dotenvx is OSS and cross-platform. If you need Linux/Windows support or want to read the code, that's a real advantage.",
      },
      {
        title: "CI-friendly by design",
        body: "A single private key env var decrypts in any pipeline. JustEnvs doesn't target CI workflows.",
      },
    ],
    whereWeWin: [
      {
        title: "Still free for solo devs",
        body: "The reason many people adopted dotenv-vault — a free tier for individual developers — is the reason to try JustEnvs now.",
      },
      {
        title: "A vault, not scattered files",
        body: "See every project's variables in one encrypted, searchable place instead of per-repo encrypted blobs you manage by hand.",
      },
      {
        title: "Sharing is built in",
        body: "Hand a staging .env to a contractor with a link that burns after reading. With dotenvx you'd be sharing private keys over Slack.",
      },
      {
        title: "No subscription risk",
        body: "Pro is $20 once, lifetime. A one-time purchase can't pull a free-tier rug.",
      },
    ],
    faqs: [
      {
        q: "What happened to dotenv-vault?",
        a: "The project's creator shifted focus to dotenvx, an open-source encrypt-and-commit CLI, and dotenv-vault's hosted free tier was discontinued in 2025. Managed features now live behind paid Armor subscription tiers (as of 2026).",
      },
      {
        q: "Is JustEnvs a direct replacement for dotenv-vault?",
        a: "For the job most people used it for — keeping .env files encrypted, organized, and off Slack — yes, and with a native Mac interface instead of a CLI. JustEnvs doesn't do encrypt-and-commit into your repo; secrets live in a local encrypted vault and move via one-time links instead.",
      },
      {
        q: "Can I import my existing .env files?",
        a: "Yes — JustEnvs is .env-native. Drop your files in and each project's variables are stored encrypted, with the original formatting available whenever you copy or share them.",
      },
      {
        q: "Does JustEnvs work outside macOS?",
        a: "The app is macOS-only (13+). Share links, however, open in any modern browser on any OS — recipients don't need a Mac or an account.",
      },
      {
        q: "Why not just use dotenvx for free?",
        a: "If you're comfortable managing key files per repo and only work alone in git, dotenvx is a fine tool. JustEnvs is for developers who want their secrets visible in one organized vault, protected by Touch ID, and shareable without handing out private keys.",
      },
    ],
    lastUpdated: "2026-06-10",
  },

  {
    slug: "onetimesecret",
    name: "OneTimeSecret",
    title: "OneTimeSecret Alternative for Developers (2026)",
    metaDescription:
      "Looking for a OneTimeSecret alternative? JustEnvs adds what the web text box can't: a native Mac vault, .env-aware formatting, and zero-knowledge encryption. Free for solo devs.",
    tagline:
      "OneTimeSecret is the classic web tool: paste a secret, get a self-destructing link. JustEnvs does the same — and adds the part developers actually need: a place where those secrets live.",
    segment: "Web-based one-time secret sharing",
    pricing: {
      competitor: "Free; paid Identity plan (flat monthly) for custom domains",
      justenvs: "Free for solo devs (5 projects) · $20 one-time for Pro, lifetime",
    },
    intro: [
      "OneTimeSecret deserves credit for defining the category: a dead-simple web page where you paste a secret and get a link that works once. It's open source, it's free, and for sending your aunt a Wi-Fi password it's exactly the right amount of tool.",
      "For developers, though, the text box is where it ends. OneTimeSecret doesn't know what a .env file is — multi-line configs lose their shape, there's no syntax awareness, and every secret is an isolated paste with no memory. You're also pasting plaintext into a web form, trusting the server with it before it's encrypted at rest.",
      "JustEnvs approaches sharing from the opposite direction: the secret already lives in an encrypted vault on your Mac, organized by project. Sharing is one click from there — the .env keeps its formatting, encryption happens locally before anything is uploaded (the server only ever stores ciphertext it can't read), and the link burns just like you'd expect. Store first, share second.",
    ],
    compareRows: [
      { feature: "Where secrets live", justenvs: "Encrypted vault on your Mac", competitor: "Nowhere — paste each time" },
      { feature: ".env aware", justenvs: "Yes — formatting preserved, key/value rows", competitor: "No — plain text box" },
      { feature: "Encryption", justenvs: "Client-side, zero-knowledge", competitor: "Server-side after you paste plaintext" },
      { feature: "Burn after reading", justenvs: "Yes — plus view limits and TTL", competitor: "Yes" },
      { feature: "Native Mac app", justenvs: "Yes", competitor: "No — website" },
      { feature: "Recipient needs", justenvs: "Just a browser", competitor: "Just a browser" },
    ],
    whereTheyWin: [
      {
        title: "Zero install, zero commitment",
        body: "A URL anyone can use from any OS in ten seconds. JustEnvs needs a Mac app to create shares (though not to open them).",
      },
      {
        title: "Open source and self-hostable",
        body: "You can run your own OneTimeSecret instance. JustEnvs's relay is operated for you, not by you.",
      },
      {
        title: "Works for non-developers",
        body: "Wi-Fi passwords, door codes, the occasional one-liner — for non-technical sharing, the simple text box is the right interface.",
      },
    ],
    whereWeWin: [
      {
        title: "A vault, not a text box",
        body: "Your secrets are stored, organized by project, and searchable — sharing starts from where they already live, not from a blank paste.",
      },
      {
        title: "True zero-knowledge",
        body: "Encryption happens on your Mac before upload; the decryption key rides in the URL fragment that browsers never send to servers. With OneTimeSecret, the server sees your plaintext when you paste it.",
      },
      {
        title: "Built for .env files",
        body: "Share an entire config with formatting intact — key/value rows, not a wall of text the recipient has to un-mangle.",
      },
      {
        title: "Finer burn controls",
        body: "One view or five, 1 hour to 7 days — whichever hits first destroys the share atomically.",
      },
    ],
    faqs: [
      {
        q: "What does JustEnvs do that OneTimeSecret doesn't?",
        a: "It stores your secrets. OneTimeSecret is stateless — every share starts with pasting into a blank box. JustEnvs is a native Mac vault where your projects' variables live encrypted, and one-time links are generated from there with .env formatting preserved.",
      },
      {
        q: "Is JustEnvs more secure than OneTimeSecret?",
        a: "The key difference is where encryption happens. With OneTimeSecret you paste plaintext into a web page, and the server encrypts it at rest. JustEnvs encrypts on your Mac with AES-GCM before upload, and the decryption key never reaches the server — it travels in the URL fragment. The JustEnvs relay stores only ciphertext it cannot open.",
      },
      {
        q: "Do my recipients need JustEnvs to open a link?",
        a: "No. Like OneTimeSecret, links open in any modern browser — decryption happens client-side via WebCrypto. No account, no install.",
      },
      {
        q: "Is JustEnvs free like OneTimeSecret?",
        a: "For solo developers, yes — free with up to 5 projects, including one-time share links. Pro is a $20 one-time purchase for unlimited projects. OneTimeSecret is free with a flat-fee paid plan for custom domains (as of 2026).",
      },
      {
        q: "When is OneTimeSecret the better choice?",
        a: "When the sender isn't on a Mac, when you want to self-host the sharing service, or when you're sharing one-off non-developer secrets. If your secrets are .env files you touch every week, a vault beats a text box.",
      },
    ],
    lastUpdated: "2026-06-10",
  },

  {
    slug: "1password",
    name: "1Password",
    title: "1Password Alternative for .env Files & Developer Secrets (2026)",
    metaDescription:
      "1Password is great for passwords — but .env files aren't passwords. JustEnvs is the Mac-native vault built for environment variables. Keep both: $20 one-time, free for solo devs.",
    tagline:
      "1Password is the gold standard for passwords, passkeys, and family logins. JustEnvs isn't trying to replace it — it's the tool for the thing 1Password treats as an afterthought: your .env files.",
    segment: "Password manager (consumer & business), subscription per-user",
    pricing: {
      competitor: "No free tier; individual and per-user team/business subscriptions",
      justenvs: "Free for solo devs (5 projects) · $20 one-time for Pro, lifetime",
    },
    intro: [
      "Let's be clear up front: if you're looking to replace 1Password for passwords, logins, and passkeys — keep 1Password. It's excellent at that job, the browser extension is everywhere, and your family vault isn't going to migrate itself.",
      "The search for a \"1Password alternative\" among developers usually means something narrower: 1Password is where your team said to put the API keys, and it's awkward there. Secrets end up as secure notes — unstructured walls of text — or as one-field-per-key entries nobody maintains. There's a developer offering (Secrets Automation, service accounts), but it's bolted onto a password manager's data model and a per-user subscription you pay forever.",
      "JustEnvs is what that workflow looks like when .env files are the headline instead of the footnote. Variables are first-class: organized by project, encrypted locally on your Mac, copied back out as valid .env with one click, and shareable through self-destructing links instead of \"I added you to the shared vault\". It costs $20 once — or nothing, if you're a solo dev.",
    ],
    compareRows: [
      { feature: "Built for", justenvs: ".env files and project secrets", competitor: "Passwords, passkeys, logins" },
      { feature: ".env structure preserved", justenvs: "Yes — key/value rows per project", competitor: "No — secure notes or one-off fields" },
      { feature: "One-time secret links", justenvs: "Yes — burn after reading", competitor: "Item sharing with expiry (account-centric)" },
      { feature: "Pricing", justenvs: "$20 one-time, free for solo devs", competitor: "Subscription per user, no free tier" },
      { feature: "Browser extension / autofill", justenvs: "No — not a password manager", competitor: "Yes, best in class" },
      { feature: "Platform", justenvs: "Native macOS app", competitor: "All platforms" },
    ],
    whereTheyWin: [
      {
        title: "Everything password-shaped",
        body: "Logins, passkeys, 2FA codes, credit cards, autofill across every browser and OS. JustEnvs doesn't compete here at all.",
      },
      {
        title: "Team and family management",
        body: "Mature sharing, recovery, and admin controls trusted by millions of users and thousands of orgs.",
      },
      {
        title: "Cross-platform everywhere",
        body: "Windows, Linux, Android, iOS, web. JustEnvs is macOS-only (share links open anywhere, but the vault is Mac).",
      },
    ],
    whereWeWin: [
      {
        title: ".env files as first-class citizens",
        body: "Projects contain variables, variables keep their names and formatting, and a whole config copies out as valid .env — not a secure note you parse by eye.",
      },
      {
        title: "Sharing without account ceremony",
        body: "A one-time link any browser can open, destroyed after reading. No inviting contractors into your vault structure.",
      },
      {
        title: "One-time price",
        body: "1Password is a subscription forever, per user. JustEnvs Pro is $20 once — and free if you're a solo dev with up to 5 projects.",
      },
      {
        title: "Purpose-built simplicity",
        body: "No categories, watchtowers, or family plans to navigate. Open the menu bar app, grab your staging vars, done.",
      },
    ],
    faqs: [
      {
        q: "Should I replace 1Password with JustEnvs?",
        a: "No — they solve different problems. Keep 1Password for passwords, passkeys, and logins. Use JustEnvs for the developer secrets that fit awkwardly in a password manager: .env files, API keys per project, configs you need to share with teammates.",
      },
      {
        q: "Can't I just store .env files in 1Password secure notes?",
        a: "You can, and many devs do — that's the problem JustEnvs exists for. Secure notes are unstructured text: no key/value rows, no per-project organization, no .env-formatted export, and sharing means granting vault access. JustEnvs treats variables as data, not prose.",
      },
      {
        q: "Is JustEnvs cheaper than 1Password?",
        a: "Over time, yes. 1Password is a recurring per-user subscription with no free tier (as of 2026). JustEnvs is free for solo developers and $20 one-time for Pro — there is no recurring cost.",
      },
      {
        q: "Does JustEnvs have a browser extension or autofill?",
        a: "No. JustEnvs isn't a password manager — it doesn't fill web forms. It stores and shares environment variables from a native Mac app. If you need autofill, that's 1Password's job.",
      },
      {
        q: "How does sharing compare between the two?",
        a: "1Password shares items between accounts or via item links tied to its ecosystem. JustEnvs generates an anonymous one-time link: encrypted on your Mac, opened in any browser, destroyed after the view limit or timer hits. No recipient account, ever.",
      },
    ],
    lastUpdated: "2026-06-10",
  },
];

export const getAlternative = (slug) =>
  ALTERNATIVES.find((a) => a.slug === slug) || null;

export const otherAlternatives = (slug) =>
  ALTERNATIVES.filter((a) => a.slug !== slug);
