'use client';

import styles from './Background.module.css';

interface DarkVeilProps {
  children?: React.ReactNode;
}

export default function DarkVeil({ 
  children, 
}: DarkVeilProps) {
  return (
    <div className={`${styles.container}`}>
      <div className={styles.background}>
        <div className={styles.gradientOverlay1} />
        <div className={styles.gradientOverlay2} />
        <div className={styles.gradientOverlay3} />
        <div className={styles.veilEffect} />
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}