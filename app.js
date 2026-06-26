const styles = {
  V: { name: "Visual", color: "#2563eb", className: "visual" },
  A: { name: "Auditory", color: "#16855b", className: "auditory" },
  R: { name: "Reading/Writing", color: "#c57919", className: "readwrite" },
  K: { name: "Kinesthetic", color: "#c24158", className: "kinesthetic" }
};

const systems = [
  { id: "cer", label: "CER" },
  { id: "kagan", label: "Kagan" },
  { id: "siop", label: "SIOP" }
];

const systemLabels = {
  cer: "CER",
  iep: "IEP Supports",
  kagan: "Kagan",
  siop: "SIOP"
};

const styleOrder = ["A", "K", "R", "V"];

const iepSupports = [
  {
    id: "sentence-frames",
    label: "Sentence frames",
    description: "Ready-to-use writing and speaking frames.",
    insert: "Before the CER response, give students two frame choices: \"My claim is ___ because ___\" or \"The evidence shows ___, so I think ___.\""
  },
  {
    id: "chunked-directions",
    label: "Chunked directions",
    description: "Short steps with checkpoints.",
    insert: "Post three steps before station work: 1. Observe the tray. 2. Record one change. 3. Choose the strongest evidence."
  },
  {
    id: "movement-break",
    label: "Movement or regulation break",
    description: "Timed break placed inside the lesson flow.",
    insert: "After the second station rotation, pause for a 90-second reset: stand, stretch, breathe, then point to the next station card."
  },
  {
    id: "teacher-checkin",
    label: "Teacher check-in",
    description: "Intentional checkpoint before independent work.",
    insert: "Before students begin the exit ticket, check in with selected students: \"Show me your evidence first. Which sentence frame will you use?\""
  },
  {
    id: "graphic-organizer",
    label: "Graphic organizer",
    description: "Attach an organizer from the Lesson Mentor library.",
    insert: "Attach the Claim-Evidence-Reasoning organizer and model one row before students work independently."
  },
  {
    id: "read-aloud",
    label: "Read-aloud support",
    description: "Read key prompts and question choices aloud.",
    insert: "Read the station prompt and answer options aloud before students select evidence."
  }
];

const templateLibrary = [
  { title: "Claim-Evidence-Reasoning organizer", subject: "science", grades: ["g35", "g68"], fit: ["R", "V"] },
  { title: "Vocabulary picture-card mat", subject: "science", grades: ["k2", "g35"], fit: ["V", "K"] },
  { title: "Station evidence tracker", subject: "science", grades: ["g35", "g68"], fit: ["K", "R"] }
];

const protectedAssetLibrary = [
  "Lesson Plan Template.doc",
  "Teaching & Learning Moves Matrix template code",
  "3 Circle Venn Diagram.pdf",
  "Alphabet Grid.pdf",
  "Beginning Middle End.png",
  "Blank 3 Details Pointing to Main Idea.pdf",
  "Blank 4 Details Pointing to Main Idea.pdf",
  "Blank 4-Column Topic Grid.pdf",
  "Blank Grid.pdf",
  "Cause Effect 1.png",
  "Cause Effect 2.png",
  "Character 1.png",
  "Character 2.png",
  "Character Setting Plot.pdf",
  "Chapter Notes.pdf",
  "Compare and Contrast.png",
  "Document Analysis.pdf",
  "Drawing Conclusions.pdf",
  "Essay Map.pdf",
  "Event Details.pdf",
  "Evidence of Theme.pdf",
  "Fact-Opinion.png",
  "KWL.png",
  "KWLW.png",
  "Main Idea-Detail.png",
  "Making Generalizations.pdf",
  "Making Predictions.png",
  "Plot Story Map.pdf",
  "Problem Solution Organizer.pdf",
  "Pro-Con.png",
  "Reading Organizer.pdf",
  "Sequence Events 1.png",
  "Sequence Events 2.png",
  "Story Elements.png",
  "Summarize.png",
  "Timeline.pdf",
  "What I learned today.pdf",
  "Word Meaning 1.png",
  "Word Meaning 2.png",
  "Word Web.pdf",
  "Writing Organizer.pdf",
  "Writing Shape set"
];

const standardsLibrary = [
  {
    id: "4-ESS2-1",
    framework: "NGSS",
    grade: "4",
    subject: "science",
    keywords: ["erosion", "weathering", "landforms", "water", "earth", "soil"],
    text: "Make observations and/or measurements to provide evidence of the effects of weathering or the rate of erosion by water, ice, wind, or vegetation."
  },
  {
    id: "4-ESS1-1",
    framework: "NGSS",
    grade: "4",
    subject: "science",
    keywords: ["landforms", "rocks", "fossils", "patterns", "earth"],
    text: "Identify evidence from patterns in rock formations and fossils in rock layers to support an explanation for changes in a landscape over time."
  },
  {
    id: "3-LS4-3",
    framework: "NGSS",
    grade: "3",
    subject: "science",
    keywords: ["habitat", "environment", "survive", "adapt", "ecosystem"],
    text: "Construct an argument with evidence that in a particular habitat some organisms can survive well, some survive less well, and some cannot survive at all."
  },
  {
    id: "5-PS1-3",
    framework: "NGSS",
    grade: "5",
    subject: "science",
    keywords: ["matter", "materials", "properties", "observe", "measure"],
    text: "Make observations and measurements to identify materials based on their properties."
  },
  {
    id: "CCSS.ELA-LITERACY.RI.4.1",
    framework: "Common Core",
    grade: "4",
    subject: "ela",
    keywords: ["evidence", "text", "infer", "details", "explain"],
    text: "Refer to details and examples in a text when explaining what the text says explicitly and when drawing inferences from the text."
  },
  {
    id: "CCSS.ELA-LITERACY.W.4.2",
    framework: "Common Core",
    grade: "4",
    subject: "ela",
    keywords: ["explain", "informative", "write", "evidence", "topic"],
    text: "Write informative/explanatory texts to examine a topic and convey ideas and information clearly."
  },
  {
    id: "CCSS.ELA-LITERACY.SL.4.1",
    framework: "Common Core",
    grade: "4",
    subject: "ela",
    keywords: ["discussion", "partner", "talk", "collaborative", "conversation"],
    text: "Engage effectively in a range of collaborative discussions with diverse partners."
  },
  {
    id: "CCSS.MATH.CONTENT.4.MD.A.3",
    framework: "Common Core",
    grade: "4",
    subject: "math",
    keywords: ["area", "perimeter", "formula", "rectangle", "measurement"],
    text: "Apply the area and perimeter formulas for rectangles in real-world and mathematical problems."
  }
];

