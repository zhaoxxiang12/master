/**
 * 监控内容配置
 */

import 'cypress-iframe'
import { buttonPushScreen, pushToScreen } from '../../shared/stats-query'
import { interceptAll, waitIntercept } from '../../shared/util'

context('监控内容配置', () => {
  const queryMonitor = () => {
    return interceptAll('service/mgr/new/reportmonitors/v3?*', 'queryMonitor')
  }
  
  before(() => {
    waitIntercept(queryMonitor, () => {
      cy.visitPage('report-monitor')
    }, data => {
      cy.get('.report-monitor').should('exist')
    })
  })
  it('001-监控内容配置-关键字搜索功能', () => {
    let labCode = 'gd18020'
    let inputBox = 0
    let labName = '佛山市三水区人民医院'
    let expandButton = 0
    //点击展开
    cy.get('.el-button.el-button--text.el-button--medium').eq(expandButton).click({
      force: true
    })
    /**
     * 实验室编码搜索
     */
    cy.get('input[placeholder="实验室名称或编码"]').eq(inputBox).type(labCode, {
      force: true
    })
    cy.intercept('**/service/mgr/new/reportmonitors/*').as('getData')
    cy.get('button').contains('搜索').click({
      force: true
    })
    cy.wait('@getData').then((xhr) => {
      let responseStatus = xhr.response.statusCode
      let expectLength = xhr.response.body.data.total
      let expectStatus = 200
      //断言响应状态码
      expect(responseStatus).to.equal(expectStatus)
      if (expectLength == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (expectLength > 24) { // 如果返回的数据大于24就判断总数据条数
        cy.get('.el-pagination__total').should('have.text', '共 ' + expectLength + ' 条')
      } else { //如果返回的数据等于24就判断类.ql-card-list__list的长度
        cy.wait(500)
        //断言 接口返回的数据总数与界面返回的数据总数是否相等,相等则通过
        cy.get('.ql-card-list__list').find('.el-card__body').should('have.length', expectLength)
      }
      /**
       * 实验室名称搜索 
       */
      cy.get('input[placeholder="实验室名称或编码"]').eq(inputBox).clear({
        force: true
      }).type(labName, {
        force: true
      })
      cy.intercept('**/service/mgr/new/reportmonitors/*').as('getData')
      cy.get('button').contains('搜索').click({
        force: true
      })
      cy.wait('@getData').then((xhr) => {
        let responseStatus = xhr.response.statusCode
        let expectLength = xhr.response.body.data.total
        let expectStatus = 200
        //断言响应状态码
        expect(responseStatus).to.equal(expectStatus)
        if (expectLength == 0) {
          cy.get('body').should('contain', '暂无数据')
        } else if (expectLength > 24) { // 如果返回的数据大于24就判断总数据条数
          cy.get('.el-pagination__total').should('have.text', '共 ' + expectLength + ' 条')
        } else { //如果返回的数据等于24就判断类.ql-card-list__list的长度
          cy.wait(500)
          //断言 接口返回的数据总数与界面返回的数据总数是否相等,相等则通过
          cy.get('.ql-card-list__list').find('.el-card__body').should('have.length', expectLength)
        }
      })
      cy.get('input[placeholder="实验室名称或编码"]').eq(inputBox).clear({
        force: true
      })
    })
  })
  it('002-监控内容配置-标签搜索功能(标签选择佛山)', () => {
    let foshanTag = '佛山'
    let inputBox = 0
    cy.get('input[placeholder="实验室名称或编码"]').eq(inputBox).clear({
      force: true
    })
    cy.get('.el-select__input.is-medium').click()
    //选择标签佛山
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().find('li').contains(foshanTag).click()
    cy.intercept('**/service/mgr/new/reportmonitors/*').as('getData')
    cy.get('button').contains('搜索').click({
      force: true
    })
    cy.wait('@getData').then((xhr) => {
      let responseStatus = xhr.response.statusCode
      let expectLength = xhr.response.body.data.total
      let expectStatus = 200
      //断言响应状态码
      expect(responseStatus).to.equal(expectStatus)
      if (expectLength == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (expectLength > 24) { // 如果返回的数据大于24就判断总数据条数
        cy.get('.el-pagination__total').should('have.text', '共 ' + expectLength + ' 条')
      } else { //如果返回的数据等于24就判断类.ql-card-list__list的长度
        cy.wait(500)
        //断言 接口返回的数据总数与界面返回的数据总数是否相等,相等则通过
        cy.get('.ql-card-list__list').find('.el-card__body').should('have.length', expectLength)
      }
    })
  })
  it('003-监控内容配置-标签搜索功能(标签选择广西)', () => {
    let guangXiTag = '广西'
    cy.get('.el-tag__close.el-icon-close').click({
      force: true
    })
    cy.get('.el-select__input.is-medium').click()
    //选择标签佛山
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().find('li').contains(guangXiTag).click({
      force: true
    })
    cy.intercept('**/service/mgr/new/reportmonitors/*').as('getData')
    cy.get('button').contains('搜索').click({
      force: true
    })
    cy.wait('@getData').then((xhr) => {
      let responseStatus = xhr.response.statusCode
      let expectLength = xhr.response.body.data.total
      let expectStatus = 200
      //断言响应状态码
      expect(responseStatus).to.equal(expectStatus)
      cy.wait(500)
      if (expectLength == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else {
        //断言 接口返回的数据总数与界面返回的数据总数是否相等,相等则通过
        cy.wait(500)
        cy.get('.ql-card-list__list').find('.el-card__body').should('have.length', expectLength)
      }
    })
    cy.get('.el-tag__close.el-icon-close').click({
      force: true
    })
  })
  it('004-监控内容配置-状态搜索功能(已上报)', () => {
    let statusBox = 1
    let reported = '已上报'
    cy.get('.el-select__input.is-medium').click()
    //选择已上报
    cy.get('input[placeholder="请选择"]').eq(statusBox).click({
      force: true
    })
    cy.wait(500)
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().find('li').contains(reported).click({
      force: true
    })
    cy.intercept('**/service/mgr/new/reportmonitors/*').as('getData')
    cy.get('button').contains('搜索').click({
      force: true
    })
    cy.wait('@getData').then((xhr) => {
      let responseStatus = xhr.response.statusCode
      let expectLength = xhr.response.body.data.total
      let expectStatus = 200
      //断言响应状态码
      expect(responseStatus).to.equal(expectStatus)
      if (expectLength == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (expectLength > 24) { // 如果返回的数据大于24就判断总数据条数
        cy.get('.el-pagination__total').should('have.text', '共 ' + expectLength + ' 条')
      } else { //如果返回的数据等于24就判断类.ql-card-list__list的长度
        cy.wait(500)
        //断言 接口返回的数据总数与界面返回的数据总数是否相等,相等则通过
        cy.get('.ql-card-list__list').find('.el-card__body').should('have.length', expectLength)
      }
    })
  })

  it('005-监控内容配置-状态搜索功能(未上报)', () => {
    let expandButton = 0
    let DropList = 2
    let statusBox = 1
    let notReported = '未上报'
    //点击展开
    cy.get('.el-button.el-button--text.el-button--medium').eq(expandButton).click({
      force: true
    })
    cy.get('.el-select__input.is-medium').click()
    //选择已上报
    cy.get('input[placeholder="请选择"]').eq(statusBox).click({
      force: true
    })
    cy.wait(500)
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().find('li').contains(notReported).click({
      force: true
    })
    cy.intercept('**/service/mgr/new/reportmonitors/*').as('getData')
    cy.get('button').contains('搜索').click({
      force: true
    })
    cy.wait('@getData').then((xhr) => {
      let responseStatus = xhr.response.statusCode
      let expectLength = xhr.response.body.data.total
      let expectStatus = 200
      //断言响应状态码
      expect(responseStatus).to.equal(expectStatus)
      if (expectLength == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (expectLength > 24) { // 如果返回的数据大于24就判断总数据条数
        cy.get('.el-pagination__total').should('have.text', '共 ' + expectLength + ' 条')
      } else { //如果返回的数据等于24就判断类.ql-card-list__list的长度
        cy.wait(500)
        //断言 接口返回的数据总数与界面返回的数据总数是否相等,相等则通过
        cy.get('.ql-card-list__list').find('.el-card__body').should('have.length', expectLength)
      }
    })
    cy.get('input[placeholder="请选择"]').eq(statusBox).click({
      force: true
    })
    cy.get('.el-select__caret.el-input__icon.el-icon-circle-close').click({
      force: true
    })
  })
  it('006-监控内容配置-所在地进行搜索(北京)', () => {
    let Beijing = 0
    //点击所在地选择框
    cy.get('.multi-area__placeholder').click({
      force: true
    })
    //选择北京市
    cy.wait(500)
    cy.get('.el-menu').last().find('li').eq(Beijing).find('.el-checkbox__inner').click({
      force: true
    })
    cy.intercept('**/service/mgr/new/reportmonitors/*').as('getData')
    cy.get('button').contains('搜索').click({
      force: true
    })
    cy.wait('@getData').then((xhr) => {
      let responseStatus = xhr.response.statusCode
      let expectLength = xhr.response.body.data.total
      let expectStatus = 200
      //断言响应状态码
      expect(responseStatus).to.equal(expectStatus)
      if (expectLength == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (expectLength > 24) { // 如果返回的数据大于24就判断总数据条数
        cy.get('.el-pagination__total').should('have.text', '共 ' + expectLength + ' 条')
      } else { //如果返回的数据等于24就判断类.ql-card-list__list的长度
        cy.wait(500)
        //断言 接口返回的数据总数与界面返回的数据总数是否相等,相等则通过
        cy.get('.ql-card-list__list').find('.el-card__body').should('have.length', expectLength)
      }
    })
  })
  it('007-监控内容配置-所在地进行搜索(广东)', () => {
    let Guangdong = 2
    cy.get('.el-tag__close.el-icon-close').click({
      force: true
    })
    //点击所在地选择框
    cy.get('.multi-area__tags').click({
      force: true
    })
    //选择广东
    cy.wait(500)
    cy.get('.el-menu').last().find('li').eq(Guangdong).find('.el-checkbox__inner').click({
      force: true
    })
    cy.intercept('**/service/mgr/new/reportmonitors/*').as('getData')
    cy.get('button').contains('搜索').click({
      force: true
    })
    cy.wait('@getData').then((xhr) => {
      let responseStatus = xhr.response.statusCode
      let expectLength = xhr.response.body.data.total
      let expectStatus = 200
      //断言响应状态码
      expect(responseStatus).to.equal(expectStatus)
      if (expectLength == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (expectLength > 24) { // 如果返回的数据大于24就判断总数据条数
        cy.get('.el-pagination__total').should('have.text', '共 ' + expectLength + ' 条')
      } else { //如果返回的数据等于24就判断类.ql-card-list__list的长度
        cy.wait(500)
        //断言 接口返回的数据总数与界面返回的数据总数是否相等,相等则通过
        cy.get('.ql-card-list__list').find('.el-card__body').should('have.length', expectLength)
      }
    })
  })
  it('008-监控内容配置-所在地进行搜索(广西)', () => {
    let guangXi = 3
    cy.get('.el-tag__close.el-icon-close').click({
      force: true
    })
    //点击所在地选择框
    cy.get('.multi-area__tags').click({
      force: true
    })
    //选择北京市
    cy.wait(500)
    cy.get('.el-menu').last().find('li').eq(guangXi).find('.el-checkbox__inner').click({
      force: true
    })
    cy.intercept('**/service/mgr/new/reportmonitors/*').as('getData')
    cy.get('button').contains('搜索').click({
      force: true
    })
    cy.wait('@getData').then((xhr) => {
      let responseStatus = xhr.response.statusCode
      let expectLength = xhr.response.body.data.total
      let expectStatus = 200
      //断言响应状态码
      expect(responseStatus).to.equal(expectStatus)
      if (expectLength == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (expectLength > 24) { // 如果返回的数据大于24就判断总数据条数
        cy.get('.el-pagination__total').should('have.text', '共 ' + expectLength + ' 条')
      } else { //如果返回的数据等于24就判断类.ql-card-list__list的长度
        cy.wait(500)
        //断言 接口返回的数据总数与界面返回的数据总数是否相等,相等则通过
        cy.get('.ql-card-list__list').find('.el-card__body').should('have.length', expectLength)
      }
    })
  })
  it('009-监控内容配置-推送到大屏', () => {
    let titleInputBox = 8
    let title = 'UI' + parseInt(Math.random() * 100000)
    let messageType = 2
    //大屏区域下标
    let screenArea = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    cy.wait(500)
    cy.get('button').contains('推送到大屏').click({
      force: true
    })
    cy.get('.el-input__inner').eq(titleInputBox).type(title, ({
      force: true
    }))
    // 选择推送信息类型-明细列表
    cy.get('.el-checkbox__inner').eq(messageType).click({
      force: true
    })
    cy.get('.screen-area__item').then((getLength) => {
      let length = getLength.length
      // 使用switch  case 判断现有大屏区域有多个,每次推送默认推送最后一个区域
      switch (length) {
      case 9:
        cy.get('.screen-area__item').eq(screenArea[8]).click({
          force: true
        })
        cy.get('button').contains('确定推送').click({
          force: true
        })
        cy.get('button').contains('覆盖').click({
          force: true
        })
        //断言 界面出现已推送到分屏 9则通过
        cy.get('body').should('contain', '已推送到分屏 9')
        break
      case 8:
        cy.get('.screen-area__item').eq(screenArea[7]).click({
          force: true
        })
        cy.get('button').contains('确定推送').click({
          force: true
        })
        cy.get('button').contains('覆盖').click({
          force: true
        })
        //断言 界面出现已推送到分屏 9则通过
        cy.get('body').should('contain', '已推送到分屏 8')
        break
      case 7:
        cy.get('.screen-area__item').eq(screenArea[6]).click({
          force: true
        })
        cy.get('button').contains('确定推送').click({
          force: true
        })
        cy.get('button').contains('覆盖').click({
          force: true
        })
        //断言 界面出现已推送到分屏 9则通过
        cy.get('body').should('contain', '已推送到分屏 7')
        break
      case 6:
        cy.get('.screen-area__item').eq(screenArea[5]).click({
          force: true
        })
        cy.get('button').contains('确定推送').click({
          force: true
        })
        cy.get('button').contains('覆盖').click({
          force: true
        })
        //断言 界面出现已推送到分屏 9则通过
        cy.get('body').should('contain', '已推送到分屏 6')
        break
      case 5:
        cy.get('.screen-area__item').eq(screenArea[4]).click({
          force: true
        })
        cy.get('button').contains('确定推送').click({
          force: true
        })
        cy.get('button').contains('覆盖').click({
          force: true
        })
        //断言 界面出现已推送到分屏 9则通过
        cy.get('body').should('contain', '已推送到分屏 5')
        break
      case 4:
        cy.get('.screen-area__item').eq(screenArea[3]).click({
          force: true
        })
        cy.get('button').contains('确定推送').click({
          force: true
        })
        cy.get('button').contains('覆盖').click({
          force: true
        })
        //断言 界面出现已推送到分屏 9则通过
        cy.get('body').should('contain', '已推送到分屏 4')
        break
      case 3:
        cy.get('.screen-area__item').eq(screenArea[2]).click({
          force: true
        })
        cy.get('button').contains('确定推送').click({
          force: true
        })
        cy.get('button').contains('覆盖').click({
          force: true
        })
        //断言 界面出现已推送到分屏 9则通过
        cy.get('body').should('contain', '已推送到分屏 3')
        break
      case 2:
        cy.get('.screen-area__item').eq(screenArea[1]).click({
          force: true
        })
        cy.get('button').contains('确定推送').click({
          force: true
        })
        cy.get('button').contains('覆盖').click({
          force: true
        })
        //断言 界面出现已推送到分屏 9则通过
        cy.get('body').should('contain', '已推送到分屏 2')
        break
      case 1:
        cy.get('.screen-area__item').eq(screenArea[0]).click({
          force: true
        })
        cy.get('button').contains('确定推送').click({
          force: true
        })
        cy.get('button').contains('覆盖').click({
          force: true
        })
        //断言 界面出现已推送到分屏 9则通过
        cy.get('body').should('contain', '已推送到分屏 1')
        break
      default:
        cy.log('数据错误,用例执行失败')
      }
    })
  })
  it('010-监控内容配置-推送到大屏(未设置分屏标题)', () => {
    let titleInputBox = 8
    let messageType = 2
    let screenArea = 8
    let cancel = 1
    cy.wait(500)
    cy.get('button').contains('推送到大屏').click({
      force: true
    })
    cy.get('.el-checkbox__input').eq(messageType).click({
      force: true
    })

    cy.get('.screen-area__item').eq(screenArea).click({
      force: true
    })
    cy.get('.el-input__inner').eq(titleInputBox).clear(({
      force: true
    }))
    cy.get('button').contains('确定推送').click({
      force: true
    })
    //断言 界面出现请输入分屏标题则通过
    cy.get('body').should('contain', '请输入分屏标题')
    cy.get('.el-button.el-button--default.el-button--medium').eq(cancel).click({
      force: true
    })
  })
  it('011-监控内容配置-推送到大屏(未设置推送信息)', () => {
    let screenArea = 8
    let cancel = 1
    cy.wait(500)
    cy.get('button').contains('推送到大屏').click({
      force: true
    })
    cy.wait(500)
    cy.get('.screen-area__item').eq(screenArea).click({
      force: true
    })
    cy.get('button').contains('确定推送').click({
      force: true
    })
    //断言 界面出现请选择推送信息类型则通过
    cy.get('body').should('contain', '请选择推送信息类型')
    cy.get('.el-button.el-button--default.el-button--medium').eq(cancel).click({
      force: true
    })
  })
  it('012-监控内容配置-实验室上报详情', () => {
    let labCode = 'gd18020'
    let inputBox = 0
    let reportDetails = 0
    cy.get('.el-tag__close.el-icon-close').click({
      force: true
    })
    cy.get('input[placeholder="实验室名称或编码"]').eq(inputBox).type(labCode, {
      force: true
    })
    cy.get('button').contains('搜索').click({
      force: true
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
    })
  })
  it('013-监控内容配置-查看实验室信息', () => {
    let labCode = 'gd18020'
    let inputBox = 0
    let reportDetails = 0
    cy.get('.el-dialog__close.el-icon.el-icon-close').eq(10).click({
      force: true
    })
    cy.get('input[placeholder="实验室名称或编码"]').eq(inputBox).clear({
      force: true
    }).type(labCode, {
      force: true
    })
    cy.get('button').contains('搜索').click({
      force: true
    })
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
    })
  })
  it('014-监控内容配置-查看IQC信息', () => {
    let labCode = 'gd18020'
    let inputBox = 0
    let reportDetails = 0
    cy.get('.ql-frame-viewer__close').click({
      force: true
    })
    cy.get('input[placeholder="实验室名称或编码"]').eq(inputBox).clear({
      force: true
    }).type(labCode, {
      force: true
    })
    cy.get('button').contains('搜索').click({
      force: true
    })
    cy.wait(500)
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
  it('015-监控内容配置-全屏预览', () => {
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
  })
  it('016-推送到大屏参数校验', () => {
    pushToScreen((title, screenData, request) => {
      expect(title).to.equal(screenData.title)
      expect(request.body.params).to.equal(screenData.params)
    }, () => {
      cy.get(`[aria-label="${buttonPushScreen}"]`)
        .find('.el-form-item__label')
        .contains('推送信息类型')
        .parent()
        .find('[type=checkbox]')
        .eq(0)
        .click({
          force: true
        })
    })
  })
})