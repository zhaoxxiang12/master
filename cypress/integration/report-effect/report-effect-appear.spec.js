import { checkDisplayFields, checkRadio, clickSearch, clickTool, inputSearch, openProvince, openTagSelect, queryMgrTree, validCclChecked, validCclSelect, validCellText, validMonthRange, validPrint, validRowsLength } from './effect-query'

import { changeCcl, shCclName, tagName } from '../report-data/stats-query'
import { validatePdfFile } from '../common/file'
import { clickListener } from '../common/event'
import { interceptGet, waitIntercept } from '../common/http'
import { activeSelect } from '../common/select'

describe('实验室上报情况', () => {
  const pdfFile = '实验室上报情况报表.pdf'
  const headerTexts = [
    '实验室',
    '工作日上报率',
    '总上报天数',
    '规定项目上报数',
    '规定项目上报记录数'
  ]
  const provinceName = '广东省'
  const tbodySelector = '.table-line tbody'
  const queryApear = () => {
    return interceptGet('service/mgr/evaReport/labReport?*', 'queryApear')
  }
  let result
  const waitQuery = (cb) => {
    waitIntercept(queryApear, data => {
      result = data
      cb && cb(data)
    })
  }

  const validQuery = (tableData = result) => {
    expect(tableData).to.exist
    validRowsLength(tableData.detail.length)
  }

  const getFirstRow = (data) => {
    const {workDayRepRate, labName, totalRepDay, ruleLabRepItem, ruleRepItemRecord } = data.detail[0]
    const workRate = workDayRepRate * 100
    const workText = workRate === 0 ? '0%' : `${workRate.toFixed(2)}%`

    return {
      workText,
      labName,
      totalRepDay,
      ruleLabRepItem,
      ruleRepItemRecord
    }
  }

  const validData = (data) => {
    const { labName, workText, totalRepDay, ruleLabRepItem, ruleRepItemRecord } = getFirstRow(data)
    validCellText(0, labName)
    validCellText(1, workText)
    validCellText(2, totalRepDay)
    validCellText(3, ruleLabRepItem)
    validCellText(4, ruleRepItemRecord)

    // 上报天数和上报记录数为 0 时，工作日上报率也为 0
    const rowIndex1 = data.detail.findIndex(item => item.totalRepDay === 0)
    const rowIndex2 = data.detail.findIndex(item => item.ruleRepItemRecord === 0)
    if (rowIndex1 > -1) {
      validCellText(1, '0%', rowIndex1)
    }
    if (rowIndex2 > -1) {
      validCellText(1, '0%', rowIndex2)
    }
  }
  before(() => {
    waitIntercept(queryMgrTree, () => {
      cy.visitPage('report-effect-appear')
    }, () => {

    })
  })
  
  context('默认选中管理机构', () => {
    before(() => {
      waitQuery()
    })

    it('001-默认选中管理机构，有加载数据', () => {
      validCclChecked()
      validCclSelect()
      validQuery()
    })

    it('002-校验表格数据', () => {
      validData(result)
    })
    it('003-默认查询上一个月的数据', () => {
      validMonthRange()
    })
    it('004-实验室搜索', () => {
      const keywords = '第一'
      inputSearch(keywords)

      const labs = result.detail.filter(item => item.labName.indexOf(keywords) > -1)

      labs.forEach(item => {
        cy.get(tbodySelector)
          .findByText(item.labName)
          .should('exist')
      })

      // 按编码
      const lab = result.detail[0]
      inputSearch(lab.labCode)

      validRowsLength(1)
        .findByText(lab.labName)
        .should('exist')

      // 清空
      inputSearch('')
      validRowsLength(result.detail.length)
    })

    it('005-显示字段设置', () => {
      checkDisplayFields(headerTexts, (text, index) => {
        cy.get('.table-line thead tr:first').find('.cell').should('not.contain.text', text)
      })
      
      // 全部显示
      checkDisplayFields(headerTexts)
    })
    it('006-打印预览', () => {
      validPrint()
    })
    it('007-表格列支持点击排序', () => {
      const findText = (rowIndex, cb) => {
        cy.get('.table-line tbody tr').eq(rowIndex).find('td').eq(1).then($el => {
          cb(Number($el.text().replace('%', '')))
        })
      }

      const sortWorkRate = (sortCls) => {
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

      // 第二列 工作日上报率 降序
      sortWorkRate('descending')

      findText(0, val1 => {
        findText(1, val2 => {
          expect(val1, '第一行的工作日上报率大等于第二行').to.gte(val2)
        })
      })

      // 第二列 工作日上报率 升序
      sortWorkRate('ascending')

      findText(0, val1 => {
        findText(1, val2 => {
          expect(val1, '第一行的工作日上报率小等于第二行').to.lte(val2)
        })
      })
      
    })
  })

  context(`地区为${provinceName}`, () => {
    it(`008-查询${provinceName}上报情况`, () => {
      checkRadio(0)
      openProvince()
      activeSelect(provinceName)
      waitIntercept(queryApear, clickSearch, data => {
        validQuery(data)
      })
      
    })
  })

  context(`实验室标签选择${tagName}`, () => {
    it(`009-查询${tagName}实验室上报情况`, () => {
      checkRadio(2)
      openTagSelect()
      activeSelect(tagName)
      waitIntercept(queryApear, clickSearch, data => {
        validQuery(data)
      })
    })
  })

  context(`质控主管切到${shCclName}`, () => {
    it(`010-质控主管切到${shCclName}, 自动查询数据`, () => {
      waitIntercept(queryApear, () => {
        changeCcl(shCclName)
      }, validQuery)
    })
  })

  context('导出PDF', () => {
    it('011-导出PDF', () => {
      waitIntercept(queryApear, clickSearch, tableData => {
        clickListener(() => clickTool('导出PDF'), 10000)
        validatePdfFile(pdfFile, (data) => {
          expect(data.text, '表头文本').to.contains(headerTexts.join(''))
          if (tableData.detail.length) {
            const { labName, workText } = getFirstRow(tableData)
            expect(data.numpages, '总页数').to.gt(0)
            expect(data.text).to.contains(labName)
            expect(data.text).to.contains(workText)
          }
        })
      })
    })
  })
})