const classProfiles = {
  "1": {
    name: "Period 1",
    profile: { V: 34, A: 18, R: 16, K: 32 },
    roster: [
      { id: "48291", grade: "4", primary: "V", secondary: "K", lastAssessment: "Jun 12, 2026", completed: "8/12" },
      { id: "51804", grade: "4", primary: "K", secondary: "V", lastAssessment: "Jun 11, 2026", completed: "12/12" },
      { id: "60418", grade: "4", primary: "A", secondary: "R", lastAssessment: "Jun 10, 2026", completed: "12/12" },
      { id: "77120", grade: "4", primary: "V", secondary: "A", lastAssessment: "Jun 7, 2026", completed: "10/12" },
      { id: "83914", grade: "4", primary: "K", secondary: "R", lastAssessment: "Jun 6, 2026", completed: "12/12" }
    ]
  },
  "2": {
    name: "Period 2",
    profile: { V: 22, A: 33, R: 28, K: 17 },
    roster: [
      { id: "29310", grade: "5", primary: "A", secondary: "R", lastAssessment: "Jun 9, 2026", completed: "12/12" },
      { id: "41022", grade: "5", primary: "R", secondary: "A", lastAssessment: "Jun 9, 2026", completed: "11/12" },
      { id: "61087", grade: "5", primary: "A", secondary: "V", lastAssessment: "Jun 8, 2026", completed: "12/12" },
      { id: "75922", grade: "5", primary: "R", secondary: "K", lastAssessment: "Jun 8, 2026", completed: "9/12" }
    ]
  },
  "3": {
    name: "Period 3",
    profile: { V: 26, A: 19, R: 20, K: 35 },
    roster: [
      { id: "10294", grade: "3", primary: "K", secondary: "V", lastAssessment: "Jun 5, 2026", completed: "12/12" },
      { id: "34710", grade: "3", primary: "V", secondary: "K", lastAssessment: "Jun 5, 2026", completed: "12/12" },
      { id: "50218", grade: "3", primary: "K", secondary: "A", lastAssessment: "Jun 4, 2026", completed: "10/12" },
      { id: "65044", grade: "3", primary: "R", secondary: "V", lastAssessment: "Jun 4, 2026", completed: "12/12" }
    ]
  },
  "4": {
    name: "Period 4",
    profile: { V: 20, A: 20, R: 35, K: 25 },
    roster: [
      { id: "22904", grade: "4", primary: "R", secondary: "K", lastAssessment: "Jun 3, 2026", completed: "12/12" },
      { id: "33018", grade: "4", primary: "K", secondary: "R", lastAssessment: "Jun 3, 2026", completed: "12/12" },
      { id: "44921", grade: "4", primary: "V", secondary: "A", lastAssessment: "Jun 2, 2026", completed: "9/12" }
    ]
  },
  "5": {
    name: "Period 5",
    profile: { V: 38, A: 16, R: 18, K: 28 },
    roster: [
      { id: "51882", grade: "4", primary: "V", secondary: "K", lastAssessment: "Jun 1, 2026", completed: "12/12" },
      { id: "62810", grade: "4", primary: "V", secondary: "R", lastAssessment: "May 31, 2026", completed: "12/12" },
      { id: "73940", grade: "4", primary: "K", secondary: "V", lastAssessment: "May 30, 2026", completed: "11/12" }
    ]
  },
  "6": {
    name: "Period 6",
    profile: { V: 25, A: 25, R: 25, K: 25 },
    roster: []
  },
  "7": {
    name: "Period 7",
    profile: { V: 28, A: 24, R: 31, K: 17 },
    roster: [
      { id: "70014", grade: "5", primary: "R", secondary: "V", lastAssessment: "May 29, 2026", completed: "12/12" },
      { id: "70032", grade: "5", primary: "A", secondary: "R", lastAssessment: "May 29, 2026", completed: "12/12" }
    ]
  },
  "8": {
    name: "Period 8",
    profile: { V: 30, A: 22, R: 18, K: 30 },
    roster: [
      { id: "81005", grade: "4", primary: "K", secondary: "V", lastAssessment: "May 27, 2026", completed: "10/12" },
      { id: "81016", grade: "4", primary: "V", secondary: "K", lastAssessment: "May 27, 2026", completed: "12/12" }
    ]
  },
  "9": {
    name: "Period 9",
    profile: { V: 19, A: 27, R: 39, K: 15 },
    roster: [
      { id: "92044", grade: "5", primary: "R", secondary: "A", lastAssessment: "May 25, 2026", completed: "12/12" },
      { id: "92070", grade: "5", primary: "R", secondary: "V", lastAssessment: "May 25, 2026", completed: "12/12" }
    ]
  },
  "10": {
    name: "Period 10",
    profile: { V: 33, A: 23, R: 20, K: 24 },
    roster: [
      { id: "10411", grade: "4", primary: "V", secondary: "A", lastAssessment: "May 22, 2026", completed: "12/12" },
      { id: "10429", grade: "4", primary: "K", secondary: "V", lastAssessment: "May 22, 2026", completed: "11/12" }
    ]
  }
};

const sampleLesson = `Grade 4 science lesson: Students investigate erosion by rotating through stations with soil trays, water droppers, photographs of landforms, vocabulary cards, and a short evidence notebook. Objective: explain how water changes land over time. Students make a claim, cite evidence from the station data, and explain their reasoning. Include partner talk, a teacher model, sentence frames, and a quick exit ticket.`;

const strategyLibrary = [
  {
    system: "kagan",
    title: "RallyCoach",
    modalities: ["A", "K"],
    keywords: ["partner", "practice", "math", "coach"],
    description: "Pairs take turns solving or explaining while the partner coaches with prompts and feedback."
  },
  {
    system: "kagan",
    title: "Quiz-Quiz-Trade",
    modalities: ["A", "K", "R"],
    keywords: ["vocabulary", "review", "cards", "question"],
    description: "Students circulate with prompt cards, answer, coach each other, then trade cards for repeated practice."
  },
  {
    system: "kagan",
    title: "Timed Pair Share",
    modalities: ["A"],
    keywords: ["discuss", "partner", "explain", "talk"],
    description: "Students explain thinking to a partner in equal timed turns before whole-class sharing."
  },
  {
    system: "siop",
    title: "Content and Language Objectives",
    modalities: ["V", "R"],
    keywords: ["objective", "vocabulary", "language", "lesson"],
    description: "Post and revisit the content goal and the language students will use to show understanding."
  },
  {
    system: "siop",
    title: "Comprehensible Input",
    modalities: ["V", "A", "K"],
    keywords: ["model", "visual", "photograph", "demonstration"],
    description: "Use modeling, visuals, gestures, and clear pacing so academic content is accessible."
  },
  {
    system: "siop",
    title: "Practice and Application",
    modalities: ["K", "A", "R"],
    keywords: ["station", "hands-on", "notebook", "practice"],
    description: "Give students structured chances to use reading, writing, listening, speaking, and hands-on practice together."
  },
  {
    system: "cer",
    title: "Claim Evidence Reasoning Frame",
    modalities: ["R", "V"],
    keywords: ["claim", "evidence", "reasoning", "explain", "data"],
    description: "Students answer with a claim, support it with data or observations, and connect the evidence with reasoning."
  },
  {
    system: "cer",
    title: "Evidence Sort",
    modalities: ["V", "K", "R"],
    keywords: ["evidence", "data", "sort", "observe"],
    description: "Students sort observations into useful evidence, weak evidence, and unrelated details before writing."
  },
  {
    system: "iep",
    title: "Chunked Directions",
    modalities: ["V", "R"],
    keywords: ["directions", "steps", "station", "task"],
    description: "Break tasks into short visible steps with one clear checkpoint before students move on."
  },
  {
    system: "iep",
    title: "Sentence Frames",
    modalities: ["R", "A"],
    keywords: ["sentence", "frame", "writing", "explain"],
    description: "Provide partial language frames so students can focus on reasoning without losing the structure of the response."
  },
  {
    system: "iep",
    title: "Reduced-Distraction Choice",
    modalities: ["K", "R"],
    keywords: ["exit ticket", "assessment", "independent"],
    description: "Offer a quieter or simplified response format for students who need less visual or social load."
  }
];

