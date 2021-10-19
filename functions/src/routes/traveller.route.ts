import { Router } from 'express';
import { createAccomodations, getAccomodations } from '../services/accomodations.handle';
import { getCars, createCars } from '../services/cars.handle';
import { createGuides, getGuides } from '../services/guides.handle';
import { createLocations, getLocations } from '../services/locations.handle';

const router: Router = Router();

router.get('/cars', getCars);
router.post('/cars', createCars);

router.get('/accomodations', getAccomodations);
router.post('/accomodations', createAccomodations);

router.post('/guides', createGuides);
router.get('/guides', getGuides);

router.post('/locations', createLocations); // Mandar um guideId
router.get('/locations', getLocations); // Mandar um guideId

export default router;