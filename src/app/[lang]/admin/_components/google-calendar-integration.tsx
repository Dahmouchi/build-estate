"use client"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CalendarViewProps {
  currentDate: Date
}

export function CalendarView({ currentDate }: CalendarViewProps) {
  // Sample meeting data
  const meetings = [
    { id: 1, title: "Team Standup", date: new Date(2025, 4, 13, 10, 0), duration: 30, hasAssistant: true },
    { id: 2, title: "Product Review", date: new Date(2025, 4, 13, 14, 0), duration: 60, hasAssistant: false },
    { id: 3, title: "Client Meeting", date: new Date(2025, 4, 15, 11, 0), duration: 45, hasAssistant: true },
    { id: 4, title: "Weekly Planning", date: new Date(2025, 4, 17, 9, 0), duration: 60, hasAssistant: false },
    { id: 5, title: "Design Review", date: new Date(2025, 4, 18, 15, 30), duration: 45, hasAssistant: true },
  ]

  // Generate calendar days for the current month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  // Get meetings for a specific day
  const getMeetingsForDay = (day: number) => {
    return meetings.filter((meeting) => {
      const meetingDate = meeting.date
      return meetingDate.getFullYear() === year && meetingDate.getMonth() === month && meetingDate.getDate() === day
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {blanks.map((blank) => (
          <div key={`blank-${blank}`} className="h-24 p-1" />
        ))}
        {days.map((day) => {
          const dayMeetings = getMeetingsForDay(day)
          const isToday =
            new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year

          return (
            <Card key={`day-${day}`} className={`h-24 overflow-hidden p-1 ${isToday ? "border-primary" : ""}`}>
              <div className="flex justify-between">
                <span className={`text-sm font-medium ${isToday ? "text-primary" : ""}`}>{day}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-1 space-y-1 overflow-hidden">
                {dayMeetings.slice(0, 2).map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between truncate rounded bg-primary/10 px-1 py-0.5 text-xs"
                    title={meeting.title}
                  >
                    <span>
                      {meeting.date.getHours()}:{meeting.date.getMinutes().toString().padStart(2, "0")} {meeting.title}
                    </span>
                    {meeting.hasAssistant && (
                      <Badge
                        variant="outline"
                        className="ml-1 h-4 border-green-200 bg-green-100 px-1 text-[10px] text-green-800 dark:border-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        A
                      </Badge>
                    )}
                  </div>
                ))}
                {dayMeetings.length > 2 && (
                  <div className="text-xs text-muted-foreground">+{dayMeetings.length - 2} more</div>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
