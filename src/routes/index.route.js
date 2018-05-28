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
    let userId = req.params.id;
    if (isNaN(userId)) {
        res.json({ message: 'Invalid user ID'});
    }
    /* let indexList = Object.keys(_ratingsGroupedByUser);
    let index = indexList.findIndex(val => val === String(userId)); */
    let listRatings = _ratingsGroupedByUser[userId];
    
    if (listRatings === null) {
        res.json({ message: 'Invalid user Id!'});
    }
    let movieId = Object.keys(listRatings);
    
    const msg = {
        result: []
    };
    
    movieId.forEach(val => {
        var obj = {
            id: val,
            rating: listRatings[val].rating
        }
        msg.result.push(obj);
    });
    
    
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
        const { index, id, title } = getMovieIndexById(movies_in_list, val);
        var obj = {
            id: id,
            title: title,
            poster_path: movies_in_list[index].poster_path
        }
        msg.result.push(obj);
    });
    res.json(msg);
});

router.use('/linear-regression', linearRegressionRoutes);
router.use('/content-based', contentBasedRoutes);

export default router;