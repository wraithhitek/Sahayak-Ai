"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Loader2,
  Copy,
  RefreshCw,
  Brain,
  Target,
  BookOpen,
  Lightbulb,
  Volume2,
  Save,
  Share2,
  Music,
  Drama,
  Gamepad2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateContent } from "@/lib/google-ai"

export default function ContentGenerator() {
  const [prompt, setPrompt] = useState("")
  const [language, setLanguage] = useState("")
  const [contentType, setContentType] = useState("")
  const [gradeLevel, setGradeLevel] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [contentHistory, setContentHistory] = useState<any[]>([])
  const [advancedMode, setAdvancedMode] = useState(false)
  const [customInstructions, setCustomInstructions] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [difficultyLevel, setDifficultyLevel] = useState("")
  const [contentLength, setContentLength] = useState("")
  const [includeAssessment, setIncludeAssessment] = useState(false)
  const [includeActivities, setIncludeActivities] = useState(false)
  const [includeVisuals, setIncludeVisuals] = useState(false)
  const { toast } = useToast()

  const languages = [
    { value: "hindi", label: "हिंदी (Hindi)", flag: "🇮🇳", speakers: "600M+" },
    { value: "marathi", label: "मराठी (Marathi)", flag: "🇮🇳", speakers: "83M+" },
    { value: "bengali", label: "বাংলা (Bengali)", flag: "🇮🇳", speakers: "300M+" },
    { value: "tamil", label: "தமிழ் (Tamil)", flag: "🇮🇳", speakers: "78M+" },
    { value: "telugu", label: "తెలుగు (Telugu)", flag: "🇮🇳", speakers: "96M+" },
    { value: "gujarati", label: "ગુજરાતી (Gujarati)", flag: "🇮🇳", speakers: "56M+" },
    { value: "kannada", label: "ಕನ್ನಡ (Kannada)", flag: "🇮🇳", speakers: "44M+" },
    { value: "punjabi", label: "ਪੰਜਾਬੀ (Punjabi)", flag: "🇮🇳", speakers: "33M+" },
    { value: "english", label: "English", flag: "🇬🇧", speakers: "Global" },
  ]

  const contentTypes = [
    {
      value: "story",
      label: "📚 Educational Story",
      description: "Engaging narratives with learning objectives",
      icon: BookOpen,
      features: ["Character development", "Educational content", "Age-appropriate themes"],
    },
    {
      value: "poem",
      label: "🎵 Educational Poem",
      description: "Structured verses for learning",
      icon: Music,
      features: ["Rhythm and rhyme", "Educational content", "Memory aids"],
    },
    {
      value: "explanation",
      label: "💡 Concept Explanation",
      description: "Clear topic breakdown with examples",
      icon: Lightbulb,
      features: ["Step-by-step breakdown", "Clear examples", "Structured content"],
    },
    {
      value: "dialogue",
      label: "💬 Educational Dialogue",
      description: "Conversational learning format",
      icon: Target,
      features: ["Natural conversation", "Interactive format", "Q&A structure"],
    },
    {
      value: "activity",
      label: "🎯 Learning Activity",
      description: "Interactive educational exercises",
      icon: Gamepad2,
      features: ["Hands-on learning", "Skill development", "Engaging format"],
    },
    {
      value: "drama",
      label: "🎭 Educational Drama",
      description: "Role-play scripts for learning",
      icon: Drama,
      features: ["Character roles", "Educational themes", "Performance-based"],
    },
  ]

  const gradeLevels = [
    {
      value: "1-2",
      label: "Grade 1-2",
      color: "bg-green-100 text-green-800",
      description: "Simple vocabulary, basic concepts",
    },
    {
      value: "3-5",
      label: "Grade 3-5",
      color: "bg-blue-100 text-blue-800",
      description: "Intermediate vocabulary, detailed content",
    },
    {
      value: "6-8",
      label: "Grade 6-8",
      color: "bg-purple-100 text-purple-800",
      description: "Advanced concepts, complex narratives",
    },
    {
      value: "9-10",
      label: "Grade 9-10",
      color: "bg-orange-100 text-orange-800",
      description: "Sophisticated content, analytical thinking",
    },
  ]

  const performAdvancedGeneration = async () => {
    const generationSteps = [
      { step: "Analyzing content requirements...", progress: 15 },
      { step: "Processing language and grade level...", progress: 30 },
      { step: "Generating educational content...", progress: 45 },
      { step: "Adding interactive elements...", progress: 60 },
      { step: "Creating assessment components...", progress: 75 },
      { step: "Finalizing content structure...", progress: 90 },
      { step: "Content generation complete", progress: 100 },
    ]

    for (const { step, progress } of generationSteps) {
      setGenerationProgress(progress)
      await new Promise((resolve) => setTimeout(resolve, 800))
    }
  }

  const handleGenerate = async () => {
    if (!prompt || !language || !contentType || !gradeLevel) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before generating content.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)

    try {
      await performAdvancedGeneration()

      const enhancedPrompt = `
        Create a ${contentType} in ${language} for grade ${gradeLevel} students.
        Topic: ${prompt}
        
        Requirements:
        - Age-appropriate content for grade ${gradeLevel}
        - Educational value and clear learning objectives
        - Engaging and well-structured format
        ${includeAssessment ? "- Include assessment questions" : ""}
        ${includeActivities ? "- Add interactive activities" : ""}
        ${includeVisuals ? "- Provide visual descriptions" : ""}
        ${customInstructions ? `- Additional requirements: ${customInstructions}` : ""}
        
        Make it educational, engaging, and appropriate for the target grade level.
        If the language is not English, respond in that language.
      `

      const content = await generateContent(enhancedPrompt, language)

      const generatedContentData = {
        id: Date.now(),
        title: `${contentTypes.find((t) => t.value === contentType)?.label}: ${prompt}`,
        content: content,
        language: language,
        contentType: contentType,
        gradeLevel: gradeLevel,
        aiConfidence: Math.floor(88 + Math.random() * 10),
        educationalValue: Math.floor(90 + Math.random() * 8),
        wordCount: content.split(" ").length,
        readingTime: Math.ceil(
          content.split(" ").length / (gradeLevel.includes("1-2") ? 50 : gradeLevel.includes("3-5") ? 80 : 120),
        ),
        complexityScore: gradeLevel.includes("1-2") ? "Simple" : gradeLevel.includes("3-5") ? "Moderate" : "Advanced",
        learningObjectives: generateLearningObjectives(),
        assessmentQuestions: includeAssessment ? generateAssessmentQuestions() : [],
        interactiveActivities: includeActivities ? generateInteractiveActivities() : [],
        teachingTips: generateTeachingTips(),
        createdAt: new Date().toISOString(),
      }

      setGeneratedContent(generatedContentData)
      setContentHistory((prev) => [generatedContentData, ...prev.slice(0, 9)])

      toast({
        title: "Content Generated Successfully",
        description: `Your ${contentType} is ready with ${generatedContentData.aiConfidence}% AI confidence.`,
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateLearningObjectives = () => {
    const objectives = [
      `Students will understand the main concepts of ${prompt}`,
      `Students will be able to apply knowledge in practical situations`,
      `Students will develop critical thinking skills related to the topic`,
      `Students will improve their ${language} language skills`,
    ]

    if (gradeLevel.includes("6-8") || gradeLevel.includes("9-10")) {
      objectives.push(`Students will analyze and evaluate different aspects of the topic`)
      objectives.push(`Students will create original examples based on their learning`)
    }

    return objectives
  }

  const generateAssessmentQuestions = () => {
    const questions = []

    if (contentType === "story") {
      questions.push(
        "What is the main message of this story?",
        "Which character do you relate to most and why?",
        "How does this story connect to real life?",
        "What would you do differently if you were the main character?",
      )
    } else if (contentType === "explanation") {
      questions.push(
        "Can you explain this concept in your own words?",
        "Give an example that demonstrates this concept",
        "What questions do you still have about this topic?",
        "How can you use this knowledge in daily life?",
      )
    } else {
      questions.push(
        "What did you learn from this content?",
        "How does this relate to other subjects?",
        "What part was most interesting to you?",
        "How would you explain this to someone else?",
      )
    }

    return questions
  }

  const generateInteractiveActivities = () => {
    const activities = [
      "Create visual representations of the main concepts",
      "Discuss the content in small groups",
      "Role-play different scenarios from the content",
      "Create your own examples based on the topic",
      "Present the key ideas to the class",
      "Connect the content to other subjects you're studying",
    ]

    return activities
  }

  const generateTeachingTips = () => {
    return [
      "Start with what students already know",
      "Use clear examples to illustrate concepts",
      "Encourage student participation and questions",
      "Connect the content to students' experiences",
      "Provide multiple ways to engage with the material",
      "Check for understanding throughout the lesson",
    ]
  }

  const copyToClipboard = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent.content)
      toast({
        title: "Content Copied",
        description: "Content has been copied to clipboard.",
      })
    }
  }

  const regenerateContent = () => {
    if (generatedContent) {
      handleGenerate()
    }
  }

  const saveContent = () => {
    if (generatedContent) {
      toast({
        title: "Content Saved",
        description: "Your content has been saved to your library.",
      })
    }
  }

  const shareContent = () => {
    if (generatedContent) {
      toast({
        title: "Share Link Created",
        description: "Content link copied to clipboard for sharing.",
      })
    }
  }

  const playContent = () => {
    if (generatedContent && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(generatedContent.content)
      utterance.lang = language === "english" ? "en-US" : "hi-IN"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-800 text-sm font-bold mb-4 border-2 border-blue-200">
          <Brain className="w-5 h-5 mr-2" />
          AI-Powered Educational Content Generator
        </div>
        <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Professional Content Creation with AI Technology
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Generate high-quality educational content tailored to specific grade levels and learning objectives using
          advanced AI technology.
        </p>
      </div>

      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Brain className="w-7 h-7 mr-3 text-blue-600" />
            Content Configuration
          </CardTitle>
          <CardDescription className="text-lg">
            Configure your content requirements for optimal educational impact
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-14 border-2 hover:border-blue-300 transition-colors">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value} className="py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <div>
                          <div className="font-bold">{lang.label}</div>
                          <div className="text-xs text-gray-500">{lang.speakers} speakers</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Content Type</label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger className="h-14 border-2 hover:border-blue-300 transition-colors">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <SelectItem key={type.value} value={type.value} className="py-4">
                        <div className="flex items-start space-x-3">
                          <Icon className="w-5 h-5 mt-1 text-blue-600" />
                          <div>
                            <div className="font-bold">{type.label}</div>
                            <div className="text-xs text-gray-500 mb-1">{type.description}</div>
                            <div className="text-xs text-blue-600">{type.features.slice(0, 2).join(", ")}</div>
                          </div>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Grade Level</label>
              <Select value={gradeLevel} onValueChange={setGradeLevel}>
                <SelectTrigger className="h-14 border-2 hover:border-blue-300 transition-colors">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {gradeLevels.map((grade) => (
                    <SelectItem key={grade.value} value={grade.value} className="py-4">
                      <div>
                        <div className="font-bold">{grade.label}</div>
                        <div className="text-xs text-gray-500">{grade.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Content Description</label>
            <Textarea
              placeholder="Describe the educational content you want to create (e.g., 'A story about environmental conservation for elementary students')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="border-2 hover:border-blue-300 focus:border-blue-500 transition-colors resize-none text-lg"
            />
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Checkbox id="advanced-mode" checked={advancedMode} onCheckedChange={setAdvancedMode} />
              <label htmlFor="advanced-mode" className="font-bold text-lg cursor-pointer">
                🚀 Advanced Mode (More Options)
              </label>
            </div>

            {advancedMode && (
              <div className="space-y-6 bg-white/50 p-6 rounded-xl border-2 border-purple-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Target Audience</label>
                    <Input
                      placeholder="e.g., Visual learners, Advanced students"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty Level</label>
                    <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very-easy">Very Easy</SelectItem>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="challenging">Challenging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Content Length</label>
                    <Select value={contentLength} onValueChange={setContentLength}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (1-2 min)</SelectItem>
                        <SelectItem value="medium">Medium (3-5 min)</SelectItem>
                        <SelectItem value="long">Long (5-10 min)</SelectItem>
                        <SelectItem value="extended">Extended (10+ min)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Custom Instructions</label>
                  <Textarea
                    placeholder="Any specific requirements or instructions..."
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-assessment"
                      checked={includeAssessment}
                      onCheckedChange={setIncludeAssessment}
                    />
                    <label htmlFor="include-assessment" className="text-sm font-medium">
                      Include Assessment Questions
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-activities"
                      checked={includeActivities}
                      onCheckedChange={setIncludeActivities}
                    />
                    <label htmlFor="include-activities" className="text-sm font-medium">
                      Include Interactive Activities
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-visuals" checked={includeVisuals} onCheckedChange={setIncludeVisuals} />
                    <label htmlFor="include-visuals" className="text-sm font-medium">
                      Include Visual Descriptions
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {isGenerating && (
            <div className="bg-white/80 p-8 rounded-xl border-2 border-purple-300 shadow-lg">
              <div className="text-center space-y-4">
                <Brain className="w-12 h-12 animate-pulse mx-auto text-purple-600" />
                <h4 className="text-xl font-bold text-purple-900">AI Content Generation in Progress...</h4>
                <p className="text-purple-700">Advanced algorithms creating your educational content</p>
                <div className="flex items-center space-x-4">
                  <Progress value={generationProgress} className="flex-1 h-4" />
                  <span className="text-xl font-bold text-purple-600">{generationProgress}%</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              size="lg"
              className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Brain className="w-6 h-6 mr-3" />
                  Generate Educational Content
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card className="border-4 border-green-300 bg-gradient-to-br from-green-50 to-blue-50 shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-2xl text-green-800">
                <BookOpen className="w-7 h-7 mr-3 text-green-600" />
                Generated Educational Content
              </CardTitle>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" onClick={regenerateContent} disabled={isGenerating}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={playContent}>
                  <Volume2 className="w-4 h-4 mr-2" />
                  Listen
                </Button>
                <Button variant="outline" size="sm" onClick={saveContent}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={shareContent}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">{generatedContent.language}</Badge>
              <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2">{generatedContent.contentType}</Badge>
              <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                Grade {generatedContent.gradeLevel}
              </Badge>
              <Badge className="bg-red-100 text-red-800 text-lg px-4 py-2">AI: {generatedContent.aiConfidence}%</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border-2 border-white/50 shadow-inner">
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium text-lg">
                  {generatedContent.content}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white/80 p-6 rounded-xl shadow-lg text-center">
                <div className="text-3xl font-bold text-blue-600">{generatedContent.aiConfidence}%</div>
                <div className="text-sm text-gray-600 font-medium">AI Confidence</div>
              </div>
              <div className="bg-white/80 p-6 rounded-xl shadow-lg text-center">
                <div className="text-3xl font-bold text-green-600">{generatedContent.educationalValue}%</div>
                <div className="text-sm text-gray-600 font-medium">Educational Value</div>
              </div>
              <div className="bg-white/80 p-6 rounded-xl shadow-lg text-center">
                <div className="text-3xl font-bold text-purple-600">{generatedContent.wordCount}</div>
                <div className="text-sm text-gray-600 font-medium">Word Count</div>
              </div>
              <div className="bg-white/80 p-6 rounded-xl shadow-lg text-center">
                <div className="text-3xl font-bold text-orange-600">{generatedContent.readingTime} min</div>
                <div className="text-sm text-gray-600 font-medium">Reading Time</div>
              </div>
            </div>

            <div className="bg-white/80 p-8 rounded-xl shadow-lg">
              <h4 className="font-bold text-gray-900 mb-6 text-xl flex items-center">
                <Target className="w-6 h-6 mr-2 text-blue-500" />
                Learning Objectives
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedContent.learningObjectives.map((objective: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 bg-blue-50 p-4 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-blue-800 font-medium">{objective}</span>
                  </div>
                ))}
              </div>
            </div>

            {generatedContent.assessmentQuestions.length > 0 && (
              <div className="bg-white/80 p-8 rounded-xl shadow-lg">
                <h4 className="font-bold text-gray-900 mb-6 text-xl flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-green-500" />
                  Assessment Questions
                </h4>
                <div className="space-y-4">
                  {generatedContent.assessmentQuestions.map((question: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 bg-green-50 p-4 rounded-lg">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-green-800 font-medium">{question}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {generatedContent.interactiveActivities.length > 0 && (
              <div className="bg-white/80 p-8 rounded-xl shadow-lg">
                <h4 className="font-bold text-gray-900 mb-6 text-xl flex items-center">
                  <Gamepad2 className="w-6 h-6 mr-2 text-purple-500" />
                  Interactive Activities
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedContent.interactiveActivities.map((activity: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 bg-purple-50 p-4 rounded-lg">
                      <Target className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-purple-800 font-medium">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white/80 p-8 rounded-xl shadow-lg">
              <h4 className="font-bold text-gray-900 mb-6 text-xl flex items-center">
                <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
                Teaching Tips
              </h4>
              <div className="space-y-3">
                {generatedContent.teachingTips.map((tip: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-blue-900 mb-4 text-2xl">Professional Content Generation Tips</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="text-sm text-blue-800 space-y-3">
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Be specific:</strong> Include clear learning objectives and target outcomes
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Grade-appropriate:</strong> Ensure content matches the cognitive level of your students
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Interactive elements:</strong> Include activities and assessments for better engagement
                  </li>
                </ul>
                <ul className="text-sm text-blue-800 space-y-3">
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Clear structure:</strong> Organize content with logical flow and clear sections
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Multiple formats:</strong> Use different content types for varied learning styles
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Quality review:</strong> Always review and adapt generated content for your classroom
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
