import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MouseBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer;
    let animationId;
    let geometry;
    let material;

    try {
      // --- Scene Setup ---
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      });

      renderer.setClearColor(0x030712, 1);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Force absolute full-viewport CSS to prevent clipping on zoom-out
      renderer.domElement.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 0 !important;
        pointer-events: none !important;
      `;

      containerRef.current.appendChild(renderer.domElement);

      // --- Interaction State ---
      const state = {
        mouse: new THREE.Vector2(0, 0),
        targetMouse: new THREE.Vector2(0, 0),
        lerp: 0.05
      };

      const handleMouseMove = (event) => {
        state.targetMouse.x = event.clientX / window.innerWidth;
        state.targetMouse.y = 1.0 - event.clientY / window.innerHeight;
      };

      window.addEventListener('mousemove', handleMouseMove);

      // --- Shader Material ---
      geometry = new THREE.PlaneGeometry(2, 2);
      material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uResolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight)
          }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec2 uResolution;
          varying vec2 vUv;

          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

          float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
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
            vec3 a0 = x - floor(x + 0.5);
            vec3 g = a0 * vec3(x0.x, x12.xz) + h * vec3(x0.y, x12.yw);
            return 130.0 * dot(m, g);
          }

          void main() {
            vec2 uv = vUv;
            float aspect = uResolution.x / uResolution.y;
            vec2 correctedUv = vec2(uv.x * aspect, uv.y);
            vec2 mouse = vec2(uMouse.x * aspect, uMouse.y);

            // Core dynamic time
            float t = uTime; 

            // Calculate distance to mouse
            vec2 dir = correctedUv - mouse;
            float dist = length(dir);
            
            // STATIC HIGH-CONTRAST LIQUID DISPLACEMENT:
            float radius = 1.0; 
            float strength = 0.15; // Lower strength prevents the "starburst" tearing
            
            // Smoothly falloff the displacement based on distance
            float displacementForce = smoothstep(radius, 0.0, dist);
            
            // Fix radial tearing: Instead of pure normalize which stretches to infinity,
            // we use dir directly multiplied by the force to create a smooth optical bulge
            vec2 warpedUv = correctedUv + dir * displacementForce * strength;
            
            // Apply fluid noise to the warped coordinates
            vec2 flowWarp = vec2(snoise(warpedUv * 1.5 + vec2(t * 0.2, t * 0.1)), 
                                 snoise(warpedUv * 1.5 - vec2(t * 0.3, t * 0.2)));
            
            // Continuous complex drift independent of mouse
            vec2 driftUv = warpedUv + flowWarp * 0.3 + vec2(t * 0.08, t * 0.05);
            
            // Layered noise for visual texture
            float n1 = snoise(driftUv * 1.5 - t * 0.2);
            float n2 = snoise(driftUv * 3.0 + t * 0.4) * 0.5;
            float n3 = snoise(driftUv * 6.0 - t * 0.6) * 0.25;
            
            float finalNoise = n1 + n2 + n3;

            // High contrast fluid with black, white and dark accents
            vec3 bg = vec3(0.0); // Pure black base
            vec3 color1 = vec3(0.04, 0.06, 0.1); // Very dark subtle blue/grey
            vec3 color2 = vec3(0.5, 0.5, 0.55); // Silver/grey for motion
            vec3 color3 = vec3(0.9, 0.9, 0.95); // Crisp white highlight
            
            // Mix fluid
            vec3 color = bg;
            color = mix(color, color1, smoothstep(-0.8, 0.8, finalNoise));
            color = mix(color, color2, smoothstep(0.0, 1.2, finalNoise + n2));
            color = mix(color, color3, smoothstep(0.4, 1.5, finalNoise + n3) * clamp(finalNoise, 0.0, 1.0));
            
            // Highlight the displaced ripple area slightly (toned down)
            color += color2 * displacementForce * 0.3;

            // Edge Vignette to keep focus center
            float vignette = length(uv - 0.5) * 1.3;
            color *= 1.0 - (vignette * 0.5);

            gl_FragColor = vec4(color, 1.0);
          }
        `
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const animate = (time) => {
        state.mouse.x += (state.targetMouse.x - state.mouse.x) * state.lerp;
        state.mouse.y += (state.targetMouse.y - state.mouse.y) * state.lerp;

        // Reduced speed multiplier for a slower, more graceful motion
        material.uniforms.uTime.value = time * 0.0012;
        material.uniforms.uMouse.value.copy(state.mouse);

        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };

      animate(0);

      const handleResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h);
        material.uniforms.uResolution.value.set(w, h);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        if (containerRef.current?.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    } catch (e) {
      console.error('WebGL Background initialization failed:', e);
      return () => { };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 bg-[#030712]"
      aria-hidden="true"
    />
  );
};

export default MouseBackground;
