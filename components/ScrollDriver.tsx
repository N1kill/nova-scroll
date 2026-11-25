"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { invalidate } from "@react-three/fiber";
import { scroll } from "@/lib/scroll";

export default function ScrollDriver() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: "#story",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scroll.p = self.progress;
        const t = Math.min(1, Math.max(0, (self.progress - 0.58) / 0.12));
        const el = document.documentElement;
        el.style.setProperty("--bg", gsap.utils.interpolate("#CFE0D2", "#4A2545", t));
        el.style.setProperty("--ink", t > 0.5 ? "#F7F6F2" : "#1E1A20");
        invalidate();
      },
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      st.kill();
      window.removeEventListener("load", refresh);
    };
  }, []);
  return null;
}
