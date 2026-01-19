import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { skillNodes, categoryMetadata } from './skillData';
import { SkillNode as SkillNodeType, FilterCategory } from './types';

interface SkillNodeProps {
  skill: SkillNodeType;
  isHovered: boolean;
  isFiltered: boolean;
  isCategoryHighlighted: boolean;
  onHover: (skill: SkillNodeType | null) => void;
  onClick: (skill: SkillNodeType) => void;
}

const SkillNode: React.FC<SkillNodeProps> = ({
  skill,
  isHovered,
  isFiltered,
  isCategoryHighlighted,
  onHover,
  onClick
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Animate on hover
  useFrame(() => {
    if (meshRef.current) {
      const targetScale = isHovered ? 1.5 : (isCategoryHighlighted ? 1.2 : 1);
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  // Get color based on category
  const getColor = () => {
    if (isFiltered) return '#1a1a1a'; // Dimmed when filtered out
    if (isHovered || isCategoryHighlighted) return categoryMetadata[skill.category].color;
    return '#9ca3af'; // Default gray
  };

  // Size based on proficiency
  const baseSize = 0.1 + (skill.proficiency / 100) * 0.15;

  return (
    <mesh
      ref={meshRef}
      position={skill.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(skill);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(skill);
      }}
    >
      <sphereGeometry args={[baseSize, 16, 16]} />
      <meshStandardMaterial
        color={getColor()}
        emissive={getColor()}
        emissiveIntensity={isHovered || isCategoryHighlighted ? 0.8 : 0.2}
        roughness={0.4}
        metalness={0.6}
      />
    </mesh>
  );
};

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  isHighlighted: boolean;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({ start, end, isHighlighted }) => {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial
        color={isHighlighted ? '#22d3ee' : '#2a2a2a'}
        opacity={isHighlighted ? 0.6 : 0.15}
        transparent
        linewidth={isHighlighted ? 2 : 1}
      />
    </line>
  );
};

interface ConstellationSceneProps {
  filter: FilterCategory;
  hoveredSkill: SkillNodeType | null;
  onHover: (skill: SkillNodeType | null) => void;
  onClick: (skill: SkillNodeType) => void;
}

const ConstellationScene: React.FC<ConstellationSceneProps> = ({
  filter,
  hoveredSkill,
  onHover,
  onClick
}) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Auto-rotate slowly
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  // Filter nodes based on category
  const filteredNodes = filter === 'All'
    ? skillNodes
    : skillNodes.filter(node => node.category === filter);

  // Generate connection lines
  const connections: Array<{start: [number, number, number], end: [number, number, number], highlighted: boolean}> = [];
  skillNodes.forEach(skill => {
    skill.connections?.forEach(connectionId => {
      const connectedSkill = skillNodes.find(s => s.id === connectionId);
      if (connectedSkill) {
        const isHighlighted = hoveredSkill?.id === skill.id || hoveredSkill?.id === connectionId;
        connections.push({
          start: skill.position,
          end: connectedSkill.position,
          highlighted: isHighlighted
        });
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      {connections.map((conn, idx) => (
        <ConnectionLine
          key={`connection-${idx}`}
          start={conn.start}
          end={conn.end}
          isHighlighted={conn.highlighted}
        />
      ))}

      {/* Skill nodes */}
      {skillNodes.map(skill => {
        const isFiltered = filter !== 'All' && skill.category !== filter;
        const isCategoryHighlighted = filter !== 'All' && skill.category === filter;
        const isHovered = hoveredSkill?.id === skill.id;

        return (
          <SkillNode
            key={skill.id}
            skill={skill}
            isHovered={isHovered}
            isFiltered={isFiltered}
            isCategoryHighlighted={isCategoryHighlighted}
            onHover={onHover}
            onClick={onClick}
          />
        );
      })}
    </group>
  );
};

interface SkillConstellationProps {
  filter: FilterCategory;
  onSkillHover: (skill: SkillNodeType | null) => void;
  onSkillClick: (skill: SkillNodeType) => void;
}

export const SkillConstellation: React.FC<SkillConstellationProps> = ({
  filter,
  onSkillHover,
  onSkillClick
}) => {
  const [hoveredSkill, setHoveredSkill] = useState<SkillNodeType | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleHover = (skill: SkillNodeType | null) => {
    setHoveredSkill(skill);
    onSkillHover(skill);
  };

  return (
    <div className="w-full h-full">
      <Canvas
        dpr={isMobile ? 0.75 : 1}
        className="cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />

          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />

          {/* The 3D constellation */}
          <ConstellationScene
            filter={filter}
            hoveredSkill={hoveredSkill}
            onHover={handleHover}
            onClick={onSkillClick}
          />

          {/* Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={8}
            maxDistance={16}
            autoRotate={false}
            rotateSpeed={0.5}
          />

          {/* Bloom effect for glow (disable on mobile for performance) */}
          {!isMobile && (
            <EffectComposer>
              <Bloom
                intensity={0.5}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
              />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};
