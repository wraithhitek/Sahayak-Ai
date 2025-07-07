"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Loader2,
  Calendar,
  Download,
  Eye,
  Copy,
  Sparkles,
  Brain,
  Wand2,
  Target,
  Star,
  BookOpen,
  Users,
  Clock,
  TrendingUp,
  Lightbulb,
  Zap,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LessonPlanner() {
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [grades, setGrades] = useState<string[]>([])
  const [duration, setDuration] = useState("")
  const [topic, setTopic] = useState("")
  const [learningObjectives, setLearningObjectives] = useState("")
  const [learningStyles, setLearningStyles] = useState<string[]>([])
  const [resources, setResources] = useState<string[]>([])
  const [assessmentType, setAssessmentType] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [lessonPlans, setLessonPlans] = useState<any[]>([])
  const [previewPlan, setPreviewPlan] = useState<any>(null)
  const [planHistory, setPlanHistory] = useState<any[]>([])
  const [advancedMode, setAdvancedMode] = useState(false)
  const [customInstructions, setCustomInstructions] = useState("")
  const [includeExtensions, setIncludeExtensions] = useState(false)
  const [includeHomework, setIncludeHomework] = useState(false)
  const [includeDifferentiation, setIncludeDifferentiation] = useState(false)
  const { toast } = useToast()

  const subjects = [
    {
      value: "mathematics",
      label: "🔢 Mathematics",
      icon: "📊",
      topics: ["Numbers", "Algebra", "Geometry", "Statistics", "Fractions", "Decimals"],
      skills: ["Problem Solving", "Logical Thinking", "Pattern Recognition"],
    },
    {
      value: "science",
      label: "🔬 Science",
      icon: "⚗️",
      topics: ["Physics", "Chemistry", "Biology", "Environment", "Space", "Energy"],
      skills: ["Observation", "Experimentation", "Critical Thinking"],
    },
    {
      value: "english",
      label: "📚 English",
      icon: "📖",
      topics: ["Grammar", "Literature", "Writing", "Speaking", "Reading", "Poetry"],
      skills: ["Communication", "Creativity", "Analysis"],
    },
    {
      value: "hindi",
      label: "🇮🇳 Hindi",
      icon: "📜",
      topics: ["व्याकरण", "साहित्य", "लेखन", "भाषण", "पठन", "कविता"],
      skills: ["भाषा कौशल", "सांस्कृतिक समझ", "अभिव्यक्ति"],
    },
    {
      value: "social-studies",
      label: "🌍 Social Studies",
      icon: "🏛️",
      topics: ["History", "Geography", "Civics", "Culture", "Economics", "Heritage"],
      skills: ["Research", "Analysis", "Cultural Awareness"],
    },
    {
      value: "environmental-studies",
      label: "🌱 Environmental Studies",
      icon: "🌿",
      topics: ["Nature", "Conservation", "Pollution", "Wildlife", "Climate", "Sustainability"],
      skills: ["Environmental Awareness", "Conservation", "Responsibility"],
    },
    {
      value: "art-craft",
      label: "🎨 Art & Craft",
      icon: "🖌️",
      topics: ["Drawing", "Painting", "Sculpture", "Crafts", "Design", "Creativity"],
      skills: ["Creativity", "Fine Motor Skills", "Aesthetic Sense"],
    },
    {
      value: "physical-education",
      label: "🏃 Physical Education",
      icon: "⚽",
      topics: ["Sports", "Fitness", "Health", "Games", "Yoga", "Athletics"],
      skills: ["Physical Fitness", "Teamwork", "Discipline"],
    },
  ]

  const durations = [
    { value: "30", label: "30 minutes", icon: "⏰", suitable: "Quick lessons, reviews" },
    { value: "45", label: "45 minutes", icon: "🕐", suitable: "Standard lessons, activities" },
    { value: "60", label: "1 hour", icon: "🕑", suitable: "Comprehensive lessons, projects" },
    { value: "90", label: "1.5 hours", icon: "🕕", suitable: "Extended activities, workshops" },
    { value: "120", label: "2 hours", icon: "🕗", suitable: "Full workshops, field trips" },
  ]

  const gradeOptions = [
    {
      value: "grade1",
      label: "Grade 1",
      color: "bg-green-100 text-green-800",
      age: "6-7 years",
      focus: "Basic concepts, play-based learning",
    },
    {
      value: "grade2",
      label: "Grade 2",
      color: "bg-green-100 text-green-800",
      age: "7-8 years",
      focus: "Foundation skills, interactive learning",
    },
    {
      value: "grade3",
      label: "Grade 3",
      color: "bg-blue-100 text-blue-800",
      age: "8-9 years",
      focus: "Skill building, structured activities",
    },
    {
      value: "grade4",
      label: "Grade 4",
      color: "bg-blue-100 text-blue-800",
      age: "9-10 years",
      focus: "Concept development, group work",
    },
    {
      value: "grade5",
      label: "Grade 5",
      color: "bg-purple-100 text-purple-800",
      age: "10-11 years",
      focus: "Advanced concepts, projects",
    },
    {
      value: "grade6",
      label: "Grade 6",
      color: "bg-purple-100 text-purple-800",
      age: "11-12 years",
      focus: "Abstract thinking, research",
    },
    {
      value: "grade7",
      label: "Grade 7",
      color: "bg-orange-100 text-orange-800",
      age: "12-13 years",
      focus: "Critical thinking, analysis",
    },
    {
      value: "grade8",
      label: "Grade 8",
      color: "bg-orange-100 text-orange-800",
      age: "13-14 years",
      focus: "Complex concepts, presentations",
    },
  ]

  const learningStyleOptions = [
    {
      value: "visual",
      label: "👁️ Visual Learning",
      description: "Pictures, diagrams, colors, charts",
      activities: ["Drawing", "Mind maps", "Videos"],
    },
    {
      value: "auditory",
      label: "👂 Auditory Learning",
      description: "Songs, rhymes, sounds, discussions",
      activities: ["Music", "Storytelling", "Debates"],
    },
    {
      value: "kinesthetic",
      label: "🤲 Hands-on Learning",
      description: "Movement, touch, activities, experiments",
      activities: ["Experiments", "Role-play", "Building"],
    },
    {
      value: "social",
      label: "👥 Social Learning",
      description: "Group work, discussions, collaboration",
      activities: ["Group projects", "Peer teaching", "Discussions"],
    },
    {
      value: "logical",
      label: "🧮 Logical Learning",
      description: "Patterns, sequences, reasoning, analysis",
      activities: ["Problem solving", "Puzzles", "Analysis"],
    },
  ]

  const availableResources = [
    { value: "blackboard", label: "🖤 Blackboard/Whiteboard", category: "Basic" },
    { value: "textbooks", label: "📚 Textbooks", category: "Basic" },
    { value: "worksheets", label: "📄 Worksheets", category: "Basic" },
    { value: "charts", label: "📊 Charts/Posters", category: "Visual" },
    { value: "models", label: "🏗️ Real objects/Models", category: "Hands-on" },
    { value: "stories", label: "📖 Stories/Examples", category: "Narrative" },
    { value: "games", label: "🎮 Educational Games", category: "Interactive" },
    { value: "technology", label: "💻 Technology/Digital", category: "Advanced" },
    { value: "art-supplies", label: "🎨 Art Supplies", category: "Creative" },
    { value: "science-kit", label: "🔬 Science Kit", category: "Experimental" },
  ]

  const assessmentTypes = [
    { value: "formative", label: "📝 Formative Assessment", description: "Ongoing evaluation during learning" },
    { value: "summative", label: "📊 Summative Assessment", description: "Final evaluation of learning outcomes" },
    { value: "peer", label: "👥 Peer Assessment", description: "Students evaluate each other's work" },
    { value: "self", label: "🪞 Self Assessment", description: "Students reflect on their own learning" },
    { value: "practical", label: "🛠️ Practical Assessment", description: "Hands-on demonstration of skills" },
    { value: "oral", label: "🗣️ Oral Assessment", description: "Verbal questioning and discussion" },
  ]

  const performAdvancedGeneration = async () => {
    const generationSteps = [
      { step: "🧠 Analyzing educational requirements and context...", progress: 12 },
      { step: "🎯 Mapping learning objectives to curriculum standards...", progress: 25 },
      { step: "📚 Designing age-appropriate activities and assessments...", progress: 50 },
      { step: "🎨 Creating differentiated content for multiple grades...", progress: 63 },
      { step: "🔧 Structuring lesson phases and timing...", progress: 75 },
      { step: "📊 Generating assessment rubrics and extensions...", progress: 88 },
      { step: "✨ Finalizing your professional lesson plan...", progress: 100 },
    ]

    for (const { step, progress } of generationSteps) {
      setGenerationProgress(progress)
      await new Promise((resolve) => setTimeout(resolve, 700))
    }
  }

  const generateLessonPlan = async () => {
    if (!title.trim() || !subject || !topic.trim() || grades.length === 0 || !duration) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields: title, subject, topic, grades, and duration.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)

    try {
      await performAdvancedGeneration()

      const professionalPlan = await generateProfessionalPlan()
      setLessonPlans((prev) => [professionalPlan, ...prev])
      setPlanHistory((prev) => [professionalPlan, ...prev.slice(0, 9)])

      // Reset form
      setTitle("")
      setTopic("")
      setLearningObjectives("")
      setCustomInstructions("")

      toast({
        title: "Professional Lesson Plan Created!",
        description: `Your ${subject} lesson plan is ready to enhance education! AI Confidence: ${professionalPlan.aiConfidence}%`,
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again with different inputs or check your connection.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateProfessionalPlan = async () => {
    const selectedSubject = subjects.find((s) => s.value === subject)
    const selectedGrades = gradeOptions.filter((g) => grades.includes(g.value))
    const selectedDuration = durations.find((d) => d.value === duration)

    const aiConfidence = Math.floor(88 + Math.random() * 10)
    const complexity = grades.some((g) => Number.parseInt(g.replace("grade", "")) >= 6)
      ? "Advanced"
      : grades.some((g) => Number.parseInt(g.replace("grade", "")) >= 4)
        ? "Intermediate"
        : "Beginner"

    return {
      id: Date.now().toString(),
      title,
      subject: selectedSubject?.label || subject,
      topic,
      grades: selectedGrades.map((g) => g.label),
      duration: selectedDuration?.label || `${duration} minutes`,
      learningObjectives: learningObjectives || generateSmartObjectives(topic, subject, grades),
      timestamp: new Date(),
      aiConfidence,
      complexity,

      // Professional lesson structure
      lessonStructure: generateLessonStructure(duration, complexity),
      activities: generateProfessionalActivities(topic, subject, grades, learningStyles),
      materials: generateSmartMaterials(resources, subject, topic),
      assessment: generateComprehensiveAssessment(assessmentType, topic, grades),
      differentiation: generateDifferentiation(grades, learningStyles),
      extensions: includeExtensions ? generateExtensionActivities(topic, subject, grades) : [],
      homework: includeHomework ? generateHomeworkAssignments(topic, subject, grades) : null,

      // Advanced features
      vocabularyList: generateVocabulary(topic, subject, grades),
      safetyConsiderations: generateSafetyNotes(subject, topic),
      crossCurricularConnections: generateCrossConnections(subject, topic),
      technologyIntegration: resources.includes("technology") ? generateTechIntegration(topic, subject) : null,
      parentCommunication: generateParentNotes(topic, subject, grades),
      reflectionQuestions: generateReflectionQuestions(topic, subject),

      // Metadata
      estimatedPreparationTime: calculatePrepTime(complexity, resources.length),
      requiredExpertise:
        complexity === "Advanced"
          ? "Experienced Teacher"
          : complexity === "Intermediate"
            ? "Regular Teacher"
            : "Any Teacher",
      adaptabilityScore: Math.floor(75 + Math.random() * 20),
      engagementLevel: learningStyles.length >= 3 ? "High" : learningStyles.length >= 2 ? "Medium" : "Standard",
    }
  }

  const generateLessonStructure = (duration: string, complexity: string) => {
    const totalMinutes = Number.parseInt(duration)
    const phases = []

    if (totalMinutes >= 30) {
      phases.push({
        phase: "Opening & Warm-up",
        duration: Math.floor(totalMinutes * 0.15),
        activities: ["Greeting and attendance", "Review previous lesson", "Introduce today's topic"],
        purpose: "Engage students and activate prior knowledge",
      })
    }

    phases.push({
      phase: "Introduction & Objectives",
      duration: Math.floor(totalMinutes * 0.15),
      activities: ["Present learning objectives", "Connect to real-world examples", "Generate interest"],
      purpose: "Set clear expectations and motivate learning",
    })

    phases.push({
      phase: "Main Teaching & Activities",
      duration: Math.floor(totalMinutes * 0.5),
      activities: ["Core content delivery", "Interactive demonstrations", "Guided practice", "Student activities"],
      purpose: "Deliver main content through engaging methods",
    })

    phases.push({
      phase: "Practice & Application",
      duration: Math.floor(totalMinutes * 0.15),
      activities: ["Independent practice", "Group work", "Problem solving", "Skill application"],
      purpose: "Reinforce learning through practice",
    })

    phases.push({
      phase: "Closure & Assessment",
      duration: Math.floor(totalMinutes * 0.05),
      activities: ["Summarize key points", "Quick assessment", "Preview next lesson", "Assign homework"],
      purpose: "Consolidate learning and assess understanding",
    })

    return phases
  }

  const generateProfessionalActivities = (topic: string, subject: string, grades: string[], styles: string[]) => {
    const activities = []

    // Core activities based on subject
    if (subject === "mathematics") {
      activities.push(
        {
          name: "Mathematical Exploration",
          type: "Core Activity",
          duration: "15-20 minutes",
          description: `Interactive exploration of ${topic} using manipulatives and visual aids`,
          materials: ["Number cards", "Counting objects", "Whiteboard"],
          grouping: "Individual and pairs",
          differentiation: "Multiple difficulty levels provided",
        },
        {
          name: "Problem-Solving Challenge",
          type: "Application",
          duration: "10-15 minutes",
          description: `Real-world problems involving ${topic} concepts`,
          materials: ["Worksheets", "Calculator (if appropriate)"],
          grouping: "Small groups",
          differentiation: "Scaffolded problems for different abilities",
        },
      )
    } else if (subject === "science") {
      activities.push(
        {
          name: "Scientific Investigation",
          type: "Hands-on Experiment",
          duration: "20-25 minutes",
          description: `Hands-on exploration of ${topic} through guided experiments`,
          materials: ["Science kit", "Observation sheets", "Safety equipment"],
          grouping: "Small groups of 3-4",
          differentiation: "Different roles within groups",
        },
        {
          name: "Concept Mapping",
          type: "Visual Learning",
          duration: "10-15 minutes",
          description: `Create visual representations of ${topic} relationships`,
          materials: ["Chart paper", "Colored markers", "Sticky notes"],
          grouping: "Pairs",
          differentiation: "Templates provided for struggling learners",
        },
      )
    } else if (subject === "english") {
      activities.push(
        {
          name: "Interactive Reading",
          type: "Language Skills",
          duration: "15-20 minutes",
          description: `Engaging reading activities focused on ${topic}`,
          materials: ["Story books", "Reading comprehension sheets"],
          grouping: "Whole class and individual",
          differentiation: "Different reading levels available",
        },
        {
          name: "Creative Expression",
          type: "Writing/Speaking",
          duration: "15-20 minutes",
          description: `Students express understanding of ${topic} through creative activities`,
          materials: ["Writing materials", "Art supplies"],
          grouping: "Individual choice",
          differentiation: "Multiple expression formats offered",
        },
      )
    }

    // Add style-specific activities
    if (styles.includes("visual")) {
      activities.push({
        name: "Visual Learning Station",
        type: "Visual Activity",
        duration: "10-15 minutes",
        description: `Charts, diagrams, and visual aids to reinforce ${topic}`,
        materials: ["Visual aids", "Colored pencils", "Chart paper"],
        grouping: "Individual or pairs",
        differentiation: "Visual complexity varies by ability",
      })
    }

    if (styles.includes("kinesthetic")) {
      activities.push({
        name: "Movement & Manipulation",
        type: "Kinesthetic Activity",
        duration: "10-15 minutes",
        description: `Physical activities and manipulatives to explore ${topic}`,
        materials: ["Manipulatives", "Movement space", "Activity cards"],
        grouping: "Small groups",
        differentiation: "Different complexity levels of manipulatives",
      })
    }

    return activities
  }

  const generateSmartMaterials = (selectedResources: string[], subject: string, topic: string) => {
    const materials = {
      essential: ["Whiteboard/Blackboard", "Markers/Chalk", "Student notebooks"],
      recommended: [],
      optional: [],
      digital: [],
      safety: [],
    }

    selectedResources.forEach((resource) => {
      const resourceItem = availableResources.find((r) => r.value === resource)
      if (resourceItem) {
        if (["blackboard", "textbooks", "worksheets"].includes(resource)) {
          materials.essential.push(resourceItem.label)
        } else if (resource === "technology") {
          materials.digital.push("Computer/Tablet", "Internet connection", "Educational software")
        } else {
          materials.recommended.push(resourceItem.label)
        }
      }
    })

    // Subject-specific materials
    if (subject === "science") {
      materials.recommended.push("Safety goggles", "Lab equipment", "Specimens/samples")
      materials.safety.push("First aid kit", "Safety guidelines poster", "Emergency procedures")
    } else if (subject === "mathematics") {
      materials.recommended.push("Calculators", "Geometric tools", "Number lines", "Manipulatives")
    } else if (subject === "art-craft") {
      materials.recommended.push("Art supplies", "Brushes", "Paper varieties", "Protective clothing")
      materials.safety.push("Non-toxic materials only", "Proper ventilation", "Clean-up supplies")
    }

    return materials
  }

  const generateComprehensiveAssessment = (types: string[], topic: string, grades: string[]) => {
    const assessments = {
      formative: [],
      summative: [],
      rubrics: {},
      differentiation: {},
    }

    if (types.includes("formative") || types.length === 0) {
      assessments.formative = [
        {
          method: "Exit Tickets",
          description: `Quick questions about ${topic} understanding`,
          timing: "End of lesson",
          criteria: ["Understanding of key concepts", "Ability to apply knowledge", "Questions or confusion areas"],
        },
        {
          method: "Thumbs Up/Down",
          description: "Quick confidence check on topic understanding",
          timing: "Throughout lesson",
          criteria: ["Student confidence level", "Need for additional support", "Readiness to move forward"],
        },
        {
          method: "Think-Pair-Share",
          description: `Discussion and sharing about ${topic} concepts`,
          timing: "During main activity",
          criteria: ["Quality of explanations", "Peer interaction", "Concept clarity"],
        },
      ]
    }

    if (types.includes("summative")) {
      assessments.summative = [
        {
          method: "Performance Task",
          description: `Comprehensive demonstration of ${topic} mastery`,
          timing: "End of unit",
          criteria: ["Accuracy of application", "Problem-solving approach", "Communication of reasoning"],
        },
        {
          method: "Portfolio Assessment",
          description: "Collection of work showing progress and understanding",
          timing: "Ongoing collection",
          criteria: ["Growth over time", "Quality of reflection", "Variety of evidence"],
        },
      ]
    }

    // Generate rubrics
    assessments.rubrics = {
      understanding: {
        excellent: "Demonstrates complete understanding with clear explanations",
        proficient: "Shows good understanding with minor gaps",
        developing: "Partial understanding with some misconceptions",
        beginning: "Limited understanding, needs significant support",
      },
      application: {
        excellent: "Applies concepts accurately in new situations",
        proficient: "Applies concepts correctly in familiar contexts",
        developing: "Applies concepts with guidance and support",
        beginning: "Struggles to apply concepts even with support",
      },
    }

    return assessments
  }

  const generateDifferentiation = (grades: string[], styles: string[]) => {
    return {
      forAdvancedLearners: [
        "Extension activities with higher complexity",
        "Independent research projects",
        "Peer tutoring opportunities",
        "Creative problem-solving challenges",
      ],
      forStruggling: [
        "Additional visual supports and manipulatives",
        "Simplified vocabulary and instructions",
        "Extra practice with immediate feedback",
        "One-on-one or small group support",
      ],
      forELL: [
        "Visual vocabulary cards",
        "Bilingual resources when available",
        "Peer translation support",
        "Gesture and demonstration emphasis",
      ],
      forDifferentStyles: styles.map((style) => {
        const styleInfo = learningStyleOptions.find((s) => s.value === style)
        return `${styleInfo?.label}: ${styleInfo?.description}`
      }),
    }
  }

  const generateSmartObjectives = (topic: string, subject: string, grades: string[]) => {
    const gradeLevel = grades.length > 0 ? Number.parseInt(grades[0].replace("grade", "")) : 3
    const complexity =
      gradeLevel >= 6 ? "analyze and evaluate" : gradeLevel >= 4 ? "apply and demonstrate" : "identify and describe"

    return `Students will be able to ${complexity} key concepts related to ${topic} in ${subject}, demonstrating understanding through multiple activities and assessments appropriate for their grade level.`
  }

  const generateExtensionActivities = (topic: string, subject: string, grades: string[]) => {
    return [
      {
        title: "Research Project",
        description: `Independent research on advanced aspects of ${topic}`,
        timeRequired: "1-2 weeks",
        materials: "Internet access, research materials",
        outcome: "Presentation or report",
      },
      {
        title: "Creative Application",
        description: `Create something new using ${topic} concepts`,
        timeRequired: "3-5 days",
        materials: "Art supplies, technology tools",
        outcome: "Original creation with explanation",
      },
      {
        title: "Community Connection",
        description: `Find real-world examples of ${topic} in the community`,
        timeRequired: "1 week",
        materials: "Camera, interview questions",
        outcome: "Community presentation",
      },
    ]
  }

  const generateHomeworkAssignments = (topic: string, subject: string, grades: string[]) => {
    return {
      daily: `Practice worksheet on ${topic} concepts (15-20 minutes)`,
      weekly: `Creative project connecting ${topic} to real life`,
      reading: `Read related materials and prepare discussion questions`,
      family: `Share learning with family members and get their examples`,
      reflection: `Journal entry about what was learned and questions that arose`,
    }
  }

  const generateVocabulary = (topic: string, subject: string, grades: string[]) => {
    // This would be more sophisticated in a real implementation
    const vocabularyWords = [
      { word: topic, definition: `Key concept being studied in ${subject}`, example: `Example usage in context` },
      { word: "Analysis", definition: "Detailed examination of elements", example: "We will analyze the data" },
      {
        word: "Application",
        definition: "Practical use of knowledge",
        example: "Apply this concept to solve problems",
      },
      {
        word: "Synthesis",
        definition: "Combining elements to form a whole",
        example: "Synthesize information from multiple sources",
      },
    ]
    return vocabularyWords
  }

  const generateSafetyNotes = (subject: string, topic: string) => {
    if (subject === "science") {
      return [
        "Always wear safety goggles during experiments",
        "Handle all materials with care and supervision",
        "Report any spills or accidents immediately",
        "Follow all laboratory safety procedures",
      ]
    } else if (subject === "physical-education") {
      return [
        "Proper warm-up before activities",
        "Appropriate clothing and footwear",
        "Stay hydrated throughout activities",
        "Report any injuries immediately",
      ]
    }
    return ["Ensure safe learning environment", "Supervise all activities", "Emergency procedures posted"]
  }

  const generateCrossConnections = (subject: string, topic: string) => {
    return {
      mathematics: `Mathematical concepts and calculations related to ${topic}`,
      science: `Scientific principles and observations connected to ${topic}`,
      language: `Vocabulary development and communication skills through ${topic}`,
      social: `Cultural and social aspects of ${topic}`,
      arts: `Creative expression and artistic representation of ${topic}`,
    }
  }

  const generateTechIntegration = (topic: string, subject: string) => {
    return {
      tools: ["Educational apps", "Online simulations", "Digital presentations", "Virtual field trips"],
      activities: [
        `Use educational software to explore ${topic}`,
        `Create digital presentations about ${topic}`,
        `Virtual experiments or simulations related to ${topic}`,
        `Online research and fact-checking about ${topic}`,
      ],
      skills: ["Digital literacy", "Information evaluation", "Technology problem-solving", "Online collaboration"],
    }
  }

  const generateParentNotes = (topic: string, subject: string, grades: string[]) => {
    return {
      overview: `This week we are learning about ${topic} in ${subject}. Here's how you can support at home:`,
      activities: [
        `Discuss ${topic} during daily conversations`,
        `Look for examples of ${topic} in your environment`,
        `Encourage questions and curiosity about ${topic}`,
        `Share your own experiences related to ${topic}`,
      ],
      resources: [
        "Recommended books or websites",
        "Educational videos or documentaries",
        "Local museums or field trip opportunities",
        "Community experts who might visit or speak",
      ],
    }
  }

  const generateReflectionQuestions = (topic: string, subject: string) => {
    return [
      `What was the most interesting thing you learned about ${topic}?`,
      `How does ${topic} connect to your daily life?`,
      `What questions do you still have about ${topic}?`,
      `How would you explain ${topic} to a friend or family member?`,
      `What would you like to learn more about related to ${topic}?`,
    ]
  }

  const calculatePrepTime = (complexity: string, resourceCount: number) => {
    const baseTime = complexity === "Advanced" ? 45 : complexity === "Intermediate" ? 30 : 20
    const resourceTime = resourceCount * 5
    return `${baseTime + resourceTime} minutes`
  }

  const handleGradeChange = (gradeValue: string, checked: boolean) => {
    if (checked) {
      setGrades((prev) => [...prev, gradeValue])
    } else {
      setGrades((prev) => prev.filter((g) => g !== gradeValue))
    }
  }

  const handleLearningStyleChange = (styleValue: string, checked: boolean) => {
    if (checked) {
      setLearningStyles((prev) => [...prev, styleValue])
    } else {
      setLearningStyles((prev) => prev.filter((s) => s !== styleValue))
    }
  }

  const handleResourceChange = (resourceValue: string, checked: boolean) => {
    if (checked) {
      setResources((prev) => [...prev, resourceValue])
    } else {
      setResources((prev) => prev.filter((r) => r !== resourceValue))
    }
  }

  const handleAssessmentChange = (assessmentValue: string, checked: boolean) => {
    if (checked) {
      setAssessmentType((prev) => [...prev, assessmentValue])
    } else {
      setAssessmentType((prev) => prev.filter((a) => a !== assessmentValue))
    }
  }

  const handlePreview = (plan: any) => {
    setPreviewPlan(plan)
    toast({
      title: "Lesson Plan Preview Ready",
      description: "Your comprehensive lesson plan is now displayed with all details.",
    })
  }

  const downloadPlan = (plan: any) => {
    const content = `
PROFESSIONAL LESSON PLAN
Generated by Sahayak AI - Advanced Educational Planning System

LESSON INFORMATION:
Title: ${plan.title}
Subject: ${plan.subject}
Topic: ${plan.topic}
Grades: ${plan.grades.join(", ")}
Duration: ${plan.duration}
Complexity: ${plan.complexity}
AI Confidence: ${plan.aiConfidence}%
Created: ${plan.timestamp.toLocaleDateString()}

LEARNING OBJECTIVES:
${plan.learningObjectives}

LESSON STRUCTURE:
${plan.lessonStructure
  .map(
    (phase) => `
${phase.phase} (${phase.duration} minutes):
Purpose: ${phase.purpose}
Activities:
${phase.activities.map((activity) => `• ${activity}`).join("\n")}
`,
  )
  .join("\n")}

ACTIVITIES:
${plan.activities
  .map(
    (activity) => `
${activity.name} (${activity.type}) - ${activity.duration}
Description: ${activity.description}
Materials: ${activity.materials.join(", ")}
Grouping: ${activity.grouping}
Differentiation: ${activity.differentiation}
`,
  )
  .join("\n")}

MATERIALS NEEDED:
Essential: ${plan.materials.essential.join(", ")}
Recommended: ${plan.materials.recommended.join(", ")}
${plan.materials.digital.length > 0 ? `Digital: ${plan.materials.digital.join(", ")}` : ""}
${plan.materials.safety.length > 0 ? `Safety: ${plan.materials.safety.join(", ")}` : ""}

ASSESSMENT STRATEGIES:
Formative Assessments:
${plan.assessment.formative
  .map(
    (assessment) => `
• ${assessment.method}: ${assessment.description}
  Timing: ${assessment.timing}
  Criteria: ${assessment.criteria.join(", ")}
`,
  )
  .join("\n")}

${
  plan.assessment.summative.length > 0
    ? `
Summative Assessments:
${plan.assessment.summative
  .map(
    (assessment) => `
• ${assessment.method}: ${assessment.description}
  Timing: ${assessment.timing}
  Criteria: ${assessment.criteria.join(", ")}
`,
  )
  .join("\n")}`
    : ""
}

DIFFERENTIATION STRATEGIES:
For Advanced Learners:
${plan.differentiation.forAdvancedLearners.map((strategy) => `• ${strategy}`).join("\n")}

For Struggling Learners:
${plan.differentiation.forStruggling.map((strategy) => `• ${strategy}`).join("\n")}

For English Language Learners:
${plan.differentiation.forELL.map((strategy) => `• ${strategy}`).join("\n")}

${
  plan.extensions.length > 0
    ? `
EXTENSION ACTIVITIES:
${plan.extensions
  .map(
    (ext) => `
${ext.title}:
Description: ${ext.description}
Time Required: ${ext.timeRequired}
Materials: ${ext.materials}
Expected Outcome: ${ext.outcome}
`,
  )
  .join("\n")}`
    : ""
}

${
  plan.homework
    ? `
HOMEWORK ASSIGNMENTS:
Daily: ${plan.homework.daily}
Weekly: ${plan.homework.weekly}
Reading: ${plan.homework.reading}
Family: ${plan.homework.family}
Reflection: ${plan.homework.reflection}
`
    : ""
}

VOCABULARY:
${plan.vocabularyList
  .map(
    (vocab) => `
${vocab.word}: ${vocab.definition}
Example: ${vocab.example}
`,
  )
  .join("\n")}

SAFETY CONSIDERATIONS:
${plan.safetyConsiderations.map((safety) => `• ${safety}`).join("\n")}

CROSS-CURRICULAR CONNECTIONS:
${Object.entries(plan.crossCurricularConnections)
  .map(([subject, connection]) => `${subject}: ${connection}`)
  .join("\n")}

${
  plan.technologyIntegration
    ? `
TECHNOLOGY INTEGRATION:
Tools: ${plan.technologyIntegration.tools.join(", ")}
Activities:
${plan.technologyIntegration.activities.map((activity) => `• ${activity}`).join("\n")}
Skills Developed: ${plan.technologyIntegration.skills.join(", ")}
`
    : ""
}

PARENT COMMUNICATION:
${plan.parentCommunication.overview}

Home Support Activities:
${plan.parentCommunication.activities.map((activity) => `• ${activity}`).join("\n")}

Recommended Resources:
${plan.parentCommunication.resources.map((resource) => `• ${resource}`).join("\n")}

REFLECTION QUESTIONS:
${plan.reflectionQuestions.map((question) => `• ${question}`).join("\n")}

LESSON METADATA:
Preparation Time: ${plan.estimatedPreparationTime}
Required Expertise: ${plan.requiredExpertise}
Adaptability Score: ${plan.adaptabilityScore}%
Engagement Level: ${plan.engagementLevel}

Generated by Sahayak AI Teaching Assistant
Professional Lesson Planning System
    `.trim()

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Lesson_Plan_${plan.title.replace(/\s+/g, "_")}_${plan.timestamp.toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Lesson Plan Downloaded",
      description: `Your comprehensive lesson plan "${plan.title}" has been downloaded successfully.`,
    })
  }

  const copyToClipboard = (plan: any) => {
    const content = `${plan.title} - ${plan.subject}\nTopic: ${plan.topic}\nGrades: ${plan.grades.join(", ")}\nDuration: ${plan.duration}\n\nObjectives: ${plan.learningObjectives}`
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied to Clipboard",
      description: "Lesson plan summary has been copied to your clipboard.",
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full text-purple-800 text-sm font-bold mb-4 border-2 border-purple-200">
          <Brain className="w-5 h-5 mr-2" />
          AI-Powered Lesson Planning
        </div>
        <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Professional Lesson Plan Generator
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Create comprehensive, standards-aligned lesson plans with advanced AI technology and educational best
          practices.
        </p>
      </div>

      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Calendar className="w-7 h-7 mr-3 text-purple-600" />
            Professional Lesson Configuration
          </CardTitle>
          <CardDescription className="text-lg">
            Design your perfect lesson with AI-powered educational planning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 block">📚 Lesson Title *</label>
              <Input
                placeholder="Enter engaging lesson title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-2 hover:border-purple-300 focus:border-purple-500 transition-colors text-lg h-12"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 block">🎯 Main Topic *</label>
              <Input
                placeholder="What will students learn about?"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="border-2 hover:border-purple-300 focus:border-purple-500 transition-colors text-lg h-12"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-gray-700 mb-3 block">📖 Subject Area *</label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="h-16 border-2 hover:border-purple-300 transition-colors">
                  <SelectValue placeholder="Select subject area" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subj) => (
                    <SelectItem key={subj.value} value={subj.value} className="py-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{subj.icon}</span>
                        <div>
                          <div className="font-bold text-lg">{subj.label}</div>
                          <div className="text-xs text-gray-500 mb-1">Topics: {subj.topics.slice(0, 3).join(", ")}</div>
                          <div className="text-xs text-blue-600">Skills: {subj.skills.slice(0, 2).join(", ")}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 mb-3 block">⏰ Lesson Duration *</label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="h-16 border-2 hover:border-purple-300 transition-colors">
                  <SelectValue placeholder="Select lesson duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((dur) => (
                    <SelectItem key={dur.value} value={dur.value} className="py-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-xl">{dur.icon}</span>
                        <div>
                          <div className="font-bold text-lg">{dur.label}</div>
                          <div className="text-xs text-gray-500">{dur.suitable}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 mb-3 block">🎓 Target Grades * (Select multiple)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gradeOptions.map((grade) => (
                <div
                  key={grade.value}
                  className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                >
                  <Checkbox
                    id={grade.value}
                    checked={grades.includes(grade.value)}
                    onCheckedChange={(checked) => handleGradeChange(grade.value, checked as boolean)}
                  />
                  <div className="flex-1">
                    <label htmlFor={grade.value} className="cursor-pointer">
                      <Badge className={`${grade.color} text-sm mb-1`}>{grade.label}</Badge>
                      <div className="text-xs text-gray-600">{grade.age}</div>
                      <div className="text-xs text-gray-500">{grade.focus}</div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 mb-2 block">🎯 Learning Objectives</label>
            <Textarea
              placeholder="What will students be able to do after this lesson? (Leave blank for AI-generated objectives)"
              value={learningObjectives}
              onChange={(e) => setLearningObjectives(e.target.value)}
              rows={3}
              className="border-2 hover:border-purple-300 focus:border-purple-500 transition-colors resize-none text-lg"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 mb-3 block">🧠 Learning Styles to Include</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningStyleOptions.map((style) => (
                <div
                  key={style.value}
                  className="flex items-start space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                >
                  <Checkbox
                    id={style.value}
                    checked={learningStyles.includes(style.value)}
                    onCheckedChange={(checked) => handleLearningStyleChange(style.value, checked as boolean)}
                  />
                  <div className="flex-1">
                    <label htmlFor={style.value} className="cursor-pointer">
                      <div className="font-bold text-purple-800 mb-1">{style.label}</div>
                      <div className="text-sm text-gray-600 mb-2">{style.description}</div>
                      <div className="text-xs text-blue-600">Activities: {style.activities.join(", ")}</div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 mb-3 block">🛠️ Available Resources</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableResources.map((resource) => (
                <div
                  key={resource.value}
                  className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                >
                  <Checkbox
                    id={resource.value}
                    checked={resources.includes(resource.value)}
                    onCheckedChange={(checked) => handleResourceChange(resource.value, checked as boolean)}
                  />
                  <div className="flex-1">
                    <label htmlFor={resource.value} className="cursor-pointer">
                      <div className="font-medium text-sm">{resource.label}</div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {resource.category}
                      </Badge>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 mb-3 block">📊 Assessment Methods</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assessmentTypes.map((assessment) => (
                <div
                  key={assessment.value}
                  className="flex items-start space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                >
                  <Checkbox
                    id={assessment.value}
                    checked={assessmentType.includes(assessment.value)}
                    onCheckedChange={(checked) => handleAssessmentChange(assessment.value, checked as boolean)}
                  />
                  <div className="flex-1">
                    <label htmlFor={assessment.value} className="cursor-pointer">
                      <div className="font-bold text-purple-800 mb-1">{assessment.label}</div>
                      <div className="text-sm text-gray-600">{assessment.description}</div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 p-6 rounded-xl border-2 border-white/50 shadow-inner">
            <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
              <Wand2 className="w-5 h-5 mr-2 text-purple-600" />
              Advanced Options
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox id="extensions" checked={includeExtensions} onCheckedChange={setIncludeExtensions} />
                  <label htmlFor="extensions" className="font-medium">
                    Include Extension Activities
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="homework" checked={includeHomework} onCheckedChange={setIncludeHomework} />
                  <label htmlFor="homework" className="font-medium">
                    Generate Homework Assignments
                  </label>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="differentiation"
                    checked={includeDifferentiation}
                    onCheckedChange={setIncludeDifferentiation}
                  />
                  <label htmlFor="differentiation" className="font-medium">
                    Enhanced Differentiation
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="advanced" checked={advancedMode} onCheckedChange={setAdvancedMode} />
                  <label htmlFor="advanced" className="font-medium">
                    Advanced Planning Mode
                  </label>
                </div>
              </div>
            </div>

            {advancedMode && (
              <div className="mt-6">
                <label className="text-sm font-bold text-gray-700 mb-2 block">✨ Custom Instructions</label>
                <Textarea
                  placeholder="Any specific requirements, teaching style preferences, or special considerations..."
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  rows={3}
                  className="border-2 hover:border-purple-300 focus:border-purple-500 transition-colors resize-none"
                />
              </div>
            )}
          </div>

          {isGenerating && (
            <div className="bg-white/80 p-6 rounded-xl border-2 border-blue-200">
              <div className="flex items-center space-x-4 mb-4">
                <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
                <div>
                  <h4 className="font-bold text-blue-900">AI Creating Your Professional Lesson Plan...</h4>
                  <p className="text-blue-700">Advanced educational algorithms at work!</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Progress value={generationProgress} className="flex-1 h-4" />
                <span className="text-xl font-bold text-blue-600">{generationProgress}%</span>
              </div>
            </div>
          )}

          <Button
            onClick={generateLessonPlan}
            disabled={isGenerating}
            className="w-full h-16 text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                Creating Professional Lesson Plan...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 mr-3" />
                Generate Professional Lesson Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {lessonPlans.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Professional Lesson Plans Ready!
            </h4>
            <p className="text-lg text-gray-600">Your comprehensive lesson plans are ready to enhance education!</p>
          </div>

          {lessonPlans.map((plan) => (
            <Card
              key={plan.id}
              className="border-4 border-green-300 bg-gradient-to-br from-green-50 to-blue-50 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-2xl text-green-800">
                    <BookOpen className="w-7 h-7 mr-3 text-green-600" />
                    {plan.title}
                  </CardTitle>
                  <div className="flex space-x-3">
                    <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2">{plan.subject}</Badge>
                    <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">{plan.complexity}</Badge>
                    <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">AI: {plan.aiConfidence}%</Badge>
                  </div>
                </div>
                <CardDescription className="text-lg text-green-700">
                  Topic: {plan.topic} • Grades: {plan.grades.join(", ")} • Duration: {plan.duration}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/80 p-6 rounded-xl shadow-lg">
                  <h5 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                    <Target className="w-5 h-5 mr-2 text-blue-500" />
                    Learning Objectives
                  </h5>
                  <p className="text-gray-700 leading-relaxed">{plan.learningObjectives}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/80 p-6 rounded-xl shadow-lg">
                    <h5 className="font-bold text-gray-900 mb-3 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-purple-500" />
                      Lesson Structure
                    </h5>
                    <div className="space-y-3">
                      {plan.lessonStructure.slice(0, 3).map((phase: any, index: number) => (
                        <div key={index} className="border-l-4 border-purple-500 pl-3 bg-purple-50 p-2 rounded-r-lg">
                          <div className="font-medium text-purple-800">{phase.phase}</div>
                          <div className="text-sm text-purple-600">{phase.duration} minutes</div>
                        </div>
                      ))}
                      {plan.lessonStructure.length > 3 && (
                        <div className="text-sm text-gray-500 italic">
                          +{plan.lessonStructure.length - 3} more phases...
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white/80 p-6 rounded-xl shadow-lg">
                    <h5 className="font-bold text-gray-900 mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-green-500" />
                      Key Activities
                    </h5>
                    <div className="space-y-3">
                      {plan.activities.slice(0, 3).map((activity: any, index: number) => (
                        <div key={index} className="bg-green-50 p-3 rounded-lg">
                          <div className="font-medium text-green-800">{activity.name}</div>
                          <div className="text-sm text-green-600">
                            {activity.type} • {activity.duration}
                          </div>
                        </div>
                      ))}
                      {plan.activities.length > 3 && (
                        <div className="text-sm text-gray-500 italic">
                          +{plan.activities.length - 3} more activities...
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{plan.estimatedPreparationTime}</div>
                    <div className="text-sm text-gray-600">Prep Time</div>
                  </div>
                  <div className="text-center bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{plan.engagementLevel}</div>
                    <div className="text-sm text-gray-600">Engagement</div>
                  </div>
                  <div className="text-center bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{plan.adaptabilityScore}%</div>
                    <div className="text-sm text-gray-600">Adaptability</div>
                  </div>
                  <div className="text-center bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{plan.requiredExpertise}</div>
                    <div className="text-sm text-gray-600">Expertise Level</div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handlePreview(plan)}
                    className="flex-1 bg-white/80 hover:bg-blue-50 border-blue-300 text-blue-800 font-semibold"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Full Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => downloadPlan(plan)}
                    className="flex-1 bg-white/80 hover:bg-green-50 border-green-300 text-green-800 font-semibold"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Plan
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => copyToClipboard(plan)}
                    className="flex-1 bg-white/80 hover:bg-purple-50 border-purple-300 text-purple-800 font-semibold"
                  >
                    <Copy className="w-5 h-5 mr-2" />
                    Copy Summary
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {previewPlan && (
        <Card className="border-4 border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-blue-900">
              <Star className="w-7 h-7 mr-3 text-blue-600" />
              Complete Lesson Plan: {previewPlan.title}
            </CardTitle>
            <div className="flex flex-wrap gap-3 mt-3">
              <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2">{previewPlan.subject}</Badge>
              <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">{previewPlan.complexity}</Badge>
              <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
                AI Confidence: {previewPlan.aiConfidence}%
              </Badge>
              <Badge className="bg-orange-100 text-orange-800 text-lg px-4 py-2">
                {previewPlan.engagementLevel} Engagement
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="bg-white/80 p-8 rounded-xl shadow-lg">
              <h4 className="font-bold text-gray-900 mb-4 text-xl flex items-center">
                <Target className="w-6 h-6 mr-2 text-blue-500" />
                Learning Objectives & Overview
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-bold text-blue-900 mb-2">Objectives:</h5>
                  <p className="text-gray-700 leading-relaxed">{previewPlan.learningObjectives}</p>
                </div>
                <div>
                  <h5 className="font-bold text-blue-900 mb-2">Lesson Details:</h5>
                  <ul className="text-gray-700 space-y-1">
                    <li>
                      <strong>Topic:</strong> {previewPlan.topic}
                    </li>
                    <li>
                      <strong>Grades:</strong> {previewPlan.grades.join(", ")}
                    </li>
                    <li>
                      <strong>Duration:</strong> {previewPlan.duration}
                    </li>
                    <li>
                      <strong>Complexity:</strong> {previewPlan.complexity}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/80 p-8 rounded-xl shadow-lg">
              <h4 className="font-bold text-gray-900 mb-6 text-xl flex items-center">
                <Clock className="w-6 h-6 mr-2 text-purple-500" />
                Detailed Lesson Structure
              </h4>
              <div className="space-y-6">
                {previewPlan.lessonStructure.map((phase: any, index: number) => (
                  <div key={index} className="border-l-4 border-purple-500 pl-6 bg-purple-50 p-4 rounded-r-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-bold text-purple-900 text-lg">{phase.phase}</h5>
                      <Badge className="bg-purple-100 text-purple-800">{phase.duration} minutes</Badge>
                    </div>
                    <p className="text-purple-700 mb-3 italic">{phase.purpose}</p>
                    <div>
                      <h6 className="font-medium text-purple-800 mb-2">Activities:</h6>
                      <ul className="text-purple-700 space-y-1">
                        {phase.activities.map((activity: string, actIndex: number) => (
                          <li key={actIndex} className="flex items-center">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 p-8 rounded-xl shadow-lg">
              <h4 className="font-bold text-gray-900 mb-6 text-xl flex items-center">
                <Users className="w-6 h-6 mr-2 text-green-500" />
                Learning Activities
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {previewPlan.activities.map((activity: any, index: number) => (
                  <div key={index} className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-bold text-green-900">{activity.name}</h5>
                      <Badge className="bg-green-100 text-green-800">{activity.type}</Badge>
                    </div>
                    <p className="text-green-700 mb-3">{activity.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-green-800">Duration:</strong>
                        <p className="text-green-700">{activity.duration}</p>
                      </div>
                      <div>
                        <strong className="text-green-800">Grouping:</strong>
                        <p className="text-green-700">{activity.grouping}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <strong className="text-green-800 text-sm">Materials:</strong>
                      <p className="text-green-700 text-sm">{activity.materials.join(", ")}</p>
                    </div>
                    <div className="mt-2">
                      <strong className="text-green-800 text-sm">Differentiation:</strong>
                      <p className="text-green-700 text-sm">{activity.differentiation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 p-8 rounded-xl shadow-lg">
              <h4 className="font-bold text-gray-900 mb-6 text-xl flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-orange-500" />
                Assessment & Evaluation
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-bold text-orange-900 mb-4">Formative Assessments:</h5>
                  <div className="space-y-4">
                    {previewPlan.assessment.formative.map((assessment: any, index: number) => (
                      <div key={index} className="bg-orange-50 p-4 rounded-lg">
                        <h6 className="font-bold text-orange-800">{assessment.method}</h6>
                        <p className="text-orange-700 text-sm mb-2">{assessment.description}</p>
                        <div className="text-xs text-orange-600">
                          <strong>Timing:</strong> {assessment.timing}
                        </div>
                        <div className="text-xs text-orange-600 mt-1">
                          <strong>Criteria:</strong> {assessment.criteria.join(", ")}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {previewPlan.assessment.summative.length > 0 && (
                  <div>
                    <h5 className="font-bold text-orange-900 mb-4">Summative Assessments:</h5>
                    <div className="space-y-4">
                      {previewPlan.assessment.summative.map((assessment: any, index: number) => (
                        <div key={index} className="bg-orange-50 p-4 rounded-lg">
                          <h6 className="font-bold text-orange-800">{assessment.method}</h6>
                          <p className="text-orange-700 text-sm mb-2">{assessment.description}</p>
                          <div className="text-xs text-orange-600">
                            <strong>Timing:</strong> {assessment.timing}
                          </div>
                          <div className="text-xs text-orange-600 mt-1">
                            <strong>Criteria:</strong> {assessment.criteria.join(", ")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white/80 p-8 rounded-xl shadow-lg">
              <h4 className="font-bold text-gray-900 mb-6 text-xl flex items-center">
                <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
                Differentiation Strategies
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-bold text-yellow-900 mb-3">For Advanced Learners:</h5>
                  <ul className="text-yellow-800 space-y-2">
                    {previewPlan.differentiation.forAdvancedLearners.map((strategy: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 mt-2"></span>
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-yellow-900 mb-3">For Struggling Learners:</h5>
                  <ul className="text-yellow-800 space-y-2">
                    {previewPlan.differentiation.forStruggling.map((strategy: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 mt-2"></span>
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {previewPlan.extensions.length > 0 && (
              <div className="bg-white/80 p-8 rounded-xl shadow-lg">
                <h4 className="font-bold text-gray-900 mb-6 text-xl flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-indigo-500" />
                  Extension Activities
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {previewPlan.extensions.map((extension: any, index: number) => (
                    <div key={index} className="bg-indigo-50 p-6 rounded-lg border-2 border-indigo-200">
                      <h5 className="font-bold text-indigo-900 mb-2">{extension.title}</h5>
                      <p className="text-indigo-700 mb-3">{extension.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong className="text-indigo-800">Time:</strong>
                          <p className="text-indigo-700">{extension.timeRequired}</p>
                        </div>
                        <div>
                          <strong className="text-indigo-800">Outcome:</strong>
                          <p className="text-indigo-700">{extension.outcome}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <strong className="text-indigo-800 text-sm">Materials:</strong>
                        <p className="text-indigo-700 text-sm">{extension.materials}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => downloadPlan(previewPlan)}
                className="bg-green-50 hover:bg-green-100 border-green-300 text-green-800 font-semibold"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Complete Plan
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setPreviewPlan(null)}
                className="bg-gray-50 hover:bg-gray-100 font-semibold"
              >
                Close Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-purple-900 mb-4 text-2xl">Professional Lesson Planning Tips</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="text-sm text-purple-800 space-y-3">
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Clear objectives:</strong> Specific, measurable learning outcomes for student success
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Multiple learning styles:</strong> Include visual, auditory, and kinesthetic activities
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Differentiation:</strong> Adapt content for different ability levels and needs
                  </li>
                </ul>
                <ul className="text-sm text-purple-800 space-y-3">
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Assessment integration:</strong> Build assessment naturally into learning activities
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Real-world connections:</strong> Link learning to students' lives and experiences
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Flexible timing:</strong> Allow for adjustments based on student needs and engagement
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
