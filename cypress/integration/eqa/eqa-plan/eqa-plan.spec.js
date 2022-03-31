/**
 * 比对计划组织
 */
import 'cypress-iframe'
import {
  visitIframePage
} from '../../../shared/route'
import {
  clickButton
} from '../../common/button'
import {
  interceptAll,
  waitIntercept,
  waitRequest
} from '../../common/http'
import {
  expandSearchConditions
} from '../eqa-order/eqa-order'
import {
  queryPlanData,
  addEqaPlan,
  getIframeElement,
  reset,
  iframeDropList,
  subimtInformation,
  eqaModel,
  cancelElform,
  cancelPush,
  cannotPush,
  modelLength,
  iframeValidMessage,
  errorInformation,
  searchPlan,
  interceptModelAdd,
  interceptAddPlan,
  pushPlanReq,
  deletePlanReq,
  checkCompareCode,
  checkPlan,
  editReportModel,
  submitReportModel,
  confirmClick,
  saveReportModel,
  interceptEditModel,
  findButton,
  clickGenerateReport,
  interceptQueryData,
  interceptSendSimple,
  queryData,
  validGenerateReport
} from './eqa-plan'


context('比对计划组织', () => {
  let randomCode = parseInt(Math.random() * 100000)
  const visitEQA = () => {
    visitIframePage('eqa-plan')
  }
  before(() => {
    visitIframePage('eqa-plan')
    cy.get('.el-form.el-form--inline').last().findByText('展开').click()
  })

  context('添加比对计划', () => {
    const prop = '新增比对计划'
    it('001-比对计划添加成功', () => {
      const planName = '自动测试计划' + randomCode
      const planCompareCode = 'plan' + randomCode
      const majorName = '临床免疫学'
      const simpleNum = 3
      const times = 6
      const labCode = 'gdtest2'
      addEqaPlan({
        planName,
        planCompareCode,
        simpleNum,
        majorName,
        labCode,
        times
      })
      waitIntercept(interceptAddPlan, () => {
        subimtInformation()
      }, data => {
        iframeValidMessage('添加比对计划成功')
      })
    })
    it('002-盲样计划添加新冠专业', () => {
      const planName = '自动测试计划' + randomCode
      const planCompareCode = 'Cov-19' + randomCode
      const majorName = '凝血试验'
      const simpleNum = 3
      const times = 7
      addEqaPlan({
        planName,
        planCompareCode,
        majorName,
        simpleNum,
        times
      })
      waitRequest({
        intercept: interceptAddPlan,
        onBefore: () => {
          subimtInformation()
        },
        onError: (error) => {
          iframeValidMessage('盲样模式下暂时无法创建新冠专业项目的比对计划')
          cancelElform(prop)
        }
      })
    })
    it('项目无TEa不允许启用', () => {
      const planName = '自动测试计划' + randomCode
      const planCompareCode = 'NoTEa' + randomCode
      const majorName = '凝血试验'
      const times = 8
      addEqaPlan({
        planName,
        planCompareCode,
        majorName,
        times
      })
      cy.get('button').contains('下一步').click({
        force: true
      })
      cy.wait(1000)
      cy.get('.el-card__body').find('.el-switch__core').first().click()
      cy.wait(500)
      cy.get('[role="alert"]').find('.el-message__content').should('have.text', '该项目不存在TEa来源数据，无法启用！')
      cancelElform(prop)
    })
  })
  context('模板功能', () => {
    const prop = '新增比对计划'
    it('003-模板添加成功', () => {
      const modelName = '自动' + randomCode
      eqaModel(modelName)
      waitIntercept(interceptModelAdd, () => {
        //点击保存
        cy.get('.el-form').last().find('button').contains('保存').click({
          force: true
        })
      }, data => {
        iframeValidMessage('模板保存成功')
        cancelElform(prop)
      })
    })
    it('004-模板名称为空不能保存', () => {
      eqaModel()
      modelLength('请配置模板名称', true)
      cancelElform(prop)
    })
    it('005-模板名称重复不能保存', () => {
      const repeatModelName = '32'
      eqaModel(repeatModelName)
      cy.get('.el-form').last().find('.el-form-item').first().then($el => {
        if ($el.hasClass('is-success') === true) { // 模板名称不存在可以保存
          //点击保存
          cy.get('.el-form').last().find('button').contains('保存').click({
            force: true
          })
          iframeValidMessage('模板保存成功')
          cancelElform(prop)
          eqaModel(repeatModelName)
          //点击保存
          cy.get('.el-form').last().find('button').contains('保存').click({
            force: true
          })
          errorInformation('模板名称不能重复!')
          cancelElform(prop)
        } else {
          errorInformation('模板名称不能重复!')
          cancelElform(prop)
        }
      })
    })
    it('006-修改模板(模板名称)', () => {
      //点击添加计划
      cy.get('.el-button.el-button--primary.el-button--medium.is-plain').first().click()
      cy.get('button').contains('选择模板').click()
      //选择第一个模板
      cy.get('.el-table__body').last().find('.el-table__row').first().find('button').contains('修改').click()
      //输入计划名称
      cy.get('[aria-label="编辑模板"]:visible').first()
        .find('.el-form').first()
        .find('[for="name"]')
        .next('.el-form-item__content')
        .find('.el-input__inner')
        .clear({
          force: true
        })
        .type('修改模板名称' + randomCode, {
          force: true
        })
      cy.intercept({
        url: '/service/template/form/edit',
        method: 'POST'
      }).as('editForm')
      cy.get('[aria-label="编辑模板"]:visible').findByText('确定')
        .click({
          force: true
        })
      cy.wait('@editForm').then((xhr) => {
        cy.compare(xhr)
      })
      cy.get('.el-message__content').should('have.text', '模板更新成功')
      cancelElform(prop)
    })
    it('007-使用模板', () => {
      //点击添加计划
      cy.get('.el-button.el-button--primary.el-button--medium.is-plain').first().click()
      cy.get('button').contains('选择模板').click()
      cy.get('.el-table__body').last().find('.el-table__row').first().findByText('修改').click()
      cy.wait(3000)
      cy.get('.el-form.eqa-plan-info').last().find('.el-input__inner').first().invoke('val').then((val) => {
        cy.get('[aria-label="编辑模板"]:visible').findByText('确定')
          .click({
            force: true
          })
        cy.get('button').contains('选择模板').click()
        cy.get('.el-table__body').last().find('.el-table__row').first().contains('使用').click()
        cy.get('.el-form.eqa-plan-info').last().find('.el-input__inner').first().should('have.value', val)
        cancelElform(prop)
      })
    })
    it('008-删除模板', () => {
      //点击添加计划
      cy.get('.el-button.el-button--primary.el-button--medium.is-plain').first().click()
      cy.get('button').contains('选择模板').click()
      cy.get('.el-table__body').last().find('.el-table__row').then((length) => {
        cy.get('.el-table__body').last().find('.el-table__row').first().find('.el-button.el-button--text.el-button--mini.el-popover__reference').click()
        cy.intercept({
          url: '**/delete?id=*',
          method: 'POST'
        }).as('deleteForm')
        cy.get('.el-button.el-button--primary.el-button--mini').last().click()
        cy.wait('@deleteForm').then((xhr) => {
          cy.compare(xhr)
          cy.get('.el-table__body').last().find('.el-table__row').should('have.length', length.length - 1)
          cancelElform(prop)
        })
      })
    })
  })
  context('推送计划失败', () => {
    beforeEach(() => {
      visitEQA()

    })
    it('009-比对计划信息不全不能进行推送', () => {
      const majorName = '临床免疫学'
      const simpleNum = 3
      const times = 8
      const planName = '自动测试计划A' + randomCode
      const planCompareCode = 'planA' + randomCode
      addEqaPlan({
        planName,
        planCompareCode,
        majorName,
        simpleNum,
        times
      })
      subimtInformation()
      cannotPush(planName)
    })
    it('010-无比对项目不能进行推送', () => {
      const majorName = '凝血试验'
      const simpleNum = 3
      const labCode = 'gdtest2'
      const times = 8
      const planName = '自动测试计划B' + randomCode
      const planCompareCode = 'planB' + randomCode
      addEqaPlan({
        planName,
        planCompareCode,
        majorName,
        simpleNum,
        labCode,
        times
      })
      subimtInformation()
      cannotPush(planName)
    })
    it('011-信息未填写完整出现标记', () => {
      const majorName = '临床免疫学'
      const simpleNum = 3
      const times = 8
      const planName = '自动测试计划C' + randomCode
      const planCompareCode = 'planC' + randomCode
      addEqaPlan({
        planName,
        planCompareCode,
        majorName,
        simpleNum,
        times
      })
      subimtInformation()
      cannotPush(planName, true)
    })
    it('012-无法取消推送', () => {
      expandSearchConditions()
      clickButton('重置')
      waitIntercept(interceptQueryData, () => {
        clickButton('搜索')
      }, data => {
        if (data.total) {
          //有上报数据的
          const havingReported = data.records.findIndex(item => item.orderStatus === 1)
          const outOfDate = data.records.findIndex(item => item.orderStatus === null && item.giveSampleTime === 0)
          if (havingReported !== -1) {
            waitRequest({
              intercept: cancelPush,
              onBefore: () => {
                cy.get('.el-table__row').eq(havingReported).find('.el-switch').click({
                  force: true
                })
              },
              onError: () => {
                iframeValidMessage('当前比对计划已有实验室上报，不能取消推送')
              }
            })
          }
          //过了上报时间的
          cy.wait(5000)
          if (outOfDate !== -1) {
            waitRequest({
              intercept: cancelPush,
              onBefore: () => {
                cy.get('.el-table__row').eq(outOfDate).find('.el-switch').click({
                  force: true
                })
              },
              onError: () => {
                iframeValidMessage('当前比对计划已过上报截止日期，不能取消推送')
              }
            })
          }
        }
      })
    })
    it('015-删除计划', () => {
      const majorName = '临床免疫学'
      const simpleNum = 3
      const times = 12
      const planCompareCode = 'planABC' + randomCode
      const planName = '自动测试计划' + randomCode
      addEqaPlan({
        planName,
        planCompareCode,
        majorName,
        simpleNum,
        times
      })
      subimtInformation()
      searchPlan(planName)
      cy.get('.el-table__row').first().find('td').last().findByText('删除').click({
        force: true
      })
      waitIntercept(deletePlanReq, () => {
        cy.get('.el-popconfirm__action').last().find('button').contains('确定').click()
      }, data => {})
    })
    it('016-修改计划', () => {
      const planName = '自动测试计划' + randomCode
      const planCompareCode = 'plan23' + randomCode
      const majorName = '临床免疫学'
      const simpleNum = 3
      const times = 7
      addEqaPlan({
        planName,
        planCompareCode,
        times,
        majorName,
        simpleNum
      })
      subimtInformation()
      const newPlanName = '修改计划' + randomCode
      searchPlan(planName)
      cy.get('.el-table__row').first().find('td').last().findByText('编辑').click({
        force: true
      })
      cy.wait(500)
      getIframeElement('name').invoke('val').then((val) => {
        const oldName = val
        getIframeElement('name').clear().type(newPlanName)
        subimtInformation('编辑比对计划')
        searchPlan(newPlanName)
        cy.get('.el-table__row').first().find('td').last().findByText('编辑').click({
          force: true
        })
        cy.wait(500)
        getIframeElement('name').invoke('val').then((val) => {
          const newName = val
          expect(oldName).not.to.equal(newName)
          cancelElform('编辑比对计划')
          cy.get('.el-table__row').first().find('td').last().findByText('删除').click({
            force: true
          })
          cy.get('.el-popconfirm__action').last().find('button').contains('确定').click({
            force: true
          })
        })
      })
    })
  })
  context('计划推送成功/取消推送', () => {
    const majorName = '常规化学'
    const simpleNum = 3
    const labCode = 'gdtest2'
    const times = 11
    const issueTime = 1
    const issueEndTime = 2
    const testStartTime = 3
    const testEndTime = 4
    const feedBackStartTime = 5
    const feedBackEndTime = 6
    const planName = '自动测试计划D' + randomCode
    const planCompareCode = 'planD' + randomCode
    it('013-计划推送成功', () => {
      addEqaPlan({
        planName,
        planCompareCode,
        majorName,
        simpleNum,
        times,
        issueTime,
        issueEndTime,
        testStartTime,
        testEndTime,
        feedBackEndTime,
        feedBackStartTime,
        labCode
      })
      subimtInformation()
      searchPlan(planName)
      waitIntercept(pushPlanReq, () => {
        cy.get('.el-table__row').first().find('.el-switch').click()
      }, data => {
        cy.get('.el-table__row').first().find('td').last().find('span').should('not.have.text', '编辑')
      })
    })
    it('014-取消推送', () => {
      searchPlan(planName)
      waitIntercept(cancelPush, () => {
        cy.get('.el-table__row').first().find('.el-switch').click()
      }, data => {
        cy.get('.el-table__row').first().find('td').last().findByText('删除').should('exist').click({
          force: true
        })
        cy.get('.el-popconfirm__action').last().find('button').contains('确定').click()
      })
    })
  })
  context('筛选条件', () => {
    before(() => {
      cy.get('.ql-search--simple.is-right').first().within($el => {
        if ($el.css('display') === 'block') {
          cy.get('.el-form.el-form--inline').last().findByText('展开').click({
            force: true
          })
        }
      })
    })
    it('017-专业分类查询', () => {
      reset()
      const major = '常规化学'
      queryPlanData(major)
    })
    it('018-年度查询', () => {
      reset()
      const year = 2023
      queryPlanData(null, year)
    })
    it('019-关键字查询', () => {
      reset()
      const keyword = '计划'
      queryPlanData(null, null, keyword)
    })
    it('020-次数查询', () => {
      reset()
      const time = 11
      queryPlanData(null, null, null, time)
    })
    it('020-状态查询', () => {
      reset()
      const alradyPush = '已推送'
      const waitPush = '待推送'
      queryPlanData(null, null, null, null, alradyPush)
      reset()
      queryPlanData(null, null, null, null, waitPush)
    })
    it('质控主管单位查询', () => {
      reset()
      const QpOrganization = '青浦医联体'
      const guangDong = '佛山市临床检验质量控制中心'
      queryPlanData(null, null, null, null, null, QpOrganization)
      reset()
      cy.wait(2000)
      queryPlanData(null, null, null, null, null, guangDong)
    })
  })
  context('数据校验', () => {
    const prop = '新增比对计划'
    const planName = '计划'
    const planCompareCode = 'plan' + randomCode
    const times = 6
    before(() => {
      cy.reload()
    })
    it('021-计划编码未填写', () => {
      addEqaPlan({
        planName,
        times
      })
      subimtInformation()
      errorInformation('请填写比对计划编码')
      cancelElform(prop)
    })
    it('022-计划名称未填写', () => {
      addEqaPlan({
        planCompareCode,
        times
      })
      subimtInformation()
      errorInformation('请填写比对计划名称')
      cancelElform(prop)
    })
    it('023-次数未填写', () => {
      addEqaPlan({
        planName,
        planCompareCode
      })
      subimtInformation()
      errorInformation('请选择次数')
      cancelElform(prop)
    })

    it('024-计划编码唯一', () => {
      checkCompareCode()

    })
    it('025-年度-计划名称-次数结合作为唯一项', () => {
      checkPlan()
    })
    it('026-检测开始时间<=样本下发结束时间', () => {
      const planName = '样本时间'
      const planCompareCode = 'plan20111'
      const times = 3
      const issueTime = 2
      const issueEndTime = 2
      const testStartTime = 1
      const testEndTime = 1
      addEqaPlan({
        planName,
        planCompareCode,
        times,
        issueEndTime,
        issueTime,
        testStartTime,
        testEndTime
      })
      subimtInformation()
      errorInformation('样本下发结束时间不能大于样本检测开始时间')
      cancelElform(prop)
    })
    it('027-检测结束时间<报告反馈时间', () => {
      const planName = '样本时间'
      const planCompareCode = 'plan20111'
      const times = 3
      const feedBackStartTime = 2
      const feedBackEndTime = 1
      const testStartTime = 3
      const testEndTime = 4
      addEqaPlan({
        planName,
        planCompareCode,
        times,
        feedBackStartTime,
        feedBackEndTime,
        testStartTime,
        testEndTime
      })
      subimtInformation()
      errorInformation('样本检测结束时间不能大于报告反馈开始时间')
      cancelElform(prop)
    })
    it('027-样本输入框验证', () => {
      const planName = '样本时间'
      const planCompareCode = 'plan20111'
      const times = 3
      const simpleNum = 2.6
      //不能为小数
      addEqaPlan({
        planName,
        planCompareCode,
        times,
        simpleNum
      })
      cy.get('button').contains('下一步').click()
      cy.get('.el-form-item__error').should('contain', '请输入正整数')
      // 负数自动转为1
      cy.get('.el-form.eqa-plan-info [role="spinbutton"]').clear().type(-10)
      cy.get('button').contains('下一步').click()
      cy.get('button').contains('上一步').click()
      cy.get('.el-form.eqa-plan-info [role="spinbutton"]').should('have.value', 1)
      //非盲样模式样本数最大值为99
      cy.get('.el-form.eqa-plan-info [role="spinbutton"]').clear().type(1000)
      iframeDropList('请选择').last().click()
      cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('非盲样模式').click()
      cy.get('.el-form.eqa-plan-info [role="spinbutton"]').should('have.value', 99)
      cancelElform(prop)
    })
  })
  context('报告模板', () => {
    const prop = '生成报告'
    before(() => {
      visitEQA()
      expandSearchConditions()
    })
    it('028-模板保存成功', () => {
      let modelName = '报告模板名称' + parseInt(Math.random() * 100000)
      const lab = 'lab'
      const instr = 'instr'
      const method = 'method'
      editReportModel(modelName, lab, instr, method)
      submitReportModel()
      cancelElform(prop)
    })
    it('029-未选择所属组模板保存失败', () => {
      const modelName = '报告模板名称' + parseInt(Math.random() * 100000)
      editReportModel(modelName)
      saveReportModel()
      cy.get('.el-form-item__error').should('contain', '请选择所属组')
      cancelElform(prop)
    })
    it('030-报告模板名称一样保存失败', () => {
      const modelName = '模板一'
      const lab = 'lab'
      editReportModel(modelName, lab)
      saveReportModel()
      cy.get('.el-form-item__error').should('contain', '模板名称不能重复!')
      cancelElform(prop)
    })
    it('031-报告模板名称为空不能保存', () => {
      const instr = 'instr'
      editReportModel('', instr)
      saveReportModel()
      cy.get('.el-form-item__error').should('contain', '请配置模板名称')
      cancelElform(prop)
    })
    it('032-报告生成使用模板', () => {
      clickButton('重置')
      waitIntercept(queryData, () => {
        clickButton('搜索')
      }, data => {
        if (data.total) {
          const rowIndex = data.records.findIndex(item => item.canGenerateReport)
          if (rowIndex !== -1) {
            clickGenerateReport(rowIndex)
            cy.get('[aria-label="生成报告"]').findByText('选择模板').click({
              force: true
            })
            cy.get('.el-table__body').last().find('.el-table__row').first().findByText('使用').click({
              force: true
            })
            cy.get('.el-form.plan-report').find('[value = "lab"]').parent().should('have.class', 'is-checked')
            cancelElform(prop)
          }
        }
      })
    })
    it('033-修改报告模板名称', () => {
      const newModelName = '修改模板名称' + parseInt(Math.random() * 100000)
      clickButton('重置')
      waitIntercept(queryData, () => {
        clickButton('搜索')
      }, data => {
        if (data.total) {
          const rowIndex = data.records.findIndex(item => item.canGenerateReport)
          if (rowIndex !== -1) {
            clickGenerateReport(rowIndex)
            cy.get('[aria-label="生成报告"]').findByText('选择模板').click({
              force: true
            })
            cy.get('.el-table__body').last().find('.el-table__row').first().find('.cell').first().invoke('text').then((getData) => {
              const modelName = getData
              cy.get('.el-table__body').last().find('.el-table__row').first().findByText('修改').click({
                force: true
              })
              cy.get('[aria-label="编辑模板"]').find('[for="name"]').next('.el-form-item__content').find('.el-input__inner')
                .clear()
                .type(newModelName)
              waitRequest({
                intercept: interceptEditModel,
                onBefore: () => {
                  confirmClick('编辑模板')
                },
                onSuccess: () => {
                  iframeValidMessage('模板更新成功')
                }
              })
              cy.get('.el-table__body').last().find('.el-table__row').first().find('.cell').first().invoke('text').then((getData) => {
                const newName = getData
                expect(newName).not.to.eq(modelName)
              })
              cancelElform(prop)
            })
          }
        }
      }) 
        // cy.get('[aria-label="生成报告"]').findByText('选择模板').parent('button').parent('span').then($el => {
        //   console.log($el.css('display'))
        //   // if($el.css('display')==='block'){//没有报告模板
        //   //   console.log(123)
        //   // }
        // })
      // })
    })
    it('034-删除报告模板', () => {
      clickButton('重置')
      waitIntercept(queryData, () => {
        clickButton('搜索')
      }, data => {
        if (data.total) {
          const rowIndex = data.records.findIndex(item => item.canGenerateReport)
          if (rowIndex !== -1) {
            clickGenerateReport(rowIndex)
            cy.get('[aria-label="生成报告"]').findByText('选择模板').click({
              force: true
            })
            cy.get('.el-table__body').last().find('.el-table__row').then((length) => {
              const dataLength = length.length
              waitRequest({
                intercept: interceptAll('/service/template/form/delete?*', 'deleteModel', ''),
                onBefore: () => {
                  cy.get('.el-table__body').last().find('.el-table__row').first().findByText('删除').click({
                    force: true
                  })
                  cy.get('.el-popconfirm').last().findByText('确定').click({
                    force: true
                  })
                },
                onSuccess: () => {
                  cy.get('.el-table__body').last().find('.el-table__row').should('have.length', dataLength - 1)
                }
              })
              cancelElform(prop)
            })
          }
        }
      })
    })
  })

  context('报告生成', () => {
    const prop = '生成报告'
    const confirm = '确定'
    it('035-所有实验室都没有上报不能生成报告', () => {
      searchPlan('新UI')
      validGenerateReport(() => {

      }, () => {
        findButton(prop, confirm).parent('button').should('have.class', 'is-disabled')
        cancelElform(prop)
      })
    })
    it('036-所属组未选择不能生成报告', () => {
      clickButton('重置')
      validGenerateReport(() => {
        findButton(prop, confirm).parent('button').should('not.have.class', 'is-disabled')
        findButton(prop, confirm).click({
          force: true
        })
        errorInformation('请选择所属组')
        cancelElform(prop)
      }, () => {
      })
    })
    it('037-报告生成成功', () => {
      clickButton('重置')
      validGenerateReport(() => {
        iframeValidMessage('生成反馈报告任务已提交，可以在反馈报告页面查看报告')
        cancelElform(prop)
      }, () => {

      }, true)
    })
    it('038-样本下发', () => {
      searchPlan('test11')
      clickButton('重置')
      waitIntercept(queryData, () => {
        clickButton('搜索')
      }, data => {
        if (data.total) {
          cy.get('.el-table__body').eq(1).find('.el-table__row').first().findByText('样本下发').click({
            force: true
          })
          cy.wait(2000)
          cy.get('[aria-label="样本下发"]').find('[type=checkbox]').check('', {
            force: true
          })
          waitRequest({
            intercept: interceptSendSimple,
            onBefore: () => {
              findButton('样本下发', '确定').click({
                force: true
              })
            },
            onSuccess: () => {
              iframeValidMessage('样本下发成功')
            }
          })
        }
      })
    })
  })
  context('删除数据库中的数据', () => {
    it('删除数据', () => {
      const planName = '自动测试计划'
      const planName2 = '修改计划'
      cy.task('executeEqaSql', `delete from plan where name LIKE "%${planName}%"`)
      cy.wait(1000)
      cy.task('executeEqaSql', `delete from plan where name LIKE "%${planName2}%"`)
    })
  })
})