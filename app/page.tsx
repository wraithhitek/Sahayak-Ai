"use client"

import React from "react"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Camera, MessageCircle, PenTool, Mic, Calendar, Sparkles, Users, Globe, Zap, Heart, Award, Rocket, Brain, CheckCircle, ArrowRight, Play, Share2, MessageSquare, Eye, Wand2 } from 'lucide-react'
import ContentGenerator from "@/components/content-generator"
import WorksheetCreator from "@/components/worksheet-creator"
import KnowledgeBase from "@/components/knowledge-base"
import VisualAidGenerator from "@/components/visual-aid-generator"
import AudioAssessment from "@/components/audio-assessment"
import LessonPlanner from "@/components/lesson-planner"
import CollaborationPanel from "@/components/collaboration-panel"
import FloatingElements from "@/components/ui/floating-elements"
import LanguageDropdown from "@/components/LanguageDropdown"

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("content")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      id: "content",
      title: "📚 Content Generator",
      description: "Generate culturally relevant educational content in multiple Indian languages using Google AI",
      icon: BookOpen,
      color: "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600",
      hoverColor: "hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700",
      badge: "🤖 AI Powered",
      capabilities: ["Multi-language Support", "Cultural Context Integration", "Curriculum Aligned"],
    },
    {
      id: "worksheet",
      title: "📸 Worksheet Creator",
      description: "Upload textbook images and generate differentiated worksheets using Gemini Vision API",
      icon: Camera,
      color: "bg-gradient-to-br from-green-500 via-green-600 to-emerald-600",
      hoverColor: "hover:from-green-600 hover:via-green-700 hover:to-emerald-700",
      badge: "👁️ Vision AI",
      capabilities: ["Image Processing", "Multi-Grade Differentiation", "Auto-Assessment Generation"],
    },
    {
      id: "knowledge",
      title: "🧠 Knowledge Assistant",
      description: "Provide simple explanations for complex questions with cultural analogies and examples",
      icon: MessageCircle,
      color: "bg-gradient-to-br from-purple-500 via-purple-600 to-violet-600",
      hoverColor: "hover:from-purple-600 hover:via-purple-700 hover:to-violet-700",
      badge: "💡 Smart AI",
      capabilities: ["Analogies Generation", "Cultural Examples", "Multi-Language Explanations"],
    },
    {
      id: "visual",
      title: "🎨 Visual Aid Designer",
      description: "Create educational diagrams and illustrations with step-by-step drawing instructions",
      icon: PenTool,
      color: "bg-gradient-to-br from-orange-500 via-orange-600 to-red-500",
      hoverColor: "hover:from-orange-600 hover:via-orange-700 hover:to-red-600",
      badge: "🖌️ Creative AI",
      capabilities: ["SVG Generation", "Drawing Instructions", "Educational Diagrams"],
    },
    {
      id: "audio",
      title: "🎤 Reading Assessment",
      description: "AI-powered reading fluency and pronunciation assessment using Google Speech API",
      icon: Mic,
      color: "bg-gradient-to-br from-red-500 via-pink-500 to-rose-600",
      hoverColor: "hover:from-red-600 hover:via-pink-600 hover:to-rose-700",
      badge: "🔊 Speech AI",
      capabilities: ["Pronunciation Analysis", "Fluency Scoring", "Multi-Language Support"],
    },
    {
      id: "planner",
      title: "📅 Lesson Planner",
      description: "Comprehensive lesson planning with cultural intelligence and multi-grade classroom support",
      icon: Calendar,
      color: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
      hoverColor: "hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600",
      badge: "🎯 Advanced AI",
      capabilities: ["Cultural Intelligence", "Bloom's Taxonomy", "Differentiation Strategies"],
    },
    {
      id: "collaboration",
      title: "👥 Content Collaboration",
      description: "Share and co-develop localized educational content with teachers across India",
      icon: Users,
      color: "bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500",
      hoverColor: "hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600",
      badge: "🤝 Collaboration",
      capabilities: ["Real-time Co-editing", "Content Sharing", "Teacher Networks"],
    },
  ]

  const demoStats = [
    {
      label: "Languages Supported",
      value: "8+",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      description: "Indian Languages",
      note: "Hindi, English, Marathi, Bengali, Tamil, Telugu, Gujarati, Kannada",
    },
    {
      label: "AI Models Integrated",
      value: "4",
      icon: Brain,
      color: "from-green-500 to-emerald-500",
      description: "Google AI APIs",
      note: "Gemini Pro, Vision, Speech-to-Text, Text-to-Speech",
    },
    {
      label: "Content Types",
      value: "6",
      icon: BookOpen,
      color: "from-purple-500 to-violet-500",
      description: "Educational Formats",
      note: "Stories, Worksheets, Explanations, Visual Aids, Assessments, Lesson Plans",
    },
    {
      label: "Grade Levels",
      value: "1-8",
      icon: Award,
      color: "from-orange-500 to-red-500",
      description: "Multi-Grade Support",
      note: "Differentiated content for primary and middle school",
    },
  ]

  const achievements = [
    { icon: Brain, title: "Google AI Integration", description: "Gemini Pro & Vision APIs" },
    { icon: Globe, title: "Multi-Language AI", description: "8+ Indian Languages" },
    { icon: Users, title: "Multi-Grade Support", description: "Differentiated Learning" },
    { icon: Heart, title: "Cultural Intelligence", description: "Context-Aware Content" },
  ]

  const languages = [
    { name: "Hindi", native: "हिंदी", flag: "🇮🇳", coverage: "Primary Focus" },
    { name: "English", native: "English", flag: "🌍", coverage: "Global Standard" },
    { name: "Marathi", native: "मराठी", flag: "🏛️", coverage: "Regional Support" },
    { name: "Bengali", native: "বাংলা", flag: "🐅", coverage: "Regional Support" },
    { name: "Tamil", native: "தமிழ்", flag: "🏛️", coverage: "Regional Support" },
    { name: "Telugu", native: "తెలుగు", flag: "🎭", coverage: "Regional Support" },
    { name: "Gujarati", native: "ગુજરાતી", flag: "🦁", coverage: "Regional Support" },
    { name: "Kannada", native: "ಕನ್ನಡ", flag: "🐘", coverage: "Regional Support" },
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-lg font-medium text-gray-600">Loading Sahayak AI...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated Background */}
      <FloatingElements />

      {/* Enhanced Header */}
      <header className="relative z-20 bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/30 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Sahayak AI
                </h1>
                <p className="text-sm text-gray-600 font-bold">AI Teaching Assistant for Indian Education</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <LanguageDropdown className="rounded-full px-4 py-2 text-sm font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center" />
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 text-sm font-bold">
                <Brain className="w-4 h-4 mr-2" />
                Google AI Powered
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex ml-[400px] item-center mb-[50px] justify-center">
            <div className="inline-flex items-center h-[85px] px-6 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 rounded-full text-purple-800 text-sm font-bold mb-8 border-2 border-purple-200 shadow-lg">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              <p className="mt-[15px]">🇮🇳 Hackathon Project - Google AI for Education 🇮🇳 </p>
              <Sparkles className="w-5 h-5 ml-2 text-yellow-500" />
            </div>
            <div>
              <Image
                src="/images/robot.png"
                alt="Teaching Robot"
                width={220}
                height={220}
                className="cursor-pointer ml-[170px] hover:scale-105 transition-transform "
                onClick={() => router.push('/TeachingInterface')}
              />
            </div>
          </div>
          <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
            AI Teaching Assistant for{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Indian Education
            </span>
          </h2>
          <p className="text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            Addressing real challenges in Indian classrooms: <strong>language barriers</strong>,{" "}
            <strong>resource constraints</strong>, and <strong>multi-grade teaching</strong> through intelligent AI
            solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Button
              size="lg"
              className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 rounded-2xl"
            >
              <Rocket className="w-6 h-6 mr-3" />
              Try Demo Features
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-12 py-6 text-xl font-bold border-2 border-purple-300 text-purple-700 hover:bg-purple-50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-2xl bg-transparent"
            >
              <Play className="w-6 h-6 mr-3" />
              View Presentation
            </Button>
          </div>

          {/* Demo Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {demoStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105"
                >
                  <div
                    className={`flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-6 mx-auto shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-black text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-bold mb-2">{stat.label}</div>
                  <div className="text-xs text-gray-500 mb-2">{stat.description}</div>
                  <div className="text-xs text-blue-600 font-medium">{stat.note}</div>
                </Card>
              )
            })}
          </div>

          {/* Technology Stack */}
          <div className="flex flex-wrap items-center justify-center space-x-8 text-sm text-gray-600 mb-8">
            <div className="flex items-center bg-white/70 px-6 py-3 rounded-full shadow-lg mb-4">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              <span className="font-bold">Google AI Studio</span>
            </div>
            <div className="flex items-center bg-white/70 px-6 py-3 rounded-full shadow-lg mb-4">
              <Brain className="w-5 h-5 mr-2 text-blue-500" />
              <span className="font-bold">Gemini Pro API</span>
            </div>
            <div className="flex items-center bg-white/70 px-6 py-3 rounded-full shadow-lg mb-4">
              <Eye className="w-5 h-5 mr-2 text-green-500" />
              <span className="font-bold">Gemini Vision</span>
            </div>
            <div className="flex items-center bg-white/70 px-6 py-3 rounded-full shadow-lg mb-4">
              <Mic className="w-5 h-5 mr-2 text-red-500" />
              <span className="font-bold">Speech API</span>
            </div>
          </div>
        </div>
      </section>

      {/* Language Support Showcase */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">🌍 Multi-Language AI Support</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed for India's linguistic diversity with AI that understands cultural context and regional nuances
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {languages.map((lang, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">{lang.flag}</div>
                  <div className="font-bold text-lg text-gray-900">{lang.name}</div>
                  <div className="text-sm text-gray-600 mb-2">{lang.native}</div>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">{lang.coverage}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-indigo-800 text-sm font-bold mb-6 border-2 border-indigo-200">
              <Wand2 className="w-5 h-5 mr-2" />
              AI-Powered Educational Tools
            </div>
            <h3 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Comprehensive Teaching Solutions
            </h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Each feature addresses specific challenges in Indian education with advanced AI technology
            </p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={feature.id}
                    className={`cursor-pointer transition-all duration-500 hover:shadow-3xl hover:scale-105 border-0 bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden ${
                      activeTab === feature.id
                        ? "ring-4 ring-blue-500 shadow-3xl scale-105 bg-white/95"
                        : "hover:bg-white/90"
                    }`}
                    onClick={() => setActiveTab(feature.id)}
                  >
                    <CardHeader className="pb-4 relative">
                      {/* Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1">
                          {feature.badge}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 mb-4">
                        <div
                          className={`w-16 h-16 ${feature.color} ${feature.hoverColor} rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-300`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold text-gray-900 mb-2">{feature.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm text-gray-700 leading-relaxed mb-4 font-medium">
                        {feature.description}
                      </CardDescription>
                      {/* Capabilities */}
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-gray-600 mb-2">Key Capabilities:</div>
                        {feature.capabilities.map((capability, i) => (
                          <div key={i} className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                            <span>{capability}</span>
                          </div>
                        ))}
                      </div>
                      {/* Action Button */}
                      <div className="mt-6">
                        <Button
                          size="sm"
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-4 py-2 rounded-xl"
                        >
                          <Rocket className="w-4 h-4 mr-2" />
                          Try Demo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Tab Content */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-3xl border-2 border-white/30 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      {features.find((f) => f.id === activeTab)?.icon &&
                        React.createElement(features.find((f) => f.id === activeTab)!.icon, { className: "w-6 h-6" })}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold">{features.find((f) => f.id === activeTab)?.title}</h4>
                      <p className="text-white/80">{features.find((f) => f.id === activeTab)?.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-white/20 text-white border-white/30">
                      <Eye className="w-3 h-3 mr-1" />
                      Live Demo
                    </Badge>
                  </div>
                </div>
              </div>
              <TabsContent value="content" className="p-8 m-0">
                <ContentGenerator />
              </TabsContent>
              <TabsContent value="worksheet" className="p-8 m-0">
                <WorksheetCreator />
              </TabsContent>
              <TabsContent value="knowledge" className="p-8 m-0">
                <KnowledgeBase />
              </TabsContent>
              <TabsContent value="visual" className="p-8 m-0">
                <VisualAidGenerator />
              </TabsContent>
              <TabsContent value="audio" className="p-8 m-0">
                <AudioAssessment />
              </TabsContent>
              <TabsContent value="planner" className="p-8 m-0">
                <LessonPlanner />
              </TabsContent>
              <TabsContent value="collaboration" className="p-8 m-0">
                <CollaborationPanel />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Technical Achievements */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">🏆 Technical Implementation</h3>
            <p className="text-xl text-gray-600">Advanced AI integration for educational applications</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold">Sahayak AI</h3>
              </div>
              <p className="text-blue-100 mb-6 max-w-md leading-relaxed">
                Advanced AI-powered teaching assistant designed to address critical challenges in Indian education
                systems. Leveraging Google AI technologies to support educators in multi-grade, multilingual classroom
                environments with culturally relevant content generation.
              </p>
              <div className="flex items-center space-x-4">
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Project Details
                </Button>
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Demo
                </Button>
              </div>
            </div>
            {/* Features */}
            <div>
              <h4 className="text-xl font-bold mb-6">🔗 Demo Features</h4>
              <ul className="space-y-3">
                <li>
                  <span className="text-blue-200">Content Generation</span>
                </li>
                <li>
                  <span className="text-blue-200">Worksheet Creation</span>
                </li>
                <li>
                  <span className="text-blue-200">Knowledge Assistant</span>
                </li>
                <li>
                  <span className="text-blue-200">Visual Aid Designer</span>
                </li>
                <li>
                  <span className="text-blue-200">Reading Assessment</span>
                </li>
                <li>
                  <span className="text-blue-200">Lesson Planning</span>
                </li>
                <li>
                  <span className="text-cyan-300">Content Collaboration</span>
                </li>
              </ul>
            </div>
            {/* Technology Stack */}
            <div>
              <h4 className="text-xl font-bold mb-6">⚡ Technology</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-blue-200">Google AI Studio</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-200">Gemini Pro API</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-blue-200">Gemini Vision</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-blue-200">Speech API</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-blue-200">Next.js 15</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <span className="text-blue-200">Teacher Collaboration</span>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Section */}
          <div className="border-t border-white/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-blue-200 text-sm mb-4 md:mb-0">
                © 2025 Sahayak AI - Educational Technology Solution. Powered by Google AI for enhanced learning
                outcomes.
              </div>
              <div className="flex items-center space-x-6">
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Production Ready
                </Badge>
                <div className="text-blue-200 text-sm">Educational Innovation 2025</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
