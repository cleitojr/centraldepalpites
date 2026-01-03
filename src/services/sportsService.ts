export interface League {
    id: number;
    name: string;
    country: string;
}

export interface Match {
    id: number;
    homeTeam: string;
    awayTeam: string;
    league: string;
    utcDate: string;
}

// Using football-data.org (Free Tier allows top 12 leagues)
const API_URL = 'https://api.football-data.org/v4';
const API_KEY = 'YOUR_FOOTBALL_DATA_API_KEY'; // This shouldIdeally be in an Edge Function for real production

export const sportsService = {
    // List of common leagues for the dropdown
    getLeagues(): League[] {
        return [
            { id: 2013, name: 'Brasileirão Série A', country: 'Brazil' },
            { id: 2021, name: 'Premier League', country: 'England' },
            { id: 2014, name: 'La Liga', country: 'Spain' },
            { id: 2019, name: 'Serie A', country: 'Italy' },
            { id: 2002, name: 'Bundesliga', country: 'Germany' },
            { id: 2015, name: 'Ligue 1', country: 'France' },
            { id: 2003, name: 'Eredivisie', country: 'Netherlands' },
            { id: 2001, name: 'Champions League', country: 'Europe' },
            { id: 2152, name: 'Copa Libertadores', country: 'South America' },
        ].sort((a, b) => a.name.localeCompare(b.name));
    },

    async getUpcomingMatches(leagueId?: number): Promise<Match[]> {
        // Since we want to provide a "Zero Setup" experience for the user first, 
        // we'll implement a mock fetcher if no key is provided, 
        // but the structure is ready for the real API.

        if (API_KEY === 'YOUR_FOOTBALL_DATA_API_KEY') {
            console.warn('Sports API Key not set. Using mock data.');
            return this.getMockMatches();
        }

        try {
            const endpoint = leagueId ? `/competitions/${leagueId}/matches` : '/matches';
            const response = await fetch(`${API_URL}${endpoint}?status=SCHEDULED`, {
                headers: { 'X-Auth-Token': API_KEY }
            });
            const data = await response.json();

            return data.matches.map((m: any) => ({
                id: m.id,
                homeTeam: m.homeTeam.name,
                awayTeam: m.awayTeam.name,
                league: m.competition.name,
                utcDate: m.utcDate
            }));
        } catch (error) {
            console.error('Error fetching matches:', error);
            return this.getMockMatches();
        }
    },

    getMockMatches(): Match[] {
        return [
            { id: 1, homeTeam: 'Flamengo', awayTeam: 'Palmeiras', league: 'Brasileirão Série A', utcDate: new Date(Date.now() + 86400000).toISOString() },
            { id: 2, homeTeam: 'Real Madrid', awayTeam: 'Barcelona', league: 'La Liga', utcDate: new Date(Date.now() + 172800000).toISOString() },
            { id: 3, homeTeam: 'Manchester City', awayTeam: 'Liverpool', league: 'Premier League', utcDate: new Date(Date.now() + 259200000).toISOString() },
            { id: 4, homeTeam: 'Bayern Munich', awayTeam: 'Dortmund', league: 'Bundesliga', utcDate: new Date(Date.now() + 345600000).toISOString() },
            { id: 5, homeTeam: 'PSG', awayTeam: 'Marseille', league: 'Ligue 1', utcDate: new Date(Date.now() + 432000000).toISOString() },
        ];
    }
};
