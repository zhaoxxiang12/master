import { interceptGet, waitIntercept } from '../common/http'

export function queryCclReq () {
  return interceptGet('service/mgr/ccl/allowedIqcAdminCcl', queryCclReq.name)
}

export function validQcDept (beforeCb, cb) {
  waitIntercept(queryCclReq, beforeCb, data => {
    cy.get('.qc-dept__header')
      .find('input')
      .should('have.value', data[0].cclName)
    cb && cb(data)
  })
}