import express from 'express';
import linearRegressionRoutes from './linearRegression.route';
import contentBasedRoutes from './contentBased.route';
import { getMovieIndexByTitle, getMovieIndexById } from '../strategies/common';

const router = express.Router(); // eslint-disable-line new-cap

/* Base route: [/api] */

/** GET [/health-check]
*  - Check service health */
router.get('/health-check', (req, res) =>
  res.send('Hello hooman!')
);

router.get('/get-ratings-grouped-by-user/:id', (req, res) => {
    let userId = Number(req.params.id);
    if (isNaN(userId)) {
        res.json({ message: 'Invalid user ID'});
    }
    let listRatings = _ratingsGroupedByUser[userId];
    console.log(listRatings);
    if (listRatings == null) {
        res.json({ message: 'Invalid user Id!'});
    }
    let movieId = Object.keys(listRatings);
    let result = [];
    movieId.forEach(val => {
        var obj = {
            movieId: val,
            rating: listRatings[val].rating
        }
        result.push(obj);
    });
    const msg = {
        result: result
    };
    res.json(msg);
});
/**
 * POST: []
 * JSON: {
 *      title: ['Iron Man', 'Batman']
 * }
 */
router.post('/get-movie-by-id', (req, res) => {
    const _idList = req.body.id;
    const msg = {
        result: []
    }
    _idList.forEach(val => {
        const { id, title } = getMovieIndexById(movies_in_list, val);
        var obj = {
            id: id,
            title: title
        }
        msg.result.push(obj);
    });
    res.json(msg);
});

router.use('/linear-regression', linearRegressionRoutes);
router.use('/content-based', contentBasedRoutes);

export default router;