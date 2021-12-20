let balanceString = document.getElementById("userBalance");
let balanceDouble = Number(balanceString.innerText.substring(0, balanceString.innerText.length - 1));
let currentBetSize = document.getElementById("betSize").value;
let permissionForBet = true;
let betSizes = [
    0.0001,
    0.0002,
    0.001,
    0.002,
    0.01,
    0.02
];

(function ($) {

    // table
    (function () {
        "use strict"

        function getButtonCells(btn) {
            var cells = btn.data('cells');
            if (!cells || !cells.length) {
                cells = [];
                switch (btn.data('type')) {
                    case 'sector':
                        var nums = sectors[btn.data('sector')];
                        for (var i = 0, len = nums.length; i < len; i++) {
                            cells.push(table_nums[nums[i]]);
                        }
                        return cells;
                        break;
                    case 'num':
                    default:
                        var nums = String(btn.data('num')).split(',');
                        for (var i = 0, len = nums.length; i < len; i++) {
                            cells.push(table_nums[nums[i]]);
                        }
                        btn.data('cells', cells)
                        return btn.data('cells');
                        break;
                }
            }
            return cells;
        };

        // props
        var active = true,
            selectors = {
                roulette: '.roulette',
                num: '.num',
                sector: '.sector',
                table_btns: '.controlls .btn'
            },
            classes = {
                red: 'red',
                black: 'black',
                green: 'green',
                hover: 'hover'
            },
            numbers = {
                red: [],
                black: [],
                green: []
            },
            sectors = {
                '1': [], // 1st row
                '2': [], // 2nd row
                '3': [], // 3rd row
                '4': [], // 1st 12
                '5': [], // 2nd 12
                '6': [], // 3rd 12
                '7': [], // 1 to 18
                '8': [], // EVEN
                '9': [], // RED
                '10': [], // BLACK
                '11': [], // ODD
                '12': [], // 19 to 36
            },
            table_nums = {},
            table_sectors = {};

        // init
        $(selectors.num).each(function () {
            var $this = $(this),
                color,
                num = Number($this.text());
            // add to instances array
            table_nums[num] = $this;
            // add to colors array
            for (var color in numbers) {
                if ($this.hasClass(classes[color])) {
                    numbers[color].push(num);
                    $this.data('color', color);
                }
            }
        })

        $(selectors.sector).each(function () {
            var $this = $(this),
                color;
            if ($this.hasClass(classes.red)) {
                color = 'red';
            } else if ($this.hasClass(classes.black)) {
                color = 'black';
            } else {
                color = 'sector';
            }
            $this.data('color', color);
            table_sectors[$this.data('sector')] = $this;
        });

        // sort numbers
        for (var color in numbers) {
            numbers[color].sort(function (a, b) {
                return a - b;
            });
        }

        // populate sectors
        for (var i = 1; i <= 36; i++) {
            // 1st row, 2nd row, 3rd row
            switch (i % 3) {
                case 0:
                    sectors['1'].push(i);
                    break;
                case 1:
                    sectors['3'].push(i);
                    break;
                case 2:
                    sectors['2'].push(i);
                    break;
            }

            // 1st 12, 2nd 12, 3rd 12
            if (i <= 12) {
                sectors['4'].push(i);
            } else if (i <= 24) {
                sectors['5'].push(i);
            } else {
                sectors['6'].push(i);
            }

            // 1 to 18, 19 to 36
            if (i <= 18) {
                sectors['7'].push(i);
            } else {
                sectors['12'].push(i);
            }

            // ODD, EVEN
            if (i % 2) {
                sectors['11'].push(i);
            } else {
                sectors['8'].push(i);
            }

            if (numbers.red.indexOf(i) != -1) {
                sectors['9'].push(i);
            } else if (numbers.black.indexOf(i) != -1) {
                sectors['10'].push(i);
            }
        }

        // buttons
        var table_btns = $(selectors.table_btns).hover(
            function () {
                hovering = 1;
                if (active) {
                    var $this = $(this),
                        cells = getButtonCells($this);
                    for (var i = 0, len = cells.length; i < len; i++) {
                        cells[i].addClass(classes.hover);
                    }
                    var sector = $this.data('sector');
                    if (sector) {
                        table_sectors[sector].addClass(classes.hover);
                    }
                }
            },
            function () {
                hovering = 0;
                var $this = $(this),
                    cells = getButtonCells($this);
                for (var i = 0, len = cells.length; i < len; i++) {
                    cells[i].removeClass(classes.hover);
                }
                var sector = $this.data('sector');
                if (sector) {
                    table_sectors[sector].removeClass(classes.hover);
                }
            }
        ).mousedown(function (e) {
            var numbers = [];
            if (typeof $(this).data('sector') != 'undefined') {
                console.log("SECTOR " + $(this).data('sector'));

                if (e.button == 2) ChangeBet(36 + $(this).data('sector'), -1);
                else ChangeBet(36 + $(this).data('sector'), +1);
            } else {
                numbers = $(this).data('num');

                if (typeof numbers.length === 'undefined') numbers = [numbers];
                else numbers = numbers.split(',');

                if (e.button == 2) for (var i = 0; i < numbers.length; i++) ChangeBet(numbers[i], -1);
                else for (var i = 0; i < numbers.length; i++) ChangeBet(numbers[i], +1);
            }
        });
    })();

    document.oncontextmenu = function () {
        if (hovering) return false;
    };

})(jQuery);


