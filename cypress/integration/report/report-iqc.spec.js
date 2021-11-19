import dayjs from 'dayjs'
import {
  visitPage
} from '../../shared/route'
import {
  activeDateMonth,
  getMonthZh
} from '../common/date'
import {
  clickOkInDialog,
  closeTips,
  confirmDelete,
  withinDialog
} from '../common/dialog'
import {
  clickListener
} from '../common/event'
import {
  validatePdfFile
} from '../common/file'
import {
  interceptAll,
  waitIntercept
} from '../common/http'
import {
  closeClientAlert,
  validSuccessMessage
} from '../common/message'
import {
  activeSelect
} from '../common/select'
import {
  expandSearchConditions
} from '../eqa/eqa-order/eqa-order'
import {
  elform
} from '../mutual-result/mutual-item'
import {
  clickSearch
} from '../mutual-workday/workdayUtil'
import { choseLab,closeViewPage,reportElformClickDay,reportOption } from './report-iqc'

export const findCreateReport = (prop) => {
  return cy.get(`[for=${prop}]:visible`).next('.el-form-item__content')
}

export const interceptCreateIqcReport = () => {
  return interceptAll('service/iqc/report/monthGenerate', interceptCreateIqcReport.name)
}


export const interceptPushIqcReport = () => {
  return interceptAll('service/mgr/iqc/month/push?id=*', interceptPushIqcReport.name + new Date().getTime())
}

export const interceptQueryIqcReport = () => {
  return interceptAll('service/mgr/iqc/month/new-page?*', interceptQueryIqcReport.name + new Date().getTime())
}

export const interceptLabViewIqcReport = () => {
  return interceptAll('service/base/iqc/month/updateRead?id=*', interceptLabViewIqcReport.name, '/cqb-base')
}

export const interceptLabIqcReport = () => {
  return interceptAll('service/base/iqc/month/new-page?*', interceptLabIqcReport.name, '/cqb-base')
}

export const labIqcReportOption = (index, btnsText) => {
  cy.get('.el-table__body:visible .el-table__row').eq(index).findByText(btnsText).click({
    force: true
  })
}

export const visitIqcPage = (labCode, monthString) => {
  visitPage('iqc')
  cy.wait(3000)
  closeClientAlert()
  cy.wait(1000)
  expandSearchConditions()
  elform('labName').clear().type(labCode)
  elform('reportType').click({
    force: true
  })
  activeSelect('项目分析报告')
  reportElformClickDay('月份范围', '开始时间')
  activeDateMonth(monthString)
  cy.wait(2000)
  reportElformClickDay('月份范围', '结束时间')
  activeDateMonth(monthString)
  clickSearch()
}



/**
 * IQC月度报告
 */
context('IQC月度报告', () => {
  before(() => {
    cy.visitPage('report-lab')
  })
  context('实验室端报告操作', () => {
    const labCode = 'gd18030'
    const year = dayjs().format('YYYY')
    const currentMonth = (dayjs().format('MM'))
    const month = currentMonth - 1
    let transformMonth
    if (month === 0) {
      transformMonth = '12'
    } else if (month < 10) {
      transformMonth = '0' + month
    } else {
      transformMonth = month
    }
    const monthString = year + '年' + getMonthZh(month)
    const day = dayjs().format('DD')
    const currentTime = year + '-' + currentMonth + '-' + day
    const pdfData = {
      Headers: '我是一颗远方孤星的泪水',
      monthDate: year + '年' + transformMonth + '月',
      iqcReportName: '结果互认专业室内质控数据室间化比对报告',
      reportType: '总结分析报告',
      labName: '实验室名称：佛山市妇幼保健院(gd18030)',
      reportDate: year + '-' + currentMonth + '-' + day
    }
    it('管理端推送成功,实验室端可以预览和下载', () => {
      // 管理端生成报告
      choseLab(labCode)
      cy.clickButton('生成月度报告')
      cy.wait(2000)
      findCreateReport('templateId').find('button').contains('报告模板一').click({
        force: true
      })
      elform('date').click()
      activeDateMonth(monthString)
      waitIntercept(interceptCreateIqcReport, () => {
        withinDialog(clickOkInDialog, '生成报告')
      }, () => {
        validSuccessMessage()
      })
      // 管理端推送报告
      visitIqcPage(labCode,monthString)
      cy.wait(1000)
      reportOption('推送')
      waitIntercept(interceptPushIqcReport, () => {
        closeTips('提示', '推送')
      }, () => {
        validSuccessMessage()
      })
      waitIntercept(interceptQueryIqcReport, () => {
        clickSearch()
      }, (data) => {
        data.data.forEach(item => expect(item.push).to.eq(true))
      })
      waitIntercept(interceptLabIqcReport, () => {
        cy.visitLabPage('report-iqc', 'labgd18030')
      }, (data) => {
        const filterData = data.data.map((item, index) => {
          const stringMonthDate = (item.createTime.split(' '))[0]
          let compareMonthDate = year + transformMonth
          if (item.month === compareMonthDate && item.reportType === 1 && stringMonthDate === currentTime) {
            return index
          }
        }).filter(filter => filter !== undefined)
        waitIntercept(interceptLabViewIqcReport, () => {
          labIqcReportOption(filterData[0], '预览')
        }, () => {
          closeViewPage()
        })
        clickListener(() => {
          labIqcReportOption(filterData[0], '下载')
        })
        const fileName = year + '年' + transformMonth + '月' + '广东省结果互认专业室内质控数据室间化比对报告.pdf'
        validatePdfFile(fileName, data => {
          expect(data.text).to.contain(pdfData.Headers)
          expect(data.text).to.contain(pdfData.monthDate)
          expect(data.text).to.contain(pdfData.iqcReportName)
          expect(data.text).to.contain(pdfData.reportType)
          expect(data.text).to.contain(pdfData.labName)
          expect(data.text).to.contain(pdfData.reportDate)
        })
      })
    })
    it('验证报告状态', () => {
      visitIqcPage(labCode,monthString)
      waitIntercept(interceptQueryIqcReport, () => {
        clickSearch()
      }, data => {
        data.data.forEach(item => expect(item.read).to.eq(true) && expect(item.downloadTime).to.include(currentTime))
        data.data.forEach(item => expect(item.download).to.eq(true))
        cy.get('.el-table__body .el-table__row').contains('已下载').should('exist')
        cy.get('.el-table__body .el-table__row').contains('已阅读').should('exist')
        reportOption('取消推送')
        waitIntercept(interceptPushIqcReport, () => {
          cy.wait(1000)
          confirmDelete()
        }, () => {
          validSuccessMessage()
        })
        waitIntercept(interceptQueryIqcReport, () => {
          clickSearch()
        }, (data) => {
          data.data.forEach(item => item.push === false)
          cy.wait(1000)
        })
        reportOption('删除')
        confirmDelete()
      })
    })
  })
})