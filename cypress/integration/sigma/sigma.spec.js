import { waitIntercept } from "../common/http"
import { clickSearch } from "../setting/report-monitor/report-monitor"
import { getLabForm } from "../user-info/lab-info"
import { interceptSigma, SigmaCondition } from "./sigma"

/**
 * Sigma 度量工具
 */
context('Sigma度量工具', () => {
  before(() => {
    cy.visitLabPage('sigma','labgd18030')
    cy.wait(2000)
  })
  context('Sigma评价参数设置', () => {
    context('筛选条件', () => {
      it('项目分类', () => {
        const categoryName = '常规化学'
        SigmaCondition(categoryName)
        waitIntercept(interceptSigma, () => {
          clickSearch(false)
        }, data => {
          const filterData = data.map(item => {
            if (item.categoryName === categoryName) {
              return item
            }
          }).filter(filterItem => filterItem !== undefined)
          if (filterData.length > 0) {
            getLabForm().should('have.length',filterData.length)
            for (let i = 0;i <filterData.length; i++) {
              getLabForm().eq(i).find('.cell').eq(1).should('have.text',filterData[i].categoryName)
            }
          }
        })
      })
    })
  })
})