var squares = new Array(48);
var divs = document.getElementsByTagName("div");
for (var i = 0; i < divs.length; i++) {
    var attr = divs[i].getAttribute("data-num");
    if (attr == null) {
        attr = divs[i].getAttribute("data-sector");
        if (attr == null) continue;
        var index = 36 + parseInt(attr);

        var rekt = divs[i].getBoundingClientRect();
        squares[index] = new Array(2);
        squares[index][1] = rekt.top + 10;
        squares[index][0] = rekt.left + 16;
    } else {
        if (attr.indexOf(',') != -1) continue;
        var rekt = divs[i].getBoundingClientRect();
        squares[attr] = new Array(2);
        squares[attr][1] = rekt.top + 10;
        squares[attr][0] = rekt.left + 16;
    }
}

function UpdateBets() {
    let currentBetsDiv = document.getElementById("bets");
    currentBetSize = document.getElementById("betSize").value;
    currentBetsDiv.classList.add("summary");
    currentBetsDiv.innerHTML = '';
    for (let i = 37; i < bets.length; i++)
        if (bets[i] > 0)
            currentBetsDiv.innerHTML += sectors[i - 37] + ": " + (bets[i] * currentBetSize).toFixed(2) + "<br>";
    for (let i = 0; i < 37; i++)
        if (bets[i] > 0)
            currentBetsDiv.innerHTML += "Number " + i + ": " + (bets[i] * currentBetSize).toFixed(2) + "<br>";
}

function Reset() {
    for (let i = 0; i < bets.length; i++) {
        bets[i] = 0;
        if (chips[i] != null)
            for (let j = 0; chips[i].length > 0; j++)
                document.body.removeChild(chips[i].pop());
    }
    let summaryDiv = document.getElementById("summary");
    summaryDiv.innerText = "";
    UpdateBets();
    UpdateBalance();
}

function getCurrentBets() {
    let betsSum = 0;
    for (let i = 0; i < bets.length; i++) {
        betsSum += bets[i];
    }
    return betsSum;
}

function rInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let chips = new Array(48);

function ChangeBet(id, amount) {
    if (!permissionForBet) {
        console.log("bets are locked!");
        return;
    }

    currentBetSize = document.getElementById("betSize").value;
    if (Number(currentBetSize) === 0){
        console.log("bet cannot be 0");
        return;
    }

    if (Number(getCurrentBets() * currentBetSize) + Number(currentBetSize) > balanceDouble){
        console.log("not enough money");
        return;
    }

    if (amount > 0) {
        let img = document.createElement('img');
        img.src = "https://image.flaticon.com/icons/png/128/138/138528.png";
        img.style.zIndex = "0";
        img.style.position = "absolute";

        let rX = rInt(-16, 16);
        let rY = rInt(-16, 16);

        img.style.left = (squares[id][0] + rX) + "px";
        img.style.top = (squares[id][1] + rY) + "px";

        img.style.width = "20px";
        img.style.pointerEvents = "none";

        document.body.appendChild(img);

        if (chips[id] == null) chips[id] = new Array(0);
        chips[id].push(img);
    }
    if (amount < 0 && chips[id] != null && chips[id].length > 0) document.body.removeChild(chips[id].pop());

    bets[id] += amount;
    if (bets[id] < 0) {
        bets[id] = 0;
    }
    UpdateBets();
    UpdateBalance();
    updateSummary();
}

function updateSummary() {
    let summaryBets = getCurrentBets();
    let summaryDiv = document.getElementById("summary");
    if (summaryBets === 0) {
        summaryDiv.innerText = "";
    } else {
        currentBetSize = document.getElementById("betSize").value;
        summaryDiv.innerText = "Summary bets: " + (summaryBets * currentBetSize).toFixed(2);
    }
}

