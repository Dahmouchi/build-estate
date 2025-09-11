/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ data }: { data: any }) {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">

            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className='bg-white p-4 rounded-lg w-fit mb-4'><img src="/images/logov1.png" alt="Logo" className="w-36 h-auto" /></div>
              <p className="text-slate-300 leading-relaxed">{data.brandDesc}</p>

              {/* Contact Info (static for now) */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-3 text-slate-300">
                  <Mail className="h-5 w-5 text-teal-400" />
                  <span>contact@staynest.com</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Phone className="h-5 w-5 text-teal-400" />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <MapPin className="h-5 w-5 text-teal-400" />
                  <span>Paris, France</span>
                </div>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-6">{data.company.title}</h4>
              <ul className="space-y-3">
                {data.company.links.map((link: string, i: number) => (
                  <li key={i}>
                    <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6">{data.support.title}</h4>
              <ul className="space-y-3">
                {data.support.links.map((link: string, i: number) => (
                  <li key={i}>
                    <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hosting */}
            <div>
              <h4 className="text-lg font-semibold mb-6">{data.hosting.title}</h4>
              <ul className="space-y-3">
                {data.hosting.links.map((link: string, i: number) => (
                  <li key={i}>
                    <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold mb-6">{data.legal.title}</h4>
              <ul className="space-y-3">
                {data.legal.links.map((link: string, i: number) => (
                  <li key={i}>
                    <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-2">{data.newsletter.title}</h4>
              <p className="text-slate-300">{data.newsletter.desc}</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="email"
                placeholder={data.newsletter.placeholder}
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
              />
              <button className="bg-[#244B35] hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                {data.newsletter.subscribe}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">{data.rights}</div>

            {/* Social (left static for now) */}
            <div className="flex items-center space-x-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
