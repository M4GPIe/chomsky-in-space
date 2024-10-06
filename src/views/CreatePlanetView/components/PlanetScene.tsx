import React, { useEffect, useRef, useState } from 'react';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders'; // Import loaders to load .obj files
import ExoplanetRender from './ExoplanetRender';
import { Exoplanet } from '../../../models/planet';


interface PlanetSceneProps {
    exoplanet: Exoplanet;
}


const PlanetScene: React.FC<PlanetSceneProps> = ({ exoplanet }) => {
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
        light.intensity = 1.7;

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
                <ExoplanetRender
                    scene={scene}
                    position={new BABYLON.Vector3(0, 0, 0)}  // El planeta está en el centro
                    exoplanet={exoplanet}
                />
            )}
        </div>
    );
};

export default PlanetScene;