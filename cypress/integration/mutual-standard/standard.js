import {
  interceptAll
} from '../common/http'
import {
  activeSelect
} from '../common/select'

const precisionStandard = {
  cvThreshold: {
    value: 1
  },
  contiMonth: {
    value: 2
  },
  cyType: {
    value: 3
  }
}

const evaluationStandard = {
  partEqaPassTimes: {
    value: 1,
    count: 6
  },
  provinceEqaPassTimes: {
    value: 2,
    count: 6
  },
  cityEqaPassTimes: {
    value: 3,
    count: 6
  }
}

const qualityStandard = {
  workDayRepRate: {
    value: 1,
    rate: 99,
    qualified: 6
  },
  messageReadRate: {
    value: 2,
    rate: 99,
    qualified: 6
  },
  itemCorrectRate: {
    value: 3,
    rate: 99,
    qualified: 6
  }
}

export const selectSpec = (specName) => {
  cy.get('.el-button.spec-filter__item.el-button--small').contains(specName).click({
    force: true
  })
}

export const checkBox = (prop) => {
  return cy.get('.el-form:visible').last().find(`[for="${prop}"]`).find('[type="checkbox"]')
}
export const fillStandard = (fillPrecision, fillEvaluation, fillQuality, setMany = false) => {
  for (const key in fillPrecision) {
    const precision = precisionStandard[key]
    if (precision.value === 1) {
      if (setMany === true) {
        fillElform('互认规则批量设置', 'cvThreshold').clear().type(fillPrecision[key])
      } else {
        fillElform('互认规则设置', 'cvThreshold').clear().type(fillPrecision[key])
      }
    } else if (precision.value === 2) {
      if (setMany === true) {
        fillElform('互认规则批量设置', 'contiMonth').click({
          force: true
        })
      } else {
        fillElform('互认规则设置', 'contiMonth').click({
          force: true
        })
      }
      activeSelect(fillPrecision[key])
    } else {
      if (setMany === true) {
        fillElform('互认规则批量设置', 'cvType').click({
          force: true
        })
      } else {
        fillElform('互认规则设置', 'cvType').click({
          force: true
        })
      }
      activeSelect(fillPrecision[key])
    }
  }
  for (const key in fillEvaluation) {
    const evaluation = evaluationStandard[key]
    if (evaluation.value === 1) {
      checkBox('partEqaPassTimes').check({
        force: true
      })
      if (fillEvaluation[key] === true) {
        if (setMany === true) {
          fillElform('互认规则批量设置', 'partEqaPassTimes').click({
            force: true
          })
        } else {
          fillElform('互认规则设置', 'partEqaPassTimes').click({
            force: true
          })
        }
        activeSelect(evaluation.count)
      }
    } else if (evaluation.value === 2) {
      checkBox('provinceEqaPassTimes').check({
        force: true
      })
      if (fillEvaluation[key] === true) {
        if (setMany === true) {
          fillElform('互认规则批量设置', 'provinceEqaPassTimes').click({
            force: true
          })
        } else {
          fillElform('互认规则设置', 'provinceEqaPassTimes').click({
            force: true
          })
        }
        activeSelect(evaluation.count)
      }
    } else {
      checkBox('cityEqaPassTimes').check({
        force: true
      })
      if (fillEvaluation[key] === true) {
        if (setMany === true) {
          fillElform('互认规则批量设置', 'cityEqaPassTimes').clear().click({
            force: true
          })
        } else {
          fillElform('互认规则设置', 'cityEqaPassTimes').click({
            force: true
          })
        }
        activeSelect(evaluation.count)
      }
    }
  }
  for (const key in fillQuality) {
    const quality = qualityStandard[key]
    if (quality.value === 1) {
      if (setMany === true) {
        fillElform('互认规则批量设置', 'workDayRepRate').type(quality.rate)
      } else {
        fillElform('互认规则设置', 'workDayRepRate').type(quality.rate)
      }
      if (fillQuality[key] === true) {
        if (setMany === true) {
          fillElform('互认规则批量设置', 'workDayPassTimes').click({
            force: true
          })
        } else {
          fillElform('互认规则设置', 'workDayPassTimes').click({
            force: true
          })
        }
        activeSelect(quality.qualified)
      }
    } else if (quality.value === 2) {
      if (setMany === true) {
        fillElform('互认规则批量设置', 'messageReadRate').type(quality.rate)
      } else {
        fillElform('互认规则设置', 'messageReadRate').type(quality.rate)
      }
      if (fillQuality[key] === true) {
        if (setMany === true) {
          fillElform('互认规则批量设置', 'messageReadPassTimes').click({
            force: true
          })
        } else {
          fillElform('互认规则设置', 'messageReadPassTimes').click({
            force: true
          })
        }
        activeSelect(quality.qualified)
      }
    } else {
      if (setMany === true) {
        fillElform('互认规则批量设置', 'itemCorrectRate').type(quality.rate)
      } else {
        fillElform('互认规则设置', 'itemCorrectRate').type(quality.rate)
      }
      if (fillQuality[key] === true) {
        if (setMany === true) {
          fillElform('互认规则批量设置', 'itemCorrectPassTimes').click({
            force: true
          })
        } else {
          fillElform('互认规则设置', 'itemCorrectPassTimes').click({
            force: true
          })
        }
        activeSelect(quality.qualified)
      }
    }
  }
}

