<template>
  <div class="uploaderCustomDiv" v-show="showUploder">
    <el-card class="box-card uploaderCustomDivCard">
      <template #header>
        <div class="card-header">
          <span> 视频上传 </span>
          <el-button-group class="buttonGroups">
            <el-button class="button" type="text">选择要绑定的商品</el-button>
            <el-button class="button" type="text" @click="openUploader()">关闭窗口</el-button>
          </el-button-group>
        </div>
      </template>
      <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-active="menuIndex" @select="handleMenuSelect">
            <el-menu-item index="文件列表">
              <template #title><i class="el-icon-message"></i>上传列表</template>
            </el-menu-item>
            <el-menu-item index="文件标题">
              <template #title><i class="el-icon-menu"></i>填写标题</template>
            </el-menu-item>
            <el-menu-item index="分类">
              <template #title><i class="el-icon-setting"></i>选择分类</template>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-container>
          <el-header style="text-align: right; font-size: 12px">
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>查看</el-dropdown-item>
                  <el-dropdown-item>新增</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>王小虎</span>
          </el-header>

          <el-main>
            <div class="tableHeader">
              <el-upload
                class="button"
                multiple
                ref="upload"
                accept=".mp4"
                :on-change="dealFile"
                :file-list="fileList"
                :show-file-list="false"
                :auto-upload="false">
                <el-button size="small" type="primary">选择要上传的视频</el-button>
              </el-upload>
              <div v-show="videoList.length>0">当前已经上传的视频数量为
                <el-tag effect="dark" type="danger">{{videoList.length}}</el-tag>
              </div>
            </div>
            <el-table :data="videoList" v-if="menuIndex=='文件列表'">
              <el-table-column prop="name" label="文件名" width="140">
              </el-table-column>
              <el-table-column prop="title" label="标题" width="120">
              </el-table-column>
              <el-table-column prop="fileId" label="file_id">
              </el-table-column>
              <el-table-column prop="cover" label="视频封面图">
              </el-table-column>
              <el-table-column prop="clip_1_1" label="1:1封面图">
              </el-table-column>
              <el-table-column label="上传结果">
                <template #default="scope">
                  <el-button type="success" v-if="scope.uploaderResult>0">主要按钮</el-button>
                  <el-button type="warning" v-else-if="scope.uploaderResult<0">上传失败</el-button>
                  <el-button type="primary" v-else>待上传</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row v-if="menuIndex=='文件标题'">
              <el-col :span="24">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 10, maxRows: 200}"
                  placeholder="请输入标题，每行一个"
                  v-model="titleText" @input="dealTitleText">
                </el-input>
              </el-col>
            </el-row>
            <el-row v-if="menuIndex=='分类'">

            </el-row>
          </el-main>
        </el-container>
      </el-container>
    </el-card>
  </div>
  <div class="content_page" v-show="!showUploder">
    <el-button type="primary" icon="el-icon-edit" circle @click="openUploader()"></el-button>
  </div>

