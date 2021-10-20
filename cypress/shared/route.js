import { loginMgr } from '../integration/common/login'
import { LAB_APP_URL, MGR_APP_URL } from './constants'

const config = {
  'cvqualified-rate': 'manage/report-data/cvqualified-rate',
  'report-effect-outcontrol': 'manage/report-effect/report-effect-outcontrol',
  'report-effect-feedback': 'manage/report-effect/report-effect-feedback',
  //信息采集表
  'info-collection': 'collection/info-collection',
  //互认标准
  'mutual-standard': 'setting/mutual-result/mutual-standard',
  //实验室账户
  'lab-manager': 'manage/account/lab-manage',
  //比对计划组织
  'eqa-plan': 'eqa/eqa-plan',
  'eqa-notice': 'eqa/eqa-notice',
  'dept-extend': 'setting/system/dept-extend',
  'lesson-dict': 'manage/education/lesson-dict',
  'lesson': 'manage/education/lesson',
  'daily-screen': 'monitor/daily-screen',
  'report-monitor': 'setting/report-monitor',
  'report-effect-partake': 'manage/report-effect/report-effect-partake',
  'report-effect-appear': 'manage/report-effect/report-effect-appear',
  'alarm-rate': 'manage/report-data/alarm-rate',
  'report-effect-mutual': 'manage/report-effect/report-effect-mutual',
  //月度汇总报告
  'summary-month': 'manage/report-mgr/dept/summary-month',
  //实验室报告生成
  'report-lab': 'manage/report-mgr/lab/report-lab',
  //管理机构报告生成
  'report-gen': 'manage/report-mgr/dept/report-gen',
  //年度互认证书
  'cert-year':'manage/cert/cert-year',
  //差异性分析报告
  'qlab': 'manage/report-mgr/lab/qlab',
  'user-report': 'manage/education/user-report',
  'lesson-group': 'manage/education/lesson-group',
  'lesson-approve': 'manage/education/lesson-approve',
  'lesson-plan': 'manage/education/lesson-plan',
  'lesson-report': 'manage/education/lesson-report',
  //分级管理
  'manage-dept':'manage/account/manage-dept',
  //质控品管理
  'qc-mgr':'manage/iqcSet/qc-mgr',
  //监控内容配置
  'report-monitor':'setting/report-monitor',
  //EQA反馈报告
  'eqa-report': 'eqa/eqa-report',
  'help': 'message-mgr/help',
  'eqa-report':'eqa/eqa-report',
  //可选区域设置
  'area-set':'setting/area-set',
  'tags-service':'manage/tags/tags-service',
  'push-setting':'setting/message-setting/push-setting',
  'mutual-workday':'setting/mutual-result/mutual-workday',
  'report-rate':'manage/report-data/report-rate'
}

const labConfig = {
  'mutual-result':'lab/mutual-result',
  'ds-config':'detection-system/ds-config',
  'qc-data':'detection-system/qc-data',
  'qc-relate':'detection-system/qc-relate',
  'single-import':'iqc/single-import'
}

/**
 * 访问路由页面
 * @param {PageAlias} alias route.config 对应key
 */
export function visitPage (alias) {
  cy.visit(`${MGR_APP_URL}#/${config[alias]}`)
}

/**
 * 打开iframe 页面
 * @param {PageAlias} pageAlias 嵌入的iframe 的菜单
 */
export function visitIframePage (pageAlias, feature = 'admin') {
  loginMgr(feature, () => {
    visitPage(pageAlias)
    cy.get('iframe').invoke('attr', 'src').then(url => {
      cy.visit(url)
    })
  })
}

/**
 * 
 * @param {string} alias route.config 对应key
 */
export function visitLabPage (alias) {
  cy.visit(`${LAB_APP_URL}#/${labConfig[alias]}`)
}