const strategyDetails = {
  RallyCoach: { grades: ["g35", "g68"], subjects: ["math", "science"], use: "Best when students need guided practice with immediate peer feedback.", avoid: "Avoid when students have not seen a model yet." },
  "Quiz-Quiz-Trade": { grades: ["g35", "g68", "g912"], subjects: ["ela", "science", "social-studies"], use: "Best for vocabulary, review, and repeated retrieval practice.", avoid: "Avoid for brand-new content students cannot answer yet." },
  "Timed Pair Share": { grades: ["k2", "g35", "g68", "g912"], subjects: ["math", "ela", "science", "social-studies"], use: "Best when students need oral rehearsal before writing or whole-class sharing.", avoid: "Avoid when the task requires quiet independent processing first." },
  "Content and Language Objectives": { grades: ["k2", "g35", "g68", "g912"], subjects: ["math", "ela", "science", "social-studies"], use: "Best for lessons with new academic vocabulary or multilingual learner supports.", avoid: "Avoid treating it as a wall decoration; it needs to be revisited." },
  "Comprehensible Input": { grades: ["k2", "g35", "g68"], subjects: ["math", "science", "social-studies"], use: "Best when students need modeling, visuals, or demonstration before practice.", avoid: "Avoid overexplaining after students are ready to try the task." },
  "Practice and Application": { grades: ["k2", "g35", "g68"], subjects: ["math", "science"], use: "Best when students can apply the concept with hands-on or language-integrated practice.", avoid: "Avoid when the lesson only has enough time for direct instruction." },
  "Claim Evidence Reasoning Frame": { grades: ["g35", "g68", "g912"], subjects: ["science", "ela", "social-studies"], use: "Best when students must explain a conclusion with evidence.", avoid: "Avoid when there is no evidence source for students to use." },
  "Evidence Sort": { grades: ["g35", "g68", "g912"], subjects: ["science", "social-studies", "ela"], use: "Best before writing, when students need to choose which details truly support a claim.", avoid: "Avoid when the teacher already gave students the exact evidence to use." },
  "Chunked Directions": { grades: ["k2", "g35", "g68", "g912"], subjects: ["math", "ela", "science", "social-studies"], use: "Best for multi-step tasks, stations, projects, and independent work.", avoid: "Avoid making too many micro-steps that slow fluent students down." },
  "Sentence Frames": { grades: ["k2", "g35", "g68", "g912"], subjects: ["ela", "science", "social-studies"], use: "Best when the thinking is strong but language structure is a barrier.", avoid: "Avoid requiring every student to use the same frame if they can write independently." },
  "Reduced-Distraction Choice": { grades: ["k2", "g35", "g68", "g912"], subjects: ["math", "ela", "science", "social-studies"], use: "Best for assessment moments, written response, or tasks with heavy sensory load.", avoid: "Avoid separating students in a way that feels punitive or public." }
};

strategyLibrary.forEach(strategy => Object.assign(strategy, strategyDetails[strategy.title]));

const questionBank = {
  k2: [
    { text: "How do you want to learn about a butterfly?", options: [{ m: "V", t: "Look at pictures" }, { m: "K", t: "Act out the life cycle" }] },
    { text: "How do you want to remember a new word?", options: [{ m: "A", t: "Say it out loud" }, { m: "R", t: "Trace or write it" }] },
    { text: "How do you want to learn a pattern?", options: [{ m: "V", t: "See the shapes" }, { m: "A", t: "Clap the rhythm" }] },
    { text: "How do you want to learn about weather?", options: [{ m: "K", t: "Use tools and move pieces" }, { m: "R", t: "Match labels to pictures" }] },
    { text: "How do you want to share what you know?", options: [{ m: "A", t: "Tell someone" }, { m: "K", t: "Build or point to it" }] },
    { text: "How do you want to solve a story problem?", options: [{ m: "V", t: "Draw it" }, { m: "R", t: "Use words and numbers" }] },
    { text: "How do you want to learn a song?", options: [{ m: "A", t: "Sing it together" }, { m: "K", t: "Move with the beat" }] },
    { text: "How do you want to learn about shapes?", options: [{ m: "V", t: "See the shapes sorted" }, { m: "K", t: "Build them with blocks" }] },
    { text: "How do you want to remember classroom steps?", options: [{ m: "R", t: "Look at a picture list" }, { m: "A", t: "Hear the steps again" }] },
    { text: "How do you want to learn about animals?", options: [{ m: "V", t: "Look at animal cards" }, { m: "A", t: "Talk about animal sounds" }] },
    { text: "How do you want to practice counting?", options: [{ m: "K", t: "Move counters" }, { m: "R", t: "Mark the numbers" }] },
    { text: "How do you want to show the ending of a story?", options: [{ m: "R", t: "Choose words for it" }, { m: "V", t: "Pick a picture for it" }] }
  ],
  g35: [
    { text: "Your class is learning about ecosystems. Rank what would help you most.", options: rankedOptions("See a food web diagram", "Talk through examples", "Read a short article", "Build a model habitat") },
    { text: "You need to remember a new math process. Rank your choices.", options: rankedOptions("Watch the steps color-coded", "Hear the teacher explain", "Write the steps in your notebook", "Practice with tiles or tools") },
    { text: "You are preparing for a quiz. Rank your study plan.", options: rankedOptions("Use charts and drawings", "Study with a partner out loud", "Make written notes", "Play a review game") },
    { text: "You are starting a writing project. Rank what helps first.", options: rankedOptions("Look at an example organizer", "Discuss ideas", "Read the rubric", "Move cards into order") },
    { text: "You are learning geography. Rank what helps most.", options: rankedOptions("Study a map", "Listen to clues", "Read place descriptions", "Make a floor map") },
    { text: "You are learning symmetry. Rank what helps most.", options: rankedOptions("See mirror images", "Explain the rule aloud", "Write definitions", "Fold and test paper shapes") },
    { text: "You are learning a new science word. Rank your choices.", options: rankedOptions("See a labeled picture", "Repeat and use it in a sentence", "Write a definition", "Act it out") },
    { text: "You need to show your learning. Rank what feels best.", options: rankedOptions("Create a poster", "Give a short talk", "Write an explanation", "Build a demonstration") },
    { text: "You are learning a new reading skill. Rank what helps first.", options: rankedOptions("See the strategy marked on a page", "Hear someone think aloud", "Read the steps on a bookmark", "Practice with sticky notes") },
    { text: "You are solving a science problem. Rank what helps most.", options: rankedOptions("Look at the data chart", "Discuss what the data means", "Write a claim and evidence", "Sort evidence cards") },
    { text: "You are learning a new classroom routine. Rank your choices.", options: rankedOptions("Watch the routine modeled", "Hear the directions repeated", "Read a checklist", "Practice the routine") },
    { text: "You are working with a partner. Rank what helps you learn.", options: rankedOptions("Use a shared drawing or chart", "Talk through each step", "Write notes together", "Use cards or tools together") }
  ],
  g612: [
    { text: "You are learning a complex historical event. Rank what helps most.", options: rankedOptions("Study a timeline or map", "Listen to a discussion", "Read primary source notes", "Role-play decision points") },
    { text: "You are preparing a presentation. Rank your process.", options: rankedOptions("Storyboard slides", "Rehearse aloud", "Write speaker notes", "Practice moving through demos") },
    { text: "You are learning geometry volume. Rank your choices.", options: rankedOptions("View 3D diagrams", "Hear an explanation", "Read formulas and examples", "Use physical models") },
    { text: "You are analyzing a novel. Rank what helps first.", options: rankedOptions("Map character relationships", "Join a discussion", "Annotate passages", "Act out a scene") },
    { text: "You are learning web coding. Rank your choices.", options: rankedOptions("See layout examples", "Talk through the logic", "Read docs and comments", "Edit and test code") },
    { text: "You are studying a historic speech. Rank what helps most.", options: rankedOptions("Watch the speaker", "Listen to the rhythm", "Read and annotate the text", "Perform a section") },
    { text: "You need to organize research. Rank what helps.", options: rankedOptions("Use a visual board", "Explain sources to a peer", "Make written source cards", "Sort printed evidence") },
    { text: "You are checking your understanding. Rank your choices.", options: rankedOptions("Use a concept map", "Answer aloud", "Write a summary", "Create a sample problem") },
    { text: "You are learning a new lab procedure. Rank what helps first.", options: rankedOptions("Watch a diagram or demo video", "Hear the safety steps explained", "Read the procedure sheet", "Practice with the materials") },
    { text: "You are revising an essay. Rank what helps most.", options: rankedOptions("Color-code the draft", "Conference with someone", "Use a written revision checklist", "Move paragraphs or evidence cards") },
    { text: "You are learning a new equation. Rank your choices.", options: rankedOptions("See worked examples", "Talk through why it works", "Read the rule and notes", "Use a model or simulation") },
    { text: "You are preparing for a debate or discussion. Rank what helps.", options: rankedOptions("Map the argument visually", "Practice speaking with a partner", "Write evidence notes", "Stand and rehearse positions") }
  ]
};

