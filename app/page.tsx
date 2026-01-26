'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play,  Sparkles, Code2, Terminal, MousePointer2, Bot, Split, Flag, Server, MessageSquare, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import Image from 'next/image'



const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
)

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={cn(
        "group relative border border-white/10 bg-zinc-900/50 overflow-hidden rounded-xl",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}



const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-blue-500/30 font-sans">
      
      
      <div className="fixed inset-0 z-0 h-full w-full bg-[#050505] bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
      </div>

     
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
           
            <span className="text-lg font-bold ">AgentFlow</span>
          </Link>

          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden md:flex items-center gap-4">
              <SignedOut>
                <Link href="/sign-in" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Log in</Link>
                <Link href="/sign-up">
                  <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-5 h-9 text-sm font-medium transition-transform hover:scale-105 active:scale-95">
                    Sign up
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-violet-400 to-violet-600 hover:opacity-90 text-white rounded-full px-5 h-9 text-sm">Dashboard</Button>
                </Link>
                <UserButton />
              </SignedIn>
            </div>
            
            <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight leading-[1.1]">
              Build AI Agents <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400  bg-300%">
                Visually
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              The no-code platform powered by Gemini. Connect custom APIs, design logic flows, and export to your Next.js project instantly.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link href="/sign-up">
                <Button className="h-12 px-8 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-base shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.6)]">
                  Start Building 
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              
            </div>
          </FadeIn>
        </motion.div>
        
        <HeroVisualization />
      </section>

    
      <section className="py-10 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
          
          <div className="flex gap-16 animate-infinite-scroll">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {['Next.js','React', 'ConvexDB', 'Clerk', 'Arcjet ', 'TypeScript', 'TailwindCSS'].map((tech) => (
                  <div key={tech} className="flex items-center gap-4 group cursor-pointer">
                    <span className="text-xl font-semibold text-gray-600 group-hover:text-blue-400 transition-colors shrink-0 select-none">
                      {tech}
                    </span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Visual Power. No Code Required.</h2>
              <p className="text-xl text-gray-400 max-w-2xl">From visual flow to production code in seconds. Built on modern infrastructure.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            
            
            <SpotlightCard className="md:col-span-2 row-span-2 bg-[#0c0c0c]">
              <div className="h-full flex flex-col relative overflow-hidden">
               
                <div className="absolute top-0 left-0 right-0 p-8 z-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                   <div className="flex items-center gap-3 mb-2">
                      {/* <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                        <Workflow className="w-5 h-5 text-blue-400" />
                      </div> */}
                      <h3 className="text-2xl font-semibold">Visual Workflow Builder</h3>
                   </div>
                   <p className="text-gray-400 max-w-sm">Connect custom API nodes, AI agents, and logic gates visually. Use live data from any API (Weather, Stock, etc.) instantly.</p>
                </div>

               
                <div className="absolute inset-0 top-0 overflow-hidden flex items-center justify-center">
                   <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]" />
                   
                   <div className="relative w-full h-full max-w-[800px] max-h-[500px]">
                      
                   
                      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-visible">
                          <motion.path d="M 170 280 L 200 280" fill="none" stroke="#334155" strokeWidth="2" />
                          <motion.circle r="3" fill="#3b82f6">
                            <animateMotion dur="2s" repeatCount="indefinite" path="M 170 280 L 200 280" />
                          </motion.circle>

                          <motion.path d="M 320 280 L 350 280" fill="none" stroke="#334155" strokeWidth="2" />
                          <motion.circle r="3" fill="#3b82f6">
                            <animateMotion dur="2s" begin="0.5s" repeatCount="indefinite" path="M 320 280 L 350 280" />
                          </motion.circle>

                          <motion.path d="M 470 280 C 490 280, 480 200, 500 200" fill="none" stroke="#334155" strokeWidth="2" />
                          <motion.circle r="3" fill="#a855f7">
                            <animateMotion dur="1.5s" begin="1s" repeatCount="indefinite" path="M 470 280 C 490 280, 480 200, 500 200" />
                          </motion.circle>

                          <motion.path d="M 620 200 C 640 200, 630 280, 650 280" fill="none" stroke="#334155" strokeWidth="2" />
                          <motion.circle r="3" fill="#a855f7">
                            <animateMotion dur="1.5s" begin="1.5s" repeatCount="indefinite" path="M 620 200 C 640 200, 630 280, 650 280" />
                          </motion.circle>
                      </svg>

                      
                      <MockNode x={50} y={240} color="blue" icon={<Play size={14} className="ml-0.5" />} title="Start" sub="On Request" />
                      <MockNode x={200} y={240} color="purple" icon={<Bot size={14} />} title="Gemini Agent" sub="Process Input" />
                      <MockNode x={350} y={240} color="orange" icon={<Split size={14} />} title="Condition" sub="If Approved" />
                      <MockNode x={500} y={160} color="green" icon={<Server size={14} />} title="Weather API" sub="GET /current" />
                      <MockNode x={650} y={240} color="gray" icon={<Flag size={14} />} title="End" sub="Return JSON" />
                      
                     
                      <motion.div
                        className="absolute z-50 pointer-events-none"
                        animate={{ x: [400, 520, 500], y: [300, 180, 200] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                         <MousePointer2 className="w-5 h-5 text-white drop-shadow-md fill-black" />
                      </motion.div>

                   </div>
                </div>
              </div>
            </SpotlightCard>

          
            <SpotlightCard>
               <div className="p-8 h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 border border-green-500/20">
                    <Sparkles className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No-Code Platform</h3>
                <p className="text-gray-400 text-sm">
                  Design complex AI behaviors without writing code. Use drag-and-drop nodes to create agents that think and act.
                </p>
              </div>
            </SpotlightCard>

           
            <SpotlightCard>
              <div className="p-8 h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 border border-purple-500/20">
                    <Code2 className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Export to Code</h3>
                <p className="text-gray-400 text-sm">
                  Once your workflow is ready, publish it and copy the code to integrate directly into your own Next.js or React projects.
                </p>
              </div>
            </SpotlightCard>

           
             <SpotlightCard className="md:col-span-3">
              <div className="p-8 flex flex-col md:flex-row items-center gap-8 h-full">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/20">
                        <Terminal className="w-6 h-6 text-orange-400" />
                     </div>
                     <div className="h-8 w-[1px] bg-white/10" />
                     <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/20">
                        <MessageSquare className="w-6 h-6 text-blue-400" />
                     </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Dual Deployment Mode</h3>
                  <p className="text-gray-400">
                    Your choice: Integrate into your codebase via SDK or use the ready-made chat interface.
                  </p>
                </div>

                
                <div className="flex-1 w-full h-auto min-h-[200px] bg-[#1e1e20] rounded-xl border border-white/5 relative overflow-hidden flex shadow-2xl">
                    
                 
                    <div className="w-1/2 border-r border-white/5 bg-black/50 p-4 font-mono text-[9px] md:text-[10px] text-gray-400 flex flex-col gap-1 overflow-hidden">
                       <div className="flex gap-1.5 mb-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                       </div>
                       
                       <motion.div 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                       >
                         <span className="text-purple-400">const</span> res = <span className="text-purple-400">await</span> <span className="text-blue-400">fetch</span>(
                         <span className="text-green-400">&apos;https://agentflow.com/api/agent-chat&apos;</span>, {'{'}
                       </motion.div>

                       <motion.div 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                          className="pl-2"
                       >
                         method: <span className="text-green-400">&apos;POST&apos;</span>,
                       </motion.div>

                       <motion.div 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                          className="pl-2"
                       >
                         headers: {'{'}<span className="text-green-400">&apos;Content-Type&apos;</span>: <span className="text-green-400">&apos;application/json&apos;</span>{'}'},
                       </motion.div>

                       <motion.div 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 1.4 }}
                          className="pl-2"
                       >
                         body: JSON.<span className="text-blue-400">stringify</span>({'{'}
                       </motion.div>

                       <motion.div 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 1.6 }}
                          className="pl-4 text-orange-300"
                       >
                         agentId: &lt;agentId&gt;,
                       </motion.div>
                       
                       <motion.div 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 1.8 }}
                          className="pl-4 text-orange-300"
                       >
                         userInput: &lt;input&gt;
                       </motion.div>

                       <motion.div 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 2.0 }}
                          className="pl-2"
                       >
                         {'}'})
                       </motion.div>

                       <motion.div 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 2.2 }}
                       >
                         {'}'})
                       </motion.div>
                    </div>

                    <div className="w-1/2 bg-zinc-900/50 p-4 flex flex-col justify-end gap-3 relative">
                       <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
                       
                    
                       <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 2.5 }}
                          className="bg-blue-600/20 border border-blue-500/30 text-blue-100 p-2 rounded-lg rounded-br-none text-[10px] md:text-xs self-end max-w-[90%]"
                       >
                          Get the weather for delhi
                       </motion.div>

                   
                       <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 3.2 }}
                          className="bg-white/5 border border-white/10 text-gray-300 p-2 rounded-lg rounded-bl-none text-[10px] md:text-xs self-start max-w-[90%]"
                       >
                          The current weather in Delhi is 32°C with clear skies.
                       </motion.div>
                    </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-12 overflow-hidden text-center group bg-[#0A0A0A] border border-white/5">
       
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent opacity-50" />
            <motion.div 
              className="absolute inset-0 bg-blue-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Building Today</h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Join developers building the next generation of AI agents with custom APIs and logic.
              </p>
              <Link href="/sign-up">
                <Button className="h-14 px-8 rounded-full bg-white text-black hover:bg-gray-200 text-lg font-semibold transition-transform hover:-translate-y-1">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      
      <footer className="bg-black border-t border-white/10 relative flex flex-col items-center overflow-hidden">
  

  <div className="relative w-full pt-20 pb-6 px-6">
    
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
      <h1 className="text-[18vw] font-bold text-white/[0.04] tracking-tighter leading-none whitespace-nowrap">
        AGentFlow
      </h1>
    </div>

    <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col min-h-[100px]">
    
    </div>

  </div>
</footer>

    </div>
  )
}



