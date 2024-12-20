'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Progress } from "@/components/ui/progress"
import GameBoard from './components/GameBoard'
import ResultScreen from './components/ResultScreen'
import LandingPage from './components/LandingPage'
import Image from 'next/image'
import { shuffle } from '@/utils/shuffle'
import TopNav from './components/TopNav'

const sentences = [
  {
    japanese: '諦める男が旗を挙げる',
    english: 'The man who gives up raises the flag',
    chinese: '放弃的男人举起旗帜',
    base: '**る男が旗を**る',
    learningWords: [
      { word: '諦める', sound: 'あきらめる', english: 'to give up', chinese: '放弃' },
      { word: '挙げる', sound: 'あげる', english: 'to raise', chinese: '举起' }
    ],
    characters: ['諦', 'め', '挙', 'げ'],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a-man--look-sad-and-depressed--raises-a-white-flag.jpg-Usfu6dYdDqX9lD0vHMRTo5GXESxAte.jpeg"
  },
  {
    japanese: '飽きた男の子が窓を開ける',
    english: 'The bored boy opens the window',
    chinese: '厌倦的男孩打开窗户',
    base: '**た男の子が窓を**る',
    learningWords: [
      { word: '飽きる', sound: 'あきる', english: 'to get bored', chinese: '厌倦，腻烦' },
      { word: '開ける', sound: 'あける', english: 'to open', chinese: '打开，开启' }
    ],
    characters: ['飽', 'き', '開', 'け'],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a-bored-person-with-a-tired-expression-is-pushing-.jpg-Z7vXKoVZspUsCqxXrqjvLS7TOCfadW.jpeg"
  },
  {
    japanese: '雷が遭うと、花が開く',
    english: 'When lightning strikes, flowers bloom',
    chinese: '遭遇雷电时，花朵绽放',
    base: '雷が**と、花が**',
    learningWords: [
      { word: '遭う', sound: 'あう', english: 'to encounter (usually something unpleasant)', chinese: '遭遇，碰上（不好的事）' },
      { word: '開く', sound: 'あく', english: 'to open, to bloom', chinese: '开，绽放' }
    ],
    characters: ['遭', 'う', '開', 'く'],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HBeKHlId8KzaVBThxCOmDEkJmhgY0P.png"
  },
  {
    japanese: '隕石に会う猫が空へ上がる',
    english: 'A cat encountering a meteorite rises to the sky',
    chinese: '遇到陨石的猫咪飞向天空',
    base: '隕石に**猫が空へ**る',
    learningWords: [
      { word: '会う', sound: 'あう', english: 'to meet, to encounter', chinese: '会面，碰见' },
      { word: '上がる', sound: 'あがる', english: 'to rise, to go up', chinese: '上，进入，登，升起，提高' }
    ],
    characters: ['会', 'う', '上', 'が'],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-a4WtIShNO03CVdi7F2HIJnvlNJeI8l.png"
  },
  {
    japanese: '牛郎は天に上がり、嫦娥に会う',
    english: 'The Cowherd rises to heaven and meets Chang\'e',
    chinese: '牛郎升向天空见嫦娥',
    base: '牛郎は天に**り、嫦娥に**う',
    learningWords: [
      { word: '上がる', sound: 'あがる', english: 'to rise', chinese: '上，进入，登，升起，提高' },
      { word: '会う', sound: 'あう', english: 'to meet', chinese: '会面，碰见' }
    ],
    characters: ['上', 'が', '会', 'う'],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yiPT9GNgpMHht6TYu5QQ9SuGBq3svb.png"
  },
  {
    japanese: '風があげると子供たちが遊ぶ',
    english: 'When the wind rises, children play',
    chinese: '风起时孩子们玩耍',
    base: '風が***と子供たちが**',
    learningWords: [
      { word: 'あげる', sound: 'あげる', english: 'to raise, to lift', chinese: '举起，抬起' },
      { word: '遊ぶ', sound: 'あそぶ', english: 'to play', chinese: '玩耍' }
    ],
    characters: ['あ', 'げ', 'る', '遊', 'ぶ'],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RQ13Ej1RhpLVZOp2TIhFFonYEvXWh3.png"
  },
  {
    japanese: '少女がマッチを明けると、手を暖める',
    english: 'When the girl lights a match, she warms her hands',
    chinese: '女孩点燃火柴，暖了手',
    base: '少女がマッチを**ると、手を**る',
    learningWords: [
      { word: '明ける', sound: 'あける', english: 'to light (a flame)', chinese: '点燃' },
      { word: '暖める', sound: 'あたためる', english: 'to warm', chinese: '暖，使暖和' }
    ],
    characters: ['明', 'け', '暖', 'め'],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7H41EDsabYxaWIHcRUr8cOvh7q6Ddn.png"
  },
  {
    japanese: '彼は鉄の箱を彼女に預かるように与える',
    english: 'He gives her the iron box to keep',
    chinese: '他把铁盒子交给她保管',
    base: '彼は鉄の箱を彼女に**るように**る',
    learningWords: [
      { word: '預かる', sound: 'あずかる', english: 'to keep, to take care of', chinese: '保管，照管' },
      { word: '与える', sound: 'あたえる', english: 'to give', chinese: '给予' }
    ],
    characters: ['預', 'か', '与', 'え'],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lTCnBd6ObN4VMnS9btmIHCjN0WeYWY.png"
  },
  {
    japanese: '空いた道に雷が当たる',
    english: 'Lightning strikes the empty road',
    chinese: '空旷的道路上雷电击中',
    base: '**た道に雷が**る',
    learningWords: [
      { word: '空く', sound: 'あく', english: 'to be empty, to become vacant', chinese: '空，空闲' },
      { word: '当たる', sound: 'あたる', english: 'to hit, to strike', chinese: '击中，打中' }
    ],
    characters: ['空', 'い', '当', 'た'],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9ObdWkNr8IAtBOTS9CeoUFtaPYMr58.png"
  }
]

