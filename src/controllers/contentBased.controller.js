import { sliceAndDice }  from '../index';
import {predictWithContentBased,predictWithContentBasedUsingID} from '../strategies/contentBased';
import { getMovieIndexByTitle, getMovieIndexById } from '../strategies/common';
/**
 * POST: [/prediction]
 * JSON req: {
 *      "id": "1726"
 * }
 */
function predictBasedOnContent(req, res) {
    const _id = req.body.id;
    const contentBasedRecommendation = predictWithContentBasedUsingID(matrix, movies_in_list, _id);
    const msg = {
        prediction: []
    }
    const recommend = sliceAndDice(contentBasedRecommendation, movies_by_id, 10, true);

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
    predictBasedOnContent
}

