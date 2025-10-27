// Gemini API Configuration
export const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || ""

// Environment check
export const isGeminiConfigured = () => {
  return !!GEMINI_API_KEY && GEMINI_API_KEY !== "" && GEMINI_API_KEY !== "undefined"
}

// Use Gemini model from environment variable or default to 2.5 Pro
export const getGeminiModel = () => {
  return process.env.GOOGLE_GEMINI_MODEL || "gemini-2.5-pro"
}

// Get API key safely
export const getApiKey = () => {
  if (!isGeminiConfigured()) {
    throw new Error("Google Generative AI API key is missing. Please set NEXT_PUBLIC_GEMINI_API_KEY or GEMINI_API_KEY environment variable.")
  }
  return GEMINI_API_KEY
}