function UpdateBalance() {
    /*let balanceDiv = document.getElementById("balance");
    balanceDiv.innerHTML = "Balance: " + balance.toFixed(2) + " ETH";
    let currentBets = getCurrentBets();
    if (currentBets > 0) {
        balanceDiv.innerHTML += " (" + (currentBets * currentBetSize).toFixed(2) + ")";
    }*/
}

let sectors = [
    "3rd column",
    "2nd column",
    "1st column",
    "1st 12",
    "2nd 12",
    "3rd 12",
    "1 to 18",
    "Even",
    "Red",
    "Black",
    "Odd",
    "19 to 36"
];

let hovering = 0;
let bets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let sectorMultipliers = [
    [0, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3],//3rd column
    [0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0],//2nd column
    [0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0],//1st column
    [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//1st 12
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//2nd 12
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],//3rd 12
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//1 to 18
    [0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2],//even
    [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 2],//Red
    [0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0],//Black
    [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0],//odd
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2] //19 to 36
];

var historys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var red = 0;
var green = 0;
var black = 0;
var spinTime = 5;
var rolling = false;
var timerDiv = document.getElementById("timer");
var balDiv = document.getElementById("bal");
var out = document.getElementById("out");
var timer = 0;

function roll(c) {
    if (rolling == false) {
        permissionForBet = false;
        rolling = true;
        var scroll = document.getElementById("scroll");

        var x = Math.floor(Math.random() * (36 + 1));

        let bet = 0;
        for (let i = 0; i < bets.length; i++) {
            if (bets[i] !== 0) {
                bet += bets[i];
            }
        }
        currentBetSize = document.getElementById("betSize").value;
        bet *= currentBetSize;

        let win = 0;
        if (bets[x] !== 0) {
            win += bets[x] * 36;
        }
        for (let i = 37; i < bets.length; i++) {
            if (bets[i] !== 0) {
                win += bets[i] * sectorMultipliers[i - 37][x];
            }
        }

        win *= currentBetSize;
        win -= bet;

        let inactive;

        if (getCurrentBets() !== 0) {
            if (win < 0) {
                out.innerHTML = "IT'S " + x + ", You lost " + win + "$";
            } else {
                out.innerHTML = "IT'S " + x + ", You won " + win + "$";
            }
            inactive = false;
        } else {
            out.innerHTML = "IT'S " + x;
            inactive = true;
        }

        historys.splice(0, 0, x);

        scroll.style.transition = "margin " + spinTime + "s ease";
        scroll.style.marginLeft = "calc(250px - 25px - (1850px * 6) - (50px * " + x + "))";

        setTimeout(function () {
            scroll.style.transition = "margin 0s ease";
            scroll.style.marginLeft = "calc(250px - 25px - (1850px * 1) - (50px * " + x + "))";
            rolling = false;
        }, spinTime * 1000);
        timerDiv.style.width = "100%";
        timerDiv.style.opacity = "0";
        setTimeout(function () {
            timerDiv.style.width = "0%";
        }, 1000);
        setTimeout(function () {
            if (!inactive){
                balanceDouble += win;

                var balanceAJAX = {
                    win: win,
                    number: x
                }

                var xhr = new XMLHttpRequest();
                xhr.open("PATCH", "http://localhost:8080/api/user/" + document.getElementById("userLogin").innerText);

                xhr.addEventListener("load", function () {
                    balanceString.innerText = balanceDouble.toFixed(2) + '$';
                });

                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(balanceAJAX));

                UpdateBalance();
                Reset();
            }
        }, 4000);
        setTimeout(function () {
            out.style.opacity = "1";
            out.style.animation = "out .5s ease-out forwards";
        }, 5000);
        setTimeout(function () {
            out.style.opacity = "0";
        }, 7000);
        setTimeout(function () {
            out.style.animation = "";
            printHistory();
            permissionForBet = true;
        }, 7400);

    }
}

function loops() {
    timerDiv.style.width = "0%";
    timerDiv.style.opacity = "1";
    setTimeout(function () {
        timerDiv.style.width = "100%"
    }, 1);
    setTimeout(roll, 5000);
}

function printHistory() {
    if (historys.length == 12) {
        historys.pop();
    }
    document.getElementById("h").innerHTML = "";
    for (i = 0; i < historys.length; i++) {
        document.getElementById("h").innerHTML += "<div class='history-box " + historyColours(historys[i]) + "'>" + historys[i] + "</div>";
    }
}

let blacks = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

function historyColours(c) {
    if (c === 0) {
        return "green";
    }
    if (blacks.includes(c)){
        return "black";
    } else {
        return "red";
    }
}

printHistory();
loops();
setInterval(loops, 12000);