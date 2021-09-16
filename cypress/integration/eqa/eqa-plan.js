/**
 * 比对计划组织
 */
import 'cypress-iframe'
import {
  waitIntercept
} from '../../shared/util'

context('比对计划组织', () => {
  let planCode = 1
  let planNumber = 3
  let issueTime = 1
  let issueEndTime = 2
  let testTime = 2
  let testStartTime = 3
  let testEndTime = 4
  let reportEndTime = 4
  let reportEndDay = 3
  let feedBackStartTime = 5
  let feedBackStartDay = 3
  let feedBackEndTime = 5
  let feedBackEndDay = 4
  let major = 4
  let planName = '自动测试计划'
  let confire = 15
  let randomCode = parseInt(Math.random() * 100000)
  let compareCode = 'plan' + randomCode

  const visitEQA = () => {
    cy.visitPage('eqa-plan')
  }

  const getIframeElement = (prop) => {
    return cy.getIframe().find(`.el-form.eqa-plan-info [for=${prop}]`).next('.el-form-item__content').find('.el-input__inner')
  }

  const iframeDropList = (prop) => {
    return cy.getIframe().find(`.el-form.eqa-plan-info`).findAllByPlaceholderText(prop)
  }

  const interceptAddPlan = () => {
    cy.intercept('**/service/plan/add*').as('interceptAddPlan')
    return 'interceptAddPlan'
  }

  const subimtInformation = () => {
    cy.getIframe().find('#app').find('.el-button.el-button--primary.el-button--medium').eq(confire).click({
      force: true
    })
  }

  const deletePlan = () => {
    cy.intercept('**/delete?id=*').as('deletePlan')
    return 'deletePlan'
  }

  const iframeValidSuccessMessage = (message) => {
    cy.getIframe().find('.el-message__content').should('have.text', message)
  }

  const addEqaPlan = (planName, planCompareCode, majorName, simpleNum, labCode) => {
    cy.frameLoaded('.frame-content__body')
    // 点击添加计划
    cy.getIframe().find('.el-button.el-button--primary.el-button--medium.is-plain').first().click()
    if (planName) {
      //输入比对计划名称
      getIframeElement("name").type(planName)
    }
    if (planCompareCode) {
      //比对计划编码
      getIframeElement("code").type(planCompareCode)
    }
    //次数
    iframeDropList('请选择').eq(1).click()
    cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains('6').click()
    if (majorName) {
      //专业
      iframeDropList('请选择').eq(2).click()
      cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains(majorName).click()
    }
    if (simpleNum) {
      //样本数  
      cy.getIframe().find(`.el-form.eqa-plan-info [role="spinbutton"]`).clear().type(simpleNum)
    }
    //--------------样本下发时间----------------------
    cy.getIframe().find('.el-form.eqa-plan-info').find('.el-range-input').first().click()
    //下发开始时间
    cy.getIframe().find('.el-date-table').first().find('tbody>tr').eq(issueTime).find('td').eq(issueTime).click()
    //下发结束时间
    cy.getIframe().find('.el-date-table').first().find('tbody>tr').eq(issueEndTime).find('td').eq(issueEndTime).click()
    //-------------样本检测时间------------------------
    cy.getIframe().find('.el-form.eqa-plan-info').find('.el-range-input').eq(testTime).click()
    //检测开始时间
    cy.getIframe().find('.el-date-table').eq(testTime).find('tbody>tr').eq(testStartTime).find('td').eq(testStartTime).click()
    //检测结束时间
    cy.getIframe().find('.el-date-table').eq(testTime).find('tbody>tr').eq(testEndTime).find('td').eq(testEndTime).click()
    //------------上报截止时间--------------------------
    cy.getIframe().find('.el-form.eqa-plan-info').find('.el-date-editor.ql-date-picker.el-input.el-input--medium.el-input--prefix.el-input--suffix.el-date-editor--date').click()
    cy.getIframe().find('.el-date-table').last().find('tbody>tr').last().find('td').last().click()
    //-----------报告反馈时间----------------------------
    cy.getIframe().find('.el-form.eqa-plan-info').find('.el-range-input').last().click()
    //报告开始时间
    cy.getIframe().find('.el-date-table').eq(feedBackStartTime).find('tbody>tr').eq(feedBackStartTime).find('td').eq(feedBackStartDay).click()
    //报告结束时间
    cy.getIframe().find('.el-date-table').eq(feedBackStartTime).find('tbody>tr').eq(feedBackEndTime).find('td').eq(feedBackEndDay).click()
    cy.getIframe().find('button').contains('下一步').click()
    cy.getIframe().find('button').contains('下一步').click()
    //选择发送对象
    if (labCode) {
      cy.getIframe().find('[placeholder="请输入实验室名称或编码"]').last().type(labCode, {
        force: true
      })
      cy.wait(1000)
      cy.getIframe().find('.el-form.el-form--inline').last().find('.el-icon-search').first().click({
        force: true
      })
      cy.wait(1000)
      cy.getIframe().find('.ql-card-list__list').find('.el-card.is-always-shadow.ql-card-list__item').last().click()
    }
  }

  const interceptModelAdd = () => {
    cy.intercept('**//service/template/form/add*').as('interceptModelAdd')
    return 'interceptModelAdd'
  }

  const interceptModelEdit = () => {
    cy.intercept('**/service/template/form/edit*').as('interceptModelEdit')
    return 'interceptModelEdit'
  }

  const searchPlan = (keyword) => {
    //搜索新增的比对计划
    cy.getIframe().find('[placeholder="请输入比对计划名称关键字"]').first().clear().type(keyword, {
      force: true
    })
    cy.getIframe().find('button').contains('搜索').click()
    cy.wait(1000)
  }

  const cancelPush = () => {
    cy.intercept({
      url: '**/cancelPush?id*',
      method: 'POST'
    }).as('cancelPush')
    return 'cancelPush'
  }

  const pushPlan = () => {
    cy.intercept({
      url: '**/push?id*',
      method: 'POST'
    }).as('pushPlan')
    return 'pushPlan'
  }

  const eqaModel = (modelName) => {
    const planName = '自动测试计划' + randomCode
    const planCompareCode = 'plan' + randomCode
    const majorName = '临床免疫学'
    const simpleNum = 3
    addEqaPlan(planName, planCompareCode, majorName, simpleNum)
    cy.getIframe().find('button').contains('保存为模板').click()
    //输入模板名称
    if (modelName) {
      cy.getIframe().find('.el-form').last().find('.el-input__inner').type(modelName, {
        force: true
      })
    }
  }

  const cannotPush = (planName, danger) => {
    searchPlan(planName)
    cy.getIframe().find('.el-table__row').first().find('td').find('.el-switch').should('have.class', 'is-disabled')
    if (danger) {
      cy.getIframe().find('.el-table__row').first().find('td').eq(1).find('.el-tooltip.el-icon-warning').should('have.class', 'is-danger')
    }
    //删除计划
    cy.getIframe().find('.el-table__row').first().find('td').last().find('.el-button.el-button--text.el-button--medium').contains('删除').click({
      force: true
    })
    waitIntercept(deletePlan, () => {
      cy.getIframe().find('.el-popconfirm__action').last().find('button').contains('确定').click()
    }, data => {
      expect(data).to.equal(200)
    })
  }

  const modelLength = (errorMessage) => {
    cy.getIframe().find('button').contains('选择模板').click()
    cy.getIframe().find('.el-table__body').last().find('.el-table__row').then((length) => {
      let getLength = length.length
      cy.getIframe().find('button').contains('保存为模板').click()
      cy.getIframe().find('.el-form').last().find('button').contains('保存').click({
        force: true
      })
      cy.getIframe().find('.el-form-item__error').should('contain', errorMessage)
      cy.getIframe().find('button').contains('选择模板').click()
      cy.getIframe().find('.el-table__body').last().find('.el-table__row').should('have.length', getLength)
    })
  }

  const queryData = () => {
    cy.intercept('**/service/plan/search?*').as('queryData')
    return 'queryData'
  }

  const clickSearch = () => {
    cy.getIframe().find('.el-form').eq(2).findByText('搜索').click()
    cy.wait(1000)
  }

  const validData = (length) => {
    if (length === 0) {
      cy.getIframe().find('body').contains('暂无数据')
    } else {
      cy.getIframe().find('.el-table__body').first().find('.el-table__row').should('have.length', length)
    }
  }

  const vaild = () => {

  }

  const queryPlanData = (majorName, year,keyword,times,status) => {
    cy.getIframe().find('.el-form.el-form--inline').last().findByText('展开').click({
      force: true
    })
    cy.wait(1000)
    if (majorName) {
      //使用专业查询
      cy.getIframe().find('.el-form').eq(2).findAllByPlaceholderText('请选择').first().click()
      cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains(majorName).click()
      waitIntercept(queryData, clickSearch, data => {
        console.log(data)
        const length = data.total
        if (length){
          data.records.forEach(plan => expect(plan.specTypeName).equal(majorName))
        }
        validData(length)
      })
    }
    if (year) {
      //使用年度查询
      cy.getIframe().find('.el-form').eq(2).findAllByPlaceholderText('请选择').eq(1).click()
      cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains(year).click()
      waitIntercept(queryData, clickSearch, data => {
        const length = data.total
        if (length){
          data.records.forEach(plan => expect(plan.year).equal(year))
        }
        validData(length)
      })
    }
    if (keyword) {
      //使用关键字查询
      cy.getIframe().find('.el-form').eq(2).findAllByPlaceholderText('请输入比对计划名称关键字').type(keyword)
      waitIntercept(queryData, clickSearch, data => {
        const length = data.total
        validData(length)
        if (length){
          data.records.forEach(plan => expect(plan.name).equal(keyword))
        }
      })
    }
    if (times) {
      //次数查询
      cy.getIframe().find('.el-form').eq(2).findAllByPlaceholderText('请选择').eq(2).click()
      cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains(times).click()
      waitIntercept(queryData, clickSearch, data => {
        const length = data.total
        if (length){
          data.records.forEach(plan => expect(plan.times).equal(times))
        }
        validData(length)
      })
    }
    if (status) {
      //状态查询
      cy.getIframe().find('.el-form').eq(2).findAllByPlaceholderText('请选择').last().click()
      cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains(status).click()
      waitIntercept(queryData, clickSearch, data => {
        const length = data.total
        if (length){
          data.records.forEach(plan => expect(plan.status).equal(times))
        }
        validData(length)
      })
    }
  }



  before(() => {
    visitEQA()
  })

  context('添加比对计划', () => {
    beforeEach(() => {
      visitEQA()
    })
    it('001-比对计划添加成功', () => {
      const planName = '自动测试计划' + randomCode
      const planCompareCode = 'plan' + randomCode
      const majorName = '临床免疫学'
      const simpleNum = 3
      addEqaPlan(planName, planCompareCode, majorName, simpleNum)
      waitIntercept(interceptAddPlan, () => {
        subimtInformation()
      }, data => {
        const statusCode = data
        expect(statusCode).to.eq(200)
        iframeValidSuccessMessage('添加比对计划成功')
      })
    })
    it('002-盲样计划添加新冠专业', () => {
      const planName = '自动测试计划' + randomCode
      const planCompareCode = 'plan' + randomCode
      const majorName = '新冠病毒核酸检测'
      const simpleNum = 3
      addEqaPlan(planName, planCompareCode, majorName, simpleNum)
      waitIntercept(interceptAddPlan, () => {
        subimtInformation()
      }, data => {
        const statusCode = data
        expect(statusCode).to.eq(200)
        iframeValidSuccessMessage('盲样模式下暂时无法创建新冠专业项目的比对计划')
      })
    })
  })
  context('模板功能', () => {
    beforeEach(() => {
      visitEQA()
    })
    it('003-模板添加成功', () => {
      const modelName = '自动' + randomCode
      eqaModel(modelName)
      waitIntercept(interceptModelAdd, () => {
        //点击保存
        cy.getIframe().find('.el-form').last().find('button').contains('保存').click({
          force: true
        })
      }, data => {
        const statusCode = data
        expect(statusCode).to.eq(200)
        iframeValidSuccessMessage('模板保存成功')
      })
    })
    it('004-模板名称为空不能保存', () => {
      eqaModel()
      modelLength('请配置模板名称')
    })
    it('005-模板名称重复不能保存', () => {
      const repeatModelName = 'suheqingtest01'
      eqaModel(repeatModelName)
      modelLength('模板名称不能重复!')
    })
    it('006-修改模板(模板名称)', () => {
      let editDemo = 5
      cy.frameLoaded('.frame-content__body')
      //点击添加计划
      cy.getIframe().find('.el-button.el-button--primary.el-button--medium.is-plain').first().click()
      cy.getIframe().find('button').contains('选择模板').click()
      //选择第一个模板
      cy.getIframe().find('.el-table__body').last().find('.el-table__row').first().find('button').contains('修改').click()
      //输入计划名称
      cy.getIframe().find('[aria-label="编辑模板"]').first()
        .find('.el-form').first()
        .find('[for="name"]')
        .next('.el-form-item__content')
        .find('.el-input__inner')
        .clear({
          force: true
        })
        .type('修改模板名称' + randomCode, {
          force: true
        })
      cy.intercept({
        url: '/service/template/form/edit',
        method: 'POST'
      }).as('editForm')
      cy.getIframe().find('[role="dialog"]').eq(editDemo).find('.el-button.el-button--primary.el-button--medium').last().click({
        force: true
      })
      cy.wait('@editForm').then((xhr) => {
        cy.compare(xhr)
      })
      cy.getIframe().find('.el-message__content').should('have.text', '模板更新成功')
    })
    it('007-使用模板', () => {
      let editDemo = 5
      cy.frameLoaded('.frame-content__body')
      //点击添加计划
      cy.getIframe().find('.el-button.el-button--primary.el-button--medium.is-plain').first().click()
      cy.getIframe().find('button').contains('选择模板').click()
      cy.getIframe().find('.el-table__body').last().find('.el-table__row').first().findByText('修改').click()
      cy.wait(1000)
      cy.getIframe().find('.el-form.eqa-plan-info').last().find('.el-input__inner').first().invoke('val').then((val) => {
        cy.getIframe().find('[role="dialog"]').eq(editDemo).find('.el-button.el-button--primary.el-button--medium').last().click({
          force: true
        })
        cy.getIframe().find('button').contains('选择模板').click()
        cy.getIframe().find('.el-table__body').last().find('.el-table__row').first().contains('使用').click()
        cy.getIframe().find('.el-form.eqa-plan-info').last().find('.el-input__inner').first().should('have.value', val)
      })
    })
    it('008-删除模板', () => {
      cy.frameLoaded('.frame-content__body')
      //点击添加计划
      cy.getIframe().find('.el-button.el-button--primary.el-button--medium.is-plain').first().click()
      cy.getIframe().find('button').contains('选择模板').click()
      cy.getIframe().find('.el-table__body').last().find('.el-table__row').then((length) => {
        cy.getIframe().find('.el-table__body').last().find('.el-table__row').first().find('.el-button.el-button--text.el-button--mini.el-popover__reference').click()
        cy.intercept({
          url: '**/delete?id=*',
          method: 'POST'
        }).as('deleteForm')
        cy.getIframe().find('.el-button.el-button--primary.el-button--mini').last().click()
        cy.wait('@deleteForm').then((xhr) => {
          cy.compare(xhr)
          cy.getIframe().find('.el-table__body').last().find('.el-table__row').should('have.length', length.length - 1)
        })
      })
    })
  })
  context('推送计划', () => {
    const singlePlanName = '自动测试计划' + randomCode
    const singlePlanCompareCode = 'plan' + randomCode
    beforeEach(() => {
      visitEQA()
    })
    it('009-比对计划信息不全不能进行推送', () => {
      const planName = '自动测试计划' + randomCode
      const planCompareCode = 'plan' + randomCode
      const majorName = '临床免疫学'
      const simpleNum = 3
      addEqaPlan(planName, planCompareCode, majorName, simpleNum)
      subimtInformation()
      cannotPush(planName)
    })
    it('010-无比对项目不能进行推送', () => {
      const planName = '自动测试计划' + randomCode
      const planCompareCode = 'plan' + randomCode
      const majorName = '凝血试验'
      const simpleNum = 3
      const labCode = 'gdtest5'
      addEqaPlan(planName, planCompareCode, majorName, simpleNum, labCode)
      subimtInformation()
      cannotPush(planName)
    })
    it('011-信息未填写完整出现标记', () => {
      const planName = '自动测试计划' + randomCode
      const planCompareCode = 'plan' + randomCode
      const majorName = '临床免疫学'
      const simpleNum = 3
      addEqaPlan(planName, planCompareCode, majorName, simpleNum)
      subimtInformation()
      cannotPush(planName, true)
    })
    it('012-无法取消推送', () => {
      const plan = '新冠质管核酸检测'
      const plan2 = '订单验证2'
      //有上报数据的
      searchPlan(plan)
      waitIntercept(cancelPush, () => {
        cy.getIframe().find('.el-table__row').first('.el-switch').click()
      }, data => {
        expect(data).to.equal(200)
        iframeValidSuccessMessage('当前比对计划已有实验室上报，不能取消推送')
      })
      //过了上报时间的
      searchPlan(plan2)
      waitIntercept(cancelPush, () => {
        cy.getIframe().find('.el-table__row').first('.el-switch').click()
      }, data => {
        expect(data).to.equal(200)
        iframeValidSuccessMessage('当前比对计划已过上报截止日期，不能取消推送')
      })
    })
    it('013-计划推送成功', () => {
      const majorName = '临床免疫学'
      const simpleNum = 3
      const labCode = 'gdtest5'
      addEqaPlan(singlePlanName, singlePlanCompareCode, majorName, simpleNum, labCode)
      subimtInformation()
      searchPlan(singlePlanName)
      waitIntercept(pushPlan, () => {
        cy.getIframe().find('.el-table__row').first().find('.el-switch').click()
      }, data => {
        expect(data).to.equal(200)
        cy.getIframe().find('.el-table__row').first().find('td').last().find('span').should('not.have.text', '编辑')
      })
    })
    it('014-取消推送', () => {
      searchPlan(singlePlanName)
      waitIntercept(cancelPush, () => {
        cy.getIframe().find('.el-table__row').first().find('.el-switch').click()
      }, data => {
        expect(data).to.equal(200)
        cy.getIframe().find('.el-table__row').first().find('td').last().findByText('删除').should('exist')
      })
    })
    it('015-删除计划', () => {
      const planName = '自动测试计划' + randomCode
      const planCompareCode = 'plan' + randomCode
      const majorName = '临床免疫学'
      const simpleNum = 3
      addEqaPlan(planName, planCompareCode, majorName, simpleNum)
      subimtInformation()
      searchPlan(planName)
      cy.getIframe().find('.el-table__row').first().find('td').last().findByText('删除').click({
        force: true
      })
      waitIntercept(deletePlan, () => {
        cy.getIframe().find('.el-popconfirm__action').last().find('button').contains('确定').click()
      }, data => {
        expect(data).to.equal(200)
      })
    })
    it('016-修改计划', () => {
      // const planName = '自动测试计划' + randomCode
      // const planCompareCode = 'plan' + randomCode
      // const majorName = '临床免疫学'
      // const simpleNum = 3
      // addEqaPlan(planName, planCompareCode, majorName, simpleNum)
      // subimtInformation()
      const newPlanName = '修改计划' + randomCode
      searchPlan('111111')
      cy.getIframe().find('.el-table__row').first().find('td').last().findByText('编辑').click({
        force: true
      })
      cy.wait(500)
      getIframeElement("name").invoke('val').then((val) => {
        const oldName = val
        getIframeElement("name").clear().type(newPlanName)
        subimtInformation()
        searchPlan(newPlanName)
        cy.getIframe().find('.el-table__row').first().find('td').last().findByText('编辑').click({
          force: true
        })
        cy.wait(500)
        getIframeElement("name").invoke('val').then((val) => {
          const newName = val
          expect(oldName).not.to.equal(newName)
        })
      })
    })
  })
  context.only('筛选条件', () => {
    it.only('017-专业分类查询', () => {
      const major = '常规化学'
      queryPlanData(major)
    })
    it('018-年度查询',() => {
      const year = 2023
     queryPlanData(null,year)
    })
    it('019-关键字查询' ,() => {
      const keyword = '计划'
     queryPlanData(null,null,keyword)
    })
    it('020-次数查询',() => {
      const time = 6
     queryPlanData(null,null,null,time)
    })
    it('020-次数查询',() => {
      const status = '已推送'
     queryPlanData(null,null,null,null,status)
    })
  })
  // it('013--比对计划组织-样本下发', () => {
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.wait(1000)
  //   cy.getIframe().find('[placeholder="请输入比对计划名称关键字"]').first().type('订单验证2', {
  //     force: true
  //   })
  //   cy.getIframe().find('button').contains('搜索').click()
  //   cy.wait(1000)
  //   cy.getIframe().find('.el-table__row').first().find('td').last().find('button').contains('样本下发').click({
  //     force: true
  //   })
  //   cy.getIframe().find('[type="checkbox"]').last().click({
  //     force: true
  //   })
  //   cy.intercept({
  //     url: '**/save',
  //     method: 'POST'
  //   }).as('save')
  //   cy.getIframe().find('.el-dialog__footer').first().find('button').contains('确定').click({
  //     force: true
  //   })
  //   cy.wait('@save').then((xhr) => {
  //     cy.compare(xhr)
  //     cy.getIframe().find('.el-message__content').should('have.text', '样本下发成功')
  //   })
  // })
  // it('014--比对计划组织-必填项校验', () => {
  //   cy.wait(1000)
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   let randomCode = parseInt(Math.random() * 100000)
  //   let compareCode = 'plan' + randomCode
  //   cy.wait(1000)
  //   //点击添加计划
  //   cy.getIframe().find('.el-button.el-button--primary.el-button--medium.is-plain').first().click()
  //   //----------------------校验比对计划编码----------------------
  //   //输入比对计划名称
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-input__inner').first().type(planName + randomCode, {
  //     force: true
  //   })
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('[placeholder="请选择"]').eq(1).click()
  //   cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains('6').click()
  //   // //点击确定
  //   cy.getIframe().find('#app').find('.el-button.el-button--primary.el-button--medium').eq(confire).click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-form-item__error').should('contain', '请填写比对计划编码')
  //   //--------------------校验比对计划名称------------------------------
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-input__inner').first().clear()
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-input__inner').eq(planCode).type(compareCode, {
  //     force: true
  //   })
  //   cy.getIframe().find('#app').find('.el-button.el-button--primary.el-button--medium').eq(confire).click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-form-item__error').should('contain', '请填写比对计划名称')
  // })
  // it('015--比对计划组织-唯一性校验', () => {
  //   let randomCode = parseInt(Math.random() * 100000)
  //   let compareCode = 'plan' + randomCode
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.wait(1000)
  //   //点击添加计划
  //   cy.getIframe().find('.el-button.el-button--primary.el-button--medium.is-plain').first().click()
  //   //----------------------以年度-计划名称-次数结合作为唯一项----------------------
  //   //输入比对计划名称
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-input__inner').first().type('订单验证2', {
  //     force: true
  //   })
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('[placeholder="请选择"]').eq(1).click()
  //   cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains('1').click()
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-input__inner').eq(planCode).type(compareCode, {
  //     force: true
  //   })
  //   cy.intercept({
  //     url: '**/add',
  //     method: 'POST'
  //   }).as('addPlan')
  //   //点击确定
  //   cy.getIframe().find('#app').find('.el-button.el-button--primary.el-button--medium').eq(confire).click({
  //     force: true
  //   })
  //   cy.wait('@addPlan').then((xhr) => {
  //     cy.compare(xhr)
  //     cy.getIframe().find('.el-message__content').should('have.text', '计划名称-年度-次数结合必须唯一')
  //   })
  //   //--------------------计划编码唯一------------------------------
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-input__inner').first().clear().type(planName + randomCode, {
  //     force: true
  //   })
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-input__inner').eq(planCode).clear().type('2', {
  //     force: true
  //   })
  //   cy.intercept({
  //     url: '**/add',
  //     method: 'POST'
  //   }).as('addPlan')
  //   //点击确定
  //   cy.getIframe().find('#app').find('.el-button.el-button--primary.el-button--medium').eq(confire).click({
  //     force: true
  //   })
  //   cy.wait('@addPlan').then((xhr) => {
  //     cy.compare(xhr)
  //     cy.getIframe().find('.el-message__content').should('have.text', '比对计划编码必须唯一')
  //   })
  // })
  // it('016--比对计划组织-样本数输入验证', () => {
  //   let randomCode = parseInt(Math.random() * 100000)
  //   let compareCode = 'plan' + randomCode
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.wait(1000)
  //   //点击添加计划
  //   cy.getIframe().find('.el-button.el-button--primary.el-button--medium.is-plain').first().click()
  //   //输入比对计划名称
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-input__inner').first().type(planName + randomCode, {
  //     force: true
  //   })
  //   //输入比对计划编码
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-input__inner').eq(planCode).type(compareCode, {
  //     force: true
  //   })
  //   //输入次数
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('[placeholder="请选择"]').eq(1).click()
  //   cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().find('.el-select-dropdown__item').should('have.length', 12)
  //   cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains('6').click()
  //   //输入样本数
  //   //----------不能为小数-----------
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('[role="spinbutton"]').clear().type(2.4, {
  //     force: true
  //   })
  //   cy.getIframe().find('button').contains('下一步').click()
  //   cy.getIframe().find('.el-form-item__error').should('contain', '请输入正整数')
  //   //----------负数自动转为1-----------
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('[role="spinbutton"]').clear().type(-10, {
  //     force: true
  //   })
  //   cy.getIframe().find('button').contains('下一步').click()
  //   cy.getIframe().find('button').contains('上一步').click()
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('[role="spinbutton"]').should('have.value', 1)
  //   //非盲样模式样本数最大值为99
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('[role="spinbutton"]').clear().type(1000, {
  //     force: true
  //   })
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('[placeholder="请选择"]').last().click()
  //   cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains('非盲样模式').click()
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('[role="spinbutton"]').should('have.value', 99)
  // })
  // it('017--比对计划组织-检测开始时间<=样本下发结束时间', () => {
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.wait(1000)
  //   //点击添加计划
  //   cy.getIframe().find('.el-button.el-button--primary.el-button--medium.is-plain').first().click()
  //   //--------------样本下发时间----------------------
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-range-input').first().click()
  //   //下发开始时间
  //   cy.getIframe().find('.el-date-table').first().find('tbody>tr').eq(issueTime).find('td').eq(issueTime).click()
  //   //下发结束时间
  //   cy.getIframe().find('.el-date-table').first().find('tbody>tr').eq(issueEndTime).find('td').eq(issueEndTime).click()
  //   //-------------样本检测时间------------------------
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-range-input').eq(testTime).click()
  //   //检测开始时间
  //   cy.getIframe().find('.el-date-table').eq(testTime).find('tbody>tr').eq(1).find('td').eq(testStartTime).click()
  //   //检测结束时间
  //   cy.getIframe().find('.el-date-table').eq(testTime).find('tbody>tr').eq(testEndTime).find('td').eq(testEndTime).click()
  //   cy.getIframe().find('.el-form-item__error').should('contain', '样本下发结束时间不能大于样本检测开始时间')
  // })
  // it('018--比对计划组织-检测结束时间<=报告反馈时间', () => {
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.wait(1000)
  //   //点击添加计划
  //   cy.getIframe().find('.el-button.el-button--primary.el-button--medium.is-plain').first().click()
  //   //-------------样本检测时间------------------------
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-range-input').eq(testTime).click()
  //   //检测开始时间
  //   cy.getIframe().find('.el-date-table').last().find('tbody>tr').eq(testStartTime).find('td').eq(testStartTime).click()
  //   //检测结束时间
  //   cy.getIframe().find('.el-date-table').last().find('tbody>tr').eq(testEndTime).find('td').eq(testEndTime).click()
  //   //-----------报告反馈时间----------------------------
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-range-input').last().click()
  //   //报告开始时间
  //   cy.getIframe().find('.el-date-table').last().find('tbody>tr').eq(1).find('td').eq(feedBackStartDay).click()
  //   //报告结束时间
  //   cy.getIframe().find('.el-date-table').last().find('tbody>tr').eq(feedBackEndTime).find('td').eq(feedBackEndDay).click()
  //   cy.getIframe().find('.el-form-item__error').should('contain', '样本检测结束时间不能大于报告反馈开始时间')
  // })
  // it('019--比对计划组织-项目无TEa不允许启用', () => {
  //   let randomCode = parseInt(Math.random() * 100000)
  //   let compareCode = 'plan' + randomCode
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.wait(1000)
  //   //点击添加计划
  //   cy.getIframe().find('.el-button.el-button--primary.el-button--medium.is-plain').first().click()
  //   //输入比对计划名称
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-input__inner').first().type(planName + randomCode, {
  //     force: true
  //   })
  //   //输入比对计划编码
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-input__inner').eq(planCode).type(compareCode, {
  //     force: true
  //   })
  //   //选择专业
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-input__inner').eq(major).click()
  //   cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains('新冠病毒核酸检测').click()
  //   //输入次数
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('[placeholder="请选择"]').eq(1).click()
  //   cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains('6').click()
  //   cy.getIframe().find('button').contains('下一步').click()
  //   cy.getIframe().find('.el-card__body').find('.el-switch__core').first().click()
  //   cy.getIframe().find('.el-message__content').should('have.text', '该项目不存在TEa来源数据，无法启用！')
  // })
  // it('020-比对计划组织-未上报的实验室不能生成报告', () => {
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.wait(1000)
  //   cy.getIframe().find('[placeholder="请输入比对计划名称关键字"]').first().type('订单验证2', {
  //     force: true
  //   })
  //   cy.getIframe().find('button').contains('搜索').click()
  //   cy.wait(1000)
  //   cy.getIframe().find('.el-table__row').first().find('td').last().find('.el-button.el-button--text.el-button--medium').contains('生成报告').click({
  //     force: true
  //   })
  //   //无法生成报告，确定按键置灰
  //   cy.getIframe().find('.el-dialog.dialog-report-tpl').find('.el-dialog__footer').last().find('.el-button.el-button--primary.el-button--medium').should('have.class', 'is-disabled')
  // })
  // it('021-比对计划组织-报告模板成功保存', () => {
  //   let modelName = '报告模板名称'
  //   let randomCode = parseInt(Math.random() * 100000)
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.wait(1000)
  //   cy.getIframe().find('[placeholder="请输入比对计划名称关键字"]').first().type('订单验证2', {
  //     force: true
  //   })
  //   cy.getIframe().find('button').contains('搜索').click()
  //   cy.wait(1000)
  //   cy.getIframe().find('.el-table__row').first().find('td').last().find('.el-button.el-button--text.el-button--medium').contains('生成报告').click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-card__body').last().find('.el-checkbox-group').contains('所有实验室').click()
  //   cy.getIframe().find('.el-dialog.dialog-report-tpl').find('.el-dialog__footer').last().find('button').contains('保存为模板').click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-form').last().find('.el-input__inner').type(modelName + randomCode, {
  //     force: true
  //   })
  //   cy.intercept({
  //     url: '**/add',
  //     method: 'POST'
  //   }).as('add')
  //   cy.getIframe().find('.el-form').last().find('button').contains('保存').click({
  //     force: true
  //   })
  //   cy.wait('@add').then((xhr) => {
  //     cy.compare(xhr)
  //     cy.getIframe().find('.el-message__content').should('have.text', '模板保存成功')
  //   })
  // })
  // it('022-比对计划组织-未选择所属组模板保存失败', () => {
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.wait(1000)
  //   cy.getIframe().find('[placeholder="请输入比对计划名称关键字"]').first().type('订单验证2', {
  //     force: true
  //   })
  //   cy.getIframe().find('button').contains('搜索').click()
  //   cy.wait(1000)
  //   cy.getIframe().find('.el-table__row').first().find('td').last().find('.el-button.el-button--text.el-button--medium').contains('生成报告').click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-dialog.dialog-report-tpl').find('.el-dialog__footer').last().find('button').contains('保存为模板').click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-form').last().find('.el-input__inner').type(123, {
  //     force: true
  //   })
  //   cy.getIframe().find('.el-form').last().find('button').contains('保存').click({
  //     force: true
  //   })
  // })
  // it('023-比对计划组织-模板名称一样保存失败', () => {
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.wait(1000)
  //   cy.getIframe().find('[placeholder="请输入比对计划名称关键字"]').first().type('订单验证2', {
  //     force: true
  //   })
  //   cy.getIframe().find('button').contains('搜索').click()
  //   cy.wait(1000)
  //   cy.getIframe().find('.el-table__row').first().find('td').last().find('.el-button.el-button--text.el-button--medium').contains('生成报告').click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-card__body').last().find('.el-checkbox-group').contains('所有实验室').click()
  //   cy.getIframe().find('.el-dialog.dialog-report-tpl').find('.el-dialog__footer').last().find('button').contains('保存为模板').click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-form').last().find('.el-input__inner').type('模板1', {
  //     force: true
  //   })
  //   cy.getIframe().find('.el-form').last().find('button').contains('保存').click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-form-item__error').should('contain', '模板名称不能重复')
  // })
  // it('024-比对计划组织-报告生成使用模板', () => {
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.wait(1000)
  //   cy.getIframe().find('[placeholder="请输入比对计划名称关键字"]').first().type('订单验证2', {
  //     force: true
  //   })
  //   cy.getIframe().find('button').contains('搜索').click()
  //   cy.wait(1000)
  //   cy.getIframe().find('.el-table__row').first().find('td').last().find('.el-button.el-button--text.el-button--medium').contains('生成报告').click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-dialog.dialog-report-tpl').find('.el-dialog__footer').last().find('button').contains('选择模板').click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-table__body').last().find('.el-table__row').find('button').first().click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-card__body').last().find('.el-checkbox-group').find('.el-checkbox').first().should('have.class', 'is-checked')
  // })
  // it('025-比对计划组织-报告生成修改模板(模板名称)', () => {
  //   let randomCode = parseInt(Math.random() * 100000)
  //   let newName = '修改模板'
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.wait(1000)
  //   cy.getIframe().find('[placeholder="请输入比对计划名称关键字"]').first().type('订单验证2', {
  //     force: true
  //   })
  //   cy.getIframe().find('button').contains('搜索').click()
  //   cy.wait(1000)
  //   cy.getIframe().find('.el-table__row').first().find('td').last().find('.el-button.el-button--text.el-button--medium').contains('生成报告').click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-dialog.dialog-report-tpl').find('.el-dialog__footer').last().find('button').contains('选择模板').click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-table__body').last().find('.el-table__row ').first().find('.cell').first().invoke('text').then((text) => {
  //     let getName = text
  //     cy.getIframe().find('.el-table__body').last().find('.el-table__row').first().find('.el-button.el-button--text.el-button--mini').eq(1).click({
  //       force: true
  //     })
  //     cy.getIframe().find('.el-dialog__body').last().find('.el-input__inner').first().clear().type(newName + randomCode, {
  //       force: true
  //     })
  //     cy.intercept({
  //       url: '**/edit',
  //       method: 'POST'
  //     }).as('edit')
  //     cy.getIframe().find('.el-dialog__footer').last().find('button').contains('确定').click()
  //     cy.wait('@edit').then((xhr) => {
  //       cy.compare(xhr)
  //       cy.getIframe().find('.el-message__content').should('have.text', '模板更新成功')
  //       cy.getIframe().find('.el-dialog.dialog-report-tpl').find('.el-dialog__footer').last().find('button').contains('选择模板').click({
  //         force: true
  //       })
  //       cy.getIframe().find('.el-table__body').last().find('.el-table__row ').first().find('.cell').first().invoke('text').then((text) => {
  //         let getNewName = text
  //         expect(getName).not.to.eq(getNewName)
  //         expect(getNewName).to.eq(getNewName)
  //       })
  //     })
  //   })
  // })
  // it('026-比对计划组织-报告生成删除模板', () => {
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.wait(1000)
  //   cy.getIframe().find('[placeholder="请输入比对计划名称关键字"]').first().type('订单验证2', {
  //     force: true
  //   })
  //   cy.getIframe().find('button').contains('搜索').click()
  //   cy.wait(1000)
  //   cy.getIframe().find('.el-table__row').first().find('td').last().find('.el-button.el-button--text.el-button--medium').contains('生成报告').click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-dialog.dialog-report-tpl').find('.el-dialog__footer').last().find('button').contains('选择模板').click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-table__body').last().find('.el-table__row ').then((length) => {
  //     let getLength = length.length
  //     cy.getIframe().find('.el-table__body').last().find('.el-table__row').first().find('.el-button.el-button--text.el-button--mini').last().click({
  //       force: true
  //     })
  //     cy.intercept({
  //       url: '**/delete?*',
  //       method: 'POST'
  //     }).as('delete')
  //     cy.getIframe().find('.el-popconfirm__action').last().find('.el-button.el-button--primary.el-button--mini').click({
  //       force: true
  //     })
  //     cy.wait('@delete').then((xhr) => {
  //       cy.compare(xhr)
  //       cy.getIframe().find('.el-table__body').last().find('.el-table__row ').should('have.length', getLength - 1)
  //     })
  //   })
  // })
  // it('027-比对计划组织-生成报告', () => {
  //   cy.wait(1000)
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.getIframe().find('[placeholder="请输入比对计划名称关键字"]').first().type('新冠质管核酸检测', {
  //     force: true
  //   })
  //   cy.getIframe().find('button').contains('搜索').click()
  //   cy.getIframe().find('.el-table__row').first().find('td').last().find('.el-button.el-button--text.el-button--medium').contains('生成报告').click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-card__body').last().find('.el-checkbox-group').contains('所有实验室').click()
  //   cy.getIframe().find('.el-dialog.dialog-report-tpl').find('.el-dialog__footer').last().find('.el-button.el-button--primary.el-button--medium').last().click()
  //   cy.intercept({
  //     url: '**/generate',
  //     method: 'POST'
  //   }).as('generate')
  //   cy.getIframe().find('.el-message-box').find('button').contains('已配置').click()
  //   cy.wait('@generate').then((xhr) => {
  //     cy.compare(xhr)
  //     cy.getIframe().find('.el-message__content').should('have.text', '生成反馈报告任务已提交，可以在反馈报告页面查看报告')
  //   })
  // })
  // it('028-比对计划组织-筛选条件', () => {
  //   let majorType = 1
  //   let year = 2
  //   let times = 3
  //   let status = 4
  //   cy.wait(1000)
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.wait(1000)
  //   cy.getIframe().find('button').contains('展开').click()
  //   //---------------比对计划名称关键字----------
  //   cy.getIframe().find('[placeholder="请输入比对计划名称关键字"]').first().type('新冠质管核酸检测', {
  //     force: true
  //   })
  //   cy.intercept({
  //     url: '**/search?*',
  //     method: 'GET'
  //   }).as('searchKeyword')
  //   cy.getIframe().find('button').contains('搜索').click({
  //     force: true
  //   })
  //   cy.wait('@searchKeyword').then((xhr) => {
  //     cy.compare(xhr)
  //     cy.eqaSearch(xhr)
  //     cy.getIframe().find('button').contains('重置').click()
  //   })
  //   //---------------专业分类----------
  //   cy.getIframe().find('[placeholder="请选择"]').eq(majorType).click()
  //   cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains('常规化学').click()
  //   cy.intercept({
  //     url: '**/search?*',
  //     method: 'GET'
  //   }).as('searchMajor')
  //   cy.getIframe().find('button').contains('搜索').click({
  //     force: true
  //   })
  //   cy.wait('@searchMajor').then((xhr) => {
  //     cy.compare(xhr)
  //     cy.eqaSearch(xhr)
  //     cy.getIframe().find('button').contains('重置').click()
  //   })
  //   //---------------年度----------
  //   cy.getIframe().find('[placeholder="请选择"]').eq(year).click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains('2023').click()
  //   cy.intercept({
  //     url: '**/search?*',
  //     method: 'GET'
  //   }).as('searchYear')
  //   cy.getIframe().find('button').contains('搜索').click({
  //     force: true
  //   })
  //   cy.wait('@searchYear').then((xhr) => {
  //     cy.compare(xhr)
  //     cy.eqaSearch(xhr)
  //     cy.getIframe().find('button').contains('重置').click()
  //   })
  //   //---------------次数----------
  //   cy.getIframe().find('[placeholder="请选择"]').eq(times).click()
  //   cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains('6').click()
  //   cy.intercept({
  //     url: '**/search?*',
  //     method: 'GET'
  //   }).as('searchTimes')
  //   cy.getIframe().find('button').contains('搜索').click({
  //     force: true
  //   })
  //   cy.wait('@searchTimes').then((xhr) => {
  //     cy.compare(xhr)
  //     cy.eqaSearch(xhr)
  //     cy.getIframe().find('button').contains('重置').click()
  //   })
  //   //---------------状态----------
  //   cy.getIframe().find('[placeholder="请选择"]').eq(status).click()
  //   cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains('已推送').click()
  //   cy.intercept({
  //     url: '**/search?*',
  //     method: 'GET'
  //   }).as('searchStatus')
  //   cy.getIframe().find('button').contains('搜索').click({
  //     force: true
  //   })
  //   cy.wait('@searchStatus').then((xhr) => {
  //     cy.compare(xhr)
  //     cy.eqaSearch(xhr)
  //     cy.getIframe().find('button').contains('重置').click()
  //   })
  //   cy.getIframe().find('[placeholder="请选择"]').eq(status).click()
  //   cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains('待推送').click()
  //   cy.intercept({
  //     url: '**/search?*',
  //     method: 'GET'
  //   }).as('searchPush')
  //   cy.getIframe().find('button').contains('搜索').click({
  //     force: true
  //   })
  //   cy.wait('@searchPush').then((xhr) => {
  //     cy.compare(xhr)
  //     cy.eqaSearch(xhr)
  //     cy.getIframe().find('button').contains('重置').click()
  //   })
  //   //---------------质控主管单位---------- 
  //   cy.getIframe().find('[placeholder="请选择"]').first().click()
  //   cy.getIframe().find('.el-scrollbar__view.el-select-dropdown__list').last().contains('青浦医联体').click()
  //   cy.intercept({
  //     url: '**/search?*',
  //     method: 'GET'
  //   }).as('searchOrg') 
  //   cy.getIframe().find('button').contains('搜索').click({
  //     force: true
  //   })
  //   cy.wait('@searchOrg').then((xhr) => {
  //     cy.compare(xhr)
  //     cy.eqaSearch(xhr)
  //     cy.getIframe().find('button').contains('重置').click()
  //   })
  // })
  // it('030-比对计划组织-推送计划', () => {
  //   let confire = 15
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.getIframe().find('[placeholder="请输入比对计划名称关键字"]').first().type('自动', {
  //     force: true
  //   })
  //   cy.getIframe().find('button').contains('搜索').click()
  //   //编辑计划
  //   cy.getIframe().find('.el-table__row').first().find('td').last().find('.el-button.el-button--text.el-button--medium').contains('编辑').click({
  //     force: true
  //   })
  //   cy.getIframe().find('button').contains('下一步').click()
  //   cy.getIframe().find('button').contains('下一步').click()
  //   //选择发送对象
  //   cy.getIframe().find('[placeholder="请输入实验室名称或编码"]').last().type('gdtest5', {
  //     force: true
  //   })
  //   cy.wait(1000)
  //   cy.getIframe().find('.el-form.el-form--inline').last().find('.el-icon-search').first().click({
  //     force: true
  //   })
  //   cy.wait(1000)
  //   cy.getIframe().find('.ql-card-list__list').find('.el-card.is-always-shadow.ql-card-list__item').last().click()
  //   //保存
  //   cy.getIframe().find('#app').find('.el-button.el-button--primary.el-button--medium').eq(confire).click({
  //     force: true
  //   })
  //   cy.wait(1000)
  //   cy.intercept({
  //     url: '**/push?id=*',
  //     method: 'POST'
  //   }).as('pushPlan')
  //   cy.getIframe().find('.el-table__row').first().find('.el-switch').click()
  //   cy.wait('@pushPlan').then((xhr) => {
  //     cy.compare(xhr)
  //     cy.getIframe().find('.el-table__row').first().find('td').last().find('span').should('not.have.text', '编辑')
  //   })
  // })
  // it('031-比对计划组织-取消推送比对计划', () => {
  //   cy.wait(1000)
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.wait(1000)
  //   cy.getIframe().find('[placeholder="请输入比对计划名称关键字"]').first().type('自动', {
  //     force: true
  //   })
  //   cy.getIframe().find('button').contains('搜索').click()
  //   cy.wait(1000)
  //   cy.intercept({
  //     url: '**/cancelPush?*',
  //     method: 'POST'
  //   }).as('cancelPush')
  //   cy.getIframe().find('.el-table__row').first().find('.el-switch').click()
  //   cy.wait('@cancelPush').then((xhr) => {
  //     cy.compare(xhr)
  //   })
  // })
  // it('032-比对计划组织-修改比对计划', () => {
  //   let randomCode = parseInt(Math.random() * 100000)
  //   let confire = 15
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.getIframe().find('[placeholder="请输入比对计划名称关键字"]').first().type('自动', {
  //     force: true
  //   })
  //   cy.getIframe().find('button').contains('搜索').click()
  //   cy.getIframe().find('.el-table__row').first().find('td').last().find('.el-button.el-button--text.el-button--medium').contains('编辑').click({
  //     force: true
  //   })
  //   cy.getIframe().find('.el-form.eqa-plan-info').find('.el-input__inner').first().clear().type('修改计划' + randomCode, {
  //     force: true
  //   })
  //   cy.intercept({
  //     url: '**/service/plan/update',
  //     method: 'POST'
  //   }).as('update')
  //   cy.getIframe().find('#app').find('.el-button.el-button--primary.el-button--medium').eq(confire).click({
  //     force: true
  //   })
  //   cy.wait('@update').then((xhr) => {
  //     cy.compare(xhr)
  //     cy.getIframe().find('.el-message__content').should('have.text', '编辑比对计划成功')
  //   })
  // })
  // it('033-比对计划组织-删除比对计划', () => {
  //   cy.wait(1000)
  //   cy.visitEQA()
  //   cy.frameLoaded('.frame-content__body')
  //   cy.wait(1000)
  //   cy.getIframe().find('[placeholder="请输入比对计划名称关键字"]').first().type('修改', {
  //     force: true
  //   })
  //   cy.getIframe().find('button').contains('搜索').click()
  //   cy.getIframe().find('.el-table__row').first().find('td').last().find('.el-button.el-button--text.el-button--medium').contains('删除').click({
  //     force: true
  //   })
  //   cy.intercept({
  //     url: '**/delete*',
  //     method: 'POST'
  //   }).as('deletePlan')
  //   cy.getIframe().find('.el-popconfirm__action').last().find('button').contains('确定').click()
  //   cy.wait('@deletePlan').then((xhr) => {
  //     cy.compare(xhr)
  //   })
  // })
})