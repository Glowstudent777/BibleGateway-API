import express, { Request, Response, Router } from 'express'
import axios from 'axios';
import * as cheerio from 'cheerio';

// Router
const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const baseURL = "https://www.biblegateway.com/reading-plans/verse-of-the-day/next";

    let version = req.query.version ??= "KJV";
    let URL = `${baseURL}?version=${version}`;

    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);

        let verse = $("#rp-passage-0-5121").text().split(' ').slice(1)[0];
        let pass = $(".rp-passage-display").text();

        return res.status(200).send({
            citation: pass,
            passage: verse

        })
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;