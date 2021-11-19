import dayjs from 'dayjs'
import {
  closeTips,
  confirmDelete
} from '../common/dialog.js'
import {
  clickListener
} from '../common/event.js'
import {
  validatePdfFile
} from '../common/file.js'
import {
  waitIntercept
} from '../common/http.js'
import {
  closeClientAlert,
  validSuccessMessage
} from '../common/message.js'
import {
  clickSearch
} from '../setting/report-monitor/report-monitor.js'
import {
  generateCertReport,
  interceptPushCert,
  interceptQueryCert,
  interceptQueryLabCert,
  interceptViewCert,
  interceptViewSummaryReport,
  labCertOption,
  visitCert
} from './cert-year.js'
import {
  choseLab,
  closeViewPage,
  reportOption
} from './report-iqc.js'

/**
 * 年度互认证书
 */
context('年度互认证书', () => {
  const labCode = 'gd18030'
  const year = dayjs().format('YYYY')
  const currentMonth = dayjs().format('MM')
  const day = dayjs().format('DD')
  const monthString = year + '/' + currentMonth + '/' + day
  const summaryData = {
    labName: '实验室名称：佛山市妇幼保健院(gd18030',
    reportDate: (monthString.replace(/\//g, '-')),
    technologySupport: '上海蔚一信息技术有限公司提供技术服务'
  }

  const certData = {
    labName: '佛山市妇幼保健院',
    validDate: (monthString.replace(/\//g, '-')),
    reportDate: year + '年' + currentMonth + '月' + day + '日'
  }

  context('实验室端操作', () => {
    before(() => {
      cy.visitPage('report-lab')
    })
    it('预览和下载', () => {
      const startTime = '2020年四月'
      const endTime = '2020年十一月'
      // 生成报告并推送至实验室端
      choseLab(labCode)
      generateCertReport(startTime, endTime, currentMonth, monthString)
      visitCert(labCode, monthString)
      cy.wait(20000)
      clickSearch()
      cy.wait(1000)
      reportOption('推送')
      let queryCert
      waitIntercept(interceptPushCert, () => {
        closeTips('提示', '推送')
        queryCert = interceptQueryCert()
      }, () => {
        validSuccessMessage()
        waitIntercept(queryCert, data => {
          data.data.forEach(item => expect(item.pushStatus).to.eq(true))
        })
      })
      waitIntercept(interceptQueryLabCert, () => {
        cy.visitLabPage('cert-year', 'labgd18030')
      }, data => {
        const rowIndex = data.data.map((item, index) => {
          let splitTime = (item.createTime).split(' ')[0]
          if (splitTime === (monthString.replace(/\//g, '-'))) {
            return index
          }
        }).filter(filterData => filterData !== undefined)
        if (rowIndex.length > 0) {
          // 预览汇总报告
          waitIntercept(interceptViewSummaryReport, () => {
            labCertOption(rowIndex[0], '预览').first().click({
              force: true
            })
          }, () => {

          })
          closeViewPage()
          //下载汇总报告
          const certificateNo = data.data[0].certificateNo
          const summaryReportName = certificateNo + '广东省佛山市临床检验结果互认报告.pdf'
          clickListener(() => {
            labCertOption(rowIndex[0], '下载').first().click({
              force: true
            })
          })
          validatePdfFile(summaryReportName, pdfData => {
            expect(pdfData.text).to.contain(summaryData.technologySupport)
            expect(pdfData.text).to.contain(summaryData.reportDate)
            expect(pdfData.text).to.contain(summaryData.labName)
            closeClientAlert()
          })
          // 预览互认证书
          waitIntercept(interceptViewCert, () => {
            labCertOption(rowIndex[0], '预览').last().click({
              force: true
            })
          }, () => {})
          closeViewPage()
          //下载互认证书
          clickListener(() => {
            labCertOption(rowIndex[0], '下载').last().click({
              force: true
            })
          })
          const certName = certificateNo + '广东省佛山市临床检验结果互认证书.pdf'
          validatePdfFile(certName, pdfData => {
            expect(pdfData.text).to.contain(certData.reportDate)
            expect(pdfData.text).to.contain(certData.validDate)
            expect(pdfData.text).to.contain(certData.labName)
            expect(pdfData.text).to.contain(certificateNo)
          })
        }
      })
    })
    it('验证报告状态', () => {
      visitCert(labCode, monthString)
      waitIntercept(interceptQueryCert, () => {
        clickSearch()
      }, data => {
        data.data.forEach(item => {
          expect(item.downloadStatus).to.eq(true)
          expect(item.readStatus).to.eq(true)
          cy.get('.el-table__body .el-table__row').contains('已下载').should('exist')
          cy.get('.el-table__body .el-table__row').contains('已阅读').should('exist')
          reportOption('取消推送')
          let queryCert
          waitIntercept(interceptPushCert, () => {
            queryCert = interceptQueryCert()
            confirmDelete()
            cy.wait(1000)
          }, () => {
            waitIntercept(queryCert, (data) => {
              data.data.forEach(certItem => {
                expect(certItem.downloadStatus).to.eq(false)
                expect(certItem.readStatus).to.eq(false)
                cy.get('.el-table__body .el-table__row').contains('已下载').should('not.exist')
                cy.get('.el-table__body .el-table__row').contains('已阅读').should('not.exist')
                reportOption('删除')
                confirmDelete()
                validSuccessMessage()
              })
            })
          })
        })
      })
    })
  })
})