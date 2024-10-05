import React, { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';

const PlanetScene: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const engine = new BABYLON.Engine(canvasRef.current, true);

        const createScene = () => {
            const scene = new BABYLON.Scene(engine);
            scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); // Fondo transparente (negro)

            // Crear la cámara
            const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2.5, 10, BABYLON.Vector3.Zero(), scene);
            camera.attachControl(canvasRef.current, true);

            // Crear la luz
            const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
            light.intensity = 0.7;

            // Crear la esfera que representa el exoplaneta
            const planet = BABYLON.MeshBuilder.CreateSphere("planet", { diameter: 2, segments: 32 }, scene);

            // Crear el material del planeta
            const planetMaterial = new BABYLON.StandardMaterial("planetMaterial", scene);

            
            // Añadir la textura difusa (color) desde la carpeta public
            const diffuseTexture = new BABYLON.Texture("/assets/ground/2k_earth_daymap.jpg", scene);
            planetMaterial.diffuseTexture = diffuseTexture;
            diffuseTexture.uScale = 1; 
            diffuseTexture.vScale = -1; // Invertir en Y
            planet.material = planetMaterial;

            // Rotación del planeta y nubes
            scene.onBeforeRenderObservable.add(() => {
                planet.rotation.y += 0.01;
            });

            return scene;
        };

        const scene = createScene();

        engine.runRenderLoop(() => {
            scene.render();
        });

        window.addEventListener("resize", () => {
            engine.resize();
        });

        return () => {
            engine.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100vh', display: 'block' }} />;
};

export default PlanetScene;
