/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Star,
  Heart,
  Share,
  Grid3X3,
  Play,
  MapPin,
  Eye,
  Camera,
  Maximize2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ImageSliderDialog } from "./image-slider-dialog";

interface PropertyHeroProps {
  property: {
    title: string;
    images: string[];
    aggregateRating: number;
    ratingCount: number;
    address: string;
  };
}

export function PropertyHero({ property }: any) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const modelId = "UoqjwziqrZs";
  const mpUrl = useMemo(() => {
    const base = "https://my.matterport.com/show/";
    const params = new URLSearchParams({
      m: modelId,
      play: "0",
      brand: "0",
      qs: "1",
      title: "0",
      dh: "1",
    }).toString();
    return `${base}?${params}`;
  }, [modelId]);

  const mpUrlM = useMemo(() => {
    const base = "https://my.matterport.com/show/";
    const params = new URLSearchParams({
      m: modelId,
      play: "1",
      brand: "0",
      qs: "1",
      title: "0",
      dh: "1",
    }).toString();
    return `${base}?${params}`;
  }, [modelId]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 lg:pb-14 to-background overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 "
      >
        <div className="glass-effect rounded-2xl p-6 backdrop-blur-xl border shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display lg:text-3xl text-xl font-bold text-foreground mb-4 text-balance leading-tight"
              >
                {property.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap items-center gap-6 text-sm font-body"
              >
                <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
                  <span className="font-semibold text-foreground">
                    {property.aggregateRating}
                  </span>
                  <span className="text-muted-foreground">
                    ({property.ratingCount} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{property.address}</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-3"
            >
              <Button
                variant="ghost"
                size="lg"
                className="glass-effect hover:bg-white/20 transition-all duration-300"
              >
                <Share className="w-5 h-5 mr-2" />
                Share
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="glass-effect hover:bg-white/20 transition-all duration-300"
              >
                <Heart className="w-5 h-5 mr-2" />
                Save
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[70vh] lg:h-[80vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="lg:col-span-8 relative group cursor-pointer"
            onClick={() => setActiveImageIndex(0)}
          >
            <div className="relative h-full w-full  bg-center rounded-3xl overflow-hidden shadow-2xl">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="flex-1 relative group w-full h-full"
              >
                {/* Desktop 3D Tour */}
                <div className="hidden lg:block h-full">
                  <div className="relative h-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/10">
                    <iframe
                      src={mpUrl}
                      className="absolute inset-0 w-full h-full"
                      title="Matterport Virtual Tour"
                      allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; autoplay"
                      allowFullScreen
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4 glass-effect px-4 py-2 rounded-full">
                      <span className="text-white font-semibold text-sm">
                        360° Virtual Tour
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile 3D Tour Trigger */}
                <div className="block lg:hidden">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl group"
                      >
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent flex items-center justify-center"
                          style={{
                            backgroundImage:
                              `url('${property.images[0]}')` ||
                              "/placeholder.svg?height=800&width=1200&query=luxury modern villa exterior",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className="absolute w-full h-full  bg-gradient-to-br from-black/80 via-black/40 to-transparent top-0"></div>
                          <div className="flex z-20 flex-col items-center space-y-4">
                            <div className="w-20 h-20 glass-effect rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Play className="w-10 h-10 text-white ml-1" />
                            </div>
                            <span className="text-white font-semibold text-lg">
                              Experience in 3D
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    </DialogTrigger>

                    <DialogContent className="max-w-full w-11/12 h-[80vh] p-0">
                      <iframe
                        src={mpUrlM}
                        className="w-full h-full rounded-lg"
                        title="Matterport Virtual Tour"
                        allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; autoplay"
                        allowFullScreen
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>

              <div className="absolute top-6 left-6 flex gap-3">
                <Badge className="glass-effect text-white border-white/20 animate-float">
                  <Eye className="w-4 h-4 mr-2" />
                  Virtual Tour
                </Badge>
                <Badge
                  className="glass-effect text-white border-white/20"
                  style={{ animationDelay: "1s" }}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {property.images.length} Photos
                </Badge>
              </div>


              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Button
                  size="lg"
                  className="glass-effect hover:bg-white/20 text-white border-white/20"
                >
                  <Maximize2 className="w-5 h-5 mr-2" />
                  Expand View
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="relative group "
            >
              <img
                src={
                  property.images[0] ||
                  "/placeholder.svg?height=800&width=1200&query=luxury modern villa exterior"
                }
                alt="Property main view"
                className="bg-cover h-full w-full rounded-xl bg-center transition-all duration-700 group-hover:scale-105"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="grid grid-cols-2 gap-3 h-32"
            >
              {property.images.slice(1, 3).map((image: any, index: any) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer"
                  onClick={() => setActiveImageIndex(index + 1)}
                >
                  <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={
                        image ||
                        `/placeholder.svg?height=200&width=300&query=luxury property interior ${
                          index + 1
                        }`
                      }
                      alt={`Property view ${index + 2}`}
                      className="bg-cover h-full w-full bg-center transition-all duration-500 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {property.images.length > 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <Button
                  onClick={() => setShowAllPhotos(true)}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <Grid3X3 className="w-5 h-5 mr-3" />
                  View All {property.images.length} Photos
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <ImageSliderDialog
        images={property.images}
        isOpen={showAllPhotos}
        onClose={() => setShowAllPhotos(false)}
        initialIndex={activeImageIndex}
      />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </div>
  );
}
