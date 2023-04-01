<template>
	<div class="pickup-ct">
		<!-- organ -->
		<div class="pickup" ref="pickup">
			<span class="name" @click="showPanel = true">{{ title }}</span><i :class="{'arr': true,'slide': showPanel }"></i>
			<div class="panel" v-show="showPanel">
				<div class="title" v-if="type!=TYPE_SCHOOL">
					<span v-for="(item,i) in pickupList" :key="i" :class="{'mini':(i+1)<pickupList.length}" @click="itemReClicked(i,item)">{{ item.name }}</span>
					<a href="javascript:;" class="ok" @click="pickup()">确定</a>
				</div>
				<div class="panel-body">
					<a href="javascript:;" v-for="(item, i) in arr" :key="i"
						:class="{ on: item.organCode === selected.organCode }" @click="itemClicked(item)">{{ item.name }}</a>
					<div class="empty" v-if="arr.length===0">暂无数据</div>
				</div>
				<div class="panel-tail clearfix" v-show="pages > 1">
					<!-- <a v-for="p in pages" :key="p" :class="{ page: true, on: page === p }" href="javascript:;" @click="renderOrganList(p)">{{ p }}</a> -->

					<el-pagination
						background
						layout="pager"
						:total="bufList.length"
						:hide-on-single-page="true"
						@current-change="renderOrganList">
					</el-pagination>

				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
import {organTree,SubOrganNodes} from "@/api/uc/user";

export default {
		name: "EduOrgan",
		props: {
			root: {
				type: Object,
				default: null,
			},
			type: {
				type: String,
				default: ''
			}
		},
		watch: {
			root: {
				handler(newName, oldName) {
					this.init();
				},
				deep: true
			},

		},

		data() {
			return {
				TYPE_ORGAN:'organ',
				TYPE_SCHOOL:'school',
				title: "",
                rootOrgan:{},
				arr: [],
				showPanel: false,
				selected: {},
				pickupList:[],
				pages: 1,
				pageSize: 10,
				page: 1,
				bufList:[]
			};
		},

		created() {
			this.init();
			this.bodyListener = (e) => {
				if (this.showPanel) {
					var tt = this.$refs.pickup;
					if (tt && e.target !== tt && !tt.contains(e.target)) {
						this.showPanel = false;
					}
				}
			};
			document.body.addEventListener("click", this.bodyListener, false);
		},
		methods: {
			init() {
                if(!this.root){
                    this.queryRootOrgan();
                }else{
                    this.rootOrgan=this.root;
					this.title='请选择...';
					this.queryOrganByParent(this.rootOrgan,true);
					// this.pushPickUpList(this.rootOrgan);
                }
			},
            queryRootOrgan(){
                organTree().then(res=>{
                    var list=res.data,buf=[];
                    for(var i=0,size=list.length;i<size;i++){
                        var item=list[i];
                        if(item.pid==='-1'){
                            this.rootOrgan=item;
                        }else{
							if(this.type===this.TYPE_ORGAN && item.organLevel==12){
								continue;
							}else if(this.type===this.TYPE_SCHOOL && item.organLevel<12){
								continue;
							}
							buf.push(item);
                        }
                    }
                    this.title = this.rootOrgan.name;
                    this.selected = this.rootOrgan;

					this.pushPickUpList(this.rootOrgan);
                    this.parseOrganList(buf);
                });
            },
			itemClicked(organ) {
				this.selected = organ;
				if((this.type==this.TYPE_ORGAN &&  organ.organLevel<6) || (this.type!==this.TYPE_ORGAN &&  organ.organLevel<12)){
					this.queryOrganByParent(organ,true);
				}
				if(this.type==this.TYPE_SCHOOL){
					this.pickup();
				}
			},
			queryOrganByParent(parent,push){
				if(push){
					this.pushPickUpList(parent);
				}
				var param={
					organId:parent.organId,
					organCode:parent.organCode
				};
				SubOrganNodes(param).then(res=>{
					var list=res.data.rows,buf=[];
                    for(var i=0,size=list.length;i<size;i++){
                        var item=list[i];
						if(this.type===this.TYPE_ORGAN && item.organLevel==12){
							continue;
						}else if(this.type===this.TYPE_SCHOOL && item.organLevel<12){
							continue;
						}
						buf.push(item);
                    }
					this.parseOrganList(buf);
				});
			},
			parseOrganList(list){
				var size=list.length;
				this.bufList=list;
				if(size <= this.pageSize){
					this.arr=list;
					return;
				}
				this.pages = Math.ceil(size / this.pageSize);
				this.renderOrganList(1);
			},
			renderOrganList(page){
				if (!page) {
					page = 1;
				}
				this.page = page;
				var list = this.bufList;
				var start = (page - 1) * this.pageSize;
				var end = page * this.pageSize;
				if (end > list.length) {
					end = list.length;
				}
				var tmp = [];
				for (var i = start; i < end; i++) {
					tmp.push(list[i]);
				}
				this.arr = tmp;
			},
			itemReClicked(i,item) {
				this.selected = item;
				var size=this.pickupList.length;
				var position=i+1;
				var len=size-position;
				if(!len){
					return;
				}
				this.queryOrganByParent(item,false);
				this.pickupList.splice(position,len);
			},
			pushPickUpList(item){
				this.pickupList.push(item);
			},
			pickup() {
				this.title = this.selected.name;
				this.showPanel = false;
				this.$emit("selected", this.selected);
			},

			//处理编码（370000 => 37）
			conciseOrganCode(code) {
				if (!code || code.length < 2) {
					return null;
				}
				var val = code.substr(0, 2);
				for (var i = 2; i < code.length; i += 2) {
					var tmp = code.substr(i, 2);
					if (tmp === "00") {
						return val;
					}
					val += tmp;
				}
				return val;
			},
            //判断是否为空对象
            isEmpty : function(o){
                for (var key in o) {
                    return false;
                }
                return true;
            }
		},
};
</script>

