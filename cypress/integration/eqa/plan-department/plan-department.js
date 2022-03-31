import {
  visitIframePage
} from "../../../shared/route"
import {
  clickOkInDialog,
  closeTips,
  okOnPopConfirm,
  withinDialog
} from "../../common/dialog"
import {
  interceptAll,
  waitIntercept,
  waitRequest
} from "../../common/http"
import {
  validSuccessMessage
} from "../../common/message"
import {
  activeSelect
} from "../../common/select"
import {
  getDialog
} from "../../message/message"
import {
  elform,
  findLabelOption
} from "../../mutual-result/mutual-item"
import {
  clickSearch
} from "../../setting/report-monitor/report-monitor"
import {
  mathRomdomNumber
} from "../../single-import/single-import"
import {
  getLabForm
} from "../../user-info/lab-info"
import {
  expandSearchConditions
} from "../eqa-order/eqa-order"
import {
  selectDropListValue
} from "../eqa-report/eqa-report"

export const interceptQueryDepartmentEqatestting = () => {
  return interceptAll('service/eqa/plan/needContrast/get?*', interceptQueryDepartmentEqatestting.name, '/cqb-base')
}

export const interceptQueryDepartmentLabEqa = () => {
  return interceptAll('service/eqa/plan/department/search?*', interceptQueryDepartmentLabEqa.name, '/cqb-base')
}

export const interceptDepartmentSimpleCode = () => {
  return interceptAll('service/eqa/plan/direct/collectSetting/get?*', interceptDepartmentSimpleCode.name, '/cqb-base')
}

export const collectItemName = (responseData) => {
  const itemName = responseData.items.map(item => {
    if (item.itemContrasts.length > 0) {
      return item.itemName
    }
  }).filter(itemName => itemName !== undefined)
  return itemName
}

const interceptSubmit = () => {
  return interceptAll('service/eqa/direct/eqaData/submit', interceptSubmit.name, '/cqb-base')
}

const interceptAudit = () => {
  return interceptAll('service/eqa/direct/eqaData/audit', interceptAudit.name, '/cqb-base')
}

export const interceptSaveDataCollectConfig = () => {
  return interceptAll('service/eqa/plan/direct/collectSetting/save', interceptSaveDataCollectConfig.name, '/cqb-base')
}

export const interceptQueryEqaData = () => {
  return interceptAll('service/eqa/direct/eqaData/search?*', interceptQueryEqaData.name, '/cqb-base')
}



/**
 * 
 * @param {array} result 后端返回的数组
 * @param {function} intercept 点击数据采集配置后需要拦截的接口
 * @param {function} saveConfig 保存数据的函数
 */
export const itemInfoConfig = (result, intercept, saveConfig) => {
  if (result.length > 0) {
    waitIntercept(intercept, () => {
      getLabForm().eq(0).findByText('数据采集配置').click({
        force: true
      })
      cy.wait(1000)
    }, responseData => {
      cy.wait(2000)
      let itemArray = []
      let differenceItem = []
      getDialog('数据采集配置').within(() => {
        cy.get('.data-table__body tbody').then(getLength => {
          const getItemArray = resolveItem(getLength.length)
          getItemArray[getLength.length - 1]
            .then((pageItem) => {
              itemArray = pageItem
              const itemName = collectItemName(responseData)
              for (let i = 0; i < itemName.length; i++) {
                if (itemArray.indexOf(itemName[i]) === -1) {
                  differenceItem.push(itemName[i])
                }
              }
              if (differenceItem.length > 0) {
                findLabelOption('上报项目').find('.el-input').click({
                  force: true
                })
                cy.wait(2000)
                for (let i = 0; i < differenceItem.length; i++) {
                  activeSelect(differenceItem[i])
                }
                cy.wait(1000)
                checkItemTesting(itemName)
                cy.wait(1000)
                saveConfig()
              } else {
                checkItemTesting(itemName)
                cy.wait(1000)
                saveConfig()
              }
            })
        })
      })
    })
  }
}

