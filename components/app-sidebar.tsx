"use client"

import {
  BookOpen,
  CheckSquare,
  Clock,
  Home,
  Archive,
  Moon,
  Sun,
  LogOut,
  Languages,
  Calendar,
  User,
  FileText,
  BarChart3,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/hooks/use-language"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface AppSidebarProps {
  currentView: string
  onViewChange: (view: string) => void
}

export function AppSidebar({ currentView, onViewChange }: AppSidebarProps) {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  const menuItems = [
    {
      title: t("dashboard"),
      icon: Home,
      id: "dashboard",
    },
    {
      title: t("calendar"),
      icon: Calendar,
      id: "calendar",
    },
    {
      title: t("taskOverview"),
      icon: BarChart3,
      id: "taskOverview",
    },
    {
      title: t("taskPlanner"),
      icon: CheckSquare,
      id: "tasks",
    },
    {
      title: t("pomodoroTimer"),
      icon: Clock,
      id: "pomodoro",
    },
    {
      title: t("studyDiary"),
      icon: FileText,
      id: "diary",
    },
    {
      title: t("studyJournal"),
      icon: BookOpen,
      id: "journal",
    },
    {
      title: t("taskArchive"),
      icon: Archive,
      id: "archive",
    },
    {
      title: t("userProfile"),
      icon: User,
      id: "profile",
    },
  ]

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">DK</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">DungKiemTien</h2>
            <p className="text-sm text-muted-foreground">Software Engineering</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Study Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton isActive={currentView === item.id} onClick={() => onViewChange(item.id)}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage("en")}>🇺🇸 English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("vi")}>🇻🇳 Tiếng Việt</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Button variant="ghost" size="icon">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
