import { TopNav } from "@/components/navigation/top-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MyLearningPage() {
    return (
        <div className="min-h-screen bg-muted/30">
            <TopNav />
            <main className="container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6">My Learning</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Enrolled Course 1</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Progress: 45%</p>
                            <div className="w-full bg-secondary h-2 mt-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[45%]" />
                            </div>
                        </CardContent>
                    </Card>
                    {/* Add more placeholder courses as needed */}
                </div>
            </main>
        </div>
    )
}
