export enum ExoplanetType{
    ROCKY='ROCKY',
    GASEOUS='GASEOUS'
}

export interface Exoplanet {
    _id?: string,
    solarSystem: string,
    name: string,
    radius: number,
    mass: number,
    type: ExoplanetType,
    orbitalPeriod: number, 
    luminosityOfStar: number,
    distanceToStar: number
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
    type: ExoplanetType.ROCKY
} 