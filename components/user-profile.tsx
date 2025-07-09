"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Upload, Save, User, Mail, Phone, MapPin, Calendar, Award } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  bio: string
  avatar: string
  joinDate: string
  studyStreak: number
  totalHours: number
  completedTasks: number
  achievements: string[]
}

interface SavedImage {
  id: string
  name: string
  url: string
  uploadDate: string
  size: string
}

export function UserProfile() {
  const { t } = useLanguage()
  const [profile, setProfile] = useState<UserProfile>({
    name: "DungKiemTien",
    email: "dungkiemtien@gmail.com",
    phone: "+84 123 456 789",
    location: "Hồ Chí Minh, Việt Nam",
    bio: "Sinh viên Công nghệ Phần mềm, đam mê học hỏi và phát triển bản thân. Yêu thích lập trình web và mobile app development.",
    avatar: "/placeholder.svg?height=100&width=100",
    joinDate: "2023-09-01",
    studyStreak: 15,
    totalHours: 245,
    completedTasks: 127,
    achievements: ["Học 7 ngày liên tiếp", "Hoàn thành 100 nhiệm vụ", "Học 200+ giờ", "Chuyên gia React"],
  })

  const [savedImages, setSavedImages] = useState<SavedImage[]>([
    {
      id: "1",
      name: "react-diagram.png",
      url: "/placeholder.svg?height=200&width=300",
      uploadDate: "2024-01-08",
      size: "245 KB",
    },
    {
      id: "2",
      name: "database-schema.jpg",
      url: "/placeholder.svg?height=200&width=300",
      uploadDate: "2024-01-07",
      size: "512 KB",
    },
    {
      id: "3",
      name: "algorithm-notes.png",
      url: "/placeholder.svg?height=200&width=300",
      uploadDate: "2024-01-06",
      size: "189 KB",
    },
  ])

  const [isEditing, setIsEditing] = useState(false)

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would typically save to a backend
    console.log("Profile saved:", profile)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage: SavedImage = {
          id: Date.now().toString(),
          name: file.name,
          url: e.target?.result as string,
          uploadDate: new Date().toISOString().split("T")[0],
          size: `${Math.round(file.size / 1024)} KB`,
        }
        setSavedImages([newImage, ...savedImages])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile({ ...profile, avatar: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">👤 Thông tin cá nhân</h1>
        <p className="text-muted-foreground">Quản lý thông tin và cài đặt tài khoản của bạn</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
          <TabsTrigger value="stats">Thống kê</TabsTrigger>
          <TabsTrigger value="images">Hình ảnh</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                  <CardDescription>Cập nhật thông tin và avatar của bạn</CardDescription>
                </div>
                <Button
                  onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                  variant={isEditing ? "default" : "outline"}
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Lưu
                    </>
                  ) : (
                    "Chỉnh sửa"
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="text-2xl">
                      {profile.name.split("").slice(0, 2).join("").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <label className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                      <Camera className="w-4 h-4" />
                      <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                    </label>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{profile.name}</h3>
                  <p className="text-muted-foreground">Sinh viên Công nghệ Phần mềm</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">
                      <Calendar className="w-3 h-3 mr-1" />
                      Tham gia từ {new Date(profile.joinDate).toLocaleDateString("vi-VN")}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Địa chỉ</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Giới thiệu bản thân</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Viết vài dòng về bản thân..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Chuỗi học tập</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{profile.studyStreak}</div>
                <p className="text-xs text-muted-foreground">ngày liên tiếp</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tổng giờ học</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{profile.totalHours}h</div>
                <p className="text-xs text-muted-foreground">tất cả thời gian</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Nhiệm vụ hoàn thành</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{profile.completedTasks}</div>
                <p className="text-xs text-muted-foreground">nhiệm vụ</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Thành tích</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{profile.achievements.length}</div>
                <p className="text-xs text-muted-foreground">huy hiệu</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Thành tích đạt được
              </CardTitle>
              <CardDescription>Các huy hiệu và thành tích bạn đã mở khóa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {profile.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">{achievement}</h4>
                      <p className="text-sm text-muted-foreground">Đã mở khóa</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Thư viện hình ảnh</CardTitle>
                  <CardDescription>Lưu trữ và quản lý hình ảnh học tập của bạn</CardDescription>
                </div>
                <label className="cursor-pointer">
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Tải lên
                  </Button>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {savedImages.map((image) => (
                  <Card key={image.id} className="overflow-hidden">
                    <div className="aspect-video bg-muted">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-medium truncate">{image.name}</h4>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
                        <span>{image.size}</span>
                        <span>{new Date(image.uploadDate).toLocaleDateString("vi-VN")}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {savedImages.length === 0 && (
                <div className="text-center py-8">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Chưa có hình ảnh nào được lưu</p>
                  <p className="text-sm text-muted-foreground">Tải lên hình ảnh đầu tiên của bạn</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
