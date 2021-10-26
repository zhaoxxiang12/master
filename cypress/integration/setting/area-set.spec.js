import {
  visitPage
} from '../../shared/route'
import {
  interceptAll,
  waitIntercept
} from '../common/http'
import {
  closeClientAlert,
  validSuccessMessage
} from '../common/message'
import {
  dropListSelect
} from '../mutual-result/mutual-item'

/**
 * 可选区域设置
 */

export const interceptSaveArea = () => {
  return interceptAll('service/mgr/regionlimit/save', interceptSaveArea.name)
}

export const clickDropList = (text) => {
  cy.get('.el-form.el-form--inline').findAllByPlaceholderText(text).click()
}
context('可选区域设置', () => {
  before(() => {
    cy.visitPage('area-set')
    cy.wait(3000)
  })
  it('001-界面一级菜单数据默认显示全国', () => {
    cy.get('.area-list').find('.el-checkbox').should('have.length', 34)
  })
  context('勾选/取消勾选', () => {
    it('002-勾选省该省份下所有市、区县都会被勾选', () => {
      cy.get('.area-item').contains('浙江省').parents('.area-item')
        .find('[type=checkbox]').check({
          force: true
        })
      cy.wait(1000)
      cy.get('.area-list__sub').first().within(() => {
        cy.get('.el-checkbox__input').then((getData) => {
          getData.each((index, element) => {
            expect(element).to.have.class('is-checked')
          })
        })
      })
      cy.get('.area-list__sub').contains('杭州市').click({
        force: true
      })
      cy.get('.area-list__sub').last().within(() => {
        cy.get('.el-checkbox__input').then((getData) => {
          getData.each((index, element) => {
            expect(element).to.have.class('is-checked')
          })
        })
      })
    })
    it('003-取消勾选', () => {
      cy.get('.area-item').contains('浙江省').parents('.area-item')
        .find('[type=checkbox]').uncheck({
          force: true
        })
      cy.wait(1000)
      cy.get('.area-list__sub').first().within(() => {
        cy.get('.el-checkbox__input').then((getData) => {
          getData.each((index, element) => {
            expect(element).to.not.have.class('is-checked')
          })
        })
      })
      cy.get('.area-list__sub').contains('杭州市').click({
        force: true
      })
      cy.get('.area-list__sub').last().within(() => {
        cy.get('.el-checkbox__input').then((getData) => {
          getData.each((index, element) => {
            expect(element).to.not.have.class('is-checked')
          })
        })
      })
    })
    context('全选/取消全选', () => {
      it('004-全选', () => {
        cy.get('.area-item.area-item--title').findByText('全选').click({
          force: true
        })
        cy.get('.area-list').find('.el-checkbox').then(getData => {
          getData.each((index, element) => {
            expect(element).to.have.class('is-checked')
          })
        })
      })
      it('005-取消全选', () => {
        cy.get('.area-item.area-item--title').findByText('全清').click({
          force: true
        })
        cy.get('.area-list').find('.el-checkbox').then(getData => {
          getData.each((index, element) => {
            expect(element).to.not.have.class('is-checked')
          })
        })
      })
    })
  })
  context('设置某个区域为可选/不可选在其它界面的反馈', () => {
    it('003-设置某个区域为可选,在其它界面会得到反馈', () => {
      cy.get('.area-item').contains('四川省').parents('.area-item')
        .find('[type=checkbox]').check({
          force: true
        })
      waitIntercept(interceptSaveArea, () => {
        cy.get('.area-item.area-item--title').findByText('保存').click({
          force: true
        })
      }, () => {
        validSuccessMessage()
        visitPage('lab-manager')
        closeClientAlert()
        cy.wait(500)
        clickDropList('请选择省')
        dropListSelect('四川省')
        clickDropList('所有市')
        dropListSelect('成都市')
        clickDropList('所有区')
        dropListSelect('武侯区')
      })
    })
    it('004-设置某个区域为不可选,在其它界面会得到反馈', () => {
      visitPage('area-set')
      closeClientAlert()
      cy.wait(2000)
      cy.get('.area-item').contains('四川省').parents('.area-item')
        .find('[type=checkbox]').uncheck({
          force: true
        })
      cy.get('.area-item').contains('北京市').parents('.area-item')
        .find('[type=checkbox]').check({
          force: true
        })
      cy.get('.area-item').contains('广东省').parents('.area-item')
        .find('[type=checkbox]').check({
          force: true
        })
      cy.get('.area-item').contains('广西壮族自治区').parents('.area-item')
        .find('[type=checkbox]').check({
          force: true
        })
      cy.get('.area-item').contains('上海市').parents('.area-item')
        .find('[type=checkbox]').check({
          force: true
        })
      waitIntercept(interceptSaveArea, () => {
        cy.get('.area-item.area-item--title').findByText('保存').click({
          force: true
        })
      }, () => {
        validSuccessMessage()
        visitPage('lab-manager')
        cy.wait(500)
        clickDropList('请选择省')
        cy.get('.el-scrollbar__view.el-select-dropdown__list:visible').last().contains('四川省')
          .should('not.exist')
      })
    })
  })
})