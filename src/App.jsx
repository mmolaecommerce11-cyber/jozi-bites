import { useEffect, useRef, useState } from 'react'

// ── CHANGE THIS TO YOUR REAL WHATSAPP NUMBER ──
const WA_NUMBER = '27000000000'

const waLink = (msg) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

const openWA = (msg) =>
  window.open(waLink(msg), '_blank')

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

// ── WHATSAPP ICON SVG ──
const WAIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

// ── MENU DATA ──
const MENU = [
  {
    name: 'Braai Platter',
    price: 'R 189',
    desc: 'Juicy boerewors, peri-peri chicken and lamb chops straight off the braai with chakalaka.',
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80&auto=format&fit=crop',
    badge: '🔥 Popular',
    order: 'Hi Jozi Bites! I would like to order a Braai Platter please.',
  },
  {
    name: 'Jozi Smash Burger',
    price: 'R 129',
    desc: 'Double smash patty, secret sauce, caramelised onions, pepper jack cheese and crispy fries.',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&auto=format&fit=crop',
    badge: '⭐ Signature',
    order: 'Hi Jozi Bites! I would like to order a Jozi Smash Burger please.',
  },
  {
    name: 'Pap & Oxtail Stew',
    price: 'R 149',
    desc: 'Slow-cooked oxtail stew with creamy pap, spinach and a rich tomato-onion gravy.',
    img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80&auto=format&fit=crop',
    badge: null,
    order: 'Hi Jozi Bites! I would like to order Pap & Oxtail Stew please.',
  },
  {
    name: 'Rainbow Harvest Bowl',
    price: 'R 109',
    desc: 'Grilled chicken, roasted butternut, quinoa, avocado and a tangy lemon-tahini dressing.',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80&auto=format&fit=crop',
    badge: null,
    order: 'Hi Jozi Bites! I would like to order a Rainbow Harvest Bowl please.',
  },
  {
    name: 'Durban Bunny Chow',
    price: 'R 99',
    desc: 'Half a loaf filled with fragrant Durban curry — choose chicken, lamb or veg.',
    img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80&auto=format&fit=crop',
    badge: '🌶️ Spicy',
    order: 'Hi Jozi Bites! I would like to order a Bunny Chow please.',
  },
  {
    name: 'Koeksister Pancake Stack',
    price: 'R 79',
    desc: 'Fluffy pancakes drizzled with golden syrup, coconut and crushed koeksisters on top.',
    img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80&auto=format&fit=crop',
    badge: '🍯 Sweet',
    order: 'Hi Jozi Bites! I would like to order the Koeksister Pancake Stack please.',
  },
]

// ── FADE-UP HOOK ──
function useFadeUp() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

