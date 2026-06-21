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
        h("span", { class: "page-title-main" }, "NOTES"),
        h("span", { class: "page-title-subtitle" }, "by Lorenzo Gravina"),
      ),
    )

  PageTitle.css = `
.page-title {
  margin: 0;
  font-family: "Eurostile Next Pro", "Eurostile Next Pro Ext Light", var(--titleFont);
  font-style: normal;
  color: var(--dark);
  line-height: 82.522%;
}

.page-title a {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  color: inherit;
  letter-spacing: 0;
  text-decoration: none;
}

.page-title-main {
  font-size: 36px;
  font-weight: 300;
  line-height: 82.522%;
}

.page-title-subtitle {
  display: block;
  font-size: 16px;
  font-weight: 250;
  line-height: 82.522%;
  margin-top: 0;
  padding-left: 2.5px;
}

@media all and (max-width: 800px) {
  .page-title-main {
    font-size: 28px;
  }

  .page-title-subtitle {
    font-size: 14px;
  }
}
`
  return PageTitle
}
