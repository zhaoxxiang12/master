import { formatPrecision } from '../../shared/util'
import { clickListener } from '../common/event'
import { validatePdfFile } from '../common/file'
import { interceptGet, waitIntercept } from '../common/http'
import { activeSelect } from '../common/select'
import { clickSearch, inputSearch, clickHeaderCell, checkRadio, openProvince, clickTool, openTagSelect, checkDisplayFields, validCclChecked, validPrint, validCellText, BUTTON_PDF, selectFirstCcl } from './effect-query'

context('参与实验室情况', () => {
  const provinceName = '广东省'
  const pdfFile = '参与实验室情况.pdf'
  const cclName = '系统顶级管理单位'
  const keywords = '第一'
  const textChecked = '√'
  const tbodySelector = '.table-line tbody'
  const headerTexts = ['参与情况', '参与', '申请中', '未参与', '标签未配置']
  
  const queryPartake = () => {
    return interceptGet('service/mgr/evaReport/joinLab?*', queryPartake.name)
  }
  
  const waitQuery = (cb) => {
    waitIntercept(queryPartake, clickSearch, cb)
  }
  const getCellText = (data) => {
    const { applyNum, applyRate, joinNum, joinRtate, noJoinNum, noJoinRate, unTag, unTagRate } = data

    const formatCell = (num, rate) => {
      const percent = formatPrecision(rate * 100)
      return `${num}(${percent}%)`
    }

    const applyText = formatCell(applyNum, applyRate)
    const joinText = formatCell(joinNum, joinRtate)
    const noJoinText = formatCell(noJoinNum, noJoinRate)
    const unTagText = formatCell(unTag, unTagRate)
    const totalRate = applyRate + joinRtate + noJoinRate + unTagRate
    return {
      totalRate,
      applyText,
      joinText,
      noJoinText,
      unTagText
    }
  }
  const validData = (data) => {
    const trEl = `${tbodySelector} tr`
    const { applyText, totalRate, joinText, noJoinText, unTagText } = getCellText(data)
    
    cy.get(trEl).should('have.length', 1)
    expect(Math.round(totalRate), '总参与率为100').to.equal(1)
    validCellText(1, joinText)
    validCellText(2, applyText)
    validCellText(3, noJoinText)
    validCellText(4, unTagText)
  }
  before(() => {
    cy.visitPage('report-effect-partake')
  })
  it('001-默认选中管理机构且不查询', () => {
    validCclChecked()
  })

  context(`地区为${provinceName}`, () => {
    let result
    before(() => {
      checkRadio(0)
      openProvince()
      activeSelect(provinceName)
    })

    beforeEach(() => {
      waitQuery(data => {
        result = data
      })
    })

    it('002-校验地区参与数据', () => {
      validData(result)
    })
    it('003-点击表头列，显示实验室详情数据', () => {
      headerTexts.forEach((text, columnIndex) => {
        if (columnIndex) {
          clickHeaderCell(text)
          const checkCount = result.details.filter(item => item.type === columnIndex).length

          cy.get(tbodySelector)
            .within($body => {
              // expect($body.find('tr').length).to.equal(checkCount + 1)
              cy.get('tr').should('have.length', checkCount + 1)
              cy.get('tr')
                .eq(1)
                .find('td')
                .eq(columnIndex)
                .should('have.text', textChecked)
            })
        }
      })
      
    })
    it('004-实验室搜索', () => {
      // 按名称
      inputSearch(keywords)

      const labs = result.details.filter(item => item.labName.indexOf(keywords) > -1)

      labs.forEach(item => {
        cy.get(tbodySelector)
          .findByText(item.labName)
          .parent()
          .find('td')
          .eq(item.type)
          .should('have.text', textChecked)
      })

      // 按编码
      const lab = result.details[0]
      inputSearch(lab.labCode)
      cy.get(tbodySelector)
        .find('tr')
        .should('have.length', 2)
        .eq(1)
        .find('td')
        .contains(lab.labName)

      // 清空
      inputSearch('')

      cy.get(tbodySelector)
        .find('tr')
        .should('have.length', 1)
    })
    it('005-显示字段设置', () => {
      checkDisplayFields(headerTexts, text => {
        cy.get('.table-line thead tr:first').find('.cell').should('not.equal', text)
      })
      
      // 全部显示
      checkDisplayFields(headerTexts)
    })
    it('006-打印预览', () => {
      validPrint()
    })
    
  })

  context(`管理机构选中${cclName}`, () => {
    it(`007-校验${cclName}参与数据`, () => {
      checkRadio(1)
      selectFirstCcl()
      
      waitQuery(data => {
        validData(data)
      })
    })
  })

  context('实验室标签，根据参与情况查询', () => {
    before(() => {
      checkRadio(2)
      openTagSelect()
    })

    beforeEach(() => {
      let openSelect = true
      cy.get('.ql-search__header .el-form-item')
        .eq(5)
        .within(($el) => {
          if ($el.find('.el-tag').length) {
            cy.log('have tag')
            cy.get('.el-tag__close').click()
            openSelect = false
          }
        })
        .then(() => {
          if (!openSelect) {
            openTagSelect()
          }
        })
    })

    it(`008-参与情况只选择${headerTexts[2]}`, () => {
      activeSelect(headerTexts[2])
      waitQuery(data => {
        const emptyText = '0(0%)'
        const { applyText, joinText, noJoinText, unTagText } = getCellText(data)

        expect(joinText).to.equal(emptyText)
        expect(noJoinText).to.equal(emptyText)
        expect(unTagText).to.equal(emptyText)
        expect(applyText).to.exist
      })
    })

    it(`009-参与情况只选择${headerTexts[3]}`, () => {
      activeSelect(headerTexts[3])
      waitQuery(data => {
        const emptyText = '0(0%)'
        const { applyText, joinText, noJoinText, unTagText } = getCellText(data)

        expect(applyText).to.equal(emptyText)
        expect(joinText).to.equal(emptyText)
        expect(unTagText).to.equal(emptyText)
        expect(noJoinText).to.exist
      })
    })
  })

  context('导出文件', () => {
    it(`010-${BUTTON_PDF}`, () => {
      checkRadio(0)
      let checked = true
      cy.get('.ql-search__header .el-form-item')
        .eq(4)
        .within(($el) => {
          checked = $el.find('.el-tag').length > 0
        })
        .then(() => {
          if (!checked) {
            openProvince()
            activeSelect(provinceName)
          }
        })
      waitQuery(result => {
        const { applyText, joinText, noJoinText, unTagText } = getCellText(result)
        clickListener(() => clickTool(BUTTON_PDF))
        validatePdfFile(pdfFile, (data) => {
          expect(data.text, '表头文本').to.contains(headerTexts.join(''))
          expect(data.text, headerTexts[1]).to.contains(joinText)
          expect(data.text, headerTexts[2]).to.contains(applyText)
          expect(data.text, headerTexts[3]).to.contains(noJoinText)
          expect(data.text, headerTexts[4]).to.contains(unTagText)
          expect(data.numpages, '总页数').to.equal(1)
        })
      })
      
    })
  })
  
})