// ── NAVBAR ──
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <div className="nav-logo">Jozi<span>Bites</span></div>
        <ul className="nav-links">
          {['menu','why','about','contact'].map(id => (
            <li key={id}>
              <button onClick={() => scrollTo(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <button className="btn btn-wa" style={{ fontSize: '0.85rem', padding: '0.6em 1.3em' }}
          onClick={() => openWA('Hi Jozi Bites! I would like to place an order!')}>
          🟢 Order Now
        </button>
      </div>
    </nav>
  )
}

// ── HERO ──
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80&auto=format&fit=crop" alt="Delicious food" />
      </div>
      <div className="hero-overlay" />
      <div className="container hero-content">
        <div className="hero-badge">🍴 Now Delivering in Joburg</div>
        <h1 className="hero-title">
          Delicious meals<br />delivered <em>fast</em><br />in Johannesburg
        </h1>
        <p className="hero-sub">
          Order your favourite meals quickly and easily — straight to your door, hot and fresh.
        </p>
        <div className="hero-btns">
          <button className="btn btn-wa"
            onClick={() => openWA('Hi Jozi Bites! I would like to place an order!')}>
            <WAIcon /> Order on WhatsApp
          </button>
          <button className="btn btn-outline" onClick={() => scrollTo('menu')}>
            View Menu ↓
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat"><strong>30<span style={{fontSize:'1rem'}}>min</span></strong><span>Avg Delivery</span></div>
          <div className="stat"><strong>4.9★</strong><span>Customer Rating</span></div>
          <div className="stat"><strong>500+</strong><span>Happy Orders</span></div>
        </div>
      </div>
      <button className="hero-scroll" onClick={() => scrollTo('menu')}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
        Scroll
      </button>
    </section>
  )
}

// ── MENU CARD ──
function MenuCard({ item, index }) {
  const ref = useFadeUp()
  return (
    <div className="menu-card fade-up" ref={ref} style={{ transitionDelay: `${index * 80}ms` }}>
      <div className="menu-img">
        <img src={item.img} alt={item.name} loading="lazy" />
        {item.badge && <span className="menu-badge">{item.badge}</span>}
      </div>
      <div className="menu-body">
        <div className="menu-name">{item.name}</div>
        <p className="menu-desc">{item.desc}</p>
        <div className="menu-footer">
          <span className="menu-price">{item.price}</span>
          <button className="menu-order" onClick={() => openWA(item.order)}>
            Order →
          </button>
        </div>
      </div>
    </div>
  )
}

// ── MENU SECTION ──
function MenuSection() {
  const ref = useFadeUp()
  return (
    <section className="menu-section" id="menu">
      <div className="container">
        <div className="menu-header fade-up" ref={ref}>
          <div>
            <span className="tag">Our Menu</span>
            <h2 className="section-title">What we're<br />cooking today</h2>
          </div>
          <button className="btn btn-primary"
            onClick={() => openWA('Hi Jozi Bites! Can I see your full menu please?')}>
            Full Menu on WhatsApp →
          </button>
        </div>
        <div className="menu-grid">
          {MENU.map((item, i) => <MenuCard key={item.name} item={item} index={i} />)}
        </div>
      </div>
    </section>
  )
}

// ── WHY US ──
const WHY = [
  { icon: '⚡', title: 'Lightning Fast Delivery', text: 'We average 30 minutes or less to your door anywhere in Joburg. Hot food, every time — that\'s our promise.' },
  { icon: '🌿', title: 'Fresh Local Ingredients', text: 'We source from local Joburg markets daily. No frozen shortcuts — just real, fresh, quality ingredients.' },
  { icon: '💬', title: 'Easy WhatsApp Ordering', text: 'No app to download, no account to create. Just message us on WhatsApp and your order is on its way.' },
  { icon: '❤️', title: 'Made with Ubuntu', text: 'Family-run and community-driven. Every meal is cooked with love, passion, and a true Jozi spirit.' },
]

function WhySection() {
  const titleRef = useFadeUp()
  return (
    <section className="why-section" id="why">
      <div className="container">
        <div className="fade-up" ref={titleRef}>
          <span className="tag">Why Jozi Bites</span>
          <h2 className="section-title">Joburg's most loved<br />food delivery</h2>
        </div>
        <div className="why-grid">
          {WHY.map((w, i) => {
            const ref = useFadeUp()
            return (
              <div className="why-card fade-up" ref={ref} key={w.title} style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="why-icon">{w.icon}</div>
                <div className="why-title">{w.title}</div>
                <p className="why-text">{w.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── ABOUT ──
function AboutSection() {
  const imgRef = useFadeUp()
  const textRef = useFadeUp()
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="fade-up" ref={imgRef}>
            <div className="about-img-wrap">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop" alt="Our kitchen" loading="lazy" />
            </div>
          </div>
          <div className="about-text fade-up" ref={textRef}>
            <span className="tag">Our Story</span>
            <h2 className="section-title">Born in Jozi,<br />made for Jozi</h2>
            <p>"Jozi Bites started as a simple dream: to bring the warmth of a home-cooked meal to every corner of Johannesburg."</p>
            <p>What began in a small kitchen in Soweto has grown into one of Jozi's most-loved food delivery spots. We blend the rich culinary traditions of South Africa — from pap and stew to bunny chow and braai — with modern, fresh flavours that excite every palate.</p>
            <p>We believe food is more than just fuel. It's culture, it's community, it's Ubuntu. And every plate we send out carries that belief.</p>
            <div className="about-sig">— The Jozi Bites Family</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── CONTACT ──
function ContactSection() {
  const ref = useFadeUp()
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="fade-up" ref={ref}>
          <span className="tag">Get in Touch</span>
          <h2 className="section-title">Find us & order today</h2>
        </div>
        <div className="contact-grid">
          {/* Info */}
          <div className="contact-card fade-up" ref={useFadeUp()}>
            <h3>📍 Our Details</h3>
            {[
              { icon: '📞', label: 'Phone', val: '+27 (0)00 000 0000' },
              { icon: '📍', label: 'Address', val: '123 Vilakazi Street, Orlando West\nSoweto, Johannesburg, 1804' },
              { icon: '📧', label: 'Email', val: 'hello@jozibites.co.za' },
            ].map(r => (
              <div className="contact-row" key={r.label}>
                <div className="contact-icon">{r.icon}</div>
                <div>
                  <div className="contact-label">{r.label}</div>
                  <div className="contact-val" style={{ whiteSpace: 'pre-line' }}>{r.val}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Hours */}
          <div className="contact-card fade-up" ref={useFadeUp()}>
            <h3>🕐 Opening Hours</h3>
            {[
              ['Monday – Friday', '10:00 – 21:00'],
              ['Saturday', '09:00 – 22:00'],
              ['Sunday', '10:00 – 20:00'],
              ['Public Holidays', '11:00 – 19:00'],
            ].map(([day, hrs]) => (
              <div className="hours-row" key={day}>
                <strong>{day}</strong><span>{hrs}</span>
              </div>
            ))}
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(37,211,102,0.1)', borderRadius: '12px', border: '1px solid rgba(37,211,102,0.2)', fontSize: '0.88rem', color: '#1C8A46', fontWeight: 500 }}>
              ✅ We're open now — order in 60 seconds on WhatsApp!
            </div>
          </div>
          {/* WA Block */}
          <div className="wa-block fade-up" ref={useFadeUp()}>
            <h3>💬 Easiest Way to Order</h3>
            <p>Skip the queue. No app. No fuss. Just message us and we'll take care of the rest.</p>
            <div className="wa-number">+27 (0)00 000 0000</div>
            <button className="btn btn-wa" style={{ fontSize: '1.05rem', padding: '1em 2.2em' }}
              onClick={() => openWA('Hi Jozi Bites! I would like to place an order!')}>
              <WAIcon /> Chat with Us on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── CTA ──
function CTASection() {
  return (
    <section className="cta-section" id="cta">
      <div className="container">
        <h2 className="cta-title">Hungry? Let's fix that<br />right now. 🍽️</h2>
        <p className="cta-sub">Join hundreds of happy customers ordering fresh, hot meals across Johannesburg.</p>
        <div className="cta-btns">
          <button className="btn btn-wa-white"
            onClick={() => openWA('Hi Jozi Bites! I would like to place an order!')}>
            💬 Order on WhatsApp Now
          </button>
          <button className="btn btn-ghost" onClick={() => scrollTo('menu')}>
            Browse the Menu
          </button>
        </div>
      </div>
    </section>
  )
}

// ── FOOTER ──
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo">Jozi<span>Bites</span></div>
        <p>123 Vilakazi Street, Soweto, Johannesburg · hello@jozibites.co.za</p>
        <p>© 2025 Jozi Bites. Made with ❤️ in Johannesburg, South Africa.</p>
      </div>
    </footer>
  )
}

// ── APP ──
export default function App() {
  return (
    <>
      {/* Floating WhatsApp Button */}
      <button className="wa-float" aria-label="Order on WhatsApp"
        onClick={() => openWA('Hi Jozi Bites! I would like to place an order!')}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>

      <Navbar />
      <Hero />
      <MenuSection />
      <WhySection />
      <AboutSection />
      <ContactSection />
      <CTASection />
      <Footer />
    </>
  )
}