import { LAB_FOSHAN_NAME, LAB_TAG_PUBLIC, PROVINCE_GD } from '../../shared/constants'
import { BUTTON_PDF, checkRadio, clickSearch, clickTool, findCell, openProvince, openTagSelect, validCclChecked, validCclSelect, validMonthRange, validPrint } from '../../shared/effect-query'
import { activeSelect, clickListener, closeClientAlert, interceptAll, validatePdfFile, waitIntercept, waitRequest } from '../../shared/util'

context('失控处理情况', () => {
  let result, messageDict
  const defaultCommandTimeout = 6000
  const queryRunaway = () => {
    return interceptAll('service/mgr/evaReport/outControDeal?*', queryRunaway.name)
  }
  const queryReason = () => {
    return interceptAll('service/mgr/evaReport/outControDeal/reason?*', queryReason.name)
  }
  const queryMessageDict = () => {
    return interceptAll('service/mgr/messageDict/param?*', queryMessageDict.name)
  }
  
  const waitOptions = {
    timeout: 15000
  }
  const getSomeDict = (sysDefault = false, type = 2, reasonMeasure = 1) => {
    const dictGroup = messageDict.find(item => item.sysDefault === sysDefault)
    if (dictGroup) {
      const dictItem = dictGroup.messageDictList.find(item => item.type === type && item.reasonMeasure === reasonMeasure)
      if (dictItem) {
        if (sysDefault) {
          return dictItem.value
        } else {
          return `${dictGroup.categoryName}-${dictItem.value}`
        }
      }
      return null
    }
    return null
  }
  const inputSearch = (text) => {
    const $input = cy.get('.effect__search')
      .findByPlaceholderText('实验室名称或编码')
      
    $input.clear()
    
    if (text) {
      $input.type(text)
    }
  }
  const checkViewWay = (index) => {
    cy.get('.effect__search')
      .find('.el-radio')
      .eq(index)
      .click({
        force: true
      })
  }
  const initQuery = () => {
    const intercept0 = queryMessageDict()
    const intercept1 = queryRunaway()
    cy.wait([`@${intercept0}`, `@${intercept1}`]).spread((dictData, runawayData) => {
      messageDict = dictData.response.body.data
      result = runawayData.response.body.data
    })
  }
  const validSummaryQuery = () => {
    const options = {
      intercept: queryRunaway,
      waitOptions,
      onBefore: clickSearch,
      onSuccess: data => {
        result = data
        validSummary()
      }
    }
   
    waitRequest(options)
  }
  const validSummary = () => {
    expect(result).to.exist
    cy.get('.table-line tbody tr')
      .should('have.length', result.outControDeals.length)
  }
  
  before(() => {
    cy.visitPage('report-effect-outcontrol')
  })

  context('默认选中管理机构', () => {
    before(() => {
      initQuery()
    })

    it('001-默认选中管理机构，有加载数据', () => {
      validCclChecked()
      validCclSelect()
      validSummary()
    })

    it('002-默认查询上一个月', () => {
      validMonthRange()
    })

    context('汇总数据', () => {
      it('003-汇总表格数据验证', () => {
        const someLab = result.outControDeals[0]
        findCell(0, 0).should('have.text', someLab.labName)
        findCell(0, 1).should('have.text', someLab.outControMess)
      })
      it('004-失控消息数支持排序', () => {
        const findText = (rowIndex, cb) => {
          cy.get('.table-line tbody tr').eq(rowIndex).find('td').eq(1).then($el => {
            cb(Number($el.text()))
          })
        }
        /**
         * 排序 失控消息数
         * @param {*} sortCls 
         */
        const sortOutCtrl = (sortCls) => {
          cy.get('.table-line thead th')
            .eq(1)
            .find(`.${sortCls}`)
            .click({
              force: true
            })
  
          cy.get('.table-line thead th')
            .eq(1)
            .should('have.class', sortCls)
        }

        sortOutCtrl('descending')
        findText(0, val1 => {
          findText(1, val2 => {
            expect(val1, '第一行的消息数大等于第二行').to.gte(val2)
          })
        })

        sortOutCtrl('ascending')
        findText(0, val1 => {
          findText(1, val2 => {
            expect(val1, '第一行的消息数小等于第二行').to.lte(val2)
          })
        })

      })
      it('005-实验室搜索', () => {
        const { labName, labCode } = result.outControDeals[0]

        inputSearch(labName)
        findCell(0, 0).should('contain.text', labName)

        inputSearch(labCode)
        findCell(0, 0).should('have.text', labName)

        inputSearch(null)
      })
      it('006-打印预览', () => {
        validPrint()
      })
      it(`007-${BUTTON_PDF}`, () => {
        clickListener(() => clickTool(BUTTON_PDF))
        validatePdfFile('失控处理情况报表.pdf', data => {
          if (result.outControDeals.length) {
            expect(data.numpages).to.gt(0)
          }
        })
      })
      
    })

    context('按实验室查看', () => {
      before(() => {
        checkViewWay(1)
      })
      it('008-表头显示仪器字典项', () => {
        const text1 = getSomeDict()
        const text2 = getSomeDict(true, 3)
        // 再判断一次，可能没关闭掉，且等 body 出现再断言表头
        closeClientAlert()
        cy.get('.table-line tbody tr').should('exist')

        cy.get('.table-line thead tr')
          .eq(1)
          .should('exist')
          .within(() => {
            cy.get('th:first')
              .should('have.text', text1)

            cy.get('th.left-border')
              .should('have.text', text2)
          })
          
      })
      it('009-简单验证是否有失控数', () => {
        const labData = result.outControDeals[0]
        findCell(0, 0).should('have.text', labData.labName)

        const reasonItem = labData.outControl.reason.find(item => item.count > 0)
        if (reasonItem) {
          const texts = []
          cy.get('.table-line tbody tr:first')
            .within(() => {
              cy.get('td').each(($td) => {
                texts.push(Number($td.text()))
              })
            }).then(() => {
              expect(texts.includes(reasonItem.count)).to.equal(true)
            })
        }
      })
    })

    context('按原因查看', () => {
      it('010-选择一个原因，自动查询', () => {
        checkViewWay(2)

        cy.get('.effect__search')
          .find('.el-select')
          .click({
            force: true
          })

        const optionText = getSomeDict()
        
        waitIntercept(queryReason, () => {
          activeSelect(optionText)
        }, data => {
          findCell(0, 1).should('have.text', data.total)
          findCell(1, 2).should('have.text', data.labList[0].labName)
          // 切回汇总数据
          checkViewWay(0)
        })
      })
    })
    
  })

  context(`切换到地区${PROVINCE_GD}`, () => {
    it(`011-查询${PROVINCE_GD}失控处理情况`, () => {
      checkRadio(0)
      openProvince()
      activeSelect(PROVINCE_GD)
      validSummaryQuery()
    })
  })

  context('切换到实验室标签', () => {
    it(`012-查询${LAB_TAG_PUBLIC}失控处理情况`, () => {
      checkRadio(2)
      openTagSelect()
      activeSelect(LAB_TAG_PUBLIC)
      validSummaryQuery()
    })
  })
})