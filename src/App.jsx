import { useMemo, useState } from "react";

const homes = [
  {
    id: 1,
    title: "The Willow House",
    location: "Silver Lake, Los Angeles",
    price: 1249000,
    beds: 3,
    baths: 2,
    area: 2180,
    type: "House",
    label: "JUST LISTED",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    description: "A warm, light-filled retreat tucked into the hillside. Thoughtfully renovated with natural materials, open living spaces, and a garden made for slow Sunday mornings.",
    agent: "Olivia Rhye",
    agentImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 2,
    title: "Casa Solana",
    location: "Laurel Canyon, Los Angeles",
    price: 1895000,
    beds: 4,
    baths: 3,
    area: 2940,
    type: "House",
    label: "OPEN SUN, 1–4 PM",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    description: "A modern canyon home with a quietly confident California spirit. Floor-to-ceiling glass opens to a sun-soaked deck, while a serene primary suite offers its own private escape.",
    agent: "Marcus Cole",
    agentImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 3,
    title: "The Linden Loft",
    location: "Arts District, Los Angeles",
    price: 875000,
    beds: 2,
    baths: 2,
    area: 1560,
    type: "Condo",
    label: "PRICE IMPROVED",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    description: "Industrial character meets considered design in this airy corner loft. Exposed brick, custom oak cabinetry, and a wide-open living area put the best of the Arts District right outside your door.",
    agent: "Olivia Rhye",
    agentImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 4,
    title: "Olive & Stone",
    location: "Los Feliz, Los Angeles",
    price: 1525000,
    beds: 3,
    baths: 2,
    area: 2410,
    type: "House",
    label: "NEW TO MARKET",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    description: "A beautifully balanced home in the heart of Los Feliz. The thoughtful layout pairs a calm, neutral palette with original details, creating a space that feels both timeless and entirely your own.",
    agent: "Nina Patel",
    agentImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 5,
    title: "Cypress on the Hill",
    location: "Eagle Rock, Los Angeles",
    price: 1095000,
    beds: 3,
    baths: 2,
    area: 1960,
    type: "House",
    label: "OPEN SAT, 11–2 PM",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    description: "Perched above a tree-lined street, this reimagined residence makes the most of its hillside setting. Enjoy an easy indoor-outdoor flow, a generous garden, and long sunset views.",
    agent: "Marcus Cole",
    agentImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 6,
    title: "Sunday Morning",
    location: "Highland Park, Los Angeles",
    price: 975000,
    beds: 2,
    baths: 2,
    area: 1740,
    type: "Townhouse",
    label: "JUST LISTED",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85",
    description: "A relaxed, design-forward townhouse just a short walk from York Boulevard. Quietly tucked away, it features a private patio, sunlit interiors, and all the room you need to settle in.",
    agent: "Nina Patel",
    agentImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80",
  },
];

const agents = [
  { name: "Olivia Rhye", role: "Senior Real Estate Advisor", sales: "48 homes sold", image: homes[0].agentImage, bio: "Olivia brings a thoughtful eye for design and deep neighborhood knowledge to every search. She believes finding home should feel as good as being there." },
  { name: "Marcus Cole", role: "Real Estate Advisor", sales: "36 homes sold", image: homes[1].agentImage, bio: "A Los Angeles native and natural negotiator, Marcus helps buyers find the places that fit their lives—not just their wish lists." },
  { name: "Nina Patel", role: "Real Estate Advisor", sales: "29 homes sold", image: homes[3].agentImage, bio: "Nina makes every move feel manageable. Her clear advice and genuine care have earned her a loyal community of clients across Northeast LA." },
];

