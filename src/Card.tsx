import React from 'react';
import './Card.scss';

const CardHeader = (props: any) => <h1 className='CardHeader'>{props.children}</h1>;

const CardSubHeader = (props: any) => <h2 className='CardSubHeader'> {props.children}</h2>;

export default function Card(props: any) {
  return (
    <section className='Card' id={props.id}>
      {props.header && <CardHeader>{props.header}</CardHeader>}
      {props.subheader && <CardSubHeader>{props.subheader}</CardSubHeader>}
      <main>{props.children}</main>
    </section>
  );
}
