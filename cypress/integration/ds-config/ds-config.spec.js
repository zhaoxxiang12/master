import {
  confirmDelete
} from "../common/dialog"
import {
  waitIntercept,
  waitRequest
} from "../common/http"
import {
  validErrorMsg
} from "../common/message"
import {
  selectDropListValue
} from "../eqa/eqa-report/eqa-report"
import {
  clickConfigButton,
  clickPlaceHolder,
  createConfig,
  enableItem,
  enterPreserveMode,
  getItemTestingLength,
  getPageData,
  interceptDeleteItemTesting,
  interceptItemTesting,
  quitPreserveMode,
  selectMajor,
  validEnterPreserveMode
} from "./ds-config"

/**
 * 检测体系配置
 */
context('检测体系配置', () => {
  before(() => {
    cy.visitLabPage('ds-config', 'labgd18020')
    cy.wait(3000)
  })
  context('新增检测体系', () => {
    before(() => {
      selectMajor('新冠病毒核酸检测')
      cy.wait(1000)
    })
    const instrument = '贝克曼 AU 5800 全自动生化分析系统'
    const testMethod = '干化学'
    const nuReagent = '拜耳'
    const testReagent = '科方(广州)'
    const testCalibration = '原装试剂'
    const unit = 'mmol/L'
    const CTValue = 25
    const resultType = '定量'
    const instrumentNo = '001'
    it('添加仪器编号已存在的检测体系', () => {
      cy.get('.data-table__body').find('tbody').first().find('.item-cell__text')
        .invoke('text').then((ItemName) => {
          getItemTestingLength(ItemName).then((getData) => {
            enterPreserveMode()
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
                clickConfigButton(ItemName, '保存')
              },
              onError: () => {
                cy.wait(1000)
                validErrorMsg('[' + ItemName + ',' + instrument + '] ' + '仪器编号：' + instrumentNo + ' 已在‘红细胞计数’项目配置过，请重新配置')
                clickConfigButton(ItemName, '取消')
                quitPreserveMode()
              }
            })
          })
        })
    })
    it('检测体系创建成功', () => {
      cy.wait(3000)
      validEnterPreserveMode(() => {
        cy.get('.data-table__body').find('tbody').first().find('.item-cell__text')
          .invoke('text').then((ItemName) => {
            getItemTestingLength(ItemName).then((getData) => {
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
                clickConfigButton(ItemName, '保存')
              }, () => {
                cy.wait(3000)
                getItemTestingLength(ItemName).should('have.length', getData.length + 1)
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
          quitPreserveMode('直接退出')
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
      const testCalibration = '原装试剂'
      const nuReagent = '拜耳'
      const unit = 'mmol/L'
      const CTValue = 25
      const resultType = '定量'
      const selfInstrument = '自定义仪器' + parseInt(Math.random() * 100)
      validEnterPreserveMode(() => {
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
          intercept:interceptItemTesting,
          onBefore: () => {
            clickConfigButton(itemName,'保存')
          },
          onSuccess: (data) => {
            expect(data.status).to.eq(false)
          }
        })
      })
    })
    it('自定义检测体系未审核状态不能开启', () => {
      validEnterPreserveMode(() => {
        clickConfigButton(itemName,'编辑')
        enableItem(itemName)
        validErrorMsg('检测体系中有数据还未审核，待审核通过后才能开启')
        clickConfigButton(itemName,'取消')
      })
    })
    it('删除自定义检测项目' ,() => {
      validEnterPreserveMode(() => {
        getItemTestingLength(itemName).then(getData => {
          clickConfigButton(itemName,'删除')
          waitIntercept(interceptDeleteItemTesting,() => {
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