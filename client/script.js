const BASE_URL = 'http://localhost:8080/api/';
function poolVM() {
    var self = this;
    const colors = [
        '#D1BEB0',
        '#715AFF',
        '#5887FF',
        '#55C1FF',
        '#FF3C38',
    ];
    self.groups = ko.observable();
    self.games = ko.observable();
    self.dates = ko.observable();
    self.dragging = ko.observable();

    self.reset = (x) => {
        if (!auth()) return;
        fetch(BASE_URL + 'games/reset/' + x.id).then(x => x.json()).then(res => {
            self.get();
        });
    };

    self.drag = (x) => {
        self.dragging(x);
        x.loading(true);
    };

    self.drop = (x) => {
        if (!auth()) return;
        fetch(BASE_URL + 'games/' + self.dragging()?.id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(x),
        }).then(x => x.json()).then(res => {
            self.dragging().loading(false);
        });
        self.dragging(null);
        self.get();
    };

    self.win1 = (x) => {
        if (!auth()) return;
        if (new Date().getDate() < +x.game_date.split(' ')[1]) return;
        x.loading(true);
        fetch(BASE_URL + 'games/win1/' + x.id).then(x => x.json()).then(res => {
            self.get();
        });
    };

    self.win2 = (x) => {
        if (!auth()) return;
        if (new Date().getDate() < +x.game_date.split(' ')[1]) return;
        fetch(BASE_URL + 'games/win2/' + x.id).then(x => x.json()).then(res => {
            self.get();
        });
    };

    self.get = () => {
        fetch(BASE_URL + 'players').then(x => x.json()).then(resPlayers => {
            let games = [];
            fetch(BASE_URL + 'games').then(x => x.json()).then(resGames => {
                games = resGames;
                // dates = [...new Set(games.map(g => g.game_date))]
                dates = [12, 13, 14, 15, 16, 19, 20, 21, 22].map(x => 'Sep ' + x)
                    .sort()
                    .map(date => ({
                        game_date: date,
                        games: games.filter(game => game.game_date == date).map(x => ({
                            ...x,
                            loading: ko.observable(false),
                            p1score: ko.observable(x.p1score),
                            p2score: ko.observable(x.p2score),
                            color1: colors[+x.p1id[1] - 1],
                            color2: colors[+x.p2id[1] - 1],
                        })),
                    }));
                self.dates(dates);
                self.games(resGames);
                let groups = 'ABCD'.split('').map(grp => ({
                    name: grp,
                    players: resPlayers.filter(x => x.grp == grp).map((player, i) => ({
                        ...player,
                        group: player.grp,
                        pic: 'BS',
                        score: 0,
                        pos: i == 0 && player.win > 0 ? 'up' : 'stay',
                        color: colors[+player.id[1] - 1],
                        games: [1, 2, 3, 4, 5].map(x => games.filter(g => g.p1id == player.id || g.p2id == player.id).map(g => ({
                            ...g,
                            pid: g.p1id == player.id ? g.p2id : g.p1id,
                            pscore: g.p1id == player.id ? g.p1score : g.p2score,
                            oscore: g.p1id == player.id ? g.p2score : g.p1score,
                            score: g.p1id == player.id ? g.p1score - g.p2score : g.p2score - g.p1score,
                            visible: true,
                        })).find(y => y.pid == player.grp + x) || {
                            score: 0,
                            pscore: null,
                            oscore: null,
                            visible: false,
                            game_date: null,
                        }),
                    })),
                }));
                self.groups(groups);
            });
        });
    };
    self.get();
}

document.addEventListener('DOMContentLoaded', () => {
    const vm = new poolVM();
    ko.applyBindings(vm);
});

ko.bindingHandlers.dragstart = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        element.ondragstart = x => {
            valueAccessor()(viewModel);
        }
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    }
};

ko.bindingHandlers.drop = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        element.ondragover = x => {
            x.preventDefault();
        };
        element.ondrop = x => {
            console.log(valueAccessor()(viewModel));
        };
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    }
};

function login () {
    localStorage.setItem('auth', 1);
}

function logout () {
    localStorage.removeItem('auth', 0);
}

function auth () {
    return localStorage.getItem('auth');
}
