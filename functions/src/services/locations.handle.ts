import { Request, Response } from 'express';

import { db } from '../firebase-admin';

async function createLocations(req: Request, res: Response): Promise<Response> {
  try {
    const { guideId, about, address, lat = null, long = null, name, observation, resume } = req.body;

    const location = { 
      about, 
      address, 
      lat,
      long,
      name, 
      observation, 
      resume 
    };

    await db.collection("guides").doc(guideId).collection("locations").add(location);

    return res.json(location);
  } catch (error) {
    return res.json(error);
  }
}

async function getLocations(req: Request, res: Response): Promise<Response> {
  try {
    const { guideId } = req.body;

    if (!guideId) {
      return res.status(401).json({ message: "Inserts a guide id to get a location" });
    }

    const guideRef = db.collection("guides").doc(guideId);

    const locationsDB = await guideRef.collection("locations").get();

    const locations: Array<Object> = []

    if (locationsDB.empty) {
      return res.status(200).json({ 
        message: "Não há guias para exibir"
      })
    }

    locationsDB.docs.forEach(location => {
      const { 
        about, 
        address, 
        lat,
        long,
        name, 
        observation, 
        resume  
      } = location.data();
      const id = location.id;

      locations.push({
        id,
        about, 
        address, 
        lat,
        long,
        name, 
        observation, 
        resume  
      });
    })

    return res.status(200).json(locations);

  } catch (error) {
    return res.json(error);
  }
}

export {
  createLocations,
  getLocations
}