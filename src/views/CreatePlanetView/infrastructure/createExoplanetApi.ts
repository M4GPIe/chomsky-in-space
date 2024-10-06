import axios from "axios";
import { Exoplanet } from "../../../models/planet";

export const createExoplanet = async (exoplanet: Exoplanet) => {
  try {
    const response = await axios.post('http://localhost:3000/exoplanet', exoplanet);
    console.log('Exoplanet created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating exoplanet:', error);
  }

  return null;
}
