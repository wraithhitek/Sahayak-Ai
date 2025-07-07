import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || "")

export async function generateContent(prompt: string, language = "english") {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const enhancedPrompt = `
      You are Sahayak, an AI teaching assistant for Indian schools. 
      Language: ${language}
      Context: Multi-grade classroom in under-resourced Indian school
      
      ${prompt}
      
      Please provide culturally relevant content that is:
      - Appropriate for Indian context
      - Simple and easy to understand
      - Practical for teachers with limited resources
      - Engaging for students
      
      If the language is not English, please respond in that language.
    `

    const result = await model.generateContent(enhancedPrompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error generating content:", error)
    throw new Error("Failed to generate content. Please check your API key and try again.")
  }
}

export async function generateKnowledgeAnswer(question: string, language = "english", gradeLevel = "general") {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Enhanced complexity-based instructions
    const getComplexityInstructions = (level: string) => {
      switch (level) {
        case "1-3":
          return {
            explanationLength: "1-2 very simple sentences using basic words",
            analogyStyle: "simple everyday objects and activities that young children know",
            activitiesCount: "3 hands-on, play-based activities",
            additionalInfo: "Use very simple language, avoid technical terms completely",
          }
        case "4-6":
          return {
            explanationLength: "2-3 clear sentences with some basic scientific terms explained simply",
            analogyStyle: "relatable examples from home, school, and community life",
            activitiesCount: "3 practical activities mixing observation and simple experiments",
            additionalInfo: "Include basic scientific vocabulary but explain each term",
          }
        case "7-9":
          return {
            explanationLength: "4-5 detailed sentences covering the main concept, causes, and effects",
            analogyStyle: "more sophisticated analogies connecting to broader concepts",
            activitiesCount: "3 investigative activities including experiments and research",
            additionalInfo: "Include scientific terminology, explain processes step-by-step, mention related concepts",
          }
        case "10-12":
          return {
            explanationLength:
              "6-8 comprehensive sentences covering the concept, underlying mechanisms, scientific principles, and real-world applications",
            analogyStyle: "complex analogies that demonstrate deeper understanding and connections",
            activitiesCount: "3 advanced activities including analysis, synthesis, and critical thinking",
            additionalInfo:
              "Use proper scientific terminology, explain molecular/chemical processes, include exceptions and variations, mention current research or applications",
          }
        default:
          return {
            explanationLength: "3-4 sentences with moderate detail",
            analogyStyle: "relatable examples from daily life",
            activitiesCount: "3 practical activities",
            additionalInfo: "Balance simplicity with accuracy",
          }
      }
    }

    const complexity = getComplexityInstructions(gradeLevel)

    const prompt = `
      You are Sahayak, an AI teaching assistant for Indian schools.
      
      Question: ${question}
      Language: ${language}
      Grade Level: ${gradeLevel}
      
      IMPORTANT COMPLEXITY REQUIREMENTS:
      - Explanation Length: ${complexity.explanationLength}
      - Analogy Style: ${complexity.analogyStyle}
      - Activities: ${complexity.activitiesCount}
      - Additional Requirements: ${complexity.additionalInfo}
      
      Please provide a comprehensive answer following this EXACT structure:
      
      EXPLANATION:
      [Write ${complexity.explanationLength} here. ${complexity.additionalInfo}]
      
      ANALOGY:
      [Create an analogy using ${complexity.analogyStyle}. Make this detailed and engaging.]
      
      ACTIVITIES:
      1. [First activity - ${complexity.activitiesCount.split(" ")[2]} type]
      2. [Second activity - different approach]
      3. [Third activity - most advanced for the level]
      
      ${language !== "english" ? `\nLOCAL LANGUAGE:\n[Provide the complete explanation in ${language} with same level of detail]` : ""}
      
      REMEMBER: 
      - For Grade 1-3: Use VERY simple words, short sentences
      - For Grade 4-6: Include basic science terms but explain them
      - For Grade 7-9: Use proper scientific vocabulary and explain processes
      - For Grade 10-12: Provide comprehensive, detailed explanations with advanced concepts
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the structured response
    const sections = text.split(/(?:EXPLANATION:|ANALOGY:|ACTIVITIES:|LOCAL LANGUAGE:)/i)

    if (sections.length >= 4) {
      const explanation = sections[1]?.trim() || "Explanation not available"
      const analogy = sections[2]?.trim() || "Think of this concept like something you see in daily life."
      const activitiesText = sections[3]?.trim() || ""
      const localLanguageText = sections[4]?.trim() || ""

      // Parse activities from numbered list
      const activities = activitiesText
        .split(/\d+\./)
        .filter((item) => item.trim())
        .map((item) => item.trim())
        .slice(0, 3)

      // If no activities found, provide defaults based on complexity
      const getDefaultActivities = (level: string) => {
        switch (level) {
          case "1-3":
            return [
              "Look at leaves outside and touch them",
              "Draw pictures of different colored leaves",
              "Collect leaves and sort them by color",
            ]
          case "4-6":
            return [
              "Collect leaves from different seasons and compare them",
              "Create a leaf color chart and observe changes over time",
              "Do a simple experiment with leaves in water",
            ]
          case "7-9":
            return [
              "Design an experiment to test factors affecting leaf color change",
              "Research and create a presentation on photosynthesis and pigments",
              "Analyze leaf samples under a magnifying glass and document findings",
            ]
          case "10-12":
            return [
              "Conduct a detailed study on chlorophyll extraction and analysis",
              "Research the molecular structure of different leaf pigments",
              "Design and execute an experiment on environmental factors affecting pigment production",
            ]
          default:
            return ["Observe examples around you", "Discuss with classmates", "Draw or write about it"]
        }
      }

      const finalActivities = activities.length > 0 ? activities : getDefaultActivities(gradeLevel)

      return {
        explanation,
        analogy,
        activities: finalActivities,
        localLanguageExplanation: localLanguageText || null,
      }
    } else {
      // Fallback if parsing fails
      return {
        explanation: text,
        analogy: "Think of this concept like something you see in daily life.",
        activities: ["Observe examples around you", "Discuss with classmates", "Draw or write about it"],
        localLanguageExplanation: null,
      }
    }
  } catch (error) {
    console.error("Error generating knowledge answer:", error)
    throw new Error("Failed to generate answer. Please check your API key and try again.")
  }
}

export async function generateLessonPlan(
  subject: string,
  topic: string,
  duration: number,
  grades: string[],
  objectives?: string,
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
      Create a detailed lesson plan for Indian multi-grade classroom:
      
      Subject: ${subject}
      Topic: ${topic}
      Duration: ${duration} minutes
      Grades: ${grades.join(", ")}
      Objectives: ${objectives || "To be determined based on topic"}
      
      Please create a comprehensive lesson plan with:
      1. Clear learning objectives
      2. Materials needed (focus on low-cost, locally available items)
      3. Lesson phases with time allocation
      4. Activities for different grade levels
      5. Assessment strategies
      6. Differentiation techniques for multi-grade teaching
      7. Homework suggestions
      8. Cultural relevance for Indian context
      
      Format as JSON with proper structure for easy parsing.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    try {
      return JSON.parse(text)
    } catch {
      // Return structured fallback if JSON parsing fails
      return {
        title: `${topic} - ${subject}`,
        objectives: objectives || `Students will understand ${topic}`,
        duration: `${duration} minutes`,
        materials: ["Blackboard", "Chalk", "Textbooks"],
        phases: [
          {
            name: "Introduction",
            duration: Math.floor(duration * 0.2),
            activities: [`Introduce ${topic}`, "Ask prior knowledge questions"],
          },
          {
            name: "Main Teaching",
            duration: Math.floor(duration * 0.5),
            activities: [`Explain ${topic} concepts`, "Use examples and demonstrations"],
          },
          {
            name: "Practice",
            duration: Math.floor(duration * 0.2),
            activities: ["Student practice activities", "Group work"],
          },
          {
            name: "Conclusion",
            duration: Math.floor(duration * 0.1),
            activities: ["Summarize key points", "Assign homework"],
          },
        ],
      }
    }
  } catch (error) {
    console.error("Error generating lesson plan:", error)
    throw new Error("Failed to generate lesson plan. Please check your API key and try again.")
  }
}
