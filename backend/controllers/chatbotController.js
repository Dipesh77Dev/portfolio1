const RESUME_KNOWLEDGE = [
  {
    keywords: ['name', 'who', 'dipesh', 'about'],
    response: "I'm Dipesh Devrukhkar, a Frontend & Growing MERN Stack Developer with 3+ years of experience building responsive web apps!"
  },
  {
    keywords: ['experience', 'work', 'job', 'company', 'think technology', 'procmart'],
    response: "I work as an Executive Web Developer at Think Technology Services (Oct 2023 - Present) and previously interned at ProcMart and Desani-XR."
  },
  {
    keywords: ['skill', 'tech', 'stack', 'react', 'node', 'mongo', 'javascript'],
    response: "My skills include HTML5, CSS3, JavaScript, React.js, Node.js, Express.js, MongoDB, EJS, and MySQL."
  },
  {
    keywords: ['project', 'portfolio', 'built'],
    response: "Projects include Address Book App (React), Contact Management App (MERN), Product Manager (EJS + MongoDB), and client sites like CleanHedge and Mindscan."
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'hire'],
    response: "You can email Dipesh at rajpersonal777@gmail.com or call +91 96077 45035."
  }
];

// Keywords that signal the user wants to leave
const EXIT_KEYWORDS = ['exit', 'quit', 'close', 'bye', 'clear'];

exports.handleChatMessage = async (req, res) => {
  const { message, userName } = req.body;
  if (!message) return res.status(400).json({ reply: "Please provide a message." });

  const query = message.toLowerCase().trim();
  const name = userName || 'there';

  // 1. Check for Exit/Quit Keywords
  if (EXIT_KEYWORDS.includes(query)) {
    return res.json({
      reply: `Thank you for connecting with Dipesh's AI Assistant, ${name}! Wish you a great day ahead.`,
      isExit: true
    });
  }

  // 2. Search Resume Knowledge Base
  const match = RESUME_KNOWLEDGE.find(item => 
    item.keywords.some(keyword => query.includes(keyword))
  );

  if (match) {
    return res.json({
      reply: match.response,
      matched: true
    });
  }

  // 3. Fallback / Mismatch
  return res.json({
    reply: `I didn't quite catch that, ${name}. You can ask me about Dipesh's MERN skills, work history, projects, or contact details!`,
    matched: false
  });
};