function rankedOptions(v, a, r, k) {
  return [
    { m: "V", t: v },
    { m: "A", t: a },
    { m: "R", t: r },
    { m: "K", t: k }
  ];
}

const appState = {
  activePeriod: "1",
  enabledSystems: { kagan: true, siop: true, cer: true, iep: true },
  selectedSupports: { "sentence-frames": true, "chunked-directions": true, "movement-break": true, "teacher-checkin": true, "graphic-organizer": true, "read-aloud": false },
  lessonText: "",
  lessonKeywords: [],
  selectedAvatar: "Fox",
  gradeBand: "g35",
  questionIndex: 0,
  answers: {},
  submissions: [
    { title: "Erosion station lesson", period: "Period 1", systems: ["CER", "IEP Supports", "SIOP"], status: "ready", date: "Jun 24", expires: "Jul 9", expired: false },
    { title: "Geometry volume review", period: "Period 3", systems: ["IEP Supports", "Kagan"], status: "expired", date: "Jun 3", expires: "Jun 18", expired: true }
  ]
};

const avatars = [
  "Fox", "Owl", "Turtle", "Rabbit", "Otter", "Hedgehog", "Deer", "Bee", "Bear", "Panda",
  "Koala", "Penguin", "Dolphin", "Octopus", "Narwhal", "Axolotl", "Komodo Dragon", "Chameleon",
  "Toucan", "Elephant", "Flamingo", "Raccoon", "Wolf", "Sloth", "Seahorse"
];

document.addEventListener("DOMContentLoaded", () => {
  bindNavigation();
  bindTeacher();
  bindStudent();
  bindAdmin();
  bindQuestions();
  bindLibrary();
  renderConnectionStatus();
  renderAll();
  applyInitialHashRoute();
});

function bindNavigation() {
  document.querySelectorAll(".nav-button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".nav-button").forEach(item => item.classList.remove("active"));
      document.querySelectorAll(".view").forEach(view => view.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(`${button.dataset.view}-view`).classList.add("active");
      const titles = { teacher: "Teacher dashboard", student: "Student dashboard", library: "Strategy library", admin: "School Dashboard", questions: "Question bank" };
      document.getElementById("view-title").textContent = titles[button.dataset.view];
    });
  });

  document.getElementById("reset-demo").addEventListener("click", () => {
    appState.lessonText = "";
    appState.lessonKeywords = [];
    appState.questionIndex = 0;
    appState.answers = {};
    document.getElementById("lesson-text").value = "";
    renderAll();
  });
}

function applyInitialHashRoute() {
  const target = window.location.hash.replace("#", "");
  const view = target.replace("-view", "");
  const button = document.querySelector(`.nav-button[data-view="${view}"]`);
  if (button) button.click();
}

function bindTeacher() {
  document.getElementById("class-select").addEventListener("change", event => {
    appState.activePeriod = event.target.value;
    renderTeacher();
    renderStrategies();
    renderStandardsPreview();
  });

  document.getElementById("self-contained-toggle").addEventListener("change", event => {
    const profile = classProfiles[appState.activePeriod];
    if (event.target.checked) {
      profile.roster = profile.roster.slice(0, 1);
    } else {
      Object.assign(classProfiles, JSON.parse(JSON.stringify(defaultProfiles)));
    }
    renderTeacher();
  });

  document.getElementById("lesson-file").addEventListener("change", async event => {
    const file = event.target.files[0];
    if (!file) return;
    const textArea = document.getElementById("lesson-text");
    if (file.type.startsWith("text/") || /\.(txt|md|csv)$/i.test(file.name)) {
      textArea.value = await file.text();
    } else {
      textArea.value = `Uploaded file: ${file.name}\n\nServer-side document parsing is not connected yet. Paste lesson text here for this browser prototype to analyze it.`;
    }
  });

  document.getElementById("load-sample").addEventListener("click", () => {
    document.getElementById("lesson-text").value = sampleLesson;
    analyzeLesson();
  });

  document.getElementById("analyze-lesson").addEventListener("click", analyzeLesson);
  document.getElementById("generate-lesson").addEventListener("click", generateLessonPlan);
  document.getElementById("launch-class-assessment")?.addEventListener("click", () => launchAssessment("class"));
  document.getElementById("launch-student-assessment")?.addEventListener("click", () => launchAssessment("student"));
  document.getElementById("open-iep-modal").addEventListener("click", () => document.getElementById("iep-modal").showModal());
  document.getElementById("save-iep-supports").addEventListener("click", renderStrategies);
  ["lesson-grade", "lesson-subject", "objective-style"].forEach(id => {
    document.getElementById(id).addEventListener("change", () => {
      renderStandardsPreview();
      renderStrategies();
    });
  });

  document.querySelectorAll(".teacher-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".teacher-tab").forEach(item => item.classList.remove("active"));
      document.querySelectorAll(".teacher-tab-panel").forEach(panel => panel.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`teacher-tab-${tab.dataset.teacherTab}`).classList.add("active");
    });
  });
}