const INITIAL_TIME = 7

export default function JapaneseLearningGame() {
  const [gameState, setGameState] = useState<'landing' | 'initial' | 'question' | 'result'>('landing')
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME)
  const [progress, setProgress] = useState(100)
  const [isEasyMode, setIsEasyMode] = useState(false)
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [language, setLanguage] = useState<'en' | 'zh'>('zh')
  const [shuffledSentences, setShuffledSentences] = useState(sentences)
  const [rememberedSentences, setRememberedSentences] = useState<number[]>([])

  const currentSentence = shuffledSentences[currentSentenceIndex]

  useEffect(() => {
    // Load remembered sentences from localStorage
    const stored = localStorage.getItem('rememberedSentences')
    if (stored) {
      setRememberedSentences(JSON.parse(stored))
    }
    setShuffledSentences(shuffle([...sentences]))
  }, [])

  useEffect(() => {
    if (gameState === 'initial' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
        setProgress((timeLeft - 1) * (100 / INITIAL_TIME))
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameState('question')
    }
  }, [timeLeft, gameState])

  const handleStart = () => {
    setGameState('initial')
  }

  const handleCompletion = () => {
    setGameState('result')
  }

  const resetGame = () => {
    setGameState('initial')
    setTimeLeft(INITIAL_TIME)
    setProgress(100)
  }

  const nextSentence = () => {
    let nextIndex = (currentSentenceIndex + 1) % shuffledSentences.length
    while (rememberedSentences.includes(nextIndex) && rememberedSentences.length < shuffledSentences.length) {
      nextIndex = (nextIndex + 1) % shuffledSentences.length
    }
    setCurrentSentenceIndex(nextIndex)
    resetGame()
  }

  const handleLanguageChange = (lang: 'en' | 'zh') => {
    setLanguage(lang)
  }

  const markAsRemembered = () => {
    const newRemembered = [...rememberedSentences, currentSentenceIndex]
    setRememberedSentences(newRemembered)
    
    // Save to localStorage
    localStorage.setItem('rememberedSentences', JSON.stringify(newRemembered))
    
    // Save the full sentence data to rememberedWords
    const storedWords = localStorage.getItem('rememberedWords')
    const rememberedWords = storedWords ? JSON.parse(storedWords) : []
    localStorage.setItem('rememberedWords', JSON.stringify([
      ...rememberedWords,
      currentSentence
    ]))
    
    nextSentence()
  }

  const content = {
    en: {
      timeLeft: "Time left:",
      seconds: "seconds",
      difficultMode: "Difficult Mode",
      easyMode: "Easy Mode",
      nextImage: "Next Image",
      alreadyRemembered: "Already Remembered"
    },
    zh: {
      timeLeft: "剩余时间：",
      seconds: "秒",
      difficultMode: "困难模式",
      easyMode: "简单模式",
      nextImage: "下一张图片",
      alreadyRemembered: "已记住"
    }
  }

  if (gameState === 'landing') {
    return (
      <>
        <TopNav />
        <LandingPage onStart={handleStart} onLanguageChange={handleLanguageChange} />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--paper-white)] text-[var(--zen-gray)] flex flex-col items-center justify-center p-4">
      <TopNav />
      <div className="w-full max-w-2xl animate-fade-in">
        {gameState === 'initial' && (
          <div className="text-center animate-scale-in">
            <Image
              src={currentSentence.imageUrl}
              alt="Sentence illustration"
              width={400}
              height={300}
              className="mx-auto mb-4 rounded-lg shadow-md"
            />
            <div className="flex flex-col items-center mb-4">
              <div className="w-1/2 max-w-xs">
                <Progress 
                  value={progress} 
                  className="h-2 bg-gray-200" 
                  style={{"--progress-background": "var(--sakura-pink)"} as React.CSSProperties}
                />
              </div>
              <p className="text-2xl mt-2">{content[language].timeLeft} {timeLeft} {content[language].seconds}</p>
            </div>
            {isEasyMode && <p className="text-xl mb-4 japanese-text">{currentSentence.japanese}</p>}
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Label htmlFor="easy-mode" className="mr-2">{content[language].difficultMode}</Label>
              <Switch
                id="easy-mode"
                checked={isEasyMode}
                onCheckedChange={setIsEasyMode}
              />
              <Label htmlFor="easy-mode">{content[language].easyMode}</Label>
            </div>
            <Button 
              onClick={nextSentence}
              className="mt-4 bg-[var(--sakura-pink)] text-[var(--zen-gray)] hover:bg-[var(--zen-gray)] hover:text-[var(--sakura-pink)] transition-colors duration-300 border-2 border-[var(--zen-gray)]"
            >
              {content[language].nextImage}
            </Button>
            <Button 
              onClick={markAsRemembered}
              className="mt-4 ml-4 bg-[var(--zen-gray)] text-[var(--paper-white)] hover:bg-[var(--sakura-pink)] hover:text-[var(--zen-gray)] transition-colors duration-300 border-2 border-[var(--zen-gray)]"
            >
              {content[language].alreadyRemembered}
            </Button>
          </div>
        )}
        {gameState === 'question' && (
          <GameBoard
            sentence={currentSentence}
            imageUrl={currentSentence.imageUrl}
            onComplete={handleCompletion}
            onNext={nextSentence}
            language={language}
            onRemember={markAsRemembered}
          />
        )}
        {gameState === 'result' && (
          <ResultScreen
            sentence={currentSentence}
            onTryAgain={resetGame}
            onNext={nextSentence}
            language={language}
            onRemember={markAsRemembered}
          />
        )}
      </div>
    </div>
  )
}

