/**
 * 开展项目设置
 */
context('结果互认设置-开展项目设置', () => {
  before(() => {
    cy.loginCQB()
    cy.intercept('GET', '**/specList*').as('getData')
    cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-item')
    cy.wait('@getData')
  })
  it('001-开展项目设置-添加相同的项目分类', () => {
    cy.wait(1000)
    let ItemType = 0
    let ItemChoose = 1
    let DropDownList = 1
    let ItemList = 0
    let Type = 4
    //点击添加项目分类
    cy.get('.el-button.el-button--primary.el-button--medium').eq(ItemType).click({
      force: true
    })
    //点击项目分类下拉框
    cy.get('input[placeholder="请选择"]').eq(ItemChoose).click({
      force: true
    })
    cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').eq(ItemList).click({
      force: true
    })
    cy.get('.el-input__inner').eq(Type).type('尿干化学', {
      force: true
    })
    cy.get('button').contains('确定').click({
      force: true
    })
    cy.wait(1000)
    //界面弹出【分类名称已存在, 请重输】提示则通过
    cy.get('body').should('contain', '分类名称已存在, 请重输')
  })
  it('002-开展项目设置-添加不存在的项目分类', () => {
    let Type = 4
    cy.get('.el-input__inner').eq(Type).clear({
      force: true
    }).type('自动化测试', {
      force: true
    })
    cy.get('button').contains('确定').click({
      force: true
    })
    //界面存在【自动化测试】这个分类则通过
    cy.get('body').should('contain', '自动化测试')
  })
  it('003-开展项目设置-编辑项目分类', () => {
    let Edit = 0
    let InputBox = 3
    cy.wait(1000)
    cy.get('.item-configNew__aside-body').find('.el-menu-item').then((Yielded) => {
      let ElementLength = Yielded.length
      cy.get('.item-configNew__type-action').eq(ElementLength - 1).find('i').eq(Edit).click({
        force: true
      })
      /**
             * 编辑已存在的名称不允许保存
             */
      cy.get('.el-input__inner').eq(InputBox).clear({
        force: true
      }).type('常规化学', {
        force: true
      })
      cy.get('body').should('contain', '分类名称已存在, 请重输')
      /**
             * 编辑新的名称可以保存
             */
      cy.get('.el-input__inner').eq(InputBox).clear({
        force: true
      }).type('自定义名称AAA')
      cy.get('button').contains('确定').click({
        force: true
      })
      //界面存在【自定义名称AAA】这个分类则通过
      cy.get('body').should('contain', '自定义名称AAA')
    })


  })
  it('004-开展项目设置-删除项目项目分类', () => {
    /**
         * 分类下已存在项目不允许删除(删除常规化学)
         */
    let ChemicalType = 0
    let Delete = 1
    cy.wait(1000)
    cy.get('.item-configNew__aside-body').find('.el-menu-item').then((Yielded) => {
      let ElementLength = Yielded.length
      cy.get('.item-configNew__type-action').eq(ChemicalType).find('i').eq(Delete).click({
        force: true
      })
      cy.intercept('**/itemCategory/*').as('delete')
      cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
        force: true
      })
      //界面弹出【项目分类下存在项目】则通过
      cy.wait('@delete')
      cy.get('body').should('contain', '项目分类下存在项目')
      /**
             * 分类下不存在项目允许删除(删除自定义项目分类)
             */
      cy.get('.item-configNew__type-action').eq(ElementLength - 1).find('i').eq(Delete).click({
        force: true
      })
      cy.intercept('**/itemCategory/*').as('delete')
      cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
        force: true
      })
      cy.wait('@delete')
      //删除成功 类el-menu-item的长度如果减一，就通过
      cy.get('.item-configNew__aside-body').find('.el-menu-item').should('have.length', ElementLength - 1)
    })

  })
  it('005-开展项目设置-添加项目', () => {
    /**
         * 添加已存在的项目(钾)
         */
    cy.wait(500)
    let AddItem = 1
    let ItemList = 2
    let DropDownList = 6
    let Unit = 4
    let UnitDownList = 6
    let ChooseUnit = 0
    let ConfirmButton = 4
    cy.wait(1000)
    //项目分类选择常规化学
    cy.get('.el-menu').last().find('li').contains('常规化学').click({
      force: true
    })
    cy.get('.el-button.el-button--primary.el-button--medium').eq(AddItem).click({
      force: true
    })
    //选择项目
    cy.get('input[placeholder="请选择"]').eq(ItemList).click({
      force: true
    })
    cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').contains('钾').click({
      force: true
    })
    //选择单位
    cy.get('input[placeholder="请选择"]').eq(Unit).click({
      force: true
    })
    cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(UnitDownList).find('li').eq(ChooseUnit).click({
      force: true
    })
    //点击确定
    cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
      force: true
    })
    //界面弹出【项目已存在】则通过
    cy.get('body').should('contain', '项目已存在')
    /**
         * 添加新的项目(铁)
         */
    //获取初始项目个数
    cy.get('.item-configNew__list').find('div').eq(0).find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').then((Yielded) => {
      let ElementLength = Yielded.length
      cy.log(ElementLength)
      cy.get('input[placeholder="请选择"]').eq(ItemList).click({
        force: true
      })
      cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').contains('铁(测试)').click({
        force: true
      })
      //选择单位
      cy.get('input[placeholder="请选择"]').eq(Unit).click({
        force: true
      })
      cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(UnitDownList).find('li').eq(ChooseUnit).click({
        force: true
      })
      cy.intercept('PUT', '**/itemCclRela*').as('addItem')
      //点击确定
      cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
        force: true
      })
      cy.wait('@addItem')
      // 判断类.el-card.ql-itemCard.item-configNew__item.is-always-shadow是否加一了,即项目添加成功
      cy.get('.item-configNew__list').find('div').eq(0).find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').should('have.length', ElementLength + 1)
    })

  })
  it('006-开展项目设置-编辑项目', () => {
    /**
         * 编辑项目-将常规化学中的项目铁划分到全血细胞计数
         */
    cy.wait(500)
    let ConfirmButton = 4
    let EditButton = 1
    let EditIndex = 0
    let DropList = 6
    let InputBox = 1
    let Classindex = 0
    let ClassIndex = 0
    //项目分类选择常规化学
    cy.get('.el-menu').last().find('li').contains('常规化学').click({
      force: true
    })
    cy.wait(1000)
    // 获取未将将常规化学中的项目铁划分到全血细胞计数时的.el-card.ql-itemCard.item-configNew__item.is-always-shadow的长度
    cy.get('.item-configNew__list').find('div').eq(Classindex).find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').then((Yielded) => {
      let ChemicalLength = Yielded.length
      cy.wait(500)
      cy.intercept('GET', '**/item*').as('getItem')
      cy.get('.item-configNew__item-action').eq(EditButton).find('i').eq(EditIndex).click({
        force: true
      })
      cy.wait('@getItem')
      cy.get('input[placeholder="请选择"]').eq(InputBox).click({
        force: true
      })
      cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropList).find('li').contains('全血细胞计数').click({
        force: true
      })
      cy.intercept('PUT', '**/itemCclRela*').as('editItem')
      //    点击确定
      cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
        force: true
      })
      cy.wait('@editItem')
      // 判断类.el-card.ql-itemCard.item-configNew__item.is-always-shadow是否减一了,即项目编辑成功
      cy.get('.item-configNew__list').find('div').eq(ClassIndex).find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').should('have.length', ChemicalLength - 1)
      /**
             * 将项目铁返回到之前的项目分类
             */
      cy.intercept('GET', '**/category?*').as('getData')
      cy.get('.el-menu').last().find('li').contains('全血细胞计数').click({
        force: true
      })
      cy.wait('@getData')
      cy.intercept('GET', '**/item*').as('getItem')
      cy.get('.item-configNew__item-action').eq(EditButton).find('i').eq(EditIndex).click({
        force: true
      })
      cy.wait('@getItem')
      cy.wait(3000)
      cy.get('input[placeholder="请选择"]').eq(InputBox).click({
        force: true
      })
      cy.wait(1000)
      cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropList).find('li').contains('常规化学').click({
        force: true
      })
      cy.intercept('PUT', '**/itemCclRela*').as('editItem')
      cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
        force: true
      })
      cy.wait('@editItem')
    })

  })
  it('007-开展项目设置-开展定性项目', () => {
    let EditButton = 1
    let EditIndex = 0
    let SelectIndex = 3
    let DropList = 6
    let ConfirmButton = 4
    //项目分类选择常规化学
    cy.wait(1000)
    cy.intercept('**/cqb-base-mgr/service/mgr/itemCclRela/category?categoryId=1*').as('getData')
    cy.get('.el-menu').last().find('li').contains('常规化学').click({
      force: true
    })
    cy.wait('@getData')
    cy.intercept('GET', '**/unit*').as('getUnit')
    cy.get('.item-configNew__item-action').eq(EditButton).find('i').eq(EditIndex).click({
      force: true
    })
    cy.wait('@getUnit')
    cy.get('input[placeholder="请选择"]').eq(SelectIndex).click({
      force: true
    })
    cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropList).find('li').contains('定性').click({
      force: true
    })
    cy.intercept('**/itemCclRela*').as('editItem')
    cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
      force: true
    })
    cy.wait('@editItem')
    cy.intercept('GET', '**/unit*').as('getUnit')
    cy.get('.item-configNew__item-action').eq(EditButton).find('i').eq(EditIndex).click({
      force: true
    })
    cy.wait('@getUnit')
    // 界面出现定性则通过
    cy.get('body').should('contain', '定性')
    cy.intercept('PUT', '**/cqb-base-mgr/service/mgr/itemCclRela').as('editItem')
    cy.wait(2000)
    cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
      force: true
    })
    cy.wait('@editItem')
  })
  it('008-开展项目设置-开展定量项目', () => {
    let EditButton = 1
    let EditIndex = 0
    let SelectIndex = 3
    let DropList = 6
    let ConfirmButton = 4
    //项目分类选择常规化学
    cy.wait(1000)
    cy.intercept('**/cqb-base-mgr/service/mgr/itemCclRela/category?categoryId=1*').as('getData')
    cy.get('.el-menu').last().find('li').contains('常规化学').click({
      force: true
    })
    cy.wait('@getData')
    cy.intercept('GET', '**/unit*').as('getUnit')
    cy.get('.item-configNew__item-action').eq(EditButton).find('i').eq(EditIndex).click({
      force: true
    })
    cy.wait('@getUnit')
    cy.get('input[placeholder="请选择"]').eq(SelectIndex).click({
      force: true
    })
    cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropList).find('li').contains('定量').click({
      force: true
    })
    cy.intercept('**/itemCclRela*').as('editItem')
    cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
      force: true
    })
    cy.wait('@editItem')
    cy.intercept('GET', '**/unit*').as('getUnit')
    cy.get('.item-configNew__item-action').eq(EditButton).find('i').eq(EditIndex).click({
      force: true
    })
    cy.wait('@getUnit')
    // 界面出现定性则通过
    cy.get('body').should('contain', '定量')
    cy.intercept('PUT', '**/cqb-base-mgr/service/mgr/itemCclRela').as('editItem')
    cy.wait(2000)
    cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
      force: true
    })
    cy.wait('@editItem')
  })
  it('009-开展项目设置-开展不限项目', () => {
    let EditButton = 1
    let EditIndex = 0
    let SelectIndex = 3
    let DropList = 6
    let ConfirmButton = 4
    //项目分类选择常规化学
    cy.wait(1000)
    cy.intercept('**/cqb-base-mgr/service/mgr/itemCclRela/category?categoryId=1*').as('getData')
    cy.get('.el-menu').last().find('li').contains('常规化学').click({
      force: true
    })
    cy.wait('@getData')
    cy.intercept('GET', '**/unit*').as('getUnit')
    cy.get('.item-configNew__item-action').eq(EditButton).find('i').eq(EditIndex).click({
      force: true
    })
    cy.wait('@getUnit')
    cy.get('input[placeholder="请选择"]').eq(SelectIndex).click({
      force: true
    })
    cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropList).find('li').contains('不限').click({
      force: true
    })
    cy.intercept('**/itemCclRela*').as('editItem')
    cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
      force: true
    })
    cy.wait('@editItem')
    cy.intercept('GET', '**/unit*').as('getUnit')
    cy.get('.item-configNew__item-action').eq(EditButton).find('i').eq(EditIndex).click({
      force: true
    })
    cy.wait('@getUnit')
    // 界面出现定性则通过
    cy.get('body').should('contain', '不限')
    cy.intercept('PUT', '**/cqb-base-mgr/service/mgr/itemCclRela').as('editItem')
    cy.wait(2000)
    cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
      force: true
    })
    cy.wait('@editItem')
  })
  it('010-开展项目设置-删除项目', () => {
    cy.wait(500)
    let DeleteIndex = 1
    let DeleteButton = 1
    let deleteK = 0
    let Classindex = 0
    //项目分类选择常规化学
    cy.wait(1000)
    cy.get('.el-menu').last().find('li').contains('常规化学').click({
      force: true
    })
    cy.wait(1000)
    cy.get('.item-configNew__list').find('div').eq(Classindex).find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').then((Yielded) => {
      let ChemicalLength = Yielded.length
      cy.log(ChemicalLength)
      /**
             * 项目已关联数据不能删除
             */
      cy.get('.item-configNew__item-action').eq(deleteK).find('i').eq(DeleteButton).click({
        force: true
      })
      cy.intercept({
        url:'**/cqb-base-mgr/service/mgr/itemCclRela/*',
        method:'DELETE'
      }).as('delete')
      cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
        force: true
      })
      cy.wait('@delete').then((xhr)=>{
        cy.compare(xhr,400)
        cy.wait(500)
        // 判断类.el-card.ql-itemCard.item-configNew__item.is-always-shadow是否未减一了,即项目未删除
        cy.get('.item-configNew__list').find('div').eq(Classindex).find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').should('have.length', ChemicalLength)
        cy.get('body').should('contain', '该项目下存在检测体系,无法删除')
      })
      /**
             * 项目未关联数据可以删除成功
             */
      cy.get('.item-configNew__item-action').eq(DeleteButton).find('i').eq(DeleteIndex).click({
        force: true
      })
      cy.intercept('DELETE', '**/itemCclRela/*').as('deleteItem')
      cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
        force: true
      })
      cy.wait('@deleteItem')
      // 判断类.el-card.ql-itemCard.item-configNew__item.is-always-shadow是否减一了,即项目删除成功
      cy.get('.item-configNew__list').find('div').eq(Classindex).find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').should('have.length', ChemicalLength - 1)
    })

  })
  it('011-开展项目设置-项目搜索', () => {
    cy.wait(500)
    cy.wait(1000)
    cy.get('.el-menu').last().find('li').contains('常规化学').click({
      force: true
    })
    cy.wait(1000)
    cy.get('input[placeholder="项目快速检索"]').type('钾', {
      force: true
    })
    //断言
    cy.wait(2000)
    cy.get('.item-configNew__list').find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').then((data) => {
      let getData = data.length
      if (getData != 0) {
        cy.get('.item-configNew__list').should('have.length', getData)
      } else {
        cy.get('body').should('contain', '无匹配数据')
      }
      cy.get('input[placeholder="项目快速检索"]').clear({
        force: true
      })
    })
  })
  it('012-开展项目设置-添加自定义项目(已存在)', () => {
    let addItem = 1
    let DropDownList = 6
    let custom = 0
    let submitButton = 4
    let unit = 4
    let customItem = 2
    let cancel = 1
    //项目分类选择常规化学
    cy.wait(1000)
    cy.get('.el-menu').last().find('li').contains('常规化学').click({
      force: true
    })
    cy.wait(500)
    cy.get('.el-button.el-button--primary.el-button--medium').eq(addItem).click({
      force: true
    })
    //互认项目选择自定义
    cy.get('input[placeholder="请选择"]').eq(customItem).click({
      force: true
    })
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('自定义').click()
    cy.get('input[placeholder="请输入项目简称"]').type('AD', {
      force: true
    })
    cy.get('input[placeholder="请输入项目中文名称"]').type('钠', {
      force: true
    })
    //选择单位
    cy.get('input[placeholder="请选择"]').eq(unit).click({
      force: true
    })
    cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').eq(custom).click({
      force: true
    })
    cy.get('.el-button.el-button--primary.el-button--medium').eq(submitButton).click({
      force: true
    })
    cy.get('body').should('contain', '该项目已存在')
    cy.get('.el-button.el-button--default.el-button--medium').eq(cancel).click({
      force: true
    })
  })
  it('013-开展项目设置-添加自定义项目(项目中文名称未填写不能保存)', () => {
    let addItem = 1
    let submitButton = 4
    let unit = 4
    let customItem = 2
    let cancel = 1
    //项目分类选择常规化学
    cy.wait(1000)
    cy.get('.el-menu').last().find('li').contains('常规化学').click({
      force: true
    })
    cy.wait(500)
    cy.get('.el-button.el-button--primary.el-button--medium').eq(addItem).click({
      force: true
    })
    //互认项目选择自定义
    cy.get('input[placeholder="请选择"]').eq(customItem).click({
      force: true
    })
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('自定义').click()
    cy.get('input[placeholder="请输入项目简称"]').clear({
      force: true
    }).type('AD', {
      force: true
    })
    //选择单位
    cy.get('input[placeholder="请选择"]').eq(unit).click({
      force: true
    })
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('%').click()
    cy.get('.el-button.el-button--primary.el-button--medium').eq(submitButton).click({
      force: true
    })
    cy.get('body').should('contain', '项目简称和项目中文名称必需填写')
    cy.get('.el-button.el-button--default.el-button--medium').eq(cancel).click({
      force: true
    })
  })
  it('014-开展项目设置-添加自定义项目(项目简称未填写不能保存)', () => {
    let addItem = 1
    let submitButton = 4
    let unit = 4
    let customItem = 2
    let cancel = 1
    //项目分类选择常规化学
    cy.wait(1000)
    cy.get('.el-menu').last().find('li').contains('常规化学').click({
      force: true
    })
    cy.wait(500)
    cy.get('.el-button.el-button--primary.el-button--medium').eq(addItem).click({
      force: true
    })
    //互认项目选择自定义
    cy.get('input[placeholder="请选择"]').eq(customItem).click({
      force: true
    })
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('自定义').click()
    cy.get('input[placeholder="请输入项目中文名称"]').type('钠', {
      force: true
    })
    //选择单位
    cy.get('input[placeholder="请选择"]').eq(unit).click({
      force: true
    })
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('%').click({
      force: true
    })
    cy.get('.el-button.el-button--primary.el-button--medium').eq(submitButton).click({
      force: true
    })
    cy.get('body').should('contain', '项目简称和项目中文名称必需填写')
    cy.get('.el-button.el-button--default.el-button--medium').eq(cancel).click({
      force: true
    })
  })
  it('015-开展项目设置-添加自定义项目(默认单位未填写不能保存)', () => {
    let addItem = 1
    let submitButton = 4
    let customItem = 2
    let cancel = 1
    //项目分类选择常规化学
    cy.wait(1000)
    cy.get('.el-menu').last().find('li').contains('常规化学').click({
      force: true
    })
    cy.wait(500)
    cy.get('.el-button.el-button--primary.el-button--medium').eq(addItem).click({
      force: true
    })
    //互认项目选择自定义
    cy.get('input[placeholder="请选择"]').eq(customItem).click({
      force: true
    })
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('自定义').click()
    cy.get('input[placeholder="请输入项目简称"]').type('AD', {
      force: true
    })
    cy.get('input[placeholder="请输入项目中文名称"]').type('钠AA', {
      force: true
    })
    //点击确认
    cy.get('.el-button.el-button--primary.el-button--medium').eq(submitButton).click({
      force: true
    })
    cy.get('body').should('contain', '请选择默认单位')
    cy.get('.el-button.el-button--default.el-button--medium').eq(cancel).click({
      force: true
    })
  })
  it('016-开展项目设置-添加自定义项目(数据正确添加成功)', () => {
    let addItem = 1
    let submitButton = 4
    let unit = 4
    let customItem = 2
    //项目分类选择常规化学
    cy.wait(1000)
    cy.get('.el-menu').last().find('li').contains('常规化学').click({
      force: true
    })
    cy.wait(500)
    cy.get('.el-main.item-configNew__content').find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').then((getData) => {
      let getLength = getData.length
      let randomNum = parseInt(Math.random() * 100000)
      cy.get('.el-button.el-button--primary.el-button--medium').eq(addItem).click({
        force: true
      })
      //互认项目选择自定义
      cy.get('input[placeholder="请选择"]').eq(customItem).click({
        force: true
      })
      cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('自定义').click()
      cy.get('input[placeholder="请输入项目简称"]', {
        force: true
      }).type('AD', {
        force: true
      })
      cy.get('input[placeholder="请输入项目中文名称"]', {
        force: true
      }).type('自动化' + randomNum, {
        force: true
      })
      //选择单位
      cy.get('input[placeholder="请选择"]').eq(unit).click({
        force: true
      })
      cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('%').click({
        force: true
      })
      cy.intercept('**/cqb-base-mgr/service/mgr/itemCclRela*').as('addItem')
      //点击确定
      cy.get('.el-button.el-button--primary.el-button--medium').eq(submitButton).click({
        force: true
      })
      cy.wait('@addItem').then((getData) => {
        let responseStatus = getData.response.statusCode
        let expectStatus = 200
        expect(responseStatus).to.equal(expectStatus)
      })
      cy.wait(1000)
      cy.get('.el-main.item-configNew__content').find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').should('have.length', getLength + 1)
    })
  })
  it('017-开展项目设置-添加自定义项目(新增的自定义未审核时不能开启)', () => {
    let customItem = 1
    cy.wait(500)
    cy.get('.el-menu').last().find('li').contains('常规化学').click({
      force: true
    })
    cy.wait(1000)
    //点击开启
    cy.get('.el-main.item-configNew__content').find('.el-switch.ql-itemCard__switch').eq(customItem).click({
      force: true
    })
    cy.get('body').should('contain', '该项目未审核通过，请等待该项目审核通过后再启用!')
    cy.get('.el-button.el-button--default.el-button--small.el-button--primary ').click({
      force: true
    })
  })
  it('018-开展项目设置-删除自定义项目', () => {
    let customItem = 1
    cy.wait(500)
    cy.get('.el-menu').last().find('li').contains('常规化学').click({
      force: true
    })
    cy.wait(1000)
    cy.get('.el-main.item-configNew__content').find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').then((getData) => {
      let getLength = getData.length
      //点击删除
      cy.get('.el-main.item-configNew__content').find('.el-icon-delete').eq(customItem).click({
        force: true
      })
      //确认删除
      cy.intercept('DELETE', '**/itemCclRela/*').as('deleteItem')
      cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
        force: true
      })
      cy.wait('@deleteItem')
      //断言
      cy.get('.el-main.item-configNew__content').find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').should('have.length', getLength - 1)
    })

  })
  it('019-开展项目设置-质控主管单位切换至青浦医联体', () => {
    let choose = 0
    cy.wait(1000)
    cy.get('input[placeholder="请选择"]').eq(choose).click({
      force: true
    })
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('青浦医联体').click({
      force: true
    })
    cy.get('.el-menu').last().should('have.length', 1)
    cy.get('.item-configNew__aside-label').should('contain', '全血细胞计数')
    cy.get('input[placeholder="请选择"]').eq(choose).click({
      force: true
    })
    cy.intercept('GET', '**/category?categoryId=1000000016*').as('getData')
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('佛山市临床检验质量控制中心').click({
      force: true
    })
    cy.wait('@getData')
  })
  it('020-开展项目设置-停用所有项目', () => {
    cy.intercept('GET', '**/category?*').as('getData')
    cy.get('.el-menu').last().find('li').contains('新冠病毒核酸检测').click({
      force: true
    })
    cy.wait('@getData')
    cy.get('.el-main.item-configNew__content').find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').then((getData) => {
      let getLength = getData.length
      cy.get('button').contains('停用所有项目').click({
        force: true
      })
      //点击保存
      cy.get('.el-button.el-button--primary.el-button--medium.is-round').click({
        force: true
      })
      cy.intercept('POST', '**/status*').as('setStatus')
      //二次确认
      cy.get('.el-button.el-button--default.el-button--small.el-button--primary ').click({
        force: true
      })
      cy.wait('@setStatus')
      cy.get('.el-message.el-message--success').should('have.text', '已保存')
      for (let i = 0; i < getLength; i++) {
        cy.get('.el-main.item-configNew__content').find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').eq(i)
          .find('.el-switch.ql-itemCard__switch').should('not.have.class', 'is-checked')

      }
    })
  })
  it('021-开展项目设置-启用所有项目', () => {
    cy.intercept('GET', '**/category?*').as('getData')
    cy.get('.el-menu').last().find('li').contains('新冠病毒核酸检测').click({
      force: true
    })
    cy.wait('@getData')
    cy.get('.el-main.item-configNew__content').find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').then((getData) => {
      let getLength = getData.length
      cy.get('button').contains('启用所有项目').click({
        force: true
      })
      //点击保存
      cy.get('.el-button.el-button--primary.el-button--medium.is-round').click({
        force: true
      })
      cy.intercept('POST', '**/status*').as('setStatus')
      //二次确认
      cy.get('.el-button.el-button--default.el-button--small.el-button--primary ').click({
        force: true
      })
      cy.wait('@setStatus')
      cy.get('.el-message.el-message--success').should('have.text', '已保存')
      for (let i = 0; i < getLength; i++) {
        cy.get('.el-main.item-configNew__content').find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').eq(i)
          .find('.el-switch.ql-itemCard__switch').should('have.class', 'is-checked')

      }
    })
  })
})