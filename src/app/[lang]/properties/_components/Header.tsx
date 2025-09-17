/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Search, UserPlus, Phone, Globe } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import AuthDialogButton from '@/components/header/LoginButton';
import Link from 'next/link';


export default function Header() {
  const [scrolled, setScrolled] = useState(false); // New state for scroll animation
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log('User is logged in:', session.user);
    } else {
      console.log('No user session found');
    }
  }, [session]);

  // Scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) { // Trigger after 50px scroll
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <motion.header
      initial={false}
      animate={scrolled ? 'scrolled' : 'top'}
     
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="sticky top-0 z-50"
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-20 py-2 ">
        <div className="flex justify-between items-center border bg-white rounded-full px-4 py-4 shadow-md">
          {/* Logo */}
          <Link href={"/"}>
          <motion.div
            className="flex items-center cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src="/images/logov1.png" alt="" className="w-36 h-auto mx-4" />
          </motion.div></Link>         

          {/* Right side: Auth + Lang Switch */}
          <div className="flex items-center space-x-4">
            <AuthDialogButton />
            
          </div>
        </div>
      </div>

      
    </motion.header>
  );
}