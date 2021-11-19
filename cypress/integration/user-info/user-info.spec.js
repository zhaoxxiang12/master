/**
 * 用户信息
 */

import dayjs from 'dayjs'
import {
  visitPage
} from '../../shared/route'
import {
  activeDateDay
} from '../common/date'
import {
  clickOkInDialog,
  withinDialog
} from '../common/dialog'
import {
  validatePdfFile
} from '../common/file'
import {
  interceptAll,
  waitIntercept
} from '../common/http'
import {
  setTextarea
} from '../common/input'
import {
  closeClientAlert,
  validSuccessMessage
} from '../common/message'
import {
  getDialog
} from '../message/message'
import {
  elform
} from '../mutual-result/mutual-item'
import {
  reportElformClickDay
} from '../report/report-iqc'
import {
  clickSearch
} from '../setting/report-monitor/report-monitor'
import {
  mathRomdomNumber
} from '../single-import/single-import'
import {
  findElformButton,
  getLabForm,
  relateLab
} from './lab-info'

const interceptVersion = (mgr = false) => {
  if (mgr === true) {
    return interceptAll('service/mgr/version/notice/page?*', interceptVersion.name + new Date().getTime())
  }
  return interceptAll('service/base/version/notice/page?*', interceptVersion.name + new Date().getTime(), '/cqb-base')
}

const interceptQueryBulletin = (mgr = true) => {
  if (mgr === false) {
    return interceptAll('service/base/bulletin?*', interceptQueryBulletin.name, '/cqb-base')
  } else {
    return interceptAll('service/mgr/bulletin?*', interceptQueryBulletin.name)
  }
}


const interceptView = (mgr = false) => {
  if (mgr === true) {
    return interceptAll('service/mgr/instruction/preview/*', interceptView.name)
  } else {
    return interceptAll('service/base/instruction/preview/*', interceptView.name, '/cqb-base')
  }
}

const assertLabVersion = (responseData, dialogName, labVersionTitle) => {

  if (0 === responseData.data.length) {
    getDialog(dialogName).within(() => {
      cy.get('.el-table__empty-text').should('have.text', '暂无数据')
    })
  } else if (responseData.length >= 21) {
    getDialog(dialogName).within(() => {
      cy.get('.el-pagination__total').should('have.text', '共 ' + responseData.total + ' 条')
      if (labVersionTitle) {
        validResponseVersionTitle(responseData, labVersionTitle)
      }
    })
  } else {
    getDialog(dialogName).within(() => {
      getLabForm().should('have.length', responseData.data.length)
      if (labVersionTitle) {
        validResponseVersionTitle(responseData, labVersionTitle)
      }
    })
  }
}

const interceptInstruction = (mgr = false) => {
  if (mgr === true) {
    return interceptAll('service/mgr/instruction/page?*', interceptInstruction.name)
  } else {
    return interceptAll('service/base/instruction/page?*', interceptInstruction.name, '/cqb-base')
  }
}

const interceptPushBulletin = (mgr = true) => {
  if (mgr === false) {
    return interceptAll('service/base/bulletin/*', interceptPushBulletin.name, '/cqb-base')
  } else {
    return interceptAll('service/mgr/bulletin/push/*', interceptPushBulletin.name)
  }
}

const param = {
  version: {
    type: 1
  },
  manual: {
    type: 2
  }
}

const validResponseVersionTitle = (responseData, versionTitle) => {
  responseData.data.forEach(item => {
    for (const key in versionTitle) {
      if (param[key].type === 1) {
        expect(item.versionTitle).to.eq(versionTitle[key])
      } else {
        expect(item.manualTitle).to.eq(versionTitle[key])
      }
    }
  })
}

/**
 * 
 * @param {string} modelName 模块名称
 * @param {string} startTime 搜索条件开始时间
 * @param {string} endTime 搜索条件结束时间
 */
