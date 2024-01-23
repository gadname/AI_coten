// components/HomePage.tsx
import { App } from './App' // Adjust the path according to your project structure
import styles from './HomePage.module.css';

const images = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: '/ai4.jpg'},
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: '/art1.png'   },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: '/art2.png'  },
  // Left
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0],url: '/art3.png'  },
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0],url: '/Ais.jpg' },
//   { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: '/ai8.jpg' },
//   // Right
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0],  url: '/ai6.jpg'},
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: '/ai7.jpg' },
//   { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: '/aicat.png' }
]

export default function HomePage() {
    return (
      <div className={styles.root}>
        <App images={images} />
      </div>
    );
}