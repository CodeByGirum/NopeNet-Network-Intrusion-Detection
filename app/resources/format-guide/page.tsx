"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, FileType, AlertCircle, Code, CheckCircle2, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function FormatGuidePage() {
  const [copiedExample, setCopiedExample] = React.useState(false);
  
  const sampleData = "0,tcp,http,SF,215,45076,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,normal";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(sampleData);
    setCopiedExample(true);
    setTimeout(() => setCopiedExample(false), 2000);
  };
  
  // Column descriptions - simplified for readability
  const columnDescriptions = [
    { name: "duration", desc: "Connection duration in seconds" },
    { name: "protocol_type", desc: "Protocol (tcp, udp, icmp)" },
    { name: "service", desc: "Network service (http, ftp, telnet, etc.)" },
    { name: "flag", desc: "Connection status flag (SF, REJ, etc.)" },
    { name: "src_bytes", desc: "Bytes sent from source to destination" },
    { name: "dst_bytes", desc: "Bytes sent from destination to source" },
    // ... more detailed descriptions can be added for the rest
  ];
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const columns = [
    "duration", "protocol_type", "service", "flag", "src_bytes", "dst_bytes",
    "land", "wrong_fragment", "urgent", "hot", "num_failed_logins", "logged_in",
    "num_compromised", "root_shell", "su_attempted", "num_root", "num_file_creations",
    "num_shells", "num_access_files", "num_outbound_cmds", "is_host_login",
    "is_guest_login", "count", "srv_count", "serror_rate", "srv_serror_rate",
    "rerror_rate", "srv_rerror_rate", "same_srv_rate", "diff_srv_rate",
    "srv_diff_host_rate", "dst_host_count", "dst_host_srv_count",
    "dst_host_same_srv_rate", "dst_host_diff_srv_rate", "dst_host_same_src_port_rate",
    "dst_host_srv_diff_host_rate", "dst_host_serror_rate", "dst_host_srv_serror_rate",
    "dst_host_rerror_rate", "dst_host_srv_rerror_rate", "label"
  ];
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#0a0a20] z-0"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <FileType className="h-8 w-8 text-blue-400" />
              <h1 className="text-3xl font-bold">KDD Format Guide</h1>
            </div>
            <p className="text-gray-300 mb-10 text-lg">
              Learn how to format your network data for NopeNet's detection model
            </p>
          </motion.div>
          
          <motion.div 
            className="grid gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Format Overview */}
            <motion.div variants={item}>
              <Card className="bg-black/50 border border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-400 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Required Format
                  </CardTitle>
                  <CardDescription>
                    Your data must follow the KDD Cup 1999 dataset format
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-gray-200">Format Rules:</h3>
                    <ul className="list-disc pl-5 text-gray-300 text-sm space-y-2">
                      <li>One record per line (each line = one network packet)</li>
                      <li>Each line must have exactly 41 fields separated by commas</li>
                      <li>No header row, only data values</li>
                      <li>The last field is the classification label (normal or attack type)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Example */}
            <motion.div variants={item}>
              <Card className="bg-black/50 border border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-400 flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Example
                  </CardTitle>
                  <CardDescription>
                    Copy this example to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="p-3 bg-gray-900/80 rounded-md border border-gray-800 overflow-x-auto">
                      <code className="text-gray-300 text-sm whitespace-nowrap">{sampleData}</code>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="absolute right-2 top-2 h-7 px-2 text-xs bg-gray-800/90 border-gray-700 hover:bg-gray-700"
                      onClick={copyToClipboard}
                    >
                      {copiedExample ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Columns */}
            <motion.div variants={item}>
              <Card className="bg-black/50 border border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-400 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Required Fields (41 total)
                  </CardTitle>
                  <CardDescription>
                    All 41 fields must be present in this order
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {columns.map((column, index) => (
                      <div 
                        key={index} 
                        className="px-3 py-2 bg-gray-900/50 rounded text-sm border border-gray-800/50 flex items-center gap-2"
                      >
                        <span className="text-blue-400 text-xs font-mono">{index + 1}.</span>
                        <span className="text-gray-200">{column}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium text-sm text-gray-200 mb-2">Key Field Descriptions:</h3>
                    <div className="space-y-2 text-sm">
                      {columnDescriptions.map((col, index) => (
                        <div key={index} className="flex">
                          <span className="text-blue-400 w-32 shrink-0">{col.name}:</span>
                          <span className="text-gray-300">{col.desc}</span>
                        </div>
                      ))}
                      <div className="flex">
                        <span className="text-blue-400 w-32 shrink-0">label:</span>
                        <span className="text-gray-300">Classification (normal, DOS, Probe, R2L, U2R, etc.)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 