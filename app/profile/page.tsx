'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Profile() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalRemembered: 0,
    totalAvailable: 0
  })

  useEffect(() => {
    const rememberedWords = localStorage.getItem('rememberedWords')
    const parsed = rememberedWords ? JSON.parse(rememberedWords) : []
    setStats({
      totalRemembered: parsed.length,
      totalAvailable: 9 // Update this number when adding new sentences
    })
  }, [])

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
      
      <h1 className="text-3xl font-bold mb-6 text-[var(--sakura-pink)]">Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Words Remembered: {stats.totalRemembered}</p>
            <p>Available Words: {stats.totalAvailable}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-[var(--sakura-pink)] h-2.5 rounded-full"
                style={{ width: `${(stats.totalRemembered / stats.totalAvailable) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

