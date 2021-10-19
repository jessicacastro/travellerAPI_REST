import { Request, Response } from 'express';

import { db } from '../firebase-admin';

async function getAccomodations(req: Request, res: Response): Promise<Response> {
  try {
    const accomodationsDB = await db.collection('accomodations').get();
    const accomodations: Array<Object> = []

    if (accomodationsDB.empty) {
      return res.status(200).json({ 
        message: "Não há carros para exibir"
      })
    }

    accomodationsDB.docs.forEach(car => {
      const dataCar = car.data();

      accomodations.push(dataCar);
    })

    return res.status(200).json(accomodations)

  } catch (error) {
    return res.json(error);
  }
}

async function createAccomodations(req: Request, res: Response): Promise<Response> {
  try {
    const { name, pathPicture } = req.body;

    const accomodation = {
      name,
      picture: pathPicture
    }

    await db.collection("accomodations").add(accomodation);

    return res.json(accomodation);
  } catch (error) {
    return res.json(error);
  }
}


export {
  getAccomodations,
  createAccomodations
}