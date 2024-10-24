import {Router} from "express";
import { createTrendingTopic, getTrendingTopics } from "../controllers/trending.controller.js";
const router = Router();

router.route('/create').post(createTrendingTopic);
router.route('/gettopics').get(getTrendingTopics);

export default router