function isValidRegion(region) {
    const valid_regions = ['br', 'eune', 'euw', 'jp', 'kr', 'lan', 'las', 'na', 'oce', 'ru', 'tr'];
    return valid_regions.includes(region.toLowerCase());
}

function formatRegion(region) {
    region = region.toLowerCase();
    switch (region) {
        case 'br':
            return 'br1';
        case 'eune':
            return 'eun1';
        case 'euw':
            return 'euw1';
        case 'jp':
            return 'jp1';
        case 'kr':
            return 'kr';
        case 'lan':
            return 'la1';
        case 'las':
            return 'la2';
        case 'na':
            return 'na1';
        case 'oce':
            return 'oc1';
        case 'ru':
            return 'ru';
        case 'tr':
            return 'tr1';
    }
}

function sortRank(users) {
    const ranks = ['Unranked 0', 'IRON IV', 'IRON III', 'IRON II', 'IRON I',
        'BRONZE IV', 'BRONZE III', 'BRONZE II', 'BRONZE I',
        'SILVER IV', 'SILVER III', 'SILVER II', 'SILVER I',
        'GOLD IV', 'GOLD III', 'GOLD II', 'GOLD I',
        'PLATINUM IV', 'PLATINUM III', 'PLATINUM II', 'PLATINUM I',
        'DIAMOND IV', 'DIAMOND III', 'DIAMOND II', 'DIAMOND I',
        'MASTER I', 'GRANDMASTER I', 'CHALLENGER I'];
    for (var key in users) {
        users[key].leaderboardRank = ranks.indexOf(users[key].SOLO_rank);
    }
    users = Object.keys(users).sort(function (a, b) {
        return users[b].leaderboardRank - users[a].leaderboardRank;
    }).reduce(function (result, key) {
        result[key] = users[key];
        return result;
    }, {});
    return users;
}

module.exports = { isValidRegion, formatRegion, sortRank };