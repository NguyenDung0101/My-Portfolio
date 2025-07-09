"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, RotateCcw, Trash2, Calendar, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CompletedTask {
  id: string
  title: string
  priority: "low" | "medium" | "high"
  completedDate: string
  originalDate: string
  category: string
}

export function TaskArchive() {
  const [completedTasks] = useState<CompletedTask[]>([
    {
      id: "1",
      title: "Complete React Components Tutorial",
      priority: "high",
      completedDate: "2024-01-08",
      originalDate: "2024-01-08",
      category: "Frontend",
    },
    {
      id: "2",
      title: "Study Database Normalization",
      priority: "medium",
      completedDate: "2024-01-07",
      originalDate: "2024-01-07",
      category: "Database",
    },
    {
      id: "3",
      title: "Practice Algorithm Problems",
      priority: "high",
      completedDate: "2024-01-06",
      originalDate: "2024-01-06",
      category: "Algorithms",
    },
    {
      id: "4",
      title: "Review System Design Concepts",
      priority: "low",
      completedDate: "2024-01-05",
      originalDate: "2024-01-05",
      category: "Architecture",
    },
    {
      id: "5",
      title: "Build REST API with Node.js",
      priority: "medium",
      completedDate: "2024-01-04",
      originalDate: "2024-01-04",
      category: "Backend",
    },
    {
      id: "6",
      title: "Learn Docker Fundamentals",
      priority: "medium",
      completedDate: "2024-01-03",
      originalDate: "2024-01-03",
      category: "DevOps",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterPeriod, setFilterPeriod] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const filterTasksByPeriod = (tasks: CompletedTask[]) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    switch (filterPeriod) {
      case "today":
        return tasks.filter((task) => new Date(task.completedDate) >= today)
      case "week":
        return tasks.filter((task) => new Date(task.completedDate) >= weekAgo)
      case "month":
        return tasks.filter((task) => new Date(task.completedDate) >= monthAgo)
      default:
        return tasks
    }
  }

  const filteredTasks = filterTasksByPeriod(completedTasks).filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority
    return matchesSearch && matchesPriority
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getTasksByCategory = () => {
    const categories: Record<string, CompletedTask[]> = {}
    filteredTasks.forEach((task) => {
      if (!categories[task.category]) {
        categories[task.category] = []
      }
      categories[task.category].push(task)
    })
    return categories
  }

  const TaskCard = ({ task }: { task: CompletedTask }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <h3 className="font-medium">{task.title}</h3>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Completed: {formatDate(task.completedDate)}
              </div>
              <Badge variant="outline" className="text-xs">
                {task.category}
              </Badge>
              <Badge
                variant={
                  task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                }
                className="text-xs"
              >
                {task.priority}
              </Badge>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Task Archive</h1>
        <p className="text-muted-foreground">View and manage your completed tasks</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filterTasksByPeriod(completedTasks.filter((t) => filterPeriod === "week" || true)).length}
            </div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks.filter((t) => t.priority === "high").length}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(getTasksByCategory()).length}</div>
            <p className="text-xs text-muted-foreground">Different areas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search completed tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filterPeriod} onValueChange={setFilterPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="chronological" className="w-full">
        <TabsList>
          <TabsTrigger value="chronological">Chronological</TabsTrigger>
          <TabsTrigger value="category">By Category</TabsTrigger>
        </TabsList>

        <TabsContent value="chronological" className="space-y-4">
          <div className="grid gap-3">
            {filteredTasks
              .sort((a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime())
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            {filteredTasks.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No completed tasks found matching your filters.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="category" className="space-y-6">
          {Object.entries(getTasksByCategory()).map(([category, tasks]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-lg">{category}</CardTitle>
                <CardDescription>
                  {tasks.length} completed task{tasks.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {tasks
                    .sort((a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime())
                    .map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
          {Object.keys(getTasksByCategory()).length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No completed tasks found matching your filters.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