const defaultProfiles = JSON.parse(JSON.stringify(classProfiles));

function renderConnectionStatus() {
  const status = document.querySelector(".status-box p");
  if (!status) return;
  const api = window.LessonMentorAPI;
  status.textContent = api && !api.isDemoMode()
    ? "Connected to Supabase."
    : "Demo mode until Supabase is configured.";
}

function bindStudent() {
  document.getElementById("grade-band").addEventListener("change", event => {
    appState.gradeBand = event.target.value;
    appState.questionIndex = 0;
    appState.answers = {};
    renderStudent();
    renderQuestions();
  });

  document.getElementById("prev-question").addEventListener("click", () => {
    appState.questionIndex = Math.max(0, appState.questionIndex - 1);
    renderAssessment();
  });

  document.getElementById("next-question").addEventListener("click", () => {
    const questions = questionBank[appState.gradeBand];
    appState.questionIndex = Math.min(questions.length - 1, appState.questionIndex + 1);
    renderAssessment();
    renderStudentProfile();
  });

  document.getElementById("read-question").addEventListener("click", readCurrentQuestion);
}

function bindAdmin() {
  document.getElementById("question-filter").addEventListener("change", renderQuestions);
}

function bindQuestions() {}

function bindLibrary() {
  ["library-system-filter", "library-grade-filter", "library-subject-filter"].forEach(id => {
    document.getElementById(id).addEventListener("change", renderLibrary);
  });
}

function renderAll() {
  renderTeacher();
  renderSystemToggles();
  renderStrategies();
  renderLessonAnalysis();
  renderStandardsPreview();
  renderSubmissionHistory();
  renderStudent();
  renderAdmin();
  renderQuestions();
  renderLibrary();
  renderIepSupports();
}

function renderTeacher() {
  const profile = classProfiles[appState.activePeriod];
  paintCompass("teacher-compass", profile.profile);
  renderStats("teacher-profile-stats", profile.profile);
  document.getElementById("class-insight").textContent = buildInsight(profile.profile);
  document.getElementById("roster-count").textContent = `${profile.roster.length} students`;
  document.getElementById("roster-tab-count").textContent = `${profile.roster.length} students`;
  document.getElementById("roster-list").innerHTML = profile.roster.map(student => `
    <div class="roster-item student-profile-row">
      <div class="student-profile-string">
        <strong>ID # ${student.id}</strong>
        <span>|</span>
        <strong>Grade ${student.grade}</strong>
      </div>
      <div class="student-style-cell">
        <div class="pill-row primary-secondary-pills">${stylePill(student.primary)}${stylePill(student.secondary)}</div>
        <button class="secondary-button" data-profile-id="${student.id}">View profile</button>
      </div>
    </div>
  `).join("") || `<div class="analysis-card"><strong>No student profiles loaded</strong><p>This class can be hidden or treated as planning time.</p></div>`;
  if (profile.roster.length) {
    document.getElementById("roster-list").insertAdjacentHTML("beforeend", `
      <div class="analysis-card">
        <strong>Data retention</strong>
        <p>Student assessment data permanently deletes after 365 days or when the teacher starts a new school year.</p>
      </div>
    `);
  }
  document.querySelectorAll("[data-profile-id]").forEach(button => {
    button.addEventListener("click", () => openStudentProfile(button.dataset.profileId));
  });
}

function renderSystemToggles() {
  document.getElementById("system-toggles").innerHTML = systems.map(system => `
    <label class="system-toggle">
      <span>${system.label}</span>
      <input type="checkbox" data-system="${system.id}" ${appState.enabledSystems[system.id] ? "checked" : ""}>
    </label>
  `).join("");

  document.querySelectorAll("[data-system]").forEach(input => {
    input.addEventListener("change", event => {
      appState.enabledSystems[event.target.dataset.system] = event.target.checked;
      renderStrategies();
      renderLibrary();
    });
  });
}

function renderIepSupports() {
  document.getElementById("iep-supports").innerHTML = iepSupports.map(support => `
    <label class="support-card">
      <input type="checkbox" data-support="${support.id}" ${appState.selectedSupports[support.id] ? "checked" : ""}>
      <span>
        <strong>${support.label}</strong>
        <p>${support.description}</p>
      </span>
    </label>
  `).join("");

  document.querySelectorAll("[data-support]").forEach(input => {
    input.addEventListener("change", event => {
      appState.selectedSupports[event.target.dataset.support] = event.target.checked;
    });
  });
}

function openStudentProfile(studentId) {
  const student = classProfiles[appState.activePeriod].roster.find(item => item.id === studentId);
  if (!student) return;
  const questions = questionBank.g35.slice(0, 3);
  const modal = document.getElementById("student-profile-modal");
  document.getElementById("student-profile-modal-body").innerHTML = `
    <div class="student-profile-summary">
      <div>
        <span class="roster-label">ID #</span>
        <strong>${student.id}</strong>
      </div>
      <div>
        <span class="roster-label">Grade</span>
        <strong>${student.grade}</strong>
      </div>
      <div>
        <span class="roster-label">Last Assessment</span>
        <strong>${student.lastAssessment || "Not started"}</strong>
        <p>${student.completed || "0/12"} questions complete</p>
      </div>
      <div>
        <span class="roster-label">Primary - Secondary</span>
        <div class="pill-row">${stylePill(student.primary)}${stylePill(student.secondary)}</div>
      </div>
    </div>
    <div class="lesson-block">
      <h5>Instruction notes</h5>
      <p>Prioritize ${styles[student.primary].name} access first, then add ${styles[student.secondary].name} as the second pathway. Generated lessons should give this student a clear way into the same task without watering down the objective.</p>
    </div>
    <div class="lesson-block">
      <h5>Recent response evidence</h5>
      <p>Teachers can review what each selected answer measured after the student responds. Students do not see these mappings.</p>
      ${questions.map(question => {
        const options = question.options.filter(option => [student.primary, student.secondary].includes(option.m)).slice(0, 2);
        return `<div class="mini-review"><span>${question.text}</span>${options.map(option => `<b>${option.t}</b>${stylePill(option.m)}`).join("")}</div>`;
      }).join("")}
    </div>
    <div class="lesson-block">
      <h5>Data retention</h5>
      <p>This profile data is scheduled to permanently delete after 365 days or when the teacher starts a new school year.</p>
    </div>
  `;
  modal.showModal();
}

