/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowDown } from "lucide-react"

const ArchitectureHero =()=> {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-gray-800 rounded-sm flex items-center justify-center">
            <div className="w-4 h-4 border border-gray-800 rounded-sm"></div>
          </div>
          <div className="text-sm text-gray-700">
            <div className="font-medium">Our Expertise in Architecture and</div>
            <div>Design From Concept to Creation</div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors">
            Home
          </a>
          <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors">
            About
          </a>
          <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors">
            Features
          </a>
          <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors">
            FAQ
          </a>
          <Button className="bg-orange-400 hover:bg-orange-500 text-black rounded-full px-6 py-2 flex items-center gap-2">
            CONTACT US
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-8 py-12 grid grid-cols-2 gap-16 items-center">
        {/* Left Side - Architecture Visualization */}
        <div className="relative">
          <img src="/architecture-house.jpg" alt="Modern architecture cross-section view" className="w-full h-auto" />

          {/* Floating Elements */}
          <div className="absolute top-20 right-10 bg-orange-200 rounded-full px-4 py-2 text-sm font-medium">
            2023
            <div className="text-xs text-gray-600">View more</div>
          </div>

          <div className="absolute bottom-20 left-10 bg-white rounded-full p-3 shadow-lg">
            <ArrowRight className="w-5 h-5 text-gray-800" />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="space-y-8">
          <div className="w-16 h-px bg-gray-800"></div>

          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            DESIGNING FOR THE
            <br />
            MODERN LIVING
          </h1>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="text-sm text-gray-700">
              <div className="font-medium mb-1">Expert Team of Architects,</div>
              <div>Designers, and Builders at</div>
              <div>Your Service they make</div>
              <div>Eco-Friendly</div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center">
            <div className="text-orange-400 text-xs font-medium">EXPLORE</div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-8 pb-12">
        <div className="flex items-center gap-2 mb-4">
          <ArrowDown className="w-4 h-4 text-gray-600" />
          <span className="text-gray-800 font-medium">Home with the best price and quality:</span>
        </div>

        <p className="text-sm text-gray-700 max-w-2xl mb-8">
          Designing your Dream Home with Our Expertise in Architecture and Designs. Our Expertise in Modern,
          Contemporary, and Traditional Architecture Styles. Unmatched Attention to Detail and Quality Craftsmanship.
        </p>

        <div className="flex items-center gap-6">
          <Button
            variant="outline"
            className="rounded-full px-6 py-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white bg-transparent"
          >
            OUR EXPERTISE
          </Button>
          <Button
            variant="outline"
            className="rounded-full px-6 py-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white bg-transparent"
          >
            DESIGNS
          </Button>
          <div className="ml-auto">
            <Button className="bg-orange-400 hover:bg-orange-500 text-black rounded-full px-6 py-2 flex items-center gap-2">
              DISCOVER MORE
              <ArrowDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 right-20 w-2 h-2 bg-gray-400 rounded-full"></div>
      <div className="absolute top-1/3 right-32 w-1 h-1 bg-gray-400 rounded-full"></div>
    </div>
  )
}

export default ArchitectureHero