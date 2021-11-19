import dayjs from 'dayjs'
import { findTableCell, validTable } from '../common/table'
import { visitIframePage } from '../../shared/route'
import { activeSelect } from '../common/select'
import { confirmDelete, okOnPopConfirm } from '../common/dialog'
import { interceptGet, interceptPost, waitIntercept, waitRequest } from '../common/http'
import { validSuccessMessage } from '../common/message'

describe('EQA公告推送设置', () => {
  const queryNoticeReq = () => {
    return interceptGet('service/noticeRule/search?*', queryNoticeReq.name, '')
  }
  const addRuleReq = () => {
    return interceptPost('service/noticeRule/add', addRuleReq.name, '')
  }
  const editRuleReq = () => {
    return interceptPost('service/noticeRule/edit', editRuleReq.name, '')
  }
  const deleteRuleReq = () => {
    return interceptPost('service/noticeRule/delete?id=*', deleteRuleReq.name, '')
  }
  const saveCustomMsgReq = () => {
    return interceptPost('service/template/message/add', saveCustomMsgReq.name, '')
  }
  const deleteCustomMsgReg = () => {
    return interceptPost('service/template/message/delete?id=*', deleteCustomMsgReg.name, '')
  }
  const disableRuleReq = () => {
    return interceptPost('service/noticeRule/disable?id=*', disableRuleReq.name, '')
  }

  const enableRuleReq = () => {
    return interceptPost('service/noticeRule/enable?id=*', enableRuleReq.name, '')
  }

  const validRuleStatus = (req, rowIndex, buttonText, cb) => {
    waitIntercept(req, () => {
      findTableCell(rowIndex, -1)
        .findByText(buttonText)
        .should('exist')
        .click()
      
      okOnPopConfirm()
    }, () => {
      validSuccessMessage()
      cb && cb()
    })
  }
  
  const BUTTON_ADD_TEXT = '添加推送规则'
  let initQueryResult
  const getText = () => {
    return '自动化测试消息' + dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
  const clickButton = (text) => {
    cy.findByText(text)
      .click({
        force: true
      })
  }
  
  const addCustomMessage = (text, cb) => {
    waitIntercept(saveCustomMsgReq, () => {
      withinDialog(() => {
        clickButton('自定义消息模板')
        
        cy.get('.el-textarea')
          .type(text)
  
        clickButton('保存为模板')
      })
    }, cb)
  }
  const validQuery = () => {
    validTable(initQueryResult)
  }
  const validDeleteMessage = (text) => {
    waitIntercept(deleteCustomMsgReg, () => {
      cy.get('.el-select-dropdown:visible')
        .findByText(text)
        .find('i')
        .click({
          force: true
        })
      
      confirmDelete()
    }, (data) => {
      expect(data).to.equal(null)
    })
  }

  const deleteRule = (id) => {
    cy.request({
      url: `/service/noticeRule/delete?id=${id}`,
      method: 'POST'
    })
  }

  const disableRule = (id) => {
    return cy.request({
      url: `service/noticeRule/disable?id=${id}`,
      method: 'POST'
    })
  }

  const deleteMsg = (id) => {
    cy.request({
      url: `service/template/message/delete?id=${id}`,
      method: 'POST'
    })
  }
  
  const deleteExistRule = () => {
    const rule = initQueryResult.find(item => item.checkTime === 'begin' && item.pushType.includes('client'))
    if (rule) {
      if (rule.enabled) {
        disableRule(rule.id).then(() => {
          deleteRule(rule.id)
        })
      } else {
        deleteRule(rule.id)
      }
    }
  }
  const openAddRuleDialog = () => {
    cy.get('.ql-search')
      .within(() => {
        clickButton(BUTTON_ADD_TEXT)
      })
    
    cy.get('.el-dialog__wrapper:visible')
      .should('exist')
  }
  const withinDialog = (cb) => {
    cy.get('.el-dialog__wrapper:visible')
      .within(cb)
  }
  const addRule = (onSuccess, onError) => {
    const text = getText()
    let msgId
    addCustomMessage(text, data => {
      msgId = data.id
    })
    withinDialog(() => {
      // 选中第一个事件
      cy.get('.el-form-item')
        .eq(0)
        .find('.el-radio')
        .eq(0)
        .click({
          force: true
        })
      // 选中第一个检测时间
      cy.get('.el-form-item')
        .last()
        .find('.el-checkbox:first')
        .click({
          force: true
        })
    })
    // 选择消息内容
    cy.get('.ql-select-message__current .el-input')
      .click({
        force: true
      })

    activeSelect(text)
    let queryReq
    waitRequest({
      intercept: addRuleReq,
      onBefore: () => {
        queryReq = queryNoticeReq()
        withinDialog(() => {
          clickButton('确定')
        })
      },
      onSuccess: () => {
        waitIntercept(queryReq, data => {
          onSuccess && onSuccess(data, msgId, text)
        })
      },
      onError: (error) => {
        onError && onError(error, msgId, text)
      }
    })
  }
  before(() => {
    visitIframePage('eqa-notice')
    waitIntercept(queryNoticeReq, data => {
      initQueryResult = data
    })
  })

  it('001-列表查询', () => {
    validQuery()
  })

  
  context(BUTTON_ADD_TEXT, () => {
    before(() => {
      openAddRuleDialog()
    })
    it('002-表单必填校验', () => {
      withinDialog(() => {
        clickButton('确定')

        cy.findByText('请选择触发事件').should('exist')
        cy.findByText('请选择消息内空').should('exist')
        cy.findByText('请选择推送方式').should('exist')
      })
    })
    context('消息模板', () => {
      it('003-消息为空，不能保存为模板', () => {
        withinDialog(() => {
          clickButton('自定义消息模板')
          
          clickButton('保存为模板')

          cy.get('textarea').should('have.focus')
        })
      })
      it('004-添加自定义消息并删除', () => {
        const text = getText()
        addCustomMessage(text, (data) => {
          expect(data.content).to.equal(text)
          cy.get('.ql-select-message__current')
            .should('be.visible')
            .within(() => {
              cy.get('.el-input').click({
                force: true
              })
            }).then(() => {
              validDeleteMessage(text)
            })
        })
      })
      it('005-可切回已有消息模板', () => {
        withinDialog(() => {
          clickButton('自定义消息模板')
          
          clickButton('选择已有消息模板')

          cy.get('.ql-select-message__current').should('be.visible')
        })
      })
    })

    context('创建一条规则', () => {
      let text, msgId, queryResult
      before(() => {
        deleteExistRule()
        addRule((data, id, msg) => {
          queryResult = data
          msgId = id
          text = msg
        })
      })

      after(() => {
        if (msgId) {
          deleteMsg(msgId)
        }
      })

      it('006-添加成功关闭弹窗并提示创建成功', () => {
        cy.get('.el-dialog__wrapper:visible').should('not.exist')
        validSuccessMessage()
      })

      it('007-表格是否刷新', () => {
        const rule = queryResult.find(item => item.msgContent === text)
       
        expect(rule.msgContent).to.equal(text)
        findTableCell(-1, 1).should('have.text', text)
      })

      it('008-编辑规则', () => {
        const rowIndex = queryResult.findIndex(item => item.msgContent === text)
        cy.log('rowIndex %s', rowIndex)
        expect(rowIndex).to.be.gt(-1)
        findTableCell(rowIndex, -1)
          .findByText('编辑')
          .click({
            force: true
          })
        // 推送方式选中微信
        withinDialog(() => {
          cy.get('.el-form-item')
            .last()
            .find('.el-checkbox:last')
            .click({
              force: true
            })
        })
        let queryReq
        waitIntercept(editRuleReq, () => {
          withinDialog(() => {
            clickButton('确定')
            queryReq = queryNoticeReq()
          })
        }, () => {
          waitIntercept(queryReq, (tableData) => {
            expect(tableData[rowIndex].pushType).to.deep.equal(['client', 'wechat'])
            findTableCell(rowIndex, -2).find('.el-tag').should('have.length', 2)
          })
        })
      })

      it('009-停用和启用', () => {
        const rowIndex = queryResult.findIndex(item => item.msgContent === text)
        
        validRuleStatus(disableRuleReq, rowIndex, '停用', () => {
          validRuleStatus(enableRuleReq, rowIndex, '启用')
        })
      })

      it('010-重复添加规则', () => {
        openAddRuleDialog()
        addRule(null, (error, msgId, text) => {
          expect(error).to.equal('当前质控主管单位已存在相同触发事件和检测时间的规则')
          withinDialog(() => {
            clickButton('取消')
          })
          deleteMsg(msgId)
        })
      })

      it('011-启用的规则不能删除', () => {
        const rowIndex = queryResult.findIndex(item => item.msgContent === text)
        
        waitRequest({
          intercept: deleteRuleReq,
          onBefore: () => {
            findTableCell(rowIndex, -1).within(() => {
              clickButton('删除')
            })
            okOnPopConfirm()
          },
          onError: (error) => {
            expect(error).to.equal('启用的规则，不能删除')
          }
        })
      })

      it('012-删除创建的规则', () => {
        const rowIndex = queryResult.findIndex(item => item.msgContent === text)
        const id = queryResult[rowIndex].id
        let queryReq
        disableRule(id).then(() => {
          waitIntercept(deleteRuleReq, () => {
            queryReq = queryNoticeReq()
            findTableCell(rowIndex, -1).within(() => {
              clickButton('删除')
            })
            okOnPopConfirm()
          }, () => {
            waitIntercept(queryReq, (data) => {
              const exist = data.some(item => item.msgContent === text)
              expect(exist).to.be.false
            })
          })
        })
      })

    })
    
  })

})