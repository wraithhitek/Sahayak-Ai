"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, ChevronDown, Check } from "lucide-react"

interface Language {
  code: string
  name: string
  native: string
  flag: string
}

const languages: Language[] = [
  { code: "en", name: "English", native: "English", flag: "🌍" },
  { code: "hi", name: "Hindi", native: "हिंदी", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", native: "मराठी", flag: "🏛️" },
  { code: "bn", name: "Bengali", native: "বাংলা", flag: "🐅" },
  { code: "ta", name: "Tamil", native: "தமிழ்", flag: "🏛️" },
  { code: "te", name: "Telugu", native: "తెలుగు", flag: "🎭" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી", flag: "🦁" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", flag: "🐘" },
]

interface LanguageDropdownProps {
  className?: string
  onLanguageChange?: (lang: string) => void
}

export default function LanguageDropdown({ className, onLanguageChange }: LanguageDropdownProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0])
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language)
    setIsOpen(false)

    // 👇 Call the parent function to inform language change
    if (onLanguageChange) {
      onLanguageChange(language.code)
    }
  }

  return (
    <div className="relative">
      <Button variant="outline" className={`${className} relative`} onClick={() => setIsOpen(!isOpen)}>
        <Globe className="w-4 h-4 mr-2" />
        <span className="mr-2">{selectedLanguage.flag}</span>
        <span className="hidden sm:inline">{selectedLanguage.name}</span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 mt-2 w-64 z-50 shadow-2xl border-2 border-white/30 bg-white/95 backdrop-blur-xl">
          <CardContent className="p-2">
            <div className="space-y-1">
              {languages.map((language) => (
                <Button
                  key={language.code}
                  variant="ghost"
                  className="w-full justify-start hover:bg-blue-50 transition-colors"
                  onClick={() => handleLanguageSelect(language)}
                >
                  <span className="text-2xl mr-3">{language.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{language.name}</div>
                    <div className="text-sm text-gray-500">{language.native}</div>
                  </div>
                  {selectedLanguage.code === language.code && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </Button>
              ))}
            </div>
            <div className="mt-3 pt-2 border-t border-gray-200">
              <Badge className="w-full justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <Globe className="w-3 h-3 mr-1" />
                AI-Powered Translation
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
