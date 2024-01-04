'use client'

// 壁
const Wall = () => {
  return (
    <mesh receiveShadow position={[0, 2, 0]} scale={[8, 4, 4]}>
      {/* Geometry */}
      <planeGeometry />
      {/* Material */}
      <meshStandardMaterial color="gray" metalness={0.1} roughness={1} />
    </mesh>
  )
}

export default Wall
