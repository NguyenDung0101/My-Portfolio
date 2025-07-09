"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle, Clock, Target } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface TaskOverview {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "pending" | "inProgress" | "completed"
  progress: number
  dueDate: string
  category: string
  timeframe: "daily" | "weekly" | "monthly"
}

export function TaskOverview() {
  const { t } = useLanguage()
  const [tasks] = useState<TaskOverview[]>([
    // Daily Tasks
    {
      id: "d1",
      title: "Ôn tập React Hooks",
      description: "Xem lại useEffect và useState",
      priority: "high",
      status: "completed",
      progress: 100,
      dueDate: "2024-01-08",
      category: "Frontend",
      timeframe: "daily",
    },
    {
      id: "d2",
      title: "Làm bài tập Algorithm",
      description: "Giải 3 bài trên LeetCode",
      priority: "medium",
      status: "inProgress",
      progress: 60,
      dueDate: "2024-01-08",
      category: "Algorithm",
      timeframe: "daily",
    },
    {
      id: "d3",
      title: "Đọc tài liệu Database",
      description: "Tìm hiểu về indexing",
      priority: "low",
      status: "pending",
      progress: 0,
      dueDate: "2024-01-08",
      category: "Database",
      timeframe: "daily",
    },

    // Weekly Tasks
    {
      id: "w1",
      title: "Hoàn thành dự án React",
      description: "Xây dựng ứng dụng quản lý task",
      priority: "high",
      status: "inProgress",
      progress: 75,
      dueDate: "2024-01-14",
      category: "Project",
      timeframe: "weekly",
    },
    {
      id: "w2",
      title: "Học Node.js Advanced",
      description: "Tìm hiểu về microservices",
      priority: "medium",
      status: "inProgress",
      progress: 40,
      dueDate: "2024-01-14",
      category: "Backend",
      timeframe: "weekly",
    },
    {
      id: "w3",
      title: "Viết blog về React",
      description: "Chia sẻ kinh nghiệm học React",
      priority: "low",
      status: "pending",
      progress: 10,
      dueDate: "2024-01-14",
      category: "Writing",
      timeframe: "weekly",
    },

    // Monthly Tasks
    {
      id: "m1",
      title: "Hoàn thành khóa học Full-stack",
      description: "Kết thúc khóa học trên Udemy",
      priority: "high",
      status: "inProgress",
      progress: 65,
      dueDate: "2024-01-31",
      category: "Course",
      timeframe: "monthly",
    },
    {
      id: "m2",
      title: "Xây dựng portfolio website",
      description: "Tạo website cá nhân showcase",
      priority: "high",
      status: "inProgress",
      progress: 30,
      dueDate: "2024-01-31",
      category: "Project",
      timeframe: "monthly",
    },
    {
      id: "m3",
      title: "Đọc 2 cuốn sách kỹ thuật",
      description: "Clean Code và Design Patterns",
      priority: "medium",
      status: "inProgress",
      progress: 25,
      dueDate: "2024-01-31",
      category: "Reading",
      timeframe: "monthly",
    },
  ])

  const getTasksByTimeframe = (timeframe: "daily" | "weekly" | "monthly") => {
    return tasks.filter((task) => task.timeframe === timeframe)
  }

  const getCompletionStats = (timeframe: "daily" | "weekly" | "monthly") => {
    const timeframeTasks = getTasksByTimeframe(timeframe)
    const completed = timeframeTasks.filter((task) => task.status === "completed").length
    const total = timeframeTasks.length
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
    return { completed, total, percentage }
  }

  const getAverageProgress = (timeframe: "daily" | "weekly" | "monthly") => {
    const timeframeTasks = getTasksByTimeframe(timeframe)
    if (timeframeTasks.length === 0) return 0
    const totalProgress = timeframeTasks.reduce((sum, task) => sum + task.progress, 0)
    return Math.round(totalProgress / timeframeTasks.length)
  }

  const TaskCard = ({ task }: { task: TaskOverview }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                {task.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
            </div>
            <div className="flex items-center gap-1">
              {task.status === "completed" && <CheckCircle className="w-4 h-4 text-green-500" />}
              {task.status === "inProgress" && <Clock className="w-4 h-4 text-blue-500" />}
              {task.status === "pending" && <Target className="w-4 h-4 text-gray-500" />}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}
            >
              {task.priority === "high" ? "Cao" : task.priority === "medium" ? "Vừa" : "Thấp"}
            </Badge>
            <Badge variant="outline">{task.category}</Badge>
            <Badge
              variant="outline"
              className={
                task.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : task.status === "inProgress"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
              }
            >
              {task.status === "completed" ? "Hoàn thành" : task.status === "inProgress" ? "Đang làm" : "Chờ"}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tiến độ</span>
              <span className="font-medium">{task.progress}%</span>
            </div>
            <Progress value={task.progress} className="h-2" />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Hạn: {new Date(task.dueDate).toLocaleDateString("vi-VN")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const dailyStats = getCompletionStats("daily")
  const weeklyStats = getCompletionStats("weekly")
  const monthlyStats = getCompletionStats("monthly")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">📋 Tổng quan nhiệm vụ</h1>
        <p className="text-muted-foreground">Theo dõi tiến độ nhiệm vụ theo ngày, tuần và tháng</p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Nhiệm vụ hàng ngày
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {dailyStats.completed}/{dailyStats.total}
            </div>
            <p className="text-xs text-muted-foreground mb-2">{dailyStats.percentage}% hoàn thành</p>
            <Progress value={dailyStats.percentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">Tiến độ trung bình: {getAverageProgress("daily")}%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Nhiệm vụ hàng tuần
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {weeklyStats.completed}/{weeklyStats.total}
            </div>
            <p className="text-xs text-muted-foreground mb-2">{weeklyStats.percentage}% hoàn thành</p>
            <Progress value={weeklyStats.percentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">Tiến độ trung bình: {getAverageProgress("weekly")}%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Nhiệm vụ hàng tháng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {monthlyStats.completed}/{monthlyStats.total}
            </div>
            <p className="text-xs text-muted-foreground mb-2">{monthlyStats.percentage}% hoàn thành</p>
            <Progress value={monthlyStats.percentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">Tiến độ trung bình: {getAverageProgress("monthly")}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Task Lists */}
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Hàng ngày ({getTasksByTimeframe("daily").length})</TabsTrigger>
          <TabsTrigger value="weekly">Hàng tuần ({getTasksByTimeframe("weekly").length})</TabsTrigger>
          <TabsTrigger value="monthly">Hàng tháng ({getTasksByTimeframe("monthly").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nhiệm vụ hàng ngày</CardTitle>
              <CardDescription>Các nhiệm vụ cần hoàn thành trong ngày hôm nay</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {getTasksByTimeframe("daily").map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nhiệm vụ hàng tuần</CardTitle>
              <CardDescription>Các mục tiêu cần đạt được trong tuần này</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {getTasksByTimeframe("weekly").map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nhiệm vụ hàng tháng</CardTitle>
              <CardDescription>Các dự án và mục tiêu dài hạn trong tháng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {getTasksByTimeframe("monthly").map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
