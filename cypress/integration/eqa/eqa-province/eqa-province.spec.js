import { visitIframePage } from "../../../shared/route"
import { okOnPopConfirm } from "../../common/dialog"
import { waitIntercept} from "../../common/http"
import { validSuccessMessage } from "../../common/message"
import { activeSelect } from "../../common/select"
import { getDialog } from "../../message/message"
import { elform } from "../../mutual-result/mutual-item"
import { clickSearch } from "../../setting/report-monitor/report-monitor"
import { getLabForm } from "../../user-info/lab-info"
import { expandSearchConditions } from "../eqa-order/eqa-order"
import { reset } from "../eqa-plan/eqa-plan"
import { selectDropListValue } from "../eqa-report/eqa-report"
import { interceptDepartmentSimpleCode, interceptQueryEqaData, interceptSaveDataCollectConfig, itemInfoConfig, resultReport, sampleConfig, saveDataCollectConfig, searchEqaPlan, simpleConfig } from "../plan-department/plan-department"
import {assertEqaBaseInfo, assertEqaItems, assertPlanLab, clickEqaSearch, eqaProvinceSearch, interceptQueryEqaPlan, interceptQueryEqaPlanLab, interceptQueryEqaTestting, interceptQUeryEqaTestting, interceptQueryLabEqa, interceptResetEqaReport, interceptSaveProvinceEqaItemTesting, interceptViewPlan, labEqaProvinceSearch, querySearchYear, validExcelEqaData } from "./eqa-province"

/**
 * 省EQA
 */
context('省EQA', () => {
  context('管理端', () => {
    before(() => {
      visitIframePage('eqa-province')
      cy.wait(3000)
      expandSearchConditions()
      cy.wait(2000)
    })
    context('筛选条件', () => {
      it('年度', () => {
        eqaProvinceSearch(2019)
        reset()
      })
      it('次数', () => {
        eqaProvinceSearch(null,2)
        reset()
      })
      it('关键字', () => {
        eqaProvinceSearch(null,null,'全血细胞计数')
        reset()
      })
    })
    context('操作', () => {
      let getData
      before(() => {
        elform('year').click()
        cy.wait(1000)
        selectDropListValue('2019')
        waitIntercept(interceptQueryEqaPlan, () => {
          clickSearch()
        }, data => {
          getData = data
        })
      })
      it('查看计划', () => {
        if (getData.total > 0) {
          cy.get('.el-table__fixed-right').within(() => {
            waitIntercept(interceptViewPlan, () => {
              getLabForm()
              .findByText('查看EQA计划')
              .click({
                force:true
              })
            }, data => {
              cy.wait(1000)
              cy.document()
              .its('body').within(() => {
                getDialog('查看EQA计划').within(() => {
                  assertEqaBaseInfo(data)
                  cy.wait(1000)
                  cy.findByText('下一步').click({
                    force:true
                  })
                  cy.wait(1000)
                  assertEqaItems(data)
                  cy.wait(1000)
                  cy.findByText('下一步').click({
                    force:true
                  })
                  cy.wait(1000)
                  expandSearchConditions()
                  elform('status').click()
                  activeSelect('全部')
                  cy.get('[type="submit"]:visible').click({
                    force:true
                  })
                  cy.wait(1000)
                  assertPlanLab(data)
                  cy.findByText('关闭').click({
                    force:true
                  })
                })
              })
            })
          })
        }
      })
      it('实验室管理', () => {
        if (getData.total > 0) {
          cy.get('.el-table__fixed-right').within(() => {
            waitIntercept(interceptQueryEqaPlanLab, () => {
              getLabForm()
              .findByText('实验室管理')
              .click({
                force:true
              })
            }, data => {
              cy.wait(1000)
              if (data.length > 0) {
                cy.document()
                .its('body').within(() => {
                  getDialog('实验室管理').within(() => {
                    cy.findByPlaceholderText('请输入实验室编码或名称')
                    .clear()
                    .type(data[0].labCode)
                    cy.wait(1000)
                    waitIntercept(interceptResetEqaReport, () => {
                      getLabForm().findByText('重置上报').click({
                        force:true
                      })
                      okOnPopConfirm()
                    }, () => {
                      cy.findByText('关闭').click({
                        force:true
                      })
                    })
                  })
                })
              }
            })
          })
          validSuccessMessage()
        }
      })
    })
  })
  context('实验室端', () => {
    let getYear
    before(() => {
      waitIntercept(querySearchYear, () => {
        cy.visitLabPage('plan-province', 'gd18001')
      }, data => {
        getYear = data
      })
    })
    context('筛选条件', () => {
      before(() => {
        cy.wait(2000)
      })
      it('关键字', () => {
        labEqaProvinceSearch('全血细胞计数')
        cy.findByPlaceholderText('请输入比对计划名称关键字').clear()
      })
      it('年度', () => {
        labEqaProvinceSearch(null,2019)
      })
      it('次数', () => {
        labEqaProvinceSearch(null,null,1)
      })
    })
    context('操作', () => {
      let result
      before(() => {
        cy.wait(2000)
        elform('year').click()
        activeSelect(2019, false)
        waitIntercept(interceptQueryLabEqa, () => {
          clickEqaSearch()
          cy.wait(1000)
        }, data => {
          result = data
        })
      })
      context('数据采集配置', () => { 
        it('项目信息配置', () => {
          itemInfoConfig(result,interceptQueryEqaTestting,() => {
            saveDataCollectConfig(interceptSaveDataCollectConfig)
            cy.wait(1000)
          })
        })
        it('样本号配置', () => {
          sampleConfig(result, interceptDepartmentSimpleCode, () => {
            saveDataCollectConfig(interceptSaveDataCollectConfig)
          })
        })     
      })
      context('数据上报/导出', () => {
        const planName = '广东'
        before(() => {
          if (getYear.length > 1) {
            const year = getYear[1]
            searchEqaPlan(planName, year)
            waitIntercept(interceptQueryLabEqa, () => {
              clickEqaSearch()
              cy.wait(1000)
            }, data => {
              result = data
            })
          } else {
            const year = getYear[0]
            searchEqaPlan(planName, year)
            waitIntercept(interceptQueryLabEqa, () => {
              clickEqaSearch()
              cy.wait(1000)
            }, data => {
              result = data
            })
          }
        })
        it('数据上报', () => {
          if (result.length) {
            const planName = result[0].name
            const year = result[0].year
            const time = result[0].times
            const path = 'eqa-province'
            const labPath = 'plan-province'
            resultReport(result, interceptQueryEqaData, planName, year, time, path, labPath)
          }
        })
        it('导出数据', () => {
          validExcelEqaData()
        })
      })
    })
  })
})