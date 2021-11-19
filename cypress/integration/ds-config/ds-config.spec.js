import {
  confirmDelete
} from '../common/dialog'
import {
  waitIntercept,
  waitRequest
} from '../common/http'
import {
  validErrorMsg
} from '../common/message'
import {
  selectDropListValue
} from '../eqa/eqa-report/eqa-report'
import {
  clickConfigButton,
  clickPlaceHolder,
  createConfig,
  enableItem,
  enterPreserveMode,
  getConfigOption,
  getItemTestingLength,
  getPageData,
  interceptDeleteItemTesting,
  interceptItemTesting,
  interceptQueryInstr,
  interceptQueryItemTesting,
  quitPreserveMode,
  selectMajor,
  validEnterPreserveMode
} from './ds-config'

/**
 * 检测体系配置
 */
context('检测体系配置', () => {
  let instruArray
  let itemTestinginstru = []
  before(() => {
    waitIntercept(interceptQueryInstr, () => {
      cy.visitLabPage('ds-config', 'labgd18030')
    }, data => {
      instruArray = data.map(item => {
        return item.instrCName
      })

    })
    cy.wait(3000)
  })
  context('新增检测体系', () => {
    before(() => {
      waitIntercept(interceptQueryItemTesting, () => {
        selectMajor('新冠病毒核酸检测')
      }, data => {
        data.forEach(itemTesting => {
          if (itemTesting.itemName === '病毒基因E区') {
            itemTesting.itemTestingList.forEach(configList => {
              itemTestinginstru.push(configList.instrName)
            })
          }
        })
      })
      cy.wait(1000)
    })
    const testMethod = '干化学'
    const nuReagent = '拜耳'
    const testReagent = '科方(广州)'
    const testCalibration = '希森美康'
    const unit = 'mmol/L'
    const CTValue = 25
    const resultType = '定量'
    const instrumentNo = '001'
    const itemName = '病毒基因E区'
    it('添加仪器编号已存在的检测体系', () => {
      const instrument = '贝克曼 AU 5800 全自动生化分析系统'
      cy.get('.data-table__body').contains(itemName).parents('.item-cell ').find('.item-cell__text')
        .invoke('text').then((getItemName) => {
          getItemTestingLength(getItemName).then((getData) => {
            enterPreserveMode()
            cy.wait(1000)
            cy.get('.data-table__body').contains(itemName).parents('.item-cell ').findByText('添加').click({
              force: true
            })
            createConfig({
              instrument,
              testMethod,
              nuReagent,
              testReagent,
              testCalibration,
              unit,
              CTValue,
              resultType,
              instrumentNo
            })
            waitRequest({
              intercept: interceptItemTesting,
              onBefore: () => {
                clickConfigButton(getItemName, '保存')
              },
              onError: (data) => {
                cy.wait(1000)
                validErrorMsg(data)
                clickConfigButton(getItemName, '取消')
                quitPreserveMode()
              }
            })
          })
        })
    })
    it('检测体系创建成功', () => {
      const newArray = instruArray.filter(item => {
        if (itemTestinginstru.indexOf(item) === -1) {
          return item
        }
      })
      const instrument = newArray[3]
      cy.wait(3000)
      validEnterPreserveMode(() => {
        getConfigOption(itemName).find('.item-cell__text')
          .invoke('text').then((getItemName) => {
            getItemTestingLength(getItemName).then((getData) => {
              cy.wait(1000)
              getConfigOption(itemName).findByText('添加').click({
                force: true
              })
              createConfig({
                instrument,
                testMethod,
                nuReagent,
                testReagent,
                testCalibration,
                unit,
                CTValue,
                resultType
              })
              waitIntercept(interceptItemTesting, () => {
                clickConfigButton(getItemName, '保存')
              }, () => {
                cy.wait(3000)
                getItemTestingLength(getItemName).should('have.length', getData.length + 1)
                quitPreserveMode()
              })
            })
          })
      })
    })
  })
  context('编辑检测体系', () => {
    before(() => {
      cy.wait(2000)
      enterPreserveMode()
      selectMajor('新冠病毒核酸检测')
      cy.wait(1000)
    })
    it('检测体系编辑成功', () => {
      const itemName = '病毒基因E区'
      getPageData(itemName).then(getData => {
        clickConfigButton(itemName, '编辑')
        cy.get('.data-table__body').find('.item-table__inline').within(() => {
          cy.get('.el-input__inner').last()
            .clear()
            .type(parseInt(Math.random() * 100))
        })
        waitIntercept(interceptItemTesting, () => {
          clickConfigButton(itemName, '保存')
        }, () => {
          cy.wait(1000)
          getPageData(itemName).then(newData => {
            expect(getData).not.to.eq(newData)
          })
        })
      })
    })
    it('编辑检测体系失败', () => {
      const itemName = '白细胞计数'
      const majorName = '全血细胞计数'
      selectMajor(majorName)
      cy.wait(3000)
      clickConfigButton(itemName, '编辑')
      clickPlaceHolder('请输入').first().click()
      selectDropListValue('希森美康 XN-10')
      waitRequest({
        intercept: interceptItemTesting,
        onBefore: () => {
          clickConfigButton(itemName, '保存')
        },
        onError: () => {
          validErrorMsg(itemName + '已存在质控数据，检测体系不可更改')
        }
      })
    })
  })
  context('删除检测体系', () => {
    before(() => {
      cy.wait(5000)
    })
    it('删除检测体系失败', () => {
      const majorName = '常规化学'
      const itemName = '钠'
      validEnterPreserveMode(() => {
        selectMajor(majorName)
        cy.wait(3000)
        clickConfigButton(itemName, '删除')
        waitRequest({
          intercept: interceptDeleteItemTesting,
          onBefore: () => {
            confirmDelete()
          },
          onError: () => {
            validErrorMsg(itemName + '已存在质控数据，不可删除')
          }
        })
      })
    })
    it('检测体系删除成功', () => {
      const majorName = '新冠病毒核酸检测'
      const itemName = '病毒基因E区'
      validEnterPreserveMode(() => {
        selectMajor(majorName)
        cy.wait(1000)
        getItemTestingLength(itemName).then((getData) => {
          clickConfigButton(itemName, '删除')
          waitIntercept(interceptDeleteItemTesting, () => {
            confirmDelete()
          }, () => {
            getItemTestingLength(itemName).should('have.length', getData.length - 1)
            quitPreserveMode()
          })
        })
      })
    })
  })
  context('自定义检测体系', () => {
    const majorName = '新冠病毒核酸检测'
    const itemName = '病毒基因E区'
    before(() => {
      cy.wait(3000)
      selectMajor(majorName)
      cy.wait(3000)
    })
    it('自定义检测体系-自定义仪器', () => {
      const instrument = '自定义'
      const testMethod = '干化学'
      const testReagent = '科方(广州)'
      const testCalibration = '希森美康'
      const nuReagent = '拜耳'
      const unit = 'mmol/L'
      const CTValue = 25
      const resultType = '定量'
      const selfInstrument = '自定义仪器' + parseInt(Math.random() * 100)
      validEnterPreserveMode(() => {
        cy.wait(1000)
        cy.get('.data-table__body').contains(itemName).parents('.item-cell ').findByText('添加').click({
          force: true
        })
        createConfig({
          instrument,
          testMethod,
          testReagent,
          nuReagent,
          testCalibration,
          resultType,
          unit,
          CTValue
        }, {
          selfInstrument
        })
        waitRequest({
          intercept: interceptItemTesting,
          onBefore: () => {
            clickConfigButton(itemName, '保存')
          },
          onSuccess: (data) => {
            expect(data.status).to.eq(false)
          }
        })
      })
    })
    it('自定义检测体系未审核状态不能开启', () => {
      validEnterPreserveMode(() => {
        clickConfigButton(itemName, '编辑')
        enableItem(itemName)
        validErrorMsg('检测体系中有数据还未审核，待审核通过后才能开启')
        clickConfigButton(itemName, '取消')
      })
    })
    it('删除自定义检测项目', () => {
      validEnterPreserveMode(() => {
        getItemTestingLength(itemName).then(getData => {
          clickConfigButton(itemName, '删除')
          waitIntercept(interceptDeleteItemTesting, () => {
            confirmDelete()
          }, () => {
            cy.wait(1000)
            getItemTestingLength(itemName).should('have.length', getData.length - 1)
          })
        })
      })
    })
  })
})