import { TopNav } from "@/components/navigation/top-nav"
import { SkillPathCard } from "@/components/learning/skill-path-card"

export default function SkillPathsPage() {
    const paths = [
        {
            title: "Become a Data Scientist",
            description: "Learn Python, SQL, and Machine Learning to become a professional Data Scientist.",
            courseCount: 8,
            image: "/path-data.jpg"
        },
        {
            title: "Full Stack Web Developer",
            description: "Master the MERN stack and build modern web applications from scratch.",
            courseCount: 6,
            image: "/path-web.jpg"
        },
        {
            title: "Digital Marketing Specialist",
            description: "Master SEO, SEM, and Social Media Marketing strategies.",
            courseCount: 5,
            image: "/path-marketing.jpg"
        },
        {
            title: "UX/UI Design Master",
            description: "From wireframing to prototyping, learn to design user-centric interfaces.",
            courseCount: 4,
            image: "/path-design.jpg"
        }
    ]

    return (
        <div className="min-h-screen bg-muted/30">
            <TopNav />
            <main className="container mx-auto px-4 py-8 max-w-screen-xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-serif mb-2">Skill Paths</h1>
                    <p className="text-muted-foreground">Curated learning tracks to help you master a specific career skill set.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {paths.map((path, index) => (
                        <SkillPathCard key={index} {...path} />
                    ))}
                </div>
            </main>
        </div>
    )
}
