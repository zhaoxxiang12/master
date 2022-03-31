import { waitIntercept } from "../../common/http"
import { activeSelect } from "../../common/select"
import { elform } from "../../mutual-result/mutual-item"
import { clickEqaSearch, validExcelEqaData } from "../eqa-province/eqa-province"
import { selectDropListValue } from "../eqa-report/eqa-report"
import { labEqaSearch } from "../plan-province/plan-province"
import {interceptDepartmentSimpleCode, interceptQueryDepartmentEqatestting, interceptQueryDepartmentLabEqa, interceptQueryEqaData, interceptSaveDataCollectConfig, interceptSaveDepartmentDataCollectConfig, itemInfoConfig, resultReport, saveDataCollectConfig, searchEqaPlan, sampleConfig, validExcelData } from "./plan-department"

context('部EQA', () => {
  context('实验室端', () => {
    before(() => {
      cy.visitLabPage('plan-department','gd18001')
    })
    context('筛选条件', () => {
      it('关键字', () => {
        labEqaSearch('2021年全国常规化学室间质量评价',null,null,interceptQueryDepartmentLabEqa)
        cy.findAllByPlaceholderText('请输入比对计划名称关键字')
        .clear()
        cy.wait(1000)
      })
      it('年度', () => {
        labEqaSearch(null,2021,null,interceptQueryDepartmentLabEqa)
      })
      it('次数', () => {
        labEqaSearch(null,null,2,interceptQueryDepartmentLabEqa)
      })
    })
    context('操作', () => {
      let result
      before(() => {
        cy.wait(2000)
        elform('year').click()
        selectDropListValue(2021)
        elform('times').click()
        activeSelect(1)
       waitIntercept(interceptQueryDepartmentLabEqa, () => {
          clickEqaSearch()
          cy.wait(1000)
        }, data => {
          result = data
        })
      })
     context('数据采集配置', () => {
      it('项目信息配置', () => {
       itemInfoConfig(result,interceptQueryDepartmentEqatestting,() => {
          saveDataCollectConfig(interceptSaveDataCollectConfig)
          cy.wait(1000)
        })
      })
      it('样本号配置', () => {
        sampleConfig(result,interceptDepartmentSimpleCode, () => {
          saveDataCollectConfig(interceptSaveDataCollectConfig)
        })
      })
     })
     context('数据上报/导出数据', () => {
       const planName = '2021年全国内分泌室间质量评价'
       const year = 2021
       before(() => {
        cy.wait(2000)
      searchEqaPlan(planName, year)  
       waitIntercept(interceptQueryDepartmentLabEqa, () => {
          clickEqaSearch()
          cy.wait(1000)
        }, data => {
          result = data
        })
       })
       it('实验室上报数据', () => {
         resultReport(result,interceptQueryEqaData,planName,2021,1)
       })
       it('导出数据', () => {
        validExcelEqaData()
      })
     })
    })
  })
})