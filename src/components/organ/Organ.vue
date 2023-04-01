<template>
	<div class="pickup-ct">
		<!-- organ -->
		<div class="pickup" ref="pickup">
			<span class="name" @click="showPanel = true">{{ title }}</span><i :class="{'arr': true,'slide': showPanel }"></i>
			<div class="panel" v-show="showPanel">
				<div class="title">
					<span class="prov" @click="rootClicked()">{{ root.name }}</span>
					<span class="city" v-show="city.name" @click="cityClicked()">{{city.name}}</span>
					<span class="town" v-show="town.name">{{ town.name }}</span>
					<a href="javascript:;" class="ok" @click="pickup()">确定</a>
				</div>
				<div class="panel-body">
					<a href="javascript:;" v-for="(item, i) in arr" :key="i"
						:class="{ on: item.regionCode === selected.code }" @click="itemSelected(item)">{{ item.regionShort }}</a>
				</div>
			</div>
		</div>
		<!-- school -->
		<div class="pickup xx" ref="xxpickup" v-if="school">
			<span class="name" @click="showXxPanel = true">{{ xxName }}</span><i
				:class="{ arr: true, slide: showXxPanel }"></i>
			<div class="panel" v-show="showXxPanel">
				<div class="title">
					<el-checkbox v-for="(item, i) in xdList" :key="i" v-model="item.check" @change="doQueryXx()">
						{{ item.name }}</el-checkbox>
				</div>
				<div class="panel-body">
					<a href="javascript:;" v-for="(item, i) in xxList" :key="i" @click="xxSelected(item)">{{ item.regionShort }}</a>
				</div>
				<div class="panel-tail" v-show="pages > 1">
					<a v-for="p in pages" :key="p" :class="{ page: true, on: page === p }" href="javascript:;" @click="renderXxList(p)">{{ p }}</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { querySubOrganNodesByCode } from "@/api/uc/user";

export default {
		name: "Organ",
		props: {
			root: {
				type: Object,
				default: {
					code: "370000",
					name: "山东省"
				},
			},
			viewName: {
				type: String,
				default: ''
			},
			school: {
				type: Boolean,
				default: false,
			},
		},
		watch: {
			viewName(val, oldVal) {
				if (val) {
					this.title = val
				}
			},
			root: {
				handler(newName, oldName) {
					this.init();
				},
				deep: true
			},

		},

		data() {
			return {
				title: "",
				arr: [],
				showPanel: false,
				city: {
					code: "",
					name: ""
				},
				town: {
					code: "",
					name: ""
				},
				selected: {
					code: "",
					name: ""
				},

				//school
				xxName: "选择学校...",
				showXxPanel: false,
				xdList: [{
						name: "学前",
						check: true
					},
					{
						name: "小学",
						check: true
					},
					{
						name: "初中",
						check: true
					},
					{
						name: "高中",
						check: true
					},
					{
						name: "中职",
						check: true
					},
				],
				xxList: [],
				bufXxList: [], //学校列表缓存区
				pages: 1,
				pageSize: 10,
				page: 1,
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
				if (this.showXxPanel) {
					var tt = this.$refs.xxpickup;
					if (tt && e.target !== tt && !tt.contains(e.target)) {
						this.showXxPanel = false;
					}
				}
			};
			document.body.addEventListener("click", this.bodyListener, false);
		},
		methods: {
			init() {
				this.title = this.root.name;
				this.selected = this.root;
				this.queryOrgans(this.root.code);

			},
			queryOrgans(code) {
				if (!code) {
					return;
				}
				if (code.length === 6) {
					code += "000000";
				}
				querySubOrganNodesByCode(code).then((res) => {
					this.arr = res.data.data.records;
				});
			},
			itemSelected(organ) {
				var concise = this.conciseOrganCode(organ.regionCode);
				if (!concise) {
					return;
				}
				if (concise.length === 4) {
					//city
					this.city = {
						code: organ.regionCode,
						name: organ.regionShort
					};
					this.queryOrgans(organ.regionCode);
				} else if (concise.length === 6) {
					//town
					this.town = {
						code: organ.regionCode,
						name: organ.regionShort
					};
				}
				this.selected = {
					code: organ.regionCode,
					name: organ.regionShort
				};
			},
			rootClicked() {
				this.selected = this.root;
				this.queryOrgans(this.root.code);
				this.city = {
					code: "",
					name: ""
				};
				this.town = {
					code: "",
					name: ""
				};
			},
			cityClicked() {
				this.selected = this.city;
				this.queryOrgans(this.city.code);
				this.town = {
					code: "",
					name: ""
				};
			},
			pickup() {
				this.title = this.selected.name;
				this.showPanel = false;
				this.$emit("selected", this.selected);
				if(this.school){
					this.doQueryXx();
				}
			},

			doQueryXx() {
				var code = this.town.code;
				if (!code) {
					return;
				}
				var jdarr = [];
				for (var i = 0, size = this.xdList.length; i < size; i++) {
					var d = this.xdList[i];
					if (d.check) {
						jdarr.push(i + "");
					}
				}
				var obj = {
					sszgjyxzdm: code,
					jyjdList: jdarr
				};
                
				querySubOrganNodesByCode(obj).then((res) => {
					this.bufXxList = res.data.rows;
					this.pages = Math.ceil(this.bufXxList.length / this.pageSize);
					this.renderXxList(1);
				});
			},
			renderXxList(page) {
				if (!page) {
					page = 1;
				}
				this.page = page;
				var list = this.bufXxList;
				var start = (page - 1) * this.pageSize;
				var end = page * this.pageSize;
				if (end > list.length) {
					end = list.length;
				}
				var tmp = [];
				for (var i = start; i < end; i++) {
					tmp.push(list[i]);
				}
				this.xxList = tmp;
			},
			xxSelected(xx) {
				this.xxName = xx.xxmc;
				this.showXxPanel = false;
				this.$emit("schoolSelect", xx);
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
		min-width: 120px;
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
		width: 300px;
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

	.pickup>.panel>.title>span.prov,
	.pickup>.panel>.title>span.city {
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
		min-height: 100px;
	}

	.pickup>.panel>.panel-body>a {
		display: inline-block;
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
		padding: 0 10px;
		height: 40px;
	}

	.panel-tail>.page {
		display: block;
		float: left;
		height: 20px;
		line-height: 20px;
		border: 1px solid #ddd;
		padding: 0 5px;
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
</style>
