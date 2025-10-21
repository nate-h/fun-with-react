import { ReactNode } from 'react';
import './Card.scss';

interface HeaderProps {
  children: ReactNode;
}

const CardHeader = ({ children }: HeaderProps) => <h1 className='CardHeader'>{children}</h1>;

const CardSubHeader = ({ children }: HeaderProps) => <h2 className='CardSubHeader'> {children}</h2>;

interface cardProps {
  id?: string;
  header?: string;
  subheader?: string;
  children: ReactNode;
}

export default function Card({ id, header, subheader, children }: cardProps) {
  return (
    <section className='Card' id={id}>
      {header && <CardHeader>{header}</CardHeader>}
      <main>{children}</main>
      {subheader && <CardSubHeader>{subheader}</CardSubHeader>}
    </section>
  );
}
