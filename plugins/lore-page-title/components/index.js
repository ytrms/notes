import { h } from "preact"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

function pathToRoot(slug) {
  if (!slug || slug === "index") return "."
  const depth = slug.split("/").length - 1
  return depth <= 0 ? "." : Array(depth).fill("..").join("/")
}

export function LorePageTitle() {
  const PageTitle = ({ cfg, displayClass, fileData }) =>
    h(
      "h2",
      { class: classNames(displayClass, "page-title") },
      h(
        "a",
        {
          href: pathToRoot(fileData.slug),
          "aria-label": cfg.pageTitle,
          title: cfg.pageTitle,
        },
        h("span", { class: "page-title-line" }, "Lorenzo"),
        h("span", { class: "page-title-line" }, "Gravina"),
        h("span", { class: "page-title-line page-title-notes" }, "Notes"),
      ),
    )

  PageTitle.css = `
.page-title {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  color: var(--dark);
  line-height: 0.98;
}

.page-title a {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: inherit;
  letter-spacing: normal;
  text-decoration: none;
}

.page-title-line {
  display: block;
  font-size: clamp(2.85rem, 4.2vw, 4rem);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.07em;
}

.page-title-notes {
  color: var(--gray);
}

@media all and (max-width: 800px) {
  .page-title-line {
    font-size: 2rem;
    line-height: 0.9;
  }
}
`
  return PageTitle
}
