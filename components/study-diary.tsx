"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Calendar, BookOpen } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/hooks/use-language"

interface DiaryEntry {
  id: string
  title: string
  content: string
  date: string
  mood: "excellent" | "good" | "okay" | "bad"
  tags: string[]
  studyHours: number
  achievements: string[]
}

export function StudyDiary() {
  const { t } = useLanguage()
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: "1",
      title: "Ngày học React Hooks hiệu quả",
      content:
        "Hôm nay mình đã học được rất nhiều về React Hooks, đặc biệt là useEffect và useState. Cảm thấy tự tin hơn khi xử lý state management. Đã làm được 3 bài tập thực hành và hiểu rõ lifecycle của component.",
      date: "2024-01-08",
      mood: "excellent",
      tags: ["React", "Hooks", "Frontend"],
      studyHours: 6,
      achievements: ["Hoàn thành 3 bài tập", "Hiểu rõ useEffect"],
    },
    {
      id: "2",
      title: "Khó khăn với Database Design",
      content:
        "Ngày hôm nay gặp khó khăn với việc thiết kế database. Normalization khá phức tạp, cần ôn lại lý thuyết. Tuy nhiên đã hiểu được cơ bản về 1NF, 2NF. Ngày mai sẽ tiếp tục với 3NF.",
      date: "2024-01-07",
      mood: "okay",
      tags: ["Database", "SQL", "Theory"],
      studyHours: 4,
      achievements: ["Hiểu 1NF và 2NF"],
    },
    {
      id: "3",
      title: "Breakthrough với Algorithm",
      content:
        "Cuối cùng cũng giải được bài Dynamic Programming khó! Cảm giác thật tuyệt khi code chạy đúng. Hôm nay học được pattern Tabulation và Memoization. Sẽ luyện thêm các bài tương tự.",
      date: "2024-01-06",
      mood: "excellent",
      tags: ["Algorithm", "DP", "Problem Solving"],
      studyHours: 5,
      achievements: ["Giải được bài DP khó", "Hiểu Tabulation"],
    },
  ])

  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    mood: "good" as const,
    tags: "",
    studyHours: 0,
    achievements: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterYear, setFilterYear] = useState("all")
  const [filterMonth, setFilterMonth] = useState("all")
  const [filterMood, setFilterMood] = useState("all")

  const addEntry = () => {
    if (newEntry.title && newEntry.content) {
      const entry: DiaryEntry = {
        id: Date.now().toString(),
        title: newEntry.title,
        content: newEntry.content,
        date: newEntry.date,
        mood: newEntry.mood,
        tags: newEntry.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        studyHours: newEntry.studyHours,
        achievements: newEntry.achievements
          .split(",")
          .map((achievement) => achievement.trim())
          .filter(Boolean),
      }
      setEntries([entry, ...entries])
      setNewEntry({
        title: "",
        content: "",
        date: new Date().toISOString().split("T")[0],
        mood: "good",
        tags: "",
        studyHours: 0,
        achievements: "",
      })
      setIsDialogOpen(false)
    }
  }

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "excellent":
        return "😄"
      case "good":
        return "😊"
      case "okay":
        return "😐"
      case "bad":
        return "😞"
      default:
        return "😊"
    }
  }

  const getMoodText = (mood: string) => {
    switch (mood) {
      case "excellent":
        return "Xuất sắc"
      case "good":
        return "Tốt"
      case "okay":
        return "Bình thường"
      case "bad":
        return "Không tốt"
      default:
        return "Tốt"
    }
  }

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200"
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "okay":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "bad":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const entryDate = new Date(entry.date)
    const matchesYear = filterYear === "all" || entryDate.getFullYear().toString() === filterYear
    const matchesMonth = filterMonth === "all" || (entryDate.getMonth() + 1).toString() === filterMonth
    const matchesMood = filterMood === "all" || entry.mood === filterMood

    return matchesSearch && matchesYear && matchesMonth && matchesMood
  })

  const years = [...new Set(entries.map((entry) => new Date(entry.date).getFullYear().toString()))]
  const months = [
    { value: "1", label: "Tháng 1" },
    { value: "2", label: "Tháng 2" },
    { value: "3", label: "Tháng 3" },
    { value: "4", label: "Tháng 4" },
    { value: "5", label: "Tháng 5" },
    { value: "6", label: "Tháng 6" },
    { value: "7", label: "Tháng 7" },
    { value: "8", label: "Tháng 8" },
    { value: "9", label: "Tháng 9" },
    { value: "10", label: "Tháng 10" },
    { value: "11", label: "Tháng 11" },
    { value: "12", label: "Tháng 12" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">📔 Nhật ký học tập</h1>
          <p className="text-muted-foreground">Ghi lại hành trình học tập và cảm xúc mỗi ngày</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Viết nhật ký
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Viết nhật ký học tập</DialogTitle>
              <DialogDescription>Ghi lại những gì bạn đã học và cảm nhận hôm nay</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="diary-title">Tiêu đề</Label>
                <Input
                  id="diary-title"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  placeholder="Tiêu đề cho ngày hôm nay..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="diary-content">Nội dung</Label>
                <Textarea
                  id="diary-content"
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  placeholder="Chia sẻ những gì bạn đã học, khó khăn gặp phải, và cảm xúc của bạn..."
                  rows={6}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="diary-date">Ngày</Label>
                  <Input
                    id="diary-date"
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="diary-mood">Tâm trạng</Label>
                  <Select
                    value={newEntry.mood}
                    onValueChange={(value: any) => setNewEntry({ ...newEntry, mood: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">😄 Xuất sắc</SelectItem>
                      <SelectItem value="good">😊 Tốt</SelectItem>
                      <SelectItem value="okay">😐 Bình thường</SelectItem>
                      <SelectItem value="bad">😞 Không tốt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="diary-hours">Số giờ học</Label>
                  <Input
                    id="diary-hours"
                    type="number"
                    min="0"
                    max="24"
                    value={newEntry.studyHours}
                    onChange={(e) => setNewEntry({ ...newEntry, studyHours: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="diary-tags">Tags (phân cách bằng dấu phẩy)</Label>
                  <Input
                    id="diary-tags"
                    value={newEntry.tags}
                    onChange={(e) => setNewEntry({ ...newEntry, tags: e.target.value })}
                    placeholder="React, Database, Algorithm..."
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="diary-achievements">Thành tích hôm nay (phân cách bằng dấu phẩy)</Label>
                <Input
                  id="diary-achievements"
                  value={newEntry.achievements}
                  onChange={(e) => setNewEntry({ ...newEntry, achievements: e.target.value })}
                  placeholder="Hoàn thành bài tập, Hiểu khái niệm mới..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addEntry}>Lưu nhật ký</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Tìm kiếm nhật ký..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={filterYear} onValueChange={setFilterYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Năm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả năm</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterMonth} onValueChange={setFilterMonth}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Tháng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả tháng</SelectItem>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterMood} onValueChange={setFilterMood}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Tâm trạng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="excellent">😄 Xuất sắc</SelectItem>
              <SelectItem value="good">😊 Tốt</SelectItem>
              <SelectItem value="okay">😐 Bình thường</SelectItem>
              <SelectItem value="bad">😞 Không tốt</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Diary Entries Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{entry.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(entry.date).toLocaleDateString("vi-VN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </div>
                <div className={`px-2 py-1 rounded-full text-sm font-medium border ${getMoodColor(entry.mood)}`}>
                  {getMoodEmoji(entry.mood)} {getMoodText(entry.mood)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-4">{entry.content}</p>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{entry.studyHours}h</span>
                </div>
              </div>

              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {entry.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {entry.achievements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-green-600">🎉 Thành tích:</h4>
                  <ul className="text-sm space-y-1">
                    {entry.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Chưa có nhật ký nào</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterYear !== "all" || filterMonth !== "all" || filterMood !== "all"
                ? "Không tìm thấy nhật ký phù hợp với bộ lọc"
                : "Hãy bắt đầu viết nhật ký học tập đầu tiên của bạn"}
            </p>
            {!searchTerm && filterYear === "all" && filterMonth === "all" && filterMood === "all" && (
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Viết nhật ký đầu tiên
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
