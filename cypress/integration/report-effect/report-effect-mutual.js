import '@testing-library/cypress/add-commands'
import { LAB_TAG_PUBLIC, PROVINCE_GD } from '../../shared/constants'
import { BUTTON_EXCEL, BUTTON_PDF, checkRadio, clickSearch, clickTool, findCell, openProvince, openTagSelect, validCclChecked, validCclSelect, validFirstDisplayField, validMonthRange, validPrint } from '../../shared/effect-query'
import { activeSelect, clickListener, interceptAll, selectDateMonth, selectDateMonthRange, validatePdfFile, validExcelFile, waitRequest } from '../../shared/util'

// 表格的详细数据不做校验，比对平台已做校验
context('互认合格情况', () => {
  const provinceName = PROVINCE_GD
  const tagName = LAB_TAG_PUBLIC
  const defaultCommandTimeout = 6000
  const inputSearch = (text, placeholder) => {
    const $input = cy.get('.effect-mutual-module__dim').findByPlaceholderText(placeholder)

    $input.clear({
      timeout: defaultCommandTimeout,
      force: true
    })
    if (text) {
      $input.type(text, {
        timeout: defaultCommandTimeout
      })
    }
  }
  const checkViewWay = (index) => {
    cy.get('.effect-mutual-module__dim')
      .find('.el-radio')
      .eq(index)
      .click({
        force: true
      })
  }
  const itemSearch = (text) => {
    inputSearch(text, '请输入项目名称')
  }
  const labSearch = (text) => {
    inputSearch(text, '请输入实验室名称')
  }

  /**
   * 验证按项目查看的查询
   */
  const validQueryByItem = () => {
    expect(result).to.exist
    cy.get('.table-line tbody tr', { timeout: defaultCommandTimeout })
      .should('have.length.gt', result.length)
  }

  const validQueryByLab = () => {
    expect(result).to.exist
    cy.get('.table-line tbody tr', { timeout: defaultCommandTimeout })
      .should('have.length', result.length)
  }
  
  const findItemCell = (rowIndex) => findCell(rowIndex, 1)
  const findLabCell = (rowIndex) => findCell(rowIndex, 0)
  const queryMutual = () => {
    return interceptAll('service/mgr/evaReport/itemRecogQualified?*', queryMutual.name)
  }
  let result
  const waitOptions = {
    timeout: 15000
  }
  const waitQuery = (cb, isClickSearch = false) => {
    const options = {
      intercept: queryMutual,
      waitOptions,
      onBefore: null,
      onSuccess: data => {
        result = data
        cb && cb(data)
      }
    }
    if (isClickSearch) {
      options.onBefore = clickSearch
    }
    waitRequest(options)
  }
  before(() => {
    cy.visitPage('report-effect-mutual')
  })

  context('默认选中管理机构', () => {
    before(() => {
      waitQuery()
    })

    it('001-默认选中管理机构，有加载数据', () => {
      validCclChecked()
      validCclSelect()
      validQueryByItem()
    })

    it('002-默认查询上一个月', () => {
      validMonthRange()
    })

    context('按互认项目查看', () => {
      it('003-按专业项目分组', () => {
        cy.get('.effect-mutual-module__dim')
          .find('.el-radio:first')
          .should('have.class', 'is-checked')
  
        const firstItemName = result[0].itemName
  
        findItemCell(0).should('have.text', firstItemName)
        findItemCell(1).find('span').should('have.class', 'hide')
      })

      it('004-输入项目名称进行模糊查询', () => {
        const itemName = '钾'
        itemSearch(itemName)
        findItemCell(0).should('have.text', itemName)
        itemSearch(null)
      })

      it('005-显示字段设置', () => {
        validFirstDisplayField()
      })

      it('006-打印预览', () => {
        validPrint()
      })

      it(`007-${BUTTON_EXCEL}`, () => {
        validQueryByItem()

        clickTool(BUTTON_EXCEL)
        validExcelFile('互认合格情况报表-按项目.xlsx', data => {
          expect(data.length).to.be.gt(result.length)
          const headerRow1 = data[0]
          const headerRow2 = data[1]
          const rowGroup = data[2]
          const rowLab = data[3]
          const firstLab = result[0]

          // 只是简单验证是否按项目分组
          expect(headerRow1[0]).to.equal('互认专业')
          expect(headerRow1[1]).to.equal('项目')
          expect(headerRow2[0]).to.equal(null)
          expect(rowGroup[0]).to.equal(firstLab.typeName)
          expect(rowGroup[1]).to.equal(firstLab.itemName)
          expect(rowGroup[3]).to.not.equal(firstLab.labName)
          expect(rowLab[3]).to.equal(firstLab.labName)
        })
      })

      it(`008-${BUTTON_PDF}`, () => {
        validQueryByItem()
        clickListener(() => clickTool(BUTTON_PDF), 50000)
        validatePdfFile('互认合格情况报表.pdf', data => {
          // 文件太大，验证文本会白屏，简单验证下 numpages
          expect(data.numpages).to.be.gt(0)
          // const firstLab = result[0]
          // const text = data.text.slice(0, 250)
          // expect(text).to.be.contains(firstLab.typeName)
          // expect(data.text).to.be.contains(firstLab.itemName)
          // expect(data.text).to.be.contains(firstLab.labName)
        }, 30000)
      })
    })

    context('按实验室维度进行查看', () => {
      before(() => {
        checkViewWay(1)
      })
      it('009-按实验室分组', () => {
        const firstLabName = result[0].labName
  
        findLabCell(0)
          .should('have.text', firstLabName)
          .parent()
          .should('have.class', 'report-lab-first')

        findLabCell(1).should('be.empty')
      })
      it('010-输入实验室名称进行查询', { defaultCommandTimeout }, () => {
        const labName = '佛山市第一人民医院'
        const labCode = 'gd18001'
        const validLabName = () => {
          findLabCell(0).should('have.text', labName)
        }
        
        //输入实验室名称
        labSearch(labName)
        //断言
        validLabName()
        //输入实验室编码
        labSearch(labCode)
        validLabName()
        labSearch(null)
      })

      it('011-显示字段', () => {
        validFirstDisplayField()
      })

      it(`012-${BUTTON_EXCEL}`, () => {
        validQueryByLab()

        clickTool(BUTTON_EXCEL)
        validExcelFile('互认合格情况报表-按实验室.xlsx', data => {
          expect(data.length).to.be.gt(result.length)
          const headerRow1 = data[0]
          const headerRow2 = data[1]
          const rowLab = data[2]
          const firstLab = result[0]

          // 只是简单验证是否按实验室分组
          expect(headerRow1[0]).to.equal('实验室')
          expect(headerRow1[1]).to.equal('专业')
          expect(headerRow1[2]).to.equal('项目')
          expect(headerRow2[0]).to.equal(null)
          expect(rowLab[0]).to.equal(firstLab.labName)
          expect(rowLab[1]).to.equal(firstLab.typeName)
          expect(rowLab[2]).to.equal(firstLab.itemName)
        })
      })

      it(`013-${BUTTON_PDF}`, () => {
        validQueryByLab()
        clickListener(() => clickTool(BUTTON_PDF), 50000)
        validatePdfFile('互认合格情况报表.pdf', data => {
          expect(data.numpages).to.be.gt(0)
        }, 30000)
      })
    })
  })

  context(`切换到地区${provinceName}`, () => {
    it(`014-查询${provinceName}互认合格情况`, () => {
      checkRadio(0)
      openProvince()
      activeSelect(provinceName)
      waitQuery(() => {
        checkViewWay(0)
        validQueryByItem()
      }, true)
    })
  })

  context('切换到实验室标签', () => {
    before(() => {
      checkRadio(2)
      openTagSelect()
      activeSelect(tagName)
    })
    it(`015-查询${tagName}实验室合格情况`, () => {
      waitQuery(() => {
        checkViewWay(0)
        validQueryByItem()
      }, true)
    })
    it('016-月度范围查询', () => {
      selectDateMonthRange({
        startMonth: '2021年五月',
        endMonth: '2021年五月'
      })
      waitQuery(() => {
        checkViewWay(0)
        validQueryByItem()
      }, true)
    })
  })
})