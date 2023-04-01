<template>
  <div>
    <div class="img-view clearfix">
      <div class="img-item" v-for="(item, i) in imgList" :key="i">
        <img :src="item.url" @click="view(i)" />
      </div>
    </div>
    <div class="img-view-canvas half-black-bg" v-show="show" @click.stop="close()">
        <img class="trans" :src="imgUrl" @click.stop="&quot;;&quot;;" ref="prvimg" />
        <div class="hide-btn half-black-bg">&times;</div>
        <div class="img-view-btn" @click.stop="&quot;;&quot;;">
          <span class="prev" @click.stop="prev()" title="上一个"></span>
          <span class="zoom-in" @click.stop="zoomIn()" title="放大"></span>
          <span class="zoom-out" @click.stop="zoomOut()" title="缩小"></span>
          <span class="rotate-left" @click.stop="rotate(-90)" title="逆时针旋转"></span>
          <span class="rotate-right" @click.stop="rotate(90)" title="顺时针旋转"></span>
          <span class="flip-x" @click.stop="flip('x')" title="水平翻转"></span>
          <span class="flip-y" @click.stop="flip('y')" title="垂直翻转"></span>
          <span class="next" @click.stop="next()" title="下一个"></span>
        </div>
        <div class="img-view-tail half-black-bg" @click.stop="&quot;;&quot;;">
          <img :class="{ on: curIdx === i }" v-for="(item, i) in imgList" :key="i" :src="item.url" @click="change(i)" />
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageList",

  props: {
    imgList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  data() {
    return {
      show: false,
      imgUrl: "",
      viewData: {
        height: 0,
        width: 0,
      },
      dragging: false,
      curIdx: 0, //当前预览图片索引

      //图片变形数据
      transform: {
        zoom: 1,
        deg: 0,
      },
      menuActive: ""
    };
  },
  created() {
    this.menuActive = localStorage.getItem("menuActive");
    var body = document.body || document.documentElement;
    var height = body.offsetHeight,
      width = body.offsetWidth;
    this.viewData.height = height - 60; // buf
    this.viewData.width = width;
  },
  mounted() {
    this.listen();
  },

  methods: {
    rotate(deg) {
      this.transform.deg += deg;
      var trans = this.getTrans();
      this.$refs.prvimg.style.transform = trans.join(" ");
    },
    flip(dest) {
      if (dest === "x") {
        this.transform.scalex = this.transform.scalex === -1 ? 1 : -1;
      } else if (dest === "y") {
        this.transform.scaley = this.transform.scaley === -1 ? 1 : -1;
      }
      var trans = this.getTrans();
      this.$refs.prvimg.style.transform = trans.join(" ");
    },
    prev() {
      this.curIdx--;
      if (this.curIdx < 0) {
        this.curIdx = this.imgList.length - 1;
      }
      this.change(this.curIdx);
    },
    next() {
      this.curIdx++;
      if (this.curIdx === this.imgList.length) {
        this.curIdx = 0;
      }
      this.change(this.curIdx);
    },
    zoomIn() {
      this.transform.zoom += 0.05;
      var trans = this.getTrans();
      this.$refs.prvimg.style.transform = trans.join(" ");
    },
    zoomOut() {
      if (this.transform.zoom < 0.1) {
        return;
      }
      this.transform.zoom -= 0.05;
      var trans = this.getTrans();
      this.$refs.prvimg.style.transform = trans.join(" "); //'scale('+zoom+','+zoom+')';
    },
    change(i) {
      this.$refs.prvimg.style.display = "none";
      setTimeout(() => {
        this.view(i);
      }, 10);
    },
    view(i) {
      this.transform = {
        zoom: 1,
        deg: 0,
        scalex: 0,
        scaley: 0,
      };

      var url = this.imgList[i].url;
      var image = new Image();
      image.src = url;
      var nHeight = image.naturalHeight,
        nWidth = image.naturalWidth;
      var vd = this.viewData;

      var ih = vd.height * 0.9; // 设置图片初始高度为容器的90%
      var ratio = ih / nHeight; // 图片缩放比例
      var iw = nWidth * ratio;

      if (iw > vd.width) {
        ratio = vd.width / iw;
        iw = vd.width;
        ih = ratio * ih;
      }
      var mH = (vd.height - ih) / 2;
      var mW = (vd.width - iw) / 2;
      this.$refs.prvimg.style =
        "height:" +
        ih +
        "px;width:" +
        iw +
        "px;margin-top:" +
        mH +
        "px;margin-left:" +
        mW +
        "px;display:block;";
      this.$refs.prvimg.style.transform = "scale(0.01,0.01)";
      this.show = true;
      this.imgUrl = url;
      setTimeout(() => {
        this.$refs.prvimg.style.transform = "none";
      }, 50);
      this.curIdx = i;
    },
    listen() {
      //鼠标位置
      var startX, startY, diffX, diffY;
      this.$refs.prvimg.onmousedown = function (e) {
        this.dragging = true;
        this.className = "";
        startX = e.pageX;
        startY = e.pageY;

        // 计算坐标差值
        diffX = startX - e.target.offsetLeft;
        diffY = startY - e.target.offsetTop;
      };
      this.$refs.prvimg.onmousemove = function (e) {
        if (this.dragging) {
          e.preventDefault();
          this.style.marginTop = e.pageY - diffY + "px";
          this.style.marginLeft = e.pageX - diffX + "px";
        }
      };
      this.$refs.prvimg.onmouseup = function (e) {
        this.dragging = false;
        this.className = "trans";
      };

      var tt = this;
      //chrome 鼠标滚轮事件（缩放图片）
      this.$refs.prvimg.addEventListener("mousewheel", function (e) {
        if (e.wheelDelta < 0) {
          //down
          tt.zoomOut();
        } else {
          //up
          tt.zoomIn();
        }
      });
      //firefox
      this.$refs.prvimg.addEventListener("DOMMouseScroll", function (e) {
        if (e.detail > 0) {
          //down
          tt.zoomOut();
        } else {
          //up
          tt.zoomIn();
        }
      });
    },
    close() {
      this.$refs.prvimg.style.transform = "scale(0.01,0.01)";
      setTimeout(() => {
        this.show = false;
      }, 200);
    },
    getTrans() {
      var buf = [];
      if (this.transform.scalex) {
        buf.push("scaleX(" + this.transform.scalex + ")");
      }
      if (this.transform.scaley) {
        buf.push("scaleY(" + this.transform.scaley + ")");
      }
      if (this.transform.deg) {
        buf.push("rotate(" + this.transform.deg + "deg)");
      }
      if (this.transform.zoom) {
        buf.push(
          "scale(" + this.transform.zoom + "," + this.transform.zoom + ")"
        );
      }
      return buf;
    },
  },

  destroyed() {
    // remove DOM node after destroy
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
};
</script>
<style scoped>
.img-view > .img-item {
  position: relative;
  float: left;
  margin: 10px;
  height: 120px;
  width: 220px;
  text-align: center;
}
.img-view > .img-item > img {
  height: 100%;
  width: 100%;
  cursor: pointer;
}
.img-view-canvas {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 10000;
}
.img-view-canvas > img {
  position: relative;
  display: block;
  height: auto;
  width: auto;
}
.img-view-canvas > .hide-btn {
  position: absolute;
  right: -35px;
  top: -30px;
  height: 80px;
  width: 80px;
  padding-top: 22px;
  padding-left: 15px;
  font-size: 35px;
  color: #fff;
  cursor: pointer;
  border-radius: 50%;
  opacity: 0.8;
}
.img-view-btn {
  position: absolute;
  left: 0;
  bottom: 60px;
  right: 0;
  width: 100%;
  height: 30px;
  text-align: center;
  overflow: hidden;
}
.img-view-btn > span {
  display: inline-block;
  height: 26px;
  width: 26px;
  background: url(../../assets/img/img-view-btn.png) no-repeat 0 0 rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.7;
}
.img-view-btn > span + span {
  margin-left: 10px;
}
.img-view-btn > span.prev {
  background-position: -77px 3px;
}
.img-view-btn > span.zoom-in {
  background-position: 3px 3px;
}
.img-view-btn > span.zoom-out {
  background-position: -17px 3px;
}
.img-view-btn > span.rotate-left {
  background-position: -137px 3px;
}
.img-view-btn > span.rotate-right {
  background-position: -157px 3px;
}
.img-view-btn > span.flip-x {
  background-position: -177px 3px;
}
.img-view-btn > span.flip-y {
  background-position: -197px 3px;
}
.img-view-btn > span.next {
  background-position: -117px 3px;
}
.img-view-tail {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 52px;
  width: 100%;
  text-align: center;
  overflow: hidden;
}
.img-view-tail > img {
  height: 50px;
  width: 30px;
  opacity: 0.5;
  cursor: pointer;
}
.img-view-tail > img + img {
  margin-left: 1px;
}
.img-view-canvas > .hide-btn:hover,
.img-view-btn > span:hover,
.img-view-tail > img:hover,
.img-view-tail > img.on {
  opacity: 1;
}
.trans {
  transition: all 0.4s;
}
.half-black-bg {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
