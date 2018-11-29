import './index.css';
//星空效果
import { starMove } from '../lib/star';
//获取视窗高度
var sHeight = document.querySelector('.sky').clientHeight;
var sWidth = document.querySelector('.sky').clientWidth;
//星空动画开始
starMove(sWidth, sHeight);
//清理动画class
function clearAnimation() {
    $(`#section3`).removeClass('scenceAnimation');
    $(`#section2`).removeClass('scenceAnimation');
    $(`#section1`).removeClass('scenceAnimation');
}
//滑动开始位置
var pageYStart;
//滑动距离
var pageDistance;
/******************section1**************************/
$('#section1,#sky-moutain').on('touchstart', function(e) {
    e.stopPropagation();
    e.preventDefault();
    var touches = e.touches[0];
    pageYStart = touches.pageY;
});

$('#section1,#sky-moutain').on('touchmove', function(e) {
    e.stopPropagation();
    e.preventDefault();
    clearAnimation();
    var touches = e.touches[0];
    pageDistance = touches.pageY - pageYStart;
    if (pageDistance > 0) {
        return;
    }

    $(`#section2`).css({
        transform: `translate3d(0px, ${pageDistance}px, 0px)`
    });
    //跟着移动
    $(`#section1`).css({
        transform: `translate3d(0px, ${pageDistance/2}px ,0px)`
    });

});

$('#section1,#sky-moutain').on('touchend', function(e) {
    e.stopPropagation();
    e.preventDefault();
    if (pageDistance > 0) {
        return;
    }
    var distance = Math.abs(pageDistance);
    if (distance > (sHeight * .2)) {
        $(`#land-penguin-run`).addClass('land-penguin-run');
        $(`#land-text`).addClass('text-aniamtion');

        $(`#section2`).css({
            transform: `translate3d(0px, ${-sHeight}px, 0px)`
        });
        $(`#section1`).css({
            transform: `translate3d(0px, ${-sHeight/2}px, 0px)`
        });
        $(`#section2`).addClass('scenceAnimation');
        $(`#section1`).addClass('scenceAnimation');
    } else {
        $(`#section2`).css({
            transform: `translate3d(0px, 0px, 0px)`
        });
        $(`#section1`).css({
            transform: `translate3d(0px, 0px, 0px)`
        });

        $(`#section2`).addClass('scenceAnimation');
        $(`#section1`).addClass('scenceAnimation');
    }
    //每次计算完需要重置pageDistance
    pageDistance = 0;
});

/******************section2**************************/

$('#section2').on('touchstart', function(e) {
    e.preventDefault();
    var touches = e.touches[0];
    pageYStart = touches.pageY;
});


$('#section2').on('touchmove', function(e) {
    e.preventDefault();
    clearAnimation();
    var touches = e.touches[0];
    pageDistance = touches.pageY - pageYStart;
    /**
     * 向下走
     * */
    if (pageDistance > 0) {
        $(`#section2`).css({
            transform: `translate3d(0px, ${-sHeight + pageDistance}px, 0px)`
        });

        $(`#section1`).css({
            transform: `translate3d(0px, ${(-sHeight + pageDistance)/2}px, 0px)`
        });
    }
    /**
     * 向上走
     */
    if (pageDistance < 0) {
        $(`#section3`).css({
            transform: `translate3d(0px, ${pageDistance}px, 0px)`
        });
        //跟着移动
        $(`#section2`).css({
            transform: `translate3d(0px, ${pageDistance/2 - sHeight}px, 0px)`
        });
    }
});


$('#section2').on('touchend', function(e) {
    $(`#ocean-text`).addClass('text-aniamtion');
    e.preventDefault();
    var distance = Math.abs(pageDistance);
    if (distance > (sHeight * .2)) {
        if (pageDistance > 0) {
            $(`#section2`).css({
                transform: `translate3d(0px, 0px, 0px)`
            });
            $(`#section1`).css({
                transform: `translate3d(0px, 0px, 0px)`
            });
            $(`#section2`).addClass('scenceAnimation');
            $(`#section1`).addClass('scenceAnimation');
        } else {
            //小船入场动画添加
            $(`#ocean-boat-move`).addClass('ocean-boat-move');
            $(`#section3`).css({
                transform: `translate3d(0px, ${-sHeight}px, 0px)`

            });
            $(`#section2`).css({
                transform: `translate3d(0px, ${-sHeight/2 - sHeight}px, 0px)`

            });
            $(`#section3`).addClass('scenceAnimation');
            $(`#section2`).addClass('scenceAnimation');
        }
    } else {
        if (pageDistance > 0) {
            $(`#section2`).css({
                transform: `translate3d(0px, ${-sHeight}px, 0px)`
            });
            $(`#section1`).css({
                transform: `translate3d(0px, ${-sHeight/2}px, 0px)`
            });
            $(`#section2`).addClass('scenceAnimation');
            $(`#section1`).addClass('scenceAnimation');
        } else {
            $(`#section3`).css({
                transform: `translate3d(0px, 0px, 0px)`
            });
            $(`#section2`).css({
                transform: `translate3d(0px, ${-sHeight}px, 0px)`
            });
            $(`#section3`).addClass('scenceAnimation');
            $(`#section2`).addClass('scenceAnimation');
        }
    }
    //每次计算完需要重置pageDistance
    pageDistance = 0;
});

/******************section3**************************/

//分享心意点击
$("#ocean-button").on("touchstart", e => {
    e.preventDefault()
    console.log("ocean-button")
})

$('#section3').on('touchstart', function(e) {
    e.preventDefault();
    var touches = e.touches[0];
    pageYStart = touches.pageY;
});

$('#section3').on('touchmove', function(e) {
    e.preventDefault();
    clearAnimation();
    var touches = e.touches[0];
    pageDistance = touches.pageY - pageYStart;

    if (pageDistance < 0) {
        return;
    }

    $(`#section3`).css({
        transform: `translate3d(0px, ${-sHeight + pageDistance}px, 0px)`
    });
    //跟着移动
    $(`#section2`).css({
        transform: `translate3d(0px, ${-sHeight-sHeight/2  + pageDistance/2}px, 0px)`
    });
});


$('#section3').on('touchend', function(e) {
    e.preventDefault();
    if (pageDistance < 0) {
        return;
    }
    var distance = Math.abs(pageDistance);
    if (distance > (sHeight * .2)) {
        $(`#section3`).css({
            transform: `translate3d(0px, 0px, 0px)`
        });
        $(`#section2`).css({
            transform: `translate3d(0px, ${-sHeight}px, 0px)`
        });
    } else {
        $(`#section3`).css({
            transform: `translate3d(0px, ${-sHeight}px, 0px)`
        });
        $(`#section2`).css({
            transform: `translate3d(0px, ${-sHeight/2 - sHeight}px, 0px)`
        });
    }
    $(`#section3`).addClass('scenceAnimation');
    $(`#section2`).addClass('scenceAnimation');
    //每次计算完需要重置pageDistance
    pageDistance = 0;
})