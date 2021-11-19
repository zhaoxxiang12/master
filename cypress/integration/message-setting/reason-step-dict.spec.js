import {
  clickCancelInDialog,
  clickOkInDialog,
  confirmDelete,
  withinDialog
} from '../common/dialog'
import {
  validFormItemError
} from '../common/form'
import {
  interceptAll,
  waitIntercept,
  waitRequest
} from '../common/http'
import {
  validErrorMsg,
  validSuccessMessage
} from '../common/message'
import {
  elform
} from '../mutual-result/mutual-item'

/**
 * 告警原因和措施
 */
const fillReason = (reason, elform = true) => {
  if (elform === false) {
    cy.get('.reason-dict-table:visible').last().within(() => {
      if (reason) {
        cy.get('.el-input__inner').first().clear().type(reason)
      }
    })
  } else {
    cy.get('.reason-dict-table:visible').first().within(() => {
      if (reason) {
        cy.get('.el-input__inner').first().clear().type(reason)
      }
    })
  }
}

const createDictReason = (value) => {
  getLength().eq(1).find('.el-icon-plus').click({
    force: true
  })
  cy.wait(1000)
  if (value) {
    elform('value').clear().type(value)
  }
}

const deleteDictReason = (text, edit = true) => {
  if (edit === true) {
    getLength().eq(1).contains(text).parents('.el-card.dict-card').find('.el-icon-edit').click({
      force: true
    })
  } else {
    getLength().eq(1).contains(text).parents('.el-card.dict-card').find('.el-icon-delete').click({
      force: true
    })
  }
}


const findDictButton = (text, edit = true) => {
  if (edit === true) {
    return getLength().contains(text).parents('.el-card.dict-card').find('.el-icon-edit').click({
      force: true
    })
  } else {
    return getLength().contains(text).parents('.el-card.dict-card').find('.el-icon-delete').click({
      force: true
    })
  }
}

const createType = (value) => {
  clickCreateType()
  if (value) {
    elform('value').clear().type(value)
  }
}

const interceptCreateReasonDict = () => {
  return interceptAll('service/mgr/messageDict/category', interceptCreateReasonDict.name)
}

const interceptDeleteReasonDict = () => {
  return interceptAll('service/mgr/messageDict/category/*', interceptDeleteReasonDict.name)
}

const selectType = (text) => {
  cy.get('.el-tabs__nav-scroll:visible').contains(text).click({
    force: true
  })
}

const choseSpec = (text) => {
  cy.get('.el-tabs__nav.is-top:visible').last().contains(text).click({
    force: true
  })
}

const assertMessage = (text) => {
  cy.get('.el-message--error')
    .find('.el-message__content')
    .should('contain', text)
}

const interceptDeleteReason = () => {
  return interceptAll('service/mgr/messageDict/*', interceptDeleteReason.name)
}

const interceptCreateReason = () => {
  return interceptAll('service/mgr/messageDict', interceptCreateReason.name)
}

const clickCreateType = () => {
  cy.get('.el-tab-pane:visible').last().find('button').contains('增加类别').click({
    force: true
  })
}

const getLength = () => {
  return cy.get('.dict-panel:visible').first().find('.dict-panel-item')
}

const getDictLength = () => {
  return getLength().eq(1).find('.el-card.dict-card')
}

const clickButton = (elform = true) => {
  if (elform === false) {
    cy.get('.reason-dict-table:visible').last().within(() => {
      cy.get('button').contains('增加').click({
        force: true
      })
    })
  } else {
    cy.get('.reason-dict-table:visible').first().within(() => {
      cy.get('button').contains('增加').click({
        force: true
      })
    })
  }
}

const findReasonButton = (reason, buttonText, elform = true) => {
  if (elform === false) {
    cy.get('.reason-dict-table:visible').last().find('.el-table__body')
      .contains(reason)
      .parents('.el-table__row')
      .findByText(buttonText)
      .click({
        force: true
      })
  } else {
    cy.get('.reason-dict-table:visible').first().find('.el-table__body')
      .contains(reason)
      .parents('.el-table__row')
      .findByText(buttonText)
      .click({
        force: true
      })
  }
}

