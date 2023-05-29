import React from 'react';
import logo from '../logo.svg';
import './Sidebar.scss';

export default function Sidebar({ components }: { components: JSX.Element[] }) {
  const linkClick = (component: JSX.Element) => {
    console.log('goto: ', component.type.name);
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
        {components.map((Component) => (
          <li key={Component.type.name}>
            <button className='link' onClick={() => linkClick(Component)}>
              {Component.type.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
