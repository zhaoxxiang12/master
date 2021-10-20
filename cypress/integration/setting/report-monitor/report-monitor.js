import {
  resolve
} from "bluebird"
import {
  clickCancelInDialog,
  clickDialogBtn,
  clickOkInDialog,
  closeTips,
  withinDialog
} from "../../common/dialog"
import {
  interceptAll,
  waitRequest
} from "../../common/http"
import {
  activeSelect
} from "../../common/select"

/**
 * 
 * @param {string} keyword 实验室编码
 * @param {string} tag 标签
 * @param {object} area 所在地
 * @param {string} status 上报状态
 */
export const searchData = (keyword, tag, area, status, message) => {
  if (keyword) {
    searchConditions('labName').find('.el-input__inner').clear().type(keyword)
  }
  if (tag) {
    searchConditions('tags').find('.el-select__input.is-medium').click()
    activeSelect(tag)
  }
  if (area) {
    searchConditions('areaId').find('.multi-area__placeholder').click()
    console.log(area);
    for (let key in area) {
      cy.get('.el-menu').last().contains(area[key]).find('[type="checkbox"]').check({
        force: true
      })
    }
  }
  if (status) {
    searchConditions('status').find('.el-input__inner').click()
    activeSelect(status)
  }
  if (message) {
    searchConditions('message').find('.el-input__inner').click()
    activeSelect(message)
  }
}

/**
 * 
 * @param {string} prop 
 * @returns 
 */
export const searchConditions = (prop, judge) => {
  if (judge) {
    return cy.get('.el-form').eq(1).find(`[for=${prop}]`).next('.el-form-item__content')
  }
  return cy.get(`[for=${prop}]`).next('.el-form-item__content')
}

/**
 * 点击搜索
 */
export const clickSearch = (judge) => {
  if (judge) {
    cy.get('.el-form').eq(1).findByText('搜索').click({
      force: true
    })
  } else {
    cy.get('.el-form').last().findByText('搜索').click({
      force: true
    })
  }
}

/**
 * 清除选择的标签或者所在地
 */
export function clearTips() {
  cy.get('.el-tag__close.el-icon-close').click({
    force: true
  })
}

export const queryMonitor = () => {
  return interceptAll('service/mgr/new/reportmonitors/v3?*', queryMonitor.name)
}

/**
 * 
 * @param {string} labCode 实验室编码
 * @param {string} tag 标签
 * @param {string} area 所在地
 * @param {string} status 上报状态
 */
export const reportMonitorAssert = (labCode, tag, area, status) => {
  waitRequest({
    intercept: queryMonitor,
    onBefore: () => {
      clickSearch()
    },
    onSuccess: (data) => {
      const pageLength = data.data.length
      if (pageLength) {
        if (labCode) {
          if (pageLength > 20) {
            cy.get('.el-pagination__total').should('have.text', '共 ' + (data.total) + ' 条')
            data.data.forEach(item => expect(item.labCode).to.contain(labCode))
          } else {
            cy.get('.ql-card-list__list').find('.el-card__body').should('have.length', pageLength)
            data.data.forEach(item => expect(item.labCode).to.contain(labCode))
          }
        }
        if (tag) {
          if (pageLength > 20) {
            cy.get('.el-pagination__total').should('have.text', '共 ' + (data.total) + ' 条')
          } else {
            cy.get('.ql-card-list__list').find('.el-card__body').should('have.length', pageLength)
          }
        }
        if (area) {
          let areaArray = []
          let searchDate = data.data[0].reportTime
          let pageNo = data.totalPages
          if (pageLength > 20) {
            if (Object.keys(area).length > 1) {
              if (pageNo > 1) {
                for (let i = 2; i <= pageNo; i++) {
                  assetPagingData(searchDate, i).then(result => {
                    console.log(result);
                    for (let key in area) {
                      areaArray.push(area[key])
                    }
                    data.data.forEach(item => expect(item.province).to.be.oneOf(areaArray))
                    areaArray = []
                  })
                }
              }
            } else {
              cy.get('.el-pagination__total').should('have.text', '共 ' + (data.total) + ' 条')
              for (let key in area) {
                areaArray.push(area[key])
              }
              data.data.forEach(item => expect(item.province).to.be.oneOf(areaArray))
              areaArray = []
            }
          } else {
            let areaArray = []
            cy.get('.ql-card-list__list').find('.el-card__body').should('have.length', pageLength)
            for (let key in area) {
              areaArray.push(area[key])
            }
            data.data.forEach(item => expect(item.province).to.be.oneOf(areaArray))
            areaArray = []
          }
        }
        if (status === '未上报') {
          if (pageLength > 20) {
            cy.get('.el-pagination__total').should('have.text', '共 ' + (data.total) + ' 条')
            data.data.forEach(item => expect(item.reportCount === 0))
          } else {
            cy.get('.ql-card-list__list').find('.el-card__body').should('have.length', pageLength)
            data.data.forEach(item => expect(item.reportCount === 0))
          }
        }
        if (status === '已上报') {
          if (pageLength > 20) {
            cy.get('.el-pagination__total').should('have.text', '共 ' + (data.total) + ' 条')
            data.data.forEach(item => expect(item.reportCount).not.to.eq(0))
            console.log(456)
          } else {
            cy.get('.ql-card-list__list').find('.el-card__body').should('have.length', pageLength)
            data.data.forEach(item => expect(item.reportCount).not.to.eq(0))
          }
        }
        if (status === '已上报有失控') {
          if (pageLength > 20) {
            cy.get('.el-pagination__total').should('have.text', '共 ' + (data.total) + ' 条')
            data.data.forEach(item => expect(item.reportCount).not.to.eq(0))
            data.data.forEach(item => expect(item.skCount).not.to.eq(0))
          } else {
            cy.get('.ql-card-list__list').find('.el-card__body').should('have.length', pageLength)
            data.data.forEach(item => expect(item.reportCount).not.to.eq(0))
            data.data.forEach(item => expect(item.skCount).not.to.eq(0))
          }
        }
      } else {
        cy.get('body').should('contain', '暂无数据')
      }
    }
  })
}

