"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const CITIES = [
  { name: "Москва", lat: 55.75, lng: 37.62 },
  { name: "Шанхай", lat: 31.23, lng: 121.47 },
  { name: "Дубай", lat: 25.2, lng: 55.27 },
  { name: "Нью-Йорк", lat: 40.71, lng: -74.0 },
  { name: "Франкфурт", lat: 50.11, lng: 8.68 },
  { name: "Сингапур", lat: 1.35, lng: 103.82 },
  { name: "Лондон", lat: 51.51, lng: -0.13 },
  { name: "Токио", lat: 35.68, lng: 139.69 },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Globe base — dark sphere
    const globeGeo = new THREE.SphereGeometry(2, 64, 64);
    const globeMat = new THREE.MeshPhongMaterial({
      color: 0x0a1628,
      transparent: true,
      opacity: 0.95,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // Wireframe overlay
    const wireGeo = new THREE.SphereGeometry(2.01, 32, 32);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0052cc,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wire);

    // Atmosphere glow
    const atmGeo = new THREE.SphereGeometry(2.15, 64, 64);
    const atmMat = new THREE.MeshPhongMaterial({
      color: 0x0052cc,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmGeo, atmMat);
    scene.add(atmosphere);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x4488ff, 1.2);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x0052cc, 0.8, 20);
    pointLight.position.set(-3, 2, 3);
    scene.add(pointLight);

    // City dots
    const cityMeshes: THREE.Mesh[] = [];
    const cityPositions = CITIES.map((c) => latLngToVector3(c.lat, c.lng, 2.04));

    cityPositions.forEach((pos) => {
      const dotGeo = new THREE.SphereGeometry(0.045, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x4da6ff });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      globe.add(dot);
      cityMeshes.push(dot);

      // Halo ring
      const haloGeo = new THREE.RingGeometry(0.06, 0.1, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x0052cc,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(pos);
      halo.lookAt(new THREE.Vector3(0, 0, 0));
      globe.add(halo);
    });

    // Arcs between cities
    const arcGroup = new THREE.Group();
    scene.add(arcGroup);

    const arcPairs = [
      [0, 1], [0, 2], [0, 4], [1, 5], [1, 7], [2, 3], [3, 4], [4, 6], [5, 7],
    ];

    arcPairs.forEach(([i, j]) => {
      const start = cityPositions[i];
      const end = cityPositions[j];
      const mid = start
        .clone()
        .add(end)
        .normalize()
        .multiplyScalar(2.8);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(80);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0x0052cc,
        transparent: true,
        opacity: 0.35,
      });
      const arc = new THREE.Line(arcGeo, arcMat);
      globe.add(arc);
    });

    // Mouse interaction
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let autoRotate = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotX = y * 0.3;
      targetRotY = x * 0.3;
    };

    mount.addEventListener("mousemove", onMouseMove);

    // Animation
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      autoRotate += 0.003;
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      globe.rotation.y = autoRotate + currentRotY;
      globe.rotation.x = currentRotX;

      // Pulse halo
      const t = Date.now() * 0.002;
      cityMeshes.forEach((dot, i) => {
        const scale = 1 + 0.2 * Math.sin(t + i * 0.8);
        dot.scale.setScalar(scale);
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      // Dispose geometries/materials
      globeGeo.dispose();
      globeMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      atmGeo.dispose();
      atmMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
