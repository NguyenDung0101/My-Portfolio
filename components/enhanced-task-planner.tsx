"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, GripVertical, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/hooks/use-language"

interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "pending" | "inProgress" | "completed" | "overdue"
  date: string
  deadline: string
  progress: number
  tags: string[]
}

export function EnhancedTaskPlanner() {
  const { t } = useLanguage()
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Hoàn thành React Components",
      description: "Xây dựng các component cơ bản cho dự án",
      priority: "high",
      status: "inProgress",
      date: "2024-01-08",
      deadline: "2024-01-08",
      progress: 75,
      tags: ["React", "Frontend"],
    },
    {
      id: "2",
      title: "Học Database Design",
      description: "Nghiên cứu về thiết kế cơ sở dữ liệu",
      priority: "medium",
      status: "completed",
      date: "2024-01-08",
      deadline: "2024-01-08",
      progress: 100,
      tags: ["Database", "Backend"],
    },
    {
      id: "3",
      title: "Luyện tập Algorithm",
      description: "Giải các bài tập thuật toán trên LeetCode",
      priority: "high",
      status: "pending",
      date: "2024-01-09",
      deadline: "2024-01-10",
      progress: 0,
      tags: ["Algorithm", "Practice"],
    },
  ])

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    date: "",
    deadline: "",
    tags: "",
  })
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const addTask = () => {
    if (newTask.title && newTask.date) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        status: "pending",
        date: newTask.date,
        deadline: newTask.deadline || newTask.date,
        progress: 0,
        tags: newTask.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }
      setTasks([...tasks, task])
      setNewTask({ title: "", description: "", priority: "medium", date: "", deadline: "", tags: "" })
      setIsDialogOpen(false)
    }
  }

  const updateTask = () => {
    if (editingTask) {
      setTasks(tasks.map((task) => (task.id === editingTask.id ? editingTask : task)))
      setEditingTask(null)
      setIsEditDialogOpen(false)
    }
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const newStatus = task.status === "completed" ? "pending" : "completed"
          return { ...task, status: newStatus, progress: newStatus === "completed" ? 100 : task.progress }
        }
        return task
      }),
    )
  }

  const updateTaskProgress = (id: string, progress: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const status = progress === 100 ? "completed" : progress > 0 ? "inProgress" : "pending"
          return { ...task, progress, status }
        }
        return task
      }),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "inProgress":
        return "bg-blue-500"
      case "overdue":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return t("completed")
      case "inProgress":
        return t("inProgress")
      case "overdue":
        return t("overdue")
      default:
        return t("pending")
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      default:
        return "secondary"
    }
  }

  const TaskCard = ({ task }: { task: Task }) => (
    <Card
      className="hover:shadow-md transition-all duration-200 border-l-4"
      style={{
        borderLeftColor: `hsl(var(--${task.priority === "high" ? "destructive" : task.priority === "medium" ? "primary" : "muted"}))`,
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab mt-1" />
          <input
            type="checkbox"
            checked={task.status === "completed"}
            onChange={() => toggleTaskStatus(task.id)}
            className="mt-1 rounded"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3
                  className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                >
                  {task.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    setEditingTask(task)
                    setIsEditDialogOpen(true)
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t("confirmDelete")}</AlertDialogTitle>
                      <AlertDialogDescription>
                        Hành động này không thể hoàn tác. Nhiệm vụ sẽ bị xóa vĩnh viễn.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteTask(task.id)}>{t("delete")}</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={getPriorityColor(task.priority)}>
                {task.priority === "high" ? t("high") : task.priority === "medium" ? t("medium") : t("low")}
              </Badge>
              <Badge variant="outline" className={`${getStatusColor(task.status)} text-white`}>
                {getStatusText(task.status)}
              </Badge>
              {task.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tiến độ</span>
                <span className="font-medium">{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-2" />
              <input
                type="range"
                min="0"
                max="100"
                value={task.progress}
                onChange={(e) => updateTaskProgress(task.id, Number.parseInt(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>📅 {new Date(task.date).toLocaleDateString("vi-VN")}</span>
              <span>⏰ {new Date(task.deadline).toLocaleDateString("vi-VN")}</span>
              {new Date(task.deadline) < new Date() && task.status !== "completed" && (
                <Badge variant="destructive" className="text-xs">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Quá hạn
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("taskPlanner")}</h1>
          <p className="text-muted-foreground">Quản lý nhiệm vụ học tập hàng ngày và hàng tuần</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              {t("addTask")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t("addTask")}</DialogTitle>
              <DialogDescription>Tạo nhiệm vụ học tập mới với mô tả chi tiết</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">{t("taskTitle")}</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Nhập tiêu đề nhiệm vụ..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">{t("taskDescription")}</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Mô tả chi tiết nhiệm vụ..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="priority">{t("priority")}</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: any) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">{t("low")}</SelectItem>
                      <SelectItem value="medium">{t("medium")}</SelectItem>
                      <SelectItem value="high">{t("high")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Ngày bắt đầu</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTask.date}
                    onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="deadline">{t("dueDate")}</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">{t("tags")}</Label>
                  <Input
                    id="tags"
                    value={newTask.tags}
                    onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                    placeholder="React, Database, Algorithm..."
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addTask}>{t("create")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Task Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tổng nhiệm vụ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Hoàn thành</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter((t) => t.status === "completed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Đang thực hiện</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {tasks.filter((t) => t.status === "inProgress").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quá hạn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {tasks.filter((t) => new Date(t.deadline) < new Date() && t.status !== "completed").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Tất cả ({tasks.length})</TabsTrigger>
          <TabsTrigger value="pending">Chờ xử lý ({tasks.filter((t) => t.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="inProgress">
            Đang làm ({tasks.filter((t) => t.status === "inProgress").length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Hoàn thành ({tasks.filter((t) => t.status === "completed").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {tasks
              .filter((t) => t.status === "pending")
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="inProgress" className="space-y-4">
          <div className="grid gap-4">
            {tasks
              .filter((t) => t.status === "inProgress")
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {tasks
              .filter((t) => t.status === "completed")
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t("editTask")}</DialogTitle>
            <DialogDescription>Chỉnh sửa thông tin nhiệm vụ</DialogDescription>
          </DialogHeader>
          {editingTask && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">{t("taskTitle")}</Label>
                <Input
                  id="edit-title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">{t("taskDescription")}</Label>
                <Textarea
                  id="edit-description"
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-priority">{t("priority")}</Label>
                  <Select
                    value={editingTask.priority}
                    onValueChange={(value: any) => setEditingTask({ ...editingTask, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">{t("low")}</SelectItem>
                      <SelectItem value="medium">{t("medium")}</SelectItem>
                      <SelectItem value="high">{t("high")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-deadline">{t("dueDate")}</Label>
                  <Input
                    id="edit-deadline"
                    type="date"
                    value={editingTask.deadline}
                    onChange={(e) => setEditingTask({ ...editingTask, deadline: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={updateTask}>{t("update")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
