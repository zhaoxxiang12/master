import '@testing-library/cypress/add-commands'
import { getUrlQuery } from '../../shared/util'
import { selectDateMonthRange } from '../common/date'
import { changeCcl, waitQueryIntercept, checkRegion, checkSpec, activeSomeSpec, regionText, specText, shCclName, specName, itemName, queryYear, startMonth, tagName, buttonPushScreen, buttonPreview, interceptCcl, interceptSpec, reportMonth, pushToScreen } from './stats-query'
import { activeSelect } from '../common/select'
import { interceptAll, waitIntercept } from '../common/http'
import { closeScreen } from '../common/screen'
/**
 * CV合格率页面
 * */
describe('CV合格率页面', () => {
  const queryCv = () => {
    return interceptAll('service/mgr/reportsummary/cvPass?*', 'queryCv')
  }

  const waitQuery = (cb) => {
    waitQueryIntercept(queryCv, cb)
  }
  let currCclName
  before(() => {
    waitIntercept(interceptCcl, () => {
      cy.visitPage('cvqualified-rate')
    }, data => {
      currCclName = data[0].cclName
    })
   
    // waitIntercept(queryCv, data => {
    //   cy.get('.stats-report').should('exist')
    // })
  })
  
  context('筛选条件', () => {
    const validItemResult = (text) => {
      // cy.elSelectActive(text);

      waitQuery(data => {
        const labData = data.labs[0]
        const itemData = labData.itemDTOS[0]
        
        expect(itemData.pecialsName).to.include(text)
        expect(itemData.values[0].report_month).to.equal(reportMonth)
        expect(labData.labTags).to.deep.equal([])
        expect(labData.labCcls).to.deep.equal([])
      })
    }

    const validCclResult = (checkFn) => {
      checkFn(1)
      cy.get('.form-group-region')
        .findByPlaceholderText('请选择管理机构')
        .click({
          force: true
        })
      
      cy.get('.el-select-popover:visible')
        .find('.tree-dept')
        .find('[type="checkbox"]')
        .first()
        .click({
          force: true
        })
      
      waitQuery(data => {
        const labData = data.labs[0]
        expect(labData.labCcls).to.deep.equal([currCclName])
      })    
    }

    const validTagResult = (checkFn) => {
      checkFn(2)
      cy.get('.form-group-region')
        .findByPlaceholderText('请选择实验室标签')
        .click({
          force: true
        })
      
      activeSelect(tagName)
      
      waitQuery(data => {
        const labData = data.labs[0]
        expect(labData.labTags).to.deep.equal([tagName])
      })    
    }

    beforeEach(() => {
      cy.get('.stats-search').as('searchForm')
      cy.get('@searchForm').find('.form-group-spec').as('groupSpec')
    })
    
    it(`001-${specText.join('/')}是互斥的`, () => {
      const $groupSpec = cy.get('@groupSpec')
      const $radioLabel = $groupSpec.find('.el-radio__label')
      $radioLabel.should('have.length', 2)
      $radioLabel.each(($el, index) => {
        expect($el.text()).contains(specText[index])
      })
    })
    it('002-认可专业与认可项目，下拉支持多选', () => {
      const $groupSpec = cy.get('@groupSpec')

      $groupSpec.find('.el-select__tags').click({
        force: true
      }).then(() => {
        const $dropdown = cy.get('.el-select-dropdown.is-multiple:visible')
        
        $dropdown.should('have.length', 1)
        $dropdown.find('.el-select-dropdown__item').eq(1).should('have.class', 'selected')
      })
    })
    
    it(`003-${regionText.join('/')}互斥`, () => {
      const $groupRegion = cy.get('@searchForm').find('.form-group-region')
      const $radioLabel = $groupRegion.find('.el-radio__label')
      $radioLabel.should('have.length', 3)
      $radioLabel.each(($el, index) => {
        expect($el.text()).contains(regionText[index])
      })
    })
    it('004-点击搜索，接口校验', () => {
      waitQuery((data, request) => {
        const { spec, acceptPlan, labTag, cclCodes, areaIds, startDate, endDate, iqcCcl } = getUrlQuery(request.url)

        expect(spec).equal('')
        expect(acceptPlan).to.exist
        expect(labTag).equal('')
        expect(cclCodes).equal('')
        expect(areaIds).to.exist
        expect(startDate).to.exist
        expect(endDate).to.exist
        expect(iqcCcl).to.exist
        expect(data.labs).to.exist
        if (!data.labs.length) {
          cy.get('.report-data-empty').should('have.length', 1)
        }
      })
    })

    context(`认可专业选择${specName}，日期选择${queryYear}年${startMonth}-${startMonth}`, () => {
      before(() => {
        activeSomeSpec(specName)
        selectDateMonthRange({
          label: '日期',
          startMonth: '2020年五月',
          endMonth: '2020年五月'
        })
      })

      it('005-返回的认可专业和日期校验', () => {
        validItemResult(specName)
      })
  
      it(`006-互认项目选择${itemName}，校验返回的项目`, () => {
        checkSpec(1)

        cy.get('.form-group-spec .spec-select')
          .eq(1)
          .findByPlaceholderText('请选择互认项目')
          .click({
            force: true
          })
        activeSelect(itemName)
        validItemResult(itemName)
      })
  
      it('007-切换到管理机构或实验室标签', () => {
        activeSomeSpec(specName)
        
        validCclResult(checkRegion)
  
        validTagResult(checkRegion)
  
      })

      context.skip('点击图表，获取详情表格', () => {
        before(() => {
          checkSpec(0)
          activeSomeSpec(specName)
          checkRegion(0)
          waitQuery(data => {
            cy.wait(5000)
            const $bar = cy.get('.chart-table-main .ve-bar canvas')

            $bar.should('have.length', 1)
            $bar.click(100,100,{
              force:true
            })

            cy.get('.stats-report-table').should('exist')
          })
        })
        beforeEach(() => {
          cy.get('.stats-report-table .el-table__fixed .el-table__fixed-header-wrapper .lab-name-sh').as('customCell')
          cy.get('.stats-report-table .el-table__fixed .el-table__fixed-body-wrapper .el-table__body tbody').as('detailsBody')
        })
        it('008-实验室搜索', () => {
          const keyword = '第一'
          cy.get('@customCell')
            .findByPlaceholderText('输入实验室名搜索')
            .type(keyword, {
              force:true
            })

          const $body =  cy.get('.stats-report-table .el-table__fixed-body-wrapper .el-table__body tbody')
          $body.find('.cell').should('contain.text', keyword)
          
        })

        it('009-项目搜索', () => {
          const keyword = '钾'

          cy.get('@customCell')
            .eq(1)
            .findByPlaceholderText('输入项目名搜索')
            .type(keyword)
          
          cy.get('@detailsBody').find('tr').click({
            force: true,
            multiple: true
          })

          cy.get('@detailsBody').find('.cell').should('contain.text', keyword)
        })
      })
    })
  })

  context(`质控主管单位，切到${shCclName}`, () => {
    it('010-重置认可专业，默认选中后端返回的第一个专业', () => {
      waitIntercept(interceptSpec, () => {
        changeCcl(shCclName)
      }, data => {
        const defaultSpecName = data[0].tagName

        cy.get('.form-group-spec .el-select__tags-text')
          .should('exist')
          .and('contain.text', defaultSpecName)
      })
    })
    it('011-是否重新查询', () => {
      waitQuery(data => {
        expect(data.labs).to.be.exist
      })
    })
  })

  context('额外操作', () => {

    it(`012-${buttonPreview}`, () => {
      waitQuery(() => {
        cy.get('button')
          .contains(buttonPreview)
          .click({
            force: true
          })

        const $splitviewItem = cy.get('.ql-splitview__item')
        $splitviewItem.should('have.length', 1)
        $splitviewItem.find('canvas').should('have.length', 1)
        // cy.get('.ql-splitview__top').trigger('mouseover')
       closeScreen()
      })
    })

    it(`013-${buttonPushScreen}`, () => {
      pushToScreen((title, screenData, request) => {
        expect(title).to.equal(screenData.title)
        expect(request.body.params).to.equal(screenData.params)
      })
    })
  })
  
})