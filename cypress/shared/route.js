import { MGR_APP_URL } from './constants'

const config = {
  'cvqualified-rate': 'manage/report-data/cvqualified-rate',
  'report-effect-outcontrol': 'manage/report-effect/report-effect-outcontrol',
  //信息采集表
  'info-collection':'collection/info-collection',
  //互认标准
  'mutual-standard':'setting/mutual-result/mutual-standard',
  //实验室账户
  'lab-manager':'manage/account/lab-manage',
  //比对计划组织
  'eqa-plan':'eqa/eqa-plan',
  'dept-extend': 'setting/system/dept-extend',
  'daily-screen': 'monitor/daily-screen',
  'report-monitor': 'setting/report-monitor',
  'report-effect-partake': 'manage/report-effect/report-effect-partake',
  'report-effect-appear': 'manage/report-effect/report-effect-appear',
  'alarm-rate': 'manage/report-data/alarm-rate',
  'report-effect-mutual': 'manage/report-effect/report-effect-mutual',
  //月度汇总报告
  'summary-month':'manage/report-mgr/dept/summary-month',
  //实验室报告生成
  'report-lab':'manage/report-mgr/lab/report-lab',
  //管理机构报告生成
  'report-gen':'manage/report-mgr/dept/report-gen',
  //年度互认证书
  'cert-year':'manage/cert/cert-year',
  //差异性分析报告
  'qlab':'manage/report-mgr/lab/qlab'
 
}

/**
 * 访问路由页面
 * @param {string} alias route.config 对应key
 */
export function visitPage (alias) {
  cy.visit(`${MGR_APP_URL}#/${config[alias]}`)
}