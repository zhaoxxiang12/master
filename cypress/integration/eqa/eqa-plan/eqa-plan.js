
import { getMonthZh } from '../../common/date'
import { clickOkInDialog, withinDialog } from '../../common/dialog'
import { interceptAll,waitIntercept,waitRequest } from '../../common/http'
import {
  activeSelect
} from "../../common/select"

/**
 * 
 * @param {*} startTime 日期的开始时间
 * @param {*} endTime   日期的结束时间
 */
export function selectDay(startTime, endTime) {
  cy.get('.el-picker-panel:visible')
    .should('exist')
    .within(() => {
      cy.get('.el-picker-panel__content.el-date-range-picker__content.is-left:visible')
        .should('exist').within(() => {
          //开始时间
          cy.get('.el-date-table').find('tr').eq(startTime).find('td').eq(startTime).click({
            force: true
          })
          //结束时间
          cy.get('.el-date-table').find('tr').eq(endTime).find('td').eq(endTime).click({
            force: true
          })
        })
    })
}

export function interceptAddPlan() {
  return interceptAll('service/plan/add', interceptAddPlan.name, '')
}

/**
 * 点击确定保存表单
 */
export function subimtInformation(title='新增比对计划') {
  // const confire = 15
  // cy.get('#app').find('.el-button.el-button--primary.el-button--medium').eq(confire).click({
  //   force: true
  // })
  withinDialog(clickOkInDialog,title)
}

export function selectDate(prop) {
  cy.get(`[for =${prop}] + .el-form-item__content`).click()
  cy.wait(500)
}

/**
 * 
 * @param {string} message  
 */
export function iframeValidMessage(message) {
  cy.get('.el-message__content').should('have.text', message)
}
/**
 * 
 * @param {string} information 
 */
export function errorInformation(information) {
  cy.get('.el-form-item__error').should('contain', information)
}

/**
 * 
 * @param {string} prop 
 * @returns 
 */

export function getIframeElement(prop) {
  return cy.get(`.el-form.eqa-plan-info [for=${prop}]`).next('.el-form-item__content').find('.el-input__inner')
}

/**
 * 点击重置按键
 */
export function reset() {
  cy.get('.el-form').eq(2).findByText('重置').click({
    force: true
  })
}

/**
 * 
 * @param {string} prop 下拉框
 * @returns 
 */
export function iframeDropList(prop) {
  return cy.get('.el-form.eqa-plan-info').findAllByPlaceholderText(prop)
}
/**
 * 
 * @param {string} keyword 
 */
export function searchPlan(keyword) {
  //搜索新增的比对计划
  cy.get('.panel-dept .ql-search').within(() => {
    const $input = cy.get('[placeholder="请输入比对计划名称关键字"]:visible')
    console.log($input)
    $input.clear()

    if (keyword) {
      $input.type(keyword)
    }

    cy.get('.ql-search__btns button')
      .contains('搜索')
      .click({
        force: true
      })
      cy.wait(2000)
  })
  // cy.get('[placeholder="请输入比对计划名称关键字"]').first().clear({
  //   force: true
  // }).type(keyword, {
  //   force: true
  // })
  // cy.get('button').contains('搜索').click({
  //   force: true
  // })
  // cy.wait(1000)
}

export function cancelPush() {
  return interceptAll('service/plan/cancelPush?id=*', cancelPush.name, '')
}

/**
 * 上报截止时间
 */
export function submitExpireDate() {
  let newTime = new Date()
  let year = newTime.getFullYear()
  let localTime = newTime.toLocaleDateString() //2021/9/17
  let dateStrs = localTime.split('/')
  let month = dateStrs[1]
  let day = dateStrs[2]
  cy.get('.el-picker-panel.el-date-picker.el-popper:visible')
    .should('exist')
    .within(() => {
      cy.get('.el-date-picker__header-label').first().click({
        force: true
      })
      //年份
      cy.get('.el-year-table').find('tr').contains(year).click({
        force: true
      })
      const monthUpper = getMonthZh(month)
      //月份
      cy.get('.el-month-table').find('tr').contains(monthUpper).click({
        force: true
      })
      cy.wait(500)
      //日期
      cy.get('.el-date-table').find('.available').contains(day).click({
        force: true
      })
    })
}

/**
 * 筛选条件查询
 * @param {string} majorName 专业分类
 * @param {number} year 年度
 * @param {string} keyword 关键词
 * @param {number} times  次数
 * @param {string} status 计划推送状态
 * @param {string} organization 质控主管单位
 */
