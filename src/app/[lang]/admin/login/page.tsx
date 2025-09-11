
import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "../_components/LoginForm";

export default async function AuthButton() {
const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/en/admin/dashboard");
  }
  return (
   <div className="flex h-screen w-full items-center justify-center relative overflow-hidden">
  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
  >
    <source src="/bg.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Dark Overlay */}
  <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

  {/* Login Box */}
  <div className="relative z-20 rounded-xl bg-white/40 border-2 bg-opacity-50 px-16 pb-10 shadow-lg backdrop-blur-sm max-sm:px-8">
    <div className="text-white">
      <LoginForm />
    </div>
  </div>
</div>

  );
}
