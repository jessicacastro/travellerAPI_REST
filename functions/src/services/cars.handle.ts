import { Request, Response } from 'express';

import { db } from '../firebase-admin';

async function createCars(req: Request, res: Response): Promise<Response> {
  try {
    const { name, pathPicture } = req.body;

    const car = {
      name,
      picture: pathPicture
    }

    await db.collection("cars").add(car);

    return res.json(car);
  } catch (error) {
    return res.json(error);
  }
}

async function getCars(req: Request, res: Response): Promise<Response> {
  try {
    const carsDB = await db.collection('cars').get();
    const cars: Array<Object> = []

    if (carsDB.empty) {
      return res.status(200).json({ 
        message: "Não há carros para exibir"
      })
    }

    carsDB.docs.forEach(car => {
      const { name, picture } = car.data();
      const id = car.id;
      cars.push({name, picture, id});
    })

    return res.status(200).json(cars)

  } catch (error) {
    return res.json(error);
  }
}

export {
  createCars,
  getCars
}