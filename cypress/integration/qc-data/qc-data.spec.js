import {
  visitLabPage
} from "../../shared/route"
import {
  confirmDelete
} from "../common/dialog"
import {
  waitIntercept,
  waitRequest
} from "../common/http"
import {
  closeClientAlert,
  validErrorMsg,
  validSuccessMessage
} from "../common/message"
import {
  clickConfigButton,
  createConfig,
  selectMajor,
  validEnterPreserveMode
} from "../ds-config/ds-config"
import {
  clickDeleteData,
  createGroup,
  elformButton,
  getData,
  getQcData,
  groupButton,
  interceptBatchNoTree,
  interceptChange,
  interceptCreateGroup,
  interceptDeleteBatchNo,
  interceptMapping,
  interceptQueryGroup,
  interceptRelate,
  relatedGroupButton,
  reportData,
  selectGroupMap,
  selectGroupValue,
  selectTitle,
  visitDsConfig
} from "./qc-data"

/**
 * 质控批号维护
 */
context('质控批号维护', () => {
  let responseData
  const instrument = '贝克曼 AU 5800 全自动生化分析系统'
  const testMethod = '干化学'
  const nuReagent = '拜耳'
  const testReagent = '科方(广州)'
  const testCalibration = '拜耳'
  const unit = 'mmol/L'
  const CTValue = 25
  const resultType = '定量'
  const majorName = '新冠病毒核酸检测'
  const itemName = '病毒基因E区'
  const waitOptions = {
    timeout: 90000
  }
  before(() => {
    waitRequest({
      waitOptions,
      intercept: interceptQueryGroup,
      onBefore: () => {
        cy.visitLabPage('qc-data', 'labgd18020')
      },
      onSuccess: data => {
        responseData = data
      }
    })
  })
  context('新建/编辑/删除质控批号', () => {
    const batchNo = 'E1147-01L'
    before(() => {
      cy.wait(2000)
    })
    it('添加重复的批号', () => {
      const relatedGroup = responseData[0].batchNo
      if (responseData.length === 0) {

      } else {
        createGroup(relatedGroup)
        elformButton('确定')
        waitRequest({
          intercept: interceptCreateGroup,
          onBefore: () => {
            groupButton('保存')
          },
          onError: (data) => {
            validErrorMsg(data)
            clickDeleteData()
            confirmDelete()
          }
        })
      }
    })
    it('批号添加成功', () => {
      getData().then(Data => {
        createGroup(batchNo)
        elformButton('确定')
        waitIntercept(interceptCreateGroup, () => {
          groupButton('保存')
        }, () => {
          cy.wait(1000)
          getData().should('have.length', Data.length + 1)
          getData().first().find('.cell').first().should('have.text', batchNo)
        })
      })
    })
    it('编辑批号', () => {
      cy.wait(2000)
      const editName = '自动化修改名称' + new Date().getTime()
      getData().first().find('.cell').first().invoke('text').then((data) => {
        getData().first().findByText('编辑').click({
          force: true
        })
        getData().first().findAllByPlaceholderText('请输入名称')
          .clear()
          .type(editName)
        waitIntercept(interceptCreateGroup, () => {
          getData().first().findByText('保存').click({
            force: true
          })
        }, () => {
          getData().first().find('.cell').first().invoke('text').then(newName => {
            expect(data).not.to.eq(newName)
            expect(newName).to.eq(editName)
            getData().first().find('.cell').first().should('have.text', editName)
          })
        })
      })
    })
    context('批号删除', () => {
      before(() => {
        waitRequest({
          intercept: interceptQueryGroup,
          waitOptions,
          onBefore: () => {
            cy.reload()
          },
          onSuccess: (data) => {
            cy.wait(3000)
            closeClientAlert()
            responseData = data
          }
        })
      })
      it('存在质控数不可删除', () => {
        const dataIndex = responseData.findIndex(item => item.related === true)
        getData().eq(dataIndex).findByText('编辑').click({
          force: true
        })
        getData().eq(dataIndex).findByText('删除').click({
          force: true
        })
        waitRequest({
          intercept: interceptDeleteBatchNo,
          waitOptions,
          onBefore: () => {
            confirmDelete()
          },
          onError: (data) => {
            validErrorMsg(data)
          }
        })
      })
      it('数据删除成功', () => {
        const dataIndex = responseData.findIndex(item => item.related === false)
        getData().then(data => {
          getData().eq(dataIndex).findByText('编辑').click({
            force: true
          })
          getData().eq(dataIndex).findByText('删除').click({
            force: true
          })
          waitRequest({
            intercept: interceptDeleteBatchNo,
            waitOptions,
            onBefore: () => {
              confirmDelete()
            },
            onSuccess: () => {
              getData().should('have.length', data.length - 1)
            }
          })
        })
      })
    })
  })
  context('启用/停用', () => {
    const batchNo = '1199UN'
    before(() => {
      cy.reload()
      cy.wait(3000)
      closeClientAlert()
      createGroup(batchNo)
      elformButton('确定')
      groupButton('保存')
    })
    it('停用', () => {
      cy.wait(2000)
      getData().first().findByText('编辑').click({
        force: true
      })
      getData().first().find('.el-switch__core').click({
        force: true
      })
      waitIntercept(interceptCreateGroup, () => {
        getData().first().findByText('保存').click({
          force: true
        })
      }, () => {
        selectTitle('已停用质控批号')
        cy.wait(1000)
        getData().first().find('.cell').first().should('have.text', batchNo)
      })
    })
    it('启用', () => {
      cy.wait(2000)
      getData().first().findByText('编辑').click({
        force: true
      })
      getData().first().find('.el-switch__core').click({
        force: true
      })
      waitIntercept(interceptCreateGroup, () => {
        getData().first().findByText('保存').click({
          force: true
        })
      }, () => {
        selectTitle('已启用质控批号')
        cy.wait(1000)
        getData().first().find('.cell').first().should('have.text', batchNo)
        getData().first().findByText('编辑').click({
          force: true
        })
        cy.wait(1000)
        getData().first().findByText('删除').click({
          force: true
        })
        waitRequest({
          intercept: interceptDeleteBatchNo,
          waitOptions,
          onBefore: () => {
            confirmDelete()
          },
          onSuccess: () => {

          }
        })
      })
    })
  })
  context('关联/解除关联质控品', () => {
    const batchGroupName = '血常规E5163-02'
    before(() => {
      visitDsConfig()
      validEnterPreserveMode(() => {
        cy.get('.data-table__body').contains(itemName).parents('.item-cell ').findByText('添加').click({
          force: true
        })
        createConfig({
          instrument,
          testMethod,
          testReagent,
          testCalibration,
          unit,
          nuReagent,
          CTValue,
          resultType
        })
        clickConfigButton(itemName, '保存')
        cy.wait(1000)
      })
    })
    it('关联质控品', () => {
      visitLabPage('qc-relate')
      cy.wait(1000)
      selectMajor(majorName)
      cy.wait(1000)
      getQcData().last().findByText('编辑').click({
        force: true
      })
      createGroup(batchGroupName)
      relatedGroupButton('选择质控批号', '确定')
      waitIntercept(interceptRelate, () => {
        getQcData().last().findByText('保存').click({
          force: true
        })
      }, () => {
        cy.wait(1000)
        getQcData().last().find('.tag-select__title').should('have.text', batchGroupName)
      })
    })
    it('解除关联质控品', () => {
      cy.wait(1000)
      getQcData().last().findByText('编辑').click({
        force: true
      })
      clickDeleteData()
      confirmDelete()
      waitIntercept(interceptRelate, () => {
        getQcData().last().findByText('保存').click({
          force: true
        })
      }, () => {
        cy.wait(1000)
        getQcData().last().should('not.have.class', '.tag-select__title')
        visitDsConfig()
        validEnterPreserveMode(() => {
          cy.wait(1000)
          clickConfigButton(itemName, '删除')
          confirmDelete()
        })
      })
    })
  })
  context('批号对照', () => {
    let groupId
    let groupName
    let rowIndex
    let notRelated
    before(() => {
      visitLabPage('ds-config')
      cy.wait(1000)
      waitRequest({
        intercept: interceptQueryGroup,
        onBefore: () => {
          visitLabPage('qc-data')
        },
        onSuccess: (data) => {
          responseData = data
          rowIndex = responseData.findIndex(item => item.related === true)
          notRelated = responseData.findIndex(item => item.related === false)
          groupId = responseData[rowIndex].groupId
          groupName = responseData[rowIndex].groupName
        }
      })
      cy.wait(3000)
      closeClientAlert()
    })
    it('LIS批号正常对照', () => {
      const selectValue = 'RD1143UN'
      let groupMapData
      cy.get('.el-table__body').first().find('.el-table__row')
        .eq(notRelated)
        .findByText('批号对照')
        .should('not.exist')
      waitIntercept(interceptMapping(groupId), () => {
        cy.get('.el-table__body').first().find('.el-table__row').eq(rowIndex)
          .findByText('批号对照')
          .should('exist')
          .click({
            force: true
          })
      }, data => {
        groupMapData = data
        selectGroupMap(groupMapData[0], groupName, selectValue)
        waitRequest({
          intercept: interceptMapping(groupId),
          onBefore: () => {
            selectGroupValue(groupName, '保存')
          },
          onSuccess: () => {
            validSuccessMessage()
          }
        })
      })
    })
    it('解除LIS数据对照', () => {
      cy.wait(1000)
      cy.get('.el-table__body').first().find('.el-table__row').eq(rowIndex)
        .findByText('批号对照')
        .click({
          force: true
        })
      cy.wait(1000)
      waitIntercept(interceptMapping(groupId), () => {
        cy.get('.el-tag__close.el-icon-close').first().click({
          force: true
        })
        cy.wait(2000)
        selectGroupValue(groupName, '保存')
      }, () => {
        validSuccessMessage()
      })
    })
  })
  context('批号更换', () => {
    let rowIndex
    let groupName
    let groupId
    let repeatBatchNo
    let notRelated
    const currentTime = new Date().toLocaleDateString().replace(/\//g, '-')
    before(() => {
      waitRequest({
        intercept: interceptQueryGroup,
        onBefore: () => {
          cy.reload()
          cy.wait(3000)
          closeClientAlert()
        },
        onSuccess: (data) => {
          rowIndex = data.findIndex((item, index) => {
            if (item.related === true && item.status === true) {
              return index
            }
          })
          console.log(rowIndex);
          groupId = data[rowIndex].groupId
          groupName = data[rowIndex].groupName
          notRelated = rowIndex = data.findIndex(item => item.related === false)
          repeatBatchNo = data.map(item => {
            if (item.related === true && item.groupName !== groupName && item.status) {
              return item.batchNo
            }
          }).filter(filterItem => filterItem !== undefined)
        }
      })
    })
    it('批号更换失败', () => {
      if (notRelated !== -1) {
        cy.get('.el-table__body').first().find('.el-table__row').eq(notRelated)
          .findByText('批号更换')
          .should('not.exist')
      }
      cy.get('.el-table__body').first().find('.el-table__row').eq(1)
        .findByText('批号更换')
        .should('exist')
        .click({
          force: true
        })
      selectGroupValue(groupName, repeatBatchNo[0], '批号更换')
      waitRequest({
        intercept: interceptChange(groupId),
        onBefore: () => {
          selectGroupValue(groupName, '保存', '批号更换')
        },
        onError: (data) => {
          validErrorMsg(data)
          selectGroupValue(groupName, '取消', '批号更换')
        }
      })
    })
    it('批号更换成功', () => {
      const groupBatch = 'CHA20111Z'
      console.log(rowIndex);
      cy.get('.el-table__body').first().find('.el-table__row').eq(1)
        .findByText('批号更换')
        .click({
          force: true
        })
      selectGroupValue(groupName, groupBatch, '批号更换')
      waitRequest({
        intercept: interceptChange(groupId),
        onBefore: () => {
          selectGroupValue(groupName, '保存', '批号更换')
        },
        onSuccess: () => {
          validSuccessMessage()
        }
      })
      waitRequest({
        intercept: interceptBatchNoTree,
        onBefore: () => {
          visitLabPage('single-import')
          cy.wait(3000)
          closeClientAlert()
        },
        onSuccess: (data) => {
          const batchGroup = data.map(item => (item.children.filter(childItem => childItem.data.createTime.split(' ')[0] === currentTime).length ? item : []))
            .filter(filterEmptyArray => filterEmptyArray.length !== 0)
          if (batchGroup.length) {
            const instrumentName = batchGroup[0].label
            const itemName = (batchGroup[0].children[0].children[0].label);
            cy.get('.el-menu:visible').find(`span`).contains(instrumentName).parents('.el-submenu')
              .within(element => {
                if (element.hasClass('is-opened')) {
                  cy.get('span').contains(groupBatch).parent().parent().within(childrenElement => {
                    if (childrenElement.hasClass('is-opened')) {
                      cy.get('li').contains(itemName).click({
                        force: true
                      })
                    } else {
                      cy.get('.el-submenu__icon-arrow.el-icon-arrow-down:visible')
                        .click({
                          force: true
                        })
                      cy.wait(2000)
                      cy.get('li').contains(itemName).click({
                        force: true
                      })
                    }
                  })
                } else {
                  cy.get('.el-submenu__icon-arrow.el-icon-arrow-down:visible').click({
                    force: true
                  })
                  cy.wait(2000)
                  cy.get('.el-menu:visible').last().find(`span`).contains(groupBatch).parents('.el-submenu').within(() => {
                    cy.get('.el-menu:visible').last().find(`span`).contains(groupBatch).parent()
                      .find('.el-submenu__icon-arrow.el-icon-arrow-down:visible')
                      .click({
                        force: true
                      })
                    cy.wait(2000)
                    cy.get('li').contains(itemName).click({
                      force: true
                    })
                  })
                }
              })
          }
          reportData(23)
          cy.exec('python  cypress\\integration\\qc-data\\deleteBatchGroup.py')
        }
      })
    })
  })
})