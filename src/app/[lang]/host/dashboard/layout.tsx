import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import { redirect } from "next/navigation";
import AccessDenied from "@/components/access";
import { AppSidebar } from "../_components/app-sidebar";
import Header from "../_components/Header2";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session?.user) {
    redirect("en/host/inscription");
  }
  if (session.user.role !== "HOST") {
    return <AccessDenied role={session.user.role} />;
  }
  return (
    <div className="lg:p-0 p-1">
     <SidebarProvider>
    <AppSidebar />
    <SidebarInset className="dark:bg-slate-800 bg-white ">
        <Header/>
      <div className="flex flex-1 flex-col gap-4 lg:p-4 pt-0 bg-white dark:bg-slate-900 ">
        <div className="overflow-x-auto">
          {children}
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
    </div>
  );
}
