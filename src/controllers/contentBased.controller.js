import { sliceAndDice }  from '../index';
import {predictWithContentBased,predictWithContentBasedUsingID} from '../strategies/contentBased';
/**
 * POST: [/prediction]
 * JSON req: {
 *      "id": "1726"
 * }
 */
function predictBasedOnContent(req, res) {
    const _id = req.body.id;
    const contentBasedRecommendation = predictWithContentBasedUsingID(matrix, movies_in_list, _id);
    
    const result = sliceAndDice(contentBasedRecommendation, movies_by_id, 10, true);

    const msg = {
        prediction: result
    }
    res.json(msg);
}

export default {
    predictBasedOnContent
}