/**
 * 
 * @param {function} interceptSave 拦截保存数据的接口
 */
export const saveDataCollectConfig = (interceptSave) => {
  waitIntercept(interceptSave, () => {
    withinDialog(clickOkInDialog, '数据采集配置')
  }, () => {
    validSuccessMessage()
  })
}

/**
 * 
 * @param {array} result 后端返回的数据
 * @param {function} intercept 点击数据采集配置后需要拦截的接口
 * @param {function} saveConfig 保存数据的函数
 */
export const sampleConfig = (result, interceptFunction, saveConfig) => {
  const waitOptions = {
    timeout: 90000
  }
  if (result.length > 0) {
    waitRequest({
      waitOptions,
      intercept: interceptFunction,
      onBefore: () => {
        getLabForm().eq(0).findByText('数据采集配置').click({
          force: true
        })
        cy.wait(1000)
      },
      onSuccess: data => {
        const simpleCode = collectSimpleCode(data)
        getDialog('数据采集配置').within(() => {
          cy.get('#tab-2').click({
            force: true
          })
        })
        cy.wait(1000)
        if (simpleCode.length > 0) {
          for (let i = 0; i < simpleCode.length; i++) {
            fillSimpleCode(simpleCode[i], mathRomdomNumber(1, 1000))
          }
          cy.wait(1000)
          saveConfig()
        } else {
          saveConfig()
        }
      }
    })
  }
}

/**
 * 
 * @param {array} responseData 后端返回的数组
 * @returns 返回样本号
 */
export const collectSimpleCode = (responseData) => {
  const simpleCode = responseData.sampleContrasts.map(code => {
    return code.qrCode
  })
  return simpleCode
}

/**
 * 
 * @param {string} simpleCode 样本号的label
 * @param {*} value 对应的样本号
 */
const fillSimpleCode = (simpleCode, value) => {
  cy.get('.config-sample__item-code')
    .contains(simpleCode)
    .parents('.config-sample__item')
    .find('.el-input__inner')
    .clear()
    .type(value)
}

/**
 * 
 * @param {string} planName 计划名称
 * @param {number} year 年度
 * @param {numer} time 次数
 * @param {string} labCode 实验室编码
 * @param {string} mgrPath 管理端路径 默认是国家级EQA
 */
export const resetLabReport = (planName, year, time, labCode, mgrPath = 'eqa-deparment') => {
  visitIframePage(mgrPath)
  expandSearchConditions()
  cy.wait(1000)
  elform('name').clear().type(planName)
  elform('year').click()
  activeSelect(year)
  elform('times').click()
  activeSelect(time)
  clickSearch()
  cy.wait(1000)
  getLabForm().findByText('实验室管理').click({
    force: true
  })
  cy.wait(1000)
  getDialog('实验室管理').within(() => {
    cy.findAllByPlaceholderText('请输入实验室编码或名称').clear().type(labCode)
    cy.wait(1000)
    getLabForm().findByText('重置上报').click({
      force: true
    })
    okOnPopConfirm()
  })
}

/**
 * 
 * @param {string} planName 计划名称
 * @param {number} year 年份
 */
export const searchEqaPlan = (planName, year) => {
  cy.findAllByPlaceholderText('请输入比对计划名称关键字').type(planName)
  elform('year').click()
  selectDropListValue(year)
  elform('times').click()
  activeSelect('全部', false)
  clickSearch()
}

/**
 * 
 * @param {Array} itemName 项目名称
 * @param {Array} sampleContrasts 样本号
 */
export const auditAndReportData = (itemName, sampleContrasts) => {
  if (sampleContrasts.length > 0 && itemName.length > 0) { // 判断是否有检测体系
    console.log(itemName.length);
    for (let i = 0; i < itemName.length; i++) {
      for (let j = 0; j < sampleContrasts.length; j++)
        getDialog('结果上报').within(() => {
          cy.get('.el-table__body:visible .el-table__row')
            .findByText(itemName[i])
            .parents('.el-table__row')
            .find('.el-input__inner')
            .eq(j)
            .clear()
            .type(mathRomdomNumber(0, 50), {
              force: true
            })
        })
    }
    cy.findByText('审核').click({
      force: true
    })
    cy.wait(2000)
    elform('auditor').clear().type('审核人')
    elform('email').clear().type('12306@qq.com')
    waitIntercept(interceptAudit, () => {
      withinDialog(clickOkInDialog, '审核信息')
    }, () => {
      validSuccessMessage()
    })
    reportData()
  }
}

