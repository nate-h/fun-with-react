import React, { useState } from 'react';
import clsx from 'clsx';
import Card from '../Card';
import './WordDefinition.scss';

export default function WordDefinition() {
  return (
    <Card header='WordDefinition'>
      <section className='WordDefinition'>
        <p>Word Definition!</p>
      </section>
    </Card>
  );
}
