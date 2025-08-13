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
import LanguageDropdown from "@/components/LanguageDropdown"

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("content")
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* 3D Background with animated elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-4000" />
      </div>

      {/* Header */}
      <header className="relative z-50 bg-background/80 backdrop-blur-xl border-b border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Sahayak AI</h1>
                <p className="text-xs text-gray-400">Visionary Futurist Design</p>
              </div>
            </div>
            <LanguageDropdown />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-4">
              🚀 Next-Generation Educational AI Platform
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Sahayak AI
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Revolutionizing Education with AI-Powered Teaching Tools. Create content, worksheets, assessments, and more with the power of artificial intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="btn-primary px-8 py-4 text-lg">
              <Play className="w-5 h-5 mr-2" />
              Start Creating
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-gray-600 text-gray-300 hover:bg-gray-800">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Section - Interactive Tabs */}
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
      <footer className="relative z-10 bg-background text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Sahayak AI</h3>
                  <p className="text-gray-400 text-sm">The Future of Education is Now</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Empowering educators worldwide with cutting-edge AI technology. Transform your teaching experience with intelligent content generation, assessment tools, and collaborative learning platforms.
              </p>
            </div>
            
            {/* Technology Stack */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Technology Stack</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-gray-400">Google AI (Gemini)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-400">OpenAI Integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-400">Advanced NLP</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-400">Speech API</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-gray-400">Next.js 15</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-400">Teacher Collaboration</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 Sahayak AI - Educational Technology Solution. Powered by Google AI for enhanced learning outcomes.
              </div>
              <div className="flex items-center space-x-6">
                <div className="bg-green-500/20 text-green-300 border border-green-500/30 px-3 py-1 rounded-full flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Production Ready
                </div>
                <div className="text-gray-400 text-sm">Educational Innovation 2025</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}