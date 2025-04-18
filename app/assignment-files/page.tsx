"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileText, Database, Cpu, GitBranch, Download, ArrowRight } from "lucide-react"
import Footer from "@/components/footer"

export default function AssignmentFilesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("readme")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <main className="min-h-screen bg-black text-white pb-16">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#0a0a20] z-0"></div>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-12">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Scanner
            </Button>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl sm:text-4xl font-bold">
                Assignment <span className="text-blue-400">Files</span>
              </h1>
            </motion.div>
            <div className="w-[100px]"></div> {/* Spacer for centering */}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-lg max-w-3xl mx-auto text-center mb-12"
          >
            Documentation and technical details about the NopeNet intrusion detection system.
          </motion.p>

          <Tabs
            defaultValue="readme"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-5xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 rounded-xl mb-8">
              <TabsTrigger
                value="readme"
                className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400"
              >
                <FileText className="mr-2 h-4 w-4" />
                README
              </TabsTrigger>
              <TabsTrigger value="kdd" className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400">
                <Database className="mr-2 h-4 w-4" />
                KDD Dataset
              </TabsTrigger>
              <TabsTrigger
                value="model"
                className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400"
              >
                <Cpu className="mr-2 h-4 w-4" />
                XGBoost Model
              </TabsTrigger>
            </TabsList>

            <TabsContent value="readme">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item}>
                  <Card className="bg-black/50 border border-gray-800 shadow-xl backdrop-blur-sm mb-8">
                    <CardHeader className="pb-2 border-b border-gray-800/50">
                      <CardTitle className="text-xl flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-blue-400" />
                        README.md
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 prose prose-invert max-w-none">
                      <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-white mb-0">
                          NopeNet - Network Intrusion Detection System
                        </h1>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                            <GitBranch className="mr-1 h-3 w-3" /> main
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                            <Download className="mr-1 h-3 w-3" /> Download
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mb-6">
                        <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-xs font-medium">
                          v1.0.0
                        </div>
                        <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-xs font-medium">
                          Next.js
                        </div>
                        <div className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-md text-xs font-medium">
                          Machine Learning
                        </div>
                        <div className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-md text-xs font-medium">
                          Network Security
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 rounded-xl border border-blue-800/30 mb-8">
                        <p className="text-lg leading-relaxed mb-0 text-blue-100">
                          NopeNet is a sophisticated yet user-friendly network security platform that detects intrusions with 99.8% average accuracy. By analyzing network traffic patterns, it spots and flags potential threats before they become problems. Highly accurate, and remarkably easy to use.
                        </p>
                      </div>

                      <h2 className="text-2xl font-bold text-blue-400 flex items-center mt-8 mb-4">
                        <span className="inline-block w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                        Features
                      </h2>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 list-none pl-0">
                        <li className="bg-indigo-900/20 border border-indigo-800/30 rounded-lg p-3 flex items-start">
                          <div className="bg-indigo-500/20 p-2 rounded-md text-indigo-400 mr-3">
                            <Cpu className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-semibold text-indigo-400">Attack Classification</span>
                            <p className="text-sm text-gray-300 mt-1 mb-0">Identify and categorize different types of network attacks</p>
                          </div>
                        </li>
                        <li className="bg-purple-900/20 border border-purple-800/30 rounded-lg p-3 flex items-start">
                          <div className="bg-purple-500/20 p-2 rounded-md text-purple-400 mr-3">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-semibold text-purple-400">Interactive Dashboard</span>
                            <p className="text-sm text-gray-300 mt-1 mb-0">Visualize network traffic and detected threats</p>
                          </div>
                        </li>
                        <li className="bg-cyan-900/20 border border-cyan-800/30 rounded-lg p-3 flex items-start">
                          <div className="bg-cyan-500/20 p-2 rounded-md text-cyan-400 mr-3">
                            <Database className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-semibold text-cyan-400">Test using real attacks</span>
                            <p className="text-sm text-gray-300 mt-1 mb-0">Generate and test with randomized sampled network traffic attacks</p>
                          </div>
                        </li>
                        <li className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-3 flex items-start">
                          <div className="bg-blue-500/20 p-2 rounded-md text-blue-400 mr-3">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-semibold text-blue-400">Security Recommendations</span>
                            <p className="text-sm text-gray-300 mt-1 mb-0">Receive detailed security recommendations based on scan results</p>
                          </div>
                        </li>
                        <li className="bg-green-900/20 border border-green-800/30 rounded-lg p-3 flex items-start">
                          <div className="bg-green-500/20 p-2 rounded-md text-green-400 mr-3">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-semibold text-green-400">NopeNet AI Chat Assistant</span>
                            <p className="text-sm text-gray-300 mt-1 mb-0">Engage with our intelligent chat interface that understands your network context</p>
                          </div>
                        </li>
                        <li className="bg-amber-900/20 border border-amber-800/30 rounded-lg p-3 flex items-start">
                          <div className="bg-amber-500/20 p-2 rounded-md text-amber-400 mr-3">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-semibold text-amber-400">Results Visualization</span>
                            <p className="text-sm text-gray-300 mt-1 mb-0">View detailed analysis results and visualizations</p>
                          </div>
                        </li>
                      </ul>

                      <h2 className="text-2xl font-bold text-purple-400 flex items-center mt-8 mb-4">
                        <span className="inline-block w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                        Technologies Used
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 text-center">
                          <span className="font-medium text-blue-400">Next.js</span>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 text-center">
                          <span className="font-medium text-cyan-400">TypeScript</span>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 text-center">
                          <span className="font-medium text-indigo-400">Tailwind CSS</span>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 text-center">
                          <span className="font-medium text-pink-400">Framer Motion</span>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 text-center">
                          <span className="font-medium text-green-400">shadcn/ui</span>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 text-center">
                          <span className="font-medium text-yellow-400">Lucide React</span>
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-green-400 flex items-center mt-8 mb-4">
                        <span className="inline-block w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                        Future Improvements
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-800/30 rounded-lg p-5 transform hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                          <h4 className="text-blue-400 font-bold flex items-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Real-time Monitoring
                          </h4>
                          <p className="text-sm text-gray-300 pl-7">
                            Integration with enterprise network monitoring tools for continuous threat detection
                          </p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-cyan-900/30 to-teal-900/30 border border-cyan-800/30 rounded-lg p-5 transform hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]">
                          <h4 className="text-cyan-400 font-bold flex items-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Adaptive Learning
                          </h4>
                          <p className="text-sm text-gray-300 pl-7">
                            Continuous model retraining with new attack patterns and emerging threats
                          </p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-800/30 rounded-lg p-5 transform hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                          <h4 className="text-green-400 font-bold flex items-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                            Model Ensemble
                          </h4>
                          <p className="text-sm text-gray-300 pl-7">
                            Combining multiple specialized models for higher detection accuracy
                          </p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-amber-900/30 to-red-900/30 border border-amber-800/30 rounded-lg p-5 transform hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                          <h4 className="text-amber-400 font-bold flex items-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Zero-day Detection
                          </h4>
                          <p className="text-sm text-gray-300 pl-7">
                            Advanced anomaly detection algorithms to identify previously unknown threats
                          </p>
                        </div>
                        
                        <div className="md:col-span-2 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-800/30 rounded-lg p-5 transform hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                          <h4 className="text-purple-400 font-bold flex items-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                            Advanced Visualizations
                          </h4>
                          <p className="text-sm text-gray-300 pl-7">
                            Expanded interactive visualization options for security analysts with 3D network topology mapping and real-time threat intelligence
                          </p>
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-yellow-400 flex items-center mt-8 mb-4">
                        <span className="inline-block w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                        Architecture
                      </h2>
                      <p className="mb-4">NopeNet consists of two main components:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                          <h3 className="text-blue-400 font-semibold mb-2">Frontend</h3>
                          <p className="text-sm text-gray-300 mb-0">Next.js application with React components and Tailwind CSS</p>
                        </div>
                        <div className="bg-purple-900/20 border border-purple-800/30 rounded-lg p-4">
                          <h3 className="text-purple-400 font-semibold mb-2">Backend</h3>
                          <p className="text-sm text-gray-300 mb-0">Python FastAPI server with machine learning models for traffic analysis</p>
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-cyan-400 flex items-center mt-8 mb-4">
                        <span className="inline-block w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                        API Endpoints
                      </h2>
                      <div className="bg-gray-900 rounded-md p-4 my-4">
                        <div className="mb-2 pb-2 border-b border-gray-800">
                          <span className="text-green-400 font-mono">GET /</span>
                          <p className="text-sm text-gray-300 mb-0">API status check</p>
                        </div>
                        <div className="mb-2 pb-2 border-b border-gray-800">
                          <span className="text-blue-400 font-mono">POST /predict</span>
                          <p className="text-sm text-gray-300 mb-0">Submit network traffic data for analysis</p>
                        </div>
                        <div className="mb-2 pb-2 border-b border-gray-800">
                          <span className="text-purple-400 font-mono">POST /validate</span>
                          <p className="text-sm text-gray-300 mb-0">Validate KDD format of input data</p>
                        </div>
                        <div>
                          <span className="text-yellow-400 font-mono">GET /sample</span>
                          <p className="text-sm text-gray-300 mb-0">Retrieve a sample of network traffic data generated from a large collection of previously gathered real network attack packets</p>
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-red-400 flex items-center mt-8 mb-4">
                        <span className="inline-block w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                        Resources
                      </h2>
                      <div className="grid grid-cols-1 gap-3 mb-8">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                          <h3 className="text-amber-400 font-semibold mb-2">Resources Directory</h3>
                          <p className="text-sm text-gray-300 mb-0">Contains important assets and configurations</p>
                        </div>
                        <div className="bg-indigo-900/20 border border-indigo-800/30 rounded-lg p-4">
                          <h3 className="text-indigo-400 font-semibold mb-2">NopeNet Resources Page</h3>
                          <p className="text-sm text-gray-300 mb-2">Explore different types of network attacks from the KDD dataset and learn about intrusion detection techniques.</p>
                          <div className="ml-3 mt-4">
                            <h4 className="text-sm font-medium text-blue-400 mb-1">Articles & Research</h4>
                            <p className="text-xs text-gray-400 mb-0">Provides educational content and insights into network security.</p>
                          </div>
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-pink-400 flex items-center mt-8 mb-4">
                        <span className="inline-block w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center mr-3">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                        Model
                      </h2>
                      <div className="bg-gradient-to-br from-gray-900/50 to-black/50 p-4 rounded-lg border border-gray-800 mb-8">
                        <p className="mb-4">The system uses an XGBoost classifier trained on the KDD Cup 1999 dataset to detect and classify network attacks into categories:</p>
                        <ul className="space-y-2 pl-0 list-none">
                          <li className="bg-gray-900/30 p-2 rounded border-l-4 border-gray-400">Normal traffic</li>
                          <li className="bg-gray-900/30 p-2 rounded border-l-4 border-red-400">DOS (Denial of Service)</li>
                          <li className="bg-gray-900/30 p-2 rounded border-l-4 border-blue-400">Probe (Surveillance/scanning)</li>
                          <li className="bg-gray-900/30 p-2 rounded border-l-4 border-yellow-400">R2L (Unauthorized access from remote machine)</li>
                          <li className="bg-gray-900/30 p-2 rounded border-l-4 border-green-400">U2R (Unauthorized access to root privileges)</li>
                        </ul>
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-800">
                        <p className="text-gray-500 text-sm">
                          Licensed under the MIT License - See LICENSE file for details.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="kdd">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item}>
                  <Card className="bg-black/50 border border-gray-800 shadow-xl backdrop-blur-sm mb-8">
                    <CardHeader className="pb-2 border-b border-gray-800/50">
                      <CardTitle className="text-xl flex items-center">
                        <Database className="mr-2 h-5 w-5 text-blue-400" />
                        KDD Cup 99 Dataset
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="prose prose-invert max-w-none">
                        <h2>About the KDD Cup 99 Dataset</h2>
                        <p>
                          The KDD Cup 99 dataset is a widely used benchmark dataset for evaluating intrusion detection
                          systems. It was created based on the data captured in the DARPA'98 IDS evaluation program and
                          contains a standard set of data to be audited, which includes a wide variety of intrusions
                          simulated in a military network environment.
                        </p>

                        <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4 my-6">
                          <h3 className="text-blue-400 mt-0 mb-2">Dataset Overview</h3>
                          <ul className="mt-2">
                            <li>
                              <strong>Size:</strong> Approximately 4.9 million connection records
                            </li>
                            <li>
                              <strong>Features:</strong> 41 features per connection record
                            </li>
                            <li>
                              <strong>Classes:</strong> Normal traffic and 4 main categories of attacks
                            </li>
                            <li>
                              <strong>Format:</strong> CSV with comma-separated values
                            </li>
                          </ul>
                        </div>

                        <h3>Feature Categories</h3>
                        <p>The 41 features in the KDD dataset can be classified into three groups:</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                            <h4 className="text-blue-400 mt-0 mb-2">Basic Features</h4>
                            <p className="text-sm text-gray-400 mt-0">
                              Features derived from packet headers without inspecting the payload
                            </p>
                            <ul className="text-sm mt-2">
                              <li>duration</li>
                              <li>protocol_type</li>
                              <li>service</li>
                              <li>flag</li>
                              <li>src_bytes</li>
                              <li>dst_bytes</li>
                            </ul>
                          </div>

                          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                            <h4 className="text-blue-400 mt-0 mb-2">Content Features</h4>
                            <p className="text-sm text-gray-400 mt-0">
                              Features derived by analyzing the payload of the original TCP packets
                            </p>
                            <ul className="text-sm mt-2">
                              <li>hot</li>
                              <li>num_failed_logins</li>
                              <li>logged_in</li>
                              <li>num_compromised</li>
                              <li>root_shell</li>
                              <li>su_attempted</li>
                            </ul>
                          </div>

                          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                            <h4 className="text-blue-400 mt-0 mb-2">Traffic Features</h4>
                            <p className="text-sm text-gray-400 mt-0">
                              Features computed using a two-second time window
                            </p>
                            <ul className="text-sm mt-2">
                              <li>count</li>
                              <li>srv_count</li>
                              <li>serror_rate</li>
                              <li>srv_serror_rate</li>
                              <li>rerror_rate</li>
                              <li>srv_rerror_rate</li>
                            </ul>
                          </div>
                        </div>

                        <h3>Attack Categories</h3>
                        <p>
                          The dataset contains four main categories of attacks, along with normal traffic. Each category
                          includes multiple specific attack types:
                        </p>

                        <div className="overflow-x-auto my-6">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-900/50">
                                <th className="border border-gray-800 px-4 py-2 text-left">Category</th>
                                <th className="border border-gray-800 px-4 py-2 text-left">Description</th>
                                <th className="border border-gray-800 px-4 py-2 text-left">Examples</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border border-gray-800 px-4 py-2 text-red-400">DoS</td>
                                <td className="border border-gray-800 px-4 py-2">
                                  Denial of Service attacks aim to make a resource unavailable
                                </td>
                                <td className="border border-gray-800 px-4 py-2">
                                  neptune, smurf, pod, teardrop, land, back
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-gray-800 px-4 py-2 text-yellow-400">Probe</td>
                                <td className="border border-gray-800 px-4 py-2">
                                  Surveillance and probing attacks that gather information
                                </td>
                                <td className="border border-gray-800 px-4 py-2">portsweep, ipsweep, satan, nmap</td>
                              </tr>
                              <tr>
                                <td className="border border-gray-800 px-4 py-2 text-blue-400">R2L</td>
                                <td className="border border-gray-800 px-4 py-2">
                                  Unauthorized access from a remote machine
                                </td>
                                <td className="border border-gray-800 px-4 py-2">
                                  guess_passwd, ftp_write, imap, phf, multihop, warezmaster
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-gray-800 px-4 py-2 text-green-400">U2R</td>
                                <td className="border border-gray-800 px-4 py-2">
                                  Unauthorized access to local superuser privileges
                                </td>
                                <td className="border border-gray-800 px-4 py-2">
                                  buffer_overflow, rootkit, loadmodule, perl
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-gray-800 px-4 py-2 text-gray-400">Normal</td>
                                <td className="border border-gray-800 px-4 py-2">Regular network traffic</td>
                                <td className="border border-gray-800 px-4 py-2">-</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <h3>How NopeNet Uses the KDD Format</h3>
                        <p>
                          NopeNet is designed to process network data in the KDD format, extracting relevant features to
                          identify potential intrusions. Our system:
                        </p>
                        <ul>
                          <li>Parses the comma-separated values from the input data</li>
                          <li>Extracts key features for analysis</li>
                          <li>Applies our trained XGBoost model to classify traffic</li>
                          <li>Categorizes detected attacks into the four main categories</li>
                          <li>Provides confidence scores for each detection</li>
                        </ul>

                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 my-6">
                          <h4 className="text-blue-400 mt-0">Sample KDD Format</h4>
                          <pre className="text-xs text-gray-300 overflow-x-auto">
                            <code>
                              {`0,tcp,http,SF,215,45076,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,normal
0,udp,private,SF,105,146,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0.00,0.00,0.00,0.00,1.00,0.00,0.00,255,254,1.00,0.01,0.00,0.00,0.00,0.00,0.00,0.00,normal
0,tcp,private,S0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0.00,0.00,0.00,0.00,1.00,0.00,0.00,123,6,0.05,0.07,0.00,0.00,0.00,0.00,0.00,0.00,neptune`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="model">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item}>
                  <Card className="bg-black/50 border border-gray-800 shadow-xl backdrop-blur-sm mb-8">
                    <CardHeader className="pb-2 border-b border-gray-800/50">
                      <CardTitle className="text-xl flex items-center">
                        <Cpu className="mr-2 h-5 w-5 text-blue-400" />
                        XGBoost Model Implementation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="prose prose-invert max-w-none">
                        <h2>XGBoost for Intrusion Detection</h2>
                        <p>
                          NopeNet uses XGBoost (eXtreme Gradient Boosting), a powerful machine learning algorithm, to
                          detect network intrusions with high accuracy and efficiency.
                        </p>

                        <div className="my-8">
                          <h3>Why XGBoost?</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                              <h4 className="text-blue-400 mt-0 mb-2">Performance Advantages</h4>
                              <ul className="mt-2 space-y-2">
                                <li className="flex items-start">
                                  <span className="text-green-400 mr-2">✓</span>
                                  <span>XGBoost has the highest accuracy (99.80%)</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-green-400 mr-2">✓</span>
                                  <span>Strong precision, recall, and F1-score</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-green-400 mr-2">✓</span>
                                  <span>Detects major attacks accurately</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-green-400 mr-2">✓</span>
                                  <span>Performs best on dominant and rare classes</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-green-400 mr-2">✓</span>
                                  <span>Better generalization than other models</span>
                                </li>
                              </ul>
                            </div>

                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                              <h4 className="text-blue-400 mt-0 mb-2">Comparison to Other Models</h4>
                              <div className="overflow-x-auto">
                                <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
                                  <table className="w-full text-sm">
                                    <thead className="border-b border-gray-800 pb-2">
                                      <tr>
                                        <th className="text-left pb-3 pr-4 text-blue-400">Model</th>
                                        <th className="text-left pb-3 pr-4 text-blue-400">Accuracy</th>
                                        <th className="text-left pb-3 text-blue-400">Training Speed</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="border-b border-gray-800/50">
                                        <td className="py-3 pr-4 font-medium">XGBoost</td>
                                        <td className="py-3 pr-4">
                                          <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded font-medium">
                                            99.80%
                                          </span>
                                        </td>
                                        <td className="py-3">
                                          <span className="bg-red-900/30 text-red-400 px-2 py-1 rounded font-medium">
                                            Slow
                                          </span>
                                        </td>
                                      </tr>
                                      <tr className="border-b border-gray-800/50">
                                        <td className="py-3 pr-4 font-medium">Random Forest</td>
                                        <td className="py-3 pr-4">
                                          <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded font-medium">
                                            99.79%
                                          </span>
                                        </td>
                                        <td className="py-3">
                                          <span className="bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded font-medium">
                                            Medium
                                          </span>
                                        </td>
                                      </tr>
                                      <tr className="border-b border-gray-800/50">
                                        <td className="py-3 pr-4 font-medium">Logistic Regression</td>
                                        <td className="py-3 pr-4">
                                          <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded font-medium">
                                            99.12%
                                          </span>
                                        </td>
                                        <td className="py-3">
                                          <span className="bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded font-medium">
                                            Medium
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="py-3 pr-4 font-medium">LightGBM</td>
                                        <td className="py-3 pr-4">
                                          <span className="bg-red-900/30 text-red-400 px-2 py-1 rounded font-medium">
                                            77.01%
                                          </span>
                                        </td>
                                        <td className="py-3">
                                          <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded font-medium">
                                            Fast
                                          </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <h3>Model Architecture and Training</h3>

                        <div className="my-6 bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                          <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-full md:w-1/2">
                              <h4 className="text-blue-400 mt-0">Training Process</h4>
                              <ol className="space-y-3 mt-4">
                                <li className="flex items-start">
                                  <span className="bg-blue-900/50 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                                    1
                                  </span>
                                  <span>
                                    <strong className="text-blue-400">Data Preprocessing:</strong> Cleaning,
                                    normalization and feature engineering
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="bg-blue-900/50 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                                    2
                                  </span>
                                  <span>
                                    <strong className="text-blue-400">Feature Selection:</strong> Identifying the most
                                    important features using feature importance
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="bg-blue-900/50 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                                    3
                                  </span>
                                  <span>
                                    <strong className="text-blue-400">Hyperparameter Tuning:</strong> Grid search with
                                    cross-validation to find optimal parameters
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="bg-blue-900/50 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                                    4
                                  </span>
                                  <span>
                                    <strong className="text-blue-400">Model Training:</strong> Training on 80% of the
                                    KDD dataset with optimized parameters
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="bg-blue-900/50 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                                    5
                                  </span>
                                  <span>
                                    <strong className="text-blue-400">Evaluation:</strong> Testing on the remaining 20%
                                    to validate performance
                                  </span>
                                </li>
                              </ol>
                            </div>

                            <div className="w-full md:w-1/2">
                              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                                <h4 className="text-blue-400 mt-0 mb-4">XGBoost Parameters</h4>
                                <pre className="text-xs text-gray-300 overflow-x-auto">
                                  <code>
                                    {`{
  "objective": "multi:softprob",
  "num_class": 5,  // Normal + 4 attack types
  "max_depth": 6,
  "learning_rate": 0.1,
  "n_estimators": 100,
  "subsample": 0.8,
  "colsample_bytree": 0.8,
  "min_child_weight": 1,
  "reg_alpha": 0.1,
  "reg_lambda": 1.0,
  "scale_pos_weight": 1,
  "seed": 42
}`}
                                  </code>
                                </pre>
                              </div>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-indigo-400 flex items-center mt-8 mb-4">
                          <span className="inline-block w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          Implementation in NopeNet
                        </h3>
                        
                        <div className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border border-indigo-800/30 rounded-lg p-6 my-6">
                          <p className="mb-4 text-indigo-100">
                            NopeNet features a complete implementation of the XGBoost intrusion detection model with 99.8% accuracy, 
                            providing enterprise-grade security monitoring in an accessible interface.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-black/40 border border-indigo-800/40 rounded-lg p-4 hover:shadow-[0_0_10px_rgba(79,70,229,0.2)] transition-all">
                              <h4 className="text-indigo-400 font-medium flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                RESTful API Integration
                              </h4>
                              <p className="text-sm text-gray-300">
                                Full FastAPI backend with optimized endpoints for real-time traffic analysis and batch processing
                              </p>
                            </div>
                            
                            <div className="bg-black/40 border border-indigo-800/40 rounded-lg p-4 hover:shadow-[0_0_10px_rgba(79,70,229,0.2)] transition-all">
                              <h4 className="text-indigo-400 font-medium flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                Advanced Feature Processing
                              </h4>
                              <p className="text-sm text-gray-300">
                                Automated extraction and normalization of 41 features from network traffic data
                              </p>
                            </div>
                            
                            <div className="bg-black/40 border border-indigo-800/40 rounded-lg p-4 hover:shadow-[0_0_10px_rgba(79,70,229,0.2)] transition-all">
                              <h4 className="text-indigo-400 font-medium flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                Optimized Model Inference
                              </h4>
                              <p className="text-sm text-gray-300">
                                High-performance XGBoost implementation with optimized parameters and rapid classification
                              </p>
                            </div>
                            
                            <div className="bg-black/40 border border-indigo-800/40 rounded-lg p-4 hover:shadow-[0_0_10px_rgba(79,70,229,0.2)] transition-all">
                              <h4 className="text-indigo-400 font-medium flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                </svg>
                                Real-time Visualization
                              </h4>
                              <p className="text-sm text-gray-300">
                                Interactive dashboards and charts providing instant insights into detection results
                              </p>
                            </div>
                            
                            <div className="bg-black/40 border border-indigo-800/40 rounded-lg p-4 hover:shadow-[0_0_10px_rgba(79,70,229,0.2)] transition-all">
                              <h4 className="text-indigo-400 font-medium flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Actionable Security Insights
                              </h4>
                              <p className="text-sm text-gray-300">
                                Contextual recommendations tailored to detected attack types with remediation steps
                              </p>
                            </div>
                            
                            <div className="bg-black/40 border border-indigo-800/40 rounded-lg p-4 hover:shadow-[0_0_10px_rgba(79,70,229,0.2)] transition-all">
                              <h4 className="text-indigo-400 font-medium flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                AI Assistant Integration
                              </h4>
                              <p className="text-sm text-gray-300">
                                Intelligent chatbot providing expert analysis and answering security-related questions
                              </p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-blue-400 flex items-center mt-8 mb-4">
                          <span className="inline-block w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </span>
                          Model Performance
                        </h3>

                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 my-6">
                          <h4 className="text-blue-400 mt-0">Performance Metrics</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="border-b border-gray-800 pb-2">
                                <tr>
                                  <th className="text-left p-2 text-blue-400">Attack Type</th>
                                  <th className="text-center p-2 text-blue-400">Precision</th>
                                  <th className="text-center p-2 text-blue-400">Recall</th>
                                  <th className="text-center p-2 text-blue-400">F1-Score</th>
                                  <th className="text-center p-2 text-blue-400">Support</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">back</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">185</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">buffer_overflow</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">22.0%</td>
                                  <td className="p-2 text-center">36.0%</td>
                                  <td className="p-2 text-center">9</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">ftp_write</td>
                                  <td className="p-2 text-center">0.0%</td>
                                  <td className="p-2 text-center">0.0%</td>
                                  <td className="p-2 text-center">0.0%</td>
                                  <td className="p-2 text-center">0</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">guess_passwd</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">91.0%</td>
                                  <td className="p-2 text-center">95.0%</td>
                                  <td className="p-2 text-center">11</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">imap</td>
                                  <td className="p-2 text-center">25.0%</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">40.0%</td>
                                  <td className="p-2 text-center">1</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">ipsweep</td>
                                  <td className="p-2 text-center">99.0%</td>
                                  <td className="p-2 text-center">99.0%</td>
                                  <td className="p-2 text-center">99.0%</td>
                                  <td className="p-2 text-center">733</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">land</td>
                                  <td className="p-2 text-center">50.0%</td>
                                  <td className="p-2 text-center">67.0%</td>
                                  <td className="p-2 text-center">57.0%</td>
                                  <td className="p-2 text-center">3</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">loadmodule</td>
                                  <td className="p-2 text-center">0.0%</td>
                                  <td className="p-2 text-center">0.0%</td>
                                  <td className="p-2 text-center">0.0%</td>
                                  <td className="p-2 text-center">0</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">neptune</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">8228</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">nmap</td>
                                  <td className="p-2 text-center">99.0%</td>
                                  <td className="p-2 text-center">99.0%</td>
                                  <td className="p-2 text-center">99.0%</td>
                                  <td className="p-2 text-center">313</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">normal</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">13422</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">perl</td>
                                  <td className="p-2 text-center">50.0%</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">67.0%</td>
                                  <td className="p-2 text-center">1</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">phf</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">1</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">pod</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">93.0%</td>
                                  <td className="p-2 text-center">96.0%</td>
                                  <td className="p-2 text-center">43</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">portsweep</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">99.0%</td>
                                  <td className="p-2 text-center">99.0%</td>
                                  <td className="p-2 text-center">573</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">rootkit</td>
                                  <td className="p-2 text-center">0.0%</td>
                                  <td className="p-2 text-center">0.0%</td>
                                  <td className="p-2 text-center">0.0%</td>
                                  <td className="p-2 text-center">1</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">satan</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">99.0%</td>
                                  <td className="p-2 text-center">99.0%</td>
                                  <td className="p-2 text-center">738</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">smurf</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">534</td>
                                </tr>
                                <tr className="border-b border-gray-800/30">
                                  <td className="p-2">spy</td>
                                  <td className="p-2 text-center">0.0%</td>
                                  <td className="p-2 text-center">0.0%</td>
                                  <td className="p-2 text-center">0.0%</td>
                                  <td className="p-2 text-center">1</td>
                                </tr>
                                <tr>
                                  <td className="p-2">teardrop</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">100.0%</td>
                                  <td className="p-2 text-center">188</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4 my-6">
                          <h4 className="text-blue-400 mt-0">Future Improvements</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-800/30 rounded-lg p-5 transform hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                              <h4 className="text-blue-400 font-bold flex items-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Real-time Monitoring
                              </h4>
                              <p className="text-sm text-gray-300 pl-7">
                                Integration with enterprise network monitoring tools for continuous threat detection
                              </p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-cyan-900/30 to-teal-900/30 border border-cyan-800/30 rounded-lg p-5 transform hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]">
                              <h4 className="text-cyan-400 font-bold flex items-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Adaptive Learning
                              </h4>
                              <p className="text-sm text-gray-300 pl-7">
                                Continuous model retraining with new attack patterns and emerging threats
                              </p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-800/30 rounded-lg p-5 transform hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                              <h4 className="text-green-400 font-bold flex items-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                                Model Ensemble
                              </h4>
                              <p className="text-sm text-gray-300 pl-7">
                                Combining multiple specialized models for higher detection accuracy
                              </p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-amber-900/30 to-red-900/30 border border-amber-800/30 rounded-lg p-5 transform hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                              <h4 className="text-amber-400 font-bold flex items-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                Zero-day Detection
                              </h4>
                              <p className="text-sm text-gray-300 pl-7">
                                Advanced anomaly detection algorithms to identify previously unknown threats
                              </p>
                            </div>
                            
                            <div className="md:col-span-2 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-800/30 rounded-lg p-5 transform hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                              <h4 className="text-purple-400 font-bold flex items-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                </svg>
                                Advanced Visualizations
                              </h4>
                              <p className="text-sm text-gray-300 pl-7">
                                Expanded interactive visualization options for security analysts with 3D network topology mapping and real-time threat intelligence
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Try NopeNet?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Analyze your network data for potential intrusions and vulnerabilities using our advanced detection
              system.
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              onClick={() => router.push("/")}
            >
              Go to Scanner
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