const clickSaveButton = (elform = true) => {
  if (elform === false) {
    cy.get('.reason-dict-table:visible').last().find('.el-table__body').findByText('保存')
      .click({
        force: true
      })
  } else {
    cy.get('.reason-dict-table:visible').first().find('.el-table__body').findByText('保存')
      .click({
        force: true
      })
  }
}

context('信息互通设置-告警原因和措施', () => {
  before(() => {
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/setting/message-setting/reason-step-dict')
    cy.wait(3000)
  })
  context('未上报', () => {
    const newReason = '测试未上报'
    const editReason = '修改未上报原因'
    context('未上报原因', () => {
      it('001-原因未填写', () => {
        fillReason()
        clickButton()
        validErrorMsg('请填写名称！')
        cy.wait(5000)
      })
      it('002-新增相同的原因不能保存', () => {
        fillReason('仪器故障')
        waitRequest({
          intercept: interceptCreateReason,
          onBefore: () => {
            clickButton()
          },
          onError: (data) => {
            assertMessage(data)
          }
        })
      })
      it('003-新增未上报原因', () => {
        fillReason(newReason)
        waitIntercept(interceptCreateReason, () => {
          clickButton()
        }, () => {
          validSuccessMessage()
        })
      })
      it('004-修改原因', () => {
        findReasonButton(newReason, '编辑')
        fillReason('修改未上报原因')
        waitIntercept(interceptCreateReason, () => {
          clickSaveButton()
        }, () => {
          validSuccessMessage()
        })
      })
      it('005-删除原因', () => {
        findReasonButton(editReason, '删除')
        waitIntercept(interceptDeleteReason, () => {
          confirmDelete()
        }, () => {
          validSuccessMessage()
        })
      })
    })
    context('处理措施', () => {
      const newMeasure = '新增措施'
      const editMeasure = '修改处理措施'
      it('006-处理措施未填写', () => {
        fillReason(null, false)
        clickButton(false)
        assertMessage('请填写名称！')
      })
      it('007-新增相同的处理措施', () => {
        fillReason('已手工上报', false)
        waitRequest({
          intercept: interceptCreateReason,
          onBefore: () => {
            clickButton(false)
          },
          onError: (data) => {
            assertMessage(data)
          }
        })
      })
      it('008-新增未上报处理措施', () => {
        fillReason(newMeasure, false)
        waitIntercept(interceptCreateReason, () => {
          clickButton(false)
        }, () => {
          validSuccessMessage()
        })
      })
      it('009-修改处理措施', () => {
        findReasonButton(newMeasure, '编辑', false)
        fillReason(editMeasure, false)
        waitIntercept(interceptCreateReason, () => {
          clickSaveButton(false)
        }, () => {
          validSuccessMessage()
        })
      })
      it('010-删除措施', () => {
        findReasonButton(editMeasure, '删除', false)
        waitIntercept(interceptDeleteReason, () => {
          confirmDelete()
        }, () => {
          validSuccessMessage()
        })
      })
    })
  })
  context('失控', () => {
    before(() => {
      selectType('失控')
      cy.wait(1000)
    })
    context('失控原因', () => {
      context('失控类别', () => {
        const newSpecName = '自动化新增'
        const editSpecName = '自动化修改'
        it('011-失控类别未填写', () => {
          createType()
          withinDialog(clickOkInDialog, '添加分类')
          validFormItemError('请输入名称')
          withinDialog(clickCancelInDialog, '添加分类')
        })
        it('012-类别名称重复', () => {
          createType('仪器')
          validFormItemError('名称已存在，请重新输入')
          withinDialog(clickOkInDialog, '添加分类')
          withinDialog(clickCancelInDialog, '添加分类')
        })
        it('013-新增失控类别', () => {
          getLength().then((getData) => {
            createType(newSpecName)
            waitIntercept(interceptCreateReasonDict, () => {
              withinDialog(clickOkInDialog, '添加分类')
            }, () => {
              validSuccessMessage()
              getLength().should('have.length', getData.length + 1)
            })
          })
        })
        it('014-修改失控类别名称', () => {
          findDictButton(newSpecName)
          elform('value').clear().type(editSpecName)
          waitIntercept(interceptCreateReasonDict, () => {
            withinDialog(clickOkInDialog, '编辑分类')
          }, () => {
            validSuccessMessage()
          })
        })
        it('015-删除分类', () => {
          getLength().then(getData => {
            findDictButton(editSpecName, false)
            waitIntercept(interceptDeleteReasonDict, () => {
              confirmDelete()
            }, () => {
              getLength().should('have.length', getData.length - 1)
            })
          })
        })
      })
      context('失控类别', () => {
        const newDictReason = '自动化新增'
        const editDictReason = '自动化修改'
        it('016-失控原因未填写', () => {
          getLength().eq(1).find('.el-icon-plus').click({
            force: true
          })
          createDictReason()
          withinDialog(clickOkInDialog, '添加选项')
          validFormItemError('请输入名称')
          withinDialog(clickCancelInDialog, '添加选项')
        })
        it('017-新增相同的失控原因', () => {
          createDictReason('仪器原因')
          withinDialog(clickOkInDialog, '添加选项')
          validFormItemError('名称已存在，请重新输入')
          withinDialog(clickCancelInDialog, '添加选项')
        })
        it('018-新增失控原因', () => {
          getDictLength().then(getData => {
            createDictReason(newDictReason)
            waitIntercept(interceptCreateReason, () => {
              withinDialog(clickOkInDialog, '添加选项')
            }, () => {
              validSuccessMessage()
              getDictLength().should('have.length', getData.length + 1)
            })
          })
        })
        it('019-修改失控原因', () => {
          findDictButton(newDictReason)
          elform('value').clear().type(editDictReason)
          waitIntercept(interceptCreateReason, () => {
            withinDialog(clickOkInDialog, '编辑选项')
          }, () => {
            validSuccessMessage()
          })
        })
        it('020-删除失控原因', () => {
          getDictLength().then(getData => {
            findDictButton(editDictReason, false)
            waitIntercept(interceptDeleteReason, () => {
              confirmDelete()
            }, () => {
              validSuccessMessage()
              getDictLength().should('have.length', getData.length - 1)
            })
          })
        })
      })
    })
    context('处理措施', () => {
      before(() => {
        choseSpec('处理措施')
      })
      context('处理措施类别', () => {
        const newSpecName = '新增措施'
        const editSpecName = '修改处理措施'
        it('021-失控类别未填写', () => {
          createType()
          withinDialog(clickOkInDialog, '添加分类')
          validFormItemError('请输入名称')
          withinDialog(clickCancelInDialog, '添加分类')
        })
        it('022-类别名称重复', () => {
          createType('仪器')
          validFormItemError('名称已存在，请重新输入')
          withinDialog(clickOkInDialog, '添加分类')
          withinDialog(clickCancelInDialog, '添加分类')
        })
        it('023-新增失控类别', () => {
          getLength().then((getData) => {
            createType(newSpecName)
            waitIntercept(interceptCreateReasonDict, () => {
              withinDialog(clickOkInDialog, '添加分类')
            }, () => {
              validSuccessMessage()
              getLength().should('have.length', getData.length + 1)
            })
          })
        })
        it('024-修改失控类别名称', () => {
          findDictButton(newSpecName)
          elform('value').clear().type(editSpecName)
          waitIntercept(interceptCreateReasonDict, () => {
            withinDialog(clickOkInDialog, '编辑分类')
          }, () => {
            validSuccessMessage()
          })
        })
        it('025-删除分类', () => {
          getLength().then(getData => {
            findDictButton(editSpecName, false)
            waitIntercept(interceptDeleteReasonDict, () => {
              confirmDelete()
            }, () => {
              getLength().should('have.length', getData.length - 1)
            })
          })
        })
      })
      context('处理措施', () => {
        const newDictReason = '自动化新增'
        const editSpecName = '自动化修改'
        it('026-处理措施未填写', () => {
          getLength().eq(1).find('.el-icon-plus').click({
            force: true
          })
          createDictReason()
          withinDialog(clickOkInDialog, '添加选项')
          validFormItemError('请输入名称')
          withinDialog(clickCancelInDialog, '添加选项')
        })
        it('027-新增相同的处理措施', () => {
          createDictReason('更换仪器')
          withinDialog(clickOkInDialog, '添加选项')
          validFormItemError('名称已存在，请重新输入')
          withinDialog(clickCancelInDialog, '添加选项')
        })
        it('028-新增处理措施', () => {
          getDictLength().then(getData => {
            createDictReason(newDictReason)
            waitIntercept(interceptCreateReason, () => {
              withinDialog(clickOkInDialog, '添加选项')
            }, () => {
              validSuccessMessage()
              getDictLength().should('have.length', getData.length + 1)
            })
          })
        })
        it('029-修改处理措施', () => {
          findDictButton(newDictReason)
          elform('value').clear().type(editSpecName)
          waitIntercept(interceptCreateReason, () => {
            withinDialog(clickOkInDialog, '编辑选项')
          }, () => {
            validSuccessMessage()
          })
        })
        it('030-删除处理措施', () => {
          getDictLength().then(getData => {
            findDictButton(editSpecName, false)
            waitIntercept(interceptDeleteReason, () => {
              confirmDelete()
            }, () => {
              validSuccessMessage()
              getDictLength().should('have.length', getData.length - 1)
            })
          })
        })
      })
    })
    context('预防措施', () => {
      before(() => {
        choseSpec('预防措施')
      })
      context('预防措施类别', () => {
        const newSpecName = '新增措施'
        const editSpecName = '修改处理措施'
        it('031-失控类别未填写', () => {
          createType()
          withinDialog(clickOkInDialog, '添加分类')
          validFormItemError('请输入名称')
          withinDialog(clickCancelInDialog, '添加分类')
        })
        it('032-类别名称重复', () => {
          createType('仪器')
          validFormItemError('名称已存在，请重新输入')
          withinDialog(clickOkInDialog, '添加分类')
          withinDialog(clickCancelInDialog, '添加分类')
        })
        it('033-新增预防类别', () => {
          getLength().then((getData) => {
            createType(newSpecName)
            waitIntercept(interceptCreateReasonDict, () => {
              withinDialog(clickOkInDialog, '添加分类')
            }, () => {
              validSuccessMessage()
              getLength().should('have.length', getData.length + 1)
            })
          })
        })
        it('034-修改预防类别名称', () => {
          findDictButton(newSpecName)
          elform('value').clear().type(editSpecName)
          waitIntercept(interceptCreateReasonDict, () => {
            withinDialog(clickOkInDialog, '编辑分类')
          }, () => {
            validSuccessMessage()
          })
        })
        it('035-删除分类', () => {
          getLength().then(getData => {
            findDictButton(editSpecName, false)
            waitIntercept(interceptDeleteReasonDict, () => {
              confirmDelete()
            }, () => {
              getLength().should('have.length', getData.length - 1)
            })
          })
        })
      })
      context('预防措施', () => {
        const newDictReason = '自动化新增'
        const editSpecName = '自动化修改'
        it('036-预防措施未填写', () => {
          getLength().eq(1).find('.el-icon-plus').click({
            force: true
          })
          createDictReason()
          withinDialog(clickOkInDialog, '添加选项')
          validFormItemError('请输入名称')
          withinDialog(clickCancelInDialog, '添加选项')
        })
        it('037-新增相同的预防措施', () => {
          createDictReason('维护保养后，正确度验证')
          withinDialog(clickOkInDialog, '添加选项')
          validFormItemError('名称已存在，请重新输入')
          withinDialog(clickCancelInDialog, '添加选项')
        })
        it('038-新增预防措施', () => {
          getDictLength().then(getData => {
            createDictReason(newDictReason)
            waitIntercept(interceptCreateReason, () => {
              withinDialog(clickOkInDialog, '添加选项')
            }, () => {
              validSuccessMessage()
              getDictLength().should('have.length', getData.length + 1)
            })
          })
        })
        it('039-修改预防措施', () => {
          findDictButton(newDictReason)
          elform('value').clear().type(editSpecName)
          waitIntercept(interceptCreateReason, () => {
            withinDialog(clickOkInDialog, '编辑选项')
          }, () => {
            validSuccessMessage()
          })
        })
        it('040-删除预防措施', () => {
          getDictLength().then(getData => {
            findDictButton(editSpecName, false)
            waitIntercept(interceptDeleteReason, () => {
              confirmDelete()
            }, () => {
              validSuccessMessage()
              getDictLength().should('have.length', getData.length - 1)
            })
          })
        })
      })
    })
  })
  context('CV/符合率异常', () => {
    before(() => {
      selectType('CV/符合率异常')
    })
    context('CV/符合率异常原因', () => {
      const newReason = '自动化新增'
      const editReason = '自动化修改'
      it('041-原因未填写', () => {
        fillReason()
        clickButton()
        validErrorMsg('请填写名称！')
        cy.wait(5000)
      })
      it('042-新增相同的原因不能保存', () => {
        fillReason('试剂原因')
        waitRequest({
          intercept: interceptCreateReason,
          onBefore: () => {
            clickButton()
          },
          onError: (data) => {
            assertMessage(data)
          }
        })
      })
      it('043-新增未上报原因', () => {
        fillReason(newReason)
        waitIntercept(interceptCreateReason, () => {
          clickButton()
        }, () => {
          validSuccessMessage()
        })
      })
      it('044-修改原因', () => {
        findReasonButton(newReason, '编辑')
        fillReason(editReason)
        waitIntercept(interceptCreateReason, () => {
          clickSaveButton()
        }, () => {
          validSuccessMessage()
        })
      })
      it('045-删除原因', () => {
        findReasonButton(editReason, '删除')
        waitIntercept(interceptDeleteReason, () => {
          confirmDelete()
        }, () => {
          validSuccessMessage()
        })
      })
    })
    context('处理措施', () => {
      const newMeasure = '新增措施'
      const editMeasure = '修改处理措施'
      it('046-处理措施未填写', () => {
        fillReason(null, false)
        clickButton(false)
        assertMessage('请填写名称！')
      })
      it('047-新增相同的处理措施', () => {
        fillReason('试剂原因排查', false)
        waitRequest({
          intercept: interceptCreateReason,
          onBefore: () => {
            clickButton(false)
          },
          onError: (data) => {
            assertMessage(data)
          }
        })
      })
      it('048-新增未上报处理措施', () => {
        fillReason(newMeasure, false)
        waitIntercept(interceptCreateReason, () => {
          clickButton(false)
        }, () => {
          validSuccessMessage()
        })
      })
      it('049-修改处理措施', () => {
        findReasonButton(newMeasure, '编辑', false)
        fillReason(editMeasure, false)
        waitIntercept(interceptCreateReason, () => {
          clickSaveButton(false)
        }, () => {
          validSuccessMessage()
        })
      })
      it('050-删除措施', () => {
        findReasonButton(editMeasure, '删除', false)
        waitIntercept(interceptDeleteReason, () => {
          confirmDelete()
        }, () => {
          validSuccessMessage()
        })
      })
    })
  })
})