export function queryPlanData(majorName, year, keyword, times, status, organization) {
  cy.get('.el-form.el-form--inline').last().findByText('展开').click({
    force: true
  })
  cy.wait(1000)
  if (organization) {
    cy.get('.el-form').first().findAllByPlaceholderText('请选择').last().click()
    activeSelect(organization)
    waitIntercept(queryData, clickSearch, data => {
      const length = data.total
      console.log(data);
      if (length) {
        validData(length)
      }
    })
  }
  if (majorName) {
    //使用专业查询
    cy.get('.el-form').eq(2).findAllByPlaceholderText('请选择').first().click()
    activeSelect(majorName)
    waitIntercept(queryData, clickSearch, data => {
      const length = data.total
      if (length) {
        cy.wait(2000)
        data.records.forEach(plan => expect(plan.specTypeName).equal(majorName))
      }
      validData(length)
    })
  }
  if (year) {
    //使用年度查询
    cy.get('.el-form').eq(2).findAllByPlaceholderText('请选择').eq(1).click()
    activeSelect(year)
    waitIntercept(queryData, clickSearch, data => {
      const length = data.total
      if (length) {
        data.records.forEach(plan => expect(plan.year).equal(year))
      }
      validData(length)
    })
  }
  if (keyword) {
    //使用关键字查询
    cy.get('.el-form').eq(2).findAllByPlaceholderText('请输入比对计划名称关键字').type(keyword)
    waitIntercept(queryData, clickSearch, data => {
      const length = data.total
      validData(length)
      if (length) {
        data.records.forEach(plan => expect(plan.name).contain(keyword))
      }
    })
  }
  if (times) {
    //次数查询
    cy.get('.el-form').eq(2).findAllByPlaceholderText('请选择').eq(2).click()
    activeSelect(times)
    waitIntercept(queryData, clickSearch, data => {
      const length = data.total
      if (length) {
        data.records.forEach(plan => expect(plan.times).equal(times))
      }
      validData(length)
    })
  }
  if (status) {
    //状态查询
    cy.get('.el-form').eq(2).findAllByPlaceholderText('请选择').last().click()
    activeSelect(status)
    waitIntercept(queryData, clickSearch, data => {
      const length = data.total
      if (length) {
        if (status === '已推送') {
          data.records.forEach(plan => expect(plan.status).equal(1))
        }
        if (status === '待推送') {
          data.records.forEach(plan => expect(plan.status).equal(0))
        }
      }
      validData(length)
    })
  }
}


const params = {
  planName: {
    type: 1,
    value: 'name'
  },
  planCompareCode: {
    type: 1,
    value: 'code'
  },
  year: {
    type: 2,
    value: 'year'
  },
  times: {
    type: 3,
    index: 1
  },
  majorName: {
    type: 3,
    index: 2
  },
  simpleNum: {
    type: 4
  },
  issueTime: {
    type: 5,
    col: 'sendedTime'
  },
  issueEndTime: {
    type: 5,
    col: 'sendedTime'
  },
  testStartTime: {
    type: 6,
    col: 'checkTime'
  },
  testEndTime: {
    type: 6,
    col: 'checkTime'
  },
  feedBackStartTime: {
    type: 7,
    col: 'feedbackTime'
  },
  feedBackEndTime: {
    type: 7,
    col: 'feedbackTime'
  },
  labCode: {
    type: 8
  }
}

export function addEqaPlan(paramsMap) {
  //   let issueTime = 1
  //   let issueEndTime = 2
  //   let testStartTime = 3
  //   let testEndTime = 4
  //   let feedBackStartTime = 5
  //   let feedBackEndTime = 6
  // 点击添加计划
  cy.get('.el-button.el-button--primary.el-button--medium.is-plain').first().click()
  //上报截止时间
  selectDate("submitExpireDate")
  submitExpireDate()
  const compareMap = {}
  for (const key in params) {
    const context = params[key]
    if (context.type >= 5 && context.type < 8) {
      (compareMap[context.col] || (compareMap[context.col] = [])).push(key)
    } else if (context.type < 5) {
      if (paramsMap[key]) {
        switch (context.type) {
          case 1:
            getIframeElement(context.value).type(paramsMap[key])
            break
          case 2:
            getIframeElement(context.value).click()
            cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains(paramsMap[key]).click()
            break;
          case 3:
            iframeDropList('请选择').eq(context.index).click()
            activeSelect(paramsMap[key])
            break;
          case 4:
            cy.get('.el-form.eqa-plan-info [role="spinbutton"]').clear().type(paramsMap[key])
            break;
        }
      }
    } else {
      for (const k in compareMap) {
        const compareArr = compareMap[k]
        const strat = paramsMap[compareArr[0]]
        const end = paramsMap[compareArr[1]]
        if (strat && end) {
          selectDate(k)
          selectDay(strat, end)
        }
      }
      if (paramsMap[key]) {
        cy.get('button').contains('下一步').click({
          force: true
        })
        cy.get('button').contains('下一步').click({
          force: true
        })
        cy.get('[placeholder="请输入实验室名称或编码"]').last().type(paramsMap[key], {
          force: true
        })
        cy.wait(1000)
        cy.get('.el-form.el-form--inline').last().find('.el-icon-search').first().click({
          force: true
        })
        cy.wait(1000)
        cy.get('.ql-card-list__list').find('.el-card.is-always-shadow.ql-card-list__item').last().click()
      }
    }
  }

}

