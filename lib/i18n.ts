export const languages = {
  en: "English",
  vi: "Tiếng Việt",
}

export const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    taskPlanner: "Task Planner",
    pomodoroTimer: "Pomodoro Timer",
    studyJournal: "Study Journal",
    taskArchive: "Task Archive",
    calendar: "Calendar",
    taskOverview: "Task Overview",
    userProfile: "User Profile",
    studyDiary: "Study Diary",

    // Dashboard
    welcomeBack: "Welcome back, DungKiemTien! Here's your study progress overview.",
    todayStudyTime: "Today's Study Time",
    completedTasks: "Completed Tasks",
    completionRate: "Completion Rate",
    weeklyAverage: "Weekly Average",
    weeklyStudyHours: "Weekly Study Hours",
    studyTrend: "Study Trend",
    todayTasks: "Today's Tasks",
    remaining: "remaining",
    fromYesterday: "from yesterday",
    fromLastWeek: "from last week",

    // Task Management
    addTask: "Add Task",
    editTask: "Edit Task",
    deleteTask: "Delete Task",
    taskTitle: "Task Title",
    taskDescription: "Task Description",
    priority: "Priority",
    dueDate: "Due Date",
    status: "Status",
    low: "Low",
    medium: "Medium",
    high: "High",
    pending: "Pending",
    inProgress: "In Progress",
    completed: "Completed",
    overdue: "Overdue",

    // Pomodoro
    studySession: "Study Session",
    shortBreak: "Short Break",
    longBreak: "Long Break",
    start: "Start",
    pause: "Pause",
    reset: "Reset",
    settings: "Settings",
    studyTime: "Study Time",
    completedSessions: "Completed Sessions",

    // Journal
    newEntry: "New Entry",
    title: "Title",
    content: "Content",
    tags: "Tags",
    private: "Private",
    public: "Public",
    search: "Search",

    // Archive
    totalCompleted: "Total Completed",
    thisWeek: "This Week",
    highPriority: "High Priority",
    categories: "Categories",
    restore: "Restore",

    // Common
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    create: "Create",
    update: "Update",
    confirm: "Confirm",
    confirmDelete: "Are you sure you want to delete this item?",
    yes: "Yes",
    no: "No",
  },
  vi: {
    // Navigation
    dashboard: "Bảng điều khiển",
    taskPlanner: "Quản lý nhiệm vụ",
    pomodoroTimer: "Đồng hồ Pomodoro",
    studyJournal: "Nhật ký học tập",
    taskArchive: "Lưu trữ nhiệm vụ",
    calendar: "Lịch",
    taskOverview: "Tổng quan nhiệm vụ",
    userProfile: "Thông tin cá nhân",
    studyDiary: "Nhật ký học tập",

    // Dashboard
    welcomeBack: "Chào mừng trở lại, DungKiemTien! Đây là tổng quan tiến độ học tập của bạn.",
    todayStudyTime: "Thời gian học hôm nay",
    completedTasks: "Nhiệm vụ hoàn thành",
    completionRate: "Tỷ lệ hoàn thành",
    weeklyAverage: "Trung bình tuần",
    weeklyStudyHours: "Giờ học trong tuần",
    studyTrend: "Xu hướng học tập",
    todayTasks: "Nhiệm vụ hôm nay",
    remaining: "còn lại",
    fromYesterday: "so với hôm qua",
    fromLastWeek: "so với tuần trước",

    // Task Management
    addTask: "Thêm nhiệm vụ",
    editTask: "Sửa nhiệm vụ",
    deleteTask: "Xóa nhiệm vụ",
    taskTitle: "Tiêu đề nhiệm vụ",
    taskDescription: "Mô tả nhiệm vụ",
    priority: "Độ ưu tiên",
    dueDate: "Hạn chót",
    status: "Trạng thái",
    low: "Thấp",
    medium: "Vừa",
    high: "Cao",
    pending: "Chờ xử lý",
    inProgress: "Đang thực hiện",
    completed: "Hoàn thành",
    overdue: "Quá hạn",

    // Pomodoro
    studySession: "Phiên học tập",
    shortBreak: "Nghỉ ngắn",
    longBreak: "Nghỉ dài",
    start: "Bắt đầu",
    pause: "Tạm dừng",
    reset: "Đặt lại",
    settings: "Cài đặt",
    studyTime: "Thời gian học",
    completedSessions: "Phiên đã hoàn thành",

    // Journal
    newEntry: "Bài viết mới",
    title: "Tiêu đề",
    content: "Nội dung",
    tags: "Thẻ",
    private: "Riêng tư",
    public: "Công khai",
    search: "Tìm kiếm",

    // Archive
    totalCompleted: "Tổng đã hoàn thành",
    thisWeek: "Tuần này",
    highPriority: "Ưu tiên cao",
    categories: "Danh mục",
    restore: "Khôi phục",

    // Common
    save: "Lưu",
    cancel: "Hủy",
    delete: "Xóa",
    edit: "Sửa",
    create: "Tạo",
    update: "Cập nhật",
    confirm: "Xác nhận",
    confirmDelete: "Bạn có chắc chắn muốn xóa mục này không?",
    yes: "Có",
    no: "Không",
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en
