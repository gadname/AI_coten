// components/HomePage.tsx
import { Cpp } from './Cpp' // Adjust the path according to your project structure
import styles from './HomePage.module.css';

const images = [
    // Front
    { position: [0, 0, 1.5], rotation: [0, 0, 0], url: '/whitebox.jpg'},
  ]

export default function HomePage() {
    return (
      <div className={styles.root}>
        <Cpp images={images} />
      </div>
    );
}