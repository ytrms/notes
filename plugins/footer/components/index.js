import { h } from "preact"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

function isFalseValue(value) {
  return value === false || value === "false"
}

function formatDate(date, locale = "en-US") {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

function getUpdatedDate(fileData) {
  return fileData.dates?.modified ?? fileData.dates?.created ?? fileData.dates?.published
}

export function Footer() {
  const PageUpdatedFooter = ({ cfg, displayClass, fileData }) => {
    if (isFalseValue(fileData.frontmatter?.showPageUpdated)) {
      return null
    }

    const date = getUpdatedDate(fileData)

    return h(
      "footer",
      { class: classNames(displayClass) },
      h(
        "div",
        { class: "footer-text" },
        date
          ? h(
              "p",
              { "show-comma": "false", class: "content-meta" },
              h("span", null, "Page updated "),
              h("time", { datetime: new Date(date).toISOString() }, formatDate(date, cfg.locale)),
            )
          : null,
      ),
    )
  }

  PageUpdatedFooter.css = `
footer {
  text-align: left;
  margin-bottom: 4rem;
}

footer .footer-text {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  color: var(--gray);
}

footer .footer-text p {
  margin: 0;
  color: inherit;
}

footer ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 0.5rem;
}
`
  return PageUpdatedFooter
}
