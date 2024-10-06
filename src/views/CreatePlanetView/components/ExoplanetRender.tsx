import React, { useEffect } from 'react';
import * as BABYLON from '@babylonjs/core';
import { Exoplanet } from '../../../models/planet';

interface ExoplanetRenderProps {
    scene: BABYLON.Scene;
    position: BABYLON.Vector3;
    exoplanet: Exoplanet;
    rotationSpeed?: number; // Velocidad opcional de rotación
}

const ExoplanetRender: React.FC<ExoplanetRenderProps> = ({
    scene,
    position,
    exoplanet,
    rotationSpeed = 0.005,
}) => {
    useEffect(() => {
        // Crear el material del planeta

        let planet: BABYLON.AbstractMesh | null = null;

        // Importar la malla del planeta
        BABYLON.SceneLoader.ImportMesh(
            '', // No specific mesh name, load all meshes
            './assets/', // The path to the model
            'volcan.glb', // The model filename
            scene, // The scene to load the model into
            (meshes) => {
                if (meshes.length > 0) {
                    planet = meshes[0]; // Tomar la primera malla importada
                    planet.position = position;

                    // Ajustar la rotación y el escalado inicial de la malla
                    planet.rotation = new BABYLON.Vector3(0, Math.PI / 4, 0); // Rotate 45 degrees around Y-axis
                    planet.scaling = new BABYLON.Vector3(0.05 * exoplanet.radius / 6371, 0.05 * exoplanet.radius / 6371, 0.05 * exoplanet.radius / 6371); // Shrink the model

                    // Rotar el planeta sobre su propio eje con animación
                    scene.onBeforeRenderObservable.add(() => {
                         planet!.rotation.y += rotationSpeed;
                            const angle = performance.now() * rotationSpeed * 0.001; // Calcular ángulo en función del tiempo
                            planet!.position.x = Math.cos(angle);
                            planet!.position.z = Math.sin(angle);
                    });
                }
            },
            undefined, // onProgress callback (optional)
            (_, message, exception) => {
                console.error('Error loading .obj model:', message, exception);
            }
        );
        // Limpieza cuando el componente se desmonta
        return () => {
            if (planet) {
                planet.dispose();
            }
        };
    }, [exoplanet, rotationSpeed]);

    return null;
};

export default ExoplanetRender;
