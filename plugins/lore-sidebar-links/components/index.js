import { h } from "preact"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function LoreSidebarLinks(opts = {}) {
  const SidebarLinks = ({ displayClass }) => {
    const links = opts.links ?? {}

    return h(
      "nav",
      { class: classNames(displayClass, "sidebar-links") },
      h(
        "ul",
        null,
        ...Object.entries(links).map(([text, link]) => h("li", null, h("a", { href: link }, text))),
      ),
    )
  }

  SidebarLinks.css = `
.sidebar-links {
  margin-top: auto;
  padding-top: 1rem;
}

.sidebar-links ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.sidebar-links a {
  color: var(--secondary);
  font-family: "Univers Bold";
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4rem;
}

.sidebar-links a:hover {
  color: var(--tertiary);
}

@media all and (max-width: 800px) {
  .sidebar-links {
    display: none;
  }

  .sidebar.left:has(.explorer:not(.collapsed)) > .sidebar-links {
    display: block;
    position: fixed;
    z-index: 102;
    left: 1.75rem;
    right: 1.75rem;
    bottom: calc(2rem + env(safe-area-inset-bottom));
    margin-top: 0;
    border-top: 1px solid var(--lightgray);
  }
}
`
  return SidebarLinks
}