/**
 * 
 * @param {string} title 标题名字 
 * @param {string} pushInformationType 推送信息类型 
 * @param {number} pushArea 大屏区域
 */
export const monitorPushScreen = (title, pushInformationType, pushArea) => {
  //大屏区域下标
  let screenArea = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  cy.get('button').contains('推送到大屏').click({
    force: true
  })
  cy.wait(1000)
  if (title) {
    //分屏标题
    searchConditions('title').find('.el-input__inner').type(title, {
      force: true
    })
  }
  if (pushInformationType) {
    cy.get('[type=checkbox').check(pushInformationType, {
      force: true
    })
  }
  if (pushArea) {
    // 使用switch  case 判断现有大屏区域有多个,每次推送默认推送最后一个区域
    switch (pushArea) {
      case 9:
        cy.get('.screen-area__item').eq(screenArea[8]).click({
          force: true
        })
        break
      case 8:
        cy.get('.screen-area__item').eq(screenArea[7]).click({
          force: true
        })
        break
      case 7:
        cy.get('.screen-area__item').eq(screenArea[6]).click({
          force: true
        })
        break
      case 6:
        cy.get('.screen-area__item').eq(screenArea[5]).click({
          force: true
        })
        break
      case 5:
        cy.get('.screen-area__item').eq(screenArea[4]).click({
          force: true
        })
        break
      case 4:
        cy.get('.screen-area__item').eq(screenArea[3]).click({
          force: true
        })
        break
      case 3:
        cy.get('.screen-area__item').eq(screenArea[2]).click({
          force: true
        })
        break
      case 2:
        break
      case 1:
        cy.get('.screen-area__item').eq(screenArea[0]).click({
          force: true
        })
        break
      default:
        cy.log('数据错误,用例执行失败')
    }
  }
  if ((title === 'clear') && pushInformationType && pushArea) {
    searchConditions('title').find('.el-input__inner').clear({
      force: true
    })
    cy.get('button').contains('确定推送').click({
      force: true
    })
    cy.get('.el-form-item__error').should('contain', '请输入分屏标题')
  } else {
    if (title && pushInformationType && pushArea) {
      cy.get('button').contains('确定推送').click({
        force: true
      })
      closeTips('提示', '覆盖')
      cy.get('.el-message__content').should('have.text', '已推送到分屏 ' + pushArea)
    }

  }
  if ((title != 'clear') && pushArea) {
    cy.get('button').contains('确定推送').click({
      force: true
    })
    cy.get('.el-form-item__error').should('contain', '请选择推送信息类型')
  }
  if ((title != 'clear') && pushInformationType) {
    cy.get('button').contains('确定推送').click({
      force: true
    })
    cy.get('.el-form-item__error').should('contain', '请选择要推送的大屏区域')
  }
}

export const closeElform = () => {
  cy.get('[aria-label="推送到大屏"]')
    .find('.el-dialog__footer')
    .findByText('取消')
    .click({
      force: true
    })
}

/**
 * 
 * @param {string} messageModel 消息模板
 * @param {string} pushObject 发送对象
 * @param {string} messageType 消息类型
 */
export const pushMessage = (messageModel, pushObject, messageType) => {
  cy.get('.el-dialog__body').findByText('推送消息通知').click({
    force: true
  })
  if (messageModel) {
    searchData(null, null, null, null, messageModel)
  }
  if (pushObject) {
    searchConditions('sendType').find('[type=checkbox]').check(pushObject, {
      force: true
    })
  }
  if (messageType) {
    searchConditions('type').find('[type="radio"]').check(messageType, {
      force: true
    })
  }
}

export const interceptQuerySendMessage = () => {
  return interceptAll('service/base/messages/base?*', interceptQuerySendMessage.name, '/cqb-base')
}

export const clickMessageButton = () => {
  withinDialog(clickOkInDialog, '推送消息')
}

export const clickCancelButton = () => {
  withinDialog(clickCancelInDialog, '推送消息')
}

export const transformDate = (monthDate) => {
  let newTime = monthDate.split('/')
  let month
  if (newTime[1] < 10) {
    month = '0' + newTime[1]
  }
  let transformTime = newTime[0] + month + newTime[2]
  return transformTime
}

export const interceptSpecialTime = () => {
  return interceptAll('service/mgr/new/reportmonitors/v3?dateType=%E6%8C%87%E5%AE%9A%E6%97%A5%E6%9C%9F&date=*', interceptSpecialTime.name)
}

export const interceptQueryLab = () => {
  return interceptAll('service/mgr/new/reportmonitors/stats?labId*', interceptQueryLab.name)
}

/**
 * 
 * @param {*} date 查询时间
 * @param {*} pageNo 页码
 */
let result
export const assetPagingData = (date, pageNo) => {
  return new Promise(resolve => {
    cy.request({
      method: 'GET',
      url: `http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr/service/mgr/new/reportmonitors/v3?dateType=指定日期&date=${date}&tags=&labName=&status=&areaId=440000,310000&pageNo=${pageNo}&pageSize=24`
    }).as('assetPagingData').then((data) => {
      result = data.body.data
      resolve(result)
    })
  })

}