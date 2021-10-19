import { config } from 'firebase-functions';
import { initializeApp } from 'firebase-admin';

export const projectId = initializeApp(config().firebase).options.projectId;

export * from "firebase-functions"