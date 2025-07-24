"use client"
import React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Camera,
  MessageCircle,
  PenTool,
  Mic,
  Calendar,
  Sparkles,
  Users,
  Globe,
  Zap,
  Heart,
  Award,
  Rocket,
  Brain,
  CheckCircle,
  ArrowRight,
  Play,
  Share2,
  MessageSquare,
  Eye,
  Wand2,
  Clock,
  TrendingUp,
  Menu,
} from "lucide-react"
import ContentGenerator from "@/components/content-generator"
import WorksheetCreator from "@/components/worksheet-creator"
import KnowledgeBase from "@/components/knowledge-base"
import VisualAidGenerator from "@/components/visual-aid-generator"
import AudioAssessment from "@/components/audio-assessment"
import LessonPlanner from "@/components/lesson-planner"
import CollaborationPanel from "@/components/collaboration-panel"
import FloatingElements from "@/components/ui/floating-elements"
import LanguageDropdown from "@/components/LanguageDropdown"
import MultiGradeManager from "@/components/multi-grade-manager"
import StudentProgressTracker from "@/components/student-progress-tracker"

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("content")
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      id: "content",
      title: "📚 Content Generator",
      description: "Generate culturally relevant educational content in multiple Indian languages using Google AI",
      icon: BookOpen,
    },
    {
      id: "worksheet",
      title: "📸 Worksheet Creator",
      description: "Upload textbook images and generate differentiated worksheets using Gemini Vision API",
      icon: Camera,
    },
    {
      id: "knowledge",
      title: "🧠 Knowledge Assistant",
      description: "Provide simple explanations for complex questions with cultural analogies and examples",
      icon: MessageCircle,
    },
    {
      id: "visual",
      title: "🎨 Visual Aid Designer",
      description: "Create educational diagrams and illustrations with step-by-step drawing instructions",
      icon: PenTool,
    },
    {
      id: "audio",
      title: "🎤 Reading Assessment",
      description: "AI-powered reading fluency and pronunciation assessment using Google Speech API",
      icon: Mic,
    },
    {
      id: "planner",
      title: "📅 Lesson Planner",
      description: "Comprehensive lesson planning with cultural intelligence and multi-grade classroom support",
      icon: Calendar,
    },
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-lg font-medium text-gray-600">Loading Sahayak AI...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sahayak AI</h1>
                <p className="text-sm text-gray-500">Your AI Teaching Assistant</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-blue-500 transition-colors">
                Features
              </a>
              <a href="#demo" className="text-gray-600 hover:text-blue-500 transition-colors">
                Demo
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-500 transition-colors">
                Contact
              </a>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Get Started
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
            <div className="md:hidden mt-4">
              <a href="#features" className="block py-2 text-gray-600 hover:text-blue-500">
                Features
              </a>
              <a href="#demo" className="block py-2 text-gray-600 hover:text-blue-500">
                Demo
              </a>
              <a href="#contact" className="block py-2 text-gray-600 hover:text-blue-500">
                Contact
              </a>
              <Button className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Empowering Teachers with AI
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            Sahayak AI is designed to help teachers in multi-grade classrooms in India. We provide AI-powered tools to
            create engaging and culturally relevant educational content.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
              <Rocket className="w-5 h-5 mr-2" />
              Explore Features
            </Button>
            <Button variant="outline" size="lg" className="border-blue-500 text-blue-500 hover:bg-blue-50">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
          <div className="mt-16">
            <Image
              src="/images/sample-diagram-1.png"
              alt="Sahayak AI Interface"
              width={800}
              height={500}
              className="rounded-lg shadow-2xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Features</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a suite of AI-powered tools to help you create amazing educational content.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-500" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-900">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Live Demo</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See our AI tools in action. Select a feature to get started.
            </p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content Generator</TabsTrigger>
              <TabsTrigger value="worksheet">Worksheet Creator</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge Assistant</TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ContentGenerator />
            </TabsContent>
            <TabsContent value="worksheet">
              <WorksheetCreator />
            </TabsContent>
            <TabsContent value="knowledge">
              <KnowledgeBase />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Have questions or want to learn more? We'd love to hear from you.
          </p>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
            <MessageSquare className="w-5 h-5 mr-2" />
            Contact Us
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">About Sahayak AI</h4>
              <p className="text-gray-400">
                Our mission is to empower teachers in India with AI-powered tools to create engaging and culturally
                relevant educational content.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#demo" className="text-gray-400 hover:text-white transition-colors">
                    Demo
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect with Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Share2 />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <MessageSquare />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
            <p>&copy; 2025 Sahayak AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