const MockNode = ({ x, y, color, icon, title, sub }: { x: number, y: number, color: string, icon: any, title: string, sub: string }) => {
   const colors: Record<string, string> = {
      blue: 'border-blue-500/50 shadow-[0_0_20px_-10px_rgba(59,130,246,0.5)]',
      purple: 'border-purple-500/50 shadow-[0_0_20px_-10px_rgba(168,85,247,0.5)]',
      orange: 'border-orange-500/50 shadow-[0_0_20px_-10px_rgba(249,115,22,0.5)]',
      green: 'border-green-500/50 shadow-[0_0_20px_-10px_rgba(34,197,94,0.5)]',
      gray: 'border-zinc-500/50 shadow-[0_0_20px_-10px_rgba(113,113,122,0.5)]',
   }

   const iconColors: Record<string, string> = {
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      green: 'bg-green-500',
      gray: 'bg-zinc-500',
   }

   return (
      <motion.div 
         className={`absolute w-32 bg-[#1e1e20] rounded-xl border border-[#333] p-2.5 flex flex-col gap-2 z-20 ${colors[color]}`}
         style={{ left: x, top: y }}
         whileHover={{ scale: 1.05 }}
      >
      
         <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-2">
               <div className={`w-5 h-5 rounded flex items-center justify-center text-white ${iconColors[color]}`}>
                  {icon}
               </div>
               <span className="text-[10px] font-semibold text-gray-200">{title}</span>
            </div>
         </div>
      
         <div className="px-1">
             <div className="text-[9px] text-gray-400 font-mono bg-black/20 rounded p-1 border border-white/5 truncate">
               {sub}
             </div>
         </div>

         <div className="absolute top-7 -left-1 w-2 h-2 bg-[#1e1e20] border border-gray-600 rounded-full" />
         <div className="absolute top-7 -right-1 w-2 h-2 bg-[#1e1e20] border border-gray-600 rounded-full" />
      </motion.div>
   )
}