<style scoped>
	.pickup-ct {
		display: inline-block;
	}

	.pickup {
		position: relative;
		display: inline-block;
		line-height: 30px;
		min-width: 180px;
		border: 1px solid #ddd;
		border-radius: 5px;
		background-color: #fff;
	}

	.pickup.xx {
		margin-left: 10px;
		min-width: 200px;
	}

	.pickup span.name {
		display: block;
		height: 30px;
		padding-right: 20px;
		padding-left: 10px;
		cursor: pointer;
		/* overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; */
	}

	.pickup i.arr {
		position: absolute;
		right: 0;
		top: 0;
		display: block;
		height: 30px;
		width: 16px;
		cursor: pointer;
	}

	.pickup i.arr::after {
		position: absolute;
		top: 8px;
		left: 4px;
		box-sizing: content-box;
		content: "";
		border: 1px solid #bbb;
		border-left: 0;
		border-top: 0;
		height: 6px;
		width: 6px;
		transform: rotate(45deg) scaleY(1);
		-webkit-transition: all 0.3s;
		transition: all 0.3s;
	}

	.pickup i.slide::after {
		top: 11px;
		transform: rotate(225deg) scaleY(1);
	}

	.pickup>.panel {
		position: absolute;
		left: 0;
		top: 30px;
		width: 400px;
		margin: 0;
		padding: 0 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
		z-index: 1000;
		background-color: #fff;
	}

	.pickup>.panel>.title {
		height: 36px;
		border-bottom: 1px solid #ddd;
		overflow: hidden;
	}

	.pickup>.panel>.title>span {
		position: relative;
		display: block;
		float: left;
		line-height: 36px;
		padding-right: 10px;
		cursor: pointer;
	}

	.pickup>.panel>.title>span+span {
		padding-left: 10px;
	}
	.pickup>.panel>.title>span.mini {
		width: 50px;
		word-break:keep-all;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.pickup>.panel>.title>span+span::before {
		content: "";
		position: absolute;
		display: block;
		left: 0;
		top: 11px;
		height: 15px;
		width: 1px;
		transform: rotate(20deg);
		background-color: #aaa;
	}

	.pickup>.panel>.title>span {
		color: #0085ea;
	}

	.pickup>.panel>.title>a.ok {
		display: block;
		float: right;
		height: 26px;
		line-height: 26px;
		margin-top: 5px;
		color: #fff;
		background-color: #0085ea;
		padding: 0 15px;
		border-radius: 5px;
	}

	.pickup>.panel>.title>a.ok:hover {
		opacity: 0.8;
	}

	.pickup>.panel>.panel-body {
		padding: 10px 0;
		min-height: 100px;
	}

	.pickup>.panel>.panel-body>a {
		display: block;
		line-height: 30px;
		padding: 0 10px;
		color: #333;
	}

	.pickup>.panel>.panel-body>a.on,
	.pickup>.panel>.panel-body>a:hover {
		background-color: #eee;
	}

	.pickup.xx>.panel {
		padding: 0;
		width: 400px;
	}

	.pickup.xx>.panel>.title {
		padding: 3px 10px 0 10px;
	}

	.pickup.xx>.panel>.panel-body {
		padding-bottom: 10px;
	}

	.pickup.xx>.panel>.panel-body>a {
		display: block;
	}

	.panel-tail {
		padding-bottom: 10px;
	}

	.panel-tail>.page {
		display: block;
		float: left;
		height: 22px;
		line-height: 20px;
		border: 1px solid #ddd;
		padding: 0 8px;
		border-radius: 3px;
		color: #333;
	}

	.panel-tail>.page+.page {
		margin-left: 10px;
	}

	.panel-tail>.page.on,
	.panel-tail>.page:hover {
		border-color: #1890ff;
	}

	.panel-tail>.page.on {
		color: #1890ff;
	}

	/* overwrite */
	.el-checkbox {
		margin-right: 15px;
	}

	::v-deep .el-checkbox__label {
		padding-left: 5px;
	}
::v-deep .el-pagination span:not([class*=suffix]),
::v-deep .el-pagination button,
::v-deep .el-pager li {
	height: 22px;
	line-height: 22px;
	margin: 0 3px !important;
	font-weight: normal;
}
</style>
