import dayjs from "dayjs"
import { clickListener } from "../../common/event"
import { validExcelFile } from "../../common/file"
import { interceptAll, waitIntercept } from "../../common/http"
import { elform } from "../../mutual-result/mutual-item"
import { clickSearch } from "../../setting/report-monitor/report-monitor"
import { getLabForm } from "../../user-info/lab-info"
import { validData } from "../eqa-plan/eqa-plan"
import { selectDropListValue } from "../eqa-report/eqa-report"
import { interceptQueryEqaData, validExcelData } from "../plan-department/plan-department"

export const eqaProvinceSearch = (year,time,keyword) => {
  if (year) {
    elform('year').click()
    selectDropListValue(year)
    waitIntercept(interceptQueryEqaPlan, () => {
      cy.wait(1000)
      clickSearch()
    }, data => {
      if (data.total > 0) {
        data.records.forEach(records => expect(records.year).to.equal(year))
      }
      validData(data.total)
    })
  }
  if (time) {
    elform('times').click()
    selectDropListValue(time)
    waitIntercept(interceptQueryEqaPlan, () => {
      cy.wait(1000)
      clickSearch()
    }, data => {
      if (data.total > 0) {
        data.records.forEach(records => expect(records.times).to.equal(time))
      }
      validData(data.total)
    })
  }
  if (keyword) {
    elform('name').clear().type(keyword)
    waitIntercept(interceptQueryEqaPlan, () => {
      cy.wait(1000)
      clickSearch()
    }, data => {
      if (data.total > 0) {
        data.records.forEach(records => expect(records.name).to.equal(keyword))
      }
      validData(data.total)
    })
  }
}

export const labEqaProvinceSearch = (keyword, year, time) => {
  if (year) {
    elform('year').click()
    selectDropListValue(year)
    waitIntercept(interceptQueryLabEqa, () => {
      cy.wait(1000)
      clickEqaSearch()
    }, data => {
      if (data.total > 0) {
        data.records.forEach(records => expect(records.year).to.equal(year))
      }
      validData(data.length)
    })
  }
  if (time) {
    elform('times').click()
    selectDropListValue(time)
    waitIntercept(interceptQueryLabEqa, () => {
      cy.wait(1000)
      clickEqaSearch()
    }, data => {
      if (data.total > 0) {
        data.records.forEach(records => expect(records.times).to.equal(time))
      }
      validData(data.length)
    })
  }
  if (keyword) {
    cy.findByPlaceholderText('请输入比对计划名称关键字').clear().type(keyword)
    waitIntercept(interceptQueryLabEqa, () => {
      cy.wait(1000)
      clickSearch()
    }, data => {
      console.log(data);
      if (data.total > 0) {
        data.records.forEach(records => expect(records.name).to.equal(keyword))
      }
      validData(data.length)
    })
  }
}

export const interceptViewPlan = () => {
  return interceptAll('service/plan/get?*',interceptViewPlan.name,' ')
}

export const interceptQueryEqaPlan = () => {
  return interceptAll('service/plan/province/search?*',interceptQueryEqaPlan.name,' ')
}

export const interceptQueryEqaPlanLab = () => {
  return interceptAll('service/plan/lab/list?*',interceptQueryEqaPlanLab.name,' ')
}

export const interceptQueryLabEqa = () => {
  return interceptAll('service/eqa/plan/province/search?*',interceptQueryLabEqa.name,'/cqb-base')
}

export const interceptQueryEqaTestting = () => {
  return interceptAll('service/eqa/plan/needContrast/get?*', interceptQueryEqaTestting.name,'/cqb-base')
}

export const getFormValue = (prop) => {
  return cy.get('.el-form:visible').last().find(`[for="${prop}"]`).next('.el-form-item__content')
}
/**
 * 
 * @param {string} prop label for = id
 * @param {*} value 断言的内容
 */
