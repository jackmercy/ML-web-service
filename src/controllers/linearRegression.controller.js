import { sliceAndDice }  from '../index';
import predictWithLinearRegression from '../strategies/linearRegression';
import { getMovieIndexByTitle, getMovieIndexById } from '../strategies/common';

/**
 * POST: [/prediction]
 * JSON req: {
 *      "userId": 12
 * }
 */
function predictBasedOnUser(req, res) {
    const userId = Number(req.body.userId);
    const moviesUserRating = _ratingsGroupedByUser[userId];
    const linearRegressionBasedRecommendation = predictWithLinearRegression(matrix, movies_in_list, moviesUserRating);
    
    const recommend = sliceAndDice(linearRegressionBasedRecommendation, movies_by_id, 20, true);

    const msg = {
        prediction: []
    }

    recommend.forEach(val => {
        const { index, id, title } = getMovieIndexById(movies_in_list, val.id);
        var obj = {
            id: id,
            title: title,
            poster_path: movies_in_list[index].poster_path,
            genres: movies_in_list[index].genres
        }
        msg.prediction.push(obj);
    });
    res.json(msg);
}

export default {
    predictBasedOnUser
}

