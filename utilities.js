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
    var soloUsers = users;
    var flexUsers = users;
    // Sort Solo/Duo for SOLO_rank and or same rank sort by SOLO_leaguePoints
    for (var key in soloUsers) {
        soloUsers[key].leaderboardRank = ranks.indexOf(soloUsers[key].SOLO_rank);
    }
    soloUsers = Object.keys(soloUsers).sort(function (a, b) {
        if (soloUsers[b].leaderboardRank === soloUsers[a].leaderboardRank) {
            return soloUsers[b].SOLO_leaguePoints - soloUsers[a].SOLO_leaguePoints;
        }
        return flexUsers[b].leaderboardRank - flexUsers[a].leaderboardRank;
    }).reduce(function (result, key) {
        result[key] = soloUsers[key];
        return result;
    }, {});

    // Sort Flex for FLEX_rank and or same rank sort by FLEX_leaguePoints
    for (var key in flexUsers) {
        flexUsers[key].leaderboardRank = ranks.indexOf(flexUsers[key].FLEX_rank);
    }
    flexUsers = Object.keys(flexUsers).sort(function (a, b) {
        if (flexUsers[b].leaderboardRank === flexUsers[a].leaderboardRank) {
            return flexUsers[b].FLEX_leaguePoints - flexUsers[a].FLEX_leaguePoints;
        }
        return flexUsers[b].leaderboardRank - flexUsers[a].leaderboardRank;
    }).reduce(function (result, key) {
        result[key] = flexUsers[key];
        return result;
    }, {});

    var users = {
        solo: soloUsers,
        flex: flexUsers
    };
    //console.log(users);
    return users;
}

module.exports = { isValidRegion, formatRegion, sortRank };