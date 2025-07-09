"use client"

import { useState, useEffect } from "react"

export function useVietnamTime() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const updateTime = () => {
      // Tạo thời gian hiện tại theo múi giờ Việt Nam (UTC+7)
      const now = new Date()
      const vietnamTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }))
      setCurrentTime(vietnamTime)
    }

    // Cập nhật ngay lập tức
    updateTime()

    // Cập nhật mỗi giây
    const timer = setInterval(updateTime, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return {
    currentTime,
    formatTime,
    formatDate,
    formatShortDate,
  }
}
