import { waitIntercept } from "../../common/http"
import { elform } from "../../mutual-result/mutual-item"
import { clickEqaSearch } from "../eqa-province/eqa-province"
import { selectDropListValue } from "../eqa-report/eqa-report"
import { itemInfoConfig, saveDataCollectConfig } from "../plan-department/plan-department"
import { interceptGetYear, interceptQueryProvinceEqaTesting, interceptSaveProvinceCollectConfig, interceptSearchProvinceEqaPlan, labEqaSearch } from "./plan-province"

/**
 * 省EQA
 */
context('省EQA', () => {
  context('实验室端', () => {
    let getYear
    before(() => {
      waitIntercept(interceptGetYear, () => {
        cy.visitLabPage('plan-province', 'gd18001')
      }, data => {
        getYear = data
      })
    })
    context('筛选条件', () => {
      it('关键字', () => {
        labEqaSearch('2019年广东省全血细胞计数室间质量评价', null, null, interceptSearchProvinceEqaPlan)
        cy.findAllByPlaceholderText('请输入比对计划名称关键字')
        .clear()
        cy.wait(1000)
      })
      it('年度', () => {
        labEqaSearch(null, getYear[1] , null, interceptSearchProvinceEqaPlan)
      })
      it('次数', () => {
        labEqaSearch(null, null, 1, interceptSearchProvinceEqaPlan)
      })
    })
    context('操作', () => {
      let result
      before(() => {
        cy.wait(2000)
          elform('year').click()
          selectDropListValue(getYear[1])
          waitIntercept(interceptSearchProvinceEqaPlan, () => {
            clickEqaSearch()
          }, data => {
            result = data
        })
      })
      context('数据采集配置', () => {
        it('项目信息配置', () => {
          itemInfoConfig(result, interceptQueryProvinceEqaTesting, () => {
            saveDataCollectConfig(interceptSaveProvinceCollectConfig)
          })
        })
      })
    })
  })
})