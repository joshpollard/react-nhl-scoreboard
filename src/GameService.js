import rp from 'request-promise';

class GameService {

    getTeams() {
        const teamsUrl = 'https://statsapi.web.nhl.com/api/v1/teams/';

        return rp(teamsUrl);
    }

    getGamesForDate(gameDate) {
        
        const scoresUrl = 'https://statsapi.web.nhl.com/api/v1/schedule?startDate=' + gameDate + '&endDate=' + gameDate + '&expand=schedule.linescore';

        return rp(scoresUrl);
    }


}

export default GameService;