/**
 * 
 * @param {string} modelName 
 */
export function eqaModel(modelName) {
  let randomCode = parseInt(Math.random() * 100000)
  const planName = '自动测试计划' + randomCode
  const planCompareCode = 'plan' + randomCode
  const majorName = '临床免疫学'
  const simpleNum = 3
  const times = 6
  addEqaPlan({
    planName,
    planCompareCode,
    majorName,
    simpleNum,
    times
  })
  cy.get('button').contains('保存为模板').click()
  //输入模板名称
  if (modelName) {
    cy.get('.el-form').last().find('.el-input__inner').clear().type(modelName, {
      force: true
    })
  }
}

/**
 * 
 * @param {string} planName 
 * @param {*} danger 
 */
export function cannotPush(planName, danger) {
  searchPlan(planName)
  cy.get('.el-table__row').first().find('td').find('.el-switch').should('have.class', 'is-disabled')
  if (danger) {
    cy.get('.el-table__row').first().find('td').eq(1).find('.el-tooltip.el-icon-warning').should('have.class', 'is-danger')
  }
  //删除计划
  cy.get('.el-table__row').first().find('td').last().find('.el-button.el-button--text.el-button--medium').contains('删除').click({
    force: true
  })
  waitIntercept(deletePlanReq, () => {
    cy.get('.el-popconfirm__action').last().find('button').contains('确定').click()
  }, data => {

  })
}

export const pushPlanReq = () => {
  return interceptAll('service/plan/push?id=*', pushPlanReq.name, '')
}

export const deletePlanReq = () => {
  return interceptAll('service/plan/delete?id=*', deletePlanReq.name, '')
}
/**
 * 
 * @param {string} errorMessage 
 * @param {*} clear 
 */
export function modelLength(errorMessage, clear) {
  cy.get('button').contains('选择模板').click()
  cy.get('.el-table__body').last().find('.el-table__row').then((length) => {
    let getLength = length.length
    cy.get('button').contains('保存为模板').click()
    if (clear) {
      cy.get('.el-form').last().find('.el-input__inner').clear()
    }
    cy.get('.el-form').last().find('button').contains('保存').click({
      force: true
    })
    cy.get('.el-form-item__error').should('contain', errorMessage)
    cy.get('button').contains('选择模板').click()
    cy.get('.el-table__body').last().find('.el-table__row').should('have.length', getLength)
  })
}

/**
 * 查询数据
 * @returns 
 */
export function queryData() {
  return interceptAll('service/plan/search?* ', queryData.name+new Date().getTime(), '')
}

/**
 * 点击搜索
 */
const clickSearch = () => {
  cy.get('.el-form').eq(2).findByText('搜索').click()
  cy.wait(1000)
}

/**
 * 
 * @param {number} length 
 */
export function validData(length) {
  if (length === 0) {
    cy.get('body').contains('暂无数据')
  } else if (length > 20) {
    cy.get('.el-pagination__total').should('have.text', '共 ' + length + ' 条')
  } else {
    cy.get('.el-table__body').first().find('.el-table__row').should('have.length', length)
  }
}


/**
 * 点击取消
 */
export function cancelElform(prop) {
  cy.get(`[aria-label="${prop}"]`).find('.el-dialog__footer').last()
    .findAllByText('取消')
    .last()
    .click({
      force: true
    })
}

export const queryReportedLab = () => {
  return interceptAll('service/plan/lab/list?planId=*', queryReportedLab.name, '')
}

