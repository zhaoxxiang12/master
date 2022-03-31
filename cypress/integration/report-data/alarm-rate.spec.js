import { changeCcl, waitQueryIntercept, checkRegion, checkSpec, activeSomeSpec, regionText, specText, shCclName, specName, itemName, queryYear, startMonth, tagName, buttonPushScreen, buttonPreview, interceptCcl, interceptSpec, reportMonth, pushToScreen } from './stats-query'
import { getUrlQuery } from '../../shared/util'
import { activeSelect } from '../common/select'
import { interceptAll, waitIntercept, waitRequest } from '../common/http'
import { queryCclReq } from '../api/ccl'
import { closeScreen } from '../common/screen'

/**
 * 告警及反馈统计页面
 * */
context('告警及反馈统计页面', () => {
  const queryAlarm = () => {
    return interceptAll('service/mgr/reportsummary/reportAlarm?*', queryAlarm.name)
  }
  const weekText = '最近一周'
  const alarmType = '告警类型'
  const feedbackStatus = '反馈状态'
  const waitQuery = (cb) => {
    waitRequest({
      intercept: queryAlarm,
      onBefore: () => {
        cy.get('.ql-search__btns button').contains('搜索').click({
          force: true
        })
      },
      onSuccess: cb,
      waitOptions: {
        timeout: 30000
      }
    })
  }
  const openSelect = (text) => {
    cy.get('.form-group-extend')
      .find('label')
      .contains(text)
      .parent()
      .find('.el-input')
      .click({
        force: true
      })
  }
  const showEmpty = () => {
    cy.get('.report-data-empty').should('have.length', 1)
  }
  const validItemResult = (text) => {
    // activeSelect(text);

    waitQuery(data => {
      if (data.labs.length) {
        const labData = data.labs[0]
        const itemData = labData.itemDTOS[0]

        expect(itemData.pecialsName).to.include(text)
        // expect(labData.labTags).to.deep.equal([])
        expect(labData.labCcls).to.deep.equal([])
      } else {
        showEmpty()
      }
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
      if (data.labs.length) {
        const labData = data.labs[0]
        expect(labData.labCcls).to.deep.equal([currCclName])
      } else {
        showEmpty()
      }
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
      if (data.labs.length) {
        const labData = data.labs[0]
        expect(labData.labTags).to.deep.equal([tagName])
      } else {
        showEmpty()
      }
    })
  }

  let currCclName

  before(() => {
    waitIntercept(queryCclReq, () => {
      cy.visitPage('alarm-rate')
    }, data => {
      currCclName = data[0].cclName
    })
    
    // waitIntercept(queryAlarm, data => {
    //   cy.get('.alarm-report').should('exist')
    // })
  })

  context('查询前置条件', () => {
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
        const { spec, acceptPlan, labTag, cclCodes, areaIds, startDate, endDate, iqcCcl, type, status } = getUrlQuery(request.url)

        expect(spec).equal('')
        expect(acceptPlan).to.exist
        expect(type).to.exist
        expect(status).to.exist
        expect(labTag).equal('')
        expect(cclCodes).equal('')
        expect(areaIds).to.exist
        expect(startDate).to.exist
        expect(endDate).to.exist
        expect(iqcCcl).to.exist
        expect(data.labs).to.not.an('undefined')
        if (!data.labs.length) {
          showEmpty()
        }
      })
    })

    context(`认可专业选择${specName}，日期选择${weekText}`, () => {
      before(() => {
        activeSomeSpec(specName)

        cy.get('.form-group-date .el-date-editor--daterange')
          .click({
            force: true
          })

        const $picker = cy.get('.el-date-range-picker:visible')
        $picker.should('exist')
        $picker.findByText(weekText)
          .click({
            force: true
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
        checkSpec(0)
        activeSomeSpec(specName)
        validCclResult(checkRegion)

        validTagResult(checkRegion)

      })

      it(`008-${alarmType}`, () => {
        openSelect(alarmType)

        activeSelect('未上报')

        waitQuery((data) => {
          expect(data.labs).to.exist
          // 重置
          openSelect(alarmType)
          activeSelect('全部')
        })

      })

      it(`009-${feedbackStatus}`, () => {
        openSelect(feedbackStatus)

        activeSelect('已知晓')

        waitQuery((data) => {
          expect(data.labs).to.exist
          // 重置
          openSelect(feedbackStatus)
          activeSelect('未读')
        })

      })

      // 图表点击不到，先注释掉
      // context('点击图表，获取详情表格', () => {
      //   before(() => {
      //     checkSpec(0)
      //     activeSomeSpec(specName)
      //     checkRegion(0)
      //     waitQuery(data => {
      //       const $bar = cy.get('.chart-table-main .ve-bar canvas')
      //       expect(data.labs.length).to.gt(0)
      //       $bar.should('have.length', 1)
      //       $bar.click(
      //         310,
      //         90,
      //         // {
      //         //   force: true,
      //         // }
      //       )

      //       cy.get('.stats-report-table:visible').should('exist')
      //     })
      //   })
      //   beforeEach(() => {
      //     cy.get('.stats-report-table .el-table__fixed .el-table__fixed-header-wrapper .lab-name-sh').as('customCell')
      //     cy.get('.stats-report-table .el-table__fixed .el-table__fixed-body-wrapper .el-table__body tbody').as('detailsBody')
      //   })

      //   it(`010-实验室搜索`, () => {
      //     const keyword = '第一'
      //     cy.get('@customCell')
      //       .findByPlaceholderText('输入实验室名搜索')
      //       .type(keyword)

      //     const $body =  cy.get('.stats-report-table .el-table__fixed-body-wrapper .el-table__body tbody')
      //     $body.find('.cell').should('contain.text', keyword)

      //   })
      // })

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
  })
})