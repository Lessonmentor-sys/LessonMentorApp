// Lesson Mentor — Learning Style Question Bank (data module)
// This is a placeholder for what will eventually be a Supabase query
// (e.g. `select * from question_bank where grade_band = $1`). Keeping the
// shape identical to a DB row now means swapping the source later doesn't
// touch any selection logic.
//
// Row shape: { id, grade, q, opts: [ [modalityCode, text], ... ], pair? }
// pair (K-2 only) = the two modality codes this question tests, sorted
// and joined, e.g. "A-K". Computed once here so the selector never has
// to re-derive it.

function pairKey(opts) {
  return opts.map(([m]) => m).sort().join("-");
}

export const K2_RAW = [
["You want to learn about dinosaurs.", [["V","Look at a big picture book"],["A","Listen to a story read out loud"]]],
["Your teacher is teaching new letters.", [["V","Look at letters on a poster"],["R","Trace and write them yourself"]]],
["It's centers time in the classroom.", [["V","Look at a picture chart on the wall"],["K","Build something with blocks"]]],
["It's story time on the rug.", [["A","Listen to the teacher read out loud"],["R","Look at a book and point to the words"]]],
["You're learning a new song.", [["A","Sing along and listen to the music"],["K","Do the hand motions and dance"]]],
["We're learning about plants.", [["R","Look at a book with words about plants"],["K","Plant a real seed in the dirt"]]],
["You are learning about the weather.", [["V","Look at pictures of big storm clouds"],["A","Listen to a recording of real thunder"]]],
["Your class is practicing adding numbers.", [["R","Write the numbers on a whiteboard"],["K","Use plastic cubes to build groups"]]],
["You want to find out how a puppy grows up.", [["V","Watch a video of a puppy growing big"],["K","Visit a real dog and pet it"]]],
["It's time to learn your sight words.", [["A","Sing a catchy rhyming alphabet song"],["R","Trace the words with a pencil"]]],
["You are learning about bugs in nature.", [["A","Hear the teacher explain where bugs live"],["K","Act out crawling like a caterpillar"]]],
["You are learning how to draw shapes.", [["V","Look at a colorful chart of shapes"],["R","Find shape names in a book"]]],
["You are learning about different colors.", [["V","Look at a bright rainbow poster"],["A","Listen to a poem about colors"]]],
["You want to remember your teacher's rules.", [["R","Copy the rules checklist down"],["K","Roleplay the right way to line up"]]],
["You are learning about fish in the ocean.", [["V","Watch a video of fish swimming around"],["K","Touch real seashells and sand"]]],
["You want to learn a new rhyme.", [["A","Listen to your teacher say it twice"],["R","Look at the typed words on paper"]]],
["Your class is learning about community helpers.", [["A","Listen to a firefighter give a speech"],["K","Try on a heavy firefighter jacket"]]],
["You are playing a matching game.", [["V","Match colored pattern cards together"],["R","Match word labels to pictures"]]],
["You are learning about the solar system.", [["V","Look at a glowing model of the planets"],["R","Read a tiny flip-book about space"]]],
["You need to practice your spelling words.", [["A","Spell the words out loud to a friend"],["K","Write words using finger-paint"]]],
["You want to start a tricky puzzle.", [["I","Try it quietly first"],["A","Hear a hint from the teacher"]]],
["You are learning a new classroom job.", [["I","Try the job step by step"],["V","Watch someone model it"]]],
["You want to build something new.", [["I","Make your own plan"],["K","Build with blocks and tools"]]],
["You want to answer a question.", [["I","Think before you share"],["R","Pick words from a card"]]],
["You are learning with a friend.", [["I","Try one part by yourself"],["S","Work with a partner"]]],
["You want to learn a new game.", [["S","Play with a small group"],["A","Listen to the rules"]]],
["You need to clean up centers.", [["S","Work with your table team"],["K","Move items into bins"]]],
["You want to read a new book.", [["S","Read it with a buddy"],["R","Look at the words yourself"]]],
["You want to share an idea.", [["S","Talk it out with a friend"],["V","Show a picture of your idea"]]],
["You want to practice a new skill.", [["I","Practice at your own spot"],["S","Practice with classmates"]]],
["You want to fix a mistake.", [["I","Check your own work"],["S","Ask a partner to help"]]],
["You want to choose your next center.", [["I","Choose a quiet task"],["S","Choose a partner task"]]],
["You want to solve a problem.", [["I","Try a first idea alone"],["S","Share ideas with a group"]]],
["You want to get ready for work time.", [["I","Use your own checklist"],["S","Check in with your team"]]],
];