const HeroVisualization = () => {
  return (
    <div className="relative max-w-5xl mx-auto h-[400px] mt-12 perspective-[1000px]">
   
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-transparent" />
      
    
      <motion.div 
        initial={{ rotateX: 20, opacity: 0 }}
        animate={{ rotateX: 20, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-full bg-[#0a0a0a]/80 border border-white/10 rounded-xl backdrop-blur-md overflow-hidden shadow-2xl"
        style={{ transformStyle: 'preserve-3d' }}
      >
   
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      
        <div className="absolute inset-0 flex items-center justify-center gap-12" style={{ transform: 'translateZ(20px)' }}>
            <FloatingNode icon={<Play size={20} />} color="bg-yellow-500" label="Start" delay={0} />
            
     
            <div className="w-24 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
            </div>
            
            <FloatingNode icon={<Bot size={20} />} color="bg-blue-500" label="AI Agent" delay={1} />
            
            
            <div className="w-24 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.75 }}
                />
            </div>
            
            <FloatingNode icon={<Server size={20} />} color="bg-green-500" label="API" delay={2} />
        </div>
      </motion.div>
    </div>
  )
}

const FloatingNode = ({ icon, color, label, delay }: { icon: any, color: string, label: string, delay: number }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    className="bg-[#151515] border border-white/10 p-5 rounded-2xl flex flex-col items-center gap-4 shadow-2xl relative z-20 w-40"
  >
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-black shadow-lg`}>
      {icon}
    </div>
    <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-semibold text-white">{label}</span>
        <span className="text-[10px] text-gray-500 font-mono">active</span>
    </div>
   
    <div className={`absolute -inset-8 ${color} opacity-10 blur-2xl -z-10`} />
  </motion.div>
)

export default LandingPage