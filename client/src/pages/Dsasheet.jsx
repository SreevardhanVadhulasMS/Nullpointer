import { useState, useEffect } from "react";
import HomeNavbar from "../components/HomeNavbar";
import "./DSASheet.css";

const TOPICS = [
  {
    id: "arrays1", label: "Arrays", color: "#e07a5f",
    problems: [
      { id: 1,  title: "Set Matrix Zeroes",                       difficulty: "Medium", url: "https://leetcode.com/problems/set-matrix-zeroes/" },
      { id: 2,  title: "Pascal's Triangle",                       difficulty: "Easy",   url: "https://leetcode.com/problems/pascals-triangle/" },
      { id: 3,  title: "Next Permutation",                        difficulty: "Medium", url: "https://leetcode.com/problems/next-permutation/" },
      { id: 4,  title: "Kadane's Algorithm (Max Subarray)",       difficulty: "Medium", url: "https://leetcode.com/problems/maximum-subarray/" },
      { id: 5,  title: "Sort Colors (0s, 1s, 2s)",               difficulty: "Medium", url: "https://leetcode.com/problems/sort-colors/" },
      { id: 6,  title: "Best Time to Buy and Sell Stock",         difficulty: "Easy",   url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
    ],
  },
  {
    id: "arrays2", label: "Arrays Part-II", color: "#e07a5f",
    problems: [
      { id: 7,  title: "Rotate Image (Matrix 90°)",               difficulty: "Medium", url: "https://leetcode.com/problems/rotate-image/" },
      { id: 8,  title: "Merge Intervals",                         difficulty: "Medium", url: "https://leetcode.com/problems/merge-intervals/" },
      { id: 9,  title: "Merge Sorted Array",                      difficulty: "Easy",   url: "https://leetcode.com/problems/merge-sorted-array/" },
      { id: 10, title: "Find the Duplicate Number",               difficulty: "Medium", url: "https://leetcode.com/problems/find-the-duplicate-number/" },
      { id: 11, title: "Find All Disappeared Numbers in Array",   difficulty: "Easy",   url: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/" },
      { id: 12, title: "Count Inversions (Merge Sort)",           difficulty: "Hard",   url: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/" },
    ],
  },
  {
    id: "arrays3", label: "Arrays Part-III", color: "#e07a5f",
    problems: [
      { id: 13, title: "Search a 2D Matrix",                      difficulty: "Medium", url: "https://leetcode.com/problems/search-a-2d-matrix/" },
      { id: 14, title: "Pow(x, n)",                               difficulty: "Medium", url: "https://leetcode.com/problems/powx-n/" },
      { id: 15, title: "Majority Element (> n/2)",                difficulty: "Easy",   url: "https://leetcode.com/problems/majority-element/" },
      { id: 16, title: "Majority Element II (> n/3)",             difficulty: "Medium", url: "https://leetcode.com/problems/majority-element-ii/" },
      { id: 17, title: "Unique Paths",                            difficulty: "Medium", url: "https://leetcode.com/problems/unique-paths/" },
      { id: 18, title: "Reverse Pairs",                           difficulty: "Hard",   url: "https://leetcode.com/problems/reverse-pairs/" },
    ],
  },
  {
    id: "arrays4", label: "Arrays Part-IV", color: "#e07a5f",
    problems: [
      { id: 19, title: "Two Sum",                                 difficulty: "Easy",   url: "https://leetcode.com/problems/two-sum/" },
      { id: 20, title: "4Sum",                                    difficulty: "Medium", url: "https://leetcode.com/problems/4sum/" },
      { id: 21, title: "Longest Consecutive Sequence",            difficulty: "Medium", url: "https://leetcode.com/problems/longest-consecutive-sequence/" },
      { id: 22, title: "Subarray Sum Equals K",                   difficulty: "Medium", url: "https://leetcode.com/problems/subarray-sum-equals-k/" },
      { id: 23, title: "Count Subarrays with XOR = K",            difficulty: "Hard",   url: "https://www.geeksforgeeks.org/count-number-subarrays-given-xor/" },
      { id: 24, title: "Longest Substring Without Repeating",     difficulty: "Medium", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    ],
  },
  {
    id: "ll1", label: "Linked List", color: "#81b29a",
    problems: [
      { id: 25, title: "Reverse Linked List",                     difficulty: "Easy",   url: "https://leetcode.com/problems/reverse-linked-list/" },
      { id: 26, title: "Middle of the Linked List",               difficulty: "Easy",   url: "https://leetcode.com/problems/middle-of-the-linked-list/" },
      { id: 27, title: "Merge Two Sorted Lists",                  difficulty: "Easy",   url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
      { id: 28, title: "Remove Nth Node From End",                difficulty: "Medium", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
      { id: 29, title: "Add Two Numbers",                         difficulty: "Medium", url: "https://leetcode.com/problems/add-two-numbers/" },
      { id: 30, title: "Delete Node in a Linked List",            difficulty: "Medium", url: "https://leetcode.com/problems/delete-node-in-a-linked-list/" },
    ],
  },
  {
    id: "ll2", label: "Linked List Part-II", color: "#81b29a",
    problems: [
      { id: 31, title: "Intersection of Two Linked Lists",        difficulty: "Easy",   url: "https://leetcode.com/problems/intersection-of-two-linked-lists/" },
      { id: 32, title: "Linked List Cycle (Detect Loop)",         difficulty: "Easy",   url: "https://leetcode.com/problems/linked-list-cycle/" },
      { id: 33, title: "Reverse Nodes in k-Group",                difficulty: "Hard",   url: "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
      { id: 34, title: "Palindrome Linked List",                  difficulty: "Easy",   url: "https://leetcode.com/problems/palindrome-linked-list/" },
      { id: 35, title: "Linked List Cycle II (Start Point)",      difficulty: "Medium", url: "https://leetcode.com/problems/linked-list-cycle-ii/" },
      { id: 36, title: "Flatten a Multilevel Doubly LL",          difficulty: "Medium", url: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/" },
    ],
  },
  {
    id: "ll3", label: "Linked List & Arrays", color: "#81b29a",
    problems: [
      { id: 37, title: "Rotate List",                             difficulty: "Medium", url: "https://leetcode.com/problems/rotate-list/" },
      { id: 38, title: "Copy List with Random Pointer",           difficulty: "Medium", url: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
      { id: 39, title: "3Sum",                                    difficulty: "Medium", url: "https://leetcode.com/problems/3sum/" },
      { id: 40, title: "Trapping Rain Water",                     difficulty: "Hard",   url: "https://leetcode.com/problems/trapping-rain-water/" },
      { id: 41, title: "Remove Duplicates from Sorted Array",     difficulty: "Easy",   url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
      { id: 42, title: "Max Consecutive Ones",                    difficulty: "Easy",   url: "https://leetcode.com/problems/max-consecutive-ones/" },
    ],
  },
  {
    id: "greedy", label: "Greedy Algorithm", color: "#c9a96e",
    problems: [
      { id: 43, title: "N Meetings in One Room",                  difficulty: "Medium", url: "https://www.geeksforgeeks.org/n-meetings-in-one-room/" },
      { id: 44, title: "Minimum Platforms Required",              difficulty: "Medium", url: "https://www.geeksforgeeks.org/minimum-number-platforms-required-railraod-station/" },
      { id: 45, title: "Job Sequencing Problem",                  difficulty: "Medium", url: "https://www.geeksforgeeks.org/job-sequencing-problem/" },
      { id: 46, title: "Fractional Knapsack",                     difficulty: "Medium", url: "https://www.geeksforgeeks.org/fractional-knapsack-problem/" },
      { id: 47, title: "Coin Change (Minimum Coins)",             difficulty: "Medium", url: "https://leetcode.com/problems/coin-change/" },
      { id: 48, title: "Assign Cookies",                          difficulty: "Easy",   url: "https://leetcode.com/problems/assign-cookies/" },
    ],
  },
  {
    id: "recursion", label: "Recursion", color: "#a09bc9",
    problems: [
      { id: 49, title: "Subset Sums",                             difficulty: "Medium", url: "https://www.geeksforgeeks.org/subset-sum-problem/" },
      { id: 50, title: "Subsets II",                              difficulty: "Medium", url: "https://leetcode.com/problems/subsets-ii/" },
      { id: 51, title: "Combination Sum",                         difficulty: "Medium", url: "https://leetcode.com/problems/combination-sum/" },
      { id: 52, title: "Combination Sum II",                      difficulty: "Medium", url: "https://leetcode.com/problems/combination-sum-ii/" },
      { id: 53, title: "Palindrome Partitioning",                 difficulty: "Medium", url: "https://leetcode.com/problems/palindrome-partitioning/" },
      { id: 54, title: "Permutation Sequence",                    difficulty: "Hard",   url: "https://leetcode.com/problems/permutation-sequence/" },
    ],
  },
  {
    id: "backtrack", label: "Recursion & Backtracking", color: "#a09bc9",
    problems: [
      { id: 55, title: "Permutations",                            difficulty: "Medium", url: "https://leetcode.com/problems/permutations/" },
      { id: 56, title: "N-Queens",                                difficulty: "Hard",   url: "https://leetcode.com/problems/n-queens/" },
      { id: 57, title: "Sudoku Solver",                           difficulty: "Hard",   url: "https://leetcode.com/problems/sudoku-solver/" },
      { id: 58, title: "M Coloring Problem",                      difficulty: "Hard",   url: "https://www.geeksforgeeks.org/m-coloring-problem/" },
      { id: 59, title: "Rat in a Maze",                           difficulty: "Hard",   url: "https://www.geeksforgeeks.org/rat-in-a-maze-backtracking-2/" },
      { id: 60, title: "Word Break II",                           difficulty: "Hard",   url: "https://leetcode.com/problems/word-break-ii/" },
    ],
  },
  {
    id: "bsearch", label: "Binary Search", color: "#5fb8c8",
    problems: [
      { id: 61, title: "Nth Root of an Integer",                  difficulty: "Medium", url: "https://www.geeksforgeeks.org/n-th-root-of-a-number/" },
      { id: 62, title: "Matrix Median",                           difficulty: "Hard",   url: "https://www.geeksforgeeks.org/find-median-row-wise-sorted-matrix/" },
      { id: 63, title: "Single Element in Sorted Array",          difficulty: "Medium", url: "https://leetcode.com/problems/single-element-in-a-sorted-array/" },
      { id: 64, title: "Search in Rotated Sorted Array",          difficulty: "Medium", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
      { id: 65, title: "Median of Two Sorted Arrays",             difficulty: "Hard",   url: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
      { id: 66, title: "Kth Element of Two Sorted Arrays",        difficulty: "Medium", url: "https://www.geeksforgeeks.org/k-th-element-two-sorted-arrays/" },
      { id: 67, title: "Allocate Minimum Number of Pages",        difficulty: "Hard",   url: "https://www.geeksforgeeks.org/allocate-minimum-number-pages/" },
      { id: 68, title: "Aggressive Cows",                         difficulty: "Hard",   url: "https://www.spoj.com/problems/AGGRCOW/" },
    ],
  },
  {
    id: "heaps", label: "Heaps", color: "#e07a5f",
    problems: [
      { id: 69, title: "Kth Largest Element in Array",            difficulty: "Medium", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
      { id: 70, title: "Maximum Sum Combinations",                difficulty: "Medium", url: "https://www.geeksforgeeks.org/k-maximum-sum-combinations-two-arrays/" },
      { id: 71, title: "Find Median from Data Stream",            difficulty: "Hard",   url: "https://leetcode.com/problems/find-median-from-data-stream/" },
      { id: 72, title: "Merge K Sorted Lists",                    difficulty: "Hard",   url: "https://leetcode.com/problems/merge-k-sorted-lists/" },
      { id: 73, title: "Merge K Sorted Arrays",                   difficulty: "Medium", url: "https://www.geeksforgeeks.org/merge-k-sorted-arrays/" },
      { id: 74, title: "Top K Frequent Elements",                 difficulty: "Medium", url: "https://leetcode.com/problems/top-k-frequent-elements/" },
    ],
  },
  {
    id: "sq1", label: "Stack & Queue", color: "#b07fd4",
    problems: [
      { id: 75, title: "Implement Stack using Queues",            difficulty: "Easy",   url: "https://leetcode.com/problems/implement-stack-using-queues/" },
      { id: 76, title: "Implement Queue using Stacks",            difficulty: "Easy",   url: "https://leetcode.com/problems/implement-queue-using-stacks/" },
      { id: 77, title: "Valid Parentheses",                       difficulty: "Easy",   url: "https://leetcode.com/problems/valid-parentheses/" },
      { id: 78, title: "Next Greater Element I",                  difficulty: "Easy",   url: "https://leetcode.com/problems/next-greater-element-i/" },
      { id: 79, title: "Sort a Stack",                            difficulty: "Medium", url: "https://www.geeksforgeeks.org/sort-a-stack-using-recursion/" },
      { id: 80, title: "Next Smaller Element",                    difficulty: "Medium", url: "https://www.geeksforgeeks.org/next-smaller-element/" },
      { id: 81, title: "LRU Cache",                               difficulty: "Medium", url: "https://leetcode.com/problems/lru-cache/" },
    ],
  },
  {
    id: "sq2", label: "Stack & Queue Part-II", color: "#b07fd4",
    problems: [
      { id: 82, title: "LFU Cache",                               difficulty: "Hard",   url: "https://leetcode.com/problems/lfu-cache/" },
      { id: 83, title: "Largest Rectangle in Histogram",          difficulty: "Hard",   url: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
      { id: 84, title: "Sliding Window Maximum",                  difficulty: "Hard",   url: "https://leetcode.com/problems/sliding-window-maximum/" },
      { id: 85, title: "Min Stack",                               difficulty: "Medium", url: "https://leetcode.com/problems/min-stack/" },
      { id: 86, title: "Rotting Oranges",                         difficulty: "Medium", url: "https://leetcode.com/problems/rotting-oranges/" },
      { id: 87, title: "Stock Span Problem",                      difficulty: "Medium", url: "https://leetcode.com/problems/online-stock-span/" },
      { id: 88, title: "Maximum of Minimums for Every Window",    difficulty: "Hard",   url: "https://www.geeksforgeeks.org/find-the-maximum-of-minimums-for-every-window-size-in-a-given-array/" },
      { id: 89, title: "Celebrity Problem",                       difficulty: "Medium", url: "https://www.geeksforgeeks.org/the-celebrity-problem/" },
    ],
  },
  {
    id: "str1", label: "Strings", color: "#6bba8c",
    problems: [
      { id: 90, title: "Reverse Words in a String",               difficulty: "Medium", url: "https://leetcode.com/problems/reverse-words-in-a-string/" },
      { id: 91, title: "Longest Palindromic Substring",           difficulty: "Medium", url: "https://leetcode.com/problems/longest-palindromic-substring/" },
      { id: 92, title: "Roman to Integer",                        difficulty: "Easy",   url: "https://leetcode.com/problems/roman-to-integer/" },
      { id: 93, title: "String to Integer (atoi)",                difficulty: "Medium", url: "https://leetcode.com/problems/string-to-integer-atoi/" },
      { id: 94, title: "Longest Common Prefix",                   difficulty: "Easy",   url: "https://leetcode.com/problems/longest-common-prefix/" },
      { id: 95, title: "Rabin-Karp Algorithm",                    difficulty: "Hard",   url: "https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/" },
    ],
  },
  {
    id: "str2", label: "Strings Part-II", color: "#6bba8c",
    problems: [
      { id: 96,  title: "Z-Algorithm",                            difficulty: "Hard",   url: "https://www.geeksforgeeks.org/z-algorithm-linear-time-pattern-searching-algorithm/" },
      { id: 97,  title: "KMP Algorithm / LPS Array",              difficulty: "Hard",   url: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/" },
      { id: 98,  title: "Minimum Insertions for Palindrome",      difficulty: "Hard",   url: "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/" },
      { id: 99,  title: "Valid Anagram",                          difficulty: "Easy",   url: "https://leetcode.com/problems/valid-anagram/" },
      { id: 100, title: "Count and Say",                          difficulty: "Medium", url: "https://leetcode.com/problems/count-and-say/" },
      { id: 101, title: "Compare Version Numbers",                difficulty: "Medium", url: "https://leetcode.com/problems/compare-version-numbers/" },
    ],
  },
  {
    id: "bt1", label: "Binary Tree", color: "#c9a96e",
    problems: [
      { id: 102, title: "Binary Tree Inorder Traversal",          difficulty: "Easy",   url: "https://leetcode.com/problems/binary-tree-inorder-traversal/" },
      { id: 103, title: "Binary Tree Preorder Traversal",         difficulty: "Easy",   url: "https://leetcode.com/problems/binary-tree-preorder-traversal/" },
      { id: 104, title: "Binary Tree Postorder Traversal",        difficulty: "Easy",   url: "https://leetcode.com/problems/binary-tree-postorder-traversal/" },
      { id: 105, title: "Morris Inorder Traversal",               difficulty: "Medium", url: "https://leetcode.com/problems/binary-tree-inorder-traversal/" },
      { id: 106, title: "Binary Tree Right Side View",            difficulty: "Medium", url: "https://leetcode.com/problems/binary-tree-right-side-view/" },
      { id: 107, title: "Bottom View of Binary Tree",             difficulty: "Medium", url: "https://www.geeksforgeeks.org/bottom-view-binary-tree/" },
      { id: 108, title: "Top View of Binary Tree",                difficulty: "Medium", url: "https://www.geeksforgeeks.org/print-nodes-top-view-binary-tree/" },
      { id: 109, title: "Vertical Order Traversal",               difficulty: "Hard",   url: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/" },
      { id: 110, title: "Binary Tree Paths (Root to Leaf)",       difficulty: "Easy",   url: "https://leetcode.com/problems/binary-tree-paths/" },
      { id: 111, title: "Maximum Width of Binary Tree",           difficulty: "Medium", url: "https://leetcode.com/problems/maximum-width-of-binary-tree/" },
      { id: 112, title: "Count Good Nodes in Binary Tree",        difficulty: "Medium", url: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/" },
      { id: 113, title: "Binary Tree Level Order Traversal",      difficulty: "Medium", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
    ],
  },
  {
    id: "bt2", label: "Binary Tree Part-II", color: "#c9a96e",
    problems: [
      { id: 114, title: "Maximum Depth of Binary Tree",           difficulty: "Easy",   url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
      { id: 115, title: "Diameter of Binary Tree",                difficulty: "Easy",   url: "https://leetcode.com/problems/diameter-of-binary-tree/" },
      { id: 116, title: "Balanced Binary Tree",                   difficulty: "Easy",   url: "https://leetcode.com/problems/balanced-binary-tree/" },
      { id: 117, title: "Lowest Common Ancestor of BT",          difficulty: "Medium", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/" },
      { id: 118, title: "Same Tree",                              difficulty: "Easy",   url: "https://leetcode.com/problems/same-tree/" },
      { id: 119, title: "Binary Tree Zigzag Level Order",         difficulty: "Medium", url: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/" },
      { id: 120, title: "Boundary of Binary Tree",                difficulty: "Medium", url: "https://leetcode.com/problems/boundary-of-binary-tree/" },
      { id: 121, title: "Symmetric Tree",                         difficulty: "Easy",   url: "https://leetcode.com/problems/symmetric-tree/" },
    ],
  },
  {
    id: "bt3", label: "Binary Tree Part-III", color: "#c9a96e",
    problems: [
      { id: 122, title: "Binary Tree Maximum Path Sum",           difficulty: "Hard",   url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
      { id: 123, title: "Construct BT from Preorder & Inorder",  difficulty: "Medium", url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
      { id: 124, title: "Construct BT from Postorder & Inorder", difficulty: "Medium", url: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/" },
      { id: 125, title: "Flatten Binary Tree to Linked List",     difficulty: "Medium", url: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/" },
      { id: 126, title: "Check for Children Sum Property",        difficulty: "Medium", url: "https://www.geeksforgeeks.org/check-for-children-sum-property-in-a-binary-tree/" },
      { id: 127, title: "Populating Next Right Pointers",         difficulty: "Medium", url: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/" },
    ],
  },
  {
    id: "bst1", label: "Binary Search Tree", color: "#5fb8c8",
    problems: [
      { id: 128, title: "Search in BST",                          difficulty: "Easy",   url: "https://leetcode.com/problems/search-in-a-binary-search-tree/" },
      { id: 129, title: "Construct BST from Preorder",            difficulty: "Medium", url: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/" },
      { id: 130, title: "Validate Binary Search Tree",            difficulty: "Medium", url: "https://leetcode.com/problems/validate-binary-search-tree/" },
      { id: 131, title: "Lowest Common Ancestor of BST",         difficulty: "Medium", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
      { id: 132, title: "Inorder Successor in BST",              difficulty: "Medium", url: "https://leetcode.com/problems/inorder-successor-in-bst/" },
      { id: 133, title: "Floor in BST",                           difficulty: "Easy",   url: "https://www.geeksforgeeks.org/floor-in-binary-search-tree-bst/" },
      { id: 134, title: "Ceil in BST",                            difficulty: "Easy",   url: "https://www.geeksforgeeks.org/ceil-in-binary-search-tree-bst/" },
    ],
  },
  {
    id: "bst2", label: "BST Part-II", color: "#5fb8c8",
    problems: [
      { id: 135, title: "Kth Smallest in BST",                    difficulty: "Medium", url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
      { id: 136, title: "Two Sum in BST",                         difficulty: "Easy",   url: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/" },
      { id: 137, title: "BST Iterator",                           difficulty: "Medium", url: "https://leetcode.com/problems/binary-search-tree-iterator/" },
      { id: 138, title: "Largest BST in Binary Tree",             difficulty: "Medium", url: "https://www.geeksforgeeks.org/find-the-largest-subtree-in-a-tree-that-is-also-a-bst/" },
      { id: 139, title: "Serialize and Deserialize Binary Tree",  difficulty: "Hard",   url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
      { id: 140, title: "Recover BST",                            difficulty: "Medium", url: "https://leetcode.com/problems/recover-binary-search-tree/" },
    ],
  },
  {
    id: "graph1", label: "Graphs", color: "#81b29a",
    problems: [
      { id: 141, title: "Clone Graph",                            difficulty: "Medium", url: "https://leetcode.com/problems/clone-graph/" },
      { id: 142, title: "Number of Islands",                      difficulty: "Medium", url: "https://leetcode.com/problems/number-of-islands/" },
      { id: 143, title: "Flood Fill",                             difficulty: "Easy",   url: "https://leetcode.com/problems/flood-fill/" },
      { id: 144, title: "Detect Cycle in Undirected Graph (BFS)", difficulty: "Medium", url: "https://www.geeksforgeeks.org/detect-cycle-undirected-graph/" },
      { id: 145, title: "Detect Cycle in Undirected Graph (DFS)", difficulty: "Medium", url: "https://www.geeksforgeeks.org/detect-cycle-undirected-graph/" },
      { id: 146, title: "Detect Cycle in Directed Graph (DFS)",   difficulty: "Medium", url: "https://www.geeksforgeeks.org/detect-cycle-in-a-graph/" },
      { id: 147, title: "Topological Sort (BFS / Kahn's)",        difficulty: "Medium", url: "https://www.geeksforgeeks.org/topological-sorting-indegree-based-solution/" },
      { id: 148, title: "Topological Sort (DFS)",                 difficulty: "Medium", url: "https://www.geeksforgeeks.org/topological-sorting/" },
      { id: 149, title: "Bipartite Graph (BFS)",                  difficulty: "Medium", url: "https://leetcode.com/problems/is-graph-bipartite/" },
      { id: 150, title: "Bipartite Graph (DFS)",                  difficulty: "Medium", url: "https://leetcode.com/problems/is-graph-bipartite/" },
      { id: 151, title: "Strongly Connected Components (Kosaraju)","difficulty": "Hard", url: "https://www.geeksforgeeks.org/strongly-connected-components/" },
      { id: 152, title: "Dijkstra's Algorithm",                   difficulty: "Medium", url: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/" },
    ],
  },
  {
    id: "graph2", label: "Graphs Part-II", color: "#81b29a",
    problems: [
      { id: 153, title: "Bellman-Ford Algorithm",                 difficulty: "Medium", url: "https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/" },
      { id: 154, title: "Floyd-Warshall Algorithm",               difficulty: "Hard",   url: "https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/" },
      { id: 155, title: "MST using Prim's Algorithm",             difficulty: "Medium", url: "https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/" },
      { id: 156, title: "MST using Kruskal's Algorithm",          difficulty: "Medium", url: "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/" },
      { id: 157, title: "Course Schedule (Cycle in DAG)",         difficulty: "Medium", url: "https://leetcode.com/problems/course-schedule/" },
      { id: 158, title: "Word Ladder",                            difficulty: "Hard",   url: "https://leetcode.com/problems/word-ladder/" },
    ],
  },
  {
    id: "dp1", label: "Dynamic Programming", color: "#e07a5f",
    problems: [
      { id: 159, title: "Maximum Product Subarray",               difficulty: "Medium", url: "https://leetcode.com/problems/maximum-product-subarray/" },
      { id: 160, title: "Longest Increasing Subsequence",         difficulty: "Medium", url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
      { id: 161, title: "Longest Common Subsequence",             difficulty: "Medium", url: "https://leetcode.com/problems/longest-common-subsequence/" },
      { id: 162, title: "0/1 Knapsack",                           difficulty: "Medium", url: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/" },
      { id: 163, title: "Edit Distance",                          difficulty: "Medium", url: "https://leetcode.com/problems/edit-distance/" },
      { id: 164, title: "Maximum Sum Increasing Subsequence",     difficulty: "Medium", url: "https://www.geeksforgeeks.org/maximum-sum-increasing-subsequence-dp-14/" },
      { id: 165, title: "Matrix Chain Multiplication",            difficulty: "Hard",   url: "https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/" },
    ],
  },
  {
    id: "dp2", label: "Dynamic Programming Part-II", color: "#e07a5f",
    problems: [
      { id: 166, title: "Minimum Path Sum in Matrix",             difficulty: "Medium", url: "https://leetcode.com/problems/minimum-path-sum/" },
      { id: 167, title: "Coin Change II",                         difficulty: "Medium", url: "https://leetcode.com/problems/coin-change-ii/" },
      { id: 168, title: "Subset Sum Equal to Target",             difficulty: "Medium", url: "https://www.geeksforgeeks.org/subset-sum-problem-dp-25/" },
      { id: 169, title: "Rod Cutting Problem",                    difficulty: "Medium", url: "https://www.geeksforgeeks.org/cutting-a-rod-dp-13/" },
      { id: 170, title: "Super Egg Drop",                         difficulty: "Hard",   url: "https://leetcode.com/problems/super-egg-drop/" },
      { id: 171, title: "Word Break",                             difficulty: "Medium", url: "https://leetcode.com/problems/word-break/" },
      { id: 172, title: "Palindrome Partitioning II (MCM)",       difficulty: "Hard",   url: "https://leetcode.com/problems/palindrome-partitioning-ii/" },
      { id: 173, title: "Maximum Profit in Job Scheduling",       difficulty: "Hard",   url: "https://leetcode.com/problems/maximum-profit-in-job-scheduling/" },
    ],
  },
  {
    id: "trie", label: "Trie", color: "#b07fd4",
    problems: [
      { id: 174, title: "Implement Trie (Prefix Tree)",           difficulty: "Medium", url: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
      { id: 175, title: "Longest Word with All Prefixes",         difficulty: "Medium", url: "https://leetcode.com/problems/longest-word-in-dictionary/" },
      { id: 176, title: "Number of Distinct Substrings",          difficulty: "Medium", url: "https://www.geeksforgeeks.org/count-distinct-substrings-string-using-suffix-trie/" },
      { id: 177, title: "Power Set",                              difficulty: "Medium", url: "https://leetcode.com/problems/subsets/" },
      { id: 178, title: "Maximum XOR of Two Numbers",             difficulty: "Medium", url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/" },
      { id: 179, title: "Maximum XOR with Element from Array",    difficulty: "Hard",   url: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/" },
    ],
  },
];

const DIFF_COLOR = { Easy: "#81b29a", Medium: "#c9a96e", Hard: "#e07a5f" };

const totalProblems = TOPICS.reduce((a, t) => a + t.problems.length, 0);

export default function DSASheet() {
  const [solved, setSolved]       = useState(() => {
    try { return JSON.parse(localStorage.getItem("dsa_solved") || "{}"); } catch { return {}; }
  });
  const [collapsed, setCollapsed] = useState({});
  const [filter, setFilter]       = useState("all");   // all | easy | medium | hard
  const [search, setSearch]       = useState("");

  useEffect(() => {
    localStorage.setItem("dsa_solved", JSON.stringify(solved));
  }, [solved]);

  const toggle = (id) => setSolved(p => ({ ...p, [id]: !p[id] }));
  const toggleTopic = (id) => setCollapsed(p => ({ ...p, [id]: !p[id] }));

  const solvedCount = Object.values(solved).filter(Boolean).length;
  const pct = Math.round((solvedCount / totalProblems) * 100);

  const easyTotal   = TOPICS.flatMap(t => t.problems).filter(p => p.difficulty === "Easy").length;
  const medTotal    = TOPICS.flatMap(t => t.problems).filter(p => p.difficulty === "Medium").length;
  const hardTotal   = TOPICS.flatMap(t => t.problems).filter(p => p.difficulty === "Hard").length;
  const easySolved  = TOPICS.flatMap(t => t.problems).filter(p => p.difficulty === "Easy"   && solved[p.id]).length;
  const medSolved   = TOPICS.flatMap(t => t.problems).filter(p => p.difficulty === "Medium" && solved[p.id]).length;
  const hardSolved  = TOPICS.flatMap(t => t.problems).filter(p => p.difficulty === "Hard"   && solved[p.id]).length;

  const visibleTopics = TOPICS.map(topic => ({
    ...topic,
    problems: topic.problems.filter(p => {
      const matchDiff   = filter === "all" || p.difficulty.toLowerCase() === filter;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      return matchDiff && matchSearch;
    }),
  })).filter(t => t.problems.length > 0);

  return (
    <>
      <HomeNavbar />
      <div className="dsa-page">

        {/* ── PROGRESS BAR ── */}
        <div className="progress-card">
          <div className="progress-left">
            <div className="progress-ring-wrap">
              <svg viewBox="0 0 64 64" className="progress-ring">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#222" strokeWidth="6" />
                <circle cx="32" cy="32" r="28" fill="none" stroke="#e07a5f" strokeWidth="6"
                  strokeDasharray={`${pct * 1.759} 175.9`}
                  strokeLinecap="round"
                  transform="rotate(-90 32 32)" />
              </svg>
              <span className="ring-pct">{pct}%</span>
            </div>
            <div>
              <div className="prog-label">Overall Progress</div>
              <div className="prog-count"><strong>{solvedCount}</strong> / {totalProblems}</div>
            </div>
          </div>
          <div className="progress-right">
            <div className="diff-stat">
              <span className="diff-dot" style={{ background: "#81b29a" }} />
              Easy <strong>{easySolved}/{easyTotal}</strong>
            </div>
            <div className="diff-stat">
              <span className="diff-dot" style={{ background: "#c9a96e" }} />
              Medium <strong>{medSolved}/{medTotal}</strong>
            </div>
            <div className="diff-stat">
              <span className="diff-dot" style={{ background: "#e07a5f" }} />
              Hard <strong>{hardSolved}/{hardTotal}</strong>
            </div>
          </div>
        </div>

        {/* ── FILTERS ── */}
        <div className="filters-row">
          <div className="search-wrap">
            <i className="ri-search-line" />
            <input
              className="search-input"
              placeholder="Search problems..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-pills">
            {["all","easy","medium","hard"].map(f => (
              <button
                key={f}
                className={`fpill ${filter === f ? "active" : ""}`}
                style={ filter === f && f !== "all" ? { borderColor: DIFF_COLOR[f.charAt(0).toUpperCase()+f.slice(1)], color: DIFF_COLOR[f.charAt(0).toUpperCase()+f.slice(1)] } : {} }
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* ── TOPIC SECTIONS ── */}
        {visibleTopics.map(topic => {
          const topicSolved = topic.problems.filter(p => solved[p.id]).length;
          const topicPct    = Math.round((topicSolved / topic.problems.length) * 100);
          const isOpen      = !collapsed[topic.id];

          return (
            <div className="topic-block" key={topic.id}>
              {/* Topic header */}
              <div className="topic-head" onClick={() => toggleTopic(topic.id)}>
                <div className="topic-head-left">
                  <i className={`ri-arrow-${isOpen ? "down" : "right"}-s-line topic-chevron`} />
                  <span className="topic-name" style={{ color: topic.color }}>{topic.label}</span>
                </div>
                <div className="topic-head-right">
                  <div className="topic-progress-bar">
                    <div className="topic-progress-fill"
                      style={{ width: `${topicPct}%`, background: topic.color }} />
                  </div>
                  <span className="topic-fraction">{topicSolved} / {topic.problems.length}</span>
                </div>
              </div>

              {/* Problem table */}
              {isOpen && (
                <div className="problem-table">
                  <div className="table-head">
                    <span>Status</span>
                    <span>Problem</span>
                    <span>Difficulty</span>
                  </div>
                  {topic.problems.map((prob, i) => (
                    <div
                      key={prob.id}
                      className={`problem-row ${solved[prob.id] ? "solved" : ""}`}
                      style={{ animationDelay: `${i * 0.04}s` }}
                    >
                      {/* Checkbox */}
                      <span
                        className={`check-box ${solved[prob.id] ? "checked" : ""}`}
                        onClick={e => { e.stopPropagation(); toggle(prob.id); }}
                      >
                        {solved[prob.id] && <i className="ri-check-line" />}
                      </span>

                      {/* Title → opens LeetCode */}
                      <a
                        className="prob-title"
                        href={prob.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                      >
                        <span className="prob-num">{prob.id}.</span>
                        {prob.title}
                        <i className="ri-external-link-line prob-ext" />
                      </a>

                      {/* Difficulty badge */}
                      <span
                        className="diff-badge"
                        style={{ color: DIFF_COLOR[prob.difficulty], borderColor: DIFF_COLOR[prob.difficulty] + "40" }}
                      >
                        {prob.difficulty}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