const modelOption = (modelName, startTime, endTime) => {
  cy.get('.dropdown-link:visible').last().click()
  cy.wait(2000)
  cy.get('.el-dropdown-menu:visible').contains(modelName).click()
  cy.wait(2000)
  reportElformClickDay('开始时间', '开始时间', true)
  cy.wait(2000)
  activeDateDay(startTime)
  reportElformClickDay('结束时间', '结束时间', true)
  cy.wait(2000)
  activeDateDay(endTime)
}

context('用户信息', () => {
  before(() => {
    cy.visitLabPage('home', 'labgd18020')
  })
  context('实验室端用户信息', () => {
    const startTime = '2021/10/5'
    const endTime = '2021/11/5'
    context('版本更新', () => {
      before(() => {
        modelOption('版本更新', startTime, endTime)
      })
      context('筛选条件', () => {
        it('时间范围查询数据', () => {
          waitIntercept(interceptVersion, () => {
            clickSearch()
          }, data => {
            assertLabVersion(data, '更新日志')
          })
          reportElformClickDay('结束时间', '结束时间', true)
          cy.wait(1000)
          activeDateDay('2021/11/4')
          waitIntercept(interceptVersion, () => {
            clickSearch()
          }, data => {
            assertLabVersion(data, '更新日志')
          })
        })
        it('关键字查询', () => {
          const version = '实验室端更新'
          reportElformClickDay('结束时间', '结束时间', true)
          cy.wait(1000)
          activeDateDay(endTime)
          cy.findAllByPlaceholderText('输入关键字').type(version)
          waitIntercept(interceptVersion, () => {
            clickSearch()
          }, data => {
            assertLabVersion(data, '更新日志', {
              version
            })
          })
        })
      })
      context('查看版本更新日志', () => {
        it('查看版本日志', () => {
          reportElformClickDay('开始时间', '开始时间', true)
          cy.wait(1000)
          activeDateDay(startTime)
          reportElformClickDay('结束时间', '结束时间', true)
          cy.wait(1000)
          activeDateDay(endTime)
          waitIntercept(interceptVersion, () => {
            clickSearch()
          }, data => {
            if (data.data.length > 0) {
              const versionContent = data.data[0].versionContent
              const versionTitleName = data.data[0].versionTitle
              getDialog('更新日志').within(() => {
                getLabForm().contains(versionTitleName).click({
                  force: true
                })
              })
              getDialog('更新日志').within(() => {
                cy.get('.el-dialog__body').should('contain', versionContent)
                cy.findByText('关闭').click({
                  force: true
                })
                cy.wait(1000)
              })
              cy.get('.el-dialog__close.el-icon.el-icon-close:visible').click({
                force: true
              })
            }
          })
        })
      })
    })
    context('实验室端操作手册', () => {
      before(() => {
        modelOption('操作手册', startTime, endTime)
      })
      context('筛选条件', () => {
        it('时间范围查询数据', () => {
          reportElformClickDay('开始时间', '开始时间', true)
          cy.wait(1000)
          activeDateDay('2021/5/11')
          waitIntercept(interceptInstruction, () => {
            clickSearch()
          }, data => {
            assertLabVersion(data, '操作手册')
          })
          reportElformClickDay('结束时间', '结束时间', true)
          cy.wait(1000)
          activeDateDay('2021/11/4')
          waitIntercept(interceptInstruction, () => {
            clickSearch()
          }, data => {
            assertLabVersion(data, '操作手册')
          })
        })
        it('关键字查询', () => {
          const manual = '佛山市临床检验质量控制中心_2020_年度汇总报告'
          reportElformClickDay('结束时间', '结束时间', true)
          cy.wait(1000)
          activeDateDay(endTime)
          getDialog('操作手册').within(() => {
            cy.findAllByPlaceholderText('输入关键字').type(manual)
          })
          waitIntercept(interceptInstruction, () => {
            clickSearch()
          }, data => {
            assertLabVersion(data, '操作手册', {
              manual
            })
          })
        })
      })
      context('查看和下载', () => {
        let result
        before(() => {
          reportElformClickDay('开始时间', '开始时间', true)
          cy.wait(1000)
          activeDateDay('2021/5/11')
          waitIntercept(interceptInstruction, () => {
            clickSearch()
          }, data => {
            result = data
          })
        })
        it('查看', () => {
          getDialog('操作手册').within(() => {
            if (result.data.length > 0) {
              waitIntercept(interceptView, () => {
                findElformButton(result.data[0].manualTitle, '查看')
              }, () => {})
              cy.wait(1000)
              cy.document()
                .its('body')
                .find('.ql-frame-viewer__close').click()
            }
          })
        })
        it('下载', () => {
          if (result.data.length > 0) {
            getDialog('操作手册').within(() => {
              const pdfName = result.data[0].manualTitle + '.pdf'
              findElformButton(result.data[0].manualTitle, '下载')
              validatePdfFile(pdfName, (data) => {})
            })
          }
        })
      })
    })
  })
  context('管理端用户信息', () => {
    before(() => {
      cy.visitPage('message')
    })
    context('版本更新', () => {
      const startTime = '2021/10/5'
      const endTime = '2021/11/5'
      before(() => {
        cy.wait(3000)
        modelOption('版本更新', startTime, endTime)
      })
      context('筛选条件', () => {
        it('时间范围查询数据', () => {
          waitIntercept(interceptVersion(true), () => {
            clickSearch()
          }, data => {
            assertLabVersion(data, '更新日志')
          })
          reportElformClickDay('结束时间', '结束时间', true)
          cy.wait(1000)
          activeDateDay('2021/11/4')
          waitIntercept(interceptVersion(true), () => {
            clickSearch()
          }, data => {
            assertLabVersion(data, '更新日志')
          })
        })
        it('关键字查询', () => {
          const version = '管理端版本'
          const time = '2021/11/5'
          reportElformClickDay('结束时间', '结束时间', true)
          cy.wait(1000)
          activeDateDay(time)
          cy.findAllByPlaceholderText('输入关键字').type(version)
          waitIntercept(interceptVersion(true), () => {
            clickSearch()
          }, data => {
            assertLabVersion(data, '更新日志', {
              version
            })
          })
        })
      })
      context('查看版本更新日志', () => {
        it('查看版本日志', () => {
          reportElformClickDay('开始时间', '开始时间', true)
          cy.wait(1000)
          activeDateDay(startTime)
          reportElformClickDay('结束时间', '结束时间', true)
          cy.wait(1000)
          activeDateDay(endTime)
          waitIntercept(interceptVersion(true), () => {
            clickSearch()
          }, data => {
            if (data.data.length > 0) {
              const versionContent = data.data[0].versionContent
              const versionTitleName = data.data[0].versionTitle
              getDialog('更新日志').within(() => {
                getLabForm().contains(versionTitleName).click({
                  force: true
                })
              })
              getDialog('更新日志').within(() => {
                cy.get('.el-dialog__body').should('contain', versionContent)
                cy.findByText('关闭').click({
                  force: true
                })
                cy.wait(1000)
              })
              cy.get('.el-dialog__close.el-icon.el-icon-close:visible').click({
                force: true
              })
            }
          })
        })
      })
    })
    context('操作手册', () => {
      const startTime = '2021/10/5'
      const endTime = '2021/11/5'
      before(() => {
        cy.wait(3000)
        modelOption('操作手册', startTime, endTime)
      })
      context('筛选条件', () => {
        it('时间范围查询数据', () => {
          waitIntercept(interceptInstruction(true), () => {
            clickSearch()
          }, data => {
            assertLabVersion(data, '操作手册')
          })
          reportElformClickDay('结束时间', '结束时间', true)
          cy.wait(1000)
          activeDateDay('2021/11/4')
          waitIntercept(interceptInstruction(true), () => {
            clickSearch()
          }, data => {
            assertLabVersion(data, '操作手册')
          })
        })
        it('关键字查询', () => {
          const manual = '2021年09月广东省结果互认专业室内质控数据室间化比对报告'
          reportElformClickDay('结束时间', '结束时间', true)
          cy.wait(1000)
          activeDateDay(endTime)
          getDialog('操作手册').within(() => {
            cy.findAllByPlaceholderText('输入关键字').type(manual)
          })
          waitIntercept(interceptInstruction(true), () => {
            clickSearch()
          }, data => {
            assertLabVersion(data, '操作手册', {
              manual
            })
          })
        })
        context('查看和下载', () => {
          let result
          before(() => {
            reportElformClickDay('开始时间', '开始时间', true)
            cy.wait(1000)
            activeDateDay('2021/5/11')
            waitIntercept(interceptInstruction(true), () => {
              clickSearch()
            }, data => {
              result = data
            })
          })
          it('查看', () => {
            getDialog('操作手册').within(() => {
              if (result.data.length > 0) {
                waitIntercept(interceptView(true), () => {
                  findElformButton(result.data[0].manualTitle, '查看')
                }, () => {})
                cy.wait(1000)
                cy.document()
                  .its('body')
                  .find('.ql-frame-viewer__close').click()
              }
            })
          })
          it('下载', () => {
            if (result.data.length > 0) {
              getDialog('操作手册').within(() => {
                findElformButton(result.data[0].manualTitle, '下载')
                const pdfName = result.data[0].manualTitle + '.pdf'
                validatePdfFile(pdfName, (data) => {})
              })
            }
          })
        })
      })
    })
    context('公告板', () => {
      const bulletinTitle = '推送gd18020实验室公告' + mathRomdomNumber(0, 1000)
      const bulletinContent = '推送gd18020实验室公告正文'
      const labCode = 'gd18020'
      const currentTime = dayjs().format('YYYY/MM/D')
      before(() => {
        visitPage('billboard')
        cy.wait(3000)
        closeClientAlert()
      })
      it('流程验证', () => {
        //管理端添加公告板
        cy.get('button').contains('添加公告').click({
          force: true
        })
        cy.wait(1000)
        elform('bulletinTitle').type(bulletinTitle)
        setTextarea('公告正文', bulletinContent)
        relateLab('添加公告板', labCode)
        withinDialog(clickOkInDialog, '选择实验室')
        withinDialog(clickOkInDialog, '添加公告板')
        cy.wait(1000)
        cy.findAllByPlaceholderText('请输入关键字').type(bulletinTitle)
        waitIntercept(interceptQueryBulletin, () => {
          clickSearch()
        }, data => {
          if (data.data.length > 0) {
            waitIntercept(interceptPushBulletin, () => {
              findElformButton(bulletinTitle, '推送')
            }, () => {
              validSuccessMessage()
              cy.wait(1000)
              cy.visitLabPage('home', 'labgd18020')
              cy.reload()
              cy.wait(3000)
              closeClientAlert()
              modelOption('公告板', currentTime, currentTime)
              getDialog('公告板').within(() => {
                cy.findAllByPlaceholderText('输入关键字').type(bulletinTitle)
              })
              waitIntercept(interceptQueryBulletin(false), () => {
                clickSearch()
              }, labData => {
                if (labData.data.length > 0) {
                  cy.wait(1000)
                  getDialog('公告板').within(() => {
                    waitIntercept(interceptPushBulletin(false), () => {
                      findElformButton(bulletinTitle, bulletinTitle)
                    }, viewData => {
                      expect(viewData.bulletinTitle).to.eq(bulletinTitle)
                      expect(viewData.bulletinContent).to.eq(bulletinContent)
                    })
                  })
                  getDialog('公告').within(() => {
                    cy.get('.el-dialog__body').should('contain', bulletinContent)
                    cy.get('.el-dialog__body').should('contain', bulletinTitle)
                  })
                }
              })
            })
          }
        })
      })
      it('删除测试数据', () => {
        cy.task('executeCqbSql', `SELECT id from base_bulletin_board where bulletin_title = "${bulletinTitle}"`).then(getBulletinId => {
          const id = getBulletinId[0].id
          cy.task('executeCqbSql', `DELETE from base_bulletin_board where id = ${id}`)
          cy.task('executeCqbSql', `DELETE from base_bulletin_board_lab_rela where base_bulletin_board_id = ${id}`)
        })
      })
    })
  })
})