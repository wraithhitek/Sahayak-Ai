"use client"
import React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Camera,
  MessageCircle,
  PenTool,
  Mic,
  Calendar,
  Sparkles,
  ArrowRight,
  Play,
  Menu,
} from "lucide-react"
import ContentGenerator from "@/components/content-generator"
import WorksheetCreator from "@/components/worksheet-creator"
import KnowledgeBase from "@/components/knowledge-base"
import VisualAidGenerator from "@/components/visual-aid-generator"
import AudioAssessment from "@/components/audio-assessment"
import LessonPlanner from "@/components/lesson-planner"

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("content")
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)

    const script = document.createElement("script")
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    script.async = true
    document.body.appendChild(script)

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,bn,gu,kn,ml,mr,pa,ta,te",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      )
    }
  }, [])

  const features = [
    {
      id: "content",
      title: "Hyper-Local Content Generation",
      description: "Generate culturally relevant educational content in multiple Indian languages.",
      icon: BookOpen,
    },
    {
      id: "worksheet",
      title: "Differentiated Material Creation",
      description: "Instantly generate multiple versions of a worksheet tailored to different grade levels.",
      icon: Camera,
    },
    {
      id: "knowledge",
      title: "Instant Knowledge Base",
      description: "Provide simple, accurate explanations for complex student questions in the local language.",
      icon: MessageCircle,
    },
    {
      id: "visual",
      title: "Visual Aid Design",
      description: "Generate simple line drawings or charts based on a teacher's description.",
      icon: PenTool,
    },
    {
      id: "audio",
      title: "Audio-Based Reading Assessments",
      description: "AI-powered reading fluency and pronunciation assessment using Vertex AI Speech-to-Text.",
      icon: Mic,
    },
    {
      id: "planner",
      title: "AI-Powered Weekly Lesson Planners",
      description: "Structure activities and save teachers valuable time with AI-powered lesson planners.",
      icon: Calendar,
    },
  ]

  const handleExploreFeaturesClick = () => {
    const featuresSection = document.getElementById("features")
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-lg font-medium text-foreground">Loading The Future of Education...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-transparent absolute top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Sahayak AI</h1>
                <p className="text-sm text-gray-400">The Visionary Futurist</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#demo" className="text-gray-300 hover:text-white transition-colors">
                Demo
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
              <div id="google_translate_element"></div>
              <Button className="btn-primary">
                Join the Revolution
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="md:hidden">
              <Button variant="outline" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu />
              </Button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden mt-4 bg-card p-4 rounded-lg">
              <a href="#features" className="block py-2 text-gray-300 hover:text-white">
                Features
              </a>
              <a href="#demo" className="block py-2 text-gray-300 hover:text-white">
                Demo
              </a>
              <a href="#contact" className="block py-2 text-gray-300 hover:text-white">
                Contact
              </a>
              <div id="google_translate_element"></div>
              <Button className="w-full mt-2 btn-primary">
                Join the Revolution
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="hero-bg">
          <div></div>
        </div>
        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            The Future of Education is Here
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Sahayak AI is a visionary agentic AI, designed to empower teachers and revolutionize the classroom
            experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="lg" className="btn-primary" onClick={handleExploreFeaturesClick}>
              Explore the Vision
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
              <Play className="w-5 h-5 mr-2" />
              Watch the Future Unfold
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">A Glimpse into the Future</h3>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our agentic AI is equipped with a suite of powerful features designed to transform education.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.id}
                  className="bg-background rounded-lg shadow-lg hover:shadow-primary/50 transition-shadow duration-300"
                >
                  <CardHeader className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-white">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Experience the Future</h3>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Interact with our agentic AI and witness the power of futuristic education.
            </p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-card text-white">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="worksheet">Worksheet</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
              <TabsTrigger value="visual">Visual Aid</TabsTrigger>
              <TabsTrigger value="audio">Audio Assessment</TabsTrigger>
              <TabsTrigger value="planner">Lesson Planner</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="bg-card p-6 rounded-b-lg">
              <ContentGenerator />
            </TabsContent>
            <TabsContent value="worksheet" className="bg-card p-6 rounded-b-lg">
              <WorksheetCreator />
            </TabsContent>
            <TabsContent value="knowledge" className="bg-card p-6 rounded-b-lg">
              <KnowledgeBase />
            </TabsContent>
            <TabsContent value="visual" className="bg-card p-6 rounded-b-lg">
              <VisualAidGenerator />
            </TabsContent>
            <TabsContent value="audio" className="bg-card p-6 rounded-b-lg">
              <AudioAssessment />
            </TabsContent>
            <TabsContent value="planner" className="bg-card p-6 rounded-b-lg">
              <LessonPlanner />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-4">Join the Vision</h3>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Connect with us to be a part of the educational revolution.
          </p>
          <a href="mailto:wraith.hitek@gmail.com">
            <Button size="lg" className="btn-primary">
              Contact the Future
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-400">&copy; 2025 Sahayak AI. The Future of Education is Now.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
