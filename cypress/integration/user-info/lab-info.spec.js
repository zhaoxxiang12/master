/**
 * 实验室信息设置
 */
import {
  visitLabPage
} from '../../shared/route'
import {
  clickOkInDialog,
  closeTips,
  withinDialog
} from '../common/dialog'
import {
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
  findTableCell
} from '../common/table'
import {
  expandSearchConditions
} from '../eqa/eqa-order/eqa-order'
import {
  getDialog, messageLabOption
} from '../message/message'
import {
  elform
} from '../mutual-result/mutual-item'
import {
  clickSearch
} from '../setting/report-monitor/report-monitor'
import {
  mathRomdomNumber
} from '../single-import/single-import'
import {
  interceptQueryItemStatus,
  interceptLabSetting,
  selectLabSpec,
  enableLabItem,
  disableLabItem,
  clickSetManyItemStatus,
  setManyItems,
  createLabCollection,
  findElformButton,
  relateLab,
  interceptCollection,
  findLabLabelOption,
  clickSaveConfig,
  fillLabInfo,
  addFieldItem,
  fieldInput,
  getLabForm,
  interceptQueryCollection
} from './lab-info'

context('质量管理体系基本信息', () => {
  before(() => {
    cy.visitLabPage('lab-info', 'labgd18030')
  })
  context('机构性质及等级', () => {
    before(() => {
      cy.wait(5000)
    })
    it('机构性质设置为外资', () => {
      elform('labType', 'radio').check('外资', {
        force: true
      })
      cy.get('#pane-labType label').contains('私立机构等级').should('not.exist')

      waitIntercept(interceptLabSetting, () => {
        cy.get('.el-row.is-justify-center.el-row--flex').findByText('保存配置').click({
          force: true
        })
      }, (data) => {
        validSuccessMessage()
        expect(data.labType).to.eq('外资')
      })
    })
    it('设置机构性质和机构等级', () => {
      cy.wait(3000)
      elform('labType', 'radio').check('公立', {
        force: true
      })
      cy.get('#pane-labType label').contains('公立机构等级').should('exist')
      elform('labLevel', 'radio').check('A 三甲综合', {
        force: true
      })
      waitIntercept(interceptLabSetting, () => {
        cy.get('.el-row.is-justify-center.el-row--flex').findByText('保存配置').click({
          force: true
        })
      }, (data) => {
        validSuccessMessage()
        expect(data.labLevel).to.eq('A 三甲综合')
        expect(data.labType).to.eq('公立')
      })
    })
  })
  context('启用/停用项目', () => {
    before(() => {
      visitLabPage('mutual-result')
      cy.wait(3000)
      closeClientAlert()
    })
    it('启用项目', () => {
      waitIntercept(interceptQueryItemStatus, () => {
        selectLabSpec('尿干化学')
        cy.wait(2000)
      }, data => {
        const rowIndex = data.findIndex(item => item.status === false)
        if (rowIndex !== -1) {
          enableLabItem(rowIndex)
        } else {
          const selfIndex = 0
          disableLabItem(selfIndex)
          cy.wait(1000)
          enableLabItem(selfIndex)
        }
      })
    })
    it('停用项目', () => {
      cy.wait(1000)
      waitIntercept(interceptQueryItemStatus, () => {
        selectLabSpec('尿干化学')
        cy.wait(2000)
      }, data => {
        const rowIndex = data.findIndex(item => item.status === true)
        if (rowIndex !== -1) {
          disableLabItem(rowIndex)
        } else {
          const selfIndex = 0
          enableLabItem(selfIndex)
          cy.wait(1000)
          disableLabItem(selfIndex)
        }
      })
      cy.wait(2000)
    })
  })
  context('批量停用/启用', () => {
    before(() => {
      visitLabPage('mutual-result')
      cy.wait(3000)
      closeClientAlert()
    })
    it('批量启用', () => {
      waitIntercept(interceptQueryItemStatus, () => {
        selectLabSpec('临床免疫学')
        cy.wait(2000)
      }, data => {
        const rowIndex = data.findIndex(item => item.status === false)
        if (rowIndex === -1) {
          const selfIndex = 0
          disableLabItem(selfIndex)
          setManyItems()
        } else {
          setManyItems()
        }
      })
    })
    it('批量停用', () => {
      waitIntercept(interceptQueryItemStatus, () => {
        selectLabSpec('临床免疫学')
        cy.wait(2000)
      }, data => {
        const rowIndex = data.findIndex(item => item.status === true)
        if (rowIndex === -1) {
          const selfIndex = 0
          disableLabItem(selfIndex)
          setManyItems(false)
        } else {
          setManyItems(false)
        }
      })
    })
  })
  context('质量管理体系基本信息', () => {
    const formName = 'gd18030测试表单' + mathRomdomNumber(0,1000)
    const fillText = '123'
    const fillNumber = 455
    before(() => {
      cy.visitPage('info-collection')
      cy.reload()
      cy.wait(3000)
      closeClientAlert()
    })
    it('验证必填项', () => {
      createLabCollection(formName)
      cy.wait(2000)
      findElformButton(formName, '编辑')
      cy.wait(2000)
      relateLab('编辑实验室质量管理信息采集表', 'gd18030')
      withinDialog(clickOkInDialog, '选择实验室')
      withinDialog(clickOkInDialog, '编辑实验室质量管理信息采集表')
      findElformButton(formName, '推送')
      cy.wait(500)
      validSuccessMessage()
      waitIntercept(interceptCollection, () => {
        cy.visitLabPage('lab-info', 'labgd18030')
      }, data => {
        const returnFieldData = data.collectResults.map((item) => {
          if (item.formName === formName && item.required === true) {
            // return [item.fieldName,item.fieldType]
            return {
              fieldName: item.fieldName,
              fieldType: item.fieldType
            }
          }
        }).filter(filterName => filterName !== undefined)
        cy.wait(5000)
        if (returnFieldData.length > 0) {
          cy.get('.el-tabs__nav.is-left').contains(formName).click({
            force: true
          })
          cy.wait(1000)
          returnFieldData.map(fieldData => {
            if (fieldData.fieldType === 'text') {
              findLabLabelOption(fieldData.fieldName).find('.el-textarea__inner').clear()
              findLabLabelOption(fieldData.fieldName).find('.el-form-item__error').should('contain', fieldData.fieldName + '不能为空')
              clickSaveConfig()
            } else if (fieldData.fieldType === 'number') {
              findLabLabelOption(fieldData.fieldName).find('.el-input__inner').clear()
              findLabLabelOption(fieldData.fieldName).find('.el-form-item__error').should('contain', fieldData.fieldName + '不能为空')
            } else if (fieldData.fieldType === 'radio') {
              findLabLabelOption(fieldData.fieldName).find('.el-radio__input').then(el => {
                if (el.hasClass('is-checked') === false) {
                  clickSaveConfig()
                  findLabLabelOption(fieldData.fieldName).find('.el-form-item__error').should('contain', fieldData.fieldName + '不能为空')
                } else {
                  findLabLabelOption(fieldData.fieldName).find('.el-radio__input').each((el, index) => {
                    if (el.hasClass('is-checked')) {
                      findLabLabelOption(fieldData.fieldName).find('.el-radio__input').eq(index).then(el => {
                        el.parent().removeAttr('is-checked')
                        el.removeAttr('is-checked')
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    })
    it('填写表单', () => {
      waitIntercept(interceptCollection, () => {
        cy.visitLabPage('lab-info', 'labgd18030')
      }, data => {
        const returnFieldData = data.collectResults.map((item) => {
          if (item.formName === formName) {
            if (item.fieldType === 'select') {
              return {
                fieldName: item.fieldName,
                fieldType: item.fieldType,
                option: item.options
              }
            } else {
              return {
                fieldName: item.fieldName,
                fieldType: item.fieldType
              }
            }
          }
        }).filter(filterName => filterName !== undefined)
        cy.wait(5000)
        if (returnFieldData.length > 0) {
          cy.get('.el-tabs__nav.is-left').contains(formName).click({
            force: true
          })
          cy.wait(1000)
          fillLabInfo(returnFieldData, fillText, fillNumber)
          waitIntercept(interceptCollection, () => {
            clickSaveConfig()
          }, () => {
            validSuccessMessage()
          })
        }
        visitLabPage('home')
        cy.wait(5000)
        getDialog('质量管理体系基本信息').should('not.exist')
      })
    })
    it('管理端校验数据', () => {
      const labCode = 'gd18030'
      cy.visitPage('report-effect-collection')
      expandSearchConditions('高级搜索')
      cy.wait(1000)
      cy.findAllByPlaceholderText('所有表单').click({
        force: true
      })
      activeSelect(formName)
      elform('labKeyword').type(labCode)
      waitIntercept(interceptQueryCollection, () => {
        clickSearch()
      }, (data) => {
        if (data.data.length > 0) {
          data.data.map(item => {
            expect(item.labCode).to.eq(labCode)
            const formData = item.collectResults.map(formResult => {
              if (formResult.formName === formName) {
                return formResult
              }
            }).filter(item => item !== undefined)
           formData.map(formItem => {
             if (formItem.fieldName === "文本输入框") {
               expect(formItem.result).to.eq(fillText)
             } else if (formItem.fieldName === "数值输入框") {
              expect(formItem.result).to.eq(fillNumber)
             } else {
               const newData = formItem.options.map(optionsItem => {
                return {optionId:optionsItem.optionId,optionName:optionsItem.optionName}
               })
               expect(newData[0].optionId).to.eq(formItem.result[0])
               cy.get('.el-table__header:visible .is-group').should('contain', formName)
               messageLabOption().should('contain',fillText)
               messageLabOption().should('contain',fillNumber)
               messageLabOption().should('contain',newData[0].optionName)
             }
           })
          })       
        }
      })
    })
    it('表单必填新增字段', () => {
      const addNewForm = '新增必填文本字段'
      cy.visitPage('info-collection')
      cy.wait(1000)
      findElformButton(formName,'编辑')
      cy.wait(2000)
      addFieldItem()
      getDialog('编辑实验室质量管理信息采集表').within(() => {
        getLabForm().then(getRowlength => {
          fieldInput(getRowlength.length - 1,'新增必填文本字段')
        })
      })
      withinDialog(clickOkInDialog,'编辑实验室质量管理信息采集表')
      cy.wait(1000)
      cy.visitLabPage('home','labgd18030')
      getDialog('质量管理体系基本信息').should('exist').within(() => {
        findLabLabelOption(addNewForm).find('.el-textarea__inner').type('填写数据')
      })
      withinDialog(clickOkInDialog,'质量管理体系基本信息')
    })
    it('修改必填字段信息', () => {
      cy.visitPage('info-collection')
      cy.wait(1000)
      findElformButton(formName,'编辑')
      cy.wait(2000)
      getDialog('编辑实验室质量管理信息采集表').within(() => {
        findTableCell(0,1).click()
        activeSelect('数值')
      })
      closeTips('提示','确定')
      withinDialog(clickOkInDialog,'编辑实验室质量管理信息采集表')
      cy.wait(1000)
      cy.visitLabPage('home','labgd18030')
      getDialog('质量管理体系基本信息').should('exist')
    })
    it('删除测试数据', () => {
      cy.task('executeCqbSql',`SELECT formId from collect_form where formName = "${formName}"`).then(data => {
        const formId = data[0].formId
        cy.task('executeCqbSql',`DELETE from collect_form where formId =${formId}`)
        cy.task('executeCqbSql',`DELETE from collect_form_field where formId =${formId}`)
        cy.task('executeCqbSql',`DELETE from collect_form_field_option where formId =${formId}`)
        cy.task('executeCqbSql',`DELETE from collect_form_lab_rela where formId =${formId}`)
      })
    })
  })
})