"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Monitor, ListChecks, ChevronLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export interface WizardData {
    type: "course" | "test"
    title: string
    category: string
    timeCommitment: string
}

interface CourseCreationWizardProps {
    onExit: () => void
    onComplete: (data: WizardData) => void
}

export function CourseCreationWizard({ onExit, onComplete }: CourseCreationWizardProps) {
    const [step, setStep] = useState(1)
    const [data, setData] = useState<WizardData>({
        type: "course",
        title: "",
        category: "",
        timeCommitment: ""
    })

    const totalSteps = 4

    const nextStep = () => setStep(s => Math.min(s + 1, totalSteps))
    const prevStep = () => setStep(s => Math.max(s - 1, 1))

    const isStepValid = () => {
        switch (step) {
            case 1: return !!data.type
            case 2: return !!data.title
            case 3: return !!data.category
            case 4: return !!data.timeCommitment
            default: return false
        }
    }

    const handleComplete = () => {
        onComplete(data)
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header */}
            <header className="border-b px-6 h-16 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-4">
                    <span className="font-bold text-xl text-purple-700">udemy</span>
                    <div className="h-4 w-px bg-gray-300 mx-2" />
                    <span className="text-sm font-medium text-gray-600">Step {step} of {totalSteps}</span>
                </div>
                <Button variant="ghost" className="text-purple-600 font-bold hover:bg-purple-50 hover:text-purple-700" onClick={onExit}>
                    Exit
                </Button>
            </header>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 h-1">
                <div
                    className="bg-purple-600 h-1 transition-all duration-300 ease-in-out"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                />
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">

                {step === 1 && (
                    <div className="space-y-8 text-center w-full">
                        <h1 className="text-3xl font-serif font-bold text-gray-800">First, let's find out what type of course you're making.</h1>

                        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12">
                            <button
                                onClick={() => setData({ ...data, type: "course" })}
                                className={`p-8 border-2 hover:bg-gray-50 flex flex-col items-center gap-4 transition-all ${data.type === "course" ? "border-black ring-1 ring-black" : "border-gray-200"}`}
                            >
                                <div className="p-3 bg-gray-100 rounded">
                                    <Monitor className="w-8 h-8 text-gray-600" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-bold text-lg">Course</h3>
                                    <p className="text-sm text-gray-500">Create rich learning experiences with the help of video lectures, quizzes, coding exercises, etc.</p>
                                </div>
                            </button>

                            <button
                                onClick={() => setData({ ...data, type: "test" })}
                                className={`p-8 border-2 hover:bg-gray-50 flex flex-col items-center gap-4 transition-all ${data.type === "test" ? "border-black ring-1 ring-black" : "border-gray-200"}`}
                            >
                                <div className="p-3 bg-gray-100 rounded">
                                    <ListChecks className="w-8 h-8 text-gray-600" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-bold text-lg">Practice Test</h3>
                                    <p className="text-sm text-gray-500">Help students prepare for certification exams by providing practice questions.</p>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-8 text-center w-full max-w-2xl">
                        <h1 className="text-3xl font-serif font-bold text-gray-800">How about a working title?</h1>
                        <p className="text-gray-600">It's ok if you can't think of a good title now. You can change it later.</p>

                        <div className="pt-8">
                            <div className="relative">
                                <Input
                                    value={data.title}
                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                    placeholder="e.g. Learn Photoshop CS6 from Scratch"
                                    className="h-14 text-lg px-4 border-black rounded-none"
                                    maxLength={60}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">
                                    {60 - data.title.length}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-8 text-center w-full max-w-2xl">
                        <h1 className="text-3xl font-serif font-bold text-gray-800">What category best fits the knowledge you'll share?</h1>
                        <p className="text-gray-600">If you're not sure about the right category, you can change it later.</p>

                        <div className="pt-8 max-w-md mx-auto">
                            <Select value={data.category} onValueChange={(val) => setData({ ...data, category: val })}>
                                <SelectTrigger className="h-14 border-black rounded-none text-lg">
                                    <SelectValue placeholder="Choose a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="development">Development</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                    <SelectItem value="finance">Finance & Accounting</SelectItem>
                                    <SelectItem value="it">IT & Software</SelectItem>
                                    <SelectItem value="office">Office Productivity</SelectItem>
                                    <SelectItem value="personal">Personal Development</SelectItem>
                                    <SelectItem value="design">Design</SelectItem>
                                    <SelectItem value="marketing">Marketing</SelectItem>
                                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                                    <SelectItem value="photography">Photography & Video</SelectItem>
                                    <SelectItem value="health">Health & Fitness</SelectItem>
                                    <SelectItem value="music">Music</SelectItem>
                                    <SelectItem value="teaching">Teaching & Academics</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-8 text-center w-full max-w-2xl">
                        <h1 className="text-3xl font-serif font-bold text-gray-800">How much time can you spend creating your course per week?</h1>
                        <p className="text-gray-600">There's no wrong answer. We can help you achieve your goals even if you don't have much time.</p>

                        <div className="pt-8 max-w-xl mx-auto text-left">
                            <RadioGroup value={data.timeCommitment} onValueChange={(val) => setData({ ...data, timeCommitment: val })} className="space-y-3">
                                <div className={`flex items-center space-x-3 p-4 border transition-colors ${data.timeCommitment === "busy" ? "border-black bg-gray-50" : "border-gray-300 bg-white"}`}>
                                    <RadioGroupItem value="busy" id="busy" className="border-black text-black" />
                                    <Label htmlFor="busy" className="flex-1 cursor-pointer font-normal text-base">I'm very busy right now (0-2 hours)</Label>
                                </div>
                                <div className={`flex items-center space-x-3 p-4 border transition-colors ${data.timeCommitment === "side" ? "border-black bg-gray-50" : "border-gray-300 bg-white"}`}>
                                    <RadioGroupItem value="side" id="side" className="border-black text-black" />
                                    <Label htmlFor="side" className="flex-1 cursor-pointer font-normal text-base">I'll work on this on the side (2-4 hours)</Label>
                                </div>
                                <div className={`flex items-center space-x-3 p-4 border transition-colors ${data.timeCommitment === "flexible" ? "border-black bg-gray-50" : "border-gray-300 bg-white"}`}>
                                    <RadioGroupItem value="flexible" id="flexible" className="border-black text-black" />
                                    <Label htmlFor="flexible" className="flex-1 cursor-pointer font-normal text-base">I have lots of flexibility (5+ hours)</Label>
                                </div>
                                <div className={`flex items-center space-x-3 p-4 border transition-colors ${data.timeCommitment === "decided" ? "border-black bg-gray-50" : "border-gray-300 bg-white"}`}>
                                    <RadioGroupItem value="decided" id="decided" className="border-black text-black" />
                                    <Label htmlFor="decided" className="flex-1 cursor-pointer font-normal text-base">I haven't yet decided if I have time</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                )}

            </main>

            {/* Sticky Footer */}
            <footer className="border-t p-6 bg-white sticky bottom-0 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="h-12 px-6 font-bold border-black text-black rounded-none hover:bg-gray-100"
                >
                    Previous
                </Button>

                <Button
                    onClick={step === totalSteps ? handleComplete : nextStep}
                    disabled={!isStepValid()}
                    className="h-12 px-6 font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-none"
                >
                    {step === totalSteps ? "Create Course" : "Continue"}
                </Button>
            </footer>
        </div>
    )
}