export const createStandard = (stdName) => {
  if (stdName) {
    fillElform('添加互认标准', 'stdName').clear().type(stdName)
  }
  selectSpec('常规化学')

  cy.get('.el-table__body').first().contains('钾').parents('.el-table__row').findByText('规则设置').click({
    force: true
  })
  cy.wait(2000)
}

export const clickCreate = () => {
  cy.get('.el-card__body').find('.el-icon-plus').click({
    force: true
  })
  cy.wait(5000)
}

export const fillElform = (title, prop) => {
  return cy.get(`[aria-label="${title}"]`)
    .find(`[for="${prop}"]:visible`)
    .next('.el-form-item__content')
    .find('.el-input__inner')
}

export const getElform = (title) => {
  return cy.get(`[aria-label="${title}"]`)
}

export const saveElform = (title, text) => {
  if (title === '添加互认标准') {
    if (text === '取消') {
      cy.get(`[aria-label="${title}"]`)
        .find('.el-dialog__footer:visible')
        .first()
        .findByText(text)
        .click({
          force: true
        })
    } else {
      cy.get(`[aria-label="${title}"]`)
        .find('.el-dialog__footer:visible')
        .first()
        .find('.el-button.el-button--primary.el-button--medium')
        .findByText(text)
        .click({
          force: true
        })
    }
  } else {
    if (text === '保存') {
      cy.get(`[aria-label="${title}"]`)
        .find('.el-dialog__footer:visible')
        .first()
        .find('.el-button.el-button--primary.el-button--medium')
        .last()
        .click({
          force: true
        })
    } else if (text === '取消') {
      cy.get(`[aria-label="${title}"]`)
        .find('.el-dialog__footer:visible')
        .first()
        .find('.el-button.el-button--default.el-button--medium:visible')
        .click({
          force: true
        })
    } else {
      cy.get(`[aria-label="${title}"]`)
        .find('.el-dialog__footer:visible')
        .first()
        .find('.el-button.el-button--primary.el-button--medium')
        .first()
        .click({
          force: true
        })
    }
  }
}

export const interceptCreateStandard = () => {
  return interceptAll('service/mgr/std/yearrecog', interceptCreateStandard.name)
}

export const interceptEditStandard = () => {
  return interceptAll('service/mgr/std/yearrecog/*', interceptEditStandard.name)
}

export const getData = () => {
  return cy.get('.panel-dept').find('.el-card.sd-cfg__item.is-hover-shadow')
}

export const setRulesMany = (specName) => {
  //点击修改按钮
  cy.get('.el-icon-edit-outline').last().click({
    force: true
  })
  cy.wait(3000)
  selectSpec(specName)
  cy.get('.el-table__body').first().contains('钾').parents('.el-table__row').find('[type= checkbox]').check({
    force: true
  })
  cy.get('.el-table__body').first().contains('氯').parents('.el-table__row').find('[type= checkbox]').check({
    force: true
  })
  //点击批量设置按钮
  cy.get('.el-icon-edit').click({
    force: true
  })
}

export const setNolimitRules = (specName) => {
  //点击修改按钮
  cy.get('.el-icon-edit-outline').last().click({
    force: true
  })
  cy.wait(3000)
  cy.get('.el-button.spec-filter__item.el-button--small').contains(specName).click({
    force: true
  })
  cy.get('.el-table__body').first().contains('病毒基因M区').parents('.el-table__row').find('[type= checkbox]').check({
    force: true
  })
  cy.get('.el-table__body').first().contains('病毒基因S区').parents('.el-table__row').find('[type= checkbox]').check({
    force: true
  })
  //点击批量设置按钮
  cy.get('.el-icon-edit').click({
    force: true
  })
}

export const interceptStandardModel = () => {
  return interceptAll('service/mgr/template/saveOrUpdate', interceptStandardModel.name)
}

export const selectModel = () => {
  return cy.get('[aria-label="互认规则设置"]')
    .find('.el-dialog__footer:visible')
    .first()
    .find('.el-button.el-button--success.el-button--medium.is-plain.el-popover__reference')
}

export const modelOption = (text) => {
  cy.get('.el-table__body').last().find('.el-table__row').last().findByText(text).click({
    force: true
  })
}

export const getModelName = () => {
  return getModelLength().last().find('.cell').first()
}

export const interceptDeleteModel = () => {
  return interceptAll('service/mgr/template/delete', interceptDeleteModel.name)
}

export const interceptDeleteStandard = () => {
  return interceptAll()
}

export const getModelLength = () => {
  return cy.get('.el-table__body').last().find('.el-table__row')
}

export const getStandard = () => {
  return  cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow')
}

export const interceptChangeOrg = () => {
  return interceptAll('service/mgr/std/yearrecog/list?*',interceptChangeOrg.name)
}