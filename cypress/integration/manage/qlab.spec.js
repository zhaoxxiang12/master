import {
  confirmPushReport
} from '../common/button'
import {
  closeTips,
  confirmDelete
} from '../common/dialog'
import {
  interceptAll,
  waitIntercept
} from '../common/http'
import {
  validSuccessMessage
} from '../common/message'
import {
  expandSearchConditions
} from '../eqa/eqa-order/eqa-order'
/**
 * 差异性分析报告
 */
context('差异性分析报告', () => {
  const reset = () => {
    cy.get('.el-form').last().findByText('重置').click()
  }

  const clickSearchButton = (labCode) => {
    cy.get('.el-form').last().find('button').contains('搜索').click()
    cy.wait(1000)
  }

  const singlePushIntercept = () => {
    return interceptAll('service/mgr/lab/report/monthdiff/push?*', singlePushIntercept.name)
  }

  const batchPushIntercept = () => {
    return interceptAll('service/mgr/lab/report/monthdiff/batchPush', batchPushIntercept.name)
  }

  let result
  const queryData = () => {
    const name = queryData.name 
    cy.intercept(/\/cqb-base-mgr\/service\/mgr\/lab\/report\/monthdiff\/new-page\?[^-]*$/).as(name)
    return `@${name}`
  }

  const waitQueryData = (cb) => {
    waitIntercept(queryData, () => {
      cy.reload()
      cy.wait(3000)
    }, data => {
      result = data.data
    })
  }

  const typeKeyword = (keyword) => {
    cy.get('.el-form').last().findByPlaceholderText('实验室名称或编码').clear().type(keyword)
  }
  const selectDate = () => {
    cy.get('.el-form').last().find('[placeholder="开始时间"]').first().click()
    cy.get('.el-date-picker__header-label').first().invoke('text').then((year) => {
      let getYear = parseInt(year.substring(0, 4))
      let difference = getYear - 2021
      if (difference < 0) {
        for (let i = 0; i < Math.abs(difference); i++) {
          cy.get('[aria-label="前一年"]').click()
        }
      }
      //选择1月
      if (difference == 0) {
        cy.get('.el-month-table').contains('一月').click()
      }
    })
  }

  const validData = (formData, labName, city) => {
    formData = result
    expect(formData).to.exist
    if (formData.length == 0) {
      cy.get('body').should('contain', '暂无数据')
    }
    if (formData.length != 0) {
      cy.get('.el-table__body .el-table__row').should('have.length', formData.length)
      if (labName) {
        formData.forEach(item => expect(item.labName).contain(labName))
      }
      if (city) {
        formData.forEach(item => expect(item.city).contain(city))
      }
      if (labName && city) {
        formData.forEach(item => expect(item.labName).contain(labName))
        formData.forEach(item => expect(item.city).contain(city))
      }
    }
  }

  const pushQlabReport = (rowIndex) => {
    cy.wait(1000)
    waitIntercept(singlePushIntercept, () => {
      cy.get('.el-table__body .el-table__row').eq(rowIndex).findByText('推送').click()
      confirmPushReport()
    }, data => {
      validSuccessMessage()
      cy.get('.el-table__body .el-table__row').eq(rowIndex).findByText('取消推送').should('exist')
    })
  }
  const cancelQlabReport = (rowIndex) => {
    cy.wait(1000)
    waitIntercept(singlePushIntercept, () => {
      cy.get('.el-table__body .el-table__row').eq(rowIndex).findByText('取消推送').click()
      confirmDelete()
    }, data => {
      validSuccessMessage()
      cy.get('.el-table__body .el-table__row').eq(rowIndex).findByText('推送').should('exist')
    })
  }

  const cancelPushMany = () => {
    cy.wait(1000)
    cy.get('.has-gutter').find('[type = "checkbox"]').check('', {
      force: true
    })
    cy.get('.ql-search__tools-top.is-left').findByText('批量取消推送').click()
    batchPushIntercept()
    confirmDelete()
    waitIntercept(queryData, data => {
      data.data.forEach(item => expect(item.push).equal(false))
    })
  }

  const pushMany = (rowIndex) => {
    cy.get('.has-gutter').find('[type = "checkbox"]').check('', {
      force: true
    })
    cy.get('.ql-search__tools-top.is-left').findByText('批量推送').click()
    waitIntercept(batchPushIntercept, confirmPushReport, data => {
      waitIntercept(queryData, data => {
        data.data.forEach(item => expect(item.push).equal(true))
      })
    })
  }


  before(() => {
    // cy.loginCQB()
    cy.visitPage('qlab')
    // cy.get('.ql-search__header').find('button').contains('展开').click()
  })
  context('默认查询前三个月', () => {
    before(() => {
      waitQueryData()
    })
    it('001-界面是否存在数据', () => {
      validData()
    })
  })
  context('查询1-8月', () => {
    before(() => {
      expandSearchConditions('高级搜索')
      selectDate()
      waitIntercept(queryData, clickSearchButton, data => {
        result = data.data
      })
    })
    it('002-校验数据', () => {
      validData()
    })
    it('003-推送报告', () => {
      const rowIndex = result.findIndex(item => item.push == false)
      if (rowIndex === -1) {
        const changeIndex = 3
        cy.get('.el-table__body .el-table__row').eq(changeIndex).findByText('取消推送').should('exist')
        cancelQlabReport(changeIndex)
        cy.wait(500)
        cy.get('.el-table__body .el-table__row').eq(changeIndex).findByText('推送').should('exist')
        pushQlabReport(changeIndex)
      } else {
        cy.get('.el-table__body .el-table__row').eq(rowIndex).findByText('推送').should('exist')
        pushQlabReport(rowIndex)
      }
    })
    it('004-取消推送', () => {
      waitIntercept(queryData, clickSearchButton, data => {
        result = data.data
        const rowIndex = result.findIndex(report => report.push)
        if (rowIndex === -1) {
          const changeIndex = 4
          cy.get('.el-table__body .el-table__row').eq(changeIndex).findByText('推送').should('exist')
          pushQlabReport(changeIndex)
          cy.wait(500)
          cy.get('.el-table__body .el-table__row').eq(changeIndex).findByText('取消推送').should('exist')
          cancelQlabReport(changeIndex)
        } else {
          cy.get('.el-table__body .el-table__row').eq(rowIndex).findByText('取消推送').should('exist')
          cancelQlabReport(rowIndex)
        }
      })
    })
    it('005-已查看的报告状态栏显示已下载', () => {
      const rowIndex = result.findIndex(report => report.read)
      if (rowIndex !== -1) {
        cy.get('.el-table__body .el-table__row').eq(rowIndex).findByText('已阅读').should('exist')
      } else {
        cy.log('实验室暂未月度报告')
      }
    })
    it('006-已下载状态栏显示已下载', () => {
      const rowIndex = result.findIndex(report => report.download)
      if (rowIndex !== -1) {
        cy.get('.el-table__body .el-table__row').eq(rowIndex).findByText('已阅读').should('exist')
      } else {
        cy.log('实验室暂未月度报告')
      }
    })
  })
  context('批量推送/批量取消推送', () => {
    before(() => {
      selectDate()
      clickSearchButton()
      waitIntercept(queryData, clickSearchButton, data => {
        result = data.data
      })
    })
    it('007-批量推送', () => {
      const rowIndex = result.findIndex(item => item.push == false)
      if (rowIndex === -1) { //如果没有可推送的报告就将任意报告给取消推送
        let changeRow = 0
        cancelQlabReport(changeRow)
        pushMany()
      } else {
        pushMany(rowIndex)
      }

    })
    it('008-批量取消推送', () => {
      cancelPushMany()
      // reset()
    })
  })
  context('筛选条件', () => {
    it('009-地区查询', () => {
      selectDate()
      cy.get('.el-form').last().findByPlaceholderText('请选择省').click({
        force: true
      })
      //地区选择上海
      cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('上海市').click()
      waitIntercept(queryData, clickSearchButton, data => {
        result = data.data
        validData(result)
      })
      //地区选择广东省
      cy.get('.el-form').last().findByPlaceholderText('请选择省').click()
      cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('广东省').click()
      waitIntercept(queryData, clickSearchButton, data => {
        result = data.data
        validData(result)
        reset()
      })
    })
    it('010-关键字查询', () => {
      const labName = '佛山市第一人民医院'
      selectDate()
      typeKeyword(labName)
      waitIntercept(queryData, clickSearchButton, data => {
        result = data.data
        validData(result, labName)
        data.data.forEach(item => expect(item.labName).contain(labName))
        reset()
      })
    })
    it('011-管理单位', () => {
      const city = '佛山市'
      const shanghai = '上海市'
      selectDate()
      cy.get('.el-form').last().findByPlaceholderText('请选择管理机构').click()
      cy.wait(1000)
      //选择青浦医联体
      cy.get('.el-scrollbar__view.el-select-dropdown__list:visible').last().contains('青浦医联体').click()
      waitIntercept(queryData, clickSearchButton, data => {
        result = data.data
        validData(result, null, shanghai)
      })
      //选择佛山市临床检验质量控制中心
      cy.get('.el-form').last().findByPlaceholderText('请选择管理机构').click()
      cy.get('.el-scrollbar__view.el-select-dropdown__list:visible').last().contains('佛山市临床检验质量控制中心').click()
      waitIntercept(queryData, clickSearchButton, data => {
        result = data.data
        validData(result, null, city)
        reset()
      })
    })
    it('012-组合条件(地区和关键字', () => {
      const labName = '佛山市高明区中医院'
      const city = '佛山市'
      selectDate()
      cy.get('.el-form').last().findByPlaceholderText('请选择省').click()
      //地区选择上海
      cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('广东').click()
      //关键字
      typeKeyword(labName)
      waitIntercept(queryData, clickSearchButton, data => {
        result = data.data
        validData(result, labName, city)
        reset()
      })
    })
  })
  context('查看报告/删除报告', () => {
    it('013-查看报告', () => {
      const labName = '佛山华厦眼科医院'
      selectDate()
      typeKeyword(labName)
      waitIntercept(queryData, clickSearchButton, data => {
        result = data.data
        validData(result)
        cy.intercept('**&type=*').as('viewReport')
        cy.get('.el-table__body .el-table__row').last().findByText('查看').click()
        cy.wait('@viewReport').then((xhr) => {
          cy.compare(xhr)
          cy.get('.ql-frame-viewer__close').click()
          reset()
        })
      })
    })
    it('014-删除报告', () => {
      const labName = '佛山市高明区人民医院'
      selectDate()
      typeKeyword(labName)
      waitIntercept(queryData, clickSearchButton, data => {
        if (data.total) {
          const rowIndex = data.data.findIndex(item => item.push === false)
          if (rowIndex !== -1) {
            cy.get('.el-table__body .el-table__row').eq(rowIndex).findByText('删除').click()
            if (data.data.length === 1) {
              waitIntercept(queryData, confirmDelete, responseData => {
                expect(responseData.data.length).to.be.equal(0)
                cy.get('body').should('contain', '暂无数据')
                reset()
              })
            } else if (data.data.length > 20) {
              waitIntercept(queryData, confirmDelete, responseData => {
                cy.get('.el-pagination__total').should('have.text', '共 ' + responseData.total + ' 条')
                reset()
              })
            } else {
              waitIntercept(queryData, confirmDelete, responseData => {
                expect(responseData.data.length).to.be.equal(data.data.length - 1)
                cy.get('.el-table__body .el-table__row').should('have.length', data.data.length - 1)
                reset()
              })
            }
          }
        }
      })
    })
    it('批量删除', () => {
      const labName = '佛山市妇幼保健院'
      selectDate()
      typeKeyword(labName)
      waitIntercept(queryData, clickSearchButton, data => {
        const dataLength = data.data.length
        if (dataLength === 0) {
          cy.get('body').should('contain', '暂无数据')
          cy.request({
            method: 'GET',
            url: 'http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr/service/mgr/lab/report/monthdiff/syncReport?adminCclCode=CCL1557115857484786412&yearMonth=202102'
          }).as('pullQlab')
          cy.get('@pullQlab').should(response => {
            expect(response.status).to.be.equal(200)
          })
        } else {
          cy.get('.ql-search__tools-top.is-left').find('[type = "checkbox"]').check('', {
            force: true
          })
          cy.get('.ql-search__tools-top.is-left').findByText('批量删除').click()
          waitIntercept(queryData, confirmDelete, data => {
            expect(data.data.length).to.be.equal(0)
            cy.get('body').should('contain', '暂无数据')
            cy.request({
              method: 'GET',
              url: 'http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr/service/mgr/lab/report/monthdiff/syncReport?adminCclCode=CCL1557115857484786412&yearMonth=202102'
            }).as('pullQlab')
            cy.get('@pullQlab').should(response => {
              expect(response.status).to.be.equal(200)
            })
          })
        }
      })
    })
  })
})