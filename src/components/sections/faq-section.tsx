/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, MessageCircle, Calendar, Home, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

export type FAQCategory = "booking" | "cancellation" | "property" | "policy"

export interface FAQItem {
  id: string
  category: FAQCategory | string  // allows JSON strings, but keeps hints in TS
  question: string
  answer: string
}


interface FAQProps {
  data: {
    title: string
    subtitle: string
    categories: Record<string, string>
    items: FAQItem[]
  }
}
export function FAQSection({ data }: FAQProps) {
const [openItems, setOpenItems] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }
const categoryIcons: Record<FAQCategory, React.ComponentType<any>> = {
  booking: Calendar,
  cancellation: MessageCircle,
  property: Home,
  policy: Shield,
}
  const categories = Array.from(new Set(data.items.map((item) => item.category)))
  const filteredFAQs = activeCategory
    ? data.items.filter((item) => item.category === activeCategory)
    : data.items
  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                {data.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {data.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "glass-effect px-6 py-3 rounded-xl font-medium transition-all duration-300",
              !activeCategory
                ? "bg-accent text-accent-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {data.categories.all}
          </button>
          {categories.map((category) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons]
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "glass-effect px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2",
                  activeCategory === category
                    ? "bg-accent text-accent-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {data.categories[category]}
              </button>
            )
          })}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredFAQs.map((faq, index) => {
              const isOpen = openItems.includes(faq.id)
              const Icon = categoryIcons[faq.category as keyof typeof categoryIcons]
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="glass-effect rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-8 py-2 border-b-2 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-black/10">
                        <Icon className="w-5 h-5 text-black" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground font-display">{faq.question}</h3>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-6 pl-20">
                          <p className="text-muted-foreground leading-relaxed font-body">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>       
      </div>
    </section>
  )
}
