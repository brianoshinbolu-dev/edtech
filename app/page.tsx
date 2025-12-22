"use client"

import { useState, useRef, useEffect } from "react"
import { TopNav } from "@/components/navigation/top-nav"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { getPosts, createPost, togglePostLike, addPostComment } from "@/lib/actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ThumbsUp, MessageCircle, Share2, TrendingUp, Briefcase, Image as ImageIcon, X } from "lucide-react"

interface Comment {
  id: number
  author: string
  content: string
  avatar: string
  timestamp: string
}

interface Post {
  id: number
  author: string
  role: string
  timeAgo: string
  content: string
  likes: number
  comments: Comment[]
  avatar: string
  image?: string
  isLiked: boolean
  isCommentsOpen: boolean
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPostContent, setNewPostContent] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts()
        setPosts(data)
      } catch (error) {
        console.error("Failed to fetch posts", error)
      }
    }
    fetchPosts()
  }, [])

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreatePost = async () => {
    if (!newPostContent.trim() && !selectedImage) return

    try {
      // Optimistic update
      const tempId = Date.now()
      const optimisticPost: Post = {
        id: tempId,
        author: "John Doe",
        role: "Senior Product Manager",
        timeAgo: "Just now",
        content: newPostContent,
        likes: 0,
        comments: [],
        avatar: "/professional-user.png",
        image: selectedImage || undefined,
        isLiked: false,
        isCommentsOpen: false,
      }
      setPosts([optimisticPost, ...posts])
      setNewPostContent("")
      setSelectedImage(null)

      // Server action
      await createPost(newPostContent, selectedImage || undefined)

      // Re-fetch to ensure sync (optional but safer for IDs)
      const updatedPosts = await getPosts()
      setPosts(updatedPosts)

      toast({
        title: "Post Created",
        description: "Your post has been shared successfully.",
      })
    } catch (error) {
      console.error("Failed to create post", error)
      // Revert optimization would go here in a real app
    }
  }

  const toggleLike = async (postId: number) => {
    // Optimistic update
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          }
        }
        return post
      }),
    )

    try {
      await togglePostLike(postId)
      // Silent success
    } catch (error) {
      console.error("Failed to toggle like", error)
    }
  }

  const toggleComments = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isCommentsOpen: !post.isCommentsOpen
          }
        }
        return post
      })
    )
  }

  const handleCommentChange = (postId: number, text: string) => {
    setCommentDrafts(prev => ({
      ...prev,
      [postId]: text
    }))
  }

  const submitComment = async (postId: number) => {
    const text = commentDrafts[postId]
    if (!text?.trim()) return

    // Optimistic update
    const newComment: Comment = {
      id: Date.now(),
      author: "John Doe",
      content: text,
      avatar: "/professional-user.png",
      timestamp: "Just now"
    }

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [newComment, ...post.comments]
        }
      }
      return post
    }))

    setCommentDrafts(prev => ({
      ...prev,
      [postId]: ""
    }))

    try {
      await addPostComment(postId, text)
    } catch (error) {
      console.error("Failed to add comment", error)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <TopNav />
      <Toaster />

      <main className="mx-auto max-w-screen-xl px-4 py-6">
        <div className="grid gap-6 md:grid-cols-12">
          {/* Left Sidebar - Profile Summary - Hidden on mobile */}
          <aside className="hidden md:block md:col-span-3">
            <Card>
              <CardContent className="p-0">
                <div className="h-16 bg-primary/10" />
                <div className="px-4 pb-4">
                  <Avatar className="size-16 -mt-8 border-4 border-card">
                    <AvatarImage src="/professional-user.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-2 font-sans text-base font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Senior Product Manager</p>
                  <div className="mt-4 flex justify-between border-t pt-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Connections</p>
                      <p className="font-semibold">583</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Views</p>
                      <p className="font-semibold">1,247</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Feed */}
          <section className="space-y-4 col-span-12 md:col-span-6">
            {/* Post Creation Box */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="/professional-user.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Textarea
                      placeholder="Share your thoughts or updates..."
                      className="min-h-[80px] resize-none"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />

                    {selectedImage && (
                      <div className="relative mt-2">
                        <img src={selectedImage} alt="Preview" className="max-h-60 rounded-md object-cover" />
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute right-2 top-2 size-6 rounded-full"
                          onClick={() => setSelectedImage(null)}
                        >
                          <X className="size-3" />
                        </Button>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleImageSelect}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-primary"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <ImageIcon className="size-5" />
                        </Button>
                      </div>
                      <Button onClick={handleCreatePost} disabled={!newPostContent.trim() && !selectedImage}>
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feed Posts */}
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-sans text-sm font-semibold">{post.author}</h4>
                      <p className="text-xs text-muted-foreground">
                        {post.role} • {post.timeAgo}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pb-3">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>

                  {post.image && (
                    <div className="mt-3 overflow-hidden rounded-md">
                      <img src={post.image} alt="Post content" className="w-full object-cover" />
                    </div>
                  )}

                  <div className="flex items-center gap-6 border-t pt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`gap-2 ${post.isLiked ? "text-primary" : ""}`}
                      onClick={() => toggleLike(post.id)}
                    >
                      <ThumbsUp className={`size-4 ${post.isLiked ? "fill-current" : ""}`} />
                      <span className="text-xs">
                        {post.likes} {post.likes === 1 ? "Like" : "Likes"}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                      onClick={() => toggleComments(post.id)}
                    >
                      <MessageCircle className="size-4" />
                      <span className="text-xs">{post.comments.length > 0 ? `${post.comments.length} Comments` : "Comment"}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Share2 className="size-4" />
                      <span className="text-xs">Share</span>
                    </Button>
                  </div>

                  {/* Comment Section */}
                  {post.isCommentsOpen && (
                    <div className="space-y-4 pt-3">
                      <div className="flex gap-3">
                        <Avatar className="size-8">
                          <AvatarImage src="/professional-user.png" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <Input
                            placeholder="Add a comment..."
                            className="h-9"
                            value={commentDrafts[post.id] || ""}
                            onChange={(e) => handleCommentChange(post.id, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                submitComment(post.id);
                              }
                            }}
                          />
                          {commentDrafts[post.id] && (
                            <div className="flex justify-end">
                              <Button size="sm" onClick={() => submitComment(post.id)}>Post</Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Recent Comments */}
                      {post.comments.length > 0 && (
                        <div className="space-y-4 pl-11">
                          {post.comments.slice(0, 3).map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="size-8 mt-1">
                                <AvatarImage src={comment.avatar} />
                                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 rounded-lg bg-muted/50 p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-sans text-sm font-semibold">{comment.author}</h4>
                                  <span className="text-xs text-muted-foreground">• {comment.timestamp}</span>
                                </div>
                                <p className="text-sm">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Right Sidebar - Hidden on mobile */}
          <aside className="hidden md:block md:col-span-3 space-y-4">
            {/* Trending Courses */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-primary" />
                  <h3 className="font-sans text-sm font-semibold">Trending Courses</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-4">
                {["Advanced TypeScript", "System Design", "AWS Solutions Architect"].map((course) => (
                  <button key={course} className="block w-full rounded p-2 text-left transition-colors hover:bg-accent">
                    <p className="font-sans text-sm font-medium">{course}</p>
                    <p className="text-xs text-muted-foreground">2,345 enrolled</p>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Featured Jobs */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="size-4 text-primary" />
                  <h3 className="font-sans text-sm font-semibold">Featured Jobs</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-4">
                {["Senior Frontend Developer", "Product Manager", "UX Researcher"].map((job) => (
                  <button key={job} className="block w-full rounded p-2 text-left transition-colors hover:bg-accent">
                    <p className="font-sans text-sm font-medium">{job}</p>
                    <p className="text-xs text-muted-foreground">Tech Company • Remote</p>
                  </button>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}

