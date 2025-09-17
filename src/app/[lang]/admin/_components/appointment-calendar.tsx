/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useRef } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { Clock, MapPin, User, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppointmentStatus } from "@prisma/client"
import { useRouter } from "next/navigation"

const statusColors : Record<AppointmentStatus, any> ={
  PENDING: "#f59e0b", // amber
  CONFIRMED: "#10b981", // emerald
  COMPLETED: "#6366f1", // indigo
  CANCELLED: "#ef4444", // red
}

const statusLabels = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
}

type Appointment = {
  id: string
  property: {
    owner: {
      name: string
      prenom: string
      email?: string
    }
    id?:string
    title?: string
    city?: string
    address?: string
  }
  scheduledAt: Date
  duration: number
  status: AppointmentStatus
  notes?: string
}
const propertyTypes = [
  "APARTMENT",
  "HOUSE",
  "VILLA",
  "STUDIO",
  "CHAMBREPRIVE",
  "CABANE"
];
 const AppointmentCalendar=({mockAppointments}:{mockAppointments:any[]})=> {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDetailPopoverOpen, setIsDetailPopoverOpen] = useState(false)
  const calendarRef = useRef<FullCalendar>(null)
  const router = useRouter();

  const calendarEvents = appointments.map((appointment) => ({
    id: appointment.id,
    title: `${appointment.property.owner.name} - ${appointment.property?.owner.prenom}`,
    start: appointment.scheduledAt,
    end: new Date(appointment.scheduledAt.getTime() + appointment.duration * 60000),
    backgroundColor: statusColors[appointment.status],
    borderColor: statusColors[appointment.status],
    textColor: "#ffffff",
    extendedProps: {
      appointment: appointment,
    },
  }))

  const handleEventClick = (clickInfo: any) => {
    const appointment = clickInfo.event.extendedProps.appointment
    setSelectedAppointment(appointment)
    setIsDetailPopoverOpen(true)
  }

  const handleDateClick = (selectInfo: any) => {
    setIsCreateDialogOpen(true)
  }

  const handleEventDrop = (dropInfo: any) => {
    const appointmentId = dropInfo.event.id
    const newStart = dropInfo.event.start

    setAppointments((prev) => prev.map((apt) => (apt.id === appointmentId ? { ...apt, scheduledAt: newStart } : apt)))

    console.log(`Appointment ${appointmentId} moved to ${newStart}`)
  }

  const handleEventResize = (resizeInfo: any) => {
    const appointmentId = resizeInfo.event.id
    const newEnd = resizeInfo.event.end
    const newStart = resizeInfo.event.start
    const newDuration = Math.round((newEnd - newStart) / (1000 * 60)) // Convert to minutes

    setAppointments((prev) => prev.map((apt) => (apt.id === appointmentId ? { ...apt, duration: newDuration } : apt)))

    console.log(`Appointment ${appointmentId} resized to ${newDuration} minutes`)
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Appointment Calendar</h1>
          
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Appointment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client-name">Client Name</Label>
                  <Input id="client-name" placeholder="Enter client name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-email">Client Email</Label>
                  <Input id="client-email" type="email" placeholder="Enter email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="property">Property</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                     {propertyTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                          {type}
                                        </SelectItem>
                                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Add any special notes..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>Create Appointment</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={calendarEvents}
            editable={true}
            droppable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            height="auto"
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday - Saturday
              startTime: "09:00",
              endTime: "18:00",
            }}
            eventDisplay="block"
            eventTextColor="#244B35"
            nowIndicator={true}
            scrollTime="09:00:00"
            allDaySlot={false}
            slotDuration="00:30:00"
            snapDuration="00:15:00"
            eventOverlap={false}
            slotLabelFormat={{
              hour: "numeric",
              minute: "2-digit",
              omitZeroMinute: false,
              meridiem: "short",
            }}
          />
        </CardContent>
      </Card>

      {selectedAppointment && (
        <Dialog open={isDetailPopoverOpen} onOpenChange={setIsDetailPopoverOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between mt-4">
                {selectedAppointment.property?.title}
                <Badge
                  style={{
                    backgroundColor: statusColors[selectedAppointment.status],
                    color: "#ffffff",
                  }}
                >
                  {statusLabels[selectedAppointment.status]}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Client</span>
                  </div>
                  <p>{selectedAppointment.property?.owner.name}-{selectedAppointment.property?.owner.prenom}</p>
                  <p className="text-sm text-muted-foreground">{selectedAppointment.property?.owner.email}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Schedule</span>
                  </div>
                  <p>{selectedAppointment.scheduledAt.toLocaleDateString()}</p>
                 
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Property</span>
                </div>
                <p>{selectedAppointment.property?.city}-{selectedAppointment.property?.address}</p>
              </div>
              {selectedAppointment.notes && (
                <div className="space-y-2">
                  <span className="font-medium">Notes</span>
                  <p className="text-muted-foreground">{selectedAppointment.notes}</p>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Edit Appointment
                </Button>
                <Button onClick={()=>router.push(`/fr/admin/dashboard/properties/${selectedAppointment.property.id}`)} variant="outline" className="flex-1 bg-transparent">
                  property detials
                </Button>
                <Button variant="destructive" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: statusColors.CONFIRMED }}>
              {appointments.filter((apt) => apt.status === "CONFIRMED").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: statusColors.PENDING }}>
              {appointments.filter((apt) => apt.status === "PENDING").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                appointments.filter((apt) => {
                  const aptDate = new Date(apt.scheduledAt)
                  const now = new Date()
                  const weekStart = new Date(now)
                  weekStart.setDate(now.getDate() - now.getDay())
                  const weekEnd = new Date(weekStart)
                  weekEnd.setDate(weekStart.getDate() + 6)
                  return aptDate >= weekStart && aptDate <= weekEnd
                }).length
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default AppointmentCalendar