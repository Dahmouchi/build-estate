/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import {
  AlignJustify,
  HelpCircle,
  LogIn,
  LogOut,
  Menu,
  User,
  UserPlus,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  DialogFooter,
  useDialogDropdownFix,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.602 32.91 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.152 7.963 3.037l5.657-5.657C33.24 6.053 28.862 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.816C14.325 16.108 18.789 12 24 12c3.059 0 5.842 1.152 7.963 3.037l5.657-5.657C33.24 6.053 28.862 4 24 4 16.318 4 9.676 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c4.957 0 9.465-1.897 12.879-4.993l-5.949-5.026C29.842 35.152 27.059 36 24 36c-5.2 0-9.566-3.072-11.29-7.367l-6.54 5.036C9.507 39.541 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-1.002 3.004-3.212 5.484-6.225 6.981l.005-.003 5.949 5.026C33.01 41.287 40 36 40 24c0-1.341-.138-2.651-.389-3.917z"
      />
    </svg>
  );
}

export default function AuthDialogButton({lang}:any) {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, update } = useSession();
  const router = useRouter();
  const [ta, setTa] = useState("login");
  const signInWithGoogle = (mode: string) => {
    signIn("google");
    setOpen(false);
  };

  const sendOtp = () => {
    console.log("Send OTP to:", phone);
    setOtpSent(true);
  };

  const verifyOtp = (mode: string) => {
    console.log(`Verify OTP (${mode})`, otp);
    setOpen(false);
  };
  const { dialogOpen, setDialogOpen, dropdownOpen, setDropdownOpen, handleDialogOpen } = useDialogDropdownFix()

  return (
     <>
      {/* DropdownMenu with modal={false} */}
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen} modal={false}>
        <DropdownMenuTrigger asChild>
           <Button
                  variant="outline"
                  className="glass-search bg-white border-gray-200/50 hover:shadow-md transition-all duration-200 rounded-full px-3 py-2 h-auto "
                >                 
            <AlignJustify className="h-5 w-5" />
            
            {session && (
              <Avatar className="h-5 w-5 rounded-lg ml-2">
                {session.user.image ? (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="rounded-full"
                  />
                ) : (
                  <AvatarFallback className="rounded-lg">
                    {session.user.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {/* Aide */}
          <DropdownMenuItem onClick={() => router.push("/help")}>
            <HelpCircle className="h-4 w-4 mr-2" />
            Centre d&apos;aide
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {session ? (
            <>
              {/* Tableau de bord / Devenir hôte */}
              <DropdownMenuItem
                onClick={() =>
                  session.user.role === "HOST"
                    ? router.push(`/${lang}/host/dashboard`)
                    : router.push(`/${lang}/host/inscription`)
                }
                className="cursor-pointer"
              >
                <img src="/images/apartment.png" alt="" className="w-6 h-6 mr-2" />
                {session.user.role === "HOST"
                  ? "Tableau de bord hôte"
                  : "Devenir hôte"}
              </DropdownMenuItem>

              {/* Déconnexion */}
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                className="cursor-pointer text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Se déconnecter
              </DropdownMenuItem>
            </>
          ) : (
            <>
              {/* Connexion */}
              <DropdownMenuItem onSelect={handleDialogOpen} onClick={()=>setTa("login")} className="cursor-pointer">
                <LogIn className="h-4 w-4 mr-2" />
                Se connecter
              </DropdownMenuItem>

              {/* Inscription */}
              <DropdownMenuItem onSelect={handleDialogOpen} onClick={()=>setTa("register")} className="cursor-pointer">
                <UserPlus className="h-4 w-4 mr-2" />
                Créer un compte
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Controlled Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Welcome</DialogTitle>
            <DialogDescription>
              Login or create an account to continue.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue={ta} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Login tab */}
            <TabsContent value="login" className="mt-4 space-y-4">
              <Button
                onClick={() => signInWithGoogle("login")}
                className="w-full gap-2 rounded-xl"
                variant="secondary"
              >
                <GoogleIcon />
                Continue with Google
              </Button>
              {!otpSent ? (
                <div className="space-y-2">
                  <Label>Phone number</Label>
                  <div className="flex gap-2">
                    <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <Button onClick={sendOtp}>Send code</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>Enter code</Label>
                  <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
                  <Button onClick={() => verifyOtp("login")}>Verify</Button>
                </div>
              )}
            </TabsContent>

            {/* Register tab */}
            <TabsContent value="register" className="mt-4 space-y-4">
              <Button
                onClick={() => signInWithGoogle("register")}
                className="w-full gap-2 rounded-xl"
                variant="secondary"
              >
                <GoogleIcon />
                Sign up with Google
              </Button>
              {!otpSent ? (
                <div className="space-y-2">
                  <Label>Phone number</Label>
                  <div className="flex gap-2">
                    <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <Button onClick={sendOtp}>Send code</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>Enter code</Label>
                  <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
                  <Button onClick={() => verifyOtp("register")}>Verify</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      </>
  );
}
