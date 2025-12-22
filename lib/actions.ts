"use server"

import fs from "fs/promises"
import path from "path"

const DB_PATH = path.join(process.cwd(), "lib", "data.json")

// --- Helper Functions ---

async function readDb() {
    try {
        const data = await fs.readFile(DB_PATH, "utf-8")
        return JSON.parse(data)
    } catch (error) {
        console.error("Error reading database:", error)
        return { posts: [], candidates: [], courses: [] }
    }
}

async function writeDb(data: any) {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
    } catch (error) {
        console.error("Error writing to database:", error)
    }
}

// --- Post Actions ---

export async function getPosts() {
    const db = await readDb()
    return db.posts || []
}

export async function createPost(content: string, image?: string) {
    const db = await readDb()
    const newPost = {
        id: Date.now(),
        author: "John Doe",
        role: "Senior Product Manager",
        timeAgo: "Just now",
        content,
        likes: 0,
        comments: [],
        avatar: "/professional-user.png",
        image: image || undefined,
        isLiked: false,
        isCommentsOpen: false,
    }

    db.posts = [newPost, ...db.posts]
    await writeDb(db)
    return newPost
}

export async function togglePostLike(postId: number) {
    const db = await readDb()
    db.posts = db.posts.map((post: any) => {
        if (post.id === postId) {
            return {
                ...post,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                isLiked: !post.isLiked,
            }
        }
        return post
    })
    await writeDb(db)
    return db.posts
}

export async function addPostComment(postId: number, content: string) {
    const db = await readDb()
    const newComment = {
        id: Date.now(),
        author: "John Doe",
        content,
        avatar: "/professional-user.png",
        timestamp: "Just now"
    }

    db.posts = db.posts.map((post: any) => {
        if (post.id === postId) {
            return {
                ...post,
                comments: [newComment, ...post.comments]
            }
        }
        return post
    })

    await writeDb(db)
    return db.posts
}

// --- Candidate Actions ---

export async function getCandidates() {
    const db = await readDb()
    return db.candidates || []
}

export async function updateCandidateStatus(candidateId: number, newStatus: string) {
    const db = await readDb()
    db.candidates = db.candidates.map((c: any) =>
        c.id === candidateId ? { ...c, status: newStatus } : c
    )
    await writeDb(db)
    return db.candidates
}

// --- Course Actions ---

export async function getCourses() {
    const db = await readDb()
    return db.courses || []
}

export async function getInstructorStats() {
    const db = await readDb()
    const publishedCourses = db.courses.filter((c: any) => c.status === 'published').length
    const totalStudents = db.courses.reduce((acc: number, c: any) => acc + (c.students || 0), 0)

    return {
        ...db.instructor,
        totalCourses: db.courses.length,
        publishedCourses,
        totalStudents
    }
}

export async function createCourse(courseData: any) {
    const db = await readDb()
    const newCourse = {
        id: Date.now().toString(),
        ...courseData,
        author: {
            name: db.instructor.profile.name,
            role: db.instructor.profile.headline,
            image: db.instructor.profile.image,
            bio: db.instructor.profile.bio
        },
        rating: 0,
        reviews: 0,
        students: 0,
        revenue: 0,
        views: 0,
        status: "draft",
        lastUpdated: new Date().toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }),
        curriculum: []
    }

    db.courses.push(newCourse)
    await writeDb(db)
    return newCourse
}

export async function updateCourse(courseId: string, updates: any) {
    const db = await readDb()
    const index = db.courses.findIndex((c: any) => c.id.toString() === courseId.toString())

    if (index === -1) {
        throw new Error("Course not found")
    }

    db.courses[index] = { ...db.courses[index], ...updates, lastUpdated: new Date().toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }) }
    await writeDb(db)
    return db.courses[index]
}

export async function deleteCourse(courseId: string) {
    const db = await readDb()
    db.courses = db.courses.filter((c: any) => c.id.toString() !== courseId.toString())
    await writeDb(db)
    return { success: true }
}

export async function getCourse(courseId: string) {
    const db = await readDb()
    return db.courses.find((c: any) => c.id.toString() === courseId.toString())
}

// --- Student & Review Actions ---

export async function getStudents() {
    const db = await readDb()
    return db.students || []
}

export async function getReviews(courseId?: string) {
    const db = await readDb()
    if (courseId) {
        return db.reviews.filter((r: any) => r.courseId.toString() === courseId.toString()) || []
    }
    return db.reviews || []
}

// --- Curriculum Actions ---

export async function updateCourseCurriculum(courseId: string, sections: any[]) {
    const db = await readDb()
    const index = db.courses.findIndex((c: any) => c.id.toString() === courseId.toString())

    if (index === -1) {
        throw new Error("Course not found")
    }

    db.courses[index].sections = sections
    db.courses[index].lastUpdated = new Date().toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })

    await writeDb(db)
    return db.courses[index]
}
