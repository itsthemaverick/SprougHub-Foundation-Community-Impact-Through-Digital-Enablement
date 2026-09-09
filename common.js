// SprouHub shared header/footer + small behaviors
(function(){
  const LEAF_MARK = `
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 4C11 4 5 12 5 21c0 8 6 15 15 15 9-9 9-24 0-32Z" fill="#4C8B5B"/>
      <path d="M20 4c9 8 9 23 0 32" stroke="#EAF3E8" stroke-width="1.6" stroke-linecap="round"/>
    </svg>`;

  const NAV_ITEMS = [
    ["index.html","Home"],
    ["our-work.html","Our Work"],
    ["impact.html","Impact"],
    ["stories.html","Stories"],
    ["volunteers.html","Volunteers"],
    ["about.html","About"],
  ];

  function currentFile(){
    const p = location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  function renderHeader(){
    const el = document.getElementById("site-header");
    if(!el) return;
    const cur = currentFile();
    const links = NAV_ITEMS.map(([href,label]) =>
      `<li><a href="${href}" ${href===cur ? 'class="active" aria-current="page"' : ''}>${label}</a></li>`
    ).join("");
    el.innerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="nav">
        <a class="brand" href="index.html">${LEAF_MARK}SprouHub</a>
        <ul class="nav-links" id="navLinks">
          ${links}
        </ul>
        <div class="nav-actions">
          <a href="donate.html" class="btn btn-primary btn-sm">Give Hope</a>
          <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>`;
    const toggle = document.getElementById("navToggle");
    const links_ = document.getElementById("navLinks");
    toggle.addEventListener("click", () => {
      const open = links_.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function renderFooter(){
    const el = document.getElementById("site-footer");
    if(!el) return;
    el.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="brand" href="index.html" style="color:#fff;margin-bottom:14px;display:inline-flex;">${LEAF_MARK}SprouHub</a>
            <p>Small acts. Big roots. A better tomorrow. A people-powered community working toward lasting local change.</p>
            <div class="newsletter-row">
              <label for="footer-email" class="sr-only" style="position:absolute;left:-9999px;">Email address</label>
              <input id="footer-email" type="email" placeholder="Your email" />
              <button class="btn btn-primary btn-sm" type="button">Subscribe</button>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="our-work.html">Our Work</a></li>
              <li><a href="impact.html">Impact</a></li>
              <li><a href="stories.html">Stories</a></li>
              <li><a href="volunteers.html">Volunteers</a></li>
              <li><a href="about.html">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4>Get Involved</h4>
            <ul>
              <li><a href="donate.html">Donate</a></li>
              <li><a href="volunteers.html#signup">Volunteer</a></li>
              <li><a href="about.html#transparency">Transparency</a></li>
              <li><a href="about.html#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal &amp; Info</h4>
            <ul>
              <li><a href="#">Privacy Policy <span class="placeholder-tag">edit</span></a></li>
              <li><a href="#">Terms of Use <span class="placeholder-tag">edit</span></a></li>
              <li><a href="#">NGO Registration No. <span class="placeholder-tag">edit</span></a></li>
              <li><a href="#">Annual Report (PDF) <span class="placeholder-tag">edit</span></a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>Let's grow something good together. © <span id="year"></span> SprouHub.</span>
          <span>Registered NGO — details <span class="placeholder-tag">editable placeholder</span></span>
        </div>
      </div>`;
    document.getElementById("year").textContent = new Date().getFullYear();
  }

  function animateCounters(){
    const nodes = document.querySelectorAll("[data-count]");
    if(!nodes.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = (node) => {
      const target = parseFloat(node.getAttribute("data-count"));
      const suffix = node.getAttribute("data-suffix") || "";
      if(reduce){ node.textContent = target.toLocaleString() + suffix; return; }
      let start = null;
      const dur = 1200;
      function step(ts){
        if(start===null) start = ts;
        const p = Math.min((ts-start)/dur, 1);
        const eased = 1 - Math.pow(1-p, 3);
        node.textContent = Math.round(target*eased).toLocaleString() + suffix;
        if(p<1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ run(e.target); io.unobserve(e.target); } });
    }, {threshold:0.4});
    nodes.forEach(n=>io.observe(n));
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    animateCounters();
  });
})();
