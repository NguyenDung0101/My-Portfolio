"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, CalendarIcon } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useVietnamTime } from "@/hooks/use-vietnam-time"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CalendarEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  type: "study" | "task" | "break" | "exam" | "meeting"
  priority: "low" | "medium" | "high"
}

export function CalendarView() {
  const { t } = useLanguage()
  const { currentTime } = useVietnamTime()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Học React Advanced",
      description: "Tìm hiểu về React Hooks và Context API",
      date: "2024-01-08",
      time: "09:00",
      type: "study",
      priority: "high",
    },
    {
      id: "2",
      title: "Họp nhóm dự án",
      description: "Thảo luận về tiến độ dự án cuối kỳ",
      date: "2024-01-08",
      time: "14:00",
      type: "meeting",
      priority: "medium",
    },
    {
      id: "3",
      title: "Thi Database",
      description: "Kiểm tra giữa kỳ môn Cơ sở dữ liệu",
      date: "2024-01-10",
      time: "08:00",
      type: "exam",
      priority: "high",
    },
  ])

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "study" as const,
    priority: "medium" as const,
  })

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return events.filter((event) => event.date === dateString)
  }

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event: CalendarEvent = {
        id: Date.now().toString(),
        ...newEvent,
      }
      setEvents([...events, event])
      setNewEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        type: "study",
        priority: "medium",
      })
      setIsDialogOpen(false)
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "study":
        return "bg-blue-500"
      case "task":
        return "bg-green-500"
      case "break":
        return "bg-yellow-500"
      case "exam":
        return "bg-red-500"
      case "meeting":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getEventTypeText = (type: string) => {
    switch (type) {
      case "study":
        return "Học tập"
      case "task":
        return "Nhiệm vụ"
      case "break":
        return "Nghỉ ngơi"
      case "exam":
        return "Thi cử"
      case "meeting":
        return "Họp"
      default:
        return type
    }
  }

  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ]

  const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]

  const days = getDaysInMonth(currentDate)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">📅 Lịch học tập</h1>
          <p className="text-muted-foreground">Quản lý thời gian biểu và sự kiện học tập</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm sự kiện
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm sự kiện mới</DialogTitle>
              <DialogDescription>Tạo sự kiện học tập hoặc nhiệm vụ mới</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="event-title">Tiêu đề</Label>
                <Input
                  id="event-title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Nhập tiêu đề sự kiện..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="event-description">Mô tả</Label>
                <Textarea
                  id="event-description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Mô tả chi tiết..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="event-date">Ngày</Label>
                  <Input
                    id="event-date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-time">Giờ</Label>
                  <Input
                    id="event-time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="event-type">Loại sự kiện</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value: any) => setNewEvent({ ...newEvent, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="study">Học tập</SelectItem>
                      <SelectItem value="task">Nhiệm vụ</SelectItem>
                      <SelectItem value="break">Nghỉ ngơi</SelectItem>
                      <SelectItem value="exam">Thi cử</SelectItem>
                      <SelectItem value="meeting">Họp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-priority">Độ ưu tiên</Label>
                  <Select
                    value={newEvent.priority}
                    onValueChange={(value: any) => setNewEvent({ ...newEvent, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Thấp</SelectItem>
                      <SelectItem value="medium">Vừa</SelectItem>
                      <SelectItem value="high">Cao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addEvent}>Thêm sự kiện</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
              Hôm nay
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="p-2 h-24"></div>
              }

              const dayEvents = getEventsForDate(day)
              const isToday = day.toDateString() === currentTime.toDateString()
              const isSelected = selectedDate?.toDateString() === day.toDateString()

              return (
                <div
                  key={index}
                  className={`p-2 h-24 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors ${
                    isToday ? "bg-primary/10 border-primary" : ""
                  } ${isSelected ? "bg-accent" : ""}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : ""}`}>{day.getDate()}</div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded text-white truncate ${getEventTypeColor(event.type)}`}
                        title={`${event.time} - ${event.title}`}
                      >
                        {event.time} {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} khác</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Events */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Sự kiện ngày {selectedDate.toLocaleDateString("vi-VN")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getEventsForDate(selectedDate).length === 0 ? (
                <p className="text-muted-foreground text-center py-4">Không có sự kiện nào trong ngày này</p>
              ) : (
                getEventsForDate(selectedDate)
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((event) => (
                    <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className={`w-3 h-3 rounded-full mt-1 ${getEventTypeColor(event.type)}`}></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{event.title}</span>
                          <Badge variant="outline">{getEventTypeText(event.type)}</Badge>
                          <Badge
                            variant={
                              event.priority === "high"
                                ? "destructive"
                                : event.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {event.priority === "high" ? "Cao" : event.priority === "medium" ? "Vừa" : "Thấp"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{event.description}</p>
                        <p className="text-sm font-medium text-primary">🕐 {event.time}</p>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
