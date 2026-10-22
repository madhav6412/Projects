import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ParallaxBackground: React.FC = () => {
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. GSAP ScrollTrigger Scrub for 3D Isometric Grid Plane
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          yPercent: 35,
          rotateX: 60,
          rotateZ: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        });
      }

      // 2. GSAP ScrollTrigger Scrub for 3D Rotating Cube
      if (cubeRef.current) {
        gsap.to(cubeRef.current, {
          y: 450,
          rotationY: 720,
          rotationX: 360,
          rotationZ: 180,
          scale: 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        });
      }

      // 3. GSAP ScrollTrigger Scrub for Secondary Floating Node
      if (nodeRef.current) {
        gsap.to(nodeRef.current, {
          y: -350,
          rotationX: 180,
          rotationY: -360,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        });
      }

      // 4. GSAP ScrollTrigger for Ambient Light Orbs
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          yPercent: 60,
          xPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2,
          },
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          yPercent: -45,
          xPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.8,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ perspective: 1400 }}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500"
    >
      {/* 1. Deep 3D Isometric Grid Plane (GSAP Scrubbed) */}
      <div
        ref={gridRef}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(50deg) rotateZ(-20deg) scale(1.4)',
        }}
        className={`absolute -top-40 -left-40 right-0 bottom-0 ${
          isDark
            ? 'opacity-20 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)]'
            : 'opacity-40 bg-[linear-gradient(to_right,#0284c718_1px,transparent_1px),linear-gradient(to_bottom,#0284c718_1px,transparent_1px)]'
        } bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_80%,transparent_100%)]`}
      />

      {/* 2. Floating 3D Wireframe Infrastructure Cube (GSAP ScrollTrigger Driven) */}
      <div
        ref={cubeRef}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(25deg) rotateY(-35deg)',
        }}
        className="absolute top-1/4 right-16 hidden xl:block w-36 h-36 opacity-75 pointer-events-none"
      >
        <div className="relative w-full h-full [transform-style:preserve-3d]">
          <div
            className={`absolute inset-0 border ${
              isDark
                ? 'border-cyan-400/60 bg-cyan-500/5 text-cyan-300'
                : 'border-sky-500/70 bg-sky-50/80 text-sky-700 shadow-sm'
            } [transform:translateZ(72px)] backdrop-blur-xs flex items-center justify-center font-mono text-[9px] font-semibold`}
          >
            K8S_CORE
          </div>
          <div
            className={`absolute inset-0 border ${
              isDark
                ? 'border-emerald-400/60 bg-emerald-500/5 text-emerald-300'
                : 'border-emerald-500/70 bg-emerald-50/80 text-emerald-700 shadow-sm'
            } [transform:rotateY(180deg)_translateZ(72px)] backdrop-blur-xs flex items-center justify-center font-mono text-[9px] font-semibold`}
          >
            TERRAFORM
          </div>
          <div
            className={`absolute inset-0 border ${
              isDark
                ? 'border-cyan-400/50 bg-cyan-500/5 text-cyan-300'
                : 'border-sky-500/60 bg-sky-50/80 text-sky-700 shadow-sm'
            } [transform:rotateY(-90deg)_translateZ(72px)] backdrop-blur-xs flex items-center justify-center font-mono text-[9px] font-semibold`}
          >
            PROMETHEUS
          </div>
          <div
            className={`absolute inset-0 border ${
              isDark
                ? 'border-emerald-400/50 bg-emerald-500/5 text-emerald-300'
                : 'border-emerald-500/60 bg-emerald-50/80 text-emerald-700 shadow-sm'
            } [transform:rotateY(90deg)_translateZ(72px)] backdrop-blur-xs flex items-center justify-center font-mono text-[9px] font-semibold`}
          >
            GITOPS
          </div>
          <div
            className={`absolute inset-0 border ${
              isDark ? 'border-emerald-400/40 bg-emerald-500/5' : 'border-emerald-500/50 bg-emerald-50/60'
            } [transform:rotateX(90deg)_translateZ(72px)]`}
          />
          <div
            className={`absolute inset-0 border ${
              isDark ? 'border-cyan-400/40 bg-cyan-500/5' : 'border-sky-500/50 bg-sky-50/60'
            } [transform:rotateX(-90deg)_translateZ(72px)]`}
          />
        </div>
      </div>

      {/* 3. Secondary 3D Floating Isometric Node in Background */}
      <div
        ref={nodeRef}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(35deg) rotateY(45deg)',
        }}
        className="absolute bottom-1/4 left-12 hidden lg:block w-28 h-28 opacity-60 pointer-events-none"
      >
        <div className="relative w-full h-full [transform-style:preserve-3d]">
          <div
            className={`absolute inset-0 border ${
              isDark ? 'border-emerald-500/50' : 'border-emerald-500/60 bg-emerald-50/30'
            } [transform:translateZ(56px)]`}
          />
          <div
            className={`absolute inset-0 border ${
              isDark ? 'border-cyan-500/50' : 'border-sky-500/60 bg-sky-50/30'
            } [transform:rotateY(90deg)_translateZ(56px)]`}
          />
          <div
            className={`absolute inset-0 border ${
              isDark ? 'border-emerald-500/40' : 'border-indigo-500/50 bg-indigo-50/30'
            } [transform:rotateX(90deg)_translateZ(56px)]`}
          />
        </div>
      </div>

      {/* 4. Ambient Glowing Depth Orbs (Scrubbed with GSAP) */}
      <div
        ref={orb1Ref}
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full ${
          isDark ? 'bg-emerald-500/10' : 'bg-emerald-400/15'
        } blur-[120px]`}
      />
      <div
        ref={orb2Ref}
        className={`absolute top-1/2 -right-40 w-[32rem] h-[32rem] rounded-full ${
          isDark ? 'bg-cyan-500/10' : 'bg-sky-400/20'
        } blur-[140px]`}
      />
      <div
        className={`absolute bottom-10 left-1/3 w-80 h-80 rounded-full ${
          isDark ? 'bg-emerald-500/5' : 'bg-indigo-400/15'
        } blur-[110px]`}
      />
    </div>
  );
};
