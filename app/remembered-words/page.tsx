'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Volume2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface RememberedWord {
  japanese: string
  english: string
  chinese: string
  learningWords: {
    word: string
    sound: string
    english: string
    chinese: string
  }[]
  imageUrl: string
}

export default function RememberedWords() {
  const [rememberedWords, setRememberedWords] = useState<RememberedWord[]>([])
  const [audioSupported, setAudioSupported] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('rememberedWords')
    if (stored) {
      setRememberedWords(JSON.parse(stored))
    }
    setAudioSupported('speechSynthesis' in window)
  }, [])

  const speak = (text: string) => {
    if (audioSupported) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ja-JP'
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--paper-white)] p-8">
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <h1 className="text-3xl font-bold mb-6 text-[var(--sakura-pink)]">Remembered Words</h1>
      
      <div className="grid gap-6">
        {rememberedWords.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="japanese-text">{item.japanese}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>{item.english}</p>
                <p>{item.chinese}</p>
                <div className="space-y-2">
                  <h3 className="font-semibold">Learning Words:</h3>
                  {item.learningWords.map((word, wordIndex) => (
                    <div key={wordIndex} className="flex items-center justify-between">
                      <div>
                        <span className="japanese-text font-medium">{word.word}</span>
                        <span className="text-sm text-muted-foreground ml-2">({word.sound})</span>
                        <span className="ml-2">- {word.english} / {word.chinese}</span>
                      </div>
                      {audioSupported && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => speak(word.word)}
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {rememberedWords.length === 0 && (
          <p className="text-center text-muted-foreground">
            No remembered words yet. Start learning and mark sentences as remembered!
          </p>
        )}
      </div>
    </div>
  )
}

