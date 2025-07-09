"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Settings, Coffee, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function PomodoroTimer() {
  const [studyTime, setStudyTime] = useState(25)
  const [shortBreak, setShortBreak] = useState(5)
  const [longBreak, setLongBreak] = useState(15)
  const [currentTime, setCurrentTime] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState<"study" | "shortBreak" | "longBreak">("study")
  const [completedSessions, setCompletedSessions] = useState(0)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((time) => time - 1)
      }, 1000)
    } else if (currentTime === 0) {
      // Timer finished
      setIsActive(false)
      if (mode === "study") {
        setCompletedSessions((prev) => prev + 1)
        // Auto switch to break
        const nextMode = completedSessions % 4 === 3 ? "longBreak" : "shortBreak"
        setMode(nextMode)
        setCurrentTime(nextMode === "longBreak" ? longBreak * 60 : shortBreak * 60)
      } else {
        // Break finished, switch to study
        setMode("study")
        setCurrentTime(studyTime * 60)
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, currentTime, mode, studyTime, shortBreak, longBreak, completedSessions])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setCurrentTime(studyTime * 60)
    setMode("study")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getProgress = () => {
    const totalTime = mode === "study" ? studyTime * 60 : mode === "shortBreak" ? shortBreak * 60 : longBreak * 60
    return ((totalTime - currentTime) / totalTime) * 100
  }

  const getModeIcon = () => {
    switch (mode) {
      case "study":
        return <Clock className="w-6 h-6" />
      case "shortBreak":
        return <Coffee className="w-6 h-6" />
      case "longBreak":
        return <Coffee className="w-6 h-6" />
    }
  }

  const getModeTitle = () => {
    switch (mode) {
      case "study":
        return "Study Session"
      case "shortBreak":
        return "Short Break"
      case "longBreak":
        return "Long Break"
    }
  }

  const updateSettings = () => {
    if (mode === "study") setCurrentTime(studyTime * 60)
    else if (mode === "shortBreak") setCurrentTime(shortBreak * 60)
    else setCurrentTime(longBreak * 60)
    setIsSettingsOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Pomodoro Timer</h1>
          <p className="text-muted-foreground">Stay focused with the Pomodoro Technique</p>
        </div>

        {/* Main Timer Card */}
        <Card className="text-center">
          <CardHeader>
            <div className="flex items-center justify-center gap-2">
              {getModeIcon()}
              <CardTitle className="text-2xl">{getModeTitle()}</CardTitle>
            </div>
            <CardDescription>
              Session {completedSessions + 1} • {completedSessions} completed today
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="text-6xl font-mono font-bold text-primary">{formatTime(currentTime)}</div>
              <Progress value={getProgress()} className="h-2" />
            </div>

            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={toggleTimer} className="px-8">
                {isActive ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start
                  </>
                )}
              </Button>

              <Button size="lg" variant="outline" onClick={resetTimer}>
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>

              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline">
                    <Settings className="w-5 h-5 mr-2" />
                    Settings
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Timer Settings</DialogTitle>
                    <DialogDescription>Customize your Pomodoro timer durations</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="study">Study Time (minutes)</Label>
                      <Input
                        id="study"
                        type="number"
                        value={studyTime}
                        onChange={(e) => setStudyTime(Number(e.target.value))}
                        min="1"
                        max="60"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="short">Short Break (minutes)</Label>
                      <Input
                        id="short"
                        type="number"
                        value={shortBreak}
                        onChange={(e) => setShortBreak(Number(e.target.value))}
                        min="1"
                        max="30"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="long">Long Break (minutes)</Label>
                      <Input
                        id="long"
                        type="number"
                        value={longBreak}
                        onChange={(e) => setLongBreak(Number(e.target.value))}
                        min="1"
                        max="60"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={updateSettings}>Save Settings</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Session Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedSessions}</div>
              <p className="text-xs text-muted-foreground">{completedSessions * studyTime} minutes studied</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Current Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={mode === "study" ? "default" : "secondary"} className="text-sm">
                {getModeTitle()}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">{isActive ? "Active" : "Paused"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Next Break</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedSessions % 4 === 3 ? longBreak : shortBreak}m</div>
              <p className="text-xs text-muted-foreground">{completedSessions % 4 === 3 ? "Long" : "Short"} break</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
            <CardDescription>Your completed Pomodoro sessions today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from({ length: completedSessions }, (_, i) => (
                <div key={i} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Session {i + 1}</span>
                  </div>
                  <Badge variant="outline">{studyTime} min</Badge>
                </div>
              ))}
              {completedSessions === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No sessions completed yet. Start your first Pomodoro!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
