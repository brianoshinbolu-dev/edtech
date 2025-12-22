module.exports = [
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[project]/alfanomeric/edtech/lib/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"000655209d7763d01846cd92fea402c071b1c2e726":"getPosts","004d4e121f5de9e9c0958f3beee983e1d7681eda3d":"getStudents","00af6a473e9f228f624ac90baaecf353871b19dbea":"getCourses","00bf4c5d7712ba942725b5e0bdc3817c23e31e80f7":"getCandidates","00db1f284a0bb12e219e5277ed1e0d935d608777d3":"getInstructorStats","401655876911f1ccef31f826ebb8cbfec74d5e93ce":"togglePostLike","4031591e1eb0bfa952c4baedbf265973504d7efc1e":"getReviews","4032fb8ca94b0bef21849946df250bac036d0a63b1":"deleteCourse","40bcf95142b8d44ceabc1120167e35eab78f6e9ce0":"getCourse","40dde1a3d7af8dfedf870fa42018fa5245cb1536dd":"createCourse","606924a9bd73d44b7848e2f49a832ee4a193b00dde":"updateCandidateStatus","6077ebe292ecbf31624ec70f97599feb9347873488":"updateCourse","60ac036fea18aa9c8d8c80eb86d45c06158dbc8233":"addPostComment","60c0abcef481c0b400f35e7d156fbc5e4bdffb7cd6":"createPost","60c31389dec298a8f8a62c15408971634b9dac2fc4":"updateCourseCurriculum"},"",""] */ __turbopack_context__.s([
    "addPostComment",
    ()=>addPostComment,
    "createCourse",
    ()=>createCourse,
    "createPost",
    ()=>createPost,
    "deleteCourse",
    ()=>deleteCourse,
    "getCandidates",
    ()=>getCandidates,
    "getCourse",
    ()=>getCourse,
    "getCourses",
    ()=>getCourses,
    "getInstructorStats",
    ()=>getInstructorStats,
    "getPosts",
    ()=>getPosts,
    "getReviews",
    ()=>getReviews,
    "getStudents",
    ()=>getStudents,
    "togglePostLike",
    ()=>togglePostLike,
    "updateCandidateStatus",
    ()=>updateCandidateStatus,
    "updateCourse",
    ()=>updateCourse,
    "updateCourseCurriculum",
    ()=>updateCourseCurriculum
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/alfanomeric/edtech/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/alfanomeric/edtech/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
const DB_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "lib", "data.json");
// --- Helper Functions ---
async function readDb() {
    try {
        const data = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(DB_PATH, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading database:", error);
        return {
            posts: [],
            candidates: [],
            courses: []
        };
    }
}
async function writeDb(data) {
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(DB_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing to database:", error);
    }
}
async function getPosts() {
    const db = await readDb();
    return db.posts || [];
}
async function createPost(content, image) {
    const db = await readDb();
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
        isCommentsOpen: false
    };
    db.posts = [
        newPost,
        ...db.posts
    ];
    await writeDb(db);
    return newPost;
}
async function togglePostLike(postId) {
    const db = await readDb();
    db.posts = db.posts.map((post)=>{
        if (post.id === postId) {
            return {
                ...post,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                isLiked: !post.isLiked
            };
        }
        return post;
    });
    await writeDb(db);
    return db.posts;
}
async function addPostComment(postId, content) {
    const db = await readDb();
    const newComment = {
        id: Date.now(),
        author: "John Doe",
        content,
        avatar: "/professional-user.png",
        timestamp: "Just now"
    };
    db.posts = db.posts.map((post)=>{
        if (post.id === postId) {
            return {
                ...post,
                comments: [
                    newComment,
                    ...post.comments
                ]
            };
        }
        return post;
    });
    await writeDb(db);
    return db.posts;
}
async function getCandidates() {
    const db = await readDb();
    return db.candidates || [];
}
async function updateCandidateStatus(candidateId, newStatus) {
    const db = await readDb();
    db.candidates = db.candidates.map((c)=>c.id === candidateId ? {
            ...c,
            status: newStatus
        } : c);
    await writeDb(db);
    return db.candidates;
}
async function getCourses() {
    const db = await readDb();
    return db.courses || [];
}
async function getInstructorStats() {
    const db = await readDb();
    const publishedCourses = db.courses.filter((c)=>c.status === 'published').length;
    const totalStudents = db.courses.reduce((acc, c)=>acc + (c.students || 0), 0);
    return {
        ...db.instructor,
        totalCourses: db.courses.length,
        publishedCourses,
        totalStudents
    };
}
async function createCourse(courseData) {
    const db = await readDb();
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
        lastUpdated: new Date().toLocaleDateString('en-US', {
            month: '2-digit',
            year: 'numeric'
        }),
        curriculum: []
    };
    db.courses.push(newCourse);
    await writeDb(db);
    return newCourse;
}
async function updateCourse(courseId, updates) {
    const db = await readDb();
    const index = db.courses.findIndex((c)=>c.id.toString() === courseId.toString());
    if (index === -1) {
        throw new Error("Course not found");
    }
    db.courses[index] = {
        ...db.courses[index],
        ...updates,
        lastUpdated: new Date().toLocaleDateString('en-US', {
            month: '2-digit',
            year: 'numeric'
        })
    };
    await writeDb(db);
    return db.courses[index];
}
async function deleteCourse(courseId) {
    const db = await readDb();
    db.courses = db.courses.filter((c)=>c.id.toString() !== courseId.toString());
    await writeDb(db);
    return {
        success: true
    };
}
async function getCourse(courseId) {
    const db = await readDb();
    return db.courses.find((c)=>c.id.toString() === courseId.toString());
}
async function getStudents() {
    const db = await readDb();
    return db.students || [];
}
async function getReviews(courseId) {
    const db = await readDb();
    if (courseId) {
        return db.reviews.filter((r)=>r.courseId.toString() === courseId.toString()) || [];
    }
    return db.reviews || [];
}
async function updateCourseCurriculum(courseId, sections) {
    const db = await readDb();
    const index = db.courses.findIndex((c)=>c.id.toString() === courseId.toString());
    if (index === -1) {
        throw new Error("Course not found");
    }
    db.courses[index].sections = sections;
    db.courses[index].lastUpdated = new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        year: 'numeric'
    });
    await writeDb(db);
    return db.courses[index];
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getPosts,
    createPost,
    togglePostLike,
    addPostComment,
    getCandidates,
    updateCandidateStatus,
    getCourses,
    getInstructorStats,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourse,
    getStudents,
    getReviews,
    updateCourseCurriculum
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPosts, "000655209d7763d01846cd92fea402c071b1c2e726", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPost, "60c0abcef481c0b400f35e7d156fbc5e4bdffb7cd6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePostLike, "401655876911f1ccef31f826ebb8cbfec74d5e93ce", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addPostComment, "60ac036fea18aa9c8d8c80eb86d45c06158dbc8233", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCandidates, "00bf4c5d7712ba942725b5e0bdc3817c23e31e80f7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateCandidateStatus, "606924a9bd73d44b7848e2f49a832ee4a193b00dde", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCourses, "00af6a473e9f228f624ac90baaecf353871b19dbea", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getInstructorStats, "00db1f284a0bb12e219e5277ed1e0d935d608777d3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCourse, "40dde1a3d7af8dfedf870fa42018fa5245cb1536dd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateCourse, "6077ebe292ecbf31624ec70f97599feb9347873488", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCourse, "4032fb8ca94b0bef21849946df250bac036d0a63b1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCourse, "40bcf95142b8d44ceabc1120167e35eab78f6e9ce0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudents, "004d4e121f5de9e9c0958f3beee983e1d7681eda3d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getReviews, "4031591e1eb0bfa952c4baedbf265973504d7efc1e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateCourseCurriculum, "60c31389dec298a8f8a62c15408971634b9dac2fc4", null);
}),
"[project]/alfanomeric/edtech/.next-internal/server/app/learning/course/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/alfanomeric/edtech/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/alfanomeric/edtech/lib/actions.ts [app-rsc] (ecmascript)");
;
}),
"[project]/alfanomeric/edtech/.next-internal/server/app/learning/course/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/alfanomeric/edtech/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00af6a473e9f228f624ac90baaecf353871b19dbea",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCourses"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f2e$next$2d$internal$2f$server$2f$app$2f$learning$2f$course$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$alfanomeric$2f$edtech$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/alfanomeric/edtech/.next-internal/server/app/learning/course/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/alfanomeric/edtech/lib/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$alfanomeric$2f$edtech$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/alfanomeric/edtech/lib/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/alfanomeric/edtech/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/alfanomeric/edtech/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/alfanomeric/edtech/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ebcc7726._.js.map