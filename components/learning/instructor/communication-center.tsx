"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, HelpCircle } from "lucide-react"

export function CommunicationCenter() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Communication</h2>
                <p className="text-muted-foreground">Manage Q&A and messages from your students.</p>
            </div>

            <Tabs defaultValue="qa" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="qa" className="gap-2">
                        <HelpCircle className="size-4" />
                        Q&A
                    </TabsTrigger>
                    <TabsTrigger value="messages" className="gap-2">
                        <MessageSquare className="size-4" />
                        Messages
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="qa">
                    <Card>
                        <CardHeader>
                            <CardTitle>Questions & Answers</CardTitle>
                            <CardDescription>
                                Unanswered questions from your students.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground text-sm">
                                <HelpCircle className="size-12 mb-4 opacity-20" />
                                <p>No new questions found.</p>
                                <p>Great job! You are all caught up.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="messages">
                    <Card>
                        <CardHeader>
                            <CardTitle>Direct Messages</CardTitle>
                            <CardDescription>
                                Private messages from students.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground text-sm">
                                <MessageSquare className="size-12 mb-4 opacity-20" />
                                <p>No new messages.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
