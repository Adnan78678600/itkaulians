import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Vertex Shader: Standard full-screen quad
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader: Liquid Noise + Ordered Dithering
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // --- Noise Functions ---
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // --- Bayer Matrix (4x4) ---
  float bayer4x4(vec2 uv) {
    int x = int(mod(uv.x, 4.0));
    int y = int(mod(uv.y, 4.0));
    int index = y * 4 + x;
    
    // Ordered Dithering Matrix
    if (index == 0) return 0.0/16.0; if (index == 1) return 8.0/16.0; if (index == 2) return 2.0/16.0; if (index == 3) return 10.0/16.0;
    if (index == 4) return 12.0/16.0; if (index == 5) return 4.0/16.0; if (index == 6) return 14.0/16.0; if (index == 7) return 6.0/16.0;
    if (index == 8) return 3.0/16.0; if (index == 9) return 11.0/16.0; if (index == 10) return 1.0/16.0; if (index == 11) return 9.0/16.0;
    if (index == 12) return 15.0/16.0; if (index == 13) return 7.0/16.0; if (index == 14) return 13.0/16.0; return 5.0/16.0;
  }

  void main() {
    // 1. Create moving liquid noise
    float noise1 = snoise(vUv * 3.0 + uTime * 0.1);
    float noise2 = snoise(vUv * 6.0 - uTime * 0.15);
    float combined = (noise1 + noise2) * 0.5 + 0.5; // range 0.0 - 1.0

    // 2. Add a vignette/gradient for depth
    float dist = distance(vUv, vec2(0.5));
    combined -= dist * 0.5;

    // 3. Pixel Coordinate calculation for Dither
    vec2 pixelCoord = gl_FragCoord.xy;
    float ditherValue = bayer4x4(pixelCoord);

    // 4. Quantize based on dither threshold
    // Colors: Deep Space Black vs Electric Grey
    vec3 colorDark = vec3(0.05, 0.05, 0.07); // #0d0d12
    vec3 colorLight = vec3(0.2, 0.2, 0.25);  // #333340
    
    // We can introduce a subtle third accent color for highs
    vec3 colorAccent = vec3(0.25, 0.25, 0.35);

    vec3 finalColor;

    // Dither Logic
    if (combined < ditherValue) {
        finalColor = colorDark;
    } else if (combined < ditherValue + 0.3) {
        finalColor = colorLight;
    } else {
        finalColor = colorAccent;
    }

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const DitherBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default DitherBackground;