export const G35_RAW = [
["Your class is learning about the water cycle. Rank these from most (1) to least (6) interesting to you.", [["V","Watch a video showing rain falling"],["A","Listen to a podcast explaining it"],["R","Read a short article about it"],["K","Build a model with a cup and plastic wrap"],["I","Try the first question on my own"],["S","Work with a small group"]]],
["You got a new board game. Rank how you'd most like to learn the rules.", [["V","Watch a how-to-play video"],["A","Have someone explain the rules out loud"],["R","Read the instruction booklet"],["K","Just start playing and figure it out"],["I","Try one round by yourself first"],["S","Learn the rules with friends"]]],
["Your teacher assigns a report on animals. Rank how you'd most like to find your information.", [["V","Look at a chart comparing animals"],["A","Listen to a nature documentary"],["R","Read a book about the animal"],["K","Visit a zoo or handle real animal items"],["I","Research quietly on your own"],["S","Compare ideas with a partner"]]],
["It's time to study your spelling words. Rank these study methods.", [["V","Look at the words written in different colors"],["A","Say the words out loud and spell them aloud"],["R","Write the words several times"],["K","Spell the words by jumping on letter tiles on the floor"],["I","Use a solo practice checklist"],["S","Quiz a classmate and trade roles"]]],
["Your class is starting a unit on space. Rank these activities.", [["V","Watch a video of a rocket launch"],["A","Listen to an astronaut's story"],["R","Read a book about planets"],["K","Build a model rocket"],["I","Create your own space notes first"],["S","Plan questions with a small group"]]],
["Math time! You're learning multiplication. Rank these study methods.", [["V","Look at a multiplication chart"],["A","Listen to a multiplication song"],["R","Write out the times tables"],["K","Use counters or blocks to group numbers"],["I","Try practice problems quietly first"],["S","Solve examples with a partner"]]],
["You're picking how to present a class project. Rank these options.", [["V","Make a poster with pictures"],["A","Give an oral presentation"],["R","Write a report"],["K","Build a diorama or model"],["I","Complete an independent response"],["S","Work on a shared product"]]],
["Free reading time! Rank how you'd most like to enjoy a story.", [["V","Look at a picture book"],["A","Listen to an audiobook"],["R","Read a chapter book to yourself"],["K","Act out the story with friends"],["I","Read quietly by yourself"],["S","Read and discuss with a buddy"]]],
["Your class is studying maps and geography. Rank how you'd most like to learn about it.", [["V","Look at a large wall map"],["A","Listen to a traveler tell stories"],["R","Fill out a worksheet of capitals"],["K","Mold a map out of clay"],["I","Try the map task independently"],["S","Compare answers with a group"]]],
["You're learning the rules for a new recess game. Rank how you'd most like to learn them.", [["V","Look at a diagram of the court boundary lines"],["A","Listen to the coach explain it"],["R","Read the printed rule sheet"],["K","Jump into a practice round"],["I","Review the rules quietly first"],["S","Practice the rules with classmates"]]],
["Your class is learning about symmetry in art. Rank how you'd most like to explore it.", [["V","Look at photos of symmetrical buildings"],["A","Talk through the definition with a peer"],["R","Copy the definition from the board"],["K","Fold paper and cut out shapes"],["I","Try several shapes by yourself"],["S","Test examples with a partner"]]],
["Your class is studying desert ecosystems. Rank how you'd most like to learn about it.", [["V","Look at an infographic food chain"],["A","Listen to desert night audio tracks"],["R","Read a short encyclopedia entry"],["K","Sort animal cards into habitat bins"],["I","Make your own ecosystem notes"],["S","Build a group explanation"]]],
];

