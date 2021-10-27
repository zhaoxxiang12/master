import {
  interceptAll,
  waitIntercept
} from "../common/http"
import {
  validErrorMsg,
  validSuccessMessage
} from "../common/message"
import {
  activeSelect
} from "../common/select"
import {
  expandSearchConditions
} from "../eqa/eqa-order/eqa-order"
import {
  clickSearch
} from "../setting/report-monitor/report-monitor"

const getOption = () => {
  return cy.get('.el-table__body:visible').last().find('.el-table__row')
}

const selectElform = (prop) => {
 return cy.get('.el-form:visible').last().find(`[for="${prop}"]`).next('.el-form-item__content').find('.el-input__inner')
}

const interceptUpdateData = () => {
  return interceptAll('service/mgr/itemUnitTransform/update', interceptUpdateData.name)
}

const findButtonClick = (text) => {
  getOption().first().findByText(text).click({
    force: true
  })
}

const ariaLabel = (prop) => {
  return cy.get(`[aria-label=${prop}]`)
}

const interceptSearchData = () => {
  return interceptAll('service/mgr/itemUnitTransform/list?*', interceptSearchData.name + new Date().getTime())
}

const inputNumber = (number) => {
  getOption().first().find('.el-input__inner').clear({
    force: true
  }).type(number, {
    force: true
  })
}

const selectOption = () => {
  return cy.get('.el-form:visible').last()
}

const searchConditions = (itemName, keyword, isFormula, area, tag) => {
  if (itemName) {
    selectElform('acceptItems').click()
    activeSelect(itemName)
  
  }
  if (keyword) {
    selectElform('labName').type(keyword)
  }
  if (isFormula) {
    selectElform('isFormula').click()
    activeSelect(isFormula)
  }
  if (area) {
    selectOption().find('[type = radio]').first().check({
      force: true
    })
    selectOption().findAllByPlaceholderText('请选择省').click({
      force:true
    })
    activeSelect(area)
  }
  if (tag) {
    selectOption().find('[type = radio]').last().check({
      force: true
    })
    cy.wait(2000)
    selectOption().findAllByPlaceholderText('请选择实验室标签').click({
      force:true
    })
    activeSelect(tag)
  }
}

const resetSearchCondition = () => {
  selectOption().findByText('重置').click({
    force:true
  })
  cy.get('.el-tag__close.el-icon-close:visible').click({
    force:true
  })
}

const paramMap = {
  itemName: {
    type: 1
  },
  labName: {
    type: 2
  },
  isFormula: {
    type: 3
  },
  area: {
    type: 4
  },
  tag: {
    type: 5
  }
}

const validData = (checkData) => {
  waitIntercept(interceptSearchData, () => {
    clickSearch()
  }, data => {
    console.log(data);
    if (data.data.length !== 0) {
      for (const key in checkData) {
        const context = paramMap[key]
        if (context.type === 1) {
          data.data.forEach(eachItem => expect(eachItem.itemName).to.eq(checkData[key]))
        } else if (context.type === 2) {
          data.data.forEach(eachItem => expect(eachItem.labName).to.eq(checkData[key]))
        } else if (context.type === 3) {
          if (checkData[key] === '已配置') {
            data.data.forEach(eachItem => expect(eachItem.value).not.to.be.null)
          } else {
            data.data.forEach(eachItem => expect(eachItem.value).to.be.null)
          }
        } else {
          getOption().should('have.length', data.data.length)
        }
      }
    } else {
      cy.get('body').should('contain', '暂无数据')
    }
  })
}

/**
 * 单位转换设置
 */
