import React from 'react';

// BOOTSTRAP COMPONENTS
import clsx from 'clsx';
import { Badge, Card as BootstrapCard } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Card from 'parts/card/Card';
import Sprite from 'core/tools/Sprite';

// STYLES
import styles from './card.module.scss';

// MAIN COMPONENT
const SectionCard = ({ number, title, body, completed }) => {
  return (
    <div className="position-relative">
      <div id={number} className={clsx('position-absolute', styles.anchor)} />
      <Card
        header={<Header number={number} title={title} completed={completed} />} //
        body={body}
        className={styles.card}
      />
    </div>
  );
};

// EXPORT
export default SectionCard;

function Header({ number, title, completed }) {
  return (
    <div className="d-flex align-items-center w-100">
      <Badge className={clsx('mr-3', styles.badge)}>{number}</Badge>
      {completed ? <Sprite use="check-circle" fill="green" className="mr-2" /> : null}
      <BootstrapCard.Title as="h3" className="m-0">
        {title}
      </BootstrapCard.Title>
      {completed ? (
        <Button.Link
          label="Next"
          icon="arrow-down"
          href={`#${number + 1}`}
          className="ml-auto text-green"
          disabled={false}
        />
      ) : null}
    </div>
  );
}
