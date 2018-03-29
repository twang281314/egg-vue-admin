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
            <Option value="2">姓名</Option>
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
     <!--添加 Modal 对话框-->
    <Modal v-model="addModal" title="添加用户" class-name="customize-modal-center" @on-cancel="modalCancel()">
      <div>
        <Form ref="addForm" :model="addForm"  :rules="ruleValidate"  :label-width="80">
          <Form-item label="帐号" prop="username">
            <Input v-model="addForm.username" placeholder="请填写帐号"></Input>
          </Form-item>
          <Form-item label="密码" prop="password">
            <Input type="password" v-model="addForm.password" placeholder="请填写密码(留空将不会修改密码)"></Input>
          </Form-item>
          <Form-item label="姓名" prop="realname">
            <Input v-model="addForm.realname" placeholder="请填写姓名"></Input>
          </Form-item>
          <Form-item label="手机号" prop="mobile">
            <Input v-model="addForm.mobile" placeholder="请填写手机号"></Input>
          </Form-item>
          <Form-item label="邮箱" prop="email">
            <Input v-model="addForm.email" placeholder="请填写邮箱"></Input>
          </Form-item>
          <Form-item label="状态" prop="status">
            <Radio-group v-model="addForm.status">
              <Radio label="1">正常</Radio>
              <Radio label="0">锁定</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="备注说明" prop="desc">
            <Input v-model="addForm.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="200字说明备注..."></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" @click="addSubmit('addForm')">提交</Button>
        <Button type="ghost" @click="handleReset('addForm')" style="margin-left: 8px">重置</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
    name: 'user_list',
    data(){
       const validatePassword = (rule, value, callback) => {
        if ((this.addModal || value) && (value.length < 6 || value.length > 32)) {
          callback(new Error('密码长度6-32个字符'));
        }
        callback();
      };
      const validateMobile = (rule, value, callback) => {
        if (value) {
          let reg = /^1[34578]\d{9}$/;
          if (!reg.test(value)) {
            callback(new Error('手机号码格式不正确'));
          }
        }
        callback();
      };
      return {
          columns: [
          {
            title: '帐号',
            key: 'username',
            width: 120
          },
          {
            title: '用户角色',
            key: 'rolename'
          },
          {
            title: '姓名',
            key: 'realname',
            width: 130
          },
          {
            title: '手机号',
            key: 'phone',
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
              const color = row.status === 1 ? 'green' : row.status === 0 ? 'yellow' : 'red';
              const text = row.status === 1? '正常' : row.status === 0 ? '锁定' : '删除';
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
            width: 150,
            align: 'center',
            render: (h, params) => {
              if (params.row.lastLoginTime === '0') {
                return h('Tag', '从未登陆');
              }
              return h('div', params.row.createTime);
            }
          },
          {
            title: '最后登陆IP',
            key: 'lastLoginIp',
            width: 130,
            align: 'center'
          },
          {
            title: '添加时间',
            key: 'createTime',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('span', params.row.createTime);
            }
          },
          {
            title: '最后更新',
            key: 'updateTime',
            align: 'center',
            width: 150,
            render: (h, params) => {
              return h('span', params.row.updateTime);
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
        //添加表单
        addForm: {
          username: '',
          password: '',
          mobile: '',
          email: '',
          status: 1,
          realname: '',
          desc: ''
        },
         //搜索表单
        formSearch: {},
        //新增modal
        addModal:false,
         //验证规则
        ruleValidate: {
          username: [
            {required: true, message: '帐号不能为空', trigger: 'blur'},
            {type: 'string', min: 2, message: '帐号不能少于2个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'}
          ],
          realname: [
            {type: 'string', min: 2, max: 6, message: '姓名2-6个字符', trigger: 'blur'}
          ],
          mobile: [
            {validator: validateMobile, trigger: 'blur'}
          ],
          email: [
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ],
          desc: [
            {type: 'string', max: 200, message: '备注说明不能超过200字', trigger: 'blur'}
          ]
        },
      };
    },

    methods: {
        //取消 modal
        modalCancel() {
          this.editModal = false;
        },
        //添加数据
       addSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.save('UserAdd', this.addForm);
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
       },
       //获取列表数据
        getData (params) {
          this.request('UserList', params, true).then((res) => {
            console.log(res);
            this.list= res.data;
        });
        },
        //分页
        changePage(){

        },
        //重置表单数据
        handleReset (name) {
          this.$refs[name].resetFields();
        },
         //表单搜索
        search() {
          let page = 1;
          this.pageNumber = page;
          let search = this.formSearch;
          this.getData({params: search});
        },
        //保存数据方法
        save(url, data) {
        this.request(url, data).then((res) => {
          if (res.status) {
            this.addModal = false;
            this.editModal = false;
            this.$Message.success(res.msg);
            //重置数据
            this.$refs['addForm'].resetFields();
            //this.$refs['editForm'].resetFields();
            //重新拉取服务端数据
            this.getData();
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    mounted(){
      this.getData();
    }
};
</script>
