"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Clock,
  Users,
  Zap,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Target,
  Timer,
  AlertCircle,
  CheckCircle,
  Calendar,
  Star,
  TrendingUp,
  Activity,
} from "lucide-react"

export default function MultiGradeManager() {
  const [activeTimer, setActiveTimer] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeTimer && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeTimer, timeLeft])

  const startTimer = (duration: number, type: string) => {
    setTimeLeft(duration * 60) // Convert minutes to seconds
    setActiveTimer(type)
  }

  const stopTimer = () => {
    setActiveTimer(null)
    setTimeLeft(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const emergencyLessons = [
    {
      id: "math-5min",
      title: "🔢 Quick Math Challenge",
      duration: 5,
      grades: "1-8",
      description: "Mental math problems adapted for all grade levels",
      activity: "Grade 1-2: Count to 20, Grade 3-5: Times tables, Grade 6-8: Algebra basics",
      materials: "None needed - just voices and minds!",
    },
    {
      id: "story-10min",
      title: "📚 Interactive Story Time",
      duration: 10,
      grades: "1-8",
      description: "Moral story with grade-appropriate discussions",
      activity: "Younger: Listen & repeat, Older: Analyze moral lessons",
      materials: "One story book or memory",
    },
    {
      id: "science-15min",
      title: "🔬 Science Wonder",
      duration: 15,
      grades: "3-8",
      description: "Simple experiment or demonstration",
      activity: "Water cycle demo using classroom materials",
      materials: "Glass, water, paper",
    },
  ]

  const lessonTemplates = [
    {
      id: "hindi-literature",
      title: "📖 Hindi Literature & Moral Values",
      duration: 45,
      grades: "1-8",
      theme: "Panchatantra Stories",
      activities: {
        "Grade 1-2": "Listen to story, draw favorite character",
        "Grade 3-5": "Retell story, identify moral lesson",
        "Grade 6-8": "Analyze characters, write alternative ending",
      },
      materials: ["Panchatantra book", "Drawing paper", "Colored pencils"],
      culturalContext: "Traditional Indian wisdom through storytelling",
      assessment: "Oral storytelling for younger, written analysis for older",
    },
    {
      id: "math-patterns",
      title: "🔢 Mathematics Through Indian Art",
      duration: 50,
      grades: "1-8",
      theme: "Rangoli Patterns & Geometry",
      activities: {
        "Grade 1-2": "Create simple patterns with dots",
        "Grade 3-5": "Measure angles in rangoli designs",
        "Grade 6-8": "Calculate area and symmetry in complex patterns",
      },
      materials: ["Colored chalk", "Measuring tools", "Graph paper"],
      culturalContext: "Mathematics embedded in Indian festival traditions",
      assessment: "Pattern creation and mathematical explanation",
    },
    {
      id: "science-environment",
      title: "🌱 Environmental Science & Local Ecology",
      duration: 40,
      grades: "2-8",
      theme: "Monsoon and Agriculture",
      activities: {
        "Grade 2-4": "Observe and draw monsoon changes",
        "Grade 5-6": "Track rainfall and crop cycles",
        "Grade 7-8": "Analyze climate impact on farming",
      },
      materials: ["Rain gauge", "Plant samples", "Observation sheets"],
      culturalContext: "Understanding local agricultural practices",
      assessment: "Weather diary and crop cycle explanation",
    },
  ]

  const timeStrategies = [
    {
      icon: Users,
      title: "Peer Teaching",
      description: "Grade 6-8 students help Grade 1-3 with basic concepts",
      timeSaved: "15-20 minutes",
      implementation: "Pair older students with younger ones for reading practice",
    },
    {
      icon: RotateCcw,
      title: "Rotation Stations",
      description: "Different activities for different grade levels simultaneously",
      timeSaved: "25-30 minutes",
      implementation: "Set up 3 stations: Reading, Math practice, Art activity",
    },
    {
      icon: Target,
      title: "Common Theme",
      description: "Same topic taught at different complexity levels",
      timeSaved: "20-25 minutes",
      implementation: 'Teach "Water" - Grade 1: Uses, Grade 5: Cycle, Grade 8: Chemistry',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full text-orange-800 text-sm font-bold mb-4">
          <Clock className="w-4 h-4 mr-2" />
          Time Optimization + Multi-Grade Coordination
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">⏰ Multi-Grade Classroom Manager</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Save 2+ hours daily with AI-powered lesson templates, live timers, and emergency activities for multi-grade
          Indian classrooms
        </p>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">📚 Lesson Templates</TabsTrigger>
          <TabsTrigger value="timer">⏱️ Live Timer</TabsTrigger>
          <TabsTrigger value="emergency">🚨 Emergency Lessons</TabsTrigger>
          <TabsTrigger value="strategies">💡 Time Strategies</TabsTrigger>
        </TabsList>

        {/* Lesson Templates */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-6">
            {lessonTemplates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedTemplate === template.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedTemplate(selectedTemplate === template.id ? null : template.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{template.title}</CardTitle>
                      <CardDescription className="mt-2">
                        <Badge className="mr-2">{template.duration} minutes</Badge>
                        <Badge variant="outline" className="mr-2">
                          Grades {template.grades}
                        </Badge>
                        <span className="text-sm text-gray-600">{template.theme}</span>
                      </CardDescription>
                    </div>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        startTimer(template.duration, `template-${template.id}`)
                      }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Lesson
                    </Button>
                  </div>
                </CardHeader>

                {selectedTemplate === template.id && (
                  <CardContent className="pt-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Target className="w-4 h-4 mr-2 text-blue-500" />
                          Grade-wise Activities
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(template.activities).map(([grade, activity]) => (
                            <div key={grade} className="p-3 bg-blue-50 rounded-lg">
                              <div className="font-medium text-blue-800">{grade}:</div>
                              <div className="text-sm text-blue-700">{activity}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-green-500" />
                            Materials Needed
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {template.materials.map((material, idx) => (
                              <li key={idx} className="flex items-center">
                                <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                                {material}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Star className="w-4 h-4 mr-2 text-purple-500" />
                            Cultural Context
                          </h4>
                          <p className="text-sm text-gray-600">{template.culturalContext}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Activity className="w-4 h-4 mr-2 text-orange-500" />
                            Assessment Method
                          </h4>
                          <p className="text-sm text-gray-600">{template.assessment}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Live Timer */}
        <TabsContent value="timer" className="space-y-6">
          <Card className="text-center p-8">
            <div className="mb-6">
              {activeTimer ? (
                <div className="space-y-4">
                  <div className="text-6xl font-bold text-blue-600">{formatTime(timeLeft)}</div>
                  <div className="text-lg text-gray-600">{activeTimer.replace("-", " ").toUpperCase()} in progress</div>
                  <Progress value={(timeLeft / (45 * 60)) * 100} className="w-full max-w-md mx-auto" />
                  <div className="flex justify-center space-x-4">
                    <Button onClick={stopTimer} variant="outline">
                      <Pause className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                    <Button onClick={() => setTimeLeft(timeLeft + 300)} variant="outline">
                      <Clock className="w-4 h-4 mr-2" />
                      +5 min
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Timer className="w-16 h-16 text-gray-400 mx-auto" />
                  <h3 className="text-2xl font-bold text-gray-700">Ready to Start</h3>
                  <p className="text-gray-600">Select a lesson template or emergency activity to begin timing</p>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Timer Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[15, 30, 45, 60].map((minutes) => (
              <Button
                key={minutes}
                variant="outline"
                className="p-4 h-auto flex flex-col bg-transparent"
                onClick={() => startTimer(minutes, `custom-${minutes}`)}
              >
                <Clock className="w-6 h-6 mb-2" />
                <span className="font-bold">{minutes} min</span>
                <span className="text-xs text-gray-500">Custom Timer</span>
              </Button>
            ))}
          </div>
        </TabsContent>

        {/* Emergency Lessons */}
        <TabsContent value="emergency" className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <h3 className="font-semibold text-red-800">Emergency Lesson Bank</h3>
            </div>
            <p className="text-red-700 text-sm mt-1">When you need something RIGHT NOW - no preparation required!</p>
          </div>

          <div className="grid gap-4">
            {emergencyLessons.map((lesson) => (
              <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{lesson.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className="bg-red-100 text-red-800">{lesson.duration} min</Badge>
                        <Badge variant="outline">Grades {lesson.grades}</Badge>
                      </div>
                    </div>
                    <Button
                      onClick={() => startTimer(lesson.duration, `emergency-${lesson.id}`)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Start Now
                    </Button>
                  </div>

                  <p className="text-gray-600 mb-3">{lesson.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Activity: </span>
                      <span className="text-gray-600">{lesson.activity}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Materials: </span>
                      <span className="text-gray-600">{lesson.materials}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Time-Saving Strategies */}
        <TabsContent value="strategies" className="space-y-6">
          <div className="grid gap-6">
            {timeStrategies.map((strategy, index) => {
              const Icon = strategy.icon
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{strategy.title}</h3>
                          <Badge className="bg-green-100 text-green-800">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Saves {strategy.timeSaved}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{strategy.description}</p>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <span className="font-medium text-blue-800">Implementation: </span>
                          <span className="text-blue-700">{strategy.implementation}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Weekly Schedule Template */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Optimal Weekly Schedule Template
              </CardTitle>
              <CardDescription>Suggested time blocks for maximum efficiency in multi-grade classrooms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                  <div key={day} className="space-y-2">
                    <h4 className="font-semibold text-center bg-blue-100 p-2 rounded">{day}</h4>
                    <div className="space-y-1">
                      <div className="p-2 bg-green-50 rounded text-green-800">9:00-9:45 Common Theme</div>
                      <div className="p-2 bg-blue-50 rounded text-blue-800">9:45-10:30 Rotation Stations</div>
                      <div className="p-2 bg-purple-50 rounded text-purple-800">10:30-11:15 Peer Teaching</div>
                      <div className="p-2 bg-orange-50 rounded text-orange-800">11:15-12:00 Individual Work</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
