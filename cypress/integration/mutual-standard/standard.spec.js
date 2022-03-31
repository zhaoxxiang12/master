import {
  closeTips,
  confirmDelete
} from '../common/dialog'
import {
  validFormItemError
} from '../common/form'
import {
  waitIntercept
} from '../common/http'
import {
  validSuccessMessage
} from '../common/message'
import {
  activeSelect
} from '../common/select'
import {
  expandSearchConditions
} from '../eqa/eqa-order/eqa-order'
import {
  elform
} from '../mutual-result/mutual-item'
import {
  clickSearch
} from '../setting/report-monitor/report-monitor'
import {
  checkBox,
  clickCreate,
  createStandard,
  fillElform,
  fillStandard,
  getData,
  getElform,
  getModelLength,
  getModelName,
  getStandard,
  interceptChangeOrg,
  interceptCreateStandard,
  interceptDeleteModel,
  interceptEditStandard,
  interceptStandardModel,
  modelOption,
  saveElform,
  selectModel,
  selectSpec,
  setNolimitRules,
  setRulesMany
} from './standard'

context('互认标准设置', () => {
  before(() => {
    cy.visitPage('mutual-standard')
    cy.wait(5000)
  })
  context('添加定量项目标准', () => {
    const cvThreshold = 2
    const contiMonth = 6
    const cyType = '有一个批号的CV%不通过则不通过'
    const partEqaPassTimes = true
    it('cqb-001-添加定量项目标准', () => {
      const standardName = '标准' + Math.ceil(Math.random() * 1000)
      //点击添加标准按钮
      clickCreate()
      createStandard(standardName)
      fillStandard({
        cvThreshold,
        contiMonth,
        cyType
      }, {
        partEqaPassTimes
      })
      saveElform('互认规则设置', '保存')
      saveElform('添加互认标准', '保存')
      waitIntercept(interceptCreateStandard, () => {
        closeTips('提示', '确定')
      }, () => {
        validSuccessMessage()
      })
    })
    it('cqb-002-新增标准名称已存在失败', () => {
      const standardName = '佛山标准'
      cy.wait(2000)
      getData().then(() => {
        clickCreate()
        createStandard(standardName)
        fillStandard({
          cvThreshold,
          contiMonth,
          cyType
        }, {
          partEqaPassTimes
        })
        saveElform('互认规则设置', '保存')
        saveElform('添加互认标准', '保存')
        validFormItemError('互认标准名称已存在，请重输')
        saveElform('添加互认标准', '取消')
      })
    })
    it('cqb-003-标准名称为空保存失败', () => {
      cy.wait(2000)
      getData().then(() => {
        clickCreate()
        createStandard()
        fillStandard({
          cvThreshold,
          contiMonth,
          cyType
        }, {
          partEqaPassTimes
        })
        saveElform('互认规则设置', '保存')
        saveElform('添加互认标准', '保存')
        validFormItemError('请输入活动名称')
        saveElform('添加互认标准', '取消')
      })
    })
  })
  context('批量设置规则', () => {
    const cvThreshold = 2
    const contiMonth = 6
    const cyType = '有一个批号的CV%不通过则不通过'
    const partEqaPassTimes = true
    const workDayRepRate = true
    it('cqb-004-批量设置规则', () => {
      setRulesMany('常规化学')
      fillStandard({
        cvThreshold,
        contiMonth,
        cyType
      }, {
        partEqaPassTimes
      }, null, true)
      saveElform('互认规则批量设置', '保存')
      closeTips('提示', '确定')
      saveElform('编辑互认标准', '保存')
      waitIntercept(interceptEditStandard, () => {
        closeTips('提示', '确定')
      }, () => {
        validSuccessMessage()
      })
    })
    it('cqb-005-批量设置规则-不限项目', () => {
      setNolimitRules('新冠病毒核酸检测')
      fillStandard({
        cvThreshold,
        contiMonth,
        cyType
      }, {
        partEqaPassTimes
      }, {
        workDayRepRate
      }, true)
      saveElform('互认规则批量设置', '保存')
      closeTips('提示', '确定')
      saveElform('编辑互认标准', '保存')
      waitIntercept(interceptEditStandard, () => {
        closeTips('提示', '确定')
      }, () => {
        validSuccessMessage()
      })
    })
  })
  context('规则保存', () => {
    const cvThreshold = 2
    const contiMonth = 3
    const cyType = '有一个批号的CV%通过则算通过'
    const standardName = '标准' + Math.ceil(Math.random() * 1000)
    it('cqb-006-阈值标准未填写不能保存', () => {
      const provinceEqaPassTimes = true
      getData().then(() => {
        clickCreate()
        createStandard(standardName)
        fillStandard({
          contiMonth,
          cyType
        }, {
          provinceEqaPassTimes
        })
        saveElform('互认规则设置', '保存')
        validFormItemError('请填写标准值')
        saveElform('互认规则设置', '取消')
        saveElform('添加互认标准', '取消')
      })
      cy.wait(2000)
    })
    it('cqb-007-连续合格月数未填写不能保存', () => {
      const provinceEqaPassTimes = true
      clickCreate()
      createStandard(standardName)
      fillStandard({
        cvThreshold,
        cyType
      }, {
        provinceEqaPassTimes
      })
      saveElform('互认规则设置', '保存')
      validFormItemError('请选择连续合格月数')
      saveElform('互认规则设置', '取消')
      saveElform('添加互认标准', '取消')
      cy.wait(2000)
    })
    it('cqb-008-CV%判定规则未填写不能保存', () => {
      const provinceEqaPassTimes = true
      clickCreate()
      createStandard(standardName)
      fillStandard({
        cvThreshold,
        contiMonth
      }, {
        provinceEqaPassTimes
      })
      saveElform('互认规则设置', '保存')
      validFormItemError('请选择合格判定规则')
      saveElform('互认规则设置', '取消')
      saveElform('添加互认标准', '取消')
      cy.wait(2000)
    })
    it('cqb-009-阈值填写不规范(负数,大于100，0，特殊符号)不能保存', () => {
      const provinceEqaPassTimes = true
      clickCreate()
      createStandard(standardName)
      fillStandard({
        contiMonth,
        cyType
      }, {
        provinceEqaPassTimes
      })
      //负数
      fillElform('互认规则设置', 'cvThreshold').type(-10)
      saveElform('互认规则设置', '保存')
      validFormItemError('请填大于0，小于100的值')
      //大于100
      fillElform('互认规则设置', 'cvThreshold').clear().type(101)
      saveElform('互认规则设置', '保存')
      validFormItemError('请填大于0，小于100的值')
      //特殊符号
      fillElform('互认规则设置', 'cvThreshold').clear().type('@$')
      saveElform('互认规则设置', '保存')
      validFormItemError('请填大于0，小于100的值')
      saveElform('互认规则设置', '取消')
      saveElform('添加互认标准', '取消')
      cy.wait(2000)
    })
  })
  context('模板功能', () => {
    const cvThreshold = 2
    const contiMonth = 3
    const cyType = '有一个批号的CV%通过则算通过'
    const standardName = '标准' + Math.ceil(Math.random() * 1000)
    const modelName = '自动化模板'
    before(() => {
      const provinceEqaPassTimes = true
      const partEqaPassTimes = true
      const cityEqaPassTimes = true
      clickCreate()
      createStandard(standardName)
      fillStandard({
        cvThreshold,
        contiMonth,
        cyType
      }, {
        partEqaPassTimes,
        provinceEqaPassTimes,
        cityEqaPassTimes
      })
    })
    it('cqb-010-模板名称为空不能保存', () => {
      saveElform('互认规则设置', '保存为模板')
      saveElform('新增互认规则设置模板', '保存')
      validFormItemError('请配置模板名称')
      saveElform('新增互认规则设置模板', '取消')
      cy.wait(2000)
    })
    it('cqb-011-保存模板', () => {
      saveElform('互认规则设置', '保存为模板')
      fillElform('新增互认规则设置模板', 'name').type(modelName)
      waitIntercept(interceptStandardModel, () => {
        saveElform('新增互认规则设置模板', '保存')
      }, () => {
        validSuccessMessage()
        cy.wait(2000)
      })
    })
    it('cqb-012-模板名称重复不能保存', () => {
      saveElform('互认规则设置', '保存为模板')
      fillElform('新增互认规则设置模板', 'name').type(modelName)
      saveElform('新增互认规则设置模板', '保存')
      validFormItemError('模板名称不能重复!')
      saveElform('新增互认规则设置模板', '取消')
      cy.wait(2000)
    })
    it('cqb-013-修改模板(模板名称)', () => {
      const editModelName = '修改模板名称' + Math.ceil(Math.random() * 1000)
      selectModel().parent().then(element => {
        if (element.css('display') === 'inline') {
          selectModel().click({
            force: true
          })
          cy.wait(1000)
          getModelName().invoke('text').then(oldName => {
            modelOption('修改')
            cy.wait(1000)
            fillElform('修改互认规则设置模板', 'name').clear().type(editModelName)
            waitIntercept(interceptStandardModel, () => {
              saveElform('修改互认规则设置模板', '保存')
            }, () => {
              validSuccessMessage()
              cy.wait(2000)
              getModelName().invoke('text').then(newName => {
                expect(oldName).not.to.eq(newName)
                cy.wait(2000)
              })
            })
          })
        }
      })
    })
    it('cqb-014-使用模板', () => {
      modelOption('使用')
      cy.wait(1000)
      checkBox('partEqaPassTimes').parents('.el-checkbox').should('have.class', 'is-checked')
    })
    it('cqb-015-互认标准设置-删除模板', () => {
      cy.wait(1000)
      selectModel().click({
        force: true
      })
      getModelLength().then((getLength) => {
        if (getLength.length > 1) {
          modelOption('删除')
          waitIntercept(interceptDeleteModel, () => {
            confirmDelete()
          }, () => {
            getModelLength().should('have.length', getLength.length - 1)
          })
        } else {
          modelOption('删除')
          waitIntercept(interceptDeleteModel, () => {
            confirmDelete()
          }, () => {
            selectModel().parents('span').eq(1).then(element => {
              expect(element.css('display')).to.eq('none')
              saveElform('互认规则设置', '取消')
              saveElform('添加互认标准', '取消')
            })
          })
        }
      })
    })
  })
  context('额外操作', () => {
    before(() => {
      cy.wait(2000)
    })
    it('cqb-016-项目搜索', () => {
      const itemName = '胆固醇'
      cy.get('.el-icon-edit-outline').last().click({
        force: true
      })
      cy.wait(2000)
      selectSpec('常规化学')
      getElform('编辑互认标准').findByPlaceholderText('输入项目名称').type(itemName)
      cy.wait(2000)
      cy.get('.el-table__body').find('tbody').first().find('.el-table__row').should('have.length', 3)
      saveElform('编辑互认标准', '取消')
    })
    it('cqb-017-已关联标准的实验室不能再次关联(复选框置灰)', () => {
      const labCode = 'gd18001'
      const notAddLabCode = 'gdtest2'
      clickCreate()
      cy.wait(5000)
      selectSpec('常规化学')
      getElform('添加互认标准').find('button').contains('添加').click({
        force: true
      })
      cy.wait(3000)
      expandSearchConditions('高级搜索')
      elform('labName').type(labCode)
      clickSearch()
      cy.wait(2000)
      getElform('选择实验室')
        .find('.el-table__body')
        .contains(labCode)
        .parents('.el-table__row')
        .find('.el-checkbox')
        .should('have.class', 'is-disabled')
      elform('labName').clear().type(notAddLabCode)
      clickSearch()
      cy.wait(2000)
      getElform('选择实验室')
        .find('.el-table__body')
        .contains(notAddLabCode)
        .parents('.el-table__row')
        .find('.el-checkbox')
        .should('not.have.class', 'is-disabled')
      saveElform('选择实验室', '关闭')
      saveElform('添加互认标准', '取消')
    })
  })
  context('复制和删除', () => {
    before(() => {
      cy.wait(2000)
    })
    it('cqb-018-复制互认标准', () => {
      const copyName = '自动化复制标准'
      getStandard().then(getLength => {
        cy.get('.el-card.sd-cfg__item.is-hover-shadow').first().find('[title="复制"]').click({
          force: true
        })
        cy.wait(5000)
        fillElform('编辑互认标准', 'stdName').clear().type(copyName)
        saveElform('编辑互认标准', '保存')
        waitIntercept(interceptCreateStandard, () => {
          closeTips('提示', '确定')
        }, () => {
          validSuccessMessage()
          cy.wait(1000)
          getStandard().should('have.length', getLength.length + 1)
          getStandard().should('contain', copyName)
          getStandard().contains(copyName).parents('.el-card.sd-cfg__item').find('[title="删除"]').click({
            force: true
          })
          confirmDelete()
        })
      })
    })
    it('cqb-019-互认标准设置-删除标准', () => {
      cy.wait(5000)
      getStandard().then(getLength => {
        if (getLength.length > 1) {
          getStandard().last().find('[title="删除"]').click({
            force: true
          })
          waitIntercept(interceptEditStandard, () => {
            confirmDelete()
          }, () => {
            validSuccessMessage()
            cy.wait(1000)
            getStandard().should('have.length', getLength.length - 1)
          })
        }
      })
    })
  })
  context('切换质控主管单位', () => {
    it('cqb-020-切换质控主管单位(青浦医联体)', () => {
      const orgName = '青浦医联体'
      cy.wait(2000)
      cy.get('input[placeholder="请选择"]').click({
        force: true
      })
      waitIntercept(interceptChangeOrg, () => {
        activeSelect(orgName)
      }, data => {
        if (data.length >= 1) {
          const standardName = data[0].stdName
          cy.wait(2000)
          getStandard().should('contain', standardName)
        }
      })
    })
  })
})