import dayjs from 'dayjs'
import {
  visitPage
} from '../../../shared/route'
import {
  getMonthZh
} from '../../common/date'
import {
  clickCancelInDialog,
  clickOkInDialog,
  closeTips,
  confirmDelete,
  withinDialog
} from '../../common/dialog'
import {
  clickListener
} from '../../common/event'
import {
  validatePdfFile
} from '../../common/file'
import {
  validFormItemError
} from '../../common/form'
import {
  waitIntercept
} from '../../common/http'
import {
  getTextarea,
  setTextarea
} from '../../common/input'
import {
  closeClientAlert,
  validErrorMsg,
  validSuccessMessage
} from '../../common/message'
import {
  activeSelect
} from '../../common/select'
import {
  elform
} from '../../mutual-result/mutual-item'
import {
  clickSearch,
  interceptQuery
} from '../workdayUtil'
import {
  applyWorkDay,
  assertText,
  auditMany,
  checkApplyItem,
  checkData,
  clickButton,
  interceptApplyMsg,
  interceptApplyWorkDay,
  interceptQueryItem,
  interceptSaveItem,
  loginMgrSearch,
  queryAduitWorkDay,
  selectMonth
} from './mutual-result'

/**
 * 工作日申请
 */
context('工作日申请', () => {
  const planApply = '计划申请'
  const specialApply = '特殊申请'
  const labCode = 'gd18020'
  const month = dayjs().format('MM')
  const monthZh = getMonthZh(month)
  const monthString = dayjs().format('YYYY') + '年' + monthZh
  const applyReason = '每支军队都有自己的灵魂，它在这支军队中永生。不管多少岁月过去了，这种灵魂，这样精神，将在这支队伍中永远流传下去！”我认为中国军队的灵魂就体现在一种“大无畏”精神上。八路军、志愿军都是不怕死的，他们视死如归'
  before(() => {
    cy.visitLabPage('mutual-result', 'labgd18020')
  })
  context('项目申请', () => {
    let result
    before(() => {
      cy.wait(2000)
      cy.get('.item-configNew__aside-body').within(() => {
        waitIntercept(interceptQueryItem, () => {
          cy.get('.el-menu').contains('新冠病毒核酸').click({
            force: true
          })
          cy.wait(1000)
        }, data => {
          result = data
        })
      })
    })
    it('禁用的项目不能申请', () => {
      const itemIndex = result.findIndex(item => item.status === false)
      if (itemIndex === -1) {
        const changeItemIndex = 0
        cy.get('.item-configNew__list').find('.el-button').eq(changeItemIndex).click({
          force: true
        })
        cy.get('.item-configNew__footer').findByText('保存').click({
          force: true
        })
        waitIntercept(interceptSaveItem, () => {
          closeTips('提示', '确定')
        }, () => {
          validSuccessMessage()
          cy.wait(2000)
          cy.get('.item-configNew__list').find('.el-icon-setting').eq(changeItemIndex).click({
            force: true
          })
          validErrorMsg('请先启用项目并保存')
        })
      } else {
        cy.get('.item-configNew__list').find('.el-icon-setting').eq(itemIndex).click({
          force: true
        })
        validErrorMsg('请先启用项目并保存')
      }
    })
    context('申请表单验证', () => {
      let itemIndex
      before(() => {
        cy.get('.item-configNew__aside-body').within(() => {
          waitIntercept(interceptQueryItem, () => {
            cy.get('.el-menu').contains('尿干化学').click({
              force: true
            })
            cy.wait(1000)
          }, data => {
            result = data
            itemIndex = result.findIndex(item => item.status)
          })
        })
      })
      it('申请天数不为0且不能大于31', () => {
        if (itemIndex === -1) {
          const changeItemIndex = 0
          cy.get('.item-configNew__list').find('.el-button').eq(changeItemIndex).click({
            force: true
          })
          cy.get('.item-configNew__footer').findByText('保存').click({
            force: true
          })
          waitIntercept(interceptSaveItem, () => {
            closeTips('提示', '确定')
          }, () => {
            validSuccessMessage()
            cy.wait(2000)
            cy.get('.item-configNew__list').find('.el-icon-setting').eq(changeItemIndex).click({
              force: true
            })
            selectMonth('02月')
            applyWorkDay('02月', '计划申请', 32)
            withinDialog(clickOkInDialog, '月度工作日申请')
            validFormItemError('设置的天数需为 1 至 31')
            cy.wait(1000)
            applyWorkDay('02月', '计划申请', 0)
            withinDialog(clickOkInDialog, '月度工作日申请')
            validFormItemError('设置的天数需为 1 至 31')
            withinDialog(clickCancelInDialog, '月度工作日申请')
          })
        } else {
          cy.get('.item-configNew__list').find('.el-icon-setting').eq(itemIndex).click({
            force: true
          })
          selectMonth('02月')
          applyWorkDay('02月', '计划申请', 32)
          withinDialog(clickOkInDialog, '月度工作日申请')
          validFormItemError('设置的天数需为 1 至 31')
          cy.wait(1000)
          applyWorkDay('02月', '计划申请', 0)
          withinDialog(clickOkInDialog, '月度工作日申请')
          validFormItemError('设置的天数需为 1 至 31')
          withinDialog(clickCancelInDialog, '月度工作日申请')
        }
      })
      it('申请原因不能超过99', () => {
        if (itemIndex === -1) {
          const changeItemIndex = 0
          cy.get('.item-configNew__list').find('.el-button').eq(changeItemIndex).click({
            force: true
          })
          cy.get('.item-configNew__footer').findByText('保存').click({
            force: true
          })
          waitIntercept(interceptSaveItem, () => {
            closeTips('提示', '确定')
          }, () => {
            validSuccessMessage()
            cy.wait(2000)
            cy.get('.item-configNew__list').find('.el-icon-setting').eq(changeItemIndex).click({
              force: true
            })
            selectMonth(month)
            applyWorkDay(month, specialApply, 28)
            setTextarea('申请原因', applyReason)
            getTextarea('申请原因').then(element => {
              const getValue = element.val()
              expect(getValue).not.to.eq(applyReason)
              expect(getValue).to.have.length(99)
              withinDialog(clickCancelInDialog, '月度工作日申请')
            })
          })
        } else {
          cy.get('.item-configNew__list').find('.el-icon-setting').eq(itemIndex).click({
            force: true
          })
          selectMonth(month)
          applyWorkDay(month, specialApply, 28)
          setTextarea('申请原因', applyReason)
          getTextarea('申请原因').then(element => {
            const getValue = element.val()
            expect(getValue).not.to.eq(applyReason)
            expect(getValue).to.have.length(99)
            withinDialog(clickCancelInDialog, '月度工作日申请')
          })
        }
      })
    })
    context('申请/审核', () => {
      let itemIndex
      let text
      before(() => {
        waitIntercept(interceptQueryItem, () => {
          cy.get('.item-configNew__aside-body').find('.el-menu')
            .contains('常规化学').click({
              force: true
            })
          cy.wait(1000)
        }, (data) => {
          result = data
          itemIndex = result.findIndex(item => item.status)
          cy.get('.item-configNew__list').find('.item-button__content').eq(itemIndex).invoke('text').then((getText) => {
            text = getText.replace(/(^\s*)|(\s*$)/g, '')
          })
        })
      })
      it('实验室申请/管理端审核通过', () => {
        cy.get('.item-configNew__list').find('.el-icon-setting').eq(itemIndex).click({
          force: true
        })
        cy.wait(500)
        cy.get('.item-configNew__list').find('.item-button__content').eq(itemIndex).invoke('text').then((getText) => {
          text = getText.replace(/(^\s*)|(\s*$)/g, '')
        })
        selectMonth(month)
        applyWorkDay(month, planApply, 15)
        waitIntercept(interceptApplyWorkDay, () => {
          withinDialog(clickOkInDialog, '月度工作日申请')
        }, () => {
          validSuccessMessage()
          cy.wait(2000)
          cy.get('.item-configNew__list').find('.el-icon-setting').eq(itemIndex).click({
            force: true
          })
          cy.wait(500)
          assertText(month, planApply, '审核中', 'rgb(43, 181, 235)')
          //修改申请
          applyWorkDay(month, planApply, 18)
          waitIntercept(interceptApplyWorkDay, () => {
            withinDialog(clickOkInDialog, '月度工作日申请')
          }, () => {
            validSuccessMessage()
          })
        })
        //登录管理端进行审核
        loginMgrSearch(labCode, text, monthString)
        clickButton('审核通过')
        closeTips('提示', '通过')
        cy.get('.el-form.panel-dept__header').findAllByPlaceholderText('请选择').click({
          force: true
        })
        //其他质控主管单位看不见这条数据
        activeSelect('青浦医联体')
        waitIntercept(interceptQuery, () => {
          clickSearch()
        }, (data) => {
          expect(data.data.length).to.eq(0)
          cy.get('body').should('contain', '暂无数据')
        })
        cy.wait(1000)
        waitIntercept(interceptApplyMsg, () => {
          cy.visitLabPage('mutual-result', 'labgd18020')
        }, (data) => {
          expect(data.data[0].createTime).to.contain(dayjs().format('YYYY') + '-' + dayjs().format('MM') + '-' + dayjs().format('DD'))
          cy.get('.el-menu').contains('常规化学').click({
            force: true
          })
          cy.wait(1000)
          cy.get('.item-configNew__list').find('.el-icon-setting').eq(itemIndex).click({
            force: true
          })
          cy.wait(500)
          assertText(month, planApply, '通过', 'rgb(103, 194, 58)')
        })
      })
      it('审核不通过', () => {
        loginMgrSearch(labCode, text, monthString)
        clickButton('审核不通过')
        confirmDelete()
        validSuccessMessage()
        cy.wait(1000)
        waitIntercept(interceptApplyMsg, () => {
          cy.visitLabPage('mutual-result', 'labgd18020')
        }, (data) => {
          expect(data.data[0].createTime).to.contain(dayjs().format('YYYY') + '-' + dayjs().format('MM') + '-' + dayjs().format('DD'))
          // expect(data.data[0].status).to.eq(1)
          cy.get('.el-menu').contains('常规化学').click({
            force: true
          })
          cy.wait(1000)
          cy.get('.item-configNew__list').find('.el-icon-setting').eq(itemIndex).click({
            force: true
          })
          cy.wait(500)
          assertText(month, planApply, '不通过', 'rgb(245, 108, 108)')
          //修改申请表
          applyWorkDay(month, planApply, 28)
          waitIntercept(interceptApplyWorkDay, () => {
            withinDialog(clickOkInDialog, '月度工作日申请')
          }, () => {
            validSuccessMessage()
          })
        })
      })
    })
    context('批量申请', () => {
      let itemName
      let queryData
      before(() => {
        waitIntercept(queryAduitWorkDay, () => {
          cy.reload()
        }, (data) => {
          queryData = data
          cy.wait(3000)
          closeClientAlert()
        })
        cy.wait(3000)
        waitIntercept(interceptQueryItem, () => {
          cy.get('.item-configNew__aside-body').find('.el-menu')
            .contains('肿瘤标志物').click({
              force: true
            })
          cy.wait(1000)
        }, (data) => {
          result = data
          itemName = result.map((item, index) => {
            if (item.status) {
              return item.itemName
            }
          }).filter(item => item !== undefined)
        })
      })
      it('选择本专业所有项目', () => {
        cy.wait(2000)
        cy.get('.el-footer').findByText('选择本专业所有项目').click({
          force: true
        })
        cy.get('.el-footer').findByText('批量申请').click({
          force: true
        })
        selectMonth(month)
        applyWorkDay(month, planApply, 15)
        withinDialog(clickOkInDialog, '月度工作日申请')
        cy.wait(1000)
        validSuccessMessage()
        loginMgrSearch(labCode, null, monthString)
        for (let i = 0; i < itemName.length; i++) {
          elform('itemName')
            .clear()
            .type(itemName[i])
          waitIntercept(interceptQuery, () => {
            clickSearch()
          }, data => {
            console.log(data)
            cy.get('.el-table__body').last().find('.el-table__row').should('have.length', data.data.length)
            for (let j = 0; j < data.data.length; j++) {
              if (data.data.length >= 1) {
                expect(data.data[j].itemName).to.eq(itemName[i])
              } else {
                cy.get('body').should('contain', '暂无数据')
              }
            }
          })
        }
      })
      it('选择本实验室所有项目', () => {
        cy.visitLabPage('mutual-result', 'labgd18020')
        cy.wait(2000)
        cy.get('.el-footer').findByText('选择本实验室所有项目').click({
          force: true
        })
        cy.get('.el-footer').findByText('批量申请').click({
          force: true
        })
        cy.wait(2000)
        selectMonth(month)
        applyWorkDay(month, planApply, 15)
        waitIntercept(interceptApplyWorkDay, () => {
          withinDialog(clickOkInDialog, '月度工作日申请')
        }, () => {
          validSuccessMessage()
        })
      })
      it('已申请过的项目且审核通过不能再次申请', () => {
        const applyData = checkData(queryData)
        cy.get('.item-configNew__aside-body').find('.el-menu')
          .contains('肿瘤标志物').click({
            force: true
          })
        if (applyData.length === 0) {
          cy.get('.item-configNew__list').find('.item-button__content').contains(itemName[0])
            .parent()
            .find('.el-icon-setting')
            .click({
              force: true
            })
          selectMonth(month)
          applyWorkDay(month, planApply, 15)
          applyWorkDay(month, specialApply, 15)
          withinDialog(clickOkInDialog, '月度工作日申请')
          validSuccessMessage()
          cy.wait(1000)
          //管理端审核数据
          auditMany(itemName[0], monthString, '批量审核通过')
          waitIntercept(queryAduitWorkDay, () => {
            cy.visitLabPage('mutual-result', 'labgd18020')
          }, data => {
            const returnData = checkData(data)
            const itemList = checkApplyItem(returnData, month, planApply)
            withinDialog(clickOkInDialog, '月度工作日申请')
            validFormItemError('项目[' + itemList[0] + ']中存在特殊申请已通过的月份，请排查')
            auditMany(itemName[0], monthString, '批量审核不通过')
          })
        } else {
          const returnData = checkData(applyData)
          const itemList = checkApplyItem(returnData, month, specialApply)
          withinDialog(clickOkInDialog, '月度工作日申请')
          validFormItemError('项目[' + itemList[0] + ']中存在特殊申请已通过的月份，请排查')
          auditMany(itemName[0], monthString, '批量审核不通过')
        }
      })
    })
    context('消息提醒', () => {
      let MsgResult
      before(() => {
        waitIntercept(interceptApplyMsg, () => {
          cy.visitLabPage('mutual-result', 'labgd18020')
          cy.wait(3000)
          closeClientAlert()
        }, (data) => {
          MsgResult = data
        })

      })
      it('默认展示5条消息', () => {
        cy.get('.popover-notice').click()
        cy.get('.el-tabs__nav-scroll').within(() => {
          cy.get('#tab-notice').click()
        })
        if (MsgResult.totalPages > 1) {
          cy.get('#pane-notice').within(() => {
            cy.get('.wy-list__item').should('have.length', MsgResult.pageSize)
          })
        } else {
          cy.get('#pane-notice').within(() => {
            cy.get('.wy-list__item').should('have.length', MsgResult.data.length)
          })
        }
      })
      it('查看消息', () => {
        console.log(MsgResult)
        if (MsgResult.total >= 6) {
          for (let i = 1; i <= 5; i++) {
            cy.get('#pane-notice').find('.wy-list>.wy-list__item').first()
              .within(() => {
                if (i === 5) {
                  waitIntercept(interceptApplyMsg, () => {
                    cy.get('button').findByText('已读').click({
                      force: true
                    })
                  }, (data) => {
                    expect(data.total).to.eq(MsgResult.total - 5)
                  })
                } else {
                  cy.get('button').findByText('已读').click({
                    force: true
                  })
                  cy.wait(2000)
                }
              })
          }
        } else if (MsgResult.total === 0) {
          cy.get('#pane-notice').find('.wy-list__empty').should('contain', '暂无通知')
        } else {
          for (let i = 1; i <= MsgResult.data.length; i++) {
            if (i === MsgResult.data.length) {
              waitIntercept(interceptApplyMsg, () => {
                cy.get('#pane-notice').find('.wy-list>.wy-list__item').first()
                  .find('.el-button.wy-list__item-action').click({
                    force: true
                  })
              }, data => {
                expect(data.total).to.eq(0)
                cy.get('#pane-notice').find('.wy-list__empty').should('contain', '暂无通知')
              })
            } else {
              cy.get('#pane-notice').find('.wy-list>.wy-list__item').first()
                .find('.el-button.wy-list__item-action').click({
                  force: true
                })
              cy.wait(2000)
            }
          }
        }
      })
    })
  })
})