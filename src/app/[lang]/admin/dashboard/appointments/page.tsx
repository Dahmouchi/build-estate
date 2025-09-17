import { getAppointments } from "@/actions/appointment";
import AppointmentCalendar from "../../_components/appointment-calendar";

export default async function Home() {
     const appointments = await getAppointments();
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
      
        <AppointmentCalendar mockAppointments={appointments}/>
      </div>
    </main>
  )
}
