// components/HomePage.tsx
import { App } from './App' // Adjust the path according to your project structure
import styles from './HomePage.module.css';

const images = [
    // Front
    { position: [0, 0, 1.5], rotation: [0, 0, 0], url: '/ai4.jpg'},
  ]

export default function HomePage() {
    return (
      <div className={styles.root}>
        <App images={images} />
      </div>
    );
}