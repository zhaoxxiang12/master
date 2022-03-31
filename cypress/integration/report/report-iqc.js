import { interceptAll, waitIntercept } from '../common/http'
import { expandSearchConditions } from '../eqa/eqa-order/eqa-order'
import { elform } from '../mutual-result/mutual-item'
import { clickSearch } from '../setting/report-monitor/report-monitor'

const interceptQueryLab = () => {
  return interceptAll('service/mgr/lab/pageWithRole?*', interceptQueryLab.name)
}

export const choseLab = (labCode) => {
  expandSearchConditions('高级搜索')
  elform('labName').clear().type(labCode)
  waitIntercept(interceptQueryLab, () => {
    clickSearch()
    cy.wait(1000)
  }, () => {
    cy.get('.el-table__body:visible')
    .contains(labCode)
    .parents('.el-table__row')
    .find('[type=checkbox]').check({
      force: true
    })
  })
}

export const interceptQueryIqcReport = () => {
  return interceptAll('service/mgr/iqc/month/new-page?*', interceptQueryIqcReport.name)
}

export const reportElformClickDay = (labbelText, placeholderText,lab = false) => {
  if (lab === true) {
    cy.get('.el-form:visible').first().find('label').contains(labbelText).parent().findAllByPlaceholderText(placeholderText).click({
      force: true
    })
  } else {
    cy.get('.el-form').last().find('label').contains(labbelText).parent().findAllByPlaceholderText(placeholderText).click({
      force: true
    })
  }
}

export const reportOption = (btnsText) => {
  cy.get('.el-table__body .el-table__row').findByText(btnsText).click({
    force: true
  })
}

export const closeViewPage = () => {
  cy.get('.ql-frame-viewer__close').should('exist').click({
    force: true
  })
}