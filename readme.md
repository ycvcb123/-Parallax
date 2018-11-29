## 运营活动视差滚动活动方案

### 用法



#### html:

```html
 <div class="container">
    <!-- page1 -->
    <div>
        <!-- 具体内容 -->
    </div>
    <!-- page2 -->
    <div>
        <!-- 具体内容 -->
    </div>
    <!-- page3 -->
    <div>
        <!-- 具体内容 -->
    </div>
    <!-- ...... -->
</div>
```

#### js: 

```javascript
//direction 是沿x轴滚动还是沿y轴滚动（x, y）
var pages = new SliderPage(document.querySelector('滑屏容器class'), direction, {
    sliderEndCallback: function() {
        //对应进入每个页面后需要开始的动画在这里编写
        //todo...
    }
});
```

### 实例查看

1. `npm install`

2. `npm run dev`

3. `打开localhost:8000/parallax`




