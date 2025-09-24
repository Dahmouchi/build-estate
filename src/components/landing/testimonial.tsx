import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
  {
    quote:
      "Grâce aux visites virtuelles, nous avons réduit les déplacements de nos clients de plus de moitié. C’est une vraie révolution pour l’immobilier au Maroc.",
    name: "Yassine El Idrissi",
    designation: "Directeur d’agence immobilière à Casablanca",
    src: "https://plus.unsplash.com/premium_photo-1682144187125-b55e638cf286?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8", // portrait style pro
  },
  {
    quote:
      "La solution nous a permis de présenter nos projets de construction de manière interactive et de gagner la confiance des investisseurs plus rapidement.",
    name: "Salma Benkiran",
    designation: "Architecte à Rabat",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    quote:
      "Votre concept est unique : une plateforme qui combine visualisation 3D, économies sur le terrain et engagement client. C’est exactement ce dont nous avions besoin pour moderniser notre workflow.",
    name: "Projet Concept",
    designation: "Client pilote — secteur BTP & Immobilier",
    src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

  return <div>
     <div className="text-center max-w-3xl mx-auto ">
     <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center lg:mt-16 mt-8"
      >
        <h2 className="text-4xl md:text-6xl font-bold dark:text-white mb-6 text-black">
          Ils nous font  {" "}
          <span className="bg-gradient-to-r pl-2 from-orange-400 to-orange-600 bg-clip-text text-transparent">
             Confiance
          </span>{" "}
          
        </h2>
        <p className="lg:text-xl text-md dark:text-gray-300 text-gray-500 max-w-3xl mx-auto">
           Découvrez comment notre concept transforme l’immobilier et la
        construction grâce à des expériences immersives et interactives.
        </p>
      </motion.div>
    
    </div>
    <AnimatedTestimonials testimonials={testimonials} />
  </div>;
}
