import dayjs from 'dayjs'
import { LAB_TAG_PUBLIC, PROVINCE_GD } from '../../shared/constants'
import { selectDateMonthRange } from '../common/date'
import { clickListener } from '../common/event'
import { validatePdfFile } from '../common/file'
import { interceptAll, waitIntercept } from '../common/http'
import { loginMgr, loginMgrWithGdccl } from '../common/login'
import { validErrorMsg } from '../common/message'
import { activeSelect } from '../common/select'
import { findTableLineCell, validRowCellText } from '../common/table'
import { BUTTON_PDF, checkRadio, clickSearch, clickTool, inputSearch, openProvince, openTagSelect, queryMgrTree, selectFirstCcl, validCclChecked, validCclSelect, validFirstDisplayField, validMonthRange, validPrint, validRowsLength, validTableColumnSort } from './effect-query'

context('信息反馈情况', () => {
  const queryFeedbackReq = () => {
    return interceptAll('service/mgr/evaReport/messFeedback?startTime=*', queryFeedbackReq.name)
  }
  const waitQuery = (cb) => {
    waitIntercept(queryFeedbackReq, clickSearch, cb)
  }
  before(() => {
    waitIntercept(queryMgrTree, () => {
      cy.visitPage('report-effect-feedback')
    }, () => {
      
    })
  })
  it('001-默认不查询且月度为上个月', () => {
    cy.get('.table-main tbody tr').should('not.exist')
    validMonthRange()
  })
  context('管理机构查询', () => {
    it('002-默认选中管理机构类型，但未选择管理机构', () => {
      validCclChecked()
      clickSearch()
      validErrorMsg('请选择管理机构！')
    })
    context('选一个管理机构', () => {
      let result
      before(() => {
        selectFirstCcl()
        waitQuery(data => {
          result = data
        })
      })
      it('003-表格基本数据', () => {
        validRowsLength(result.length)
        const {labName, totalSenMess, noRepMess, outControMess, cvOutControMess, knowRate, dealRate} = result[0]
        cy.get('.table-main tbody tr:first')
          .within(() => {
            validRowCellText(0, labName)
            validRowCellText(1, totalSenMess)
            validRowCellText(2, noRepMess)
            validRowCellText(3, outControMess)
            validRowCellText(4, cvOutControMess)
            validRowCellText(5, `${knowRate * 100}%`)
            validRowCellText(6, `${dealRate * 100}%`)
          })
      })
      it('004-总消息数等于失控+未上报+CV/符合率失控', () => {
        const { totalSenMess, noRepMess, outControMess, cvOutControMess } = result[0]
        expect(totalSenMess).to.equal(noRepMess + outControMess + cvOutControMess)
      })
      it('005-实验室名称或编码搜索', () => {
        const { labName, labCode } = result[0]
        const placeholder = '请输入实验室名称或编码'
        inputSearch(labName, placeholder)
        findTableLineCell(0, 0).should('have.text', labName)

        inputSearch(labCode, placeholder)
        findTableLineCell(0, 0).should('have.text', labName)

        inputSearch(null, placeholder)
      })
      it('006-显示字段', () => {
        validFirstDisplayField()
      })
      it('007-打印', () => {
        validPrint()
      })
    })
  })
  context(`切到到地区${PROVINCE_GD}`, () => {
    it(`008-查询${PROVINCE_GD}反馈情况`, () => {
      checkRadio(0)
      openProvince()
      activeSelect(PROVINCE_GD)
      waitQuery(data => {
        validRowsLength(data.length)
      })
    })
  })
  context('切到实验标签', () => {
    let result
    before(() => {
      checkRadio(2)
      openTagSelect()
      activeSelect(LAB_TAG_PUBLIC)
      waitQuery(data => {
        result = data
      })
    })

    it(`009-查询${LAB_TAG_PUBLIC}`, () => {
      validRowsLength(result.length)
    })
    it('010-月度范围查询', () => {
      const startMonth = dayjs().subtract(2, 'month').format('YYYY-MM')
      const endMonth = dayjs().subtract(1, 'month').format('YYYY-MM')
      selectDateMonthRange({
        startMonth,
        endMonth
      })
      waitQuery(data => {
        result = data
        validRowsLength(result.length)
      })
    })
    it('011-表头可排序', () => {
      validTableColumnSort(1, 'descending')
      validTableColumnSort(1, 'ascending')
    })
    it('012-导出PDF', () => {
      clickListener(() => clickTool(BUTTON_PDF), 10000)
      validatePdfFile('信息反馈情况报表.pdf', data => {
        if (result.length) {
          expect(data.numpages).to.gt(0)
        }
      })
    })
  })
  context('切换登录帐号', () => {
    it('013-gdccl 登录', () => {
      waitIntercept(queryFeedbackReq, () => {
        loginMgrWithGdccl('report-effect-feedback')
      }, data => {
        validCclSelect()
        validRowsLength(data.length)
      })
    })
  })
})