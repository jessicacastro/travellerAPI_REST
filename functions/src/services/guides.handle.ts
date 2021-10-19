import { Request, Response } from 'express';

import { db } from '../firebase-admin';

async function createGuides(req: Request, res: Response): Promise<Response> {
  try {
    const { typeName, description } = req.body;

    const guide = {
      typeName,
      description
    }

    await (await db.collection("guides").add(guide)).collection("locations");

    return res.json(guide);
  } catch (error) {
    return res.json(error);
  }
}

async function getGuides(req: Request, res: Response): Promise<Response> {
  try {
    const guidesDB = await db.collection("guides").get();
    const guides: Array<Object> = []

    if (guidesDB.empty) {
      return res.status(200).json({ 
        message: "Não há guias para exibir"
      })
    }

    guidesDB.docs.forEach(guide => {
      const { typeName, description } = guide.data();
      const id = guide.id;
      guides.push({typeName, description, id});
    })

    return res.status(200).json(guides);

  } catch (error) {
    return res.json(error);
  }
}

export {
  createGuides,
  getGuides
}