import fs from "node:fs"
import path from "node:path"

import { MyselfDeckEnhancer } from "@/components/myself-deck-enhancer"

export const runtime = "nodejs"

function getPortfolioHtml(): string {
  const v3Path = path.join(process.cwd(), "app", "varshitha_portfolio_v3_full.html")
  const v2Path = path.join(process.cwd(), "app", "varshitha_portfolio_v2.html")

  if (fs.existsSync(v3Path)) return fs.readFileSync(v3Path, "utf8")
  return fs.readFileSync(v2Path, "utf8")
}

export default function Page() {
  let html = ""

  try {
    html = getPortfolioHtml()
  } catch {
    html =
      '<div style="padding:24px;font-family:system-ui,sans-serif">Missing <code>app/varshitha_portfolio_v2.html</code>.</div>'
  }

  return (
    <>
      <main dangerouslySetInnerHTML={{ __html: html }} />
      <MyselfDeckEnhancer />
    </>
  )
}
