/* Edit this file to update the website. No build step is required.
 * Research and experience facts: user-provided “Xuan Mingzhe - revised.tex”.
 * Mentor names and acknowledgements: explicitly supplied by the user.
 * News dates describe starts already stated in that CV; no acceptance is implied.
 * Image paths are relative to index.html. Figures and portrait were supplied by the user.
 */
window.SITE_CONTENT = {
  acknowledgements: [
    { id: "gu", name: "Prof. Qiangqiang Gu", affiliation: "DeePTB Lab · USTC", thanks: "I’m grateful to Prof. Qiangqiang Gu for his guidance during my research at DeePTB Lab." },
    { id: "lu", name: "Prof. Wei Lu", affiliation: "BREATHE AI · NTU", thanks: "Many thanks to Prof. Wei Lu for his guidance during my time at BREATHE AI." },
    { id: "fu", name: "Dr. Xiyan Fu", affiliation: "BREATHE AI", thanks: "Thank you to Dr. Xiyan Fu for the insightful discussions at BREATHE AI!" }
  ],
  profile: {
    name: "Xuan Mingzhe",
    email: "xuanmingzhe@mail.ustc.edu.cn",
    github: "https://github.com/Mingzhe-Xuan",
    cv: "assets/Xuan-Mingzhe-CV.pdf",
    image: "assets/xuan-mingzhe-portrait.png",
    imageAlt: "Portrait of Xuan Mingzhe",
    imageCaption: "Xuan Mingzhe",
    lead: "Hello! My name is Xuan Mingzhe. I am a Statistics undergraduate at the School of Gifted Young, University of Science and Technology of China, with graduation expected in July 2028.",
    paragraphs: [
      "I am currently exploring crystal property prediction at DeePTB Lab, USTC. I’m grateful to Prof. Qiangqiang Gu for his guidance.",
      "I spent a wonderful summer at BREATHE AI, NTU. Many thanks to Prof. Wei Lu for his guidance and Dr. Xiyan Fu for the insightful discussions!",
      "Previously, I was a research assistant at the University of Hong Kong."
    ],
    interests: ["AI4Material", "LLM Agents"]
  },
  announcement: {
    visible: true,
    label: "Open to collaboration",
    title: "I warmly welcome research discussions and collaborations!",
    body: "Have an interesting question? Please feel free to email me at",
    linkText: "xuanmingzhe@mail.ustc.edu.cn",
    href: "mailto:xuanmingzhe@mail.ustc.edu.cn",
    color: "#f0f6ff"
  },
  news: [
    { date: "Sep 2026", category: "Research", title: "A new chapter at DeePTB!", body: "I started leading HieraPG at DeePTB Lab, USTC, exploring crystal property prediction. Many thanks to Prof. Qiangqiang Gu for his guidance!", href: "#research-hierapg" },
    { date: "Jul 2026", category: "Visiting", title: "Hello, BREATHE AI!", body: "I began my visiting studentship at NTU and the Prototype Align project at BREATHE AI. Grateful to Prof. Wei Lu for his guidance and Dr. Xiyan Fu for the insightful discussions!", href: "#research-prototype-align" },
    { date: "Aug 2025", category: "Experience", title: "Exploring quantitative finance at HKU.", body: "I joined the University of Hong Kong as a research assistant in the AI-Agent Lab of CAMO, Quantitative Finance. Time to explore financial data and build useful tools!", href: "#experience-hku" },
    { date: "Sep 2024", category: "Education", title: "Hello, USTC!", body: "I started my Bachelor of Statistics at USTC’s School of Gifted Young. Excited to begin this journey and see where curiosity takes me!", href: "#experience-ustc" }
  ],
  research: [
    {
      id: "hierapg", shortName: "HieraPG", category: "AI4Material", status: "Working paper", role: "Project lead", date: "Sep 2026 — Present",
      title: "Hierarchical Point-Group Experts for Crystal Property Prediction",
      affiliation: "DeePTB Lab · University of Science and Technology of China",
      summary: "Sharing knowledge across crystal symmetries through hierarchical point-group experts and geometry-conditioned routing on an O(3)-equivariant backbone.",
      image: "assets/hierapg-pg-experts.png", imageAlt: "HieraPG overview: shared encoding and expert fusion, inside a point-group expert, and geometry-conditioned routing", imageCaption: "HieraPG · method overview",
      details: [
        "Led the development of HieraPG to address limited sharing across crystal symmetries.",
        "Reduced mean absolute error by 16.07%, 6.35%, and 5.56% on electronic dielectric tensors, elastic stiffness tensors, and Born effective charges, respectively, relative to the strongest baseline for each task."
      ],
      metrics: [{ value: "16.07%", label: "lower MAE · dielectric tensors" }, { value: "6.35%", label: "lower MAE · elastic tensors" }, { value: "5.56%", label: "lower MAE · Born charges" }],
      metricNote: "Relative to the strongest baseline for each task, as reported in the supplied CV.", links: []
    },
    {
      id: "prototype-align", shortName: "Prototype Align", category: "LLM Agents", status: "Under review", role: "Project lead", date: "Jul 2026 — Aug 2026",
      title: "Prototype-Based Latent Alignment for Multi-Agent Systems",
      affiliation: "BREATHE AI · Nanyang Technological University",
      summary: "Expressive, efficient latent communication between LLM agents through nonlinear, training-free alignment with precomputed receiver-space prototypes.",
      image: "assets/prototype-align-overview.png", imageAlt: "Prototype Align method overview showing text alignment and offline and online prototype alignment", imageCaption: "Prototype Align · method overview", imageOriginal: "assets/prototype-align-overview.pdf",
      details: [
        "Proposed and implemented Prototype Align, using orthogonal random features to precompute receiver-space prototypes without vocabulary-sized online operations.",
        "Improved average accuracy across six benchmarks by 3.19 and 3.15 percentage points over the strongest baseline under fixed-budget and entropy-based stopping on Qwen3-8B, respectively.",
        "Achieved approximately 6× faster per-step alignment than Exact-Soft Align."
      ],
      metrics: [{ value: "+3.19 pp", label: "accuracy · fixed budget" }, { value: "+3.15 pp", label: "accuracy · entropy stopping" }, { value: "≈6×", label: "faster per-step alignment" }],
      metricNote: "Accuracy averaged over six benchmarks on Qwen3-8B; speed compared with Exact-Soft Align. Results from the supplied CV.", links: []
    }
  ],
  experience: [
    { id: "ustc", type: "Education", date: "Sep 2024 — Present", organization: "University of Science and Technology of China", role: "Bachelor of Statistics · School of Gifted Young", description: "Expected graduation: July 2028. GPA: 3.85/4.30 · Rank: 4/58." },
    { id: "ntu", type: "Visiting", date: "Jul 2026 — Aug 2026", organization: "Nanyang Technological University", role: "Visiting Student · College of Computer and Data Science", description: "Led the Prototype Align research project at BREATHE AI." },
    { id: "hku", type: "Research assistant", date: "Aug 2025 — Feb 2026", organization: "University of Hong Kong", role: "AI-Agent Lab of CAMO · Quantitative Finance", description: "Developed FlashBT, a stock trading backtesting framework used within the lab. Conducted financial data analysis and factor discovery, developing over 15 factor models." }
  ]
};
