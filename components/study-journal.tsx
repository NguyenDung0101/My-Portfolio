"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Edit, Trash2, Lock, Globe, Calendar } from "lucide-react"
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
import { Switch } from "@/components/ui/switch"

interface JournalEntry {
  id: string
  title: string
  content: string
  tags: string[]
  isPublic: boolean
  date: string
  createdAt: string
}

export function StudyJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      title: "React Hooks Deep Dive",
      content:
        "Today I learned about advanced React hooks patterns. The useCallback and useMemo hooks are crucial for performance optimization...",
      tags: ["React", "JavaScript", "Performance"],
      isPublic: false,
      date: "2024-01-08",
      createdAt: "2024-01-08T10:30:00Z",
    },
    {
      id: "2",
      title: "Database Design Principles",
      content:
        "Studied normalization and denormalization strategies. Understanding when to apply each approach is key to building scalable systems...",
      tags: ["Database", "SQL", "Architecture"],
      isPublic: true,
      date: "2024-01-07",
      createdAt: "2024-01-07T15:45:00Z",
    },
  ])

  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    tags: "",
    isPublic: false,
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const addEntry = () => {
    if (newEntry.title && newEntry.content) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        title: newEntry.title,
        content: newEntry.content,
        tags: newEntry.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        isPublic: newEntry.isPublic,
        date: new Date().toISOString().split("T")[0],
        createdAt: new Date().toISOString(),
      }
      setEntries([entry, ...entries])
      setNewEntry({ title: "", content: "", tags: "", isPublic: false })
      setIsDialogOpen(false)
    }
  }

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id))
  }

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const publicEntries = filteredEntries.filter((entry) => entry.isPublic)
  const privateEntries = filteredEntries.filter((entry) => !entry.isPublic)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const JournalCard = ({ entry }: { entry: JournalEntry }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{entry.title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(entry.date)}
              {entry.isPublic ? (
                <Badge variant="outline" className="ml-2">
                  <Globe className="w-3 h-3 mr-1" />
                  Public
                </Badge>
              ) : (
                <Badge variant="secondary" className="ml-2">
                  <Lock className="w-3 h-3 mr-1" />
                  Private
                </Badge>
              )}
            </CardDescription>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteEntry(entry.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{entry.content}</p>
        <div className="flex flex-wrap gap-1">
          {entry.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Journal</h1>
          <p className="text-muted-foreground">Document your learning journey and insights</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Journal Entry</DialogTitle>
              <DialogDescription>Write about what you learned today</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  placeholder="What did you learn today?"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  placeholder="Share your insights, challenges, and breakthroughs..."
                  rows={8}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={newEntry.tags}
                  onChange={(e) => setNewEntry({ ...newEntry, tags: e.target.value })}
                  placeholder="React, JavaScript, Database, etc."
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="public"
                  checked={newEntry.isPublic}
                  onCheckedChange={(checked) => setNewEntry({ ...newEntry, isPublic: checked })}
                />
                <Label htmlFor="public">Make this entry public</Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addEntry}>Create Entry</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Entries ({entries.length})</TabsTrigger>
          <TabsTrigger value="private">Private ({privateEntries.length})</TabsTrigger>
          <TabsTrigger value="public">Public ({publicEntries.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredEntries.map((entry) => (
              <JournalCard key={entry.id} entry={entry} />
            ))}
            {filteredEntries.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No entries found. Start writing your first journal entry!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="private" className="space-y-4">
          <div className="grid gap-4">
            {privateEntries.map((entry) => (
              <JournalCard key={entry.id} entry={entry} />
            ))}
            {privateEntries.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No private entries found.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="public" className="space-y-4">
          <div className="grid gap-4">
            {publicEntries.map((entry) => (
              <JournalCard key={entry.id} entry={entry} />
            ))}
            {publicEntries.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No public entries found.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
