'use client';
import HomePage from '../components/HomePage';
import Header from '../components/Header';
import Robot from '../components/Robot';
function SomeComponent() {
  return (
    <div>
      <Header color="black" />
      <HomePage />
      <Robot />
      
      {/* Other components */}
    </div>
  );
}
export default SomeComponent;