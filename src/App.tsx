import { useEffect, useState } from 'react';
import './reset.scss';
import './App.scss';
import TicTacToe from './tic-tac-toe/TicTacToe';
import Calculator from './calculator/Calculator';
import Sidebar from './sidebar/Sidebar';
import Stopwatch from './stop-watch/Stopwatch';
import DogImages from './dog-images/DogImages';
import Wordle from './wordle/Wordle';
import UserTable from './user-table/UserTable';
import FileExplorer from './file-explorer/FileExplorer';
import PostViewer from './post-viewer/PostViewer';
import BarChart from './bar-chart/BarChart';
//import WordDefinition from './word-definition/WordDefinition';
//import CardMemoryGame from './card-memory-game/CardMemoryGame';

function App() {
  const [projects, setProjects] = useState<string[]>([]);

  useEffect(() => {
    const el = document.getElementById('component-list');
    if (el) {
      setProjects(Array.from(el.children).map((c) => c.children[0].id));
    }
  }, []);

  return (
    <div className='App'>
      <Sidebar projects={projects}></Sidebar>
      <main>
        <ul id='component-list'>
          <li>
            <Wordle />
          </li>
          <li>
            <Calculator />
          </li>
          <li>
            <Stopwatch />
          </li>
          <li>
            <DogImages />
          </li>
          <li>
            <TicTacToe />
          </li>
          <li>
            <FileExplorer />
          </li>
          <li>
            <UserTable />
          </li>
          <li>
            <PostViewer />
          </li>
          <li>
            <BarChart />
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