function analyzeLesson() {
  appState.lessonText = document.getElementById("lesson-text").value.trim();
  const words = appState.lessonText.toLowerCase().match(/[a-z]{4,}/g) || [];
  const useful = words.filter(word => !["with", "from", "that", "this", "students", "lesson", "teacher"].includes(word));
  appState.lessonKeywords = [...new Set(useful)].slice(0, 18);
  renderLessonAnalysis();
  renderStrategies();
}

function renderLessonAnalysis() {
  const panel = document.getElementById("lesson-analysis");
  if (!appState.lessonText) {
    panel.innerHTML = `<strong>No lesson analyzed yet</strong><p>Once a lesson is loaded, this panel shows detected keywords and suggested focus areas.</p>`;
    return;
  }

  panel.innerHTML = `
    <strong>Detected lesson signals</strong>
    <p>${appState.lessonKeywords.length ? appState.lessonKeywords.join(", ") : "No strong keywords found yet."}</p>
  `;
}

function renderStandardsPreview() {
  const matches = getStandardMatches();
  const templateCount = document.getElementById("template-count");
  if (templateCount) {
    templateCount.textContent = matches.length ? "Ready to preview/download" : "Preview/download";
  }
}

function getStandardMatches() {
  const grade = document.getElementById("lesson-grade")?.value || "4";
  const subject = document.getElementById("lesson-subject")?.value || "science";
  const words = appState.lessonKeywords.length ? appState.lessonKeywords : sampleLesson.toLowerCase().match(/[a-z]{4,}/g);
  const primary = standardsLibrary
    .filter(item => item.grade === grade && item.subject === subject)
    .map(item => ({ ...item, score: item.keywords.filter(keyword => words.includes(keyword)).length }))
    .sort((a, b) => b.score - a.score)
    .filter(item => item.score > 0)
    .slice(0, 2);

  if (primary.length) return primary;
  return standardsLibrary.filter(item => item.grade === grade && item.subject === subject).slice(0, 2);
}

function buildObjectiveStatement() {
  const style = document.getElementById("objective-style")?.value || "ican";
  const subject = document.getElementById("lesson-subject")?.value || "science";
  const objective = subject === "science"
    ? "explain how evidence from observations supports a claim about how water changes land over time"
    : "use evidence and academic language to explain my thinking";
  const language = subject === "science"
    ? "claim, evidence, reasoning, erosion, observe"
    : "claim, evidence, explain, detail";
  const iCan = `I can ${objective}.`;
  const student = `Today I will use ${language} to ${objective}.`;
  if (style === "both") return `${iCan} ${student}`;
  return style === "student" ? student : iCan;
}

