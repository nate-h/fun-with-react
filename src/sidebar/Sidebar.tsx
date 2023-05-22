import React from 'react';
import logo from '../logo.svg';
import './Sidebar.scss';

function Link({ name }: { name: string }) {
  const linkClick = () => {
    console.log('goto: ', name);
    // TODO: now call scrollToView
  };
  return (
    <li>
      <button className='link' onClick={linkClick}>
        {name}
      </button>
    </li>
  );
}

export default function Sidebar() {
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
        <Link name='Tic-Tac-Toe' />
        <Link name='Card Memory Game' />
        <Link name='Calculator' />
      </ul>
    </aside>
  );
}
