import './index.css';

class SliderPage {
    constructor(el, direction, option) {
        this.current = 0; //当前页面索引
        this.startX; //手指起始点坐标 x
        this.startY; //手指起始点坐标 y
        this.width = el.parentNode.clientWidth; //滑屏宽度
        this.height = el.parentNode.clientHeight; //滑屏高度
        this.el = el; //滑屏对象
        this.direction = direction; //滑动方向
        this.move; //滑动距离
        this.option = option; //扩展配置项
        this.bindTouch();
        this.init();
    };

    //初始化
    init(i) {
        var { el } = this;
        var current = i ? el.children[i] : el.firstElementChild;
        //异常提示
        if (!current) {
            console.log('你还没有创建div呀，老铁！');
            return;
        };
        current.style.webkitTransform = 'translate3d(0,0,0)';

    };

    //每个slider page绑定touch事件
    bindTouch() {
        var that = this;
        'touchstart touchmove touchend'.split(' ').map(item => {
            that.el.addEventListener(item, that[item].bind(that), false);
        });
    };

    //获取当前所在页面对象
    getCurrent() {
        return this.el.children[this.current];
    };

    //touch 事件
    touchstart(e) {
        var touches = e.touches[0];
        this.startY = touches.pageY;
        this.startX = touches.pageX;
    };
    touchmove(e) {
        e.stopPropagation();
        e.preventDefault();
        //获取当前页面和上下级页面
        var current = this.getCurrent();
        var next = current.nextElementSibling;
        var prev = current.previousElementSibling;
        //获取当前移动距离
        var touches = e.touches[0];
        var moveY = touches.pageY - this.startY;
        var moveX = touches.pageX - this.startX;
        var baseDis = this.direction === 'Y' ? this.height : this.width;
        this.move = this.direction === 'Y' ? moveY : moveX;


        //第一屏不禁止下滑(右滑)
        if (current == this.el.firstElementChild && this.move > 0) {
            return;
        }
        //最后一屏禁止上滑(左滑)
        if (this.current === (this.el.childElementCount - 1) && this.move < 0) {
            return;
        }

        if (this.move < 0) {
            current && (this[`set${this.direction}`](current, this.move / 2));
            next && (this[`set${this.direction}`](next, this.move + baseDis));
        };

        if (this.move > 0) {
            current && (this[`set${this.direction}`](current, this.move));
            prev && (this[`set${this.direction}`](prev, this.move / 2 - baseDis / 2));
            // prev.webkitTransform = `translate3d(${move}px, 0 ,0)`;
        }
    };
    touchend(e) {
        //禁止最后一屏左滑
        if (this.current === (this.el.childElementCount - 1) && this.move < 0) {
            return;
        }

        var move = this.move;
        var current = this.getCurrent();
        var next = current.nextElementSibling;
        var prev = current.previousElementSibling;
        var baseDis = this.direction === 'Y' ? this.height : this.width;
        //判断上滑还是下滑(左滑还是右滑)
        if (move < 0 && next && Math.abs(move) > baseDis * .2) {
            this.next();
            return;
        };
        if (move > 0 && prev && Math.abs(move) > baseDis * .2) {
            this.prev();
            return;
        };

        next.style.webkitTransform = this.direction === 'Y' ? 'translate3d(0,100%,0)' : 'translate3d(100%,0,0)';
        current.style.webkitTransform = 'translate3d(0,0,0)';
    };
    //next
    next() {
        this.go(this.current + 1, 'next');
    };
    //prev
    prev() {
        this.go(this.current - 1, 'prev');
    };
    //go 到对应页面
    go(i, type) {
        var sliderEndCallback = this.option.sliderEndCallback;
        var current = this.getCurrent();
        var total = this.el.childElementCount;
        var target = this.el.children[i];
        var d = i < this.current ? -1 : 1;
        if (i === this.current || i < 0 || i >= total) {
            return;
        }
        // 滑动完成调用方法 延迟500ms做同步
        typeof sliderEndCallback === 'function' && setTimeout(() => {
            sliderEndCallback.call(this)
        }, 500);
        this.current = i;
        //当前和下个页面的滑动动画
        this['set' + this.direction](current, -d * (this.direction === 'X' ? this.width : (type === 'next' ? this.height / 2 : this.height)));
        this['set' + this.direction](target, -d * (this.direction === 'X' ? this.width : (type === 'next' ? this.height : this.height / 2)));

        this.setCurrent(target, i);
        this.finish(current, target);
    };
    //设置当前页
    setCurrent(el, i) {
        el && (el.style.webkitTransform = 'translate3d(0,0,0)');
        if (i) {
            this.current = i;
        }
    };
    //setX让页面动起来
    setX(el, move) {
        if (el) {
            el.style.webkitTransform = `translate3d(${move}px, 0 ,0)`;
        };
    };
    //setY让页面动起来
    setY(el, move) {
        if (el) {
            el.style.webkitTransform = `translate3d(0, ${move}px ,0)`;
        };
    };
    //finish
    finish(current, target) {
        current && current.classList.add('scenceAnimation');
        target && target.classList.add('scenceAnimation');
    };
}

var pages = new SliderPage(document.querySelector('.container'), 'X', {
    sliderEndCallback: function() {
        //对应进入每个页面后需要开始的动画在这里编写
        //todo...
    }
});