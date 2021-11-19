import { interceptAll } from '../common/http'

/**
 * 
 * @param {string} versionTitle 更新日志标题
 * @param {string} pushDest 推送对象: 0：实验室端  1：管理端
 * @param {string} versionContent 更新日志正文
 */
export  const createVersionLog = (versionTitle,pushDest,versionContent) => {
  cy.clickButton('添加更新日志')
  cy.wait(1000)
  if (versionTitle) {
    cy.get('#versionTitle').clear().type(versionTitle)
  }
  if (pushDest === '1') {
    cy.get('#pushDest').find('[type=radio]').check(pushDest,{
      force:true
    })
  } else {
    cy.get('#pushDest').find('[type=radio]').check('0',{
      force:true
    })
  }
  if (versionContent) {
    cy.get('#versionContent').clear().type(versionContent)
  }
}

export const clickSave = () => {
  cy.get('.ant-modal-content .ant-modal-footer .ant-btn.ant-btn-primary').click({
    force:true
  })
}

export const clickCancel = () => {
  cy.get('.ant-modal-content .ant-modal-footer .ant-btn').first().click({
    force:true
  })
}

export const validVersionError = (text) => {
  cy.get('.ant-form-explain').should('have.text',text)
}

export const interceptCreateVersionLog = () => {
  return interceptAll('service/version/notice',interceptCreateVersionLog.name,'/biz-support-be')
}

export const getVersionLogOption = (text,option) => {
  if (option) {
    return cy.get('.ant-table-body').contains(text)
  } else {
    return cy.get('.ant-table-body').contains(text).parents('.ant-table-row').findByText(option)
  }

}