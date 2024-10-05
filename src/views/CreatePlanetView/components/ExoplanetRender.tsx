import React, { useEffect } from 'react';
import * as BABYLON from '@babylonjs/core';

interface ExoplanetRenderProps {
    scene: BABYLON.Scene;
    position: BABYLON.Vector3;
    diameter: number;
    color: BABYLON.Color3;
    name: string;
    rotationSpeed?: number;  // Velocidad opcional de rotación
}

const ExoplanetRender: React.FC<ExoplanetRenderProps> = ({ scene, position, diameter, color, name, rotationSpeed = 0.005 }) => {
    useEffect(() => {
        // Crear el planeta (una esfera)
        const planetMaterial = new BABYLON.PBRMaterial(`${name}-material`, scene);
        planetMaterial.albedoColor = color;
        planetMaterial.roughness = 0.5;  // Ajuste de rugosidad

        const planet = BABYLON.MeshBuilder.CreateSphere(name, { diameter, segments: 32 }, scene);
        planet.material = planetMaterial;
        planet.position = position;

        // Rotar el planeta sobre su propio eje
        scene.onBeforeRenderObservable.add(() => {
            planet.rotation.y += rotationSpeed;  // Rotación en el eje Y (cambiar a otros ejes si es necesario)
        });

        return () => {
            planet.dispose(); // Limpieza cuando el componente se desmonta
        };
    }, [scene, position, diameter, color, name, rotationSpeed]);

    return null;
};

export default ExoplanetRender;
