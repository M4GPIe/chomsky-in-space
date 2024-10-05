import React, { useEffect, useRef, useState } from 'react';
import * as BABYLON from '@babylonjs/core';
import ExoplanetRender from './ExoplanetRender';

const PlanetScene: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [scene, setScene] = useState<BABYLON.Scene | null>(null);
    const [time, setTime] = useState(0);  // Para controlar la órbita de la luna

    useEffect(() => {
        if (!canvasRef.current) return;

        const engine = new BABYLON.Engine(canvasRef.current, true);
        const newScene = new BABYLON.Scene(engine);
        setScene(newScene);

        // Cámara
        const camera = new BABYLON.ArcRotateCamera(
            'camera1',
            Math.PI / 2,
            Math.PI / 2.5,
            20,
            new BABYLON.Vector3(0, 0, 0),
            newScene
        );
        camera.attachControl(canvasRef.current, true);

        // Luz
        const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), newScene);
        light.intensity = 0.7;

        // Render loop
        engine.runRenderLoop(() => {
            newScene.render();
            setTime((prevTime) => prevTime + 0.01); // Incrementar el tiempo
        });

        // Resize listener
        window.addEventListener('resize', () => {
            engine.resize();
        });

        return () => {
            engine.dispose();
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
            {scene && (
                <>
                    {/* Planeta principal que rota sobre su propio eje */}
                    <ExoplanetRender
                        scene={scene}
                        position={new BABYLON.Vector3(0, 0, 0)}  // El planeta está en el centro
                        diameter={3}
                        color={new BABYLON.Color3(0.2, 0.5, 0.8)}
                        name="Planet1"
                        rotationSpeed={0.01}  // Velocidad de rotación más rápida
                    />

                    {/* Luna en órbita y que también rota sobre su propio eje */}
                    <ExoplanetRender
                        scene={scene}
                        position={new BABYLON.Vector3(5 * Math.cos(time), 0, 5 * Math.sin(time))}  // Posición de la luna con respecto al tiempo
                        diameter={1}
                        color={new BABYLON.Color3(0.8, 0.3, 0.2)}
                        name="Moon1"
                        rotationSpeed={0.02}  // Velocidad de rotación de la luna
                    />
                </>
            )}
        </div>
    );
};

export default PlanetScene;
