/**
 * This is a minimal demonstration of a nested directory explorer.
 *
 * The point of this is to test recursive components.
 */

import { useMemo, useState } from 'react';
import Card from '../Card';
import exampleData from './example-files.json';

type File = {
  name: string;
  type: 'file';
  size: string;
};

type Directory = {
  name: string;
  type: 'directory';
  children: (Directory | File)[];
};

const FileEl = ({ file, indent }: { file: File; indent: number }) => {
  return (
    <div style={{ margin: `5px 5px 5px ${10 * indent}px` }}>
      📄&nbsp;
      {file.name}&nbsp;
      {file.size}
    </div>
  );
};

const DirectoryEl = ({ directory, indent }: { directory: Directory; indent: number }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <div style={{ margin: `5px 5px 5px ${10 * indent}px` }}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: 'none',
          border: 'none',
          padding: '4px 8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          fontSize: '1em',
          textAlign: 'left',
          width: '100%',
        }}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${directory.name} directory`}
      >
        <span style={{ marginRight: '8px', fontSize: '0.8em' }}>{isExpanded ? '▼' : '▶'}</span>
        📁&nbsp;{directory.name}
      </button>
      {isExpanded &&
        directory.children.map((child) =>
          child.type === 'directory' ? (
            <DirectoryEl directory={child} indent={indent + 1} key={child.name} />
          ) : (
            <FileEl file={child} indent={indent + 1} key={child.name} />
          ),
        )}
    </div>
  );
};

export default function FileExplorer() {
  const directory = useMemo(() => {
    return exampleData as Directory;
  }, []);

  return (
    <Card header='File Explorer' id='FileExplorer'>
      <section>
        <p>Click to view inside directory</p>
        <DirectoryEl directory={directory} indent={0} />
      </section>
    </Card>
  );
}
