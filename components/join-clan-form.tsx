"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function JoinClanForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    position: "",
    experience: "",
    gamertag: "",
    platform: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Join form submitted:", formData)
    setIsSubmitted(true)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Card className="bg-gradient-to-br from-red-900/90 to-black/90 border-red-500 border-2 shadow-2xl shadow-red-900/50">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-red-400 font-serif mb-4">🔥 WELCOME TO THE CLAN! 🔥</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl mb-6">⚽</div>
          <p className="text-xl text-gray-200 font-semibold">Your application has been received, warrior!</p>
          <p className="text-gray-300">Our clan leaders will review your skills and contact you within 24-48 hours.</p>
          <p className="text-red-400 font-bold">Prepare yourself for domination on the field!</p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="mt-6 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-3 px-8 transition-all duration-300 transform hover:scale-105"
          >
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-black/80 border-red-600 border-2 shadow-2xl shadow-red-900/50">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-red-500 font-serif">RECRUITMENT FORM</CardTitle>
        <p className="text-gray-400">{"Fill out the form below to join our elite squad"}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-red-400 font-semibold">
                Full Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="bg-gray-900 border-red-800 text-white focus:border-red-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-red-400 font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="bg-gray-900 border-red-800 text-white focus:border-red-500"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-red-400 font-semibold">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                className="bg-gray-900 border-red-800 text-white focus:border-red-500"
                placeholder="18"
                min="16"
                max="35"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position" className="text-red-400 font-semibold">
                Preferred Position
              </Label>
              <Select onValueChange={(value) => handleChange("position", value)}>
                <SelectTrigger className="bg-gray-900 border-red-800 text-white focus:border-red-500">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-red-800">
                  <SelectItem value="striker">Striker</SelectItem>
                  <SelectItem value="midfielder">Midfielder</SelectItem>
                  <SelectItem value="defender">Defender</SelectItem>
                  <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                  <SelectItem value="winger">Winger</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="gamertag" className="text-red-400 font-semibold">
                Gamertag/PSN/Xbox ID
              </Label>
              <Input
                id="gamertag"
                value={formData.gamertag}
                onChange={(e) => handleChange("gamertag", e.target.value)}
                className="bg-gray-900 border-red-800 text-white focus:border-red-500"
                placeholder="YourGamertag123"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform" className="text-red-400 font-semibold">
                Gaming Platform
              </Label>
              <Select onValueChange={(value) => handleChange("platform", value)}>
                <SelectTrigger className="bg-gray-900 border-red-800 text-white focus:border-red-500">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-red-800">
                  <SelectItem value="ps5">PlayStation 5</SelectItem>
                  <SelectItem value="ps4">PlayStation 4</SelectItem>
                  <SelectItem value="xbox-series">Xbox Series X/S</SelectItem>
                  <SelectItem value="xbox-one">Xbox One</SelectItem>
                  <SelectItem value="pc">PC</SelectItem>
                  <SelectItem value="nintendo">Nintendo Switch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience" className="text-red-400 font-semibold">
              E-Football Experience
            </Label>
            <Select onValueChange={(value) => handleChange("experience", value)}>
              <SelectTrigger className="bg-gray-900 border-red-800 text-white focus:border-red-500">
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-red-800">
                <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                <SelectItem value="professional">Professional (5+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-red-400 font-semibold">
              Why do you want to join Barba Blanca?
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="bg-gray-900 border-red-800 text-white focus:border-red-500 min-h-[120px]"
              placeholder="Tell us about your skills, achievements, and why you want to be part of our clan..."
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-4 text-lg transition-all duration-300 transform hover:scale-105"
          >
            🔥 JOIN THE CLAN 🔥
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
