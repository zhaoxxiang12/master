import {
  visitPage
} from '../../shared/route'
import {
  clickCancelInDialog,
  clickOkInDialog,
  closeTips,
  confirmDelete,
  withinDialog
} from '../common/dialog'
import {
  validFormItemError
} from '../common/form'
import {
  waitIntercept,
  waitRequest
} from '../common/http'
import {
  closeClientAlert,
  validSuccessMessage
} from '../common/message'
import {
  activeSelect
} from '../common/select'
import {
  elform
} from '../mutual-result/mutual-item'
import {
  clickSaveButton,
  createRules,
  createSDIRules,
  getDataLength,
  interceptCreateRules,
  interceptCreateTag,
  interceptDeleteMsg,
  interceptDeleteRules,
  interceptDeleteTag,
  interceptEditRules,
  interceptEditTag,
  interceptPauseRules,
  interceptResumeRules,
  queryRules
} from './push-setting'

context('信息互通设置-推送设置', () => {
  before(() => {
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/setting/message-setting/push-setting')
  })
  context('新建失控告警规则', () => {
    before(() => {
      cy.wait(2000)
    })
    it('消息内容为空不能保存', () => {
      createRules(null, null, '00:00', '2')
      withinDialog(clickOkInDialog, '自动推送规则')
      validFormItemError('请选择消息内容')
      withinDialog(clickCancelInDialog, '自动推送规则')
    })
    it('检测时间为空不能保存', () => {
      createRules(null, '232', null, '1')
      withinDialog(clickOkInDialog, '自动推送规则')
      validFormItemError('请选择检测时间')
      withinDialog(clickCancelInDialog, '自动推送规则')
    })
    it('未选择发送对象不能保存', () => {
      createRules(null, '232', '00:30')
      clickSaveButton('自动推送规则')
      validFormItemError('请选择发送对象')
      withinDialog(clickCancelInDialog, '自动推送规则')
    })
    it('数据正常填写', () => {
      createRules(null, '232', '00:30', '2')
      waitIntercept(interceptCreateRules, () => {
        withinDialog(clickOkInDialog, '自动推送规则')
      }, () => {
        validSuccessMessage()
      })
    })
    it('删除失控告警规则', () => {
      cy.wait(2000)
      getDataLength().then(data => {
        cy.get('.el-table__body').last().find('.el-table__row').last()
          .findByText('删除')
          .click({
            force: true
          })
        waitIntercept(interceptDeleteRules, () => {
          confirmDelete()
        }, () => {
          getDataLength().should('have.length', data.length - 1)
        })
      })
    })
  })
  context('项目失控规则', () => {
    before(() => {
      cy.wait(1000)
    })
    it('消息内容为空不能保存', () => {
      createRules('2', null, null, '1', 'live')
      withinDialog(clickOkInDialog, '自动推送规则')
      validFormItemError('请选择消息内容')
      withinDialog(clickCancelInDialog, '自动推送规则')
    })
    it('定时推送未选择检测时间', () => {
      createRules('2', '232', null, '1', 'time')
      withinDialog(clickOkInDialog, '自动推送规则')
      validFormItemError('请选择检测时间')
      withinDialog(clickCancelInDialog, '自动推送规则')
    })
    it('指定实验室未选择实验室', () => {
      createRules('2', '232', null, '1', 'live', null, 'some')
      withinDialog(clickOkInDialog, '自动推送规则')
      validFormItemError('请选择检测目标')
      withinDialog(clickCancelInDialog, '自动推送规则')
    })
    it('数据正常填写', () => {
      getDataLength().then(data => {
        createRules('2', '232', null, '1', 'live', null, 'some', 'gd18001')
        waitIntercept(interceptCreateRules, () => {
          withinDialog(clickOkInDialog, '自动推送规则')
        }, () => {
          getDataLength().should('have.length', data.length + 1)
        })
      })
    })
    it('删除规则', () => {
      cy.wait(1000)
      getDataLength().then(data => {
        cy.get('.el-table__body').last().find('.el-table__row').last()
          .findByText('删除')
          .click({
            force: true
          })
        waitIntercept(interceptDeleteRules, () => {
          confirmDelete()
        }, () => {
          getDataLength().should('have.length', data.length - 1)
        })
      })
    })
  })
  context('启用/停用', () => {
    let result
    before(() => {
      waitRequest({
        intercept: queryRules,
        onBefore: () => {
          cy.reload()
        },
        onSuccess: (data) => {
          result = data
          closeClientAlert()
        }
      })
    })
    it('启用', () => {
      const rowIndex = result.data.findIndex(item => item.status === 1)
      console.log(rowIndex)
      if (rowIndex === -1) {
        const changeIndex = 0
        cy.get('.el-table__body').last().find('.el-table__row').eq(changeIndex)
          .findByText('停用')
          .should('exist')
          .click({
            force: true
          })
        waitRequest({
          intercept: queryRules,
          onBefore: () => {
            confirmDelete()
          },
          onSuccess: (responseData => {
            expect(responseData.data[changeIndex].status).to.eq(1)
          })
        })
        cy.get('.el-table__body').last().find('.el-table__row').eq(changeIndex)
          .findByText('启用')
          .should('exist')
          .click({
            force: true
          })
        waitIntercept(interceptResumeRules, () => {
          closeTips('提示', '启用')
        }, () => {
          waitIntercept(queryRules, () => {
            cy.reload()
            closeClientAlert()
          }, data => {
            expect(data.data[changeIndex].status).to.eq(0)
            cy.get('.el-table__body').last().find('.el-table__row').eq(changeIndex)
              .findByText('停用')
              .should('exist')
          })
        })
      } else {
        cy.get('.el-table__body').last().find('.el-table__row').eq(rowIndex)
          .findByText('启用')
          .should('exist')
          .click({
            force: true
          })
        waitIntercept(interceptResumeRules, () => {
          closeTips('提示', '启用')
        }, () => {
          waitIntercept(queryRules, () => {
            cy.reload()
            closeClientAlert()
          }, responseData => {
            expect(responseData.data[rowIndex].status).to.eq(0)
            cy.get('.el-table__body').last().find('.el-table__row').eq(rowIndex)
              .findByText('停用')
              .should('exist')
          })
        })
      }
    })
    it('停用', () => {
      waitIntercept(queryRules, () => {
        cy.reload()
      }, data => {
        result = data
        closeClientAlert()
        cy.wait(1000)
      })
      const rowIndex = result.data.findIndex(item => item.status === 0)
      console.log(rowIndex)
      if (rowIndex !== -1) {
        cy.get('.el-table__body').last().find('.el-table__row').eq(rowIndex)
          .findByText('停用')
          .should('exist')
          .click({
            force: true
          })
        waitIntercept(interceptPauseRules, () => {
          confirmDelete()
        }, () => {
          waitIntercept(queryRules, () => {
            cy.reload()
            closeClientAlert()
          }, data => {
            expect(data.data[rowIndex].status).to.eq(1)
            cy.get('.el-table__body').last().find('.el-table__row').eq(rowIndex)
              .findByText('启用')
              .should('exist')
          })
        })
      } else {
        const changeIndex = 2
        cy.get('.el-table__body').last().find('.el-table__row').eq(changeIndex)
          .findByText('启用')
          .should('exist')
          .click({
            force: true
          })
        closeTips('提示', '启用')
        cy.wait(1000)
        cy.get('.el-table__body').last().find('.el-table__row').eq(changeIndex)
          .findByText('停用')
          .should('exist')
          .click({
            force: true
          })
        waitIntercept(interceptPauseRules, () => {
          confirmDelete()
        }, () => {
          waitIntercept(queryRules, () => {
            cy.reload()
            closeClientAlert()
          }, data => {
            expect(data.data[changeIndex].status).to.eq(1)
            cy.get('.el-table__body').last().find('.el-table__row').eq(changeIndex)
              .findByText('启用')
              .should('exist')
          })
        })
      }
    })
  })
  context('编辑功能', () => {
    it('编辑失控规则', () => {
      getDataLength().then(data => {
        cy.get('.el-table__body').last().find('.el-table__row').last()
          .findByText('编辑')
          .should('exist')
          .click({
            force: true
          })
        cy.wait(2000)
        elform('destinationType', 'checkbox').first().parents('.el-checkbox__input').then(element => {
          if (element.hasClass('is-checked')) {
            elform('destinationType', 'checkbox').uncheck('1', {
              force: true
            })
            elform('destinationType', 'checkbox').check('2', {
              force: true
            })
            waitIntercept(interceptEditRules, () => {
              withinDialog(clickOkInDialog, '自动推送规则')
            }, () => {
              validSuccessMessage()
              getDataLength().should('have.length', data.length)
              cy.get('.el-table__body').last().find('.el-table__row').last()
                .findByText('编辑')
                .should('exist')
                .click({
                  force: true
                })
              cy.wait(1000)
              elform('destinationType', 'checkbox').first().parents('.el-checkbox__input')
                .should('not.have.class', 'is-checked')
              withinDialog(clickCancelInDialog, '自动推送规则')
            })
          } else {
            elform('destinationType', 'checkbox').check('1', {
              force: true
            })
            waitIntercept(interceptEditRules, () => {
              withinDialog(clickOkInDialog, '自动推送规则')
            }, () => {
              validSuccessMessage()
              getDataLength().should('have.length', data.length)
              cy.get('.el-table__body').last().find('.el-table__row').last()
                .findByText('编辑')
                .should('exist')
                .click({
                  force: true
                })
              cy.wait(1000)
              elform('destinationType', 'checkbox').first().parents('.el-checkbox__input')
                .should('have.class', 'is-checked')
              withinDialog(clickCancelInDialog, '自动推送规则')
            })
          }
        })
      })
    })
  })
  context('室内质控室间比对实时告警', () => {
    context('必填项验证', () => {
      it('标签未选择', () => {
        createSDIRules(null, null, 26, '232', 'live', '1')
        withinDialog(clickOkInDialog, '自动推送规则')
        validFormItemError('标签不能为空')
        withinDialog(clickCancelInDialog, '自动推送规则')
      })
      it('判断标准为空', () => {
        createSDIRules(null, '公立', null, '232', 'live', '1')
        withinDialog(clickOkInDialog, '自动推送规则')
        validFormItemError('请配置判断标准')
        withinDialog(clickCancelInDialog, '自动推送规则')
      })
      it('消息内容为空不能保存', () => {
        createSDIRules(null, '公立', 30, null, 'live', '1')
        withinDialog(clickOkInDialog, '自动推送规则')
        validFormItemError('请选择消息内容')
        withinDialog(clickCancelInDialog, '自动推送规则')
      })
      it('推送形式未选择', () => {
        createSDIRules(null, '公立', 30, '232', null, '1')
        withinDialog(clickOkInDialog, '自动推送规则')
        validFormItemError('请选择推送形式')
        withinDialog(clickCancelInDialog, '自动推送规则')
      })
      it('发送对象未选择', () => {
        createSDIRules(null, '公立', 30, '232', 'live')
        withinDialog(clickOkInDialog, '自动推送规则')
        validFormItemError('请选择发送对象')
        withinDialog(clickCancelInDialog, '自动推送规则')
      })
      it('指定实验室未选择实验室', () => {
        createSDIRules(null, '公立', 30, '232', 'live', '1', 'some')
        withinDialog(clickOkInDialog, '自动推送规则')
        validFormItemError('请选择检测目标')
        withinDialog(clickCancelInDialog, '自动推送规则')
      })
      it('判断标准不能为负数', () => {
        createSDIRules(null, '公立', -23, null, 'live', '1')
        withinDialog(clickOkInDialog, '自动推送规则')
        //填入负数自动转0
        elform('sdi.sdiThreshold').should('have.value', 0)
        withinDialog(clickCancelInDialog, '自动推送规则')
      })
      it('判断标准允许输入小数', () => {
        createSDIRules(null, '公立', 30.25, null, 'live', '1')
        withinDialog(clickOkInDialog, '自动推送规则')
        elform('sdi.sdiThreshold').parents('.el-form-item').should('not.have.class', 'is-error')
        elform('sdi.sdiThreshold').should('have.value', 30.25)
        withinDialog(clickCancelInDialog, '自动推送规则')
      })
      it('未选择检测体系组', () => {
        createSDIRules('1', null, 30.25, null, 'live', '1')
        withinDialog(clickOkInDialog, '自动推送规则')
        validFormItemError('请选择检测体系组')
        withinDialog(clickCancelInDialog, '自动推送规则')
      })
    })
    context('新增/修改/删除', () => {
      it('新增', () => {
        getDataLength().then(getData => {
          createSDIRules(null, '公立', 30.25, '232', 'live', '1')
          waitIntercept(interceptCreateRules, () => {
            withinDialog(clickOkInDialog, '自动推送规则')
          }, () => {
            validSuccessMessage()
            getDataLength().should('have.length', getData.length + 1)
            cy.wait(2000)
          })
        })
      })
      it('修改', () => {
        getDataLength().then(getData => {
          getDataLength().last().findByText('编辑').click({
            force: true
          })
          cy.wait(2000)
          elform('sdi.compareType', 'radio').check('1', {
            force: true
          })
          elform('sdi.compareType').click()
          activeSelect('仪器')
          elform('labTag').click()
          cy.wait(3000)
          activeSelect('新冠仪器')
          waitIntercept(interceptEditRules, () => {
            withinDialog(clickOkInDialog, '自动推送规则')
          }, () => {
            getDataLength().should('have.length', getData.length)
            getDataLength().last().findByText('编辑').click({
              force: true
            })
            cy.wait(1000)
            elform('sdi.compareType', 'radio').last().parents('.el-radio').should('have.class', 'is-checked')
            withinDialog(clickCancelInDialog, '自动推送规则')
            cy.wait(2000)
          })
        })
      })
      it('删除', () => {
        getDataLength().then(getData => {
          getDataLength().last().findByText('删除').click({
            force: true
          })
          waitIntercept(interceptDeleteRules, () => {
            confirmDelete()
          }, () => {
            getDataLength().should('have.length', getData.length - 1)
          })
        })
      })
    })
    context('消息模板', () => {
      it('新增', () => {
        const messageContent = '自动化新增消息内容'
        cy.get('.ql-search__tools-top.is-left').findByText('添加自动推送规则').click({
          force: true
        })
        elform('message').parents('.ql-select-message__current').findByText('自定义消息模板')
          .click({
            force: true
          })
        cy.get('.el-textarea__inner').first().type(messageContent)
        elform('message').parents('.el-form-item__content').findByText('保存为模板')
          .click({
            force: true
          })
        elform('message').click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list:visible').contains(messageContent)
          .should('exist')
        withinDialog(clickCancelInDialog, '自动推送规则')
      })
      it('删除', () => {
        cy.get('.ql-search__tools-top.is-left').findByText('添加自动推送规则').click({
          force: true
        })
        elform('message').click()
        cy.wait(1000)
        cy.get('.el-scrollbar__view.el-select-dropdown__list:visible').find('.el-select-dropdown__item')
          .then(getData => {
            cy.get('.el-scrollbar__view.el-select-dropdown__list:visible').find('.el-select-dropdown__item').last()
              .find('.el-icon-close.ql-select-message__close').click({
                force: true
              })
            waitIntercept(interceptDeleteMsg, () => {
              confirmDelete()
            }, () => {
              cy.wait(500)
              elform('message').click()
              cy.wait(1000)
              cy.get('.el-scrollbar__view.el-select-dropdown__list:visible').find('.el-select-dropdown__item')
                .should('have.length', getData.length - 1)
              withinDialog(clickCancelInDialog, '自动推送规则')
            })
          })
      })
    })
    context('标签数据来源', () => {
      const tagName = '自动化新增标签' + new Date().getTime()
      const editTagName = '修改标签' + new Date().getTime()
      it('新增业务标签会同步至SDI告警页面', () => {
        visitPage('tags-service')
        closeClientAlert()
        cy.get('.el-collapse.ql-category.cqb-collapse').findByText('其他').click({
          force: true
        })
        cy.get('.el-collapse-item__content').last().findByText('添加标签').click({
          force: true
        })
        elform('tag').type(tagName)
        waitIntercept(interceptCreateTag, () => {
          withinDialog(clickOkInDialog, '添加标签')
        }, () => {
          validSuccessMessage()
          visitPage('push-setting')
          createSDIRules()
          elform('labTag').click()
          cy.wait(1000)
          cy.get('.el-scrollbar__view.el-select-dropdown__list')
            .last()
            .contains(tagName)
            .should('exist')
          withinDialog(clickCancelInDialog, '自动推送规则')
        })
      })
      it('修改标签SDI告警页面也会同步修改', () => {
        visitPage('tags-service')
        closeClientAlert()
        cy.get('.el-collapse.ql-category.cqb-collapse').findByText('其他').click({
          force: true
        })
        cy.get('.el-collapse-item__content').last().within(() => {
          cy.get('.ql-tag.el-tag.el-tag--medium').contains(tagName).click({
            force: true
          })
        })
        elform('tag')
          .clear()
          .type(editTagName)
        waitIntercept(interceptEditTag, () => {
          withinDialog(clickOkInDialog, '编辑标签')
        }, () => {
          validSuccessMessage()
          visitPage('push-setting')
          createSDIRules()
          elform('labTag').click()
          cy.get('.el-scrollbar__view.el-select-dropdown__list')
            .last()
            .contains(editTagName)
            .should('exist')
          withinDialog(clickCancelInDialog, '自动推送规则')
        })
      })
      it('删除标签SDI告警页面也会同步删除', () => {
        visitPage('tags-service')
        closeClientAlert()
        cy.get('.el-collapse.ql-category.cqb-collapse').findByText('其他').click({
          force: true
        })
        cy.get('.el-collapse-item__content').last().within(() => {
          cy.get('.el-tag__close.el-icon-close').last().click({
            force: true
          })
          waitIntercept(interceptDeleteTag, () => {
            confirmDelete()
          }, () => {
            cy.wait(1000)
            visitPage('push-setting')
          })
        })
        createSDIRules()
        elform('labTag').click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list')
          .last()
          .contains(editTagName)
          .should('not.exist')
        withinDialog(clickCancelInDialog, '自动推送规则')
      })
    })
  })
})