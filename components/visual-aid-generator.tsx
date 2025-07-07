"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Loader2,
  PenTool,
  Download,
  Eye,
  Palette,
  ImageIcon,
  Sparkles,
  Target,
  Brain,
  BarChart3,
  GitBranch,
  Map,
  Clock,
  Lightbulb,
  HelpCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function VisualAidGenerator() {
  const [description, setDescription] = useState("")
  const [visualType, setVisualType] = useState("")
  const [complexity, setComplexity] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVisuals, setGeneratedVisuals] = useState<any[]>([])
  const [previewVisual, setPreviewVisual] = useState<any>(null)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")
  const { toast } = useToast()

  const visualTypes = [
    {
      value: "diagram",
      label: "🔬 Scientific Diagram",
      description: "Detailed scientific and educational diagrams",
      icon: Target,
      examples: ["Cell structure", "Water cycle", "Plant anatomy", "Human body systems"],
    },
    {
      value: "chart",
      label: "📊 Data Chart",
      description: "Bar charts, pie charts, line graphs, data visualization",
      icon: BarChart3,
      examples: ["Population growth", "Weather data", "Survey results", "Comparison charts"],
    },
    {
      value: "flowchart",
      label: "🔄 Process Flowchart",
      description: "Step-by-step processes and decision trees",
      icon: GitBranch,
      examples: ["Problem solving steps", "Scientific method", "Decision making", "Algorithms"],
    },
    {
      value: "illustration",
      label: "🎨 Educational Illustration",
      description: "Artistic drawings and visual representations",
      icon: Palette,
      examples: ["Story scenes", "Historical events", "Concept visualization", "Abstract ideas"],
    },
    {
      value: "map",
      label: "🗺️ Educational Map",
      description: "Geographic, conceptual, and mind maps",
      icon: Map,
      examples: ["World geography", "Mind maps", "Concept relationships", "Historical timelines"],
    },
    {
      value: "timeline",
      label: "⏰ Interactive Timeline",
      description: "Historical events and process sequences",
      icon: Clock,
      examples: ["Historical periods", "Life cycles", "Project timelines", "Evolution"],
    },
  ]

  const complexityLevels = [
    {
      value: "simple",
      label: "🟢 Simple",
      description: "Basic shapes, minimal details, perfect for grades 1-3",
      estimatedTime: "3-5 minutes",
    },
    {
      value: "moderate",
      label: "🟡 Moderate",
      description: "Some details and labels, ideal for grades 4-6",
      estimatedTime: "5-8 minutes",
    },
    {
      value: "detailed",
      label: "🔴 Detailed",
      description: "Comprehensive with annotations, suitable for grades 7+",
      estimatedTime: "8-12 minutes",
    },
  ]

  const performAdvancedGeneration = async () => {
    const generationSteps = [
      { step: "🧠 Analyzing your request with AI...", progress: 15 },
      { step: "🎨 Designing visual layout and structure...", progress: 30 },
      { step: "📐 Creating geometric elements and shapes...", progress: 45 },
      { step: "🏷️ Adding labels and annotations...", progress: 60 },
      { step: "🎯 Optimizing for educational use...", progress: 75 },
      { step: "📚 Generating teaching instructions...", progress: 90 },
      { step: "✨ Finalizing visual aid...", progress: 100 },
    ]

    for (const { step, progress } of generationSteps) {
      setCurrentStep(step)
      setGenerationProgress(progress)
      await new Promise((resolve) => setTimeout(resolve, 600))
    }
  }

  // FIXED: Dynamic SVG generation based on actual user input
  const generateDynamicSVG = (desc: string, type: string, complexity: string) => {
    const uniqueId = Date.now()
    const description = desc.toLowerCase()

    // FIXED: Analyze user input to generate appropriate content
    if (type === "diagram") {
      // Science diagrams
      if (
        description.includes("water cycle") ||
        description.includes("evaporation") ||
        description.includes("precipitation")
      ) {
        return generateWaterCycleDiagram(desc, complexity, uniqueId)
      }
      if (description.includes("plant") || description.includes("photosynthesis") || description.includes("leaf")) {
        return generatePlantDiagram(desc, complexity, uniqueId)
      }
      if (description.includes("cell") || description.includes("biology") || description.includes("organism")) {
        return generateCellDiagram(desc, complexity, uniqueId)
      }
      if (description.includes("solar system") || description.includes("planet") || description.includes("space")) {
        return generateSolarSystemDiagram(desc, complexity, uniqueId)
      }
      if (description.includes("human") || description.includes("body") || description.includes("anatomy")) {
        return generateHumanBodyDiagram(desc, complexity, uniqueId)
      }
      if (description.includes("food") || description.includes("chain") || description.includes("ecosystem")) {
        return generateFoodChainDiagram(desc, complexity, uniqueId)
      }
      // Default educational diagram
      return generateEducationalDiagram(desc, complexity, uniqueId)
    }

    if (type === "chart") {
      if (description.includes("population") || description.includes("growth") || description.includes("demographic")) {
        return generatePopulationChart(desc, complexity, uniqueId)
      }
      if (description.includes("weather") || description.includes("temperature") || description.includes("climate")) {
        return generateWeatherChart(desc, complexity, uniqueId)
      }
      if (description.includes("pie") || description.includes("percentage") || description.includes("proportion")) {
        return generatePieChart(desc, complexity, uniqueId)
      }
      if (description.includes("comparison") || description.includes("compare") || description.includes("versus")) {
        return generateComparisonChart(desc, complexity, uniqueId)
      }
      // Default data chart
      return generateDataChart(desc, complexity, uniqueId)
    }

    if (type === "flowchart") {
      if (
        description.includes("scientific method") ||
        description.includes("experiment") ||
        description.includes("hypothesis")
      ) {
        return generateScientificMethodFlowchart(desc, complexity, uniqueId)
      }
      if (
        description.includes("problem solving") ||
        description.includes("decision") ||
        description.includes("process")
      ) {
        return generateProblemSolvingFlowchart(desc, complexity, uniqueId)
      }
      // Default flowchart
      return generateProcessFlowchart(desc, complexity, uniqueId)
    }

    if (type === "timeline") {
      if (
        description.includes("history") ||
        description.includes("historical") ||
        description.includes("civilization")
      ) {
        return generateHistoricalTimeline(desc, complexity, uniqueId)
      }
      if (description.includes("life cycle") || description.includes("development") || description.includes("growth")) {
        return generateLifeCycleTimeline(desc, complexity, uniqueId)
      }
      // Default timeline
      return generateEventTimeline(desc, complexity, uniqueId)
    }

    if (type === "map") {
      if (description.includes("world") || description.includes("country") || description.includes("continent")) {
        return generateWorldMap(desc, complexity, uniqueId)
      }
      if (description.includes("mind") || description.includes("concept") || description.includes("idea")) {
        return generateMindMap(desc, complexity, uniqueId)
      }
      // Default map
      return generateEducationalMap(desc, complexity, uniqueId)
    }

    if (type === "illustration") {
      if (description.includes("story") || description.includes("narrative") || description.includes("character")) {
        return generateStoryIllustration(desc, complexity, uniqueId)
      }
      if (description.includes("concept") || description.includes("abstract") || description.includes("idea")) {
        return generateConceptIllustration(desc, complexity, uniqueId)
      }
      // Default illustration
      return generateEducationalIllustration(desc, complexity, uniqueId)
    }

    // Fallback to generic visual
    return generateGenericVisual(desc, type, complexity, uniqueId)
  }

  // FIXED: Food chain diagram generator
  const generateFoodChainDiagram = (desc: string, complexity: string, id: number) => {
    const isDetailed = complexity === "detailed"

    return `
      <svg width="700" height="500" viewBox="0 0 700 500" style="margin: 0 auto; display: block;">
        <defs>
          <linearGradient id="grassGradient${id}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#90EE90;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#228B22;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="rabbitGradient${id}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#DEB887;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#8B7355;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="foxGradient${id}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#FF6347;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#CD5C5C;stop-opacity:1" />
          </linearGradient>
          <marker id="arrowhead${id}" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#2F4F2F"/>
          </marker>
        </defs>
        
        <rect width="700" height="500" fill="#E6F3FF" stroke="#4682B4" strokeWidth="2"/>
        
        <text x="350" y="30" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#2F4F2F">
          ${desc.charAt(0).toUpperCase() + desc.slice(1)}
        </text>
        
        <!-- Sun -->
        <circle cx="600" cy="80" r="30" fill="#FFD700" stroke="#FFA500" strokeWidth="3"/>
        <text x="600" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#8B4513">Sun</text>
        
        <!-- Grass (Producer) -->
        <rect x="80" y="350" width="120" height="80" fill="url(#grassGradient${id})" stroke="#228B22" strokeWidth="3" rx="10"/>
        <text x="140" y="385" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">Grass</text>
        <text x="140" y="405" textAnchor="middle" fontSize="12" fill="white">(Producer)</text>
        
        <!-- Rabbit (Primary Consumer) -->
        <ellipse cx="300" cy="380" rx="60" ry="40" fill="url(#rabbitGradient${id})" stroke="#8B7355" strokeWidth="3"/>
        <circle cx="285" cy="370" r="3" fill="black"/>
        <circle cx="315" cy="370" r="3" fill="black"/>
        <ellipse cx="300" cy="385" rx="8" ry="5" fill="#FFB6C1"/>
        <text x="300" y="440" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#8B4513">Rabbit</text>
        <text x="300" y="455" textAnchor="middle" fontSize="12" fill="#8B4513">(Primary Consumer)</text>
        
        <!-- Fox (Secondary Consumer) -->
        <ellipse cx="520" cy="380" rx="70" ry="45" fill="url(#foxGradient${id})" stroke="#CD5C5C" strokeWidth="3"/>
        <polygon points="480,370 490,360 500,370" fill="#FF6347"/>
        <circle cx="505" cy="370" r="3" fill="black"/>
        <circle cx="535" cy="370" r="3" fill="black"/>
        <polygon points="520,385 525,390 515,390" fill="black"/>
        <text x="520" y="440" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">Fox</text>
        <text x="520" y="455" textAnchor="middle" fontSize="12" fill="white">(Secondary Consumer)</text>
        
        <!-- Energy flow arrows -->
        <path d="M 200 390 L 240 390" stroke="#2F4F2F" strokeWidth="4" markerEnd="url(#arrowhead${id})"/>
        <text x="220" y="380" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2F4F2F">Energy</text>
        
        <path d="M 360 390 L 450 390" stroke="#2F4F2F" strokeWidth="4" markerEnd="url(#arrowhead${id})"/>
        <text x="405" y="380" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2F4F2F">Energy</text>
        
        <!-- Sun energy to grass -->
        <path d="M 580 110 Q 400 200 160 340" stroke="#FFD700" strokeWidth="3" strokeDasharray="5,5"/>
        <text x="400" y="180" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#FF8C00">Solar Energy</text>
        
        ${
          isDetailed
            ? `
          <!-- Decomposer -->
          <circle cx="350" cy="150" r="40" fill="#8B4513" stroke="#654321" strokeWidth="3"/>
          <text x="350" y="155" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">Mushroom</text>
          <text x="350" y="200" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#8B4513">(Decomposer)</text>
          
          <!-- Decomposition arrows -->
          <path d="M 320 180 Q 280 250 200 350" stroke="#8B4513" strokeWidth="2" strokeDasharray="3,3"/>
          <path d="M 380 180 Q 420 250 500 350" stroke="#8B4513" strokeWidth="2" strokeDasharray="3,3"/>
          
          <!-- Energy levels -->
          <rect x="50" y="50" width="200" height="120" fill="rgba(255,255,255,0.9)" stroke="#2F4F2F" strokeWidth="2"/>
          <text x="150" y="70" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2F4F2F">Energy Pyramid</text>
          <rect x="70" y="80" width="160" height="20" fill="#FF6347"/>
          <text x="150" y="95" textAnchor="middle" fontSize="10" fill="white">Secondary Consumer (10%)</text>
          <rect x="70" y="105" width="160" height="25" fill="#DEB887"/>
          <text x="150" y="122" textAnchor="middle" fontSize="10" fill="black">Primary Consumer (100%)</text>
          <rect x="70" y="135" width="160" height="30" fill="#90EE90"/>
          <text x="150" y="155" textAnchor="middle" fontSize="10" fill="black">Producer (1000%)</text>
        `
            : ""
        }
        
        <!-- Food chain flow -->
        <rect x="50" y="470" width="600" height="25" fill="rgba(255,255,255,0.9)" stroke="#2F4F2F" strokeWidth="2"/>
        <text x="350" y="487" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2F4F2F">
          Food Chain: Sun → Grass → Rabbit → Fox ${isDetailed ? "→ Decomposer" : ""}
        </text>
      </svg>
    `
  }

  // FIXED: Water cycle diagram
  const generateWaterCycleDiagram = (desc: string, complexity: string, id: number) => {
    const isDetailed = complexity === "detailed"

    return `
      <svg width="700" height="500" viewBox="0 0 700 500" style="margin: 0 auto; display: block;">
        <defs>
          <linearGradient id="skyGradient${id}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#E0F6FF;stop-opacity:1" />
          </linearGradient>
          <radialGradient id="sunGradient${id}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
          </radialGradient>
          <marker id="arrowhead${id}" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#4682B4"/>
          </marker>
        </defs>
        
        <!-- Sky background -->
        <rect width="700" height="350" fill="url(#skyGradient${id})"/>
        
        <text x="350" y="30" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1F2937">
          ${desc.charAt(0).toUpperCase() + desc.slice(1)}
        </text>
        
        <!-- Sun -->
        <circle cx="600" cy="80" r="40" fill="url(#sunGradient${id})" stroke="#FF8C00" strokeWidth="3"/>
        <text x="600" y="85" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#8B4513">Sun</text>
        
        <!-- Clouds -->
        <g fill="#F0F8FF" stroke="#B0C4DE" strokeWidth="2">
          <ellipse cx="250" cy="90" rx="80" ry="35"/>
          <ellipse cx="200" cy="105" rx="50" ry="25"/>
          <ellipse cx="300" cy="105" rx="50" ry="25"/>
          <ellipse cx="225" cy="75" rx="35" ry="20"/>
          <ellipse cx="275" cy="75" rx="35" ry="20"/>
        </g>
        <text x="250" y="95" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4682B4">Clouds</text>
        
        <!-- Mountains -->
        <polygon points="50,350 200,200 350,350" fill="#8FBC8F" stroke="#556B2F" strokeWidth="3"/>
        <polygon points="250,350 400,180 550,350" fill="#9ACD32" stroke="#556B2F" strokeWidth="3"/>
        
        <!-- Ocean -->
        <rect x="0" y="350" width="700" height="150" fill="#4682B4" stroke="#191970" strokeWidth="3"/>
        <path d="M 0 360 Q 50 350 100 360 T 200 360 T 300 360 T 400 360 T 500 360 T 600 360 T 700 360" 
              stroke="#87CEEB" strokeWidth="3" fill="none"/>
        <text x="350" y="425" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">Ocean</text>
        
        <!-- Evaporation arrows -->
        <g stroke="#4682B4" strokeWidth="4" fill="none" markerEnd="url(#arrowhead${id})">
          <path d="M 200 340 Q 220 320 240 300">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
          </path>
          <path d="M 300 340 Q 320 320 340 300">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.5s" repeatCount="indefinite"/>
          </path>
          <path d="M 400 340 Q 420 320 440 300">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1s" repeatCount="indefinite"/>
          </path>
        </g>
        <text x="320" y="290" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4682B4">Evaporation</text>
        
        <!-- Precipitation -->
        <g fill="#4682B4">
          ${Array.from(
            { length: 8 },
            (_, i) => `
            <ellipse cx="${200 + i * 15}" cy="${140 + (i % 3) * 10}" rx="3" ry="10">
              <animate attributeName="cy" values="${140 + (i % 3) * 10};${
                200 + (i % 3) * 10
              };${140 + (i % 3) * 10}" dur="1.5s" begin="${i * 0.2}s" repeatCount="indefinite"/>
            </ellipse>
          `,
          ).join("")}
        </g>
        <text x="250" y="160" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4682B4">Precipitation</text>
        
        <!-- Condensation -->
        <path d="M 350 300 Q 300 200 250 120" stroke="#4682B4" strokeWidth="4" strokeDasharray="5,5" markerEnd="url(#arrowhead${id})"/>
        <text x="300" y="210" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4682B4">Condensation</text>
        
        ${
          isDetailed
            ? `
          <!-- Collection/Runoff -->
          <path d="M 150 350 Q 200 370 250 350" stroke="#4682B4" strokeWidth="4" markerEnd="url(#arrowhead${id})"/>
          <text x="200" y="380" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4682B4">Collection</text>
          
          <!-- Transpiration from trees -->
          <g fill="#228B22" stroke="#006400" strokeWidth="2">
            <rect x="480" y="300" width="20" height="50"/>
            <ellipse cx="490" cy="290" rx="25" ry="20"/>
          </g>
          <path d="M 490 280 Q 500 260 510 240" stroke="#4682B4" strokeWidth="3" strokeDasharray="3,3" markerEnd="url(#arrowhead${id})"/>
          <text x="520" y="260" fontSize="12" fontWeight="bold" fill="#4682B4">Transpiration</text>
          
          <!-- Groundwater -->
          <rect x="0" y="450" width="700" height="50" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
          <text x="350" y="475" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">Groundwater</text>
          
          <!-- Process labels -->
          <rect x="20" y="20" width="200" height="100" fill="rgba(255,255,255,0.9)" stroke="#4682B4" strokeWidth="2"/>
          <text x="120" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4682B4">Water Cycle Steps:</text>
          <text x="30" y="60" fontSize="12" fill="#4682B4">1. Evaporation</text>
          <text x="30" y="75" fontSize="12" fill="#4682B4">2. Condensation</text>
          <text x="30" y="90" fontSize="12" fill="#4682B4">3. Precipitation</text>
          <text x="30" y="105" fontSize="12" fill="#4682B4">4. Collection</text>
        `
            : ""
        }
      </svg>
    `
  }

  // FIXED: Plant diagram generator
  const generatePlantDiagram = (desc: string, complexity: string, id: number) => {
    const isDetailed = complexity === "detailed"

    return `
      <svg width="600" height="700" viewBox="0 0 600 700" style="margin: 0 auto; display: block;">
        <defs>
          <linearGradient id="leafGradient${id}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#90EE90;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#228B22;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="stemGradient${id}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#8FBC8F;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#556B2F;stop-opacity:1" />
          </linearGradient>
          <radialGradient id="flowerGradient${id}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#FFB6C1;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FF69B4;stop-opacity:1" />
          </radialGradient>
        </defs>
        
        <rect width="600" height="700" fill="#E6F3FF" stroke="#4682B4" strokeWidth="2"/>
        
        <text x="300" y="30" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#2F4F2F">
          ${desc.charAt(0).toUpperCase() + desc.slice(1)}
        </text>
        
        <!-- Flower -->
        <g transform="translate(300,80)">
          <circle cx="0" cy="0" r="8" fill="#FFD700"/>
          ${Array.from(
            { length: 6 },
            (_, i) => `
            <ellipse cx="${Math.cos((i * 60 * Math.PI) / 180) * 15}" cy="${Math.sin((i * 60 * Math.PI) / 180) * 15}" 
                     rx="12" ry="6" fill="url(#flowerGradient${id})" 
                     transform="rotate(${i * 60} ${Math.cos((i * 60 * Math.PI) / 180) * 15} ${
                       Math.sin((i * 60 * Math.PI) / 180) * 15
                     })"/>
          `,
          ).join("")}
        </g>
        <text x="350" y="85" fontSize="14" fontWeight="bold" fill="#FF69B4">Flower</text>
        
        <!-- Leaves -->
        <g fill="url(#leafGradient${id})" stroke="#228B22" strokeWidth="2">
          <!-- Left leaves -->
          <ellipse cx="200" cy="150" rx="40" ry="20" transform="rotate(-30 200 150)"/>
          <path d="M 200 150 L 240 140" stroke="#228B22" strokeWidth="2"/>
          
          <ellipse cx="180" cy="220" rx="35" ry="18" transform="rotate(-45 180 220)"/>
          <path d="M 180 220 L 215 205" stroke="#228B22" strokeWidth="2"/>
          
          <ellipse cx="190" cy="300" rx="38" ry="19" transform="rotate(-35 190 300)"/>
          <path d="M 190 300 L 225 285" stroke="#228B22" strokeWidth="2"/>
          
          <!-- Right leaves -->
          <ellipse cx="400" cy="170" rx="40" ry="20" transform="rotate(30 400 170)"/>
          <path d="M 400 170 L 360 160" stroke="#228B22" strokeWidth="2"/>
          
          <ellipse cx="420" cy="240" rx="35" ry="18" transform="rotate(45 420 240)"/>
          <path d="M 420 240 L 385 225" stroke="#228B22" strokeWidth="2"/>
          
          <ellipse cx="410" cy="320" rx="38" ry="19" transform="rotate(35 410 320)"/>
          <path d="M 410 320 L 375 305" stroke="#228B22" strokeWidth="2"/>
        </g>
        
        <!-- Stem -->
        <rect x="290" y="90" width="20" height="400" fill="url(#stemGradient${id})" stroke="#556B2F" strokeWidth="3"/>
        <text x="330" y="290" fontSize="14" fontWeight="bold" fill="#556B2F">Stem</text>
        
        <!-- Roots -->
        <g stroke="#8B4513" strokeWidth="4" fill="none">
          <path d="M 300 490 Q 250 520 200 550"/>
          <path d="M 300 490 Q 350 520 400 550"/>
          <path d="M 300 490 Q 280 530 260 570"/>
          <path d="M 300 490 Q 320 530 340 570"/>
          <path d="M 300 490 L 300 580"/>
          
          <!-- Secondary roots -->
          <path d="M 250 530 Q 230 540 210 560" strokeWidth="2"/>
          <path d="M 350 530 Q 370 540 390 560" strokeWidth="2"/>
          <path d="M 280 550 Q 260 560 240 580" strokeWidth="2"/>
          <path d="M 320 550 Q 340 560 360 580" strokeWidth="2"/>
        </g>
        <text x="300" y="610" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#8B4513">Roots</text>
        
        <!-- Soil line -->
        <rect x="0" y="480" width="600" height="220" fill="#8B4513" opacity="0.3"/>
        <line x1="0" y1="480" x2="600" y2="480" stroke="#654321" strokeWidth="3"/>
        <text x="50" y="500" fontSize="14" fontWeight="bold" fill="#654321">Soil</text>
        
        ${
          isDetailed
            ? `
          <!-- Sun -->
          <circle cx="500" cy="60" r="30" fill="#FFD700" stroke="#FFA500" strokeWidth="3"/>
          <text x="500" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#8B4513">Sun</text>
          
          <!-- Photosynthesis arrows -->
          <path d="M 470 80 Q 400 100 330 120" stroke="#FFD700" strokeWidth="3" strokeDasharray="5,5"/>
          <text x="400" y="110" fontSize="12" fontWeight="bold" fill="#FF8C00">Sunlight</text>
          
          <!-- CO2 arrows -->
          <path d="M 100 100 Q 200 110 280 120" stroke="#87CEEB" strokeWidth="3" strokeDasharray="3,3"/>
          <text x="150" y="115" fontSize="12" fontWeight="bold" fill="#4682B4">CO₂</text>
          
          <!-- O2 arrows -->
          <path d="M 320 120 Q 400 110 500 100" stroke="#90EE90" strokeWidth="3" strokeDasharray="3,3"/>
          <text x="410" y="115" fontSize="12" fontWeight="bold" fill="#228B22">O₂</text>
          
          <!-- Water arrows -->
          <path d="M 300 580 Q 300 530 300 480" stroke="#4682B4" strokeWidth="3" strokeDasharray="2,2"/>
          <text x="320" y="530" fontSize="12" fontWeight="bold" fill="#4682B4">H₂O</text>
          
          <!-- Function labels -->
          <rect x="20" y="620" width="250" height="70" fill="rgba(255,255,255,0.9)" stroke="#2F4F2F" strokeWidth="2"/>
          <text x="145" y="640" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2F4F2F">Plant Functions:</text>
          <text x="30" y="655" fontSize="12" fill="#2F4F2F">• Photosynthesis in leaves</text>
          <text x="30" y="670" fontSize="12" fill="#2F4F2F">• Water transport in stem</text>
          <text x="30" y="685" fontSize="12" fill="#2F4F2F">• Nutrient absorption in roots</text>
          
          <!-- Leaf detail -->
          <g transform="translate(450,200)">
            <ellipse cx="0" cy="0" rx="30" ry="15" fill="url(#leafGradient${id})" stroke="#228B22" strokeWidth="2"/>
            <path d="M -20 -5 L 20 5" stroke="#228B22" strokeWidth="1"/>
            <path d="M -15 0 L 15 0" stroke="#228B22" strokeWidth="1"/>
            <path d="M -10 5 L 10 -5" stroke="#228B22" strokeWidth="1"/>
            <text x="0" y="25" textAnchor="middle" fontSize="10" fill="#228B22">Leaf Veins</text>
          </g>
        `
            : ""
        }
        
        <!-- Labels with lines -->
        <g stroke="#2F4F2F" strokeWidth="1" fill="none">
          <path d="M 240 150 L 160 130"/>
          <path d="M 360 170 L 440 150"/>
          <path d="M 310 200 L 370 180"/>
          <path d="M 300 400 L 370 420"/>
          <path d="M 300 550 L 370 570"/>
        </g>
        
        <text x="150" y="125" fontSize="12" fontWeight="bold" fill="#228B22">Leaves</text>
        <text x="450" y="145" fontSize="12" fontWeight="bold" fill="#228B22">Leaves</text>
        <text x="380" y="175" fontSize="12" fontWeight="bold" fill="#556B2F">Branch</text>
        <text x="380" y="415" fontSize="12" fontWeight="bold" fill="#556B2F">Stem</text>
        <text x="380" y="565" fontSize="12" fontWeight="bold" fill="#8B4513">Root System</text>
      </svg>
    `
  }

  // FIXED: Cell diagram generator
  const generateCellDiagram = (desc: string, complexity: string, id: number) => {
    const isDetailed = complexity === "detailed"

    return `
      <svg width="600" height="500" viewBox="0 0 600 500" style="margin: 0 auto; display: block;">
        <defs>
          <radialGradient id="cellGradient${id}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#E6F3FF;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#B0E0E6;stop-opacity:1" />
          </radialGradient>
          <radialGradient id="nucleusGradient${id}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#FFB6C1;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FF69B4;stop-opacity:1" />
          </radialGradient>
        </defs>
        
        <rect width="600" height="500" fill="#F0F8FF" stroke="#4682B4" strokeWidth="2"/>
        
        <text x="300" y="30" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#2F4F2F">
          ${desc.charAt(0).toUpperCase() + desc.slice(1)}
        </text>
        
        <!-- Cell membrane -->
        <ellipse cx="300" cy="250" rx="250" ry="180" fill="url(#cellGradient${id})" stroke="#4682B4" strokeWidth="4"/>
        <text x="500" y="100" fontSize="14" fontWeight="bold" fill="#4682B4">Cell Membrane</text>
        
        <!-- Nucleus -->
        <ellipse cx="300" cy="220" rx="80" ry="60" fill="url(#nucleusGradient${id})" stroke="#FF1493" strokeWidth="3"/>
        <text x="300" y="225" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">Nucleus</text>
        
        <!-- Nucleolus -->
        <circle cx="300" cy="210" r="15" fill="#8B008B"/>
        <text x="330" y="200" fontSize="12" fontWeight="bold" fill="#8B008B">Nucleolus</text>
        
        <!-- Mitochondria -->
        <g fill="#FF6347" stroke="#CD5C5C" strokeWidth="2">
          <ellipse cx="180" cy="180" rx="25" ry="15"/>
          <path d="M 165 180 Q 180 175 195 180 Q 180 185 165 180" fill="#CD5C5C"/>
          
          <ellipse cx="420" cy="200" rx="25" ry="15"/>
          <path d="M 405 200 Q 420 195 435 200 Q 420 205 405 200" fill="#CD5C5C"/>
          
          <ellipse cx="200" cy="320" rx="25" ry="15"/>
          <path d="M 185 320 Q 200 315 215 320 Q 200 325 185 320" fill="#CD5C5C"/>
        </g>
        <text x="150" y="170" fontSize="12" fontWeight="bold" fill="#CD5C5C">Mitochondria</text>
        
        <!-- Endoplasmic Reticulum -->
        <g fill="none" stroke="#9370DB" strokeWidth="3">
          <path d="M 120 200 Q 140 190 160 200 Q 180 210 200 200 Q 220 190 240 200"/>
          <path d="M 120 220 Q 140 210 160 220 Q 180 230 200 220 Q 220 210 240 220"/>
          <path d="M 120 240 Q 140 230 160 240 Q 180 250 200 240 Q 220 230 240 240"/>
        </g>
        <text x="120" y="260" fontSize="12" fontWeight="bold" fill="#9370DB">Endoplasmic Reticulum</text>
        
        <!-- Ribosomes -->
        <g fill="#8B4513">
          <circle cx="130" cy="195" r="3"/>
          <circle cx="150" cy="205" r="3"/>
          <circle cx="170" cy="195" r="3"/>
          <circle cx="190" cy="205" r="3"/>
          <circle cx="210" cy="195" r="3"/>
          <circle cx="230" cy="205" r="3"/>
        </g>
        <text x="130" y="280" fontSize="12" fontWeight="bold" fill="#8B4513">Ribosomes</text>
        
        <!-- Golgi Apparatus -->
        <g fill="none" stroke="#DAA520" strokeWidth="3">
          <path d="M 380 280 Q 400 270 420 280"/>
          <path d="M 380 290 Q 400 280 420 290"/>
          <path d="M 380 300 Q 400 290 420 300"/>
          <path d="M 380 310 Q 400 300 420 310"/>
        </g>
        <text x="380" y="330" fontSize="12" fontWeight="bold" fill="#DAA520">Golgi Apparatus</text>
        
        <!-- Vacuole -->
        <circle cx="450" cy="320" r="40" fill="#E0FFFF" stroke="#00CED1" strokeWidth="3"/>
        <text x="450" y="325" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#008B8B">Vacuole</text>
        
        ${
          isDetailed
            ? `
          <!-- Lysosomes -->
          <g fill="#FF4500" stroke="#FF6347" strokeWidth="2">
            <circle cx="150" cy="300" r="12"/>
            <circle cx="350" cy="160" r="12"/>
            <circle cx="380" cy="350" r="12"/>
          </g>
          <text x="120" y="320" fontSize="12" fontWeight="bold" fill="#FF4500">Lysosomes</text>
          
          <!-- Cytoplasm -->
          <text x="250" y="350" fontSize="14" fontWeight="bold" fill="#4682B4">Cytoplasm</text>
          
          <!-- Centrioles -->
          <g fill="#2F4F2F" stroke="#556B2F" strokeWidth="2">
            <rect x="340" y="120" width="8" height="20" rx="2"/>
            <rect x="352" y="120" width="8" height="20" rx="2"/>
          </g>
          <text x="340" y="110" fontSize="12" fontWeight="bold" fill="#2F4F2F">Centrioles</text>
          
          <!-- Cell functions -->
          <rect x="20" y="350" width="200" height="120" fill="rgba(255,255,255,0.9)" stroke="#2F4F2F" strokeWidth="2"/>
          <text x="120" y="370" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2F4F2F">Cell Functions:</text>
          <text x="30" y="385" fontSize="11" fill="#2F4F2F">• Nucleus: Controls cell activities</text>
          <text x="30" y="400" fontSize="11" fill="#2F4F2F">• Mitochondria: Energy production</text>
          <text x="30" y="415" fontSize="11" fill="#2F4F2F">• ER: Protein synthesis</text>
          <text x="30" y="430" fontSize="11" fill="#2F4F2F">• Golgi: Protein processing</text>
          <text x="30" y="445" fontSize="11" fill="#2F4F2F">• Vacuole: Storage</text>
          <text x="30" y="460" fontSize="11" fill="#2F4F2F">• Lysosomes: Waste removal</text>
        `
            : ""
        }
        
        <!-- Connecting lines -->
        <g stroke="#2F4F2F" strokeWidth="1" fill="none" strokeDasharray="2,2">
          <path d="M 380 220 L 450 180"/>
          <path d="M 220 180 L 180 150"/>
          <path d="M 400 280 L 450 260"/>
          <path d="M 450 280 L 500 260"/>
        </g>
      </svg>
    `
  }

  // FIXED: Solar system diagram
  const generateSolarSystemDiagram = (desc: string, complexity: string, id: number) => {
    const isDetailed = complexity === "detailed"

    return `
      <svg width="800" height="600" viewBox="0 0 800 600" style="margin: 0 auto; display: block;">
        <defs>
          <radialGradient id="sunGradient${id}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
          </radialGradient>
          <radialGradient id="earthGradient${id}" cx="30%" cy="30%" r="70%">
            <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#4682B4;stop-opacity:1" />
          </radialGradient>
        </defs>
        
        <rect width="800" height="600" fill="#000011" stroke="#4682B4" strokeWidth="2"/>
        
        <!-- Stars -->
        ${Array.from(
          { length: 50 },
          (_, i) => `
          <circle cx="${Math.random() * 800}" cy="${Math.random() * 600}" r="1" fill="white">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="${2 + Math.random() * 3}s" repeatCount="indefinite"/>
          </circle>
        `,
        ).join("")}
        
        <text x="400" y="30" textAnchor="middle" fontSize="24" fontWeight="bold" fill="white">
          ${desc.charAt(0).toUpperCase() + desc.slice(1)}
        </text>
        
        <!-- Sun -->
        <circle cx="400" cy="300" r="30" fill="url(#sunGradient${id})" stroke="#FF8C00" strokeWidth="3">
          <animate attributeName="r" values="28;32;28" dur="3s" repeatCount="indefinite"/>
        </circle>
        <text x="400" y="305" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#8B4513">Sun</text>
        
        <!-- Orbital paths -->
        <g fill="none" stroke="#333" strokeWidth="1" strokeDasharray="3,3">
          <ellipse cx="400" cy="300" rx="80" ry="75"/>
          <ellipse cx="400" cy="300" rx="110" ry="105"/>
          <ellipse cx="400" cy="300" rx="140" ry="135"/>
          <ellipse cx="400" cy="300" rx="180" ry="175"/>
          <ellipse cx="400" cy="300" rx="220" ry="215"/>
          <ellipse cx="400" cy="300" rx="260" ry="255"/>
          <ellipse cx="400" cy="300" rx="300" ry="295"/>
          <ellipse cx="400" cy="300" rx="340" ry="335"/>
        </g>
        
        <!-- Mercury -->
        <circle cx="480" cy="300" r="4" fill="#8C7853">
          <animateTransform attributeName="transform" type="rotate" values="0 400 300;360 400 300" dur="8s" repeatCount="indefinite"/>
        </circle>
        <text x="485" y="295" fontSize="10" fill="#8C7853">Mercury</text>
        
        <!-- Venus -->
        <circle cx="510" cy="300" r="6" fill="#FFC649">
          <animateTransform attributeName="transform" type="rotate" values="0 400 300;360 400 300" dur="12s" repeatCount="indefinite"/>
        </circle>
        <text x="515" y="295" fontSize="10" fill="#FFC649">Venus</text>
        
        <!-- Earth -->
        <circle cx="540" cy="300" r="8" fill="url(#earthGradient${id})">
          <animateTransform attributeName="transform" type="rotate" values="0 400 300;360 400 300" dur="16s" repeatCount="indefinite"/>
        </circle>
        <circle cx="548" cy="295" r="2" fill="#C0C0C0">
          <animateTransform attributeName="transform" type="rotate" values="0 540 300;360 540 300" dur="2s" repeatCount="indefinite"/>
        </circle>
        <text x="545" y="285" fontSize="10" fill="#87CEEB">Earth</text>
        
        <!-- Mars -->
        <circle cx="580" cy="300" r="6" fill="#CD5C5C">
          <animateTransform attributeName="transform" type="rotate" values="0 400 300;360 400 300" dur="20s" repeatCount="indefinite"/>
        </circle>
        <text x="585" y="295" fontSize="10" fill="#CD5C5C">Mars</text>
        
        <!-- Jupiter -->
        <circle cx="620" cy="300" r="16" fill="#D2691E">
          <animateTransform attributeName="transform" type="rotate" values="0 400 300;360 400 300" dur="28s" repeatCount="indefinite"/>
        </circle>
        <text x="625" y="290" fontSize="10" fill="#D2691E">Jupiter</text>
        
        <!-- Saturn -->
        <circle cx="660" cy="300" r="14" fill="#FAD5A5">
          <animateTransform attributeName="transform" type="rotate" values="0 400 300;360 400 300" dur="36s" repeatCount="indefinite"/>
        </circle>
        <ellipse cx="660" cy="300" rx="22" ry="4" fill="none" stroke="#FAD5A5" strokeWidth="2">
          <animateTransform attributeName="transform" type="rotate" values="0 400 300;360 400 300" dur="36s" repeatCount="indefinite"/>
        </ellipse>
        <text x="665" y="285" fontSize="10" fill="#FAD5A5">Saturn</text>
        
        <!-- Uranus -->
        <circle cx="700" cy="300" r="10" fill="#4FD0E7">
          <animateTransform attributeName="transform" type="rotate" values="0 400 300;360 400 300" dur="44s" repeatCount="indefinite"/>
        </circle>
        <text x="705" y="295" fontSize="10" fill="#4FD0E7">Uranus</text>
        
        <!-- Neptune -->
        <circle cx="740" cy="300" r="10" fill="#4169E1">
          <animateTransform attributeName="transform" type="rotate" values="0 400 300;360 400 300" dur="52s" repeatCount="indefinite"/>
        </circle>
        <text x="745" y="295" fontSize="10" fill="#4169E1">Neptune</text>
        
        ${
          isDetailed
            ? `
          <!-- Asteroid Belt -->
          ${Array.from(
            { length: 20 },
            (_, i) => `
            <circle cx="${590 + Math.random() * 40}" cy="${280 + Math.random() * 40}" r="1" fill="#8B7355">
              <animateTransform attributeName="transform" type="rotate" values="0 400 300;360 400 300" dur="${
                24 + Math.random() * 8
              }s" repeatCount="indefinite"/>
            </circle>
          `,
          ).join("")}
          <text x="610" y="350" fontSize="12" fill="#8B7355">Asteroid Belt</text>
          
          <!-- Planet information -->
          <rect x="20" y="450" width="760" height="130" fill="rgba(0,0,0,0.8)" stroke="#4682B4" strokeWidth="2"/>
          <text x="400" y="470" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">Solar System Facts</text>
          
          <g fill="white" fontSize="12">
            <text x="30" y="490">Mercury: Closest to Sun, 88 Earth days orbit</text>
            <text x="30" y="505">Venus: Hottest planet, thick atmosphere</text>
            <text x="30" y="520">Earth: Only known planet with life</text>
            <text x="30" y="535">Mars: Red planet, has polar ice caps</text>
            
            <text x="420" y="490">Jupiter: Largest planet, Great Red Spot</text>
            <text x="420" y="505">Saturn: Famous rings, less dense than water</text>
            <text x="420" y="520">Uranus: Tilted on its side, ice giant</text>
            <text x="420" y="535">Neptune: Windiest planet, deep blue color</text>
          </g>
          
          <!-- Distance scale -->
          <text x="400" y="560" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#FFD700">
            Not to scale - Actual distances are much greater!
          </text>
        `
            : ""
        }
      </svg>
    `
  }

  // FIXED: Human body diagram
  const generateHumanBodyDiagram = (desc: string, complexity: string, id: number) => {
    const isDetailed = complexity === "detailed"

    return `
      <svg width="500" height="700" viewBox="0 0 500 700" style="margin: 0 auto; display: block;">
        <defs>
          <linearGradient id="skinGradient${id}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#FDBCB4;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#E8A798;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <rect width="500" height="700" fill="#F0F8FF" stroke="#4682B4" strokeWidth="2"/>
        
        <text x="250" y="30" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#2F4F2F">
          ${desc.charAt(0).toUpperCase() + desc.slice(1)}
        </text>
        
        <!-- Head -->
        <circle cx="250" cy="100" r="40" fill="url(#skinGradient${id})" stroke="#D2691E" strokeWidth="2"/>
        <text x="300" y="105" fontSize="14" fontWeight="bold" fill="#8B4513">Head/Brain</text>
        
        <!-- Eyes -->
        <circle cx="235" cy="95" r="3" fill="black"/>
        <circle cx="265" cy="95" r="3" fill="black"/>
        
        <!-- Nose -->
        <path d="M 250 100 L 248 108 L 252 108 Z" fill="#D2691E"/>
        
        <!-- Mouth -->
        <path d="M 240 110 Q 250 115 260 110" stroke="#8B4513" strokeWidth="2" fill="none"/>
        
        <!-- Neck -->
        <rect x="235" y="140" width="30" height="30" fill="url(#skinGradient${id})" stroke="#D2691E" strokeWidth="2"/>
        
        <!-- Torso -->
        <rect x="200" y="170" width="100" height="200" fill="url(#skinGradient${id})" stroke="#D2691E" strokeWidth="2" rx="20"/>
        
        <!-- Heart -->
        <path d="M 230 200 Q 225 195 220 200 Q 215 205 220 210 L 230 220 L 240 210 Q 245 205 240 200 Q 235 195 230 200 Z" 
              fill="#FF0000" stroke="#8B0000" strokeWidth="2"/>
        <text x="260" y="210" fontSize="12" fontWeight="bold" fill="#FF0000">Heart</text>
        
        <!-- Lungs -->
        <ellipse cx="210" cy="230" rx="15" ry="25" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2"/>
        <ellipse cx="290" cy="230" rx="15" ry="25" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2"/>
        <text x="320" y="235" fontSize="12" fontWeight="bold" fill="#FF69B4">Lungs</text>
        
        <!-- Stomach -->
        <ellipse cx="250" cy="280" rx="25" ry="20" fill="#DDA0DD" stroke="#9370DB" strokeWidth="2"/>
        <text x="280" y="285" fontSize="12" fontWeight="bold" fill="#9370DB">Stomach</text>
        
        <!-- Liver -->
        <path d="M 270 260 Q 290 255 295 270 Q 290 285 270 280 Z" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
        <text x="300" y="270" fontSize="12" fontWeight="bold" fill="#8B4513">Liver</text>
        
        <!-- Arms -->
        <rect x="120" y="180" width="80" height="20" fill="url(#skinGradient${id})" stroke="#D2691E" strokeWidth="2" rx="10"/>
        <rect x="300" y="180" width="80" height="20" fill="url(#skinGradient${id})" stroke="#D2691E" strokeWidth="2" rx="10"/>
        
        <!-- Hands -->
        <circle cx="110" cy="190" r="15" fill="url(#skinGradient${id})" stroke="#D2691E" strokeWidth="2"/>
        <circle cx="390" cy="190" r="15" fill="url(#skinGradient${id})" stroke="#D2691E" strokeWidth="2"/>
        
        <!-- Legs -->
        <rect x="220" y="370" width="25" height="150" fill="url(#skinGradient${id})" stroke="#D2691E" strokeWidth="2" rx="12"/>
        <rect x="255" y="370" width="25" height="150" fill="url(#skinGradient${id})" stroke="#D2691E" strokeWidth="2" rx="12"/>
        
        <!-- Knees -->
        <circle cx="232" cy="450" r="8" fill="#D2691E"/>
        <circle cx="267" cy="450" r="8" fill="#D2691E"/>
        
        <!-- Feet -->
        <ellipse cx="232" cy="540" rx="20" ry="10" fill="url(#skinGradient${id})" stroke="#D2691E" strokeWidth="2"/>
        <ellipse cx="267" cy="540" rx="20" ry="10" fill="url(#skinGradient${id})" stroke="#D2691E" strokeWidth="2"/>
        
        ${
          isDetailed
            ? `
          <!-- Skeleton overlay -->
          <g stroke="#F5F5DC" strokeWidth="3" fill="none" opacity="0.7">
            <!-- Skull -->
            <circle cx="250" cy="100" r="35"/>
            
            <!-- Spine -->
            <line x1="250" y1="140" x2="250" y2="370"/>
            
            <!-- Ribs -->
            <path d="M 230 180 Q 200 190 230 200"/>
            <path d="M 270 180 Q 300 190 270 200"/>
            <path d="M 230 200 Q 200 210 230 220"/>
            <path d="M 270 200 Q 300 210 270 220"/>
            <path d="M 230 220 Q 200 230 230 240"/>
            <path d="M 270 220 Q 300 230 270 240"/>
            
            <!-- Arm bones -->
            <line x1="200" y1="180" x2="130" y2="190"/>
            <line x1="300" y1="180" x2="370" y2="190"/>
            
            <!-- Leg bones -->
            <line x1="232" y1="370" x2="232" y2="520"/>
            <line x1="267" y1="370" x2="267" y2="520"/>
          </g>
          
          <!-- Additional organs -->
          <ellipse cx="220" cy="320" rx="12" ry="20" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
          <ellipse cx="280" cy="320" rx="12" ry="20" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
          <text x="300" y="325" fontSize="10" fill="#8B4513">Kidneys</text>
          
          <!-- Intestines -->
          <path d="M 230 310 Q 220 330 240 340 Q 260 330 250 350 Q 240 360 260 365 Q 280 360 270 340" 
                stroke="#DDA0DD" strokeWidth="8" fill="none"/>
          <text x="290" y="350" fontSize="10" fill="#9370DB">Intestines</text>
          
          <!-- Body systems info -->
          <rect x="20" y="570" width="460" height="120" fill="rgba(255,255,255,0.9)" stroke="#2F4F2F" strokeWidth="2"/>
          <text x="250" y="590" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#2F4F2F">Body Systems</text>
          
          <g fontSize="11" fill="#2F4F2F">
            <text x="30" y="610">• Circulatory: Heart pumps blood through body</text>
            <text x="30" y="625">• Respiratory: Lungs exchange oxygen and CO₂</text>
            <text x="30" y="640">• Digestive: Stomach and intestines process food</text>
            <text x="30" y="655">• Nervous: Brain controls body functions</text>
            <text x="30" y="670">• Skeletal: Bones provide structure and support</text>
          </g>
        `
            : ""
        }
        
        <!-- System labels -->
        <g stroke="#2F4F2F" strokeWidth="1" fill="none" strokeDasharray="2,2">
          <path d="M 300 105 L 350 80"/>
          <path d="M 260 210 L 320 190"/>
          <path d="M 320 235 L 370 220"/>
          <path d="M 280 285 L 330 270"/>
        </g>
        
        <text x="360" y="75" fontSize="12" fontWeight="bold" fill="#8B4513">Brain</text>
        <text x="330" y="185" fontSize="12" fontWeight="bold" fill="#FF0000">Circulatory</text>
        <text x="380" y="215" fontSize="12" fontWeight="bold" fill="#FF69B4">Respiratory</text>
        <text x="340" y="265" fontSize="12" fontWeight="bold" fill="#9370DB">Digestive</text>
      </svg>
    `
  }

  // Additional diagram generators for other types...
  const generateEducationalDiagram = (desc: string, complexity: string, id: number) => {
    return `
      <svg width="600" height="400" viewBox="0 0 600 400" style="margin: 0 auto; display: block;">
        <rect width="600" height="400" fill="#F0F8FF" stroke="#4682B4" strokeWidth="2"/>
        <text x="300" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#2F4F2F">
          ${desc.charAt(0).toUpperCase() + desc.slice(1)}
        </text>
        
        <!-- Central concept -->
        <circle cx="300" cy="200" r="60" fill="#FFE4B5" stroke="#DEB887" strokeWidth="3"/>
        <text x="300" y="205" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#8B4513">Main Concept</text>
        
        <!-- Connected elements -->
        <g fill="#E6E6FA" stroke="#9370DB" strokeWidth="2">
          <circle cx="150" cy="120" r="40"/>
          <circle cx="450" cy="120" r="40"/>
          <circle cx="150" cy="280" r="40"/>
          <circle cx="450" cy="280" r="40"/>
        </g>
        
        <!-- Connecting lines -->
        <g stroke="#4682B4" strokeWidth="3">
          <line x1="260" y1="160" x2="190" y2="140"/>
          <line x1="340" y1="160" x2="410" y2="140"/>
          <line x1="260" y1="240" x2="190" y2="260"/>
          <line x1="340" y1="240" x2="410" y2="260"/>
        </g>
        
        <text x="150" y="125" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4B0082">Element 1</text>
        <text x="450" y="125" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4B0082">Element 2</text>
        <text x="150" y="285" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4B0082">Element 3</text>
        <text x="450" y="285" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4B0082">Element 4</text>
      </svg>
    `
  }

  const generateDataChart = (desc: string, complexity: string, id: number) => {
    const data = [
      { label: "Category A", value: 25, color: "#FF6B6B" },
      { label: "Category B", value: 35, color: "#4ECDC4" },
      { label: "Category C", value: 20, color: "#45B7D1" },
      { label: "Category D", value: 30, color: "#96CEB4" },
      { label: "Category E", value: 15, color: "#FFEAA7" },
    ]

    return `
      <svg width="600" height="400" viewBox="0 0 600 400" style="margin: 0 auto; display: block;">
        <rect width="600" height="400" fill="#F8F9FA" stroke="#4682B4" strokeWidth="2"/>
        <text x="300" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#2F4F2F">
          ${desc.charAt(0).toUpperCase() + desc.slice(1)}
        </text>
        
        <!-- Chart axes -->
        <line x1="80" y1="50" x2="80" y2="320" stroke="#333" strokeWidth="2"/>
        <line x1="80" y1="320" x2="520" y2="320" stroke="#333" strokeWidth="2"/>
        
        <!-- Y-axis labels -->
        <g fontSize="12" fill="#666">
          <text x="70" y="60" textAnchor="end">40</text>
          <text x="70" y="125" textAnchor="end">30</text>
          <text x="70" y="190" textAnchor="end">20</text>
          <text x="70" y="255" textAnchor="end">10</text>
          <text x="70" y="320" textAnchor="end">0</text>
        </g>
        
        <!-- Bars -->
        ${data
          .map(
            (item, index) => `
          <rect x="${100 + index * 80}" y="${320 - item.value * 6.5}" width="60" height="${item.value * 6.5}" 
                fill="${item.color}" stroke="#333" strokeWidth="1"/>
          <text x="${130 + index * 80}" y="${340}" textAnchor="middle" fontSize="12" fill="#333">
            ${item.label}
          </text>
          <text x="${130 + index * 80}" y="${315 - item.value * 6.5}" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">
            ${item.value}
          </text>
        `,
          )
          .join("")}
        
        <!-- Title and legend -->
        <text x="300" y="370" textAnchor="middle" fontSize="14" fill="#666">Data Categories</text>
        <text x="50" y="200" textAnchor="middle" fontSize="14" fill="#666" transform="rotate(-90 50 200)">Values</text>
      </svg>
    `
  }

  const generateProcessFlowchart = (desc: string, complexity: string, id: number) => {
    return `
      <svg width="700" height="500" viewBox="0 0 700 500" style="margin: 0 auto; display: block;">
        <defs>
          <marker id="arrowhead${id}" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#4682B4"/>
          </marker>
        </defs>
        
        <rect width="700" height="500" fill="#F0F8FF" stroke="#4682B4" strokeWidth="2"/>
        <text x="350" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#2F4F2F">
          ${desc.charAt(0).toUpperCase() + desc.slice(1)}
        </text>
        
        <!-- Start -->
        <ellipse cx="350" cy="80" rx="60" ry="30" fill="#90EE90" stroke="#228B22" strokeWidth="3"/>
        <text x="350" y="85" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#006400">Start</text>
        
        <!-- Process 1 -->
        <rect x="280" y="140" width="140" height="60" fill="#FFE4B5" stroke="#DEB887" strokeWidth="3" rx="10"/>
        <text x="350" y="175" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#8B4513">Process Step 1</text>
        
        <!-- Decision -->
        <polygon points="350,240 400,280 350,320 300,280" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="3"/>
        <text x="350" y="285" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#8B008B">Decision?</text>
        
        <!-- Process 2A -->
        <rect x="180" y="360" width="120" height="50" fill="#E0E0E0" stroke="#808080" strokeWidth="3" rx="10"/>
        <text x="240" y="390" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2F4F2F">Process 2A</text>
        
        <!-- Process 2B -->
        <rect x="420" y="360" width="120" height="50" fill="#E0E0E0" stroke="#808080" strokeWidth="3" rx="10"/>
        <text x="480" y="390" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2F4F2F">Process 2B</text>
        
        <!-- End -->
        <ellipse cx="350" cy="450" rx="60" ry="30" fill="#FFB6C1" stroke="#FF1493" strokeWidth="3"/>
        <text x="350" y="455" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#8B008B">End</text>
        
        <!-- Arrows -->
        <g stroke="#4682B4" strokeWidth="3" markerEnd="url(#arrowhead${id})">
          <line x1="350" y1="110" x2="350" y2="140"/>
          <line x1="350" y1="200" x2="350" y2="240"/>
          <line x1="320" y1="300" x2="270" y2="340"/>
          <line x1="380" y1="300" x2="450" y2="340"/>
          <line x1="240" y1="410" x2="320" y2="430"/>
          <line x1="480" y1="410" x2="380" y2="430"/>
        </g>
        
        <!-- Labels -->
        <text x="280" y="325" fontSize="12" fontWeight="bold" fill="#228B22">Yes</text>
        <text x="420" y="325" fontSize="12" fontWeight="bold" fill="#DC143C">No</text>
      </svg>
    `
  }

  const generateEventTimeline = (desc: string, complexity: string, id: number) => {
    const events = [
      { year: "2020", event: "Event A", color: "#FF6B6B" },
      { year: "2021", event: "Event B", color: "#4ECDC4" },
      { year: "2022", event: "Event C", color: "#45B7D1" },
      { year: "2023", event: "Event D", color: "#96CEB4" },
      { year: "2024", event: "Event E", color: "#FFEAA7" },
    ]

    return `
      <svg width="800" height="300" viewBox="0 0 800 300" style="margin: 0 auto; display: block;">
        <rect width="800" height="300" fill="#F8F9FA" stroke="#4682B4" strokeWidth="2"/>
        <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#2F4F2F">
          ${desc.charAt(0).toUpperCase() + desc.slice(1)}
        </text>
        
        <!-- Timeline line -->
        <line x1="100" y1="150" x2="700" y2="150" stroke="#333" strokeWidth="4"/>
        
        <!-- Events -->
        ${events
          .map(
            (event, index) => `
          <g>
            <circle cx="${120 + index * 140}" cy="150" r="12" fill="${event.color}" stroke="#333" strokeWidth="3"/>
            <text x="${120 + index * 140}" y="155" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">
              ${index + 1}
            </text>
            <rect x="${70 + index * 140}" y="80" width="100" height="50" fill="${
              event.color
            }" stroke="#333" strokeWidth="2" rx="5"/>
            <text x="${120 + index * 140}" y="100" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">
              ${event.year}
            </text>
            <text x="${120 + index * 140}" y="115" textAnchor="middle" fontSize="10" fill="white">
              ${event.event}
            </text>
            <line x1="${120 + index * 140}" y1="130" x2="${120 + index * 140}" y2="138" stroke="#333" strokeWidth="2"/>
            
            <rect x="${70 + index * 140}" y="170" width="100" height="40" fill="rgba(255,255,255,0.9)" stroke="#333" strokeWidth="1" rx="5"/>
            <text x="${120 + index * 140}" y="185" textAnchor="middle" fontSize="10" fill="#333">
              Description of
            </text>
            <text x="${120 + index * 140}" y="200" textAnchor="middle" fontSize="10" fill="#333">
              ${event.event}
            </text>
          </g>
        `,
          )
          .join("")}
      </svg>
    `
  }

  const generateEducationalMap = (desc: string, complexity: string, id: number) => {
    return `
      <svg width="600" height="400" viewBox="0 0 600 400" style="margin: 0 auto; display: block;">
        <rect width="600" height="400" fill="#E6F3FF" stroke="#4682B4" strokeWidth="2"/>
        <text x="300" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#2F4F2F">
          ${desc.charAt(0).toUpperCase() + desc.slice(1)}
        </text>
        
        <!-- Central topic -->
        <circle cx="300" cy="200" r="50" fill="#FFD700" stroke="#FFA500" strokeWidth="3"/>
        <text x="300" y="205" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#8B4513">Central Topic</text>
        
        <!-- Branches -->
        <g stroke="#4682B4" strokeWidth="3">
          <line x1="300" y1="150" x2="300" y2="100"/>
          <line x1="350" y1="200" x2="450" y2="200"/>
          <line x1="300" y1="250" x2="300" y2="300"/>
          <line x1="250" y1="200" x2="150" y2="200"/>
          <line x1="335" y1="165" x2="400" y2="120"/>
          <line x1="265" y1="165" x2="200" y2="120"/>
          <line x1="335" y1="235" x2="400" y2="280"/>
          <line x1="265" y1="235" x2="200" y2="280"/>
        </g>
        
        <!-- Sub-topics -->
        <g fill="#98FB98" stroke="#228B22" strokeWidth="2">
          <circle cx="300" cy="80" r="30"/>
          <circle cx="470" cy="200" r="30"/>
          <circle cx="300" cy="320" r="30"/>
          <circle cx="130" cy="200" r="30"/>
          <circle cx="420" cy="100" r="25"/>
          <circle cx="180" cy="100" r="25"/>
          <circle cx="420" cy="300" r="25"/>
          <circle cx="180" cy="300" r="25"/>
        </g>
        
        <!-- Labels -->
        <g fontSize="12" fontWeight="bold" fill="#006400" textAnchor="middle">
          <text x="300" y="85">Topic 1</text>
          <text x="470" y="205">Topic 2</text>
          <text x="300" y="325">Topic 3</text>
          <text x="130" y="205">Topic 4</text>
          <text x="420" y="105">Sub A</text>
          <text x="180" y="105">Sub B</text>
          <text x="420" y="305">Sub C</text>
          <text x="180" y="305">Sub D</text>
        </g>
      </svg>
    `
  }

  const generateEducationalIllustration = (desc: string, complexity: string, id: number) => {
    return `
      <svg width="600" height="400" viewBox="0 0 600 400" style="margin: 0 auto; display: block;">
        <rect width="600" height="400" fill="#FFF8DC" stroke="#4682B4" strokeWidth="2"/>
        <text x="300" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#2F4F2F">
          ${desc.charAt(0).toUpperCase() + desc.slice(1)}
        </text>
        
        <!-- Illustration elements -->
        <g fill="#87CEEB" stroke="#4682B4" strokeWidth="2">
          <rect x="100" y="100" width="400" height="200" rx="20"/>
        </g>
        
        <!-- Content placeholder -->
        <circle cx="200" cy="150" r="30" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2"/>
        <rect x="280" y="120" width="120" height="60" fill="#98FB98" stroke="#228B22" strokeWidth="2" rx="10"/>
        <polygon points="350,220 400,180 450,220 450,260 350,260" fill="#DDA0DD" stroke="#9370DB" strokeWidth="2"/>
        
        <!-- Labels -->
        <text x="200" y="155" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#8B008B">Element A</text>
        <text x="340" y="155" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#006400">Element B</text>
        <text x="400" y="245" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4B0082">Element C</text>
        
        <!-- Decorative elements -->
        <g fill="#FFD700" opacity="0.7">
          <circle cx="150" cy="80" r="5"/>
          <circle cx="450" cy="90" r="5"/>
          <circle cx="120" cy="320" r="5"/>
          <circle cx="480" cy="330" r="5"/>
        </g>
        
        <text x="300" y="370" textAnchor="middle" fontSize="14" fill="#666">Educational Illustration</text>
      </svg>
    `
  }

  // Additional generators for other chart types...
  const generatePopulationChart = (desc: string, complexity: string, id: number) => {
    return generateDataChart(desc, complexity, id) // Reuse data chart with population context
  }

  const generateWeatherChart = (desc: string, complexity: string, id: number) => {
    return generateDataChart(desc, complexity, id) // Reuse data chart with weather context
  }

  const generatePieChart = (desc: string, complexity: string, id: number) => {
    const data = [
      { label: "Section A", value: 30, color: "#FF6B6B" },
      { label: "Section B", value: 25, color: "#4ECDC4" },
      { label: "Section C", value: 20, color: "#45B7D1" },
      { label: "Section D", value: 15, color: "#96CEB4" },
      { label: "Section E", value: 10, color: "#FFEAA7" },
    ]

    let currentAngle = 0
    const centerX = 300
    const centerY = 200
    const radius = 100

    return `
      <svg width="600" height="400" viewBox="0 0 600 400" style="margin: 0 auto; display: block;">
        <rect width="600" height="400" fill="#F8F9FA" stroke="#4682B4" strokeWidth="2"/>
        <text x="300" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#2F4F2F">
          ${desc.charAt(0).toUpperCase() + desc.slice(1)}
        </text>
        
        ${data
          .map((item) => {
            const angle = (item.value / 100) * 360
            const startAngle = currentAngle
            const endAngle = currentAngle + angle
            currentAngle += angle

            const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180)
            const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180)
            const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180)
            const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180)

            const largeArcFlag = angle > 180 ? 1 : 0

            return `
            <path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z"
                  fill="${item.color}" stroke="white" strokeWidth="2"/>
            <text x="${centerX + (radius * 0.7) * Math.cos(((startAngle + endAngle) / 2) * (Math.PI / 180))}" 
                  y="${centerY + (radius * 0.7) * Math.sin(((startAngle + endAngle) / 2) * (Math.PI / 180))}" 
                  textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">
              ${item.value}%
            </text>
          `
          })
          .join("")}
        
        <!-- Legend -->
        ${data
          .map(
            (item, index) => `
          <rect x="450" y="${80 + index * 25}" width="15" height="15" fill="${item.color}"/>
          <text x="475" y="${92 + index * 25}" fontSize="12" fill="#333">${item.label} (${item.value}%)</text>
        `,
          )
          .join("")}
      </svg>
    `
  }

  const generateComparisonChart = (desc: string, complexity: string, id: number) => {
    return generateDataChart(desc, complexity, id) // Reuse data chart with comparison context
  }

  const generateScientificMethodFlowchart = (desc: string, complexity: string, id: number) => {
    return `
      <svg width="600" height="700" viewBox="0 0 600 700" style="margin: 0 auto; display: block;">
        <defs>
          <marker id="arrowhead${id}" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#4682B4"/>
          </marker>
        </defs>
        
        <rect width="600" height="700" fill="#F0F8FF" stroke="#4682B4" strokeWidth="2"/>
        <text x="300" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#2F4F2F">
          Scientific Method Process
        </text>
        
        <!-- Observation -->
        <rect x="220" y="60" width="160" height="50" fill="#FFE4B5" stroke="#DEB887" strokeWidth="3" rx="10"/>
        <text x="300" y="90" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#8B4513">1. Observation</text>
        
        <!-- Question -->
        <rect x="220" y="140" width="160" height="50" fill="#E0E0E0" stroke="#808080" strokeWidth="3" rx="10"/>
        <text x="300" y="170" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2F4F2F">2. Ask Question</text>
        
        <!-- Hypothesis -->
        <rect x="220" y="220" width="160" height="50" fill="#98FB98" stroke="#228B22" strokeWidth="3" rx="10"/>
        <text x="300" y="250" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#006400">3. Form Hypothesis</text>
        
        <!-- Experiment -->
        <rect x="220" y="300" width="160" height="50" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="3" rx="10"/>
        <text x="300" y="330" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#8B008B">4. Conduct Experiment</text>
        
        <!-- Analyze -->
        <rect x="220" y="380" width="160" height="50" fill="#DDA0DD" stroke="#9370DB" strokeWidth="3" rx="10"/>
        <text x="300" y="410" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4B0082">5. Analyze Data</text>
        
        <!-- Conclusion -->
        <polygon points="300,460 350,500 300,540 250,500" fill="#87CEEB" stroke="#4682B4" strokeWidth="3"/>
        <text x="300" y="505" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#191970">6. Draw Conclusion</text>
        
        <!-- Results paths -->
        <rect x="120" y="580" width="120" height="50" fill="#90EE90" stroke="#228B22" strokeWidth="3" rx="10"/>
        <text x="180" y="610" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#006400">Hypothesis Supported</text>
        
        <rect x="360" y="580" width="120" height="50" fill="#FFB6C1" stroke="#FF1493" strokeWidth="3" rx="10"/>
        <text x="420" y="610" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#8B008B">Hypothesis Rejected</text>
        
        <!-- Arrows -->
        <g stroke="#4682B4" strokeWidth="3" markerEnd="url(#arrowhead${id})">
          <line x1="300" y1="110" x2="300" y2="140"/>
          <line x1="300" y1="190" x2="300" y2="220"/>
          <line x1="300" y1="270" x2="300" y2="300"/>
          <line x1="300" y1="350" x2="300" y2="380"/>
          <line x1="300" y1="430" x2="300" y2="460"/>
          <line x1="270" y1="520" x2="210" y2="560"/>
          <line x1="330" y1="520" x2="390" y2="560"/>
        </g>
        
        <!-- Loop back arrow -->
        <path d="M 420 580 Q 500 550 500 400 Q 500 250 380 250" stroke="#DC143C" strokeWidth="2" 
              strokeDasharray="5,5" fill="none" markerEnd="url(#arrowhead${id})"/>
        <text x="480" y="400" fontSize="12" fontWeight="bold" fill="#DC143C">Revise Hypothesis</text>
        
        <!-- Labels -->
        <text x="240" y="545" fontSize="12" fontWeight="bold" fill="#228B22">Yes</text>
        <text x="360" y="545" fontSize="12" fontWeight="bold" fill="#DC143C">No</text>
      </svg>
    `
  }

  const generateProblemSolvingFlowchart = (desc: string, complexity: string, id: number) => {
    return generateProcessFlowchart(desc, complexity, id) // Reuse process flowchart
  }

  const generateHistoricalTimeline = (desc: string, complexity: string, id: number) => {
    return generateEventTimeline(desc, complexity, id) // Reuse event timeline
  }

  const generateLifeCycleTimeline = (desc: string, complexity: string, id: number) => {
    return generateEventTimeline(desc, complexity, id) // Reuse event timeline
  }

  const generateWorldMap = (desc: string, complexity: string, id: number) => {
    return generateEducationalMap(desc, complexity, id) // Reuse educational map
  }

  const generateMindMap = (desc: string, complexity: string, id: number) => {
    return generateEducationalMap(desc, complexity, id) // Reuse educational map
  }

  const generateStoryIllustration = (desc: string, complexity: string, id: number) => {
    return generateEducationalIllustration(desc, complexity, id) // Reuse educational illustration
  }

  const generateConceptIllustration = (desc: string, complexity: string, id: number) => {
    return generateEducationalIllustration(desc, complexity, id) // Reuse educational illustration
  }

  const generateGenericVisual = (desc: string, type: string, complexity: string, id: number) => {
    return generateEducationalDiagram(desc, complexity, id) // Fallback to educational diagram
  }

  const generateVisual = async () => {
    if (!description.trim() || !visualType || !complexity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to generate a visual aid",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)

    try {
      await performAdvancedGeneration()

      const svgContent = generateDynamicSVG(description, visualType, complexity)

      const newVisual = {
        id: Date.now(),
        title: `${visualType.charAt(0).toUpperCase() + visualType.slice(1)}: ${description.substring(0, 50)}${
          description.length > 50 ? "..." : ""
        }`,
        description: description,
        type: visualType,
        complexity: complexity,
        svgContent: svgContent,
        createdAt: new Date(),
        downloadName: `${visualType}_${description.replace(/\s+/g, "_").substring(0, 30)}.svg`,
      }

      setGeneratedVisuals((prev) => [newVisual, ...prev])

      toast({
        title: "Visual Aid Generated!",
        description: `Your ${visualType} is ready for download and use`,
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again with different parameters",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadSVG = (visual: any) => {
    const blob = new Blob([visual.svgContent], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = visual.downloadName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Visual Downloaded",
      description: `${visual.title} has been downloaded as SVG`,
    })
  }

  const selectedVisualType = visualTypes.find((type) => type.value === visualType)
  const selectedComplexity = complexityLevels.find((level) => level.value === complexity)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full text-pink-800 text-sm font-bold mb-4 border-2 border-pink-200">
          <PenTool className="w-5 h-5 mr-2" />
          AI Visual Aid Designer
        </div>
        <h3 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Professional Educational Visual Creator
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Create stunning educational diagrams, charts, and illustrations with advanced AI-powered design and
          pedagogical intelligence.
        </p>
      </div>

      {/* Visual Type Selection */}
      <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Palette className="w-7 h-7 mr-3 text-pink-600" />
            Choose Visual Type
          </CardTitle>
          <CardDescription className="text-lg">
            Select the type of visual aid that best fits your educational content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visualTypes.map((type) => {
              const IconComponent = type.icon
              return (
                <div
                  key={type.value}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    visualType === type.value
                      ? "border-pink-500 bg-pink-100 shadow-lg transform scale-105"
                      : "border-gray-200 bg-white hover:border-pink-300 hover:shadow-md"
                  }`}
                  onClick={() => setVisualType(type.value)}
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className="w-8 h-8 text-pink-600 mr-3" />
                    <h4 className="font-bold text-lg">{type.label}</h4>
                  </div>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-700">Examples:</p>
                    {type.examples.map((example, index) => (
                      <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Description and Settings */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Brain className="w-7 h-7 mr-3 text-purple-600" />
            Visual Content & Settings
          </CardTitle>
          <CardDescription className="text-lg">
            Describe what you want to visualize and set the complexity level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Describe Your Visual Content
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Textarea
              placeholder="Describe what you want to visualize... For example: 'Water cycle showing evaporation, condensation, and precipitation' or 'Bar chart comparing population of different countries' or 'Flowchart for scientific method steps'"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="border-2 hover:border-purple-300 focus:border-purple-500 transition-colors text-lg"
            />
            <p className="text-sm text-gray-500 mt-2">
              💡 Tip: Be specific about what you want to show. Include key elements, relationships, and any specific
              details you want highlighted.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Complexity Level
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Select value={complexity} onValueChange={setComplexity}>
                <SelectTrigger className="h-16 border-2 hover:border-purple-300 transition-colors">
                  <SelectValue placeholder="Select complexity level" />
                </SelectTrigger>
                <SelectContent>
                  {complexityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value} className="py-4">
                      <div>
                        <div className="font-bold text-lg">{level.label}</div>
                        <div className="text-xs text-gray-500">{level.description}</div>
                        <div className="text-xs text-blue-600">Est. time: {level.estimatedTime}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Selected Visual Type</label>
              <div className="h-16 border-2 border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center">
                {selectedVisualType ? (
                  <div className="flex items-center">
                    <selectedVisualType.icon className="w-6 h-6 text-purple-600 mr-3" />
                    <div>
                      <div className="font-bold">{selectedVisualType.label}</div>
                      <div className="text-xs text-gray-500">{selectedVisualType.description}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 flex items-center">
                    <HelpCircle className="w-6 h-6 mr-2" />
                    Please select a visual type above
                  </div>
                )}
              </div>
            </div>
          </div>

          {selectedVisualType && selectedComplexity && (
            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Generation Preview
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-blue-800">Type:</span>
                  <p className="text-blue-700">{selectedVisualType.label}</p>
                </div>
                <div>
                  <span className="font-semibold text-blue-800">Complexity:</span>
                  <p className="text-blue-700">{selectedComplexity.label}</p>
                </div>
                <div>
                  <span className="font-semibold text-blue-800">Est. Time:</span>
                  <p className="text-blue-700">{selectedComplexity.estimatedTime}</p>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={generateVisual}
            disabled={isGenerating || !description.trim() || !visualType || !complexity}
            size="lg"
            className="w-full h-16 text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                Creating Visual Aid...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 mr-3" />
                Generate Professional Visual Aid
              </>
            )}
          </Button>

          {isGenerating && (
            <div className="bg-white/80 p-6 rounded-xl border-2 border-purple-200">
              <div className="flex items-center space-x-4 mb-4">
                <PenTool className="w-8 h-8 text-purple-600 animate-pulse" />
                <div>
                  <h4 className="font-bold text-purple-900">AI Visual Generation in Progress</h4>
                  <p className="text-purple-700">{currentStep}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Progress value={generationProgress} className="flex-1 h-4" />
                <span className="text-xl font-bold text-purple-600">{generationProgress}%</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Visuals */}
      {generatedVisuals.length > 0 && (
        <Card className="border-4 border-green-300 bg-gradient-to-br from-green-50 to-blue-50 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-green-900">
              <ImageIcon className="w-7 h-7 mr-3 text-green-600" />
              Generated Visual Aids
            </CardTitle>
            <CardDescription className="text-lg">Professional visual aids ready for educational use</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {generatedVisuals.map((visual) => (
                <div
                  key={visual.id}
                  className="bg-white/80 border-2 border-white/50 rounded-xl p-6 space-y-6 shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-xl text-gray-900 mb-2">{visual.title}</h4>
                      <div className="flex items-center space-x-3 mb-4">
                        <Badge className="bg-pink-100 text-pink-800 capitalize">{visual.type}</Badge>
                        <Badge className="bg-purple-100 text-purple-800 capitalize">{visual.complexity}</Badge>
                        <span className="text-sm text-gray-500">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {visual.createdAt.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{visual.description}</p>
                    </div>
                  </div>

                  {/* Visual Preview */}
                  <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-inner">
                    <div dangerouslySetInnerHTML={{ __html: visual.svgContent }} />
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewVisual(visual)}
                      className="flex-1 bg-white/80 hover:bg-blue-50 border-blue-300"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Full Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadSVG(visual)}
                      className="flex-1 bg-white/80 hover:bg-green-50 border-green-300"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download SVG
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Full Preview Modal */}
      {previewVisual && (
        <Card className="border-4 border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-blue-900">
              <Eye className="w-7 h-7 mr-3 text-blue-600" />
              Full Preview: {previewVisual.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-8 rounded-2xl shadow-2xl border-4 border-dashed border-blue-200">
              <div dangerouslySetInnerHTML={{ __html: previewVisual.svgContent }} />

              <div className="flex justify-center mt-8 space-x-4">
                <Button
                  onClick={() => downloadSVG(previewVisual)}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download High-Quality SVG
                </Button>
                <Button variant="outline" size="lg" onClick={() => setPreviewVisual(null)}>
                  Close Preview
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips Section */}
      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-pink-900 mb-4 text-2xl">Professional Visual Design Tips</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="text-sm text-pink-800 space-y-3">
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-pink-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Be specific:</strong> Include key elements, relationships, and important details in your
                    description
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-pink-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Choose appropriate complexity:</strong> Match the detail level to your audience's grade
                    level
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-pink-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Use clear language:</strong> Describe concepts in simple, educational terms
                  </li>
                </ul>
                <ul className="text-sm text-pink-800 space-y-3">
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>SVG format:</strong> Vector graphics scale perfectly for any size without quality loss
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Educational focus:</strong> All visuals are designed with pedagogical best practices
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 mt-1 flex-shrink-0"></span>
                    <strong>Customizable:</strong> Edit SVG files in design software for further customization
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
