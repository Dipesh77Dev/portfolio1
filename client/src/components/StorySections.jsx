import React, { useState } from 'react';
import styles from './StorySections.module.css';

export function CapabilityMatrix() {
  const [activeTab, setActiveTab] = useState('frontend');

  const content = {
    frontend: {
      title: "Pixel-Perfect & High Performance UI Engineering",
      desc: "Specializing in standard-compliant HTML5, CSS3, and modern React architectures. Experienced in building responsive interfaces, managing complex client-side state, and executing zero-downtime website audits.",
      points: ["3+ years of commercial frontend engineering", "CSS Modules & Clean Component Architecture", "Cross-browser QA & Site Optimization"]
    },
    backend: {
      title: "Scalable MERN APIs & Database Systems",
      desc: "Building robust REST APIs with Node.js and Express. Node server integrations include full CRUD capabilities connected to MongoDB and MySQL databases.",
      points: ["Express REST API Architecture", "MongoDB & Mongoose Schema Design", "Google Sheets API Integration for visitor tracking"]
    },
    audits: {
      title: "SEO, Performance Audits & Site Migrations",
      desc: "Hands-on experience conducting deep technical site audits, resolving performance bottlenecks, and executing migrations with full data protection.",
      points: ["Technical SEO & Lighthouse Optimization", "Seamless zero-downtime migrations", "Client-facing web strategy delivery"]
    }
  };

  return (
    <section className={styles.matrixSection}>
      <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)', fontSize: '0.85rem' }}>// Core Engineering Pillars</div>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem' }}>Core Technical Focus</h2>

      <div className={styles.matrixContainer}>
        <div className={styles.tabButtons}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'frontend' ? styles.activeTabBtn : ''}`}
            onClick={() => setActiveTab('frontend')}
          >
            01. Frontend Engineering
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'backend' ? styles.activeTabBtn : ''}`}
            onClick={() => setActiveTab('backend')}
          >
            02. Backend & MERN
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'audits' ? styles.activeTabBtn : ''}`}
            onClick={() => setActiveTab('audits')}
          >
            03. Audits & Migrations
          </button>
        </div>

        <div className={styles.tabContentGrid}>
          <div>
            <h3 className={styles.tabTitle}>{content[activeTab].title}</h3>
            <p className={styles.tabDesc}>{content[activeTab].desc}</p>
          </div>
          <div>
            <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {content[activeTab].points.map((pt, i) => (
                <li key={i} style={{ color: 'var(--text-main)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--accent-cyan)' }}>✔</span> {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function InteractiveCLI() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { cmd: 'welcome', output: "Type 'help' to view available commands (e.g. skills, contact, experience, clear)" }
  ]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let response = '';

    switch (cmd) {
      case 'help':
        response = "Available commands: 'skills', 'experience', 'projects', 'contact', 'clear'";
        break;
      case 'skills':
        response = "Frontend: HTML5, CSS3, JavaScript, React.js\nBackend: Node.js, Express.js, MongoDB, REST APIs";
        break;
      case 'experience':
        response = "Executive Web Developer @ Think Technology Services (Oct 2023 - Aug 2026)\nInternships @ ProcMart & Desani-XR";
        break;
      case 'projects':
        response = "1. MERN Contact App\n2. Address Book App\n3. EJS Product Manager\n4. Enterprise Client Sites";
        break;
      case 'contact':
        response = "Email: rajpersonal777@gmail.com | Location: Virar (W), Maharashtra, India";
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = `Command not recognized: '${cmd}'. Type 'help' for options.`;
    }

    setHistory(prev => [...prev, { cmd: input, output: response }]);
    setInput('');
  };

  return (
    <section className={styles.cliSection}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>// Developer Mode</div>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '0.5rem' }}>Interactive Terminal</h2>
      </div>

      <div className={styles.terminalBox}>
        <div className={styles.terminalTop}>
          <span className={`${styles.dot} ${styles.red}`}></span>
          <span className={`${styles.dot} ${styles.yellow}`}></span>
          <span className={`${styles.dot} ${styles.green}`}></span>
          <span className={styles.terminalTitle}>dipesh@portfolio:~ (bash)</span>
        </div>

        <div className={styles.terminalBody}>
          {history.map((item, idx) => (
            <div key={idx}>
              <div><span style={{ color: '#7ee787' }}>guest@dipesh-dev:~$</span> {item.cmd}</div>
              <div className={styles.cliOutput}>{item.output}</div>
            </div>
          ))}

          <form onSubmit={handleCommand} className={styles.cliForm}>
            <span className={styles.cliPrompt}>guest@dipesh-dev:~$</span>
            <input
              type="text"
              className={styles.cliInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type command here..."
              // autoFocus
            />
          </form>
        </div>
      </div>
    </section>
  );
}