async function generateLessonPlan() {
  if (!document.getElementById("lesson-text").value.trim()) {
    document.getElementById("lesson-text").value = sampleLesson;
  }
  analyzeLesson();

  const profile = classProfiles[appState.activePeriod].profile;
  const matched = strategyLibrary
    .filter(strategy => appState.enabledSystems[strategy.system])
    .map(strategy => ({ ...strategy, score: strategyScore(strategy, profile) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
  const primaryMove = matched[0]?.title || "a visual model";
  const secondaryMove = matched[1]?.title || "structured partner talk";
  const supportInserts = iepSupports.filter(support => appState.selectedSupports[support.id]);
  const organizers = selectOrganizers();
  const standards = getStandardMatches();
  const objectiveStatement = buildObjectiveStatement();
  const selectedSystemLabels = systems
    .filter(system => appState.enabledSystems[system.id])
    .map(system => system.label);
  if (supportInserts.length) selectedSystemLabels.push("IEP Supports");

  const submission = {
    title: "Generated erosion lesson plan",
    period: classProfiles[appState.activePeriod].name,
    systems: selectedSystemLabels,
    status: "ready",
    date: "Today",
    expires: "15 days",
    expired: false
  };

  appState.submissions.unshift(submission);
  renderSubmissionHistory();
  await persistLessonSubmission(submission, standards, supportInserts, organizers);
}

async function persistLessonSubmission(submission, standards, supportInserts, organizers) {
  const api = window.LessonMentorAPI;
  if (!api) return;

  const payload = {
    title: submission.title,
    class_period: classProfiles[appState.activePeriod].name,
    grade: document.getElementById("lesson-grade")?.value || null,
    subject: document.getElementById("lesson-subject")?.value || null,
    objective_style: document.getElementById("objective-style")?.value || null,
    selected_systems: submission.systems,
    matched_standards: standards.map(item => ({ id: item.id, framework: item.framework, text: item.text })),
    selected_supports: supportInserts.map(item => item.id),
    recommended_organizers: organizers,
    lesson_text: appState.lessonText,
    document_status: "available",
    expires_at: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
  };

  const { error } = await api.createLessonSubmission(payload);
  if (error) {
    const submissionHistory = document.getElementById("submission-history");
    if (submissionHistory) {
      submissionHistory.insertAdjacentHTML("afterbegin", `<div class="history-row muted-row"><strong>Saved locally; Supabase error</strong></div>`);
    }
    console.error("Lesson submission save failed", error);
  }
}

async function launchAssessment(scope) {
  const api = window.LessonMentorAPI;
  const profile = classProfiles[appState.activePeriod];
  const gradeBand = document.getElementById("grade-band")?.value || "g35";
  const questions = questionBank[gradeBand] || questionBank.g35;
  const target = scope === "student" ? "one student" : "selected class";
  const payload = {
    class_period: profile.name,
    grade_band: gradeBand,
    target_scope: scope,
    question_count: questions.length,
    same_order: true,
    read_aloud_enabled: gradeBand === "k2",
    teacher_display_enabled: true,
    status: "open"
  };

  document.getElementById("active-assessment-status").textContent =
    `Open for ${target}: ${questions.length} questions, same order for everyone, teacher display view enabled.`;

  if (!api) return;
  const { error } = await api.createAssessmentLaunch(payload);
  if (error) {
    document.getElementById("active-assessment-status").textContent =
      `Open in demo view for ${target}; Supabase save needs attention.`;
    console.error("Assessment launch save failed", error);
  }
}

function selectOrganizers() {
  const subject = document.getElementById("lesson-subject")?.value || "science";
  const scienceSet = ["KWL.png", "Word Web.pdf", "Drawing Conclusions.pdf", "What I learned today.pdf", "Blank 4-Column Topic Grid.pdf"];
  const elaSet = ["Story Elements.png", "Character Setting Plot.pdf", "Essay Map.pdf", "Evidence of Theme.pdf", "Summarize.png"];
  const mathSet = ["Blank Grid.pdf", "Problem Solution Organizer.pdf", "Blank 4 rows.pdf", "Pro-Con.png"];
  const socialSet = ["Timeline.pdf", "Document Analysis.pdf", "Compare and Contrast.png", "Event Details.pdf"];
  const generalSet = ["What I learned today.pdf", "KWL.png", "Word Web.pdf", "Blank Grid.pdf"];
  return ({ science: scienceSet, ela: elaSet, math: mathSet, "social-studies": socialSet }[subject] || generalSet).slice(0, 3);
}

function renderSubmissionHistory() {
  const submissionHistory = document.getElementById("submission-history");
  if (!appState.submissions.length) {
    submissionHistory.innerHTML = `
      <div class="history-row muted-row">
        <div>
          <strong>No generated lessons yet</strong>
          <p>Generate a plan and it will appear at the top of this history.</p>
        </div>
      </div>
    `;
    return;
  }

  submissionHistory.innerHTML = appState.submissions.map(item => `
    <div class="history-row">
      <div>
        <strong>${item.title}</strong>
        <p>${item.date} · ${item.period} · ${item.systems.join(", ")} · ${item.expired ? "document expired" : `available until ${item.expires}`}</p>
      </div>
      <div class="document-actions">
        ${item.expired ? `<span class="small-pill expired">Expired</span>` : `<button class="secondary-button">Preview</button><button class="secondary-button">Download</button>`}
      </div>
    </div>
  `).join("");
}

function renderStrategies() {
  const countEl = document.getElementById("strategy-count");
  const resultsEl = document.getElementById("strategy-results");
  if (!countEl || !resultsEl) return;

  const profile = classProfiles[appState.activePeriod].profile;
  const enabled = Object.keys(appState.enabledSystems).filter(id => appState.enabledSystems[id]);
  const scored = strategyLibrary
    .filter(strategy => enabled.includes(strategy.system))
    .map(strategy => ({ ...strategy, score: strategyScore(strategy, profile) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 9);

  countEl.textContent = `${scored.length} matches`;
  resultsEl.innerHTML = scored.map(strategy => `
    <article class="strategy-card">
      <div class="panel-title-row">
        <strong>${strategy.title}</strong>
        <span class="score">${strategy.score}</span>
      </div>
      <div class="pill-row system-line"><span class="tag-pill">${systemLabels[strategy.system]}</span></div>
      <div class="pill-row style-line">${sortStyles(strategy.modalities).map(stylePill).join("")}</div>
      <p>${strategy.description}</p>
      <p><strong>Use when:</strong> ${strategy.use}</p>
    </article>
  `).join("");
}

function strategyScore(strategy, profile) {
  const modalityFit = strategy.modalities.reduce((sum, modality) => sum + profile[modality], 0);
  const keywordFit = appState.lessonKeywords.filter(word => strategy.keywords.includes(word)).length * 12;
  return Math.round(modalityFit + keywordFit);
}

function renderStudent() {
  renderAvatars();
  renderAssessment();
  renderStudentProfile();
}

function renderAvatars() {
  document.getElementById("avatar-grid").innerHTML = avatars.map((avatar, index) => `
    <button class="avatar-button ${avatar === appState.selectedAvatar ? "active" : ""}" data-avatar="${avatar}" title="${avatar}">
      ${badgeSvg(avatar, index)}
      <span>${avatar}</span>
    </button>
  `).join("");

  document.querySelectorAll("[data-avatar]").forEach(button => {
    button.addEventListener("click", () => {
      appState.selectedAvatar = button.dataset.avatar;
      renderAvatars();
    });
  });
}

function renderAssessment() {
  const questions = questionBank[appState.gradeBand];
  const question = questions[appState.questionIndex];
  document.getElementById("assessment-progress").textContent = `${appState.questionIndex + 1} of ${questions.length}`;
  document.getElementById("assessment-card").innerHTML = `
    <div class="question-card">
      <strong>${question.text}</strong>
      <p>${appState.gradeBand === "k2" ? "Choose the one that helps you most." : "Rank each option from 1, most helpful, to 4, least helpful."}</p>
      <div class="question-options">
        ${question.options.map((option, index) => optionInput(option, index)).join("")}
      </div>
    </div>
  `;

  document.querySelectorAll("[data-answer-index]").forEach(input => {
    input.addEventListener("change", event => {
      const key = `${appState.gradeBand}-${appState.questionIndex}-${event.target.dataset.answerIndex}`;
      appState.answers[key] = Number(event.target.value);
      renderStudentProfile();
    });
  });
}

function optionInput(option, index) {
  const key = `${appState.gradeBand}-${appState.questionIndex}-${index}`;
  if (appState.gradeBand === "k2") {
    return `
      <label class="option-row">
        <input type="radio" name="k2-question-${appState.questionIndex}" data-answer-index="${index}" value="1" ${appState.answers[key] ? "checked" : ""}>
        <span>${option.t}</span>
      </label>
    `;
  }

  return `
    <label class="option-row">
      <select data-answer-index="${index}">
        <option value="0">-</option>
        <option value="1" ${appState.answers[key] === 1 ? "selected" : ""}>1</option>
        <option value="2" ${appState.answers[key] === 2 ? "selected" : ""}>2</option>
        <option value="3" ${appState.answers[key] === 3 ? "selected" : ""}>3</option>
        <option value="4" ${appState.answers[key] === 4 ? "selected" : ""}>4</option>
      </select>
      <span>${option.t}</span>
    </label>
  `;
}

function readCurrentQuestion() {
  const question = questionBank[appState.gradeBand][appState.questionIndex];
  const text = `${question.text}. ${question.options.map((option, index) => `Choice ${index + 1}: ${option.t}.`).join(" ")}`;
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  }
}

function renderStudentProfile() {
  const profile = calculateStudentProfile();
  paintCompass("student-compass", profile);
  renderStats("student-profile-stats", profile);
  const strongest = Object.keys(profile).sort((a, b) => profile[b] - profile[a])[0];
  document.getElementById("study-tips").innerHTML = `
    <div class="tip-card"><strong>${styles[strongest].name} study tip</strong><p>${studyTip(strongest)}</p></div>
    <div class="tip-card"><strong>Privacy note</strong><p>This prototype keeps the student-facing identity to an ID number only.</p></div>
  `;
}

function calculateStudentProfile() {
  const scores = { V: 0, A: 0, R: 0, K: 0 };
  const questions = questionBank[appState.gradeBand];
  questions.forEach((question, qIndex) => {
    question.options.forEach((option, oIndex) => {
      const value = appState.answers[`${appState.gradeBand}-${qIndex}-${oIndex}`] || 0;
      if (!value) return;
      scores[option.m] += appState.gradeBand === "k2" ? 4 : 5 - value;
    });
  });

  const total = Object.values(scores).reduce((sum, value) => sum + value, 0);
  if (!total) return { V: 25, A: 25, R: 25, K: 25 };
  return Object.fromEntries(Object.entries(scores).map(([key, value]) => [key, Math.round((value / total) * 100)]));
}

function studyTip(modality) {
  const tips = {
    V: "Use diagrams, color-coding, sketches, and before/after examples before writing.",
    A: "Talk through the idea with a partner, then repeat the key vocabulary out loud.",
    R: "Use a short written checklist, sentence frame, or summary box to lock in the idea.",
    K: "Build, sort, move, model, or test the idea before answering on paper."
  };
  return tips[modality];
}

function renderAdmin() {
  const students = Object.values(classProfiles).flatMap(group => group.roster);
  document.getElementById("admin-students").innerHTML = students.map(student => `
    <div class="student-row">
      <div>
        <strong>ID ${student.id}</strong>
        <div class="pill-row">${stylePill(student.primary)}${stylePill(student.secondary)}</div>
      </div>
      <span class="small-pill">Grade ${student.grade}</span>
    </div>
  `).join("");

  const slots = Array.from({ length: 10 }, (_, index) => `
    <div class="assignment-row">
      <strong>Teacher ${index + 1}</strong>
      <span class="small-pill">${index < 4 ? "Assigned" : "Open"}</span>
    </div>
  `).join("");
  document.getElementById("assignment-grid").innerHTML = slots;
}

function renderQuestions() {
  const filter = document.getElementById("question-filter").value;
  const entries = Object.entries(questionBank).filter(([band]) => filter === "all" || filter === band);
  document.getElementById("question-grid").innerHTML = entries.flatMap(([band, questions]) => questions.map((question, index) => `
    <article class="question-card">
      <strong>${bandLabel(band)} Q${index + 1}</strong>
      <p>${question.text}</p>
      <div class="pill-row">${question.options.map(option => stylePill(option.m)).join("")}</div>
    </article>
  `)).join("");
}

function renderLibrary() {
  const system = document.getElementById("library-system-filter").value;
  const grade = document.getElementById("library-grade-filter").value;
  const subject = document.getElementById("library-subject-filter").value;
  const filtered = strategyLibrary.filter(strategy => {
    const systemOk = system === "all" || strategy.system === system;
    const gradeOk = grade === "all" || strategy.grades.includes(grade);
    const subjectOk = subject === "all" || strategy.subjects.includes(subject);
    return systemOk && gradeOk && subjectOk;
  });

  document.getElementById("library-results").innerHTML = filtered.map(strategy => `
    <article class="strategy-card">
      <div class="panel-title-row">
        <strong>${strategy.title}</strong>
        <span class="tag-pill">${systemLabels[strategy.system]}</span>
      </div>
      <p>${strategy.description}</p>
      <p><strong>Best fit:</strong> ${strategy.use}</p>
      <p><strong>Use carefully:</strong> ${strategy.avoid}</p>
      <div class="pill-row system-line"><span class="tag-pill">${systemLabels[strategy.system]}</span></div>
      <div class="pill-row style-line">${sortStyles(strategy.modalities).map(stylePill).join("")}</div>
    </article>
  `).join("") || `<div class="analysis-card"><strong>No matches yet</strong><p>Try a broader filter.</p></div>`;
}

function badgeSvg(name, index) {
  const colors = [
    ["#f3a391", "#8a4b3d"], ["#a8cfe8", "#345b78"], ["#a6cf91", "#456b3f"], ["#c9b1e8", "#6e4f8b"],
    ["#a9d8d2", "#40726d"], ["#d6b65c", "#735c22"], ["#e9a0a8", "#7b4450"], ["#f4d36a", "#8a6b10"],
    ["#d9b46f", "#704f26"], ["#f2f2ed", "#34383f"], ["#cfd4d3", "#6f7675"], ["#d7e5f0", "#243a54"],
    ["#a8d9ee", "#246f91"], ["#d2a8de", "#674273"], ["#b6dceb", "#2f6880"], ["#efa6bc", "#8c3f5a"],
    ["#b1ca8a", "#586f36"], ["#b3e1b7", "#397843"], ["#f19843", "#1f2937"], ["#c7d0d7", "#67727a"],
    ["#f4a9c8", "#a33c67"], ["#dad8cf", "#333333"], ["#c9ccd3", "#4b5563"], ["#d7c08c", "#6b5b2f"],
    ["#a8d4e6", "#39738d"]
  ];
  const [fill, dark] = colors[index % colors.length];
  const initials = name.split(" ").map(part => part[0]).join("").slice(0, 2);
  return `
    <svg class="badge-svg" viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="36" fill="#f7f5ef" stroke="#ddd8ce" stroke-width="2"/>
      <circle cx="40" cy="42" r="20" fill="${fill}"/>
      <circle cx="31" cy="37" r="4" fill="${dark}"/>
      <circle cx="49" cy="37" r="4" fill="${dark}"/>
      <path d="M31 51 Q40 58 49 51" fill="none" stroke="${dark}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="24" cy="22" r="9" fill="${fill}" opacity="0.88"/>
      <circle cx="56" cy="22" r="9" fill="${fill}" opacity="0.88"/>
      <text x="40" y="47" text-anchor="middle" font-size="13" font-weight="800" fill="${dark}" opacity="0.32">${initials}</text>
    </svg>
  `;
}

function paintCompass(id, profile) {
  const values = ["V", "A", "R", "K"].map(key => Math.max(0, profile[key] || 0));
  const total = values.reduce((sum, value) => sum + value, 0) || 100;
  let cursor = 0;
  const stops = ["V", "A", "R", "K"].map((key, index) => {
    const start = cursor;
    cursor += (values[index] / total) * 100;
    return `${styles[key].color} ${start}% ${cursor}%`;
  });
  document.getElementById(id).style.background = `conic-gradient(${stops.join(", ")})`;
}

function renderStats(id, profile) {
  document.getElementById(id).innerHTML = styleOrder.map(key => `
    <div class="stat-row">
      <span>${styles[key].name}</span>
      <div class="bar"><span style="width:${profile[key]}%;background:${styles[key].color}"></span></div>
      <strong>${profile[key]}%</strong>
    </div>
  `).join("");
}

function stylePill(key) {
  return `<span class="style-pill ${styles[key].className}">${styles[key].name}</span>`;
}

function sortStyles(modalities) {
  return [...modalities].sort((a, b) => styleOrder.indexOf(a) - styleOrder.indexOf(b));
}

function buildInsight(profile) {
  const ordered = Object.keys(profile).sort((a, b) => profile[b] - profile[a]);
  return `${profile[ordered[0]]}% of this class leans ${styles[ordered[0]].name}, with ${styles[ordered[1]].name} close behind. Recommendations prioritize those styles while still offering whole-class access points.`;
}

function topTwoStyles(profile) {
  return Object.keys(profile).sort((a, b) => profile[b] - profile[a]).slice(0, 2).map(key => styles[key].name);
}

function bandLabel(band) {
  return { k2: "K-2", g35: "Grades 3-5", g612: "Grades 6-12" }[band];
}
