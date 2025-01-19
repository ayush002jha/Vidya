"use client"
import React, { useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";


export function Dock({links}:any) {



  return (
        
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
  );
}
