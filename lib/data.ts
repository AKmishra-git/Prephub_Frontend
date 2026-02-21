import {
  Code2,
  Boxes,
  Network,
  Cpu,
  Database,
} from "lucide-react"

export const subjects = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Master arrays, trees, graphs, dynamic programming, and more.",
    icon: Code2,
    color: "from-indigo-500 to-blue-500",
    href: "/subject/dsa",
  },
  {
    id: "oops",
    title: "OOPs",
    description: "Object-Oriented Programming concepts, principles, and design patterns.",
    icon: Boxes,
    color: "from-emerald-500 to-teal-500",
    href: "/videos/oops",
  },
  {
    id: "cn",
    title: "Computer Networks",
    description: "Networking fundamentals, protocols, OSI model, and more.",
    icon: Network,
    color: "from-orange-500 to-amber-500",
    href: "/videos/cn",
  },
  {
    id: "os",
    title: "Operating Systems",
    description: "Process management, memory, scheduling, and system concepts.",
    icon: Cpu,
    color: "from-rose-500 to-pink-500",
    href: "/videos/os",
  },
  {
    id: "dbms",
    title: "Database Management System",
    description: "SQL, normalization, transactions, indexing, and database design.",
    icon: Database,
    color: "from-cyan-500 to-sky-500",
    href: "/videos/dbms",
  },
]

export const dsaTopics = [
  { id: "arrays", title: "Arrays & Strings", description: "Basic Root for Learning Data Structures and Algorithms." },
  { id: "sliding-window", title: "Sliding Window", description: "How to use if a question on subarray and subsequence is given." },
  { id: "linked-list", title: "Linked List", description: "Dynamic linear data structure with nodes." },
  { id: "stacks", title: "Stacks", description: "LIFO data structure for managing data." },
  { id: "queues", title: "Queues", description: "FIFO data structure for ordering elements." },
  { id: "trees", title: "Trees", description: "Hierarchical data structure with nodes." },
  { id: "graphs", title: "Graphs", description: "Non-linear structure of nodes and edges." },
  { id: "dynamic-programming", title: "Dynamic Programming", description: "Optimization technique using subproblems." },
  { id: "sorting", title: "Sorting Algorithms", description: "Techniques to arrange data in order." },
  { id: "searching", title: "Searching Algorithms", description: "Methods to find elements efficiently." },
  { id: "recursion", title: "Recursion & Backtracking", description: "Self-referencing problem solving approach." },
  { id: "hashing", title: "Hashing", description: "Key-value mapping for fast lookups." },
]

// Video data structure - add your videos here
// Each subject/topic has an array of video objects
// Video format: { id: string, title: string, url: string, duration?: string }

export type Video = {
  id: string
  title: string
  url: string
  duration?: string
}

export const videos: Record<string, Video[]> = {
  // OOPs videos - add your videos here
  oops: [],

  // DBMS videos - add your videos here
  dbms: [],

  // Computer Networks videos - add your videos here
  cn: [],

  // Operating Systems videos - add your videos here
  os: [],

  // DSA topic videos - add your videos here using topic id as key
  // e.g. "arrays": [{ id: "1", title: "Array Basics", url: "https://...", duration: "15:30" }]
  arrays: [],
  strings: [],
  "linked-list": [],
  stacks: [],
  queues: [],
  trees: [],
  graphs: [],
  "dynamic-programming": [],
  sorting: [],
  searching: [],
  recursion: [],
  hashing: [],
}
