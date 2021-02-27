import { Request, Response } from 'express';
import { getCustomRepository, IsNull, Not } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class NpsController {
    /**
     *
     * Detractors -> 0 to 6
     * Passives -> 7 to 8
     * Promoters -> 9 to 10
     * Formula: NPS = (Promoters - Detractors)/Respondents*100%
     */

    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull()),
        });

        const detractors = surveysUsers.filter((survey) => survey.value >= 0 && survey.value <= 6).length;

        const passives = surveysUsers.filter((survey) => survey.value >= 7 && survey.value <= 8).length;

        const promoters = surveysUsers.filter((survey) => survey.value >= 9 && survey.value <= 10).length;

        const respondents = surveysUsers.length;

        const nps = Number((((promoters - detractors) / respondents) * 100).toFixed(2));

        return response.json({
            detractors,
            passives,
            promoters,
            respondents,
            nps,
        });
    }
}

export { NpsController };
