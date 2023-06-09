import React from 'react';
import logo from '../logo.svg';
import './Sidebar.scss';

export default function Sidebar({ projects }: { projects: string[] }) {
  const linkClick = (project: string) => {
    const el = document.getElementById(project);
    if (el) {
      el.scrollIntoView();
    }
  };

  return (
    <aside className='Sidebar'>
      <h1>
        <img src={logo} className='logo' alt='logo' />
        Fun With React
      </h1>
      <br />
      <p>This website was created using react, scss, typescript and deployed using github-pages.</p>
      <h2>Mini Projects</h2>
      <ul>
        {projects.map((p) => (
          <li key={p}>
            <button className='link' onClick={() => linkClick(p)}>
              {p}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
