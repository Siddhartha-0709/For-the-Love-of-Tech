import trendingModel from "../models/trending.model.js";

const createTrendingTopic = async (req, res) => {
    try {
        const {title, description, link} = req.body;
        const newTrendingTopic = new trendingModel({title, description, link});
        await newTrendingTopic.save();
        res.json({message: 'Trending Topic Created', newTrendingTopic}).status(200);

    } catch (error) {
        res.send(error).status(500);
    }
}

const getTrendingTopics = async (req, res) => {
    try {
        const trendingTopics = await trendingModel.find();
        res.send(trendingTopics).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
}

export {createTrendingTopic, getTrendingTopics}