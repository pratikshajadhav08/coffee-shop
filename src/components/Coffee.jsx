
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Coffee(props) {
  const { nodes, materials } = useGLTF('/coffee.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[2.851, 0, -0.512]} rotation={[-Math.PI / 2, 0, 0.566]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['Sphere001_Material_#28_0'].geometry}
            material={materials.Material_28}
            position={[0.335, 38.27, -6.541]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['Line001_Material_#29_0'].geometry}
            material={materials.Material_29}
            position={[0, 21.822, 33.972]}
            rotation={[0, -Math.PI / 2, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['Cylinder001_Material_#30_0'].geometry}
            material={materials.Material_30}
            position={[0.546, 0, -7.661]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['Object001_Material_#26_0'].geometry}
            material={materials.Material_26}
            position={[0.335, 38.27, -6.541]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/coffee.glb')