</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  data() {
    return {
      showUploder: true,
      menuIndex: '文件列表',
      videoList: [],
      titleText: ref(''),
      fileList: [],
      pictureList: [],
      categories: {
        '618尖货大赏': [
          {
            'parent': '618尖货大赏',
            'label': '美妆护肤馆',
            'value': '15:1473:85463'
          },
          {
            'parent': '618尖货大赏',
            'label': '女神美搭馆',
            'value': '15:1473:85464'
          },
          {
            'parent': '618尖货大赏',
            'label': '智能家电馆',
            'value': '15:1473:85465'
          },
          {
            'parent': '618尖货大赏',
            'label': '潮男穿搭馆',
            'value': '15:1473:85466'
          },
          {
            'parent': '618尖货大赏',
            'label': '母婴好物馆',
            'value': '15:1473:85467'
          },
          {
            'parent': '618尖货大赏',
            'label': '运动户外馆',
            'value': '15:1473:85468'
          },
          {
            'parent': '618尖货大赏',
            'label': '新潮数码馆',
            'value': '15:1473:85469'
          },
          {
            'parent': '618尖货大赏',
            'label': '潮流配饰馆',
            'value': '15:1473:85470'
          },
          {
            'parent': '618尖货大赏',
            'label': '美食豪饮馆',
            'value': '15:1473:85471'
          },
          {
            'parent': '618尖货大赏',
            'label': '居家好物馆',
            'value': '15:1473:85472'
          }
        ],
        '视频内容类型': [
          {
            'parent': '视频内容类型',
            'label': '生产工艺',
            'value': '15:111:60225'
          },
          {
            'parent': '视频内容类型',
            'label': '深度评测',
            'value': '15:111:66031'
          },
          {
            'parent': '视频内容类型',
            'label': '技能教程',
            'value': '15:111:76720'
          },
          {
            'parent': '视频内容类型',
            'label': '开箱体验',
            'value': '15:111:76721'
          },
          {
            'parent': '视频内容类型',
            'label': '搭配攻略',
            'value': '15:111:76722'
          },
          {
            'parent': '视频内容类型',
            'label': '主题清单',
            'value': '15:111:76723'
          },
          {
            'parent': '视频内容类型',
            'label': '时尚街拍',
            'value': '15:111:76725'
          },
          {
            'parent': '视频内容类型',
            'label': '生活记录',
            'value': '15:111:76726'
          },
          {
            'parent': '视频内容类型',
            'label': '产地溯源',
            'value': '15:111:76727'
          },
          {
            'parent': '视频内容类型',
            'label': '线下探店',
            'value': '15:111:76728'
          },
          {
            'parent': '视频内容类型',
            'label': '情景剧场',
            'value': '15:111:76729'
          },
          {
            'parent': '视频内容类型',
            'label': '店铺故事',
            'value': '15:111:76732'
          },
          {
            'parent': '视频内容类型',
            'label': '才艺秀',
            'value': '15:111:77574'
          },
          {
            'parent': '视频内容类型',
            'label': '直播预告',
            'value': '15:111:82183'
          },
          {
            'parent': '视频内容类型',
            'label': '直播精剪',
            'value': '15:111:82184'
          },
          {
            'parent': '视频内容类型',
            'label': '明星宣传',
            'value': '15:111:82901'
          },
          {
            'parent': '视频内容类型',
            'label': '纯外观展示',
            'value': '15:111:84994'
          },
          {
            'parent': '视频内容类型',
            'label': '介绍讲解',
            'value': '15:111:84997'
          },
          {
            'parent': '视频内容类型',
            'label': '痛点解决',
            'value': '15:111:84998'
          },
          {
            'parent': '视频内容类型',
            'label': '使用前后对比',
            'value': '15:111:84999'
          },
          {
            'parent': '视频内容类型',
            'label': '卡点换装',
            'value': '15:111:85000'
          }
        ]
      },
      aysncJson: {
        'componentDefinition': {
          'IceAddVideo2': {
            'configVersion': false,
            'packageName': 'pcom-creator-add-video2',
            'seed': {
              'packages': {
                '@ali/excom-react': {
                  'path': '//g.alicdn.com/code/npm/@ali/excom-react/16.8.6/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '16.8.6',
                  'group': 'tm'
                },
                '@ali/pcom-creator-next': {
                  'path': '//g.alicdn.com/code/npm/@ali/pcom-creator-next/1.19.24/',
                  'debug': true,
                  'ignorePackageNameInUri': true,
                  'version': '1.19.24',
                  'group': 'tm'
                },
                '@ali/pcom-creator-add-video2': {
                  'path': '//g.alicdn.com/code/npm/@ali/pcom-creator-add-video2/5.0.2/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '5.0.2',
                  'group': 'tm'
                },
                '@ali/excom-prop-types': {
                  'path': '//g.alicdn.com/code/npm/@ali/excom-prop-types/15.7.4/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '15.7.4',
                  'group': 'tm'
                },
                '@ali/excom-react-dom': {
                  'path': '//g.alicdn.com/code/npm/@ali/excom-react-dom/16.8.7/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '16.8.7',
                  'group': 'tm'
                }
              },
              'modules': {
                '@ali/pcom-creator-next/index': {
                  'requires': [
                    '@ali/excom-react/index',
                    '@ali/excom-react-dom/index',
                    '@ali/pcom-creator-next/index.css'
                  ]
                },
                '@ali/excom-react-dom/index': {
                  'requires': [
                    '@ali/excom-react/index'
                  ]
                },
                '@ali/pcom-creator-add-video2/index': {
                  'requires': [
                    '@ali/excom-react/index',
                    '@ali/pcom-creator-next/index',
                    '@ali/pcom-creator-add-video2/index.css'
                  ]
                }
              },
              'combine': true
            }
          },
          'Input': {
            'configVersion': false
          },
          'CreatorAddTopicNew': {
            'configVersion': false
          },
          'Text': {
            'configVersion': false,
            'packageName': 'pcom-creator-form-text',
            'seed': {
              'packages': {
                '@ali/excom-react': {
                  'path': '//g.alicdn.com/code/npm/@ali/excom-react/16.8.6/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '16.8.6',
                  'group': 'tm'
                },
                '@ali/pcom-creator-next': {
                  'path': '//g.alicdn.com/code/npm/@ali/pcom-creator-next/1.19.24/',
                  'debug': true,
                  'ignorePackageNameInUri': true,
                  'version': '1.19.24',
                  'group': 'tm'
                },
                '@ali/excom-classnames': {
                  'path': '//g.alicdn.com/code/npm/@ali/excom-classnames/2.2.7/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '2.2.7',
                  'group': 'tm'
                },
                '@ali/excom-prop-types': {
                  'path': '//g.alicdn.com/code/npm/@ali/excom-prop-types/15.7.4/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '15.7.4',
                  'group': 'tm'
                },
                '@ali/pcom-creator-form-text': {
                  'path': '//g.alicdn.com/code/npm/@ali/pcom-creator-form-text/5.0.1/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '5.0.1',
                  'group': 'tm'
                },
                '@ali/excom-react-dom': {
                  'path': '//g.alicdn.com/code/npm/@ali/excom-react-dom/16.8.7/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '16.8.7',
                  'group': 'tm'
                }
              },
              'modules': {
                '@ali/pcom-creator-next/index': {
                  'requires': [
                    '@ali/excom-react/index',
                    '@ali/excom-react-dom/index',
                    '@ali/pcom-creator-next/index.css'
                  ]
                },
                '@ali/pcom-creator-form-text/index': {
                  'requires': [
                    '@ali/excom-react/index',
                    '@ali/excom-prop-types/index',
                    '@ali/excom-classnames/index',
                    '@ali/pcom-creator-form-text/index.css'
                  ]
                },
                '@ali/excom-react-dom/index': {
                  'requires': [
                    '@ali/excom-react/index'
                  ]
                }
              },
              'combine': true
            }
          },
          'CreatorAddImage': {
            'configVersion': false,
            'packageName': 'pcom-creator-add-image',
            'seed': {
              'packages': {
                '@ali/excom-react': {
                  'path': '//g.alicdn.com/code/npm/@ali/excom-react/16.8.6/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '16.8.6',
                  'group': 'tm'
                },
                '@ali/pcom-creator-query-condition': {
                  'path': '//g.alicdn.com/code/npm/@ali/pcom-creator-query-condition/0.1.3/',
                  'debug': true,
                  'ignorePackageNameInUri': true,
                  'version': '0.1.3',
                  'group': 'tm'
                },
                '@ali/pcom-creator-next': {
                  'path': '//g.alicdn.com/code/npm/@ali/pcom-creator-next/1.19.24/',
                  'debug': true,
                  'ignorePackageNameInUri': true,
                  'version': '1.19.24',
                  'group': 'tm'
                },
                '@ali/excom-classnames': {
                  'path': '//g.alicdn.com/code/npm/@ali/excom-classnames/2.2.7/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '2.2.7',
                  'group': 'tm'
                },
                '@ali/pcom-ice-img': {
                  'path': '//g.alicdn.com/code/npm/@ali/pcom-ice-img/5.0.3/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '5.0.3',
                  'group': 'tm'
                },
                '@ali/excom-moment': {
                  'path': '//g.alicdn.com/code/npm/@ali/excom-moment/2.24.0/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '2.24.0',
                  'group': 'tm'
                },
                '@ali/excom-prop-types': {
                  'path': '//g.alicdn.com/code/npm/@ali/excom-prop-types/15.7.4/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '15.7.4',
                  'group': 'tm'
                },
                '@ali/pcom-creator-utils': {
                  'path': '//g.alicdn.com/code/npm/@ali/pcom-creator-utils/0.1.4/',
                  'debug': true,
                  'ignorePackageNameInUri': true,
                  'version': '0.1.4',
                  'group': 'tm'
                },
                '@ali/pcom-creator-add-image': {
                  'path': '//g.alicdn.com/code/npm/@ali/pcom-creator-add-image/5.0.5/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '5.0.5',
                  'group': 'tm'
                },
                '@ali/excom-react-dom': {
                  'path': '//g.alicdn.com/code/npm/@ali/excom-react-dom/16.8.7/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '16.8.7',
                  'group': 'tm'
                }
              },
              'modules': {
                '@ali/pcom-creator-next/index': {
                  'requires': [
                    '@ali/excom-react/index',
                    '@ali/excom-react-dom/index',
                    '@ali/pcom-creator-next/index.css'
                  ]
                },
                '@ali/excom-react-dom/index': {
                  'requires': [
                    '@ali/excom-react/index'
                  ]
                },
                '@ali/pcom-creator-utils/index': {
                  'requires': [
                    '@ali/pcom-creator-next/index',
                    '@ali/excom-react/index',
                    '@ali/excom-react-dom/index',
                    '@ali/pcom-creator-utils/index.css'
                  ]
                },
                '@ali/pcom-ice-img/index': {
                  'requires': [
                    '@ali/excom-prop-types/index',
                    '@ali/excom-classnames/index',
                    '@ali/pcom-ice-img/index.css'
                  ]
                },
                '@ali/pcom-creator-add-image/index': {
                  'requires': [
                    '@ali/excom-react/index',
                    '@ali/excom-prop-types/index',
                    '@ali/excom-classnames/index',
                    '@ali/pcom-creator-next/index',
                    '@ali/pcom-ice-img/index',
                    '@ali/pcom-creator-utils/index',
                    '@ali/pcom-creator-query-condition/index',
                    '@ali/pcom-creator-add-image/index.css'
                  ]
                },
                '@ali/pcom-creator-query-condition/index': {
                  'requires': [
                    '@ali/excom-react/index',
                    '@ali/excom-prop-types/index',
                    '@ali/pcom-creator-next/index',
                    '@ali/pcom-creator-utils/index',
                    '@ali/excom-classnames/index',
                    '@ali/pcom-creator-query-condition/index.css'
                  ]
                }
              },
              'combine': true
            }
          },
          'TagPicker': {
            'configVersion': false,
            'packageName': 'pcom-creator-tag-picker',
            'seed': {
              'packages': {
                '@ali/excom-react': {
                  'path': '//g.alicdn.com/code/npm/@ali/excom-react/16.8.6/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '16.8.6',
                  'group': 'tm'
                },
                '@ali/pcom-creator-next': {
                  'path': '//g.alicdn.com/code/npm/@ali/pcom-creator-next/1.19.24/',
                  'debug': true,
                  'ignorePackageNameInUri': true,
                  'version': '1.19.24',
                  'group': 'tm'
                },
                '@ali/excom-classnames': {
                  'path': '//g.alicdn.com/code/npm/@ali/excom-classnames/2.2.7/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '2.2.7',
                  'group': 'tm'
                },
                '@ali/excom-prop-types': {
                  'path': '//g.alicdn.com/code/npm/@ali/excom-prop-types/15.7.4/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '15.7.4',
                  'group': 'tm'
                },
                '@ali/excom-react-dom': {
                  'path': '//g.alicdn.com/code/npm/@ali/excom-react-dom/16.8.7/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '16.8.7',
                  'group': 'tm'
                },
                '@ali/pcom-creator-tag-picker': {
                  'path': '//g.alicdn.com/code/npm/@ali/pcom-creator-tag-picker/5.0.2/',
                  'debug': true,
                  'modSpec': '1.0',
                  'ignorePackageNameInUri': true,
                  'version': '5.0.2',
                  'group': 'tm'
                }
              },
              'modules': {
                '@ali/pcom-creator-next/index': {
                  'requires': [
                    '@ali/excom-react/index',
                    '@ali/excom-react-dom/index',
                    '@ali/pcom-creator-next/index.css'
                  ]
                },
                '@ali/pcom-creator-tag-picker/index': {
                  'requires': [
                    '@ali/excom-react/index',
                    '@ali/excom-prop-types/index',
                    '@ali/excom-classnames/index',
                    '@ali/pcom-creator-next/index',
                    '@ali/pcom-creator-tag-picker/index.css'
                  ]
                },
                '@ali/excom-react-dom/index': {
                  'requires': [
                    '@ali/excom-react/index'
                  ]
                }
              },
              'combine': true
            }
          },
          'CreatorPush': {
            'configVersion': false
          }
        },
        'components': [
          'IceAddVideo2',
          'Input',
          'CreatorAddTopicNew',
          'Toast',
          'IceAddVideo',
          'Text',
          'CreatorAddImage',
          'CreatorPush',
          'TagPicker',
          'DateTime'
        ],
        'config': {
          'actions': [
            {
              'size': 'large',
              'span': 2,
              'offset': 5,
              'type': 'primary',
              'needValidate': true,
              'disabled': false,
              'style': {
                'display': 'none'
              },
              'name': 'submit',
              'text': '发布(今日可发:78篇)',
              'url': '//cpub2.taobao.com/submit.json?_tb_token_=3617e76e4b3ae'
            }
          ],
          'children': [
            {
              'component': 'Text',
              'label': '',
              'name': 'guid',
              'props': {
                'label': '',
                'value': '填写视频基础信息',
                'tips': "<a style='color:red' target='_blank' href='https://market.m.taobao.com/app/qn/toutiao-new/index-pc.html#/detail/10623551?_k=6hlt8m'>【重要公告】素材中心视频上传、主图视频发布也升级啦！立即了解></a>"
              },
              'rules': [],
              'tips': "<a style='color:red' target='_blank' href='https://market.m.taobao.com/app/qn/toutiao-new/index-pc.html#/detail/10623551?_k=6hlt8m'>【重要公告】素材中心视频上传、主图视频发布也升级啦！立即了解></a>"
            },
            {
              'component': 'IceAddVideo2',
              'label': '视频',
              'name': 'standardVideo',
              'props': {
                'disableEdit': true,
                'bizCode': 'seller_normal_vod_publish',
                'autoGenerateCover': true,
                'label': '视频',
                'tips': '请上传画幅比例为1:1、16:9、9:16、3:4(如需装修到主图请不要使用9:16画幅)，清晰度高清(720P)及以上的视频，视频时长控制在9秒-10分钟(建议时长在3分钟以内)，大小300M以内。视频封面图与视频比例相同。<a href="https://www.yuque.com/taobaoduanshipin/hfd3ld/mbgfdh" target="_blank">详细要求请查看&gt;&gt;</a>',
                'value': {
                  'fileId': '0179-d7489d2c-8b032fca-79cb7f3e-2aa0',
                  'snapshot': 'https://img.alicdn.com/imgextra/i4/6000000000319/O1CN012GrQue1EE91ridlze_!!6000000000319-0-tbvideo.jpg'
                }
              },
              'rules': [],
              'tips': '请上传画幅比例为1:1、16:9、9:16、3:4(如需装修到主图请不要使用9:16画幅)，清晰度高清(720P)及以上的视频，视频时长控制在9秒-10分钟(建议时长在3分钟以内)，大小300M以内。视频封面图与视频比例相同。<a href="https://www.yuque.com/taobaoduanshipin/hfd3ld/mbgfdh" target="_blank">详细要求请查看&gt;&gt;</a>',
              'updateOnChange': 'true'
            },
            {
              'component': 'Text',
              'label': '',
              'name': 'titleGuid',
              'props': {
                'label': '',
                'value': '',
                'tips': ' <span style="font-size:14px;color:#666">标题</span>&nbsp;&nbsp;<a href="https://light.taobao.com/#/titleSkill" target="_blank">标题技巧&gt;</a>'
              },
              'rules': [],
              'tips': ' <span style="font-size:14px;color:#666">标题</span>&nbsp;&nbsp;<a href="https://light.taobao.com/#/titleSkill" target="_blank">标题技巧&gt;</a>'
            },
            {
              'component': 'Input',
              'label': '',
              'name': 'title',
              'props': {
                'label': '',
                'tips': '请用第一人称简述主题和推荐理由，尽量通俗易懂。（前12个字可能会应用于淘宝各渠道标题展示，注意精练哦）',
                'cutString': false,
                'maxLength': 16,
                'hasLimitHint': true,
                'value': '11111'
              },
              'rules': [
                {
                  'pattern': '^[\\s\\S]{0,16}$',
                  'type': 'string',
                  'message': '文字长度太长, 要求长度最多为16'
                },
                {
                  'type': 'string',
                  'message': '标题不能为空',
                  'required': true
                }
              ],
              'tips': '请用第一人称简述主题和推荐理由，尽量通俗易懂。（前12个字可能会应用于淘宝各渠道标题展示，注意精练哦）'
            },
            {
              'component': 'Text',
              'label': '',
              'name': 'coverGuid',
              'props': {
                'label': '',
                'value': '',
                'tips': ' <span style="font-size:14px;color:#666">视频封面</span>&nbsp;<a href="https://light.taobao.com/#/coverRule/cwal" target="_blank">看封面要求&gt;</a>'
              },
              'rules': [],
              'tips': ' <span style="font-size:14px;color:#666">视频封面</span>&nbsp;<a href="https://light.taobao.com/#/coverRule/cwal" target="_blank">看封面要求&gt;</a>'
            },
            {
              'component': 'CreatorAddImage',
              'label': '',
              'name': 'standardCover',
              'props': {
                'max': 1,
                'triggerSize': {
                  'width': '150',
                  'height': '150'
                },
                'pixFilter': '750x750',
                'min': 1,
                'enableCropTypeSelect': true,
                'cropTypeOptions': [
                  '3:4'
                ],
                'newComponent': false,
                'label': '',
                'cropType': '3:4',
                'tips': '    &nbsp; &nbsp; &nbsp;&nbsp;视频同比例的封面图<br/> （1:1视频封面图不小于750*750，16:9视频封面不小于1334*750，9:16视频封面尺寸不小于750*1334 ，3:4视频封面尺寸不小于750*1000）',
                'value': [
                  {
                    'anchors': [],
                    'autoGenerate': 'mvap_cover',
                    'height': 1440,
                    'hotSpaces': [],
                    'resourceFeatures': {},
                    'url': 'https://img.alicdn.com/imgextra/i2/2780948662/O1CN01KA8s8c2DrFPBg9DZM_!!2780948662-0-tmap.jpg',
                    'width': 1080
                  }
                ]
              },
              'rules': [
                {
                  'type': 'array',
                  'message': '原始封面图必填',
                  'required': true
                },
                {
                  'min': 1,
                  'type': 'array',
                  'message': '原始封面图必填'
                },
                {
                  'max': 1,
                  'type': 'array',
                  'message': '最多允许1个'
                }
              ],
              'tips': '    &nbsp; &nbsp; &nbsp;&nbsp;视频同比例的封面图<br/> （1:1视频封面图不小于750*750，16:9视频封面不小于1334*750，9:16视频封面尺寸不小于750*1334 ，3:4视频封面尺寸不小于750*1000）',
              'updateOnChange': 'true'
            },
            {
              'component': 'CreatorAddImage',
              'label': '',
              'name': 'image1x1',
              'props': {
                'max': 1,
                'triggerSize': {
                  'width': '150',
                  'height': '150'
                },
                'pixFilter': '750x750',
                'materialConfigs': [
                  {
                    'default': true,
                    'subTypeUrl': '//resource.taobao.com/material/image/subtype/query?type=Resource',
                    'materialType': 'image',
                    'asyncGetSubType': true,
                    'supportRoles': [
                      'seller',
                      'daren'
                    ],
                    'filterConfigs': [
                      {
                        'component': 'Search',
                        'show': true,
                        'asyncGet': false,
                        'props': {
                          'name': 'title',
                          'placeholder': '关键词'
                        }
                      }
                    ],
                    'type': 'Resource',
                    'desc': '自定义(原我的图片)'
                  },
                  {
                    'queryUrl': '//resource.taobao.com/material/image/query?type=Mainpic',
                    'default': true,
                    'materialType': 'image',
                    'asyncGetSubType': false,
                    'supportRoles': [
                      'seller'
                    ],
                    'filterConfigs': [
                      {
                        'component': 'Select',
                        'show': true,
                        'asyncGet': true,
                        'props': {
                          'queryUrl': '//resource.taobao.com/material/image/filter/query?filterType=Mainpic_item_category',
                          'name': 'item_category',
                          'placeholder': '商品类目'
                        }
                      },
                      {
                        'component': 'Search',
                        'show': true,
                        'asyncGet': false,
                        'props': {
                          'name': 'item_title',
                          'placeholder': '商品标题'
                        }
                      }
                    ],
                    'sortConfigs': [
                      {
                        'orderKey': 'orderBy',
                        'default': true,
                        'name': 'sold_quantity',
                        'enableSort': [
                          'desc'
                        ],
                        'defaultSort': 'desc',
                        'title': '商品销量'
                      },
                      {
                        'orderKey': 'orderBy',
                        'default': false,
                        'name': 'gmt_modified',
                        'enableSort': [
                          'desc'
                        ],
                        'title': '修改时间'
                      }
                    ],
                    'type': 'Mainpic',
                    'desc': '商品主图'
                  },
                  {
                    'default': true,
                    'subTypeUrl': '//resource.taobao.com/material/image/subtype/query?type=PicCenter',
                    'materialType': 'image',
                    'asyncGetSubType': true,
                    'supportRoles': [
                      'seller'
                    ],
                    'filterConfigs': [
                      {
                        'component': 'Search',
                        'show': true,
                        'asyncGet': false,
                        'props': {
                          'name': 'title',
                          'placeholder': '关键词'
                        }
                      }
                    ],
                    'type': 'PicCenter',
                    'desc': '图片空间'
                  }
                ],
                'min': 1,
                'enableCropTypeSelect': true,
                'cropTypeOptions': [
                  '1:1'
                ],
                'newComponent': true,
                'label': '',
                'cropType': '1:1',
                'tips': '    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1:1封面图 <br/>  &nbsp; &nbsp;（不小于750*750px）',
                'value': [
                  {
                    'anchors': [],
                    'autoGenerate': 'mvap_cover',
                    'height': 1080,
                    'hotSpaces': [],
                    'resourceFeatures': {},
                    'url': 'https://img.alicdn.com/imgextra/i4/2780948662/O1CN01kS9lZa2DrFP0KBNqD_!!2780948662-0-tmap.jpg',
                    'width': 1080
                  }
                ]
              },
              'rules': [
                {
                  'type': 'array',
                  'message': '1:1封面图必填',
                  'required': true
                },
                {
                  'min': 1,
                  'type': 'array',
                  'message': '1:1封面图必填'
                },
                {
                  'max': 1,
                  'type': 'array',
                  'message': '最多允许1个'
                }
              ],
              'tips': '    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1:1封面图 <br/>  &nbsp; &nbsp;（不小于750*750px）',
              'updateOnChange': 'true'
            },
            {
              'component': 'TagPicker',
              'label': '视频分类',
              'name': 'cpvlabels',
              'props': {
                'showTabs': true,
                'maxSelected': 1,
                'minSelected': 1,
                'label': '视频分类',
                'dataSource': {
                  '618尖货大赏': [
                    {
                      'parent': '618尖货大赏',
                      'label': '美妆护肤馆',
                      'value': '15:1473:85463'
                    },
                    {
                      'parent': '618尖货大赏',
                      'label': '女神美搭馆',
                      'value': '15:1473:85464'
                    },
                    {
                      'parent': '618尖货大赏',
                      'label': '智能家电馆',
                      'value': '15:1473:85465'
                    },
                    {
                      'parent': '618尖货大赏',
                      'label': '潮男穿搭馆',
                      'value': '15:1473:85466'
                    },
                    {
                      'parent': '618尖货大赏',
                      'label': '母婴好物馆',
                      'value': '15:1473:85467'
                    },
                    {
                      'parent': '618尖货大赏',
                      'label': '运动户外馆',
                      'value': '15:1473:85468'
                    },
                    {
                      'parent': '618尖货大赏',
                      'label': '新潮数码馆',
                      'value': '15:1473:85469'
                    },
                    {
                      'parent': '618尖货大赏',
                      'label': '潮流配饰馆',
                      'value': '15:1473:85470'
                    },
                    {
                      'parent': '618尖货大赏',
                      'label': '美食豪饮馆',
                      'value': '15:1473:85471'
                    },
                    {
                      'parent': '618尖货大赏',
                      'label': '居家好物馆',
                      'value': '15:1473:85472'
                    }
                  ],
                  '视频内容类型': [
                    {
                      'parent': '视频内容类型',
                      'label': '生产工艺',
                      'value': '15:111:60225'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '深度评测',
                      'value': '15:111:66031'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '技能教程',
                      'value': '15:111:76720'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '开箱体验',
                      'value': '15:111:76721'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '搭配攻略',
                      'value': '15:111:76722'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '主题清单',
                      'value': '15:111:76723'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '时尚街拍',
                      'value': '15:111:76725'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '生活记录',
                      'value': '15:111:76726'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '产地溯源',
                      'value': '15:111:76727'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '线下探店',
                      'value': '15:111:76728'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '情景剧场',
                      'value': '15:111:76729'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '店铺故事',
                      'value': '15:111:76732'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '才艺秀',
                      'value': '15:111:77574'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '直播预告',
                      'value': '15:111:82183'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '直播精剪',
                      'value': '15:111:82184'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '明星宣传',
                      'value': '15:111:82901'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '纯外观展示',
                      'value': '15:111:84994'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '介绍讲解',
                      'value': '15:111:84997'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '痛点解决',
                      'value': '15:111:84998'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '使用前后对比',
                      'value': '15:111:84999'
                    },
                    {
                      'parent': '视频内容类型',
                      'label': '卡点换装',
                      'value': '15:111:85000'
                    }
                  ]
                },
                'value': [
                  '15:1473:85468',
                  '15:1473:85470',
                  '15:1473:85472'
                ]
              },
              'rules': [
                {
                  'type': 'array',
                  'message': '至少选择1个标签',
                  'required': true
                },
                {
                  'min': true,
                  'type': 'array',
                  'message': '至少选择1个标签'
                },
                {
                  'max': true,
                  'type': 'array',
                  'message': '最多允许选择1个标签'
                }
              ]
            },
            {
              'component': 'CreatorAddTopicNew',
              'label': '',
              'name': 'topics',
              'props': {
                'label': '',
                'title': '官方话题内容创作',
                'bDialogVisible': false,
                'dataSource': '{"data":[],"success":false}',
                'desc': '围绕特定话题创作的优质内容获得微淘推荐机会获取额外流量',
                'value': []
              },
              'rules': [],
              'updateOnChange': 'true'
            },
            {
              'component': 'CreatorPush',
              'label': '',
              'name': 'pushWeitao',
              'props': {
                'html2': '选中可推至微淘',
                'html': '推送到微淘',
                'disabled': false,
                'label': '',
                'iconUrl': 'https://gw.alicdn.com/tfs/TB1m1IjRpXXXXbEaFXXXXXXXXXX-34-34.png',
                'iconActiveUrl': 'https://gw.alicdn.com/tfs/TB1AIwCRpXXXXbdaXXXXXXXXXXX-32-32.png',
                'value': false
              },
              'rules': [],
              'updateOnChange': 'true'
            },
            {
              'component': 'Text',
              'label': '',
              'name': 'weitaoTips',
              'props': {
                'label': '',
                'value': '',
                'tips': ''
              },
              'rules': [],
              'tips': ''
            }
          ],
          'formData': {
            'template': '',
            'owner': 'creator',
            'formName': 'seller_normal_vod_publish',
            'source': 'video',
            'userRole': 'seller',
            'version': '4',
            'serverData': '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'
          },
          'labelCol': 3,
          'name': 'PUBLISH_FORM__PC',
          'updateUrl': '//cpub2.taobao.com/async.json?_tb_token_=3617e76e4b3ae'
        },
        'status': 'success'
      },
      submitUrl: 'https://cpub2.taobao.com/submit.json?_tb_token_=3617e76e4b3ae',
      Referer: 'https://we.taobao.com/',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      submitFormData: {
        'actions': [
          {
            'size': 'large',
            'span': 2,
            'offset': 5,
            'type': 'primary',
            'needValidate': true,
            'disabled': false,
            'style': {'display': 'none'},
            'name': 'submit',
            'text': '发布(今日可发:78篇)',
            'url': '//cpub2.taobao.com/submit.json?_tb_token_=3617e76e4b3ae'
          }
        ],
        'children': [
          {
            'component': 'Text',
            'label': '',
            'name': 'guid',
            'props': {
              'label': '',
              'value': '填写视频基础信息',
              'tips': "<a style='color:red' target='_blank' href='https://market.m.taobao.com/app/qn/toutiao-new/index-pc.html#/detail/10623551?_k=6hlt8m'>【重要公告】素材中心视频上传、主图视频发布也升级啦！立即了解></a>"
            },
            'rules': [],
            'tips': "<a style='color:red' target='_blank' href='https://market.m.taobao.com/app/qn/toutiao-new/index-pc.html#/detail/10623551?_k=6hlt8m'>【重要公告】素材中心视频上传、主图视频发布也升级啦！立即了解></a>"
          },
          {
            'component': 'IceAddVideo2',
            'label': '视频',
            'name': 'standardVideo',
            'props': {
              'disableEdit': true,
              'bizCode': 'seller_normal_vod_publish',
              'autoGenerateCover': true,
              'label': '视频',
              'tips': '请上传画幅比例为1:1、16:9、9:16、3:4(如需装修到主图请不要使用9:16画幅)，清晰度高清(720P)及以上的视频，视频时长控制在9秒-10分钟(建议时长在3分钟以内)，大小300M以内。视频封面图与视频比例相同。<a href="https://www.yuque.com/taobaoduanshipin/hfd3ld/mbgfdh" target="_blank">详细要求请查看&gt;&gt;</a>',
              'value': {
                'fileId': '0179-d7489d2c-8b032fca-79cb7f3e-2aa0',
                'snapshot': 'https://img.alicdn.com/imgextra/i4/6000000000319/O1CN012GrQue1EE91ridlze_!!6000000000319-0-tbvideo.jpg'
              }
            },
            'rules': [],
            'tips': '请上传画幅比例为1:1、16:9、9:16、3:4(如需装修到主图请不要使用9:16画幅)，清晰度高清(720P)及以上的视频，视频时长控制在9秒-10分钟(建议时长在3分钟以内)，大小300M以内。视频封面图与视频比例相同。<a href="https://www.yuque.com/taobaoduanshipin/hfd3ld/mbgfdh" target="_blank">详细要求请查看&gt;&gt;</a>',
            'updateOnChange': 'true'
          },
          {
            'component': 'Text',
            'label': '',
            'name': 'titleGuid',
            'props': {
              'label': '',
              'value': '',
              'tips': ' <span style="font-size:14px;color:#666">标题</span>&nbsp;&nbsp;<a href="https://light.taobao.com/#/titleSkill" target="_blank">标题技巧&gt;</a>'
            },
            'rules': [],
            'tips': ' <span style="font-size:14px;color:#666">标题</span>&nbsp;&nbsp;<a href="https://light.taobao.com/#/titleSkill" target="_blank">标题技巧&gt;</a>'
          },
          {
            'component': 'Input',
            'label': '',
            'name': 'title',
            'props': {
              'label': '',
              'tips': '请用第一人称简述主题和推荐理由，尽量通俗易懂。（前12个字可能会应用于淘宝各渠道标题展示，注意精练哦）',
              'cutString': false,
              'maxLength': 16,
              'hasLimitHint': true,
              'value': '11111'
            },
            'rules': [{
              'pattern': '^[\\s\\S]{0,16}$',
              'type': 'string',
              'message': '文字长度太长, 要求长度最多为16'
            }, {'type': 'string', 'message': '标题不能为空', 'required': true}],
            'tips': '请用第一人称简述主题和推荐理由，尽量通俗易懂。（前12个字可能会应用于淘宝各渠道标题展示，注意精练哦）'
          },
          {
            'component': 'Text',
            'label': '',
            'name': 'coverGuid',
            'props': {
              'label': '',
              'value': '',
              'tips': ' <span style="font-size:14px;color:#666">视频封面</span>&nbsp;<a href="https://light.taobao.com/#/coverRule/cwal" target="_blank">看封面要求&gt;</a>'
            },
            'rules': [],
            'tips': ' <span style="font-size:14px;color:#666">视频封面</span>&nbsp;<a href="https://light.taobao.com/#/coverRule/cwal" target="_blank">看封面要求&gt;</a>'
          },
          {
            'component': 'CreatorAddImage',
            'label': '',
            'name': 'standardCover',
            'props': {
              'max': 1,
              'triggerSize': {'width': '150', 'height': '150'},
              'pixFilter': '750x750',
              'min': 1,
              'enableCropTypeSelect': true,
              'cropTypeOptions': ['3:4'],
              'newComponent': false,
              'label': '',
              'cropType': '3:4',
              'tips': '    &nbsp; &nbsp; &nbsp;&nbsp;视频同比例的封面图<br/> （1:1视频封面图不小于750*750，16:9视频封面不小于1334*750，9:16视频封面尺寸不小于750*1334 ，3:4视频封面尺寸不小于750*1000）',
              'value': [{
                'anchors': [],
                'autoGenerate': 'mvap_cover',
                'height': 1440,
                'hotSpaces': [],
                'resourceFeatures': {},
                'url': 'https://img.alicdn.com/imgextra/i2/2780948662/O1CN01KA8s8c2DrFPBg9DZM_!!2780948662-0-tmap.jpg',
                'width': 1080
              }]
            },
            'rules': [{'type': 'array', 'message': '原始封面图必填', 'required': true}, {
              'min': 1,
              'type': 'array',
              'message': '原始封面图必填'
            }, {'max': 1, 'type': 'array', 'message': '最多允许1个'}],
            'tips': '    &nbsp; &nbsp; &nbsp;&nbsp;视频同比例的封面图<br/> （1:1视频封面图不小于750*750，16:9视频封面不小于1334*750，9:16视频封面尺寸不小于750*1334 ，3:4视频封面尺寸不小于750*1000）',
            'updateOnChange': 'true'
          },
          {
            'component': 'CreatorAddImage',
            'label': '',
            'name': 'image1x1',
            'props': {
              'max': 1,
              'triggerSize': {'width': '150', 'height': '150'},
              'pixFilter': '750x750',
              'materialConfigs': [{
                'default': true,
                'subTypeUrl': '//resource.taobao.com/material/image/subtype/query?type=Resource',
                'materialType': 'image',
                'asyncGetSubType': true,
                'supportRoles': ['seller', 'daren'],
                'filterConfigs': [{
                  'component': 'Search',
                  'show': true,
                  'asyncGet': false,
                  'props': {'name': 'title', 'placeholder': '关键词'}
                }],
                'type': 'Resource',
                'desc': '自定义(原我的图片)'
              }, {
                'queryUrl': '//resource.taobao.com/material/image/query?type=Mainpic',
                'default': true,
                'materialType': 'image',
                'asyncGetSubType': false,
                'supportRoles': ['seller'],
                'filterConfigs': [{
                  'component': 'Select',
                  'show': true,
                  'asyncGet': true,
                  'props': {
                    'queryUrl': '//resource.taobao.com/material/image/filter/query?filterType=Mainpic_item_category',
                    'name': 'item_category',
                    'placeholder': '商品类目'
                  }
                }, {
                  'component': 'Search',
                  'show': true,
                  'asyncGet': false,
                  'props': {'name': 'item_title', 'placeholder': '商品标题'}
                }],
                'sortConfigs': [{
                  'orderKey': 'orderBy',
                  'default': true,
                  'name': 'sold_quantity',
                  'enableSort': ['desc'],
                  'defaultSort': 'desc',
                  'title': '商品销量'
                }, {
                  'orderKey': 'orderBy',
                  'default': false,
                  'name': 'gmt_modified',
                  'enableSort': ['desc'],
                  'title': '修改时间'
                }],
                'type': 'Mainpic',
                'desc': '商品主图'
              }, {
                'default': true,
                'subTypeUrl': '//resource.taobao.com/material/image/subtype/query?type=PicCenter',
                'materialType': 'image',
                'asyncGetSubType': true,
                'supportRoles': ['seller'],
                'filterConfigs': [{
                  'component': 'Search',
                  'show': true,
                  'asyncGet': false,
                  'props': {'name': 'title', 'placeholder': '关键词'}
                }],
                'type': 'PicCenter',
                'desc': '图片空间'
              }],
              'min': 1,
              'enableCropTypeSelect': true,
              'cropTypeOptions': ['1:1'],
              'newComponent': true,
              'label': '',
              'cropType': '1:1',
              'tips': '    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1:1封面图 <br/>  &nbsp; &nbsp;（不小于750*750px）',
              'value': [{
                'anchors': [],
                'autoGenerate': 'mvap_cover',
                'height': 1080,
                'hotSpaces': [],
                'resourceFeatures': {},
                'url': 'https://img.alicdn.com/imgextra/i4/2780948662/O1CN01kS9lZa2DrFP0KBNqD_!!2780948662-0-tmap.jpg',
                'width': 1080
              }]
            },
            'rules': [{'type': 'array', 'message': '1:1封面图必填', 'required': true}, {
              'min': 1,
              'type': 'array',
              'message': '1:1封面图必填'
            }, {'max': 1, 'type': 'array', 'message': '最多允许1个'}],
            'tips': '    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1:1封面图 <br/>  &nbsp; &nbsp;（不小于750*750px）',
            'updateOnChange': 'true'
          },
          {
            'component': 'TagPicker',
            'label': '视频分类',
            'name': 'cpvlabels',
            'props': {
              'showTabs': true,
              'maxSelected': 1,
              'minSelected': 1,
              'label': '视频分类',
              'dataSource': {
                '618尖货大赏': [{
                  'parent': '618尖货大赏',
                  'label': '美妆护肤馆',
                  'value': '15:1473:85463',
                  'checked': false
                }, {
                  'parent': '618尖货大赏',
                  'label': '女神美搭馆',
                  'value': '15:1473:85464',
                  'checked': false
                }, {
                  'parent': '618尖货大赏',
                  'label': '智能家电馆',
                  'value': '15:1473:85465',
                  'checked': false
                }, {
                  'parent': '618尖货大赏',
                  'label': '潮男穿搭馆',
                  'value': '15:1473:85466',
                  'checked': false
                }, {
                  'parent': '618尖货大赏',
                  'label': '母婴好物馆',
                  'value': '15:1473:85467',
                  'checked': false
                }, {
                  'parent': '618尖货大赏',
                  'label': '运动户外馆',
                  'value': '15:1473:85468',
                  'checked': true
                }, {
                  'parent': '618尖货大赏',
                  'label': '新潮数码馆',
                  'value': '15:1473:85469',
                  'checked': false
                }, {
                  'parent': '618尖货大赏',
                  'label': '潮流配饰馆',
                  'value': '15:1473:85470',
                  'checked': false
                }, {
                  'parent': '618尖货大赏',
                  'label': '美食豪饮馆',
                  'value': '15:1473:85471',
                  'checked': false
                }, {'parent': '618尖货大赏', 'label': '居家好物馆', 'value': '15:1473:85472', 'checked': false}],
                '视频内容类型': [{
                  'parent': '视频内容类型',
                  'label': '生产工艺',
                  'value': '15:111:60225',
                  'checked': false
                }, {'parent': '视频内容类型', 'label': '深度评测', 'value': '15:111:66031', 'checked': true}, {
                  'parent': '视频内容类型',
                  'label': '技能教程',
                  'value': '15:111:76720',
                  'checked': false
                }, {'parent': '视频内容类型', 'label': '开箱体验', 'value': '15:111:76721', 'checked': false}, {
                  'parent': '视频内容类型',
                  'label': '搭配攻略',
                  'value': '15:111:76722',
                  'checked': false
                }, {'parent': '视频内容类型', 'label': '主题清单', 'value': '15:111:76723', 'checked': false}, {
                  'parent': '视频内容类型',
                  'label': '时尚街拍',
                  'value': '15:111:76725',
                  'checked': false
                }, {'parent': '视频内容类型', 'label': '生活记录', 'value': '15:111:76726', 'checked': false}, {
                  'parent': '视频内容类型',
                  'label': '产地溯源',
                  'value': '15:111:76727',
                  'checked': false
                }, {'parent': '视频内容类型', 'label': '线下探店', 'value': '15:111:76728', 'checked': false}, {
                  'parent': '视频内容类型',
                  'label': '情景剧场',
                  'value': '15:111:76729',
                  'checked': false
                }, {'parent': '视频内容类型', 'label': '店铺故事', 'value': '15:111:76732', 'checked': false}, {
                  'parent': '视频内容类型',
                  'label': '才艺秀',
                  'value': '15:111:77574',
                  'checked': false
                }, {'parent': '视频内容类型', 'label': '直播预告', 'value': '15:111:82183', 'checked': false}, {
                  'parent': '视频内容类型',
                  'label': '直播精剪',
                  'value': '15:111:82184',
                  'checked': false
                }, {'parent': '视频内容类型', 'label': '明星宣传', 'value': '15:111:82901', 'checked': false}, {
                  'parent': '视频内容类型',
                  'label': '纯外观展示',
                  'value': '15:111:84994',
                  'checked': false
                }, {'parent': '视频内容类型', 'label': '介绍讲解', 'value': '15:111:84997', 'checked': false}, {
                  'parent': '视频内容类型',
                  'label': '痛点解决',
                  'value': '15:111:84998',
                  'checked': false
                }, {
                  'parent': '视频内容类型',
                  'label': '使用前后对比',
                  'value': '15:111:84999',
                  'checked': false
                }, {'parent': '视频内容类型', 'label': '卡点换装', 'value': '15:111:85000', 'checked': false}]
              },
              'value': ['15:1473:85468', '15:111:66031']
            },
            'rules': [{'type': 'array', 'message': '至少选择1个标签', 'required': true}, {
              'min': true,
              'type': 'array',
              'message': '至少选择1个标签'
            }, {'max': true, 'type': 'array', 'message': '最多允许选择1个标签'}]
          },
          {
            'component': 'CreatorAddTopicNew',
            'label': '',
            'name': 'topics',
            'props': {
              'label': '',
              'title': '官方话题内容创作',
              'bDialogVisible': false,
              'dataSource': '{"data":[],"success":false}',
              'desc': '围绕特定话题创作的优质内容获得微淘推荐机会获取额外流量',
              'value': []
            },
            'rules': [],
            'updateOnChange': 'true'
          },
          {
            'component': 'CreatorPush',
            'label': '',
            'name': 'pushWeitao',
            'props': {
              'html2': '选中可推至微淘',
              'html': '推送到微淘',
              'disabled': false,
              'label': '',
              'iconUrl': 'https://gw.alicdn.com/tfs/TB1m1IjRpXXXXbEaFXXXXXXXXXX-34-34.png',
              'iconActiveUrl': 'https://gw.alicdn.com/tfs/TB1AIwCRpXXXXbdaXXXXXXXXXXX-32-32.png',
              'value': false
            },
            'rules': [],
            'updateOnChange': 'true'
          },
          {
            'component': 'Text',
            'label': '',
            'name': 'weitaoTips',
            'props': {'label': '', 'value': '', 'tips': ''},
            'rules': [],
            'tips': ''
          }
        ],
        'formData': {
          'template': '',
          'owner': 'creator',
          'formName': 'seller_normal_vod_publish',
          'source': 'video',
          'userRole': 'seller',
          'version': '4',
          'serverData': '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'
        },
        'labelCol': 3,
        'name': 'PUBLISH_FORM__PC',
        'updateUrl': '//cpub2.taobao.com/async.json?_tb_token_=3617e76e4b3ae'
      }
    }
  },
  watch: {
    fileList(newValue, oldValue) {
      console.log(newValue, oldValue);
    }
  },
  computed: {
    titles() {
      const titles = this.titleText.split('\n');
      return titles;
    }
  },
  methods: {
    handleMenuSelect(key, keyPath) {
      console.log(key, keyPath);
      this.menuIndex = key;
    },
    dealTitleText(value) {
      this.titleText = value;
    },
    dealFile(file, fileList) {
      let index = -1;
      this.videoList.forEach(function (item, indexItem) {
        if (item.name === file.name) {
          index = indexItem;
        }
      })
      if (index > -1) {
        this.$notify({
          title: '错误',
          message: '文件已经存在',
          type: 'warning'
        });
        return;
      }
      this.videoList[this.videoList.length] = file;
      console.log(fileList, file);

      console.log(this.videoList);
    },
    openUploader() {
      this.showUploder = !this.showUploder;
      let message;
      if (this.showUploder) {
        message = '上传窗口即将展示';
      } else {
        message = '上传窗口即将关闭';
      }
      this.$notify({
        title: '成功',
        message: message,
        type: 'success'
      });
    }
  }
});
</script>

<style lang="less" scoped>
.content_page {
  color: red;
  position: fixed;
  z-index: 100001;
  right: 10px;
  bottom: 10px;

  .content_page_main {
    color: green;
  }

}

.uploaderCustomDiv {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 999;

  .uploaderCustomDivCard {
    width: 100%;

    .card-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .buttonGroups {
        min-width: 40%;
        display: flex;
        justify-content: space-between;
      }
    }

    .customMainContent {
      flex-grow: 1;
    }
  }
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
.tableHeader{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
}
.el-aside {
  color: #333;
}
</style>