export const G612_RAW = [
["You're assigned a research project. Rank how you'd prefer to gather information.", [["V","Watch documentaries or video explainers"],["A","Listen to podcasts or interviews"],["R","Read articles, books, or journals"],["K","Conduct a hands-on experiment or field visit"],["I","Set up your own research plan"],["S","Compare sources with a team"]]],
["You're studying for a big test. Rank your preferred study methods.", [["V","Make diagrams, charts, or color-coded notes"],["A","Talk it through with a study group, or record yourself explaining it"],["R","Rewrite notes and summarize in your own words"],["K","Use flashcards you physically sort and move"],["I","Self-check with a private practice set"],["S","Quiz and coach a classmate"]]],
["Your teacher assigns a group project. Rank your preferred role on the team.", [["V","Designing the visual presentation or slides"],["A","Presenting and leading discussion"],["R","Writing the report"],["K","Building the prototype or model"],["I","Completing a defined part independently"],["S","Coordinating roles with the group"]]],
["You're learning a new skill outside of school. Rank how you'd prefer to start.", [["V","Watch a tutorial video"],["A","Discuss it with a mentor, or have someone explain it"],["R","Read a guide or manual"],["K","Just try it and learn by doing"],["I","Practice privately before sharing"],["S","Learn alongside another person"]]],
["In science class, rank how you'd most like a new concept taught.", [["V","With diagrams and visual models"],["A","Through class discussion and lecture"],["R","Through the textbook reading"],["K","Through a lab experiment"],["I","Through independent inquiry first"],["S","Through collaborative investigation"]]],
["You're choosing an elective or club. Rank what appeals to you most.", [["V","Photography, film, or art club"],["A","Debate, choir, or podcast club"],["R","Writing or journalism club"],["K","Robotics, sports, or shop club"],["I","Independent study or self-paced option"],["S","A team or service club"]]],
["You need to remember historical events for class. Rank your preferred method.", [["V","Timeline with images"],["A","Listening to a historical podcast or lecture"],["R","Reading primary source documents"],["K","Reenacting events or visiting a historical site"],["I","Making your own study plan"],["S","Studying through group discussion"]]],
["You're preparing for a class presentation. Rank how you'd practice.", [["V","Watching examples of great presentations"],["A","Practicing out loud or rehearsing with someone"],["R","Writing out your script word for word"],["K","Practicing with props or moving through the space"],["I","Rehearsing privately first"],["S","Getting peer feedback during rehearsal"]]],
["You're learning to code a website. Rank how you'd prefer to start.", [["V","Watch a screen-recorded video walkthrough"],["A","Attend a live coding lecture with Q&A"],["R","Review a written HTML tag cheat-sheet"],["K","Type script directly into a compiler to see what breaks"],["I","Debug independently before asking"],["S","Pair-program with a classmate"]]],
["Your class is analyzing the plot of a novel. Rank how you'd most like to dig into it.", [["V","Fill out a plot-mountain visual diagram"],["A","Join a small-group Socratic seminar"],["R","Write a chapter-by-chapter outline"],["K","Act out a 1-minute scene with a classmate"],["I","Reflect in a reading journal"],["S","Discuss interpretations with a group"]]],
["You're learning geometry volume formulas. Rank your preferred study method.", [["V","Use color-coded flashcards with 3D shape diagrams"],["A","Explain the math logic out loud to a peer"],["R","Write out formulas multiple times"],["K","Measure physical boxes and objects in the room"],["I","Try practice problems alone first"],["S","Work through examples with a partner"]]],
["Your class is analyzing a historic speech. Rank how you'd most like to study it.", [["V","Look at newsreel footage from that day"],["A","Listen to the original audio recording"],["R","Read the text transcript line-by-line"],["K","Read the speech aloud using the posture and pacing of the speaker"],["I","Write a private reflection first"],["S","Analyze the speech with a group"]]],
];

function buildPool(raw, gradePrefix, gradeLabel) {
  return raw.map(([q, opts], i) => {
    const id = `${gradePrefix}-${String(i + 1).padStart(2, "0")}`;
    const row = { id, grade: gradeLabel, q, opts };
    if (opts.length === 2) row.pair = pairKey(opts);
    return row;
  });
}

export const K2_POOL = buildPool(K2_RAW, "k2", "K-2");
export const G35_POOL = buildPool(G35_RAW, "g35", "3-5");
export const G612_POOL = buildPool(G612_RAW, "g612", "6-12");

export function getPoolForGradeBand(gradeBand) {
  if (gradeBand === "K-2") return K2_POOL;
  if (gradeBand === "3-5") return G35_POOL;
  if (gradeBand === "6-12") return G612_POOL;
  throw new Error(`Unknown grade band: ${gradeBand}`);
}