function Icon({ name, size = 18, fill = "none" }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill, stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const paths = {
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    bed: <><path d="M3 7v13M21 11v9M3 16h18M3 11h4a4 4 0 0 1 4 4v1M11 11h6a4 4 0 0 1 4 4v1" /></>,
    bath: <><path d="M4 12h16v3a5 5 0 0 1-5 5h-6a5 5 0 0 1-5-5v-3ZM6 12V5a2 2 0 0 1 4 0" /><path d="M4 20v1m16-1v1" /></>,
    area: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 4v4m6-4v4M4 9h4m-4 6h4m8-11v4m4 2h-4m4 6h-4m-5 4v-4" /></>,
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.8l-1.3 1.3a16 16 0 0 0 4.7 4.7l1.3-1.3a2 2 0 0 1 1.8-.6l2.8.5a2 2 0 0 1 1.7 2Z" />,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function money(amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

function PropertyCard({ home, onOpen, saved, onToggleSave }) {
  return (
    <article className="property-card">
      <button className="card-image-button" onClick={() => onOpen(home)} aria-label={`View ${home.title}`}>
        <img className="property-image" src={home.image} alt={`${home.title}, ${home.location}`} />
        <span className="property-label">{home.label}</span>
      </button>
      <button className={`save-button ${saved ? "is-saved" : ""}`} onClick={() => onToggleSave(home.id)} aria-label={saved ? "Remove from saved homes" : "Save home"}>
        <Icon name="heart" size={18} fill={saved ? "currentColor" : "none"} />
      </button>
      <button className="property-card-info" onClick={() => onOpen(home)}>
        <span className="card-price">{money(home.price)}</span>
        <span className="card-title">{home.title}</span>
        <span className="card-location"><Icon name="pin" size={14} />{home.location}</span>
        <span className="card-meta"><span>{home.beds} beds</span><i /><span>{home.baths} baths</span><i /><span>{home.area.toLocaleString()} sqft</span></span>
      </button>
    </article>
  );
}

function Header({ page, setPage, onAuth }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const go = (target) => { setPage(target); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand" onClick={() => go("home")} aria-label="Haven home"><span className="brand-mark">h.</span><span>haven<span className="brand-dot">.</span></span></button>
        <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Icon name={menuOpen ? "close" : "menu"} /></button>
        <nav className={`main-nav ${menuOpen ? "nav-open" : ""}`}>
          <button className={page === "listings" ? "nav-active" : ""} onClick={() => go("listings")}>Buy</button>
          <button onClick={() => go("listings")}>Rent</button>
          <button className={page === "agents" ? "nav-active" : ""} onClick={() => go("agents")}>Our agents</button>
          <button className={page === "contact" ? "nav-active" : ""} onClick={() => go("contact")}>Contact</button>
        </nav>
        <div className="header-actions"><button className="login-button" onClick={onAuth}>Log in</button><button className="button button-dark header-cta" onClick={onAuth}>Get in touch <Icon name="arrow" size={15} /></button></div>
      </div>
    </header>
  );
}

function SearchBar({ onSearch, initialValues = { location: "", type: "Any home", price: "Any price" } }) {
  const [location, setLocation] = useState(initialValues.location);
  const [type, setType] = useState(initialValues.type);
  const [price, setPrice] = useState(initialValues.price);
  const submit = (event) => { event.preventDefault(); onSearch({ location, type, price }); };
  return (
    <form className="search-bar" onSubmit={submit}>
      <label className="search-location"><span className="search-icon"><Icon name="pin" size={19} /></span><span className="search-field"><span className="field-label">LOCATION</span><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City, neighborhood, ZIP" /></span></label>
      <span className="search-divider" />
      <label className="search-select"><span className="field-label">PROPERTY TYPE</span><select value={type} onChange={(event) => setType(event.target.value)}><option>Any home</option><option>House</option><option>Condo</option><option>Townhouse</option></select></label>
      <span className="search-divider" />
      <label className="search-select price-select"><span className="field-label">PRICE RANGE</span><select value={price} onChange={(event) => setPrice(event.target.value)}><option>Any price</option><option>Under $1M</option><option>$1M – $1.5M</option><option>$1.5M+</option></select></label>
      <button className="button button-dark search-submit" type="submit" aria-label="Search homes"><Icon name="search" size={17} /><span>Search homes</span></button>
    </form>
  );
}

function SectionHeading({ eyebrow, title, description, action, onAction }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>{action && <button className="text-link" onClick={onAction}>{action}<Icon name="arrow" size={16} /></button>}</div>;
}

function HomePage({ onSearch, onOpen, saved, onToggleSave, goListings, goAgents }) {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow hero-eyebrow"><span /> A MORE PERSONAL WAY HOME</span>
          <h1>Find a place<br />that feels like <em>you.</em></h1>
          <p>Good homes are more than an address. Let’s find the one that feels like yours.</p>
          <div className="hero-proof"><div className="avatar-stack"><img src={agents[0].image} alt="" /><img src={agents[1].image} alt="" /><img src={agents[2].image} alt="" /></div><span><strong>Local people.</strong><br />Real help, every step.</span></div>
        </div>
        <div className="hero-image-wrap"><img className="hero-image" src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=2000&q=90" alt="Warm, light-filled contemporary living room" /><div className="hero-caption"><span>01 — 06</span><i /><span>A slower kind of Sunday</span></div></div>
        <div className="hero-note"><span className="note-line" /> MADE FOR THE WAY YOU LIVE</div>
      </section>
      <section className="search-section"><SearchBar onSearch={onSearch} /><div className="search-footnote"><span>Not sure where to start?</span><button onClick={goAgents}>Talk to a local expert <Icon name="arrow" size={14} /></button></div></section>
      <section className="featured-section content-wrap">
        <SectionHeading eyebrow="A FEW PLACES WE LOVE" title="Homes with a little more heart." description="Thoughtful spaces, good neighborhoods, and room to make it yours." action="See all homes" onAction={goListings} />
        <div className="property-grid">{homes.slice(0, 3).map((home) => <PropertyCard key={home.id} home={home} onOpen={onOpen} saved={saved.includes(home.id)} onToggleSave={onToggleSave} />)}</div>
      </section>
      <section className="values-section"><div className="values-image"><img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85" alt="A quiet, sunlit home interior" /><span className="image-note">A good day starts at home.</span></div><div className="values-copy"><span className="eyebrow">A LITTLE DIFFERENT, ON PURPOSE</span><h2>People first.<br />Property second.</h2><p>Buying or selling a home is a big, human thing. We bring thoughtful advice, a little less pressure, and people who genuinely care about where you land.</p><div className="value-stat"><strong>12<span>+</span></strong><span>years helping people find<br />their place in LA</span></div><button className="button button-outline" onClick={goAgents}>Get to know us <Icon name="arrow" size={16} /></button></div></section>
      <section className="cta-strip"><div><span className="eyebrow">YOUR NEXT CHAPTER</span><h2>It starts with a conversation.</h2></div><button className="button button-light" onClick={goAgents}>Meet your agent <Icon name="arrow" size={16} /></button></section>
    </>
  );
}

function ListingsPage({ filters, onSearch, onOpen, saved, onToggleSave }) {
  const [beds, setBeds] = useState("Any beds");
  const filtered = useMemo(() => homes.filter((home) => {
    const locationMatch = !filters.location || `${home.location} ${home.title}`.toLowerCase().includes(filters.location.toLowerCase());
    const typeMatch = filters.type === "Any home" || home.type === filters.type;
    const priceMatch = filters.price === "Any price" || (filters.price === "Under $1M" && home.price < 1000000) || (filters.price === "$1M – $1.5M" && home.price >= 1000000 && home.price <= 1500000) || (filters.price === "$1.5M+" && home.price > 1500000);
    const bedMatch = beds === "Any beds" || home.beds >= Number.parseInt(beds, 10);
    return locationMatch && typeMatch && priceMatch && bedMatch;
  }), [filters, beds]);
  return (
    <main className="page-shell content-wrap">
      <div className="page-intro"><span className="eyebrow">FIND YOUR PLACE</span><h1>Homes for the life<br />you want to live.</h1><p>Good spaces, good neighborhoods, and a little room to grow.</p></div>
      <div className="listing-controls"><SearchBar onSearch={onSearch} initialValues={filters} /><label className="beds-filter"><span>BEDS</span><select value={beds} onChange={(event) => setBeds(event.target.value)}><option>Any beds</option><option>2+ beds</option><option>3+ beds</option><option>4+ beds</option></select></label></div>
      <div className="results-row"><span><strong>{filtered.length}</strong> homes to explore</span><span className="results-note">A good place to start.</span></div>
      {filtered.length ? <div className="property-grid listing-grid">{filtered.map((home) => <PropertyCard key={home.id} home={home} onOpen={onOpen} saved={saved.includes(home.id)} onToggleSave={onToggleSave} />)}</div> : <div className="empty-results"><span className="empty-icon"><Icon name="search" size={24} /></span><h2>No homes found just yet.</h2><p>Try a different neighborhood or broaden your filters.</p><button className="button button-dark" onClick={() => { setBeds("Any beds"); onSearch({ location: "", type: "Any home", price: "Any price" }); }}>Clear filters</button></div>}
    </main>
  );
}

function DetailPage({ home, onBack, onAuth }) {
  const [sent, setSent] = useState(false);
  const agent = agents.find((item) => item.name === home.agent) || agents[0];
  return <main className="detail-page content-wrap"><button className="back-link" onClick={onBack}>← Back to homes</button><div className="detail-gallery"><img className="detail-main-image" src={home.image} alt={home.title} /><div className="detail-side-images"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85" alt="Interior detail" /><img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85" alt="Home exterior detail" /></div></div><div className="detail-layout"><div className="detail-main"><span className="property-label detail-label">{home.label}</span><div className="detail-title-row"><div><h1>{home.title}</h1><p className="card-location"><Icon name="pin" size={16} />{home.location}</p></div><strong className="detail-price">{money(home.price)}</strong></div><div className="detail-specs"><span><Icon name="bed" />{home.beds} bedrooms</span><span><Icon name="bath" />{home.baths} bathrooms</span><span><Icon name="area" />{home.area.toLocaleString()} sqft</span></div><div className="detail-description"><h2>A home with room to be yourself.</h2><p>{home.description}</p><p>Settle into a place that makes the everyday feel a little more special. Reach out to learn more or arrange a private tour—we’d love to show you around.</p></div><div className="detail-agent"><img src={agent.image} alt={agent.name} /><div><strong>{agent.name}</strong><span>Your local advisor</span></div><button className="text-link" onClick={onAuth}>Meet agent <Icon name="arrow" size={15} /></button></div></div><aside className="inquiry-card"><span className="eyebrow">TAKE A CLOSER LOOK</span><h2>Could this be the one?</h2><p>Ask a question or book a private tour with {agent.name.split(" ")[0]}.</p>{sent ? <div className="success-message">Thanks for reaching out. {agent.name.split(" ")[0]} will be in touch soon.</div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Your name<input required placeholder="Your name" /></label><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>A little note<textarea placeholder="I'm interested in this home..." rows="3" /></label><button className="button button-dark inquiry-submit" type="submit">Request a tour <Icon name="arrow" size={16} /></button></form>}<span className="inquiry-phone"><Icon name="phone" size={14} /> Prefer a call? (323) 555-0184</span></aside></div></main>;
}

function AgentsPage({ onAuth }) {
  return <main className="content-wrap page-shell"><div className="page-intro"><span className="eyebrow">GOOD PEOPLE, GOOD ADVICE</span><h1>In your corner,<br />from day one.</h1><p>Local knowledge, honest answers, and a real person to call.</p></div><div className="agent-grid">{agents.map((agent) => <article className="agent-card" key={agent.name}><img src={agent.image} alt={agent.name} /><div className="agent-card-body"><span className="eyebrow">{agent.sales}</span><h2>{agent.name}</h2><span className="agent-role">{agent.role}</span><p>{agent.bio}</p><button className="text-link" onClick={onAuth}>Say hello <Icon name="arrow" size={15} /></button></div></article>)}</div><div className="agent-callout"><div><span className="eyebrow">GOOD THINGS START HERE</span><h2>Tell us what home looks like to you.</h2></div><button className="button button-dark" onClick={onAuth}>Let’s talk <Icon name="arrow" size={16} /></button></div></main>;
}

function ContactPage({ onAuth }) {
  const [sent, setSent] = useState(false);
  return <main className="content-wrap page-shell contact-layout"><div className="contact-intro"><span className="eyebrow">WE’RE HERE FOR YOU</span><h1>Let’s talk<br />about home.</h1><p>Big plans, first questions, or just a feeling you’re ready for something new. We’d love to hear from you.</p><div className="contact-detail"><span className="contact-icon"><Icon name="mail" /></span><div><span>DROP US A NOTE</span><strong>hello@havenhomes.com</strong></div></div><div className="contact-detail"><span className="contact-icon"><Icon name="phone" /></span><div><span>GIVE US A CALL</span><strong>(323) 555-0184</strong></div></div><div className="contact-hours">Los Angeles, CA<br />Monday–Saturday, 9am–6pm</div></div><div className="contact-form-card">{sent ? <div className="contact-success"><span className="success-check">✓</span><h2>Thanks for reaching out.</h2><p>A real person from our team will be in touch shortly.</p><button className="text-link" onClick={() => setSent(false)}>Send another message <Icon name="arrow" size={15} /></button></div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><span className="eyebrow">A GOOD PLACE TO START</span><h2>What’s on your mind?</h2><div className="form-row"><label>First name<input required placeholder="Your first name" /></label><label>Last name<input required placeholder="Your last name" /></label></div><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>I’m looking to<select defaultValue=""><option value="" disabled>Choose one</option><option>Buy a home</option><option>Sell a home</option><option>Rent a home</option><option>Just exploring</option></select></label><label>Message<textarea required rows="4" placeholder="Tell us a little about what you’re looking for..." /></label><button className="button button-dark" type="submit">Send a message <Icon name="arrow" size={16} /></button><span className="form-privacy">We’ll only use your info to get back to you. Promise.</span></form>}</div></main>;
}

function AuthModal({ onClose }) {
  const [mode, setMode] = useState("login");
  const [done, setDone] = useState(false);
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title"><button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" /></button>{done ? <div className="contact-success"><span className="success-check">✓</span><h2>You’re on your way.</h2><p>Thanks for connecting with Haven. We’ll be in touch soon.</p><button className="button button-dark" onClick={onClose}>Done</button></div> : <><span className="brand auth-brand"><span className="brand-mark">h.</span><span>haven<span className="brand-dot">.</span></span></span><span className="eyebrow">{mode === "login" ? "WELCOME BACK" : "A GOOD PLACE TO START"}</span><h2 id="auth-title">{mode === "login" ? "Come on in." : "Let’s find your place."}</h2><p>{mode === "login" ? "Log in to pick up where you left off." : "Create an account and make yourself at home."}</p><form onSubmit={(event) => { event.preventDefault(); setDone(true); }}><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>Password<input required type="password" minLength="6" placeholder="At least 6 characters" /></label><button className="button button-dark auth-submit" type="submit">{mode === "login" ? "Log in" : "Create account"} <Icon name="arrow" size={16} /></button></form><div className="auth-switch">{mode === "login" ? "New to Haven?" : "Already have an account?"}<button onClick={() => setMode(mode === "login" ? "signup" : "login")}>{mode === "login" ? " Create an account" : " Log in"}</button></div></>}</section></div>;
}

function Footer({ setPage }) {
  return <footer className="site-footer"><div className="footer-main"><div className="footer-brand-col"><button className="brand footer-brand" onClick={() => setPage("home")}><span className="brand-mark">h.</span><span>haven<span className="brand-dot">.</span></span></button><p>Find a place that feels like you.</p></div><div className="footer-column"><span>EXPLORE</span><button onClick={() => setPage("listings")}>Find a home</button><button onClick={() => setPage("agents")}>Our agents</button><button onClick={() => setPage("contact")}>Get in touch</button></div><div className="footer-column"><span>COME SAY HELLO</span><p>Los Angeles, CA</p><p>hello@havenhomes.com</p><p>(323) 555-0184</p></div><div className="footer-note">A little more home.<br /><em>A little less house hunting.</em></div></div><div className="footer-bottom"><span>© 2025 Haven Real Estate. Made for finding home.</span><span>Equal Housing Opportunity</span></div></footer>;
}

export default function App() {
  const [page, setPage] = useState("home");
  const [filters, setFilters] = useState({ location: "", type: "Any home", price: "Any price" });
  const [selectedHome, setSelectedHome] = useState(homes[0]);
  const [saved, setSaved] = useState([]);
  const [authOpen, setAuthOpen] = useState(false);
  const showListings = (nextFilters) => { setFilters(nextFilters); setPage("listings"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const toggleSaved = (id) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const openHome = (home) => { setSelectedHome(home); setPage("detail"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return <><Header page={page} setPage={setPage} onAuth={() => setAuthOpen(true)} />{page === "home" && <HomePage onSearch={showListings} onOpen={openHome} saved={saved} onToggleSave={toggleSaved} goListings={() => showListings(filters)} goAgents={() => setPage("agents")} />}{page === "listings" && <ListingsPage filters={filters} onSearch={showListings} onOpen={openHome} saved={saved} onToggleSave={toggleSaved} />}{page === "detail" && <DetailPage home={selectedHome} onBack={() => setPage("listings")} onAuth={() => setAuthOpen(true)} />}{page === "agents" && <AgentsPage onAuth={() => setAuthOpen(true)} />}{page === "contact" && <ContactPage onAuth={() => setAuthOpen(true)} />}<Footer setPage={setPage} />{authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}</>;
}
