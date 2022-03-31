import { activeYear } from "../common/date"
import { closeTips } from "../common/dialog"
import { interceptAll, waitRequest } from "../common/http"
import { validErrorMsg, validSuccessMessage } from "../common/message"
import { activeSelect } from "../common/select"
import { elform } from "../mutual-result/mutual-item"

/**
 * 
 * @param {string} text 点击某个功能点
 */
const findPoint = (text) => {
  cy.get('.el-collapse-item__header').contains(text).click({
    force:true
  })
}

/**
 * 
 * @param {string} text 按键文本
 * @param {number} buttonIndex 按键索引 默认值为零
 */
const clickPonitButton = (text, buttonIndex = 0) => {
  cy.findAllByText(text).eq(buttonIndex).click({
    force:true
  })
}

/**
 * @param {string} text 功能点文案
 * @param {Function} option 在该功能点下的操作
 */

const withinPointOption = (text, option) => {
  cy.get('.el-collapse-item').contains(text).parents('.el-collapse-item').within(() => {
    option() && option()
  })
}

/**
 * 
 * @param {function} interceptFunction 拦截路由函数
 * @param {function} option 拦截路由前的操作
 * @param {boolean} closeCollapse 是否需要点击功能点关闭 默认不需要
 * @param {text} text 功能点文案
 */
const pointIsAvailable = (interceptFunction, option, closeCollapse = false, text) => {
  const waitOptions = {
    timeout: 90000
  }
  waitRequest({
    intercept: interceptFunction,
    waitOptions,
    onBefore: () => {
      option() && option
    },
    onSuccess: () => {
      validSuccessMessage()
    },
    onError: (msg) => {
      validErrorMsg(msg)
    }
  })
  if (closeCollapse === true) {
    findPoint(text)
    cy.wait(1000)
  }
}

const interceptPullEqa = () => {
  return interceptAll('service/mgr/eqa/importGdEqa?adminCclCode*', interceptPullEqa.name)
}

const interceptUpdateDataComprison = () => {
  return interceptAll('service/mgr/eqa/syncGdEqaItemCodeMap?adminCclCode*', interceptUpdateDataComprison.name)
}

const interceptSyncStandardData = () => {
  return interceptAll('service/mgr/code/sync*', interceptSyncStandardData.name)
}

const interceptUpdateLabGps = () => {
  return interceptAll('service/mgr/lab/updateAllNoGps', interceptUpdateLabGps.name)
}

const interceptPullPlan = () => {
  return interceptAll('service/v2/qi/pull-plan?*', interceptPullPlan.name)
}

const interceptPullEqaPlan = () => {
  return interceptAll('service/mgr/eqa/pullEqaPlan?*', interceptPullEqaPlan.name)
}

const interceptSyncReport = () => {
  return interceptAll('service/mgr/lab/report/monthdiff/syncReport?adminCclCode*', interceptSyncReport.name)
}

const interceptPullFeedbackReport = () => {
  return interceptAll('service/v2/report/EXT_KL_REF/pull?', interceptPullFeedbackReport.name)
}

const interceptPullPatientsReport = () => {
  return interceptAll('service/v2/report/EXT_KL_PAT/pull?reportType=EXT_KL_PAT', interceptPullPatientsReport.name)
}

const interceptPullLabFeedbackReport = () => {
  return interceptAll('service/v2/report/EXT_KL_QI/pull?reportType=EXT_KL_QI', interceptPullLabFeedbackReport.name)
}

context('通用功能', () => {
  before(() => {
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/system-seting/general')
  })
  context('拉取科临报告', () => {
    before(() => {
      findPoint('拉取科临报告')
      cy.wait(1000)
    })
    it('001-参考区间调查报告', () => {
      pointIsAvailable(interceptSyncReport, () => {
        withinPointOption('拉取科临报告', () => {
          elform('adminCclCode').click({
            force:true
          })
          cy.wait(1000)
          activeSelect('佛山市临床检验质量控制中心')
          clickPonitButton('拉取')
        })
      })
    })
    it('002-患者数据调查报告', () => {
      pointIsAvailable(interceptPullPatientsReport, () => {
        withinPointOption('拉取科临报告', () => {
          cy.get('[placeholder="请选择"]').first().click()
          cy.wait(1000)
          activeSelect('患者数据调查反馈报告')
          clickPonitButton('拉取')
        })
      })
    })
    it('003-实验室质量指标调查反馈报告', () => {
      pointIsAvailable(interceptPullPatientsReport, () => {
        withinPointOption('拉取科临报告', () => {
          cy.get('[placeholder="请选择"]').first().click()
          cy.wait(1000)
          activeSelect('实验室质量指标调查反馈报告')
          clickPonitButton('拉取')
        }, true, '拉取科临报告')
      })
    })
  })
  context('差异性分析报告', () => {
    before(() => {
      findPoint('拉取差异性分析报告')
      cy.wait(1000)
    })
    it('004-拉取差异性分析报告', () => {
      pointIsAvailable(interceptSyncReport, () => {
        clickPonitButton('拉取')
      }, true, '拉取差异性分析报告')
    })
  })
  context('EQA数据处理', () => {
    it('005-拉取广东EQA数据', () => {
      findPoint('EQA数据处理')
      cy.wait(2000)
      pointIsAvailable(interceptPullEqa, () => {
        clickPonitButton('拉取', 1)
      })
    })
    it('006-更新对照数据', () => {
      cy.wait(1000)
      pointIsAvailable(interceptUpdateDataComprison, () => {
        clickPonitButton('更新对照数据')
      }, true, 'EQA数据处理')
    })
  })
  context('同步数据', () => {
    it('007-同步标准数据', () => {
     findPoint('同步标准数据')
     cy.wait(1000)
     pointIsAvailable(interceptSyncStandardData, () => {
       clickPonitButton('同步')
       closeTips('提示', '同步')
     }, true, '同步标准数据')
    })
    it('008-同步GPS坐标', () => {
      findPoint('实验室GPS坐标')
      cy.wait(1000)
      pointIsAvailable(interceptUpdateLabGps, () => {
        clickPonitButton('同步', 1)
        closeTips('提示', '同步')
      }, true, '实验室GPS坐标')
    })
  })
  context('省/部EQA计划拉取', () => {
    before(() => {
      findPoint('省/部EQA计划拉取')
      cy.wait(1000)
    })
    it('009-部EQA', () => {
      pointIsAvailable(interceptPullEqaPlan, () => {
        clickPonitButton('拉取', 2)
      })
    })
    it('0010-省EQA', () => {
      cy.wait(1000)
      pointIsAvailable(interceptPullEqaPlan, () => {
        cy.get('[type ="radio"]').check('0',{
          force:true
        })
        clickPonitButton('拉取', 2)
      }, true, '省/部EQA计划拉取')
    })
  })
  context('质量指标上报计划拉取', () => {
    before(() => {
      findPoint('质量指标上报计划拉取')
      cy.wait(1000)
    })
    it('011-质量指标上报计划拉取', () => {
      pointIsAvailable(interceptPullPlan, () => {
        withinPointOption('质量指标上报计划拉取', () => {
          elform('adminCclCode').click({
            force:true
          })
          cy.wait(1000)
          activeSelect('浙江直采测试')
          elform('year').click({
            force:true
          })
          activeYear('2020')
        })
        clickPonitButton('拉取', 3)
      })
    })
  })
})