context('结果互认设置-单位转换设置', () => {
  before(() => {
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/unit-transform')
    cy.wait(5000)
    expandSearchConditions()
  })
  context('编辑重置', () => {
    before(() => {
      expandSearchConditions()
      selectElform('isFormula').click()
      activeSelect('已配置')
    })
    it('001-编辑公式', () => {
      const labCode = 'gd18020'
      let typeNumber = parseInt(Math.random() * 1000)
      let formulaBox = 0
      const oldData = 290
      selectElform('labName').type(labCode)
      waitIntercept(interceptSearchData, () => {
        clickSearch()
      }, data => {
        getOption().should('have.length', data.data.length)
        cy.wait(2000)
        cy.get('.unit-fn').eq(formulaBox).invoke('text').then((data) => {
          let oldFormula = data
          findButtonClick('编辑')
          cy.wait(2000)
          //录入新值
          inputNumber(typeNumber)
          getOption().first().findByText('保存').click({
            force: true
          })
          //保存数据
          waitIntercept(interceptUpdateData, () => {
            findButtonClick('保存')
          }, () => {
            validSuccessMessage()
            cy.wait(5000)
          })
          cy.get('.unit-fn').eq(formulaBox).invoke('text').then((data) => {
            let newFormula = data
            expect(oldFormula).not.to.equal(newFormula)
            //将公式还原成初始状态
            findButtonClick('编辑')
            inputNumber(oldData)
            findButtonClick('保存')
          })
        })
      })
    })
    it('002-批量编辑', () => {
      let firstBox = 6
      let secondBox = 7
      let thirdBox = 8
      let formulaBox1 = 0 // 第一条数据
      let formulaBox2 = 1 // 第二条数据
      let typeNumber = parseInt(Math.random() * 1000)
      const labName = '南方医科大学顺德医院附属杏坛医院'
      selectElform('labName').clear().type(labName)
      waitIntercept(interceptSearchData, () => {
        clickSearch()
      }, () => {
        cy.wait(2000)
        /**
         * 默认单位不一致不能进行批量编辑
         */
        cy.get('[type=checkbox]').eq(firstBox).check({
          force: true
        })
        cy.get('[type=checkbox]').eq(thirdBox).check({
          force: true
        })
        cy.get('button').contains('批量编辑').click({
          force: true
        })
        validErrorMsg('所选实验室有存在单位不一致，请检查')
        cy.wait(1000)
        // 将单位不一致的数据取消勾选
        cy.get('[type=checkbox]').eq(thirdBox).uncheck({
          force: true
        })
        /**
         * 批量编辑成功
         */
        cy.get('.unit-fn').eq(formulaBox1).invoke('text').then((data) => {
          let firstOldFormula = data
          cy.get('.unit-fn').eq(formulaBox2).invoke('text').then((data) => {
            let secondOldFormula = data
            cy.get('[type=checkbox]').eq(secondBox).check({
              force: true
            })
            cy.get('button').contains('批量编辑').click({
              force: true
            })
            ariaLabel('转换公式批量设置').find('.el-input__inner').type(typeNumber, {
              force: true
            })
            waitIntercept(interceptUpdateData, () => {
              ariaLabel('转换公式批量设置').findByText('保存').click({
                force: true
              })
            }, () => {
              cy.wait(2000)
              cy.get('.unit-fn').eq(formulaBox1).invoke('text').then((data) => {
                let firstNewFormula = data
                cy.get('.unit-fn').eq(formulaBox2).invoke('text').then((secondData) => {
                  let secondNewFormula = secondData
                  // 批量编辑后的两个公式应该相等
                  expect(firstNewFormula).to.equal(secondNewFormula)
                  // 批量编辑后的公式应该与之前的公式不一致
                  expect(firstNewFormula).not.to.equal(firstOldFormula)
                  // 批量编辑后的公式应该与之前的公式不一致
                  expect(secondNewFormula).not.to.equal(secondOldFormula)
                })
              })
            })
          })
        })
      })
    })
    it('003-重置功能', () => {
      selectElform('labName').clear()
      clickSearch()
      cy.wait(2000)
      getOption().first().find('.unit-fn').invoke('text').then((formula) => {
        findButtonClick('编辑')
        cy.wait(2000)
        cy.wait(500)
        inputNumber(123)
        findButtonClick('重置')
        findButtonClick('保存')
        validSuccessMessage()
        cy.wait(2000)
        getOption().first().find('.unit-fn').invoke('text').then((newFormula) => {
          expect(formula).to.eq(newFormula)
        })
      })
    })
  })
  context('筛选条件', () => {
    const itemName = '钾'
    const labName = '佛山市南海区人民医院'
    before(() => {
      resetSearchCondition()
    })
    it('互认项目查询', () => {
      cy.wait(2000)
      searchConditions(itemName)
      validData({itemName})
      resetSearchCondition()
      cy.wait(2000)
    })
    it('实验室名称查询', () => {
      searchConditions(null,labName)
      validData({labName})
      resetSearchCondition()
      cy.wait(2000)
    })
    it('配置公式(已配置)', () => {
      const isFormula = '已配置'
      searchConditions(null,null,isFormula)
      validData({isFormula})
      resetSearchCondition()
      cy.wait(2000)
    })
    it('配置公式(未配置)', () => {
      const isFormula = '未配置'
      searchConditions(null,null,isFormula)
      validData({isFormula})
      resetSearchCondition()
      cy.wait(2000)
    })
    it('地区查询', () => {
      const area = '北京市'
      searchConditions(null,null,null,area)
      validData({area})
      resetSearchCondition()
      cy.wait(2000)
    })
    it('标签查询', () => {
      const tag = '公立'
      searchConditions(null,null,null,null,tag)
      validData({tag})
      resetSearchCondition()
    })
  })
})