import fs from "fs"
import path from "path"

import type { NextRequest } from "next/server"

const allowedCategories = new Set(["certificates", "dashboards", "personal", "designs", "resume", "components"])

function getMimeType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase()
  switch (ext) {
    case ".png":
      return "image/png"
    case ".jpg":
    case ".jpeg":
      return "image/jpeg"
    case ".gif":
      return "image/gif"
    case ".webp":
      return "image/webp"
    case ".svg":
      return "image/svg+xml"
    case ".pdf":
      return "application/pdf"
    case ".mp4":
      return "video/mp4"
    case ".webm":
      return "video/webm"
    case ".docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    default:
      return "application/octet-stream"
  }
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ category: string; path: string[] }> },
) {
  const params = await context.params
  const { category, path: pathParts } = params

  if (!allowedCategories.has(category)) {
    return new Response("Invalid category", { status: 400 })
  }

  if (category === "resume") {
    const resumeFile = "Varshitha_Sirigiri_Resume.docx"
    const requested = pathParts?.[0] ?? resumeFile
    if (requested !== resumeFile) {
      return new Response("Invalid resume file", { status: 404 })
    }
    const filePath = path.join(process.cwd(), resumeFile)
    if (!fs.existsSync(filePath)) return new Response("Not found", { status: 404 })

    const mimeType = getMimeType(filePath)
    const stream = fs.createReadStream(filePath)
    // Node ReadStream is accepted by Next.js response body
    return new Response(stream as unknown as BodyInit, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Disposition": `attachment; filename="${resumeFile}"`,
      },
    })
  }

  const baseDir = path.join(process.cwd(), category)
  const unsafeJoin = path.join(baseDir, ...(pathParts ?? []))
  const resolved = path.resolve(unsafeJoin)
  if (!resolved.startsWith(path.resolve(baseDir))) {
    return new Response("Invalid path", { status: 400 })
  }

  if (!fs.existsSync(resolved)) {
    return new Response("Not found", { status: 404 })
  }

  const mimeType = getMimeType(resolved)
  const stream = fs.createReadStream(resolved)
  return new Response(stream as unknown as BodyInit, {
    headers: {
      "Content-Type": mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
