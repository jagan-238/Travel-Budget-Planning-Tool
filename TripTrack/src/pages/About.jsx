import React, { useState } from 'react';

const AboutPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`about-page ${isDarkMode ? 'dark' : 'light'}`}>
      <section>
        {/* About Travel Budget Planner */}
        <h1 className="heading1">About Travel Budget Planner</h1>
        <p className="paragraph">
          Traveling can often lead to unexpected expenses, making it essential for
          travelers to plan and manage their budgets effectively. This Travel Budget
          Planner helps users track their expenses, categorize spending, and stay within
          financial limits. It provides a clear overview of budget allocation and spending
          patterns, empowering travelers to make smart decisions and enjoy their trips
          stress-free.
        </p>

        {/* Project Goal */}
        <h2 className="heading2">Project Goal</h2>
        <p className="paragraph">
          Develop an intuitive tool that allows users to efficiently manage travel
          expenses, set budget goals, and analyze spending patterns.
        </p>

        {/* Project Purpose */}
        <h2 className="heading2">Project Purpose</h2>
        <p className="paragraph">This tool provides users with a centralized platform to:</p>
        <ul className="ul">
          <li className="li">Track travel-related expenses in real-time</li>
          <li className="li">Categorize spending (Food, Accommodation, Transport)</li>
          <li className="li">Set and manage budget goals</li>
          <li className="li">Receive alerts when near or over budget</li>
          <li className="li">Visual and downloadable reports</li>
        </ul>

        {/* Core Features */}
        <h2 className="heading2">Core Features</h2>
        <ul className="ul">
          <li className="li">Category-based expense tracking</li>
          <li className="li">Custom budget setting per category</li>
          <li className="li">Real-time budget alerts</li>
          <li className="li">Live currency conversion</li>
          <li className="li">Weekly/monthly reports</li>
          <li className="li">Group travel budgeting</li>
        </ul>

        {/* Technologies Used */}
        <h2 className="heading2">Technologies Used</h2>
        <ul className="ul">
          <li className="li">React (hooks & components)</li>
          <li className="li">Vite for build and dev</li>
          <li className="li">Firebase (auth & DB)</li>
          <li className="li">React Router</li>
          <li className="li">Responsive CSS</li>
        </ul>

        {/* Future Plans */}
        <h2 className="heading2">Future Plans</h2>
        <p className="paragraph">Enhancements will include:</p>
        <ul className="ul">
          <li className="li">Offline access</li>
          <li className="li">Advanced analytics</li>
          <li className="li">Custom export reports</li>
          <li className="li">Native mobile apps (iOS & Android)</li>
        </ul>

        <button className="dark-mode-btn" onClick={toggleMode}>
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </section>
    </div>
  );
};

export default AboutPage;