export const confirmClick = (prop) => {
  cy.get(`[aria-label="${prop}"]`).find('.el-dialog__footer').last()
    .findAllByText('确定')
    .last()
    .click({
      force: true
    })
  cy.wait(1000)
}

export function interceptModelAdd() {

  return interceptAll('service/template/form/add', interceptModelAdd.name, '')
}

export const interceptEditModel = () => {
  return interceptAll('/service/template/form/edit', interceptEditModel.name, '')
}

/**
 * 检验比对计划编码唯一
 */
export const checkCompareCode = () => {
  const planCompareCode = 'test11'
  const planName = '计划'
  const times = 8
  addEqaPlan({
    planName,
    planCompareCode,
    times
  })
  waitRequest({
    intercept: interceptAddPlan,
    onBefore: () => {
      subimtInformation('新增比对计划')
    },
    onSuccess: (data) => {
      iframeValidMessage('添加比对计划成功')
      checkCompareCode()
    },
    onError: () => {
      iframeValidMessage('比对计划编码必须唯一')
      cancelElform('新增比对计划')
    }
  })
}

/**
 * 校验计划名称+次数+年度唯一
 */
export const checkPlan = () => {
  let randomCode = parseInt(Math.random() * 100000)
  const year = 2021
  const planName = '订单验证2'
  const planCompareCode = 'plan' + randomCode
  const times = 2
  addEqaPlan({
    year,
    planName,
    planCompareCode,
    times
  })
  waitRequest({
    intercept: interceptAddPlan,
    onBefore: () => {
      subimtInformation()
    },
    onSuccess: (data) => {
      iframeValidMessage('添加比对计划成功')
      checkPlan()

    },
    onError: () => {
      iframeValidMessage('计划名称-年度-次数结合必须唯一')
      cancelElform('新增比对计划')
    }
  })
}

/**
 * 报告模板编辑
 * @param {string} value 
 */
export const checkbox = (value) => {
  cy.get('.el-form.plan-report').find('[type="checkbox"]').check(value, {
    force: true
  })
}

const reportModelIntercept = () => {
  return interceptAll('/service/template/form/add', reportModelIntercept.name, '')
}

export const editReportModel = (modelName, lab, instr, method, rea, calibrator) => {
  searchPlan('订单验证2')
  cy.get('.el-table__body').eq(1).find('.el-table__row').findByText('生成报告').click({
    force: true
  })
  if (lab) {
    checkbox('lab')
  }
  if (instr) {
    checkbox('instr')
  }
  if (method) {
    checkbox('method')
  }
  if (rea) {
    checkbox('rea')
  }
  if (calibrator) {
    checkbox('calibrator')
  }
  cy.get('.el-dialog__footer').eq(6).findByText('保存为模板').click({
    force: true
  })
  cy.get('.el-form').last().find('.el-input__inner').clear({
    force: true
  })
  if (modelName) {
    cy.get('.el-form').last().find('.el-input__inner')
      .type(modelName, {
        force: true
      })

  }
}

export const saveReportModel = () => {
  cy.get('.el-form').last().find('button').contains('保存').click({
    force: true
  })
}


export const checkModelName = (modelName) => {
  const lab = 'lab'
  reportModel(modelName, lab)
}


export const submitReportModel = () => {
  cy.get('[aria-label="生成报告"]').find('.el-form-item.is-required.el-form-item--medium').first().then(el => {
    if (el.hasClass('is-success') === true) {
      waitRequest({
        intercept: reportModelIntercept,
        onBefore: () => {
          cy.get('.el-form').last().find('button').contains('保存').click({
            force: true
          })
        },
        onSuccess: () => {
          iframeValidMessage('模板保存成功')
        }
      })
    } else {
      cy.get('.el-form-item__error').should('contain', '请选择所属组')
    }
  })
}

/**
 * 
 * @param {string} prop 弹框名称
 * @param {string} text 文本关键字
 * @returns 
 */
export function findButton(prop, text) {
  return cy.get(`[aria-label="${prop}"]`).findAllByText(text).last()
}

export function clickGenerateReport() {
  cy.get('.el-table__body').eq(1).find('.el-table__row').findByText('生成报告').click({
    force: true
  })
}

export const generateReport = () => {
  return interceptAll('service/feedback/generate', generateReport.name, '')
}

export const interceptQueryData = () => {
  return interceptAll('service/plan/search?cclCode=*', interceptQueryData.name, '')
}

export function interceptSendSimple() {
  return interceptAll('service/plan/sample/save', interceptSendSimple.name, '')
}