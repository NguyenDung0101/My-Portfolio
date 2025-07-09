"use client";

import { useState, useEffect, useRef } from "react";
import {
  Moon,
  Sun,
  Github,
  Facebook,
  Mail,
  MapPin,
  Download,
  ExternalLink,
  Calendar,
  GraduationCap,
  Briefcase,
  Code,
  Database,
  Menu,
  X,
  ChevronDown,
  Target,
  TrendingUp,
  Rocket,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const languages: Language[] = [
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", name: "English", flag: "🇺🇸" },
];

const translations: Translations = {
  vi: {
    // Navigation
    about: "Giới thiệu",
    skills: "Kỹ năng",
    projects: "Dự án",
    experience: "Kinh nghiệm",
    education: "Học vấn",
    career: "Định hướng",
    contact: "Liên hệ",

    // Hero
    heroTitle: "Fullstack Developer",
    heroSubtitle:
      "Sinh viên Kỹ thuật phần mềm tại Đại học Kinh tế TP.HCM, đam mê phát triển ứng dụng web hiện đại",
    downloadCV: "Tải CV",
    contactMe: "Liên hệ",

    // About
    aboutTitle: "Giới thiệu",
    aboutDesc1:
      "Tôi là Nguyễn Tuấn Dũng, sinh viên năm cuối ngành Kỹ thuật phần mềm tại Đại học Kinh tế TP.HCM. Với đam mê phát triển ứng dụng web, tôi đang theo đuổi con đường trở thành Fullstack Developer.",
    aboutDesc2:
      "Tôi đã có 6 tháng kinh nghiệm làm việc thực tế tại công ty VSM - VietNam Student Marathon, nơi tôi được học hỏi và áp dụng các công nghệ hiện đại trong phát triển web.",

    // Skills
    skillsTitle: "Kỹ năng chuyên môn",
    frontend: "Frontend",
    backend: "Backend",
    database: "Cơ sở dữ liệu",

    // Projects
    projectsTitle: "Dự án cá nhân",
    inProgress: "Đang phát triển",
    completed: "Hoàn thành",

    // Experience
    experienceTitle: "Kinh nghiệm",
    internTitle: "Thực tập sinh tại công ty VSM - VietNam Student Marathon",
    internDesc:
      "Tham gia phát triển ứng dụng web, học hỏi quy trình làm việc chuyên nghiệp và áp dụng các công nghệ hiện đại trong môi trường thực tế.",

    experienceTitle: "Kinh nghiệm",
    internTitle: "Thực tập sinh tại công ty VSM - VietNam Student Marathon",
    internDesc:
      "Tham gia phát triển ứng dụng web, học hỏi quy trình làm việc chuyên nghiệp và áp dụng các công nghệ hiện đại trong môi trường thực tế.",

    // Education
    educationTitle: "Học vấn",
    university: "Đại học Kinh tế TP.HCM",
    major: "Kỹ thuật phần mềm",
    finalYear: "Sinh viên năm cuối",

    // Career Goals
    careerTitle: "Định hướng nghề nghiệp",
    careerSubtitle: "Lộ trình phát triển sự nghiệp trong 5 năm tới",
    shortTerm: "Ngắn hạn (1-2 năm)",
    mediumTerm: "Trung hạn (2-3 năm)",
    longTerm: "Dài hạn (3-5 năm)",

    // Contact
    contactTitle: "Liên hệ",
    contactInfo: "Thông tin liên hệ",
    sendMessage: "Gửi tin nhắn",
    fullName: "Họ tên",
    subject: "Chủ đề",
    message: "Nội dung tin nhắn",
    send: "Gửi tin nhắn",

    // Footer
    footerText: "Được thiết kế với ❤️ và Next.js",
  },
  en: {
    // Navigation
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
    career: "Career",
    contact: "Contact",

    // Hero
    heroTitle: "Fullstack Developer",
    heroSubtitle:
      "Software Engineering student at University of Economics Ho Chi Minh City, passionate about modern web application development",
    downloadCV: "Download CV",
    contactMe: "Contact Me",

    // About
    aboutTitle: "About Me",
    aboutDesc1:
      "I'm Nguyen Tuan Dung, a final-year Software Engineering student at University of Economics Ho Chi Minh City. With a passion for web application development, I'm pursuing the path to become a Fullstack Developer.",
    aboutDesc2:
      "I have 2 months of practical work experience at a VSM - VietNam Student Marathon company, where I learned and applied modern technologies in web development.",

    // Skills
    skillsTitle: "Technical Skills",
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",

    // Projects
    projectsTitle: "Personal Projects",
    inProgress: "In Progress",
    completed: "Completed",

    // Experience
    experienceTitle: "Experience",
    internTitle: "Software Development Intern",
    internDesc:
      "Participated in web application development, learned professional workflow and applied modern technologies in real-world environment.",

    // Education
    educationTitle: "Education",
    university: "University of Economics Ho Chi Minh City",
    major: "Software Engineering",
    finalYear: "Final Year Student",

    // Career Goals
    careerTitle: "Career Goals",
    careerSubtitle: "Career development roadmap for the next 5 years",
    shortTerm: "Short-term (1-2 years)",
    mediumTerm: "Medium-term (2-3 years)",
    longTerm: "Long-term (3-5 years)",

    // Contact
    contactTitle: "Contact",
    contactInfo: "Contact Information",
    sendMessage: "Send Message",
    fullName: "Full Name",
    subject: "Subject",
    message: "Message",
    send: "Send Message",

    // Footer
    footerText: "Designed with ❤️ and Next.js",
  },
};

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("vi");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const t = (key: string) => translations[language][key] || key;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = [
        "hero",
        "about",
        "skills",
        "projects",
        "experience",
        "career",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: t("about") },
    { id: "skills", label: t("skills") },
    { id: "projects", label: t("projects") },
    { id: "experience", label: t("experience") },
    { id: "career", label: t("career") },
    { id: "contact", label: t("contact") },
  ];

  const skills = {
    frontend: [
      { name: "HTML", level: 90, icon: "🌐" },
      { name: "CSS", level: 85, icon: "🎨" },
      { name: "Bootstrap", level: 80, icon: "🅱️" },
      { name: "Tailwind CSS", level: 85, icon: "💨" },
      { name: "NextJS", level: 85, icon: "⚡️" },
    ],
    backend: [
      { name: "Node.js", level: 75, icon: "🟢" },
      { name: "NestJS", level: 70, icon: "🐱" },
    ],
    database: [
      { name: "MongoDB", level: 70, icon: "🍃" },
      { name: "MySQL", level: 70, icon: "🐬" },
    ],
  };

  const projects = [
    {
      title:
        language === "vi"
          ? "Website Thương mại điện tử cho UEH SHOP"
          : "E-commerce Website for UEH SHOP",
      description:
        language === "vi"
          ? "Trang web thương mại điện tử React với Node.js và MongoDB"
          : "E-commerce website built React with Node.js and MongoDB",
      tech: ["Node.js", "MongoDB", "Tailwind CSS", "React"],
      status: t("completed"), //inProgress
      image: "/img/UEH-shop.png",
      link: "https://ueh-store-frontend-nhom9.onrender.com/",
    },
    {
      title:
        language === "vi" ? "Ứng dụng Quản lý Học Tập" : "Study Management App",
      description:
        language === "vi"
          ? "Ứng dụng quản lý học tập với NestJS"
          : "Study management application with NestJS",
      tech: ["NextJS", "Tailwind CSS"],
      status: t("completed"),
      image: "/img/Study-Management-App.png",
      link: "https://management-study-v1.vercel.app/",
    },
    {
      title: language === "vi" ? "Website Portfolio" : "Portfolio Website",
      description:
        language === "vi"
          ? "Website portfolio cá nhân responsive"
          : "Responsive personal portfolio website",
      tech: ["NestJS", "Tailwind CSS", "NextJS"],
      status: t("completed"),
      image: "/img/Porfolio.png", ///placeholder.svg?height=200&width=300
      link: "https://my-portfolio-delta-inky-32.vercel.app/",
    },
  ];

  const careerGoals = [
    {
      period: t("shortTerm"),
      icon: <Target className="h-8 w-8" />,
      goals:
        language === "vi"
          ? [
              "Hoàn thành tốt nghiệp với GPA > 3.5",
              "Tìm vị trí Junior Fullstack Developer",
              "Nâng cao kỹ năng React và TypeScript",
              "Học thêm về DevOps và CI/CD",
            ]
          : [
              "Graduate with GPA > 3.5",
              "Find Junior Fullstack Developer position",
              "Improve React and TypeScript skills",
              "Learn DevOps and CI/CD",
            ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      period: t("mediumTerm"),
      icon: <TrendingUp className="h-8 w-8" />,
      goals:
        language === "vi"
          ? [
              "Trở thành Senior Developer",
              "Dẫn dắt team nhỏ (3-5 người)",
              "Chuyên sâu về Cloud Computing",
              "Đóng góp cho Open Source projects",
            ]
          : [
              "Become Senior Developer",
              "Lead small team (3-5 people)",
              "Specialize in Cloud Computing",
              "Contribute to Open Source projects",
            ],
      color: "from-purple-500 to-pink-500",
    },
    {
      period: t("longTerm"),
      icon: <Rocket className="h-8 w-8" />,
      goals:
        language === "vi"
          ? [
              "Đạt vị trí Tech Lead/Architect",
              "Khởi nghiệp công ty công nghệ",
              "Mentor cho thế hệ developer trẻ",
              "Trở thành chuyên gia về AI/ML",
            ]
          : [
              "Achieve Tech Lead/Architect position",
              "Start own tech company",
              "Mentor young developers",
              "Become AI/ML expert",
            ],
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-gray-900 dark:text-white">
        {/* Navigation */}
        <nav
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-200/20 dark:border-gray-700/20"
              : "bg-transparent"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden">
                  {/* <span className="text-white font-bold text-lg">ND</span> */}
                  <Image
                    src="/img/Avartar cá nhân.jpg"
                    alt="Avatar"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Nguyễn Tuấn Dũng
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                      activeSection === item.id
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-3">
                {/* Language Switcher */}
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="appearance-none bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {languages.map((lang) => (
                      <option
                        key={lang.code}
                        value={lang.code}
                        className="bg-white dark:bg-gray-800"
                      >
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>

                {/* Mobile Menu Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden rounded-full"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in-down">
                <div className="flex flex-col space-y-2 pt-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeSection === item.id
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="hero"
          ref={heroRef}
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float-delayed"></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in-up">
              {/* Avatar */}
              <div className="mb-8 relative">
                <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 animate-spin-slow overflow-hidden">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                    <Image
                      src="/img/Avartar cá nhân.jpg"
                      alt="Avatar"
                      width={152}
                      height={152}
                      className="rounded-full"
                    />
                    {/* <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ">ND
                    </span> */}
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 animate-pulse"></div>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t("heroTitle")}
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                {t("heroSubtitle")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Download className="mr-2 h-5 w-5" />
                  {t("downloadCV")}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-4 rounded-full border-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transform hover:scale-105 transition-all duration-300"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {t("contactMe")}
                </Button>
              </div>

              {/* Scroll Indicator */}
              <div className="animate-bounce">
                <ChevronDown
                  className="h-8 w-8 mx-auto text-gray-400 cursor-pointer"
                  onClick={() => scrollToSection("about")}
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-20 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t("aboutTitle")}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in-left">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t("aboutDesc1")}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t("aboutDesc2")}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      3.2
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      GPA
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      590
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      TOEIC
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-fade-in-right">
                <Card className="p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                      <div>
                        <div className="font-semibold">{t("university")}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {t("major")}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30">
                      <Briefcase className="h-6 w-6 text-purple-600" />
                      <div>
                        <div className="font-semibold">
                          6 {language === "vi" ? "tháng" : "months"}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {language === "vi"
                            ? "Kinh nghiệm thực tế"
                            : "Practical Experience"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30">
                      <MapPin className="h-6 w-6 text-green-600" />
                      <div>
                        <div className="font-semibold">TP. Hồ Chí Minh</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {language === "vi" ? "Địa điểm" : "Location"}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t("skillsTitle")}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Frontend Skills */}
              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:animate-spin">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{t("frontend")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {skills.frontend.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="flex items-center gap-2 font-medium">
                          <span className="text-lg">{skill.icon}</span>
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-1000 ease-out animate-skill-bar"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Backend Skills */}
              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center group-hover:animate-pulse">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{t("backend")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {skills.backend.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="flex items-center gap-2 font-medium">
                          <span className="text-lg">{skill.icon}</span>
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out animate-skill-bar"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Database Skills */}
              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-1">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center group-hover:animate-bounce">
                    <Database className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{t("database")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {skills.database.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="flex items-center gap-2 font-medium">
                          <span className="text-lg">{skill.icon}</span>
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-1000 ease-out animate-skill-bar"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-20 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t("projectsTitle")}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link href={project.link} target="_blank">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.title}
                      <Badge
                        variant={
                          project.status === t("completed")
                            ? "default"
                            : "outline"
                        }
                      >
                        {project.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Experience & Education */}
        <section id="experience" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Experience */}
              <div className="animate-fade-in-left">
                <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <Briefcase className="h-8 w-8 text-blue-600" />
                  {t("experienceTitle")}
                </h3>
                <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div>{t("internTitle")}</div>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />2{" "}
                          {language === "vi"
                            ? "tháng kinh nghiệm thực tế"
                            : "months practical experience"}
                        </CardDescription>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t("internDesc")}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="outline">Web Development</Badge>
                      <Badge variant="outline">Team Collaboration</Badge>
                      <Badge variant="outline">Modern Technologies</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Education */}
              <div className="animate-fade-in-right">
                <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <GraduationCap className="h-8 w-8 text-purple-600" />
                  {t("educationTitle")}
                </h3>
                <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div>{t("university")}</div>
                        <CardDescription>{t("major")}</CardDescription>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          3.2
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          GPA
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          590
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          TOEIC
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        {t("finalYear")}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Career Goals Section */}
        <section
          id="career"
          className="py-20 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t("careerTitle")}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {t("careerSubtitle")}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {careerGoals.map((goal, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${goal.color}`}></div>
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${goal.color} flex items-center justify-center text-white group-hover:animate-pulse`}
                    >
                      {goal.icon}
                    </div>
                    <CardTitle className="text-xl">{goal.period}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {goal.goals.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 group/item hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 rounded-lg transition-colors"
                        >
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${goal.color} mt-2 flex-shrink-0 group-hover/item:animate-ping`}
                          ></div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t("contactTitle")}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="animate-fade-in-left">
                <h4 className="text-2xl font-semibold mb-8">
                  {t("contactInfo")}
                </h4>
                <div className="space-y-6">
                  <a
                    href="mailto:dnguyentuan03@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 transform hover:scale-105 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:animate-pulse">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-600 dark:text-gray-400">
                        dnguyentuan03@gmail.com
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://github.com/NguyenDung0101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800/50 dark:hover:to-gray-700/50 transition-all duration-300 transform hover:scale-105 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center group-hover:animate-spin">
                      <Github className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">GitHub</div>
                      <div className="text-gray-600 dark:text-gray-400">
                        github.com/NguyenDung0101
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://www.facebook.com/dung.nguyentuan.5205/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 transition-all duration-300 transform hover:scale-105 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center group-hover:animate-bounce">
                      <Facebook className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Facebook</div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Facebook Profile
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="animate-fade-in-right">
                <Card className="shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Send className="h-6 w-6 text-blue-600" />
                      {t("sendMessage")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          placeholder={t("fullName")}
                          className="focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        />
                        <Input
                          type="email"
                          placeholder="Email"
                          className="focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        />
                      </div>
                      <Input
                        placeholder={t("subject")}
                        className="focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      />
                      <Textarea
                        placeholder={t("message")}
                        rows={5}
                        className="focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      />
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        <Send className="mr-2 h-5 w-5" />
                        {t("send")}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
          <div className="container mx-auto">
            <div className="text-center">
              <div className="flex justify-center items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">ND</span>
                </div>
                <span className="text-2xl font-bold">Nguyễn Tuấn Dũng</span>
              </div>

              <div className="flex justify-center gap-6 mb-8">
                <a
                  href="mailto:dnguyentuan03@gmail.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  <Mail className="h-6 w-6" />
                </a>
                <a
                  href="https://github.com/NguyenDung0101"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://www.facebook.com/dung.nguyentuan.5205/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <p className="text-gray-300">
                  © 2024 Nguyễn Tuấn Dũng. {t("footerText")}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
