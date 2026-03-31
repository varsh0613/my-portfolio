import fs from "fs"
import path from "path"

export interface Dashboard {
  title: string
  desc: string
  tool: "Power BI" | "React" | "Other"
  thumbFileName: string
  fileName: string
}

/**
 * Dynamically load all dashboards from the /dashboards folder.
 * This function reads all files and creates dashboard entries automatically.
 */
export async function getDashboards(): Promise<Dashboard[]> {
  const dashboardsDir = path.join(process.cwd(), "dashboards")

  if (!fs.existsSync(dashboardsDir)) {
    return []
  }

  const files = fs.readdirSync(dashboardsDir)
  const dashboards: Dashboard[] = []

  for (const file of files) {
    const filePath = path.join(dashboardsDir, file)
    const stat = fs.statSync(filePath)

    // Skip directories
    if (stat.isDirectory()) continue

    // Determine tool based on file extension or content
    let tool: "Power BI" | "React" | "Other" = "Other"
    const ext = path.extname(file).toLowerCase()

    if ([".pdf", ".png", ".jpg", ".jpeg"].includes(ext)) {
      tool = "Power BI" // Most static visualizations are Power BI
    } else if ([".mp4", ".webm", ".mov"].includes(ext)) {
      tool = "React" // Videos are likely screen recordings of web apps
    }

    // Generate a human-readable title from the filename
    const title = file
      .replace(/\.[^/.]+$/, "") // Remove extension
      .replace(/[-_]/g, " ") // Replace dashes/underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter of each word

    // Sanitize description based on filename
    const desc = generateDescription(file)

    const dashboard: Dashboard = {
      title,
      desc,
      tool,
      thumbFileName: file,
      fileName: file,
    }

    dashboards.push(dashboard)
  }

  // Sort dashboards by name for consistency
  dashboards.sort((a, b) => a.title.localeCompare(b.title))

  return dashboards
}

/**
 * Generate a description based on the filename.
 * Can be customized further as needed.
 */
function generateDescription(fileName: string): string {
  const descriptions: { [key: string]: string } = {
    "patient demographics.png":
      "50.79K patients - age, gender, BMI, cancer type",
    "treatment and dosage.png":
      "Chemotherapy regimens - toxicity - effectiveness",
    "tumor analysis.png": "Tumor impact scores - mutation interaction",
    "survival and outcome.png": "Max 119 months - by gender, regimen, tumor",
    "credit risk.png": "Default rates - credit utilisation - risk profiles",
    "air pollution.png": "Air Quality Index across Indian cities",
    "gemma db.mp4":
      "108,539 records - Marin County emergency dispatch (screen recording)",
    "cybersecurity db.mp4":
      "Operational risk signals and analytics (screen recording)",
    "flipkart db.pdf": "Dashboard PDF overview (example data story)",
    "blinkit grocery db_page-0001.jpg":
      "Grocery platform analytics and insights",
    "cyber fraud db_page-0001.jpg": "Fraud detection patterns and analysis",
    "finance setiment analysis_page-0001.jpg":
      "Sentiment analysis in financial markets",
    "survival and outcome.png": "Patient survival metrics and outcomes",
    "treatment and dosage.png": "Treatment regimens and dosage analysis",
  }

  // Return custom description if it exists
  if (descriptions[fileName]) {
    return descriptions[fileName]
  }

  // Generate a generic description from filename
  return fileName
    .replace(/\.[^/.]+$/, "") // Remove extension
    .replace(/[-_]/g, " ") // Replace dashes/underscores with spaces
}
