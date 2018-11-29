var cvs = document.getElementById('star');
var ctx = cvs.getContext('2d');

function starMove(sWidth, sHeight) {
    //画布初始化
    cvs.width = sWidth;
    cvs.height = sHeight / 2;
    var WINDOW_WIDTH = sWidth;
    var WINDOW_HEIGHT = sHeight / 2;
    var num = 40;
    var stars = [];
    var rnd;
    //产生星星
    addStar();
    //星星闪动
    setInterval(render, 30);
    rnd = Math.abs(Math.floor(Math.random() * stars.length - 1));

    //渲染星星
    function render() {
        ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        for (var i = 0; i < num; i++) {
            var star = stars[i];
            star.alpha += star.ra;
            star.r = 1;
            //流星
            if (i == rnd) {
                star.alpha = .5;
                star.vx = -40;
                star.vy = 40;
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255,255,255,' + star.alpha + ')';
                ctx.lineWidth = star.r;
                //删除圆
                ctx.arc(star.x, star.y, 0, 0, Math.PI * 2, true);
                ctx.fill();
                //创建横向渐变颜色,起点坐标至终点坐标
                var line = ctx.createLinearGradient(star.x, star.y, star.x + star.vx, star.y + star.vy);
                //分段设置颜色
                var colorDeep = star.colorDeep;
                line.addColorStop(0, `rgba(255,255,255,0)`);
                line.addColorStop(0.3, `rgba(255,255,255,${.5*colorDeep})`);
                line.addColorStop(0.6, `rgba(255,255,255,${1*colorDeep}`);
                ctx.strokeStyle = line;
                //test
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(star.x + star.vx, star.y + star.vy);
                ctx.stroke();
                ctx.closePath();

                star.x = star.x + star.vx / 10;
                star.y = star.y + star.vy / 10;

                if (!(star.x > 0 && star.y > 0)) {
                    // rnd = Math.abs(Math.floor(Math.random() * stars.length - 1));
                    star.x = Math.round(Math.random() * WINDOW_WIDTH);
                    star.y = Math.round(Math.random() * WINDOW_HEIGHT);
                }
            }
            //非流星
            if (i != rnd) {
                star.x += star.vx;
                star.y += star.vy;
                if (star.alpha <= 0) {
                    star.alpha = 0;
                    star.ra = -star.ra;
                    star.vx = Math.random() * 0.2 - 0.1;
                    star.vy = Math.random() * 0.2 - 0.1;
                } else if (star.alpha > 1) {
                    star.alpha = 1;
                    star.ra = -star.ra
                }
                if (star.x >= WINDOW_WIDTH) {
                    star.x = 0;
                } else if (star.x < 0) {
                    star.x = WINDOW_WIDTH;
                    star.vx = Math.random() * 0.2 - 0.1;
                    star.vy = Math.random() * 0.2 - 0.1;
                }
                if (star.y >= WINDOW_HEIGHT) {
                    star.y = 0;
                    star.vy = Math.random() * 0.2 - 0.1;
                    star.vx = Math.random() * 0.2 - 0.1;
                } else if (star.y < 0) {
                    star.y = WINDOW_HEIGHT;
                }
                ctx.beginPath();
                var bg = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r);
                bg.addColorStop(0, 'rgba(255,255,255,' + star.alpha + ')')
                bg.addColorStop(1, 'rgba(255,255,255,0)')
                ctx.fillStyle = bg;
                ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.closePath();
            }

        }
    }
    //初始化星星
    function addStar() {
        for (var i = 0; i < num; i++) {
            var aStar = {
                x: Math.round(Math.random() * WINDOW_WIDTH),
                y: Math.round(Math.random() * WINDOW_HEIGHT),
                r: Math.random() * 4,
                ra: Math.random() * 0.05,
                alpha: Math.random(),
                vx: Math.random() * 0.2 - 0.1,
                vy: Math.random() * 0.2 - 0.1,
                colorDeep: Math.random()
            }
            stars.push(aStar);
        }
    }
}
export {
    starMove
}