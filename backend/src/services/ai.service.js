const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `You are an interview preparation assistant. Analyze the candidate profile and generate an interview preparation report.

        Resume: ${resume}
        Self Description: ${selfDescription}
        Job Description: ${jobDescription}

        Return a JSON object with EXACTLY these fields and no others:
        {
            "matchScore": <number between 0 and 100>,
            "title": "<job title from job description>",
            "technicalQuestions": [
                {
                    "question": "<technical question>",
                    "intention": "<why interviewer asks this>",
                    "answer": "<how to answer this question>"
                }
            ],
            "behavioralQuestions": [
                {
                    "question": "<behavioral question>",
                    "intention": "<why interviewer asks this>",
                    "answer": "<how to answer this question>"
                }
            ],
            "skillGaps": [
                {
                    "skill": "<missing skill>",
                    "severity": "<low or medium or high>"
                }
            ],
            "preparationPlan": [
                {
                    "day": <day number starting from 1>,
                    "focus": "<main focus for this day>",
                    "tasks": ["<task 1>", "<task 2>"]
                }
            ]
        }

        Rules:
        - matchScore must be a number
        - severity must be exactly "low", "medium" or "high"
        - Include at least 5 technical questions
        - Include at least 3 behavioral questions
        - Include at least 7 days in preparation plan
        - Do NOT add any extra fields
        - Return ONLY the JSON object, nothing else`

    try {
        const response = await ai.models.generateContent({
            model: "models/gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        })

        console.log("AI RESPONSE:", response.text)
        return JSON.parse(response.text)
    } catch (err) {
        if (err.message.includes('429')) {
            throw new Error("AI quota exceeded. Please try again in a few minutes.")
        }
        throw err
    }
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })
    const pdfBuffer = await page.pdf({
        format: "A4",
        margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" }
    })
    await browser.close()
    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate a professional resume in HTML format for a candidate.

        Resume/Experience: ${resume}
        Self Description: ${selfDescription}
        Job Description: ${jobDescription}

        Rules:
        - Return ONLY a JSON object with a single field "html"
        - The "html" field should contain complete HTML for a professional resume
        - Tailor the resume for the given job description
        - Make it ATS friendly
        - Keep it 1-2 pages when printed
        - Use clean professional styling with inline CSS
        - Do NOT include any text outside the JSON object`

    try {
        const response = await ai.models.generateContent({
            model: "models/gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        })

        const jsonContent = JSON.parse(response.text)
        return await generatePdfFromHtml(jsonContent.html)
    } catch (err) {
        if (err.message.includes('429')) {
            throw new Error("AI quota exceeded. Please try again in a few minutes.")
        }
        throw err
    }
}

module.exports = { generateInterviewReport, generateResumePdf }