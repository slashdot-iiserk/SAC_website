/**
 * components/navbar.js — renders the sidebar navigation into the existing
 * <nav id="navbar"> mount on every page, plus the mobile furniture that
 * goes with it.
 *
 * Desktop (>=1024px): the sidebar is the page's left margin/index.
 * Mobile  (<1024px):  the sidebar is an off-canvas drawer, opened from a
 *                     sticky masthead strip that also names the section
 *                     you're on — a bare floating button left readers with
 *                     no sense of place.
 *
 * Structure:
 *   <div class="mobile-topbar">…wordmark + section…</div>   (injected, mobile only)
 *   <nav id="navbar" class="sidebar">
 *     <div class="sidebar__brand">The SAC <em>Chronicle</em>
 *       <p class="sidebar__tagline">IISER Kolkata</p>
 *     </div>
 *     <div class="sidebar__nav"> …links… </div>
 *     <div class="sidebar__foot">Vol. 01 · Empowering Voices</div>
 *   </nav>
 */
import { el, clear, pageUrl } from "../utils/dom.js";
import { NAV_ITEMS } from "../config.js";

/** Hamburger that can morph into a close cross — three spans the CSS
 *  animates, rather than a static <svg> baked into 38 HTML files. */
function renderToggleIcon(toggle) {
  if (!toggle || toggle.querySelector(".navbar-corner__bars")) return;
  clear(toggle);
  toggle.appendChild(
    el(
      "span",
      { class: "navbar-corner__bars", "aria-hidden": "true" },
      el("span", {}),
      el("span", {}),
      el("span", {})
    )
  );
}

/** Sticky masthead strip for phones: wordmark on the left (clear of the
 *  toggle), current section on the right. */
function renderMobileTopbar(activePage) {
  let bar = document.querySelector(".mobile-topbar");
  if (!bar) {
    bar = el("div", { class: "mobile-topbar", "aria-hidden": "true" });
    document.body.appendChild(bar);
  }
  clear(bar);
  // Only a page that actually carries the strip reserves height for it —
  // a standalone page (404) must not gain a phantom gap.
  document.body.classList.add("has-topbar");

  const section = NAV_ITEMS.find((i) => i.id === activePage)?.label || "";
  bar.append(
    el("span", { class: "mobile-topbar__brand" }, "The SAC ", el("em", {}, "Chronicle")),
    el("span", { class: "mobile-topbar__section" }, section)
  );
  return bar;
}

export function renderNavbar(activePage) {
  const mount = document.getElementById("navbar");
  if (!mount) return;

  clear(mount);
  mount.classList.add("sidebar");
  mount.setAttribute("aria-label", "Primary");

  // Brand
  const brand = el(
    "div",
    { class: "sidebar__brand" },
    "The SAC ",
    el("em", {}, "Chronicle"),
    el("p", { class: "sidebar__tagline" }, "IISER Kolkata · Vol. 01")
  );

  // Links
  const nav = el("div", { class: "sidebar__nav" });
  for (const item of NAV_ITEMS) {
    const link = el(
      "a",
      {
        class: "sidebar__link" + (item.id === activePage ? " is-active" : ""),
        href: pageUrl(item.href),
        "aria-label": item.label,
      },
      el("span", { class: "sidebar__link-label" }, item.label)
    );
    if (item.id === activePage) link.setAttribute("aria-current", "page");
    nav.appendChild(link);
  }

  // Reader controls, reachable without hunting for the floating cog.
  // Mobile-only: on desktop the cog is never far from the pointer.
  const settingsBtn = el(
    "button",
    {
      class: "sidebar__action",
      type: "button",
      "data-open-settings": "",
      "aria-label": "Open reader settings",
    },
    el("span", { class: "sidebar__action-icon", "aria-hidden": "true" }, "⚙"),
    el("span", {}, "Reader settings")
  );
  // Get out of the way first — the settings sheet slides in from the same
  // side of the screen. settings.js picks the click up on the document.
  settingsBtn.addEventListener("click", () => {
    if (document.body.classList.contains("sidebar-open")) {
      document.getElementById("navbarCorner")?.click();
    }
  });

  // Footer of the rail
  const foot = el(
    "div",
    { class: "sidebar__foot" },
    settingsBtn,
    el("p", { class: "sidebar__foot-line" }, "Student Activity Council · Empowering Voices")
  );

  mount.append(brand, nav, foot);

  const toggle = document.getElementById("navbarCorner");
  renderToggleIcon(toggle);
  if (toggle) {
    toggle.setAttribute("aria-label", "Collapse navigation");
    toggle.setAttribute("title", "Collapse navigation");
  }

  renderMobileTopbar(activePage);

  // Scrim for mobile (added once)
  if (!document.querySelector(".sidebar-scrim")) {
    document.body.appendChild(el("div", { class: "sidebar-scrim", "aria-hidden": "true" }));
  }
}