export const assertEqaForm = (prop,value) => {
  if (typeof value === 'number' && (value.toString().length) > 4) {
   const newDate = numberToDate(value)
   getFormValue(prop).should('contain',`${newDate}`)
  } 
  else {
  getFormValue(prop).should('have.text',`\n        ${value}\n      `)
 }
}
export const assertEqaBaseInfo = (responseData) => {
  assertEqaForm('year',responseData.baseInfo.year)
  assertEqaForm('times',responseData.baseInfo.times)
  assertEqaForm('specTypeId',responseData.baseInfo.sampleCount)
  assertEqaForm('testingBeginDate',responseData.baseInfo.testingBeginDate)
  assertEqaForm('submitExpireDate',responseData.baseInfo.testingEndDate)
  assertEqaForm('checkTime',responseData.baseInfo.feedbackBeginDate)
}

export const assertEqaItems = (responseData) => {
 cy.get('.el-card__body').should('have.length', responseData.items.length)
 if (responseData.items.length > 0) {
   for (let i = 0; i<responseData.items.length; i++) {
    cy.get('.el-card__body').eq(i).find('.plan-item__card-header').should('have.text',`\n        ${responseData.items[i].itemName}\n      `)
   }
 }
}

export const querySearchYear = () => {
  return interceptAll('service/eqa/plan/allYear/list?*', querySearchYear.name, '/cqb-base')
}

export const assertPlanLab = (responseData) => {
  getLabForm().should('have.length', responseData.labs.length)
  // if (responseData.labs.length > 0) {
  //   for (let i = 0; i<responseData.labs.length; i++) {
  //     getLabForm().eq(i).find('.cell').eq(1).should('have.text', responseData.labs[i].labName)
  //   }
  // }
}

export const interceptResetEqaReport = () => {
  return interceptAll('service/plan/lab/reset',interceptResetEqaReport.name,' ')
}

export const clickEqaSearch = () => {
  cy.get('[type="submit"]:visible').click({
    force:true
  })
}

/**
 * 
 * @param {number} number 数字格式日期，如20080512
 * @returns 返回可视化时间，如2008/05/12
 */
function numberToDate(number){
  return `${number}`.replace(
      /^(\d{4})(\d{2})(\d{2})$/,
      '$1-$2-$3');
  }

/**
 * 验证导出Excel中的数据
 */
export const validExcelEqaData = () => {
  waitIntercept(interceptQueryEqaData, () => {
    getLabForm().eq(0).findByText('结果上报').click({
      force: true
    })
  }, data => {
    const header = ['序号','项目','单位','仪器','方法','试剂','校准品']
    const sampleNo = data.sampleContrasts.map(sample => sample.sampleNo)
    const itemResult = data.itemResults.map(itemData =>{
      return {itemName:itemData.itemName,unit:itemData.unit,instr:itemData.instr,method:itemData.method,rea:itemData.rea,calibrator:itemData.calibrator}
    })
    cy.wait(1000)
    cy.get('[aria-label="结果上报"]').within(() => {
      clickListener(() => {
       cy.findByText('导出').click({
         force:true
       })
      })
      const fileName = 'EQA结果数据表.xlsx'
      validExcelFile(fileName, data => {
        //验证表头
        let flag
        let judge
        for (let i = 0; i < data[0].length; i++) {
          if (i <= 2) {
            expect(header[i]).to.eq(data[0][i])
            flag = i
          } else if (i === 3) {
            for (let j = 0; j < sampleNo.length; j++) {
              expect(sampleNo[j]).to.eq(data[0][i + j])
              judge = [i + j]
            }
          } else if (i === parseInt(judge) + 1 ) {
           for (let k = 1; k < ((data[0].length) - judge); k++) {
             expect(data[0][parseInt(judge) + k]).to.eq(header[flag + k])
           }
          } else {
            break
          }
        }
        //验证数据
      validExcelData(itemResult,data,sampleNo.length)
      })
    })
  })
}