const reportData = () => {
  waitIntercept(interceptSubmit, () => {
    withinDialog(clickOkInDialog, '结果上报')
    closeTips('提示', '上报')
  }, () => {
    validSuccessMessage()
  })
}

/**
 * 
 * @param {Array} result 后端返回的数据
 * @param {function} intercept 拦截路由函数
 * @param {string} planName 计划名称
 * @param {number} year 年度
 * @param {number} time 次数
 * @param {string} mgrPath 管理端路径 默认是国家级EQA
 * @param {string} labPath 实验室端路径 默认是国家级EQA
 */
export const resultReport = (result, intercept, planName, year, time, mgrPath = 'eqa-department', labPath = 'plan-department') => {
  if (result.length > 0) {
    waitIntercept(intercept, () => {
      getLabForm().eq(0).findByText('结果上报').click({
        force: true
      })
      cy.wait(1000)
    }, data => {
      let itemName
      let sampleContrasts
      if (data.itemResults.length > 0) {
        itemName = data.itemResults.map(item => item.itemName)
      }
      if (data.sampleContrasts.length > 0) {
        sampleContrasts = data.sampleContrasts.map(sample => sample.qrCode)
      }
      if (data.status === 2) {
        resetLabReport(planName, year, time, 'gd18001', mgrPath)
        cy.visitLabPage(labPath, 'gd18001')
        searchEqaPlan(planName, year)
        cy.wait(1000)
        getLabForm().eq(0).findByText('结果上报').click({
          force: true
        })
        cy.wait(1000)
        auditAndReportData(itemName, sampleContrasts)
      } else if (data.status === 1) {
        reportData()
      } else {
        auditAndReportData(itemName, sampleContrasts)
      }
    })
  }
}

/**
 * 
 * @param {Array} itemResult 后端返回的数据
 * @param {Array} excelData 读取Excel的数据
 * @param {number} sampleNoLength 样本个数
 */
export const validExcelData = (itemResult, excelData, sampleNoLength) => {
  for (let i = 0; i < itemResult.length; i++) {
    expect(excelData[i + 1][0]).to.eq(i + 1)
    expect(excelData[i + 1][1]).to.eq(itemResult[i].itemName)
    expect(excelData[i + 1][2]).to.eq(itemResult[i].unit)
    expect(excelData[i + 1][sampleNoLength + 3]).to.eq(itemResult[i].instr)
    expect(excelData[i + 1][sampleNoLength + 4]).to.eq(itemResult[i].method)
    expect(excelData[i + 1][sampleNoLength + 5]).to.eq(itemResult[i].rea)
    expect(excelData[i + 1][sampleNoLength + 6]).to.eq(itemResult[i].calibrator)
  }
}

let getResult = []
const getItemName = (index) => {
  return new Promise((resolve) => {
    cy.get('.data-table__body tbody').eq(index).find('tr').eq(0).find('td').eq(1)
      .invoke('text')
      .then((getText) => {
        getResult.push(getText.replace(/[\r\n]/g, "").replace(/\s/g, ""))
        resolve(getResult)
      })
  })
}

const resolveItem = (getDataLength) => {
  let promises = []
  for (let i = 0; i < getDataLength; i++) {
    promises.push(Promise.resolve(getItemName(i)))
  }
  return promises
}

const checkItemTesting = (itemName) => {
  for (let i = 0; i < itemName.length; i++) {
    cy.get('.data-table__body tbody').findAllByText(itemName[i]).parents('tr').find('[type = radio]').eq(0).check({
      force: true
    })
  }
}