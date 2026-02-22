import { useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import "./Aptitude.css";

/* ═══════════════════════════════════════════════════
   QUESTION BANK  — 50 per topic, mix of MCQ & Numeric
═══════════════════════════════════════════════════ */
const BANK = {
  arithmetic: [
    { id:1,  type:"mcq",     q:"A train covers 360 km in 4 hours. What is its speed in m/s?",                                                                           opts:["25 m/s","20 m/s","30 m/s","15 m/s"], ans:0 },
    { id:2,  type:"numeric", q:"A man walks 12 km in 2 hours and then 18 km in 3 hours. Find his average speed (in km/h).",                                              ans:"6" },
    { id:3,  type:"mcq",     q:"If A can do a work in 10 days and B in 15 days, in how many days can they finish it together?",                                          opts:["5","6","7","8"], ans:1 },
    { id:4,  type:"numeric", q:"A pipe fills a tank in 6 hours and another empties it in 9 hours. Both open together — time to fill (in hours)?",                        ans:"18" },
    { id:5,  type:"mcq",     q:"Simple interest on ₹5000 at 8% p.a. for 3 years is:",                                                                                   opts:["₹1000","₹1200","₹1400","₹1600"], ans:1 },
    { id:6,  type:"numeric", q:"Compound interest on ₹10000 at 10% p.a. for 2 years (in ₹)?",                                                                           ans:"2100" },
    { id:7,  type:"mcq",     q:"Profit% when CP=₹200, SP=₹250:",                                                                                                        opts:["20%","25%","30%","35%"], ans:1 },
    { id:8,  type:"numeric", q:"A shopkeeper marks up by 40% and gives 20% discount. Profit % = ?",                                                                      ans:"12" },
    { id:9,  type:"mcq",     q:"Two numbers are in ratio 3:5. Their LCM is 120. Find HCF.",                                                                              opts:["6","8","10","12"], ans:1 },
    { id:10, type:"numeric", q:"LCM of 12, 18, 24 = ?",                                                                                                                 ans:"72" },
    { id:11, type:"mcq",     q:"A and B start together. A's speed 60 km/h, B's 40 km/h. After 3 hours, distance between them (km):",                                    opts:["50","60","70","80"], ans:1 },
    { id:12, type:"numeric", q:"Two trains of 200 m and 150 m run at 72 km/h and 54 km/h opposite directions. Time to cross (sec)?",                                     ans:"10" },
    { id:13, type:"mcq",     q:"A cistern has a leak that empties it in 8 hours. A tap fills it in 6 hours. Net time to fill (hours):",                                  opts:["20","24","22","26"], ans:1 },
    { id:14, type:"numeric", q:"20% of 30% of 500 = ?",                                                                                                                 ans:"30" },
    { id:15, type:"mcq",     q:"By selling an article at ₹96 a trader gains 20%. The CP is:",                                                                            opts:["₹76","₹80","₹82","₹84"], ans:1 },
    { id:16, type:"numeric", q:"If 25% of a number is 75, the number is?",                                                                                              ans:"300" },
    { id:17, type:"mcq",     q:"A river flows at 4 km/h. A boat's speed in still water is 12 km/h. Speed downstream (km/h):",                                           opts:["8","12","16","20"], ans:2 },
    { id:18, type:"numeric", q:"Upstream speed = 8 km/h, downstream = 12 km/h. Speed of boat in still water?",                                                          ans:"10" },
    { id:19, type:"mcq",     q:"Ratio of milk to water is 4:1. After adding 10 L water to 40 L mixture, new ratio:",                                                    opts:["2:1","8:5","4:3","5:3"], ans:0 },
    { id:20, type:"numeric", q:"A mixture of 60 L has milk and water in ratio 2:1. How much water must be added to make it 1:1 (L)?",                                   ans:"20" },
    { id:21, type:"mcq",     q:"If the selling price of 10 articles equals cost price of 12 articles, profit % is:",                                                    opts:["15%","20%","25%","30%"], ans:1 },
    { id:22, type:"numeric", q:"A number increased by 15% gives 460. Original number?",                                                                                 ans:"400" },
    { id:23, type:"mcq",     q:"The sum of ages of father and son is 55. 5 years ago, father was 6× son. Son's present age:",                                           opts:["10","12","14","15"], ans:0 },
    { id:24, type:"numeric", q:"Average of 5 numbers is 20. If one number is replaced by 30, new average = ?",                                                          ans:"22" },
    { id:25, type:"mcq",     q:"A train 240 m long crosses a pole in 12 sec. Its speed (m/s):",                                                                         opts:["15","20","25","30"], ans:1 },
    { id:26, type:"numeric", q:"A and B together earn ₹1200/day. A alone earns ₹800/day. B's monthly (30 days) earning?",                                               ans:"12000" },
    { id:27, type:"mcq",     q:"15 men can do a work in 20 days. How many men needed to finish in 12 days?",                                                            opts:["20","22","25","30"], ans:2 },
    { id:28, type:"numeric", q:"SI on ₹8000 at 5% for 4 years = ?",                                                                                                    ans:"1600" },
    { id:29, type:"mcq",     q:"Two articles bought at ₹500 each. One sold at 20% gain, other at 20% loss. Overall:",                                                   opts:["No loss no gain","4% loss","4% gain","2% gain"], ans:0 },
    { id:30, type:"numeric", q:"Speed ratio of A:B = 3:4. A takes 20 min more for same distance. B's time (min)?",                                                      ans:"60" },
    { id:31, type:"mcq",     q:"₹12000 invested at 10% CI for 2 years. Amount (₹):",                                                                                    opts:["₹14400","₹14520","₹14500","₹14200"], ans:1 },
    { id:32, type:"numeric", q:"A taps fills a tank in 4 h, B in 6 h, C empties in 3 h. All open — time to fill (h)?",                                                  ans:"12" },
    { id:33, type:"mcq",     q:"If 3x + 5 = 20, then x =",                                                                                                             opts:["5","4","3","6"], ans:0 },
    { id:34, type:"numeric", q:"Average of first 50 natural numbers = ?",                                                                                               ans:"25.5" },
    { id:35, type:"mcq",     q:"A shopkeeper buys 100 oranges for ₹50 and sells 80 oranges for ₹50. Loss %:",                                                           opts:["20%","15%","25%","10%"], ans:0 },
    { id:36, type:"numeric", q:"HCF of 144 and 180 = ?",                                                                                                               ans:"36" },
    { id:37, type:"mcq",     q:"A man can row 7.5 km/h in still water. River speed 1.5 km/h. Time to row 30 km upstream (h):",                                         opts:["5","6","4","3"], ans:0 },
    { id:38, type:"numeric", q:"Two numbers sum = 84, difference = 14. Smaller number?",                                                                                ans:"35" },
    { id:39, type:"mcq",     q:"30 men can complete a work in 16 days. After 6 days 10 men leave. Days to complete remaining:",                                         opts:["18","20","22","24"], ans:1 },
    { id:40, type:"numeric", q:"A sells to B at 10% profit, B sells to C at 20% profit. C pays ₹264. A's CP?",                                                         ans:"200" },
    { id:41, type:"mcq",     q:"Present ratio of A:B ages = 5:3. 4 years hence ratio = 3:2. B's present age:",                                                         opts:["12","16","20","24"], ans:0 },
    { id:42, type:"numeric", q:"Discount of 15% on marked price ₹800. SP = ?",                                                                                         ans:"680" },
    { id:43, type:"mcq",     q:"Which is the greatest fraction? 3/4, 5/6, 7/8, 9/10:",                                                                                 opts:["3/4","5/6","7/8","9/10"], ans:3 },
    { id:44, type:"numeric", q:"5% of a number + 10% of 250 = 50. Number = ?",                                                                                         ans:"500" },
    { id:45, type:"mcq",     q:"A can finish work in 18 days, B in 9 days, C in 6 days. B and C work together, A joins after 2 days. Total days:",                      opts:["4.5","5","5.5","6"], ans:0 },
    { id:46, type:"numeric", q:"3 numbers are in AP. Sum = 15, product = 80. Middle number?",                                                                           ans:"5" },
    { id:47, type:"mcq",     q:"A loss of 5% is made when SP=₹285. CP was:",                                                                                           opts:["₹290","₹295","₹300","₹310"], ans:2 },
    { id:48, type:"numeric", q:"Speed of light = 3×10⁸ m/s. Distance from sun to earth = 1.5×10¹¹ m. Time taken (min)?",                                               ans:"8.33" },
    { id:49, type:"mcq",     q:"A beats B by 20 m in a 200 m race. B beats C by 10 m in 100 m. A beats C (m) in 200 m race:",                                          opts:["38","39","40","42"], ans:1 },
    { id:50, type:"numeric", q:"Mean of 10 observations is 15. One observation 20 was misread as 10. Correct mean?",                                                    ans:"16" },
  ],

  algebra: [
    { id:51,  type:"mcq",     q:"If x + 1/x = 5, then x² + 1/x² = ?",                                                                                                 opts:["23","25","27","21"], ans:0 },
    { id:52,  type:"numeric", q:"If x² − 5x + 6 = 0, sum of roots = ?",                                                                                               ans:"5" },
    { id:53,  type:"mcq",     q:"Solve: 2x + 3y = 12 and x − y = 1. Value of y:",                                                                                      opts:["2","3","1","4"], ans:0 },
    { id:54,  type:"numeric", q:"If a + b = 10 and ab = 21, then a² + b² = ?",                                                                                         ans:"58" },
    { id:55,  type:"mcq",     q:"(x + y)² − (x − y)² = ?",                                                                                                            opts:["2xy","4xy","x²−y²","2x²"], ans:1 },
    { id:56,  type:"numeric", q:"If 2x − 3 = 11, x = ?",                                                                                                               ans:"7" },
    { id:57,  type:"mcq",     q:"The value of (a + b)³ − (a − b)³ equals:",                                                                                            opts:["2b(3a²+b²)","2a(3b²+a²)","2b³","2a³"], ans:0 },
    { id:58,  type:"numeric", q:"If x = 3 and y = −2, then x² − y² = ?",                                                                                              ans:"5" },
    { id:59,  type:"mcq",     q:"Roots of x² − 7x + 12 = 0 are:",                                                                                                     opts:["3,4","2,6","1,12","−3,−4"], ans:0 },
    { id:60,  type:"numeric", q:"If the discriminant of ax²+bx+c=0 is zero, roots are equal. For 2x²−4x+k=0, k = ?",                                                   ans:"2" },
    { id:61,  type:"mcq",     q:"Simplify: (x²−9)/(x+3) when x≠−3:",                                                                                                  opts:["x−3","x+3","x²−3","x+9"], ans:0 },
    { id:62,  type:"numeric", q:"If 3a = 4b, then a:b = ? (as decimal)",                                                                                               ans:"1.33" },
    { id:63,  type:"mcq",     q:"Which expression is a perfect square? ",                                                                                               opts:["x²+6x+9","x²+5x+4","x²−3x+2","x²+x+1"], ans:0 },
    { id:64,  type:"numeric", q:"If x/3 + y/4 = 1 and x/4 + y/3 = 1, then x + y = ?",                                                                                 ans:"4" },
    { id:65,  type:"mcq",     q:"The sum of a number and its reciprocal is 10/3. The number is:",                                                                       opts:["3","1/3","Both 3 and 1/3","2"], ans:2 },
    { id:66,  type:"numeric", q:"If log₁₀(100) = x, then x = ?",                                                                                                      ans:"2" },
    { id:67,  type:"mcq",     q:"Value of (a³+b³)/(a+b) when a=2, b=1:",                                                                                               opts:["7","5","9","3"], ans:0 },
    { id:68,  type:"numeric", q:"Solve: |2x − 4| = 6. Sum of all solutions?",                                                                                          ans:"4" },
    { id:69,  type:"mcq",     q:"If f(x) = x² + 2x + 1, then f(−1) = ?",                                                                                              opts:["0","1","2","4"], ans:0 },
    { id:70,  type:"numeric", q:"Value of 2³ × 2⁻¹ = ?",                                                                                                              ans:"4" },
    { id:71,  type:"mcq",     q:"If p and q are roots of x²−6x+8=0, then p³+q³ = ?",                                                                                   opts:["72","84","90","96"], ans:0 },
    { id:72,  type:"numeric", q:"If 5x = 625, then x = ?",                                                                                                             ans:"4" },
    { id:73,  type:"mcq",     q:"Which value satisfies 3x² − 4x − 4 = 0?",                                                                                             opts:["2","−3","4","1"], ans:0 },
    { id:74,  type:"numeric", q:"If log₂(8) + log₂(4) = x, then x = ?",                                                                                               ans:"5" },
    { id:75,  type:"mcq",     q:"The AM of two numbers is 15 and GM is 12. Their product is:",                                                                          opts:["144","180","225","120"], ans:0 },
    { id:76,  type:"numeric", q:"Expand (2x+3)². Coefficient of x = ?",                                                                                                ans:"12" },
    { id:77,  type:"mcq",     q:"Value of x if 2^(x+1) = 32:",                                                                                                         opts:["4","5","3","6"], ans:0 },
    { id:78,  type:"numeric", q:"If A = {1,2,3} and B = {2,3,4}, then |A∪B| = ?",                                                                                      ans:"4" },
    { id:79,  type:"mcq",     q:"Sum of infinite GP with first term 1 and ratio 1/2:",                                                                                  opts:["1","2","3","4"], ans:1 },
    { id:80,  type:"numeric", q:"100th term of AP: 2, 5, 8, ... = ?",                                                                                                  ans:"299" },
    { id:81,  type:"mcq",     q:"If x : y = 3 : 4 and y : z = 5 : 6, then x : z = ?",                                                                                 opts:["5:8","15:24","1:2","3:6"], ans:0 },
    { id:82,  type:"numeric", q:"Sum of first 20 terms of AP 3, 7, 11, ... = ?",                                                                                       ans:"820" },
    { id:83,  type:"mcq",     q:"The product of two consecutive integers is 182. Smaller integer:",                                                                     opts:["12","13","14","11"], ans:1 },
    { id:84,  type:"numeric", q:"If 2^n = 64, n = ?",                                                                                                                  ans:"6" },
    { id:85,  type:"mcq",     q:"Which is correct? a² − b² factors as:",                                                                                               opts:["(a+b)²","(a−b)(a+b)","(a+b)(a+b)","(a−b)²"], ans:1 },
    { id:86,  type:"numeric", q:"If log(xy) = log x + log y, find log(10 × 100) = ?",                                                                                  ans:"3" },
    { id:87,  type:"mcq",     q:"Three-digit number where hundreds digit is twice units and tens digit is 3. Number is:",                                               opts:["621","431","231","641"], ans:0 },
    { id:88,  type:"numeric", q:"GP: 2, 6, 18,... 6th term = ?",                                                                                                       ans:"486" },
    { id:89,  type:"mcq",     q:"If the sum of n natural numbers = 55, n =",                                                                                           opts:["9","10","11","12"], ans:1 },
    { id:90,  type:"numeric", q:"If α and β are roots of x²−3x+2=0, then αβ = ?",                                                                                      ans:"2" },
    { id:91,  type:"mcq",     q:"Simplify (3x² + 6x) / 3x:",                                                                                                          opts:["x+2","3x+2","x+6","3x+6"], ans:0 },
    { id:92,  type:"numeric", q:"If 3x + 2y = 18 and 2x + 3y = 17, then x − y = ?",                                                                                   ans:"1" },
    { id:93,  type:"mcq",     q:"Number of solutions of x² + 4 = 0 in real numbers:",                                                                                  opts:["0","1","2","infinite"], ans:0 },
    { id:94,  type:"numeric", q:"If a/b = 3/4 and b/c = 8/9, then a/c = ?",                                                                                            ans:"0.67" },
    { id:95,  type:"mcq",     q:"Which equation has roots 2 and −3?",                                                                                                  opts:["x²+x−6=0","x²−x−6=0","x²+x+6=0","x²−5x+6=0"], ans:0 },
    { id:96,  type:"numeric", q:"The 10th term of GP 1, 2, 4, 8,... = ?",                                                                                              ans:"512" },
    { id:97,  type:"mcq",     q:"If log₁₀(x) = 3, then x = ?",                                                                                                        opts:["30","100","1000","10000"], ans:2 },
    { id:98,  type:"numeric", q:"Product of roots of 3x² − 5x + 2 = 0 = ?",                                                                                           ans:"0.67" },
    { id:99,  type:"mcq",     q:"Value of i⁴ (where i = √−1):",                                                                                                        opts:["−1","i","−i","1"], ans:3 },
    { id:100, type:"numeric", q:"Sum of all integers from 1 to 100 = ?",                                                                                               ans:"5050" },
  ],

  geometry: [
    { id:101, type:"mcq",     q:"Area of a circle with radius 7 cm (π=22/7):",                                                                                         opts:["154 cm²","144 cm²","164 cm²","174 cm²"], ans:0 },
    { id:102, type:"numeric", q:"Perimeter of rectangle with length 12 cm, breadth 8 cm (cm):",                                                                        ans:"40" },
    { id:103, type:"mcq",     q:"Diagonal of a square with side 10 cm:",                                                                                               opts:["10√2","10√3","20","5√2"], ans:0 },
    { id:104, type:"numeric", q:"Volume of a cube with side 5 cm (cm³):",                                                                                              ans:"125" },
    { id:105, type:"mcq",     q:"A triangle has angles 45°, 75°, and x°. x =",                                                                                         opts:["50","60","70","80"], ans:1 },
    { id:106, type:"numeric", q:"CSA of cylinder with r=7, h=10 (π=22/7):",                                                                                            ans:"440" },
    { id:107, type:"mcq",     q:"Area of equilateral triangle with side 6 cm:",                                                                                        opts:["9√3","12√3","6√3","18√3"], ans:0 },
    { id:108, type:"numeric", q:"Hypotenuse of right triangle with legs 3 and 4:",                                                                                     ans:"5" },
    { id:109, type:"mcq",     q:"If two parallel lines are cut by a transversal, co-interior angles are:",                                                              opts:["Equal","Supplementary","Complementary","Alternate"], ans:1 },
    { id:110, type:"numeric", q:"Area of trapezium with parallel sides 8 and 12, height 5 (cm²):",                                                                     ans:"50" },
    { id:111, type:"mcq",     q:"Volume of sphere with radius 3 (π=22/7, answer nearest whole):",                                                                      opts:["113","110","112","108"], ans:0 },
    { id:112, type:"numeric", q:"Perimeter of equilateral triangle with area 36√3 cm²:",                                                                               ans:"36" },
    { id:113, type:"mcq",     q:"Angle in a semicircle is always:",                                                                                                    opts:["60°","90°","120°","45°"], ans:1 },
    { id:114, type:"numeric", q:"TSA of cuboid: l=5, b=4, h=3 (cm²):",                                                                                                ans:"94" },
    { id:115, type:"mcq",     q:"If radius doubles, area of circle becomes:",                                                                                          opts:["Double","Triple","4 times","6 times"], ans:2 },
    { id:116, type:"numeric", q:"Area of rhombus with diagonals 16 and 12 (cm²):",                                                                                    ans:"96" },
    { id:117, type:"mcq",     q:"The number of diagonals in a hexagon is:",                                                                                            opts:["6","8","9","12"], ans:2 },
    { id:118, type:"numeric", q:"Slant height of cone with r=5, h=12 (cm):",                                                                                          ans:"13" },
    { id:119, type:"mcq",     q:"In a right triangle, sin 30° =",                                                                                                      opts:["√3/2","1/2","1","1/√2"], ans:1 },
    { id:120, type:"numeric", q:"Circumference of circle with diameter 14 cm (π=22/7):",                                                                              ans:"44" },
    { id:121, type:"mcq",     q:"Two supplementary angles differ by 40°. Smaller angle:",                                                                              opts:["60°","70°","75°","80°"], ans:1 },
    { id:122, type:"numeric", q:"Area of parallelogram with base 10 and height 6 (cm²):",                                                                             ans:"60" },
    { id:123, type:"mcq",     q:"Exterior angle of a regular hexagon:",                                                                                                opts:["45°","60°","72°","90°"], ans:1 },
    { id:124, type:"numeric", q:"Volume of cone with r=7, h=12 (π=22/7, cm³):",                                                                                       ans:"616" },
    { id:125, type:"mcq",     q:"Median of a triangle divides it into two triangles with:",                                                                            opts:["Equal angles","Equal areas","Equal perimeters","None"], ans:1 },
    { id:126, type:"numeric", q:"Sum of interior angles of octagon (degrees):",                                                                                        ans:"1080" },
    { id:127, type:"mcq",     q:"A chord is 16 cm long, 6 cm from center. Radius =",                                                                                   opts:["8","10","12","14"], ans:1 },
    { id:128, type:"numeric", q:"If tan θ = 3/4, sin θ = ? (as a fraction numerator over 5)",                                                                          ans:"3" },
    { id:129, type:"mcq",     q:"Base and height of triangle are in ratio 3:2. Area = 48 cm². Height =",                                                               opts:["8","6","10","12"], ans:0 },
    { id:130, type:"numeric", q:"Diagonal of rectangle with l=24, b=7:",                                                                                              ans:"25" },
    { id:131, type:"mcq",     q:"Surface area of sphere with r=7 (π=22/7):",                                                                                          opts:["506","615","616","616"], ans:2 },
    { id:132, type:"numeric", q:"Area of sector with r=14, angle=90° (π=22/7):",                                                                                      ans:"154" },
    { id:133, type:"mcq",     q:"In △ABC, AB=AC. If ∠B=65°, then ∠A =",                                                                                               opts:["40°","50°","60°","70°"], ans:1 },
    { id:134, type:"numeric", q:"Perimeter of sector with r=7, angle=60° (π=22/7):",                                                                                  ans:"21.33" },
    { id:135, type:"mcq",     q:"The locus of a point equidistant from two fixed points is:",                                                                          opts:["Circle","Ellipse","Perpendicular bisector","Parabola"], ans:2 },
    { id:136, type:"numeric", q:"Height of equilateral triangle with side 8 cm (in √ form, numerator):",                                                              ans:"4" },
    { id:137, type:"mcq",     q:"Cos 60° + Sin 30° =",                                                                                                                opts:["1","0.5","√3/2","√2"], ans:0 },
    { id:138, type:"numeric", q:"In a right triangle, if one angle is 30° and hypotenuse is 20, opposite side =",                                                      ans:"10" },
    { id:139, type:"mcq",     q:"Number of sides of a polygon with interior angle sum 1440°:",                                                                         opts:["8","10","12","14"], ans:1 },
    { id:140, type:"numeric", q:"Area of circle inscribed in square of side 14 cm (π=22/7):",                                                                         ans:"154" },
    { id:141, type:"mcq",     q:"Two circles touch externally. Radii 5 and 3. Distance between centres:",                                                              opts:["2","8","5","6"], ans:1 },
    { id:142, type:"numeric", q:"LSA of cube with side 6 cm (cm²):",                                                                                                  ans:"144" },
    { id:143, type:"mcq",     q:"Which set of sides cannot form a triangle?",                                                                                          opts:["3,4,5","5,6,7","2,3,6","7,8,9"], ans:2 },
    { id:144, type:"numeric", q:"cos²θ + sin²θ = ?",                                                                                                                  ans:"1" },
    { id:145, type:"mcq",     q:"An arc of 44 cm on circle with r=14. Angle subtended (deg):",                                                                         opts:["90°","120°","180°","360°"], ans:2 },
    { id:146, type:"numeric", q:"TSA of cylinder with r=7, h=10 (π=22/7):",                                                                                           ans:"748" },
    { id:147, type:"mcq",     q:"Point of concurrence of altitudes of triangle is called:",                                                                            opts:["Centroid","Circumcentre","Incentre","Orthocentre"], ans:3 },
    { id:148, type:"numeric", q:"Area of ring with outer radius 10, inner radius 6 (π=22/7, cm²):",                                                                   ans:"201.14" },
    { id:149, type:"mcq",     q:"If ABCD is a parallelogram and ∠A=70°, then ∠C =",                                                                                    opts:["70°","100°","110°","120°"], ans:0 },
    { id:150, type:"numeric", q:"Longest diagonal of cuboid with l=12, b=4, h=3 (cm):",                                                                               ans:"13" },
  ],

  numbersystems: [
    { id:151, type:"mcq",     q:"Which of the following is a prime number?",                                                                                           opts:["91","87","97","93"], ans:2 },
    { id:152, type:"numeric", q:"Sum of all prime numbers between 10 and 20 = ?",                                                                                      ans:"60" },
    { id:153, type:"mcq",     q:"What is the remainder when 2⁵⁰ is divided by 3?",                                                                                    opts:["0","1","2","3"], ans:1 },
    { id:154, type:"numeric", q:"HCF of 48, 64, 80 = ?",                                                                                                              ans:"16" },
    { id:155, type:"mcq",     q:"Which number is divisible by 11? ",                                                                                                   opts:["123","132","143","153"], ans:2 },
    { id:156, type:"numeric", q:"LCM × HCF = product of two numbers. If HCF=6, LCM=36, one number=12, other=?",                                                       ans:"18" },
    { id:157, type:"mcq",     q:"The smallest 4-digit number divisible by 9 is:",                                                                                      opts:["1008","1017","1026","1000"], ans:0 },
    { id:158, type:"numeric", q:"Number of zeros at end of 25! = ?",                                                                                                   ans:"6" },
    { id:159, type:"mcq",     q:"Unit digit of 7⁹⁶ is:",                                                                                                              opts:["1","3","7","9"], ans:0 },
    { id:160, type:"numeric", q:"Sum of digits of smallest 6-digit palindrome = ?",                                                                                    ans:"2" },
    { id:161, type:"mcq",     q:"Which of following is NOT rational?",                                                                                                 opts:["√4","√9","√2","√25"], ans:2 },
    { id:162, type:"numeric", q:"√(0.0625) = ?",                                                                                                                      ans:"0.25" },
    { id:163, type:"mcq",     q:"287 in binary is:",                                                                                                                   opts:["100011111","10001111","100001111","10011111"], ans:0 },
    { id:164, type:"numeric", q:"Binary 1101 in decimal = ?",                                                                                                          ans:"13" },
    { id:165, type:"mcq",     q:"Remainder when 7 + 77 + 777 + 7777 divided by 8:",                                                                                   opts:["0","4","6","7"], ans:1 },
    { id:166, type:"numeric", q:"How many 3-digit numbers are divisible by 7?",                                                                                        ans:"128" },
    { id:167, type:"mcq",     q:"If n! = 120, n = ?",                                                                                                                  opts:["4","5","6","7"], ans:1 },
    { id:168, type:"numeric", q:"GCD of 56 and 98 = ?",                                                                                                               ans:"14" },
    { id:169, type:"mcq",     q:"1000 in octal is:",                                                                                                                   opts:["1750","1752","1760","1762"], ans:0 },
    { id:170, type:"numeric", q:"Sum of factors of 12 (including 1 and 12) = ?",                                                                                      ans:"28" },
    { id:171, type:"mcq",     q:"Which of these is a perfect number?",                                                                                                 opts:["6","8","12","16"], ans:0 },
    { id:172, type:"numeric", q:"Number of factors of 360 = ?",                                                                                                       ans:"24" },
    { id:173, type:"mcq",     q:"The product of a non-zero rational and irrational is:",                                                                               opts:["Always rational","Always irrational","Sometimes rational","Integer"], ans:1 },
    { id:174, type:"numeric", q:"Cube root of 1331 = ?",                                                                                                              ans:"11" },
    { id:175, type:"mcq",     q:"Remainder when (17²³ + 23¹⁷) ÷ 40:",                                                                                                opts:["0","1","2","39"], ans:0 },
    { id:176, type:"numeric", q:"Sum of first n odd numbers = n². For n=15, sum = ?",                                                                                  ans:"225" },
    { id:177, type:"mcq",     q:"Which fraction lies between 1/4 and 1/3?",                                                                                           opts:["2/9","2/7","3/10","5/16"], ans:2 },
    { id:178, type:"numeric", q:"The 15th Fibonacci number (starting 1,1,2,3...) = ?",                                                                                ans:"610" },
    { id:179, type:"mcq",     q:"What is 2⁰ + 3⁰ + 4⁰?",                                                                                                             opts:["0","3","9","10"], ans:1 },
    { id:180, type:"numeric", q:"Cyclicity of unit digit of 3ⁿ is 4. Unit digit of 3⁴¹ = ?",                                                                          ans:"3" },
    { id:181, type:"mcq",     q:"How many prime numbers less than 30?",                                                                                                opts:["8","9","10","11"], ans:2 },
    { id:182, type:"numeric", q:"1/(1×2) + 1/(2×3) + ... + 1/(9×10) = ?",                                                                                             ans:"0.9" },
    { id:183, type:"mcq",     q:"Highest power of 2 in 32!:",                                                                                                          opts:["28","30","31","36"], ans:2 },
    { id:184, type:"numeric", q:"Value of (−1)⁵⁵ = ?",                                                                                                               ans:"-1" },
    { id:185, type:"mcq",     q:"Which is divisible by both 4 and 6?",                                                                                                opts:["8","12","18","20"], ans:1 },
    { id:186, type:"numeric", q:"Decimal representation of 7/8 = ?",                                                                                                  ans:"0.875" },
    { id:187, type:"mcq",     q:"9 in hexadecimal is:",                                                                                                               opts:["9","A","B","F"], ans:0 },
    { id:188, type:"numeric", q:"Sum of all 2-digit multiples of 9 = ?",                                                                                              ans:"495" },
    { id:189, type:"mcq",     q:"Number of ways to express 12 as sum of two primes:",                                                                                 opts:["2","3","4","1"], ans:1 },
    { id:190, type:"numeric", q:"∛(-27) = ?",                                                                                                                         ans:"-3" },
    { id:191, type:"mcq",     q:"If p = 2^a × 3^b, number of factors is (a+1)(b+1). Factors of 72?",                                                                  opts:["10","12","14","9"], ans:1 },
    { id:192, type:"numeric", q:"Co-prime pairs among (8,9), (6,10), (4,8) — how many?",                                                                              ans:"1" },
    { id:193, type:"mcq",     q:"Smallest number divisible by all integers from 1 to 10:",                                                                            opts:["2520","3020","3600","5040"], ans:0 },
    { id:194, type:"numeric", q:"Recurring decimal 0.333... as fraction numerator (over 3) = ?",                                                                      ans:"1" },
    { id:195, type:"mcq",     q:"How many integers between 100 and 200 are divisible by both 3 and 7?",                                                               opts:["4","5","3","6"], ans:0 },
    { id:196, type:"numeric", q:"Euler's totient φ(10) = ?",                                                                                                          ans:"4" },
    { id:197, type:"mcq",     q:"Remainder of 100! / 101:",                                                                                                           opts:["100","1","0","99"], ans:0 },
    { id:198, type:"numeric", q:"Sum of all even numbers from 2 to 50 = ?",                                                                                           ans:"650" },
    { id:199, type:"mcq",     q:"The number of irrational numbers between 1 and 2 is:",                                                                               opts:["Finite","1","Infinite","Zero"], ans:2 },
    { id:200, type:"numeric", q:"√2 × √8 = ?",                                                                                                                        ans:"4" },
  ],

  datainterpretation: [
    { id:201, type:"mcq",     q:"A pie chart has sector 72° for category A out of 360°. What % of total is A?",                                                        opts:["20%","25%","30%","15%"], ans:0 },
    { id:202, type:"numeric", q:"Bar chart shows sales: Jan=200, Feb=150, Mar=250. Average monthly sales?",                                                           ans:"200" },
    { id:203, type:"mcq",     q:"A table shows profits: 2020=₹40L, 2021=₹50L. % increase:",                                                                           opts:["20%","25%","10%","15%"], ans:1 },
    { id:204, type:"numeric", q:"In a class of 60, 40% scored above 70. Number of students who scored ≤70 = ?",                                                       ans:"36" },
    { id:205, type:"mcq",     q:"A line graph shows company revenue: Q1=100, Q2=120, Q3=90. Q3 is what % of Q1?",                                                     opts:["90%","80%","70%","85%"], ans:0 },
    { id:206, type:"numeric", q:"Total expenditure across 5 departments: 20,30,25,15,10 (lakhs). Highest dept % of total?",                                           ans:"30" },
    { id:207, type:"mcq",     q:"Ratio of income to expenditure is 5:4. If income is ₹50000, savings:",                                                               opts:["₹10000","₹12000","₹8000","₹5000"], ans:0 },
    { id:208, type:"numeric", q:"Average marks of 5 students: 60,70,80,50,90. Median = ?",                                                                           ans:"70" },
    { id:209, type:"mcq",     q:"A histogram shows frequency density 4 for class 10–20. Frequency = ?",                                                               opts:["40","4","20","400"], ans:0 },
    { id:210, type:"numeric", q:"If 3 products contribute 20%, 35%, 45% of ₹2,00,000 revenue. Largest contribution (₹)?",                                             ans:"90000" },
    { id:211, type:"mcq",     q:"Pie chart: sector for Education = 90°. Sector for Health = 60°. Health as % of Education:",                                          opts:["50%","55%","60%","67%"], ans:3 },
    { id:212, type:"numeric", q:"Line graph: 2018=500, 2019=600, 2020=450, 2021=700. Range = ?",                                                                      ans:"250" },
    { id:213, type:"mcq",     q:"In a frequency table, mode is the value with:",                                                                                      opts:["Highest frequency","Lowest frequency","Middle value","Mean value"], ans:0 },
    { id:214, type:"numeric", q:"Data set: 4,8,15,16,23,42. Mean = ?",                                                                                               ans:"18" },
    { id:215, type:"mcq",     q:"5 years' profit: 10,12,15,11,17 lakhs. Mean profit:",                                                                                opts:["13","12","11","15"], ans:0 },
    { id:216, type:"numeric", q:"In a survey, 60% prefer A, 25% prefer B, rest prefer C. If total=400, how many prefer C?",                                           ans:"60" },
    { id:217, type:"mcq",     q:"Bar chart shows exports 2020=₹200Cr, 2021=₹240Cr. Growth %:",                                                                        opts:["15%","20%","25%","18%"], ans:1 },
    { id:218, type:"numeric", q:"Weighted mean: values 10,20,30 with weights 1,2,3. Weighted mean = ?",                                                              ans:"23.33" },
    { id:219, type:"mcq",     q:"Table shows 3 categories with 40%, 35%, 25% share. If total = 2000, largest category =",                                             opts:["700","750","800","850"], ans:2 },
    { id:220, type:"numeric", q:"Expenditure ratio: Food:Transport:Other = 5:3:2. Food expenditure on ₹20000 income?",                                                ans:"10000" },
    { id:221, type:"mcq",     q:"Compound bar chart. Company A: 2020=300, 2021=400. Company B: 2020=200, 2021=250. Combined growth %:",                               opts:["28%","30%","27.27%","25%"], ans:2 },
    { id:222, type:"numeric", q:"Mode of: 3,3,5,7,7,7,9 = ?",                                                                                                        ans:"7" },
    { id:223, type:"mcq",     q:"If 4 students scored 90 and 6 scored 70, average of class:",                                                                         opts:["78","80","76","82"], ans:0 },
    { id:224, type:"numeric", q:"Data: 10,20,20,30,30,30,40. Frequency of 30 = ?",                                                                                   ans:"3" },
    { id:225, type:"mcq",     q:"A pie chart sector for 'Others' spans 108°. % it represents:",                                                                       opts:["25%","30%","35%","40%"], ans:1 },
    { id:226, type:"numeric", q:"Range of: 12,45,7,23,58,3 = ?",                                                                                                     ans:"55" },
    { id:227, type:"mcq",     q:"In ogive (cumulative frequency), the median corresponds to cumulative frequency:",                                                   opts:["25%","50%","75%","100%"], ans:1 },
    { id:228, type:"numeric", q:"Revenue grew from ₹80L to ₹100L. % growth = ?",                                                                                     ans:"25" },
    { id:229, type:"mcq",     q:"If standard deviation is 0, it means:",                                                                                              opts:["High spread","All values are same","Normal distribution","Skewed data"], ans:1 },
    { id:230, type:"numeric", q:"Marks of 6 students: 55,60,75,80,85,95. Q2 (median) = ?",                                                                           ans:"77.5" },
    { id:231, type:"mcq",     q:"A double bar chart compares sales of Product A and B monthly. Best tool to compare proportion over time:",                            opts:["Pie chart","Line graph","Stacked bar","Scatter plot"], ans:2 },
    { id:232, type:"numeric", q:"If expense doubled while income rose 50%, savings ratio (savings/income) changed. Original: income=100, expense=60. New savings %?", ans:"30" },
    { id:233, type:"mcq",     q:"Table shows 4 items sold: 500,400,300,200. Item with highest contribution (%):",                                                     opts:["1st","2nd","3rd","4th"], ans:0 },
    { id:234, type:"numeric", q:"Profit % across years: 10,20,30,40. CAGR is approximate. Average (arithmetic) profit % = ?",                                         ans:"25" },
    { id:235, type:"mcq",     q:"Frequency polygon is drawn by plotting frequency against:",                                                                           opts:["Upper limit","Lower limit","Midpoint","Cumulative frequency"], ans:2 },
    { id:236, type:"numeric", q:"In a data set, 3rd quartile (Q3) = 80, Q1 = 50. IQR = ?",                                                                           ans:"30" },
    { id:237, type:"mcq",     q:"If mean=50, mode=47, distribution is:",                                                                                              opts:["Symmetric","Positively skewed","Negatively skewed","Normal"], ans:1 },
    { id:238, type:"numeric", q:"% students passing if 420 pass out of 600 = ?",                                                                                      ans:"70" },
    { id:239, type:"mcq",     q:"Bar chart: 2018=40K, 2019=50K, 2020=45K. Total 3-year average:",                                                                    opts:["40K","43K","45K","46.7K"], ans:2 },
    { id:240, type:"numeric", q:"Two data sets: A has mean 60, B has mean 80. A has 30 students, B has 20. Combined mean?",                                           ans:"68" },
    { id:241, type:"mcq",     q:"A scatter plot with all points on a straight line shows:",                                                                            opts:["No correlation","Perfect correlation","Weak correlation","Moderate correlation"], ans:1 },
    { id:242, type:"numeric", q:"Pie chart for 5 categories. Angles: 72,90,60,54,84. Sum = ?",                                                                        ans:"360" },
    { id:243, type:"mcq",     q:"Which graph best shows trend over time?",                                                                                             opts:["Bar","Pie","Line","Histogram"], ans:2 },
    { id:244, type:"numeric", q:"Sales in Q1=₹2L, Q2=₹3L, Q3=₹2.5L, Q4=₹4L. Q4 as % of annual?",                                                                   ans:"34.78" },
    { id:245, type:"mcq",     q:"Variance of 2,4,4,4,5,5,7,9 is:",                                                                                                   opts:["2","3","4","5"], ans:2 },
    { id:246, type:"numeric", q:"If cumulative frequency at 40 is 35 out of 50, % below 40 = ?",                                                                      ans:"70" },
    { id:247, type:"mcq",     q:"A table shows cost of 5 items: 15,25,30,20,10. What % is the costliest of total?",                                                   opts:["25%","28%","30%","35%"], ans:2 },
    { id:248, type:"numeric", q:"Mean deviation from mean for: 2,4,6,8,10. Mean=6. MD = ?",                                                                          ans:"2.4" },
    { id:249, type:"mcq",     q:"Relative frequency of class is 0.25. If total freq=200, class freq:",                                                                opts:["25","50","75","100"], ans:1 },
    { id:250, type:"numeric", q:"10th percentile in sorted data of 100 values is at position:",                                                                       ans:"10" },
  ],
};

const TOPICS_META = [
  { id: "arithmetic",       label: "Arithmetic",         icon: "ri-percent-line",       color: "#e07a5f" },
  { id: "algebra",          label: "Algebra",            icon: "ri-function-line",      color: "#81b29a" },
  { id: "geometry",         label: "Geometry",           icon: "ri-shape-line",         color: "#a09bc9" },
  { id: "numbersystems",    label: "Number Systems",     icon: "ri-numbers-line",       color: "#5fb8c8" },
  { id: "datainterpretation", label: "Data Interpretation", icon: "ri-bar-chart-2-line", color: "#c9a96e" },
];

export default function QuantAptitude() {
  const [activeTopic, setActiveTopic] = useState("arithmetic");
  const [answers, setAnswers]         = useState({});  // { qid: value }
  const [checked, setChecked]         = useState({});  // { qid: true } per-question checked
  const [submitted, setSubmitted]     = useState({});  // { topicId: true } final submit

  const questions   = BANK[activeTopic];
  const meta        = TOPICS_META.find(t => t.id === activeTopic);
  const isSubmitted = submitted[activeTopic];

  const isCorrectFn = (q, userAns) => {
    if (userAns === undefined || userAns === "") return false;
    if (q.type === "mcq")     return userAns === q.ans;
    if (q.type === "numeric") return String(userAns).trim() === String(q.ans);
    return false;
  };

  const setAns = (qid, val) => {
    if (checked[qid] || isSubmitted) return;
    setAnswers(p => ({ ...p, [qid]: val }));
  };

  const checkOne = (qid) => {
    if (answers[qid] === undefined || answers[qid] === "") return;
    setChecked(p => ({ ...p, [qid]: true }));
  };

  const handleSubmit = () => {
    const allChecked = {};
    questions.forEach(q => {
      if (answers[q.id] !== undefined && answers[q.id] !== "") allChecked[q.id] = true;
    });
    setChecked(p => ({ ...p, ...allChecked }));
    setSubmitted(p => ({ ...p, [activeTopic]: true }));
  };

  const handleReset = () => {
    const newAns = { ...answers };
    const newChk = { ...checked };
    questions.forEach(q => { delete newAns[q.id]; delete newChk[q.id]; });
    setAnswers(newAns);
    setChecked(newChk);
    setSubmitted(p => ({ ...p, [activeTopic]: false }));
  };

  const score = questions.reduce((acc, q) => {
    if (!checked[q.id]) return acc;
    return acc + (isCorrectFn(q, answers[q.id]) ? 1 : 0);
  }, 0);

  const checkedCount = questions.filter(q => checked[q.id]).length;
  const attempted    = questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== "").length;

  return (
    <>
      <HomeNavbar />
      <div className="apt-page">

        {/* ── TOPIC TABS ── */}
        <div className="apt-tabs">
          {TOPICS_META.map(t => (
            <button
              key={t.id}
              className={`apt-tab ${activeTopic === t.id ? "active" : ""}`}
              style={ activeTopic === t.id ? { "--tc": t.color, borderColor: t.color, color: t.color, background: t.color + "12" } : { "--tc": t.color } }
              onClick={() => setActiveTopic(t.id)}
            >
              <i className={t.icon} />
              {t.label}
            </button>
          ))}
        </div>

        {/* ── TOPIC HEADER ── */}
        <div className="apt-header" style={{ "--tc": meta.color }}>
          <div className="apt-header-left">
            <div className="apt-icon-wrap" style={{ background: meta.color + "18", border: `1px solid ${meta.color}30` }}>
              <i className={`${meta.icon}`} style={{ color: meta.color }} />
            </div>
            <div>
              <h1 className="apt-title">{meta.label}</h1>
              <p className="apt-sub">50 Questions · MCQ & Numeric · Track your progress</p>
            </div>
          </div>
          {isSubmitted && (
            <div className="score-card" style={{ borderColor: meta.color + "40" }}>
              <span className="score-num" style={{ color: meta.color }}>{score}</span>
              <span className="score-of">/ {questions.length}</span>
              <span className="score-label">Score</span>
            </div>
          )}
        </div>

        {/* ── PROGRESS BAR ── */}
        <div className="apt-progress-bar">
          <div className="apt-progress-fill"
            style={{ width: `${(attempted / questions.length) * 100}%`, background: meta.color }} />
        </div>
        <div className="apt-progress-label">
          {attempted} / {questions.length} attempted
        </div>

        {/* ── QUESTIONS ── */}
        <div className="questions-list">
          {questions.map((q, idx) => {
            const userAns   = answers[q.id];
            const isChecked = checked[q.id];
            const isCorrect = isCorrectFn(q, userAns);
            const answered  = userAns !== undefined && userAns !== "";
            const hasAns    = answered;

            return (
              <div
                key={q.id}
                className={`q-card ${isChecked ? (isCorrect ? "correct" : "wrong") : ""}`}
                style={{ "--tc": meta.color }}
              >
                {/* Q header */}
                <div className="q-top">
                  <span className="q-num">Q{idx + 1}</span>
                  <span className={`q-type-badge ${q.type}`}>
                    {q.type === "mcq" ? "MCQ" : "Numeric"}
                  </span>
                  {isChecked && (
                    <span className={`q-verdict ${isCorrect ? "v-correct" : "v-wrong"}`}>
                      {isCorrect
                        ? <><i className="ri-checkbox-circle-line" /> Correct</>
                        : <><i className="ri-close-circle-line" /> Wrong</>}
                    </span>
                  )}
                </div>

                {/* Question text */}
                <p className="q-text">{q.q}</p>

                {/* MCQ options */}
                {q.type === "mcq" ? (
                  <div className="opts-grid">
                    {q.opts.map((opt, oi) => {
                      const isSelected = userAns === oi;
                      const isRightOpt = isChecked && oi === q.ans;
                      const isWrongSel = isChecked && isSelected && oi !== q.ans;
                      return (
                        <button
                          key={oi}
                          className={`opt-btn
                            ${isSelected && !isChecked ? "selected" : ""}
                            ${isRightOpt ? "opt-correct" : ""}
                            ${isWrongSel ? "opt-wrong" : ""}
                          `}
                          style={isSelected && !isChecked ? { borderColor: meta.color, color: meta.color, background: meta.color + "12" } : {}}
                          onClick={() => setAns(q.id, oi)}
                          disabled={isChecked || isSubmitted}
                        >
                          <span className="opt-label">{String.fromCharCode(65 + oi)}.</span>
                          {opt}
                          {isRightOpt && <i className="ri-check-line" style={{ marginLeft: "auto", color: "#81b29a" }} />}
                          {isWrongSel && <i className="ri-close-line" style={{ marginLeft: "auto", color: "#e07a5f" }} />}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="numeric-wrap">
                    <input
                      className={`numeric-input ${isChecked ? (isCorrect ? "ni-correct" : "ni-wrong") : ""}`}
                      type="text"
                      placeholder="Type your answer..."
                      value={answers[q.id] ?? ""}
                      onChange={e => setAns(q.id, e.target.value)}
                      disabled={isChecked || isSubmitted}
                    />
                    {isChecked && !isCorrect && (
                      <span className="correct-ans">
                        <i className="ri-lightbulb-line" /> Correct: <strong>{q.ans}</strong>
                      </span>
                    )}
                    {isChecked && isCorrect && (
                      <span className="correct-ans" style={{ color: "#81b29a" }}>
                        <i className="ri-checkbox-circle-line" /> 
                      </span>
                    )}
                  </div>
                )}

                {/* Wrong MCQ — show correct answer text */}
                {isChecked && !isCorrect && q.type === "mcq" && answered && (
                  <p className="correct-ans-text">
                    <i className="ri-lightbulb-line" style={{ color: "#c9a96e" }} /> Correct answer:{" "}
                    <strong style={{ color: "#81b29a" }}>{q.opts[q.ans]}</strong>
                  </p>
                )}

                {/* Check Answer button — per question */}
                {!isChecked && !isSubmitted && (
                  <div className="q-check-row">
                    <button
                      className="check-ans-btn"
                      style={hasAns ? { borderColor: meta.color + "60", color: meta.color } : {}}
                      onClick={() => checkOne(q.id)}
                      disabled={!hasAns}
                    >
                      <i className="ri-shield-check-line" />
                      Check Answer
                    </button>
                    {!hasAns && <span className="check-hint">Select or type an answer first</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── ACTION BUTTONS ── */}
        <div className="apt-actions">
          {!isSubmitted ? (
            <div className="submit-row">
              <span className="checked-count">
                <i className="ri-shield-check-line" /> {checkedCount} / {questions.length} checked
              </span>
              <button
                className="apt-submit-btn"
                style={{ background: meta.color, boxShadow: `0 4px 24px ${meta.color}40` }}
                onClick={handleSubmit}
              >
                <i className="ri-send-plane-line" /> Submit All & See Score
              </button>
            </div>
          ) : (
            <div className="result-row">
              <div className="result-summary" style={{ borderColor: meta.color + "30" }}>
                <span style={{ color: "#81b29a" }}><i className="ri-check-double-line" /> {score} Correct</span>
                <span style={{ color: "#e07a5f" }}><i className="ri-close-circle-line" /> {checkedCount - score} Wrong</span>
                <span style={{ color: "#999" }}><i className="ri-skip-forward-line" /> {questions.length - checkedCount} Skipped</span>
              </div>
              <button className="apt-reset-btn" onClick={handleReset}>
                <i className="ri-refresh-line" /> Retake Quiz
              </button>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
