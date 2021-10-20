import dayjs from 'dayjs'
import { activeSelect } from '../common/select'
import { clickCancelInDialog, clickOkInDialog, confirmDelete, withinDialog } from '../common/dialog'
import { validErrorMsg } from '../common/message'
import { findTableCell, validTable } from '../common/table'
import { elFormInput, findFormItemContent, validFormItemError } from '../common/form'
import { interceptDelete, interceptGet, interceptPost, waitIntercept } from '../common/http'
import { validQcDept } from '../api/ccl'

/**
 * 实验室信息采集表配置
 */
context('实验室信息采集表配置', () => {
  const getFormName = () => {
    return `自动化${dayjs().format('MM-DD HH:mm:ss')}`
  }
  const queryFormReq = () => {
    return interceptGet('service/mgr/collect/form?cclCode=*', queryFormReq.name)
  }
  const getFormReq = (id) => {
    return function () {
      return interceptGet(`service/mgr/collect/form/${id}`, getFormReq.name)
    }
  }
  const addFormReq = () => {
    return interceptPost('service/mgr/collect/form', addFormReq.name)
  }
  const deleteFormReq = (id) => {
    return function () {
      return interceptDelete(`service/mgr/collect/form/${id}`, deleteFormReq.name)
    }
  }
  const FIELD_DICT_SINGLE = {
    name: '性别',
    type: '下拉框',
    dict: true,
    multiple: false,
    options: ['男', '女'],
    default: false,
    required: true,
    enabled: true
  }
  const fields = [
    {
      name: '名字',
      type: '文本',
      default: true,
      required: true,
      enabled: true
    },
    {
      type: '数值',
      name: '年龄',
      default: false,
      required: false,
      enabled: true
    },
    FIELD_DICT_SINGLE,
    {
      name: '爱好',
      type: '下拉框',
      dict: true,
      multiple: true,
      options: ['体育', '电影'],
      default: false,
      required: false,
      enabled: true
    },
    {
      name: '是/否单身',
      type: '是/否互斥',
      default: false,
      required: true,
      enabled: true
    }
  ]
  
  const openFormDialog = () => {
    cy.findByText('添加表单').click()
  }
  const fieldInput = (rowIndex, text) => {
    findTableCell(rowIndex, 0)
      .find('input')
      .type(text)
  }
  const addFieldItem = () => {
    findTableCell(-1, -1)
      .findByText('添加')
      .click()
  }
  const fieldSelect = (rowIndex, columIndex, text) => {
    findTableCell(rowIndex, columIndex)
      .find('.el-select')
      .within(($el) => {
        if ($el.find('input').val() !== text) {
          cy.get('input').first().click()
          activeSelect(text)
        }
      })
  }
  const addDictItem = (text) => {
    cy.get('.dict-card--add')
      .click()

    withinDialog(() => {
      clickOkInDialog()
      validFormItemError('请输入字典项名称')

      elFormInput('name', text)
      clickOkInDialog()
    }, '请输入字典名称')
  }
  const withinAddForm = (cb) => {
    withinDialog(cb, '添加实验室质量管理信息采集表')
  }
  /**
   * 打开编辑字典项
   * @param {number} rowIndex 
   * @param {FIELD_DICT_SINGLE} fieldItem 
   */
  const openDictItems = (rowIndex, cb) => {
    findTableCell(rowIndex, 1)
      .find('button')
      .contains('编辑字典项')
      .click()

    withinDialog(($el) => {
      // if (fieldItem.multiple) {
      //   cy.get('.el-select')
      //     .click()

      //   activeSelect('多选')
      // }
      // cy.get('.dict-card--add')
      //   .click()
      // console.log($el[0])
      cb && cb()
    }, '编辑字典项')
  }
  let queryForm
  before(() => {
    validQcDept(() => {
      queryForm = queryFormReq()
      cy.visitPage('info-collection')
    }, data => {

    })
  })
  it('001-是否自动查询', () => {
    waitIntercept(queryForm, (data) => {
      validTable(data, '.info-collection')
    })
  })
  context('打开添加采集表弹框', () => {
    let formName
    before(() => {
      formName = getFormName()
      openFormDialog()
    })
    it('002-表单必填校验', () => {
      withinAddForm(() => {
        clickOkInDialog()
        findFormItemContent('formName')
          .find('input')
          .invoke('attr', 'maxlength')
          .then(val => {
            expect(val).to.equal('20')
          })

        validFormItemError('请输入表单名称')
      })
    })
    context('编辑字段', () => {
      it('003-编辑字段校验', () => {
        withinAddForm(() => {
          elFormInput('formName', formName)
          clickOkInDialog()
        })
        
        validErrorMsg('字段名称不能为空')
      })
      it('004-字段项的添加和删除', () => {
        withinAddForm(() => {
          addFieldItem()

          cy.get('.el-table__body-wrapper tbody tr').should('have.length', 2)

          findTableCell(0, -1)
            .find('button')
            .contains('删除')

          findTableCell(1, -1)
            .find('button')
            .should('contain.text', '添加')
            .and('contain.text', '删除')
            .eq(0)
            .click()

          confirmDelete()

          cy.get('.el-table__body-wrapper tbody tr').should('have.length', 1)
          findTableCell(0, -1)
            .find('button')
            .should('not.contain.text', '删除')
        })
      })
      it('005-字典项验证', () => {
        withinAddForm(($el) => {
          fieldSelect(0, 1, FIELD_DICT_SINGLE.type)
          openDictItems(0, () => {
            clickOkInDialog()
            cy.get('.el-form-item__error').should('contain.text', '请设置字典项')
            clickCancelInDialog()
          })
        })
      })
      
    })

    context('表单增删改', ()=> {
      let addResult, editResult, rowIndex, addRow
      before(() => {
        withinAddForm(() => {
          elFormInput('formName', formName)
          // 添加字段
          fields.forEach((item, rowIndex) => {
            fieldInput(rowIndex, item.name)
            fieldSelect(rowIndex, 1, item.type)
              
            if (item.dict) {
              openDictItems(rowIndex, () => {
                if (item.multiple) {
                  cy.get('.el-select')
                    .click()

                  activeSelect('多选')
                }
                item.options.forEach(text => {
                  addDictItem(text)
                })
                clickOkInDialog()
              })
            }
            if (!item.required) {
              fieldSelect(rowIndex, 2, '否')
            }
            if (!item.enabled) {
              fieldSelect(rowIndex, 3, '否')
            }
            if (rowIndex < fields.length - 1) {
              addFieldItem()
            }
          })
          let queryReq
          waitIntercept(addFormReq, () => {
            queryReq = queryFormReq()
            clickOkInDialog()
          }, (data) => {
            addResult = data
            waitIntercept(queryReq, tableData => {
              rowIndex = tableData.findIndex(item => item.formName === formName)
              addRow = tableData[tableData.length - 1]
            })
            cy.root().parent().should('not.be.visible')
          })
        })
      })
      // after(() => {
      //   if (rowIndex > -1) {
      //     findTableCell(rowIndex, 4).findByText('删除').click()
      //     confirmDelete()
      //   }
      // })
      
      it('006-添加表单后自动刷新列表', () => {
        expect(addResult.formName).to.equal(formName)
        expect(addRow.formName).to.equal(formName)
      })
      it('007-推送状态', () => {
        findTableCell(rowIndex, 3).should('contain.text', '未推送')
      })
      it('008-未关联不可推送', () => {
        findTableCell(rowIndex, 4).findByText('推送').click()
        validErrorMsg('该表单未关联实验室，不能进行推送')
      })
      context('编辑表单,添加关联实验室并推送', () => {
        let currFormData
        before(() => {
          waitIntercept(getFormReq(addRow.formId), () => {
            findTableCell(rowIndex, -1).findByText('编辑').click()
          }, data => {
            currFormData = data
          })
        })
        after(() => {
          withinDialog(() => {
            cy.root().parent().invoke('attr', 'display').then(val => {
              if (val !== 'none') {
                clickCancelInDialog()
              }
            })
          }, '编辑实验室质量管理信息采集表')
        })
        it('009-表单回显', () => {
          withinDialog(() => {
            findFormItemContent('formName').find('input').should('have.value', currFormData.formName)
            currFormData.fieldList.forEach((item, index) => {
              findTableCell(index, 0).find('input').should('have.value', item.fieldName)
            })
          })
        })
        it('010-排序字段', () => {

        })
        it('011-关联实验室', () => {

        })
        it('012-保存变更', () => {

        })
        it('013-推送表单', () => {

        })
        context('登录实验室查看表单', () => {
        })
      })
      context('删除表单', () => {
        it('035-删除表单', () => {
          waitIntercept(deleteFormReq(addRow.formId), () => {
            findTableCell(rowIndex, 4).findByText('删除').click()
            confirmDelete()
          }, data => {
            
          })
        })
      })
      
    })
    
  })
})