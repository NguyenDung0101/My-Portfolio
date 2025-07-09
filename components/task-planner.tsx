"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Calendar, GripVertical } from "lucide-react"
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

interface Task {
  id: string
  title: string
  priority: "low" | "medium" | "high"
  date: string
  completed: boolean
}

export function TaskPlanner() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete React Components", priority: "high", date: "2024-01-08", completed: false },
    { id: "2", title: "Study Database Design", priority: "medium", date: "2024-01-08", completed: true },
    { id: "3", title: "Practice Algorithm Problems", priority: "high", date: "2024-01-09", completed: false },
    { id: "4", title: "Review System Architecture", priority: "low", date: "2024-01-09", completed: false },
    { id: "5", title: "Build REST API", priority: "medium", date: "2024-01-10", completed: false },
  ])

  const [newTask, setNewTask] = useState({ title: "", priority: "medium" as const, date: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const addTask = () => {
    if (newTask.title && newTask.date) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        priority: newTask.priority,
        date: newTask.date,
        completed: false,
      }
      setTasks([...tasks, task])
      setNewTask({ title: "", priority: "medium", date: "" })
      setIsDialogOpen(false)
    }
  }

  const groupTasksByDate = (tasks: Task[]) => {
    return tasks.reduce(
      (groups, task) => {
        const date = task.date
        if (!groups[date]) {
          groups[date] = []
        }
        groups[date].push(task)
        return groups
      },
      {} as Record<string, Task[]>,
    )
  }

  const incompleteTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)
  const groupedTasks = groupTasksByDate(incompleteTasks)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const TaskItem = ({ task }: { task: Task }) => (
    <div className="flex items-center gap-3 p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
      <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
      <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} className="rounded" />
      <div className="flex-1">
        <span className={task.completed ? "line-through text-muted-foreground" : ""}>{task.title}</span>
      </div>
      <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}>
        {task.priority}
      </Badge>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteTask(task.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Planner</h1>
          <p className="text-muted-foreground">Organize your daily and weekly study tasks</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>Create a new study task with priority and due date.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: any) => setNewTask({ ...newTask, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Due Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newTask.date}
                  onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addTask}>Add Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="overview">Task Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          {Object.entries(groupedTasks).map(([date, dateTasks]) => (
            <Card key={date}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {formatDate(date)}
                </CardTitle>
                <CardDescription>
                  {dateTasks.length} task{dateTasks.length !== 1 ? "s" : ""} scheduled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {dateTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Incomplete Tasks ({incompleteTasks.length})</CardTitle>
                <CardDescription>Tasks that need your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {incompleteTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Completed Tasks ({completedTasks.length})</CardTitle>
                <CardDescription>Well done! Keep up the great work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {completedTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
