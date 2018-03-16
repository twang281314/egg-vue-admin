<style lang="less">
    @import '../../../styles/common.less';
    @import './list.less';
</style>

<template>
  <div class="background-color-white padding-right-10 padding-top-10 ">
     <Row class="margin-bottom-10">
      <Col span="18" class="search">
      <Form :model="formSearch" :label-width="80" inline label-position="right">
        <Form-item label="搜索类型：">
          <Select v-model="formSearch.type" placeholder="请选择" style="width:90px">
            <Option value="">请选择</Option>
            <Option value="1">帐号</Option>
            <Option value="2">联系人</Option>
            <Option value="3">手机号码</Option>
            <Option value="4">邮箱</Option>
          </Select>
        </Form-item>
        <Form-item label="关键词：">
          <Input v-model="formSearch.keywords" placeholder="帐号/手机号/姓名/邮箱"></Input>
        </Form-item>
        <Form-item label="所属角色">
          <Select v-model="formSearch.roleId" placeholder="请选择" style="width:100px">
            <Option value="">请选择</Option>
          
          </Select>
        </Form-item>
        <Form-item label="状态：">
          <Select v-model="formSearch.status" placeholder="请选择" style="width:70px">
            <Option value="">请选择</Option>
            <Option value="1">正常</Option>
            <Option value="0">锁定</Option>
          </Select>
        </Form-item>
        <Form-item :label-width="1">
          <Button type="primary" @click="search('formSearch')" icon="ios-search">搜索</Button>
        </Form-item>
      </Form>
      </Col>
      <Col span="6" class="text-align-right">
      <Button type="primary" @click="addModal = true">
        <Icon type="plus-round"></Icon>&nbsp;添加用户
      </Button>
      </Col>
    </Row>
     <!-- 表格 -->
     <Row class="margin-bottom-10">
      <Table :columns="columns" :data="list"></Table>
    </Row>
    <Row type="flex" justify="end">
      <Page :total="total" :page-size="pageSize" :current="pageNumber" show-total show-elevator @on-change="changePage"></Page>
    </Row>
  </div>
</template>

<script>
export default {
    name: 'user_list',
    data(){
      return {
          columns: [
          {
            title: 'ID',
            key: 'id',
            width: 60
          },
          {
            title: '帐号',
            key: 'account',
            width: 120
          },
          {
            title: '用户角色',
            key: 'roleName'
          },
          {
            title: '联系人',
            key: 'realName',
            width: 130
          },
          {
            title: '手机号',
            key: 'mobile',
            align: 'center',
            width: 120
          },
          {
            title: '邮箱',
            key: 'email',
            align: 'center',
            width: 180
          },
          {
            title: '状态',
            key: 'status',
            width: 120,
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              const color = row.status === '1' ? 'green' : row.status === '0' ? 'yellow' : 'red';
              const text = row.status === '1' ? '正常' : row.status === '0' ? '锁定' : '删除';
              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text);
            }
          },
          {
            title: '登陆次数',
            key: 'loginCount',
            align: 'center'
          },
          {
            title: '最后登陆',
            key: 'lastLoginTime',
            width: 135,
            align: 'center',
            render: (h, params) => {
              if (params.row.lastLoginTime === '0') {
                return h('Tag', '从未登陆');
              }
              return h('div', this.$formatDate(params.row.createTime, 'yyyy-MM-dd h:m'));
            }
          },
          {
            title: '最后登陆IP',
            key: 'lastLoginIp',
            width: 135,
            align: 'center'
          },
          {
            title: '添加时间',
            key: 'createTime',
            width: 135,
            align: 'center',
            render: (h, params) => {
              return h('span', this.$formatDate(params.row.createTime, 'yyyy-MM-dd h:m'));
            }
          },
          {
            title: '最后更新',
            key: 'updateTime',
            align: 'center',
            width: 135,
            render: (h, params) => {
              return h('span', this.$formatDate(params.row.updateTime, 'yyyy-MM-dd h:m'));
            }
          },
          {
            title: '操作',
            key: 'operation',
            width: 140,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index);
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.restPassword(params.row.id);
                    }
                  }
                }, '重置')
              ]);
            }
          }
        ],
        //列表数据
        list: [],
        //总共数据多少条
        total: 0,
        //每页多少条数据
        pageSize: 1,
        //当前页码
        pageNumber: 1,
         //搜索表单
        formSearch: {}
      };
    },

    methods: {
        getData (params) {
          this.list=[{
            "id": "2",
            "account": "test",
            "roleId": "1",
            "avatarId": "0",
            "avatarUrl": "",
            "realName": "测试人员",
            "mobile": "15025302861",
            "email": "",
            "status": "1",
            "desc": "好人呀!!",
            "loginCount": "0",
            "lastLoginIp": "0",
            "lastLoginTime": "0",
            "createTime": "1493623443",
            "updateTime": "1493623443",
            "roleName": "技术开发"
          }, {
            "id": "1",
            "account": "admin",
            "roleId": "1",
            "avatarId": "17",
            "avatarUrl": "https:\/\/oss.life.dev.yongchuan.cc\/manage\/user\/avatar\/2018-01-11\/amn2.jpg",
            "realName": "何先生",
            "mobile": "15025302861",
            "email": "myxingke@126.com",
            "status": "1",
            "desc": "超级用户哟",
            "loginCount": "308",
            "lastLoginIp": "119.29.197.80",
            "lastLoginTime": "1521193424",
            "createTime": "1493446475",
            "updateTime": "1516424055",
            "roleName": "技术开发"
          }]
        },
        changePage(){

        }
    },
    mounted(){
      this.getData();
    }
};
</script>
