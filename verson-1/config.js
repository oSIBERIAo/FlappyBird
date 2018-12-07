// var config = {
//     // player_speed: 2,
//     // player_cooldown: 60,
//     // enemy_speed: 30, //
//     // enemy_cooldown: 240,
    
//     // bullet_speed: 1,
//     // enemybullet_speed: 12,
//     // enemy_number: 12,
//     frames_cooldown: 10,
    
//     // FlappyBird
//     backGround_bgspeed: {
//         _comment: '背景速度',
//         value: - 1,
//     },
//     Ground_bgspeed: {
//         _comment: 'xx速度',
//         value: - 1,
//     },
//     groundsY: {
//         _comment: 'xxx',
//         value: 500,
//     },
//     backGround_bgspeed: {
//         _comment: '背景速度',
//         value: - 1,
//     },
// }
var config = {
    // FlappyBird
    backGround_bgspeed: {
        _comment: '背景速度',
        value: - 1,
        min: -5,
        max: -1,
    },
    Ground_bgspeed: {
        _comment: 'xx速度',
        value: - 1,
        min: -4,
        max: 0,
    },
    groundsY: {
        _comment: 'xxx',
        value: 500,
        min: 300,
        max: 900,
    },
    frames_cooldown: {
        _comment: '冷却',
        value: 10,
        min: 0,
        max: 20,
    },
    pipe_space: {
        _comment: 'pipe_space',
        value: 180,
        min: 100,
        max: 220,
    },
}


var es = sel => document.querySelectorAll(sel)
var bindAll = function (sel, eventName, callback) {
    var selAll = es(sel)
    for (let i = 0; i < selAll.length; i++) {
        let input = selAll[i];
        input.addEventListener(eventName, function (event) {
            callback(event)
        })
    }
}
var insertControls = function (config) {
    let keys = Object.keys(config)
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let c = config[key]
        let t = `
        <div>
            <label>
                <input class="game-auto-slider" type="range" data-value="config.${key}.value" value="${c.value}" min="${c.min}"
                    max="${c.max}" />
                ${c._comment}：<span class="game-span"></span>
            </label>
        </div>
        `
        document.querySelector('#game_control').insertAdjacentHTML('beforeEnd', t)    
    }
}

var _main = function() {
    insertControls(config)
    bindAll('.game-auto-slider', 'input', function (event) {
        let target = event.target
        let v = target.value
        let bindValue = target.dataset.value
        // config[bindValue] = Number(v) //player_speed
        eval(bindValue + '=' + v)

        let span = target.closest('label').querySelector('.game-span')
        span.innerText = String(v)
    })
}

_main()
