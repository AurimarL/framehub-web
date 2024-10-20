"use client";

import { useState } from "react";
import { ArrowRight, Download, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const frameworks = [
  {
    name: "Next.js",
    icon: "/placeholder.svg?height=40&width=40",
    description: "The React Framework for Production",
  },
  {
    name: "Nuxt.js",
    icon: "/placeholder.svg?height=40&width=40",
    description: "The Intuitive Vue Framework",
  },
  {
    name: "SvelteKit",
    icon: "/placeholder.svg?height=40&width=40",
    description: "The fastest way to build Svelte apps",
  },
  {
    name: "Remix",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Full stack web framework",
  },
  {
    name: "Astro",
    icon: "/placeholder.svg?height=40&width=40",
    description: "The all-in-one web framework",
  },
  {
    name: "Gatsby",
    icon: "/placeholder.svg?height=40&width=40",
    description: "The fastest frontend for the headless web",
  },
];

export default function HomePage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/download-msi");
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "framehub_0.1.0_x64_en-US.msi";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Download Started",
        description:
          "Your download has begun. Please check your downloads folder.",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description:
          "There was an error starting your download. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold">Framework Chooser</div>
          <div className="space-x-4">
            <Button variant="ghost" size="sm">
              About
            </Button>
            <Button variant="ghost" size="sm">
              Docs
            </Button>
            <Button variant="outline" size="sm">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </nav>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Framework Chooser
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Select, configure, and initialize your preferred web development
            framework with ease. Start building your next project in minutes!
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <Download className="mr-2 h-5 w-5 animate-bounce" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Download for Windows
                </>
              )}
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            title="Multiple Frameworks"
            description="Support for popular frameworks like Next.js, React, Vue, and more."
            icon={<div className="text-4xl">🎨</div>}
          />
          <FeatureCard
            title="Custom Configuration"
            description="Tailor your project setup with easy-to-use configuration options."
            icon={<div className="text-4xl">⚙️</div>}
          />
          <FeatureCard
            title="Quick Start"
            description="Generate and run your project with just a few clicks."
            icon={<div className="text-4xl">🚀</div>}
          />
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Available Full-Stack Frameworks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworks.map((framework) => (
              <div
                key={framework.name}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={framework.icon}
                  alt={framework.name}
                  className="w-10 h-10"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {framework.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {framework.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="text-center text-gray-500">
          <div className="flex justify-center space-x-4 mb-4">
            <Button variant="ghost" size="sm">
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
            <Button variant="ghost" size="sm">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
          <p>&copy; 2023 Framework Chooser. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: JSX.Element;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-4">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
