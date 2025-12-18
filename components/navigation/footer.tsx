import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
    return (
        <footer className="bg-background border-t py-12 px-4 md:px-6">
            <div className="mx-auto max-w-screen-xl grid gap-8 md:grid-cols-2 lg:grid-cols-5">
                <div className="lg:col-span-2">
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <div className="flex size-8 items-center justify-center rounded bg-primary">
                            <span className="font-sans text-lg font-bold text-primary-foreground">L</span>
                        </div>
                        <span className="font-sans text-xl font-bold">LearnConnect</span>
                    </Link>
                    <p className="text-muted-foreground mb-6 max-w-xs">
                        Connect, learn, and grow your career with the world's leading professional learning network.
                    </p>
                    <div className="flex gap-4">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
                            <Twitter className="size-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
                            <Linkedin className="size-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
                            <Facebook className="size-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
                            <Instagram className="size-5" />
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-sans font-semibold text-lg">Platform</h3>
                    <ul className="space-y-2">
                        <li><Link href="/learning" className="text-sm text-muted-foreground hover:text-primary transition-colors">Courses</Link></li>
                        <li><Link href="/jobs" className="text-sm text-muted-foreground hover:text-primary transition-colors">Jobs</Link></li>
                        <li><Link href="/network" className="text-sm text-muted-foreground hover:text-primary transition-colors">Network</Link></li>
                        <li><Link href="/mentorship" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mentorship</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="font-sans font-semibold text-lg">Company</h3>
                    <ul className="space-y-2">
                        <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
                        <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                        <li><Link href="/press" className="text-sm text-muted-foreground hover:text-primary transition-colors">Press</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="font-sans font-semibold text-lg">Resources</h3>
                    <ul className="space-y-2">
                        <li><Link href="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
                        <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                        <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Support</Link></li>
                    </ul>
                </div>
            </div>

            <div className="mx-auto max-w-screen-xl mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} LearnConnect Inc. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
                    <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
                    <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">Cookies</Link>
                </div>
            </div>
        </footer>
    )
}
