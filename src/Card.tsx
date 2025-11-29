import { ReactNode } from 'react';
import './Card.scss';

interface HeaderProps {
  children: ReactNode;
}

const CardHeader = ({ children }: HeaderProps) => <h1 className='CardHeader'>{children}</h1>;

interface cardProps {
  id?: string;
  header?: string;
  children: ReactNode;
}

export default function Card({ id, header, children }: cardProps) {
  return (
    <section className='Card' id={id}>
      {header && <CardHeader>{header}</CardHeader>}
      <main>{children}</main>
    </section>
  );
}
