export enum ExoplanetType{
    ROCKY='ROCKY',
    GASEOUS='GASEOUS'
}

export interface Exoplanet {
    _id?: string;
    solarSystem: string;
    name: string;
    radius: number;
    mass: number;
    type: ExoplanetType
    orbitalPeriod: number 
    luminosityOfStar: number
    distanceToStar: number
    minAltitude: number
    maxAltitude: number
    aqua: number
    surfaceColor: string;
    atmosphereColor: string;
}

export const Earth : Exoplanet = {
    _id:'earth',
    solarSystem:'solar',
    name:'earth',
    
    radius: 6371, // km
    mass:5972, // 1e21

    distanceToStar: 149.597870, // 1e6 km
    luminosityOfStar: 1,

    orbitalPeriod:365,
    type: ExoplanetType.ROCKY,

    minAltitude: 6371,
    maxAltitude: 6380,
    aqua: 0.2,

    surfaceColor: '#006400',
    atmosphereColor: '#87CEEB44' 
} 