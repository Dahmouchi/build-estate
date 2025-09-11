"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  current: number;
  progress: number;
}
const Step = {
  DETAILS: 1,
  POLICIES: 2,
  AMENITIES: 3,
  SERVICES: 4,
  PHOTOS: 5,
  REVIEW: 6,
} as const;

const STEPS = [
  { key: Step.DETAILS, label: "Détails" },
  { key: Step.POLICIES, label: "Politiques" },
  { key: Step.AMENITIES, label: "Équipements" },
  { key: Step.SERVICES, label: "Services" },
  { key: Step.PHOTOS, label: "Photos" },
  { key: Step.REVIEW, label: "Aperçu" },
];
export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  current,
  progress,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-wrap gap-2">
          {STEPS.map((s, idx) => (
            <Badge
              key={s.key}
              variant={idx+1 === current ? "default" : idx+1  < current ? "secondary" : "outline"}
              className={cn("rounded-full px-3 py-1 text-xs", {
                "bg-primary text-primary-foreground": idx+1  === current,
              })}
            >
              {s.label}
            </Badge>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">{progress}%</div>
      </div>
      <Progress value={progress} />
    </div>
  );
};
