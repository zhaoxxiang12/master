import 'cypress-iframe'
import {
  activeDateDay
} from '../../common/date'
import {
  closeTips
} from '../../common/dialog'
import {
  interceptAll,
  waitIntercept,
  waitRequest
} from '../../common/http'
import {
  closeDailyScreen
} from '../../common/screen'
import {
  activeSelect
} from '../../common/select'
import {
  buttonPushScreen,
  pushToScreen
} from '../../report-data/stats-query'
import {
  clearTips,
  clickCancelButton,
  clickMessageButton,
  clickSearch,
  closeElform,
  interceptQuerySendMessage,
  interceptSpecialTime,
  monitorPushScreen,
  pushMessage,
  reportMonitorAssert,
  searchConditions,
  searchData,
  transformDate
} from './report-monitor'

context('监控内容配置', () => {
  const queryMonitor = () => {
    return interceptAll('service/mgr/new/reportmonitors/v3?*', 'queryMonitor')
  }

  before(() => {
    waitIntercept(queryMonitor, () => {
      cy.visitPage('report-monitor')
    }, data => {
      cy.get('.report-monitor').should('exist')
      cy.get('.ql-search--simple.is-right').first().within($el => {
        if ($el.css('display') === 'block') {
          cy.get('.el-form.el-form--inline').last().findByText('展开').click({
            force: true
          })
        }
      })
    })
  })
  context('筛选条件', () => {
    const labCode = 'gd18002'
    const FoshanTag = '佛山'
    const GuangxiTag = '广西'
    const Guangdong = '广东省'
    const Shanghai = '上海市'
    const reported = '已上报'
    const notReported = '未上报'
    const reportedOutOfCharge = '已上报有失控'
    before(() => {
      const dateMonth = '2020/5/11'
      searchConditions('date').find('.el-input__inner').first().click()
      activeSelect('指定日期')
      searchConditions('date').find('.el-input__inner').last().click()
      activeDateDay(dateMonth)
    })
    it('001-关键字查询', () => {
      searchData(labCode)
      reportMonitorAssert(labCode)
      searchConditions('labName').find('.el-input__inner').clear()
    })
    it('002-标签查询', () => {
      searchData(null, FoshanTag)
      reportMonitorAssert(null, FoshanTag)
      clearTips()
      //标签选择广西
      searchData(null, GuangxiTag)
      reportMonitorAssert(null, GuangxiTag)
      clearTips()
    })
    it('003-状态查询', () => {
      searchData(null, null, null, reported)
      reportMonitorAssert(null, null, null, reported)
      // 未上报
      searchData(null, null, null, notReported)
      reportMonitorAssert(null, null, null, notReported)
      searchConditions('status').find('.el-input__inner').click()
      cy.get('.el-select__caret.el-input__icon.el-icon-circle-close').click({
        force: true
      })
    })
    it('004-已上报有失控', () => {
      searchData(null, null, null, reportedOutOfCharge)
      reportMonitorAssert(null, null, null, reportedOutOfCharge)
      searchConditions('status').find('.el-input__inner').click()
      cy.get('.el-select__caret.el-input__icon.el-icon-circle-close').click({
        force: true
      })
    })
    context('所在地查询', () => {
      it('005-所在地单选(广东)', () => {
        searchData(null, null, {
          Guangdong
        })
        reportMonitorAssert(null, null, {
          Guangdong
        })
        clearTips()
      })
      it('006-所在地单选(上海)', () => {
        //所在地选择上海
        searchData(null, null, {
          Shanghai
        })
        reportMonitorAssert(null, null, {
          Shanghai
        })
        clearTips()
      })
      it('007-所在地多选', () => {
        searchData(null, null, {
          Shanghai,
          Guangdong
        })
        reportMonitorAssert(null, null, {
          Shanghai,
          Guangdong
        })
        searchConditions('areaId').click()
      })
    })
  })
  context('实验室信息', () => {
    let reportDetails = 0
    const labCode = 'gd18020'
    before(() => {
      cy.wait(1000)
      searchConditions('labName', 'lab').find('.el-input__inner').clear().type(labCode)
      clickSearch('lab')
    })
    it('008-实验室上报详情', () => {
      let testDay = '2020/9/11'
      searchConditions('date').find('.el-input__inner').first().click()
      cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('指定日期').click({
        force: true
      })
      searchConditions('date').find('.el-input__inner').last().click()
      const transformTime = transformDate(testDay)
      activeDateDay(testDay)
      waitRequest({
        intercept: interceptSpecialTime,
        onBefore: () => {
          clickSearch('lab')
        },
        onSuccess: (data) => {
          data.data.forEach(item => expect((item.reportTime).toString()).to.eq(transformTime))
        }
      })
      cy.intercept('**/service/mgr/new/reportmonitors/stats?labId*').as('getData')
      cy.wait(500)
      cy.get('.ql-lab-list__status').find('div').eq(reportDetails).click({
        force: true
      })
      cy.wait('@getData').then((xhr) => {
        let responseStatus = xhr.response.statusCode
        let expectLength = xhr.response.body.data.total
        let expectStatus = 200
        //断言响应状态码
        expect(responseStatus).to.equal(expectStatus)
        if (expectLength == 0 || expectLength == null) {
          cy.get('body').should('contain', '暂无数据')
        } else {
          cy.wait(500)
          //断言 接口返回的数据总数与界面返回的项目批号总数是否相等,相等则通过
          cy.get('.el-table__body').find('.el-table__row').should('have.length', expectLength)
        }
        cy.get('[aria-label="Close"]').last().click()
      })
    })
    it('009-查看实验室信息', () => {
      cy.wait(500)
      cy.get('.ql-lab-list__status').find('div').eq(reportDetails).click({
        force: true
      })
      cy.intercept('**/service/mgr/new/reportmonitors/getLabLoginToken?*').as('getData')
      cy.get('button').contains('查看实验室信息').click({
        force: true
      })
      cy.wait('@getData').then((xhr) => {
        let responseStatus = xhr.response.statusCode
        let expectStatus = 200
        //判断接口是否异常
        expect(responseStatus).to.equal(expectStatus)
        //判断界面是否有该实验室名称,有则通过  /service/mgr/iqccenter/loginByDate?
        cy.get('body').should('contain', '佛山市顺德区慢性病防治中心')
        cy.get('.ql-frame-viewer__close').click({
          force: true
        })
        cy.get('[aria-label="Close"]').last().click()
      })
    })
    it('010-查看IQC信息', () => {
      cy.get('.ql-lab-list__status').find('div').eq(reportDetails).click({
        force: true
      })
      cy.intercept('**/cqb-base-mgr/service/mgr/iqccenternew/getLoginUrl?*').as('getData')
      cy.get('button').contains('查看IQC信息').click({
        force: true
      })
      cy.wait('@getData').then((xhr) => {
        let responseStatus = xhr.response.statusCode
        let expectStatus = 200
        //判断接口是否异常
        expect(responseStatus).to.equal(expectStatus)
        cy.wait(2000)
        //判断界面是否有[质控数据维护]有则通过  
        cy.frameLoaded('.ql-frame-viewer__body')
        cy.getIframe().find('.ql-layout__title').should('have.text', '质控数据维护')
        cy.get('.ql-frame-viewer__close').click({
          force: true
        })
        cy.get('.el-dialog__close.el-icon.el-icon-close').last().click()
      })
    })
    context('勾选全选/和清空', () => {
      beforeEach(() => {
        cy.get('.ql-lab-list__status').find('div').eq(reportDetails).click({
          force: true
        })
        cy.wait(500)
      })
      it('011-全选', () => {
        cy.get('.el-table__header-wrapper').find('[type=checkbox]').check({
          force: true
        })
        cy.get('.el-table__body-wrapper').within(() => {
          cy.get('[type=checkbox]').parents('.el-checkbox__input').then(el => {
            el.each((index, element) => {
              expect(element).to.have.class('is-checked')
            })
          })
        })
      })
      it('012-清空', () => {
        cy.get('.el-table__header-wrapper').find('[type=checkbox]').check({
          force: true
        })
        cy.get('.el-alert__description').findByText('清空').click({
          force: true
        })
        cy.get('.el-table__body-wrapper').within(() => {
          cy.get('[type=checkbox]').parents('.el-checkbox__input').then(el => {
            el.each((index, element) => {
              expect(element).to.not.have.class('is-checked')
            })
          })
        })
        cy.get('.el-dialog__close.el-icon.el-icon-close').last().click()
      })
    })
  })
  context('消息推送', () => {
    const message = '1'
    const sendObject = '1'
    const messageType = '1'
    const labCode = 'gd18020'
    const reportDetails = 0
    beforeEach(() => {
      cy.reload()
      closeTips('提示', '关闭')
      cy.get('.ql-search--simple.is-right').first().within($el => {
        if ($el.css('display') === 'block') {
          cy.get('.el-form.el-form--inline').last().findByText('展开').click({
            force: true
          })
        }
      })
      searchConditions('labName', 'lab').find('.el-input__inner').clear().type(labCode)
      clickSearch('lab')
      cy.wait(1000)
      cy.get('.ql-lab-list__status').find('div').eq(reportDetails).click({
        force: true
      })
    })
    it('013-未选择消息模板', () => {
      pushMessage(null, sendObject, messageType)
      clickMessageButton()
      cy.get('.el-form-item__error').should('contain', '请选择消息模板')
      clickCancelButton()
    })
    it('014-未选择发送对象', () => {
      pushMessage(message, null, messageType)
      clickMessageButton()
      cy.get('.el-form-item__error').should('contain', '请选择发送对象')
      clickCancelButton()
    })
    it('015-未选择消息类型', () => {
      pushMessage(message, sendObject)
      clickMessageButton()
      cy.get('.el-form-item__error').should('contain', '请选择消息类型')
      clickCancelButton()
    })
    it('016-向实验室端推送消息成功', () => {
      const message = '1'
      const sendObject = '1'
      const messageType = '1'
      let time = new Date()
      let month
      let currentTime
      // let currentTime = (time.toLocaleDateString()).replace(/\//g,'-')
      let newTime = (time.toLocaleDateString()).split('/')
      if (newTime[1] < 10) {
        month = '0' + newTime[1]
        currentTime = newTime[0] + '-' + month + '-' + newTime[2]
      } else {
        currentTime = newTime[0] + '-' + newTime[1] + '-' + newTime[2]
      }
      cy.get('.ql-lab-list__status').find('div').eq(reportDetails).click({
        force: true
      })
      pushMessage(message, sendObject, messageType)
      clickMessageButton()
      cy.loginVerifyMessageLab()
      waitRequest({
        intercept: interceptQuerySendMessage,
        onBefore: () => {
          cy.get('[type=submit]').click({
            force: true
          })
        },
        onSuccess: (data) => {
          const createTime = (data.data[0].createTime.split(' '))[0]
          expect(createTime).to.eq(currentTime)
          expect(data.data[0].message).to.eq(message)
        }
      })
    })
  })
  context('大屏操作', () => {
    let title = 'UI' + parseInt(Math.random() * 100000)
    const pushArea = 9
    before(() => {
      cy.visitPage('report-monitor')
    })
    it('017-推送到大屏', () => {
      monitorPushScreen(title, 'list', pushArea)
    })
    it('018-分屏未设置标题', () => {
      monitorPushScreen('clear', 'list', pushArea)
      closeElform()
    })
    it('019-推送信息未选择', () => {
      monitorPushScreen(title, null, pushArea)
      closeElform()
    })
    it('020-大屏区域未选择', () => {
      monitorPushScreen(title, 'pie')
      closeElform()
    })
    it('021-全屏预览', () => {
      cy.wait(1000)
      cy.get('button').contains('全屏预览').click({
        force: true
      })
      let random = parseInt(Math.random() * 3)
      if (random === 0) {
        cy.get('[aria-label="checkbox-group"]').contains('明细列表').click({
          force: true
        })
      } else if (random === 1) {
        cy.get('[aria-label="checkbox-group"]').contains('统计图').click({
          force: true
        })
      } else {
        cy.get('[aria-label="checkbox-group"]').contains('明细列表').click({
          force: true
        })
        cy.get('[aria-label="checkbox-group"]').contains('统计图').click({
          force: true
        })
      }
      cy.get('[role="tooltip"]').find('button').contains('确定').click({
        force: true
      })
      closeDailyScreen()
    })
    context('大屏参数验证', () => {
      before(() => {
        cy.visitPage('report-monitor')
      })
      it('022-推送到大屏参数校验', () => {
        pushToScreen((title, screenData, request) => {
          expect(title).to.equal(screenData.title)
          expect(request.body.params).to.equal(screenData.params)
        }, () => {
          cy.get(`[aria-label="${buttonPushScreen}"]`)
            .find('.el-form-item__label')
            .contains('推送信息类型')
            .parent()
            .find('[type=checkbox]')
            .eq(1)
            .click({
              force: true
            })
        })
      })
    })
  })
})