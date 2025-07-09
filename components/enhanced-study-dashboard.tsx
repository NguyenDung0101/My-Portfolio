"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, Target, TrendingUp, Calendar } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { useLanguage } from "@/hooks/use-language"
import { useVietnamTime } from "@/hooks/use-vietnam-time"

const weeklyData = [
  { day: "T2", hours: 4.5, tasks: 8 },
  { day: "T3", hours: 6.2, tasks: 12 },
  { day: "T4", hours: 3.8, tasks: 6 },
  { day: "T5", hours: 5.5, tasks: 10 },
  { day: "T6", hours: 7.2, tasks: 15 },
  { day: "T7", hours: 8.1, tasks: 18 },
  { day: "CN", hours: 5.9, tasks: 14 },
]

const monthlyProgress = [
  { week: "Tuần 1", target: 40, actual: 35, percentage: 87.5 },
  { week: "Tuần 2", target: 40, actual: 42, percentage: 105 },
  { week: "Tuần 3", target: 40, actual: 38, percentage: 95 },
  { week: "Tuần 4", target: 40, actual: 45, percentage: 112.5 },
]

export function EnhancedStudyDashboard() {
  const { t } = useLanguage()
  const { currentTime, formatTime, formatDate } = useVietnamTime()

  const todayHours = 5.5
  const completedTasks = 8
  const totalTasks = 12
  const completionRate = Math.round((completedTasks / totalTasks) * 100)
  const weeklyTotal = weeklyData.reduce((sum, day) => sum + day.hours, 0)
  const weeklyAverage = weeklyTotal / 7

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("dashboard")}</h1>
          <p className="text-muted-foreground">{t("welcomeBack")}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{formatTime(currentTime)}</div>
          <div className="text-sm text-muted-foreground">{formatDate(currentTime)}</div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("todayStudyTime")}</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{todayHours}h</div>
            <p className="text-xs text-muted-foreground">+20% {t("fromYesterday")}</p>
            <Progress value={(todayHours / 8) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("completedTasks")}</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {completedTasks}/{totalTasks}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalTasks - completedTasks} {t("remaining")}
            </p>
            <Progress value={completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("completionRate")}</CardTitle>
            <Target className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{completionRate}%</div>
            <Progress value={completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("weeklyAverage")}</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{weeklyAverage.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">+12% {t("fromLastWeek")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("weeklyStudyHours")}</CardTitle>
            <CardDescription>Thời gian học 7 ngày qua</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("studyTrend")}</CardTitle>
            <CardDescription>Xu hướng tiến bộ theo thời gian</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Tiến độ mục tiêu theo tuần</CardTitle>
          <CardDescription>Tỷ lệ phần trăm hoàn thành mục tiêu hàng tuần</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyProgress.map((week, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{week.week}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {week.actual}h / {week.target}h
                    </span>
                    <Badge
                      variant={week.percentage >= 100 ? "default" : week.percentage >= 80 ? "secondary" : "destructive"}
                    >
                      {week.percentage}%
                    </Badge>
                  </div>
                </div>
                <Progress value={week.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Tasks Preview with Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {t("todayTasks")}
          </CardTitle>
          <CardDescription>Tổng quan nhanh nhiệm vụ hôm nay</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: "Hoàn thành React Components", priority: "high", completed: true, progress: 100 },
              { title: "Học Database Design", priority: "medium", completed: true, progress: 100 },
              { title: "Luyện tập Algorithm", priority: "high", completed: false, progress: 60 },
              { title: "Ôn tập System Architecture", priority: "low", completed: false, progress: 30 },
            ].map((task, index) => (
              <div key={index} className="p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={task.completed} className="rounded" readOnly />
                    <span className={task.completed ? "line-through text-muted-foreground" : "font-medium"}>
                      {task.title}
                    </span>
                  </div>
                  <Badge
                    variant={
                      task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                    }
                  >
                    {task.priority === "high" ? "Cao" : task.priority === "medium" ? "Vừa" : "Thấp"}
                  </Badge>
                </div>
                <div className="ml-6">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Tiến độ</span>
                    <span className="font-medium">{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-1.5" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
