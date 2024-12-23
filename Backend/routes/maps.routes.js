import express from "express";
import {
  getCoordinates,
  getDistancetime,
  getAutoCompleteSuggestions
} from "../controllers/map.controller.js";
import { authUser, authCaptain } from "../middlewares/auth.middleware.js";
import { query } from "express-validator";

const mapRouter = express.Router();
mapRouter.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getCoordinates
);
mapRouter.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authUser,
  getDistancetime
);
mapRouter.get('/get-suggestions', query('input').isString().isLength({ min: 3 }),
authUser,
getAutoCompleteSuggestions)
export default mapRouter;
