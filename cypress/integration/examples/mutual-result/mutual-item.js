/**
 * 开展项目设置
 */
context('结果互认设置-开展项目设置', () => {
    let urlHost = 'http://cqb-mgr.sh.test.sh-weiyi.com/cqb-base-mgr-fe/app.html'
    beforeEach(() => {
        let SettingIndex = 12
        let ItemSetting = 14
        let ResultAppoveSetting = 16
        let UseIndex = 3
        cy.loginCQB()
        //点击设置
        cy.get('.el-submenu__title').eq(SettingIndex).click({
            force: true
        })
        cy.wait(500)
        // 点击结果互认设置
        cy.get('.el-submenu__title').eq(ResultAppoveSetting).click({
            force: true
        })
        cy.wait(500)
        //点击开展项目设置
        cy.get('.el-menu.el-menu--inline').eq(ItemSetting).find('.el-menu-item').eq(UseIndex).click({
            force: true
        })
    })
    // it('001-开展项目设置-添加相同的项目分类', () => {
    //     cy.wait(1000)
    //     let ItemType = 0
    //     let ItemChoose = 1
    //     let DropDownList = 1
    //     let ItemList = 0
    //     let Type = 4
    //     //点击添加项目分类
    //     cy.get('.el-button.el-button--primary.el-button--medium').eq(ItemType).click({
    //         force: true
    //     })
    //     //点击项目分类下拉框
    //     cy.get('input[placeholder="请选择"]').eq(ItemChoose).click({
    //         force: true
    //     })
    //     cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').eq(ItemList).click({
    //         force: true
    //     })
    //     cy.get('.el-input__inner').eq(Type).type("尿干化学", {
    //         force: true
    //     })
    //     cy.get('button').contains('确定').click({
    //         force: true
    //     })
    //     //界面弹出【分类名称已存在, 请重输】提示则通过
    //     cy.get('body').should('contain', '分类名称已存在, 请重输')
    // })
    // it('002-开展项目设置-添加不存在的项目分类', () => {
    //     cy.wait(1000)
    //     let ItemType = 0
    //     let ItemChoose = 1
    //     let DropDownList = 1
    //     let ItemList = 0
    //     let Type = 4
    //     //点击添加项目分类
    //     cy.get('.el-button.el-button--primary.el-button--medium').eq(ItemType).click({
    //         force: true
    //     })
    //     //点击项目分类下拉框
    //     cy.get('input[placeholder="请选择"]').eq(ItemChoose).click({
    //         force: true
    //     })
    //     cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').eq(ItemList).click({
    //         force: true
    //     })
    //     cy.get('.el-input__inner').eq(Type).type("自动化测试", {
    //         force: true
    //     })
    //     cy.get('button').contains('确定').click({
    //         force: true
    //     })
    //     //界面存在【自动化测试】这个分类则通过
    //     cy.get('body').should('contain', "自动化测试")
    // })
    // it('003-开展项目设置-编辑项目分类', () => {
    //     let CustomerItem = 1
    //     let Edit = 0
    //     let InputBox = 3
    //     cy.get('.item-configNew__type-action').eq(CustomerItem).find('i').eq(Edit).click({
    //         force: true
    //     })
    //     /**
    //      * 点击已存在的名称不允许删除
    //      */
    //     cy.get('.el-input__inner').eq(InputBox).clear({
    //         force: true
    //     }).type("常规化学")
    //     cy.get('body').should('contain', '分类名称已存在, 请重输')
    //     /**
    //      * 编辑新的名称可以保存
    //      */
    //     cy.get('.el-input__inner').eq(InputBox).clear({
    //         force: true
    //     }).type("自定义名称AAA")
    //     cy.get('button').contains('确定').click({
    //         force: true
    //     })
    //     //界面存在【自定义名称AAA】这个分类则通过
    //     cy.get('body').should('contain', '自定义名称AAA')
    // })
    // it('004-开展项目设置-删除项目项目分类', () => {
    //     /**
    //      * 分类下已存在项目不允许删除(删除常规化学)
    //      */
    //     let ChemicalType = 0
    //     let Delete = 1
    //     cy.get('.item-configNew__aside-body').find('.el-menu-item').then((Yielded) => {
    //         let ElementLength = Yielded.length
    //         cy.get('.item-configNew__type-action').eq(ChemicalType).find('i').eq(Delete).click({
    //             force: true
    //         })
    //         cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
    //             force: true
    //         })
    //         //界面弹出【项目分类下存在项目】则通过
    //         cy.get('body').should('contain', '项目分类下存在项目')
    //         /**
    //          * 分类下不存在项目允许删除(删除自定义项目分类)
    //          */
    //         let CustomerItem = 1
    //         cy.get('.item-configNew__type-action').eq(CustomerItem).find('i').eq(Delete).click({
    //             force: true
    //         })
    //         cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
    //             force: true
    //         })

    //         //删除成功 类el-menu-item的长度如果减一，就通过
    //         cy.get('.item-configNew__aside-body').find('.el-menu-item').should('have.length', ElementLength - 1)
    //     })

    // })
    // it('005-开展项目设置-添加项目', () => {
    //     /**
    //      * 添加已存在的项目(钾)
    //      */
    //     cy.wait(500)
    //     let AddItem = 1
    //     let ItemList = 2
    //     let DropDownList = 6
    //     let ChooseFe = 63
    //     let ChooseK = 1
    //     let Unit = 4
    //     let UnitDownList = 6
    //     let ChooseUnit = 0
    //     let ConfirmButton = 4
    //     let menu = 20
    //     let conventionalChemical = 2
    //     //项目分类选择常规化学
    //     cy.get('.el-menu').eq(menu).find('li').eq(conventionalChemical).click({
    //         force: true
    //     })
    //     cy.get('.el-button.el-button--primary.el-button--medium').eq(AddItem).click({
    //         force: true
    //     })
    //     //选择项目
    //     cy.get('input[placeholder="请选择"]').eq(ItemList).click({
    //         force: true
    //     })
    //     cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').eq(ChooseK).click({
    //         force: true
    //     })
    //     //选择单位
    //     cy.get('input[placeholder="请选择"]').eq(Unit).click({
    //         force: true
    //     })
    //     cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(UnitDownList).find('li').eq(ChooseUnit).click({
    //         force: true
    //     })
    //     //点击确定
    //     cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
    //         force: true
    //     })
    //     //界面弹出【项目已存在】则通过
    //     cy.get('body').should('contain', '项目已存在')
    //     /**
    //      * 添加新的项目(铁)
    //      */
    //     //获取初始项目个数
    //     cy.get('.item-configNew__list').find('div').eq(0).find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').then((Yielded) => {
    //         let ElementLength = Yielded.length
    //         cy.log(ElementLength)
    //         cy.get('input[placeholder="请选择"]').eq(ItemList).click({
    //             force: true
    //         })
    //         cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').eq(ChooseFe).click({
    //             force: true
    //         })
    //         //选择单位
    //         cy.get('input[placeholder="请选择"]').eq(Unit).click({
    //             force: true
    //         })
    //         cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(UnitDownList).find('li').eq(ChooseUnit).click({
    //             force: true
    //         })
    //         //点击确定
    //         cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
    //             force: true
    //         })
    //         cy.wait(1000)
    //         // 判断类.el-card.ql-itemCard.item-configNew__item.is-always-shadow是否加一了,即项目添加成功
    //         cy.get('.item-configNew__list').find('div').eq(0).find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').should('have.length', ElementLength + 1)
    //     })

    // })
    // it('006-开展项目设置-编辑项目', () => {
    //     /**
    //      * 编辑项目-将常规化学中的项目铁划分到全血细胞计数
    //      */
    //     cy.wait(500)
    //     let ConfirmButton = 4
    //     let EditButton = 1
    //     let EditIndex = 0
    //     let DropList = 6
    //     let InputBox = 1
    //     let BloodType = 3
    //     let BloodIndex = 3
    //     let Classindex = 0
    //     let ChemicalType = 2
    //     let ClassIndex = 0
    //     let menu = 20
    //     let conventionalChemical = 2
    //     //项目分类选择常规化学
    //     cy.get('.el-menu').eq(menu).find('li').eq(conventionalChemical).click({
    //         force: true
    //     })
    //     cy.wait(1000)
    //     // 获取未将将常规化学中的项目铁划分到全血细胞计数时的.el-card.ql-itemCard.item-configNew__item.is-always-shadow的长度
    //     cy.get('.item-configNew__list').find('div').eq(Classindex).find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').then((Yielded) => {
    //         let ChemicalLength = Yielded.length
    //         cy.log(ChemicalLength)
    //         cy.wait(500)
    //         cy.get('.item-configNew__item-action').eq(EditButton).find('i').eq(EditIndex).click({
    //             force: true
    //         })
    //         cy.wait(1000)
    //         cy.get('input[placeholder="请选择"]').eq(InputBox).click({
    //             force: true
    //         })
    //         cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropList).find('li').eq(BloodType).click({
    //             force: true
    //         })
    //         //    点击确定
    //         cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
    //             force: true
    //         })
    //         cy.wait(1000)
    //         // 判断类.el-card.ql-itemCard.item-configNew__item.is-always-shadow是否减一了,即项目编辑成功
    //         cy.get('.item-configNew__list').find('div').eq(ClassIndex).find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').should('have.length', ChemicalLength - 1)
    //         /**
    //          * 将项目铁返回到之前的项目分类
    //          */
    //         cy.wait(500)
    //         cy.get('.el-menu').eq(menu).find('li').eq(BloodIndex).click({
    //             force: true
    //         })
    //         cy.wait(500)
    //         cy.get('.item-configNew__item-action').eq(EditButton).find('i').eq(EditIndex).click({
    //             force: true
    //         })
    //         cy.get('input[placeholder="请选择"]').eq(InputBox).click({
    //             force: true
    //         })
    //         cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropList).find('li').eq(ChemicalType).click({
    //             force: true
    //         })
    //         cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
    //             force: true
    //         })
    //     })

    // })
    // it('007-开展项目设置-开展定性项目', () => {
    //     let EditButton = 1
    //     let EditIndex = 0
    //     let SelectIndex = 3
    //     let DropList = 6
    //     let SelectQualitative = 3
    //     let ConfirmButton = 4
    //     let menu = 20
    //     let conventionalChemical = 2
    //     //项目分类选择常规化学
    //     cy.wait(500)
    //     cy.get('.el-menu').eq(menu).find('li').eq(conventionalChemical).click({
    //         force: true
    //     })
    //     cy.wait(1000)
    //     cy.get('.item-configNew__item-action').eq(EditButton).find('i').eq(EditIndex).click({
    //         force: true
    //     })
    //     cy.get('input[placeholder="请选择"]').eq(SelectIndex).click({
    //         force: true
    //     })
    //     cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropList).find('li').eq(SelectQualitative).click({
    //         force: true
    //     })
    //     cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
    //         force: true
    //     })
    //     cy.get('.item-configNew__item-action').eq(EditButton).find('i').eq(EditIndex).click({
    //         force: true
    //     })
    //     // 界面出现定性则通过
    //     cy.get('body').should('contain', '定性')

    // })
    // it('008-开展项目设置-开展定量项目', () => {
    //     let EditButton = 1
    //     let EditIndex = 0
    //     let SelectIndex = 3
    //     let DropList = 6
    //     let SelectQuantitative = 1
    //     let ConfirmButton = 4
    //     let menu = 20
    //     let conventionalChemical = 2
    //     //项目分类选择常规化学
    //     cy.wait(1000)
    //     cy.get('.el-menu').eq(menu).find('li').eq(conventionalChemical).click({
    //         force: true
    //     })
    //     cy.get('.item-configNew__item-action').eq(EditButton).find('i').eq(EditIndex).click({
    //         force: true
    //     })
    //     cy.get('input[placeholder="请选择"]').eq(SelectIndex).click({
    //         force: true
    //     })
    //     cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropList).find('li').eq(SelectQuantitative).click({
    //         force: true
    //     })
    //     cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
    //         force: true
    //     })
    //     cy.get('.item-configNew__item-action').eq(EditButton).find('i').eq(EditIndex).click({
    //         force: true
    //     })
    //     // 界面出现定量则通过
    //     cy.get('body').should('contain', '定量')

    // })
    // it('009-开展项目设置-开展不限项目', () => {
    //     let EditButton = 1
    //     let EditIndex = 0
    //     let SelectIndex = 3
    //     let DropList = 6
    //     let SelectUnlimited = 0
    //     let ConfirmButton = 4
    //     let menu = 20
    //     let conventionalChemical = 2
    //     //项目分类选择常规化学
    //     cy.wait(1000)
    //     cy.get('.el-menu').eq(menu).find('li').eq(conventionalChemical).click({
    //         force: true
    //     })
    //     cy.get('.item-configNew__item-action').eq(EditButton).find('i').eq(EditIndex).click({
    //         force: true
    //     })
    //     cy.get('input[placeholder="请选择"]').eq(SelectIndex).click({
    //         force: true
    //     })
    //     cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropList).find('li').eq(SelectUnlimited).click({
    //         force: true
    //     })
    //     cy.get('.el-button.el-button--primary.el-button--medium').eq(ConfirmButton).click({
    //         force: true
    //     })
    //     cy.get('.item-configNew__item-action').eq(EditButton).find('i').eq(EditIndex).click({
    //         force: true
    //     })
    //     // 界面出现定性则通过
    //     cy.get('body').should('contain', '不限')

    // })
    // it('010-开展项目设置-删除项目', () => {
    //     cy.wait(500)
    //     let DeleteIndex = 1
    //     let DeleteButton = 1
    //     let deleteK = 0
    //     let Classindex = 0
    //     let menu = 20
    //     let conventionalChemical = 2
    //     //项目分类选择常规化学
    //     cy.wait(1000)
    //     cy.get('.el-menu').eq(menu).find('li').eq(conventionalChemical).click({
    //         force: true
    //     })
    //     cy.wait(1000)
    //     cy.get('.item-configNew__list').find('div').eq(Classindex).find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').then((Yielded) => {
    //         let ChemicalLength = Yielded.length
    //         cy.log(ChemicalLength)
    //         /**
    //          * 项目已关联数据不能删除
    //          */
    //         cy.get('.item-configNew__item-action').eq(deleteK).find('i').eq(DeleteButton).click({
    //             force: true
    //         })
    //         cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
    //             force: true
    //         })
    //         cy.wait(500)
    //         // 判断类.el-card.ql-itemCard.item-configNew__item.is-always-shadow是否未减一了,即项目未删除
    //         cy.get('.item-configNew__list').find('div').eq(Classindex).find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').should('have.length', ChemicalLength)
    //         cy.get('body').should('contain', '该项目下存在检测体系,无法删除')
    //         /**
    //          * 项目未关联数据可以删除成功
    //          */
    //         cy.get('.item-configNew__item-action').eq(DeleteButton).find('i').eq(DeleteIndex).click({
    //             force: true
    //         })
    //         cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
    //             force: true
    //         })
    //         cy.wait(1000)
    //         // 判断类.el-card.ql-itemCard.item-configNew__item.is-always-shadow是否减一了,即项目删除成功
    //         cy.get('.item-configNew__list').find('div').eq(Classindex).find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').should('have.length', ChemicalLength - 1)
    //     })

    // })
    // it('010-开展项目设置-项目搜索', () => {
    //     cy.wait(500)
    //     let menu = 20
    //     let conventionalChemical = 2
    //     cy.get('.el-menu').eq(menu).find('li').eq(conventionalChemical).click({
    //         force: true
    //     })
    //     cy.wait(1000)
    //     cy.get('input[placeholder="项目快速检索"]').type('钾', {
    //         force: true
    //     })
    //     //断言
    //     cy.wait(500)
    //     cy.get('.item-configNew__list').find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').then((data) => {
    //         let getData = data.length
    //         if (getData != 0) {
    //             cy.get('.item-configNew__list').should('have.length', getData)
    //         } else {
    //             cy.get('body').should('contain', '无匹配数据')
    //         }
    //     })
    // })
    // it('011-开展项目设置-添加自定义项目(已存在)', () => {
    //     let addItem = 1
    //     let menu = 20
    //     let conventionalChemical = 2
    //     let DropDownList = 6
    //     let custom = 0
    //     let submitButton = 4
    //     let unit = 4
    //     let customItem = 2
    //     //项目分类选择常规化学
    //     cy.wait(500)
    //     cy.get('.el-menu').eq(menu).find('li').eq(conventionalChemical).click({
    //         force: true
    //     })
    //     cy.wait(500)
    //     cy.get('.el-button.el-button--primary.el-button--medium').eq(addItem).click({
    //         force: true
    //     })
    //     //互认项目选择自定义
    //     cy.get('input[placeholder="请选择"]').eq(customItem).click({
    //         force: true
    //     })
    //     cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').eq(custom).click({
    //         force: true
    //     })
    //     cy.get('input[placeholder="请输入项目简称"]').type('AD')
    //     cy.get('input[placeholder="请输入项目中文名称"]').type('钠')
    //     //选择单位
    //     cy.get('input[placeholder="请选择"]').eq(unit).click({
    //         force: true
    //     })
    //     cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').eq(custom).click({
    //         force: true
    //     })
    //     cy.get('.el-button.el-button--primary.el-button--medium').eq(submitButton).click({
    //         force: true
    //     })
    //     cy.get('body').should('contain', '该项目已存在')
    // })
    // it('012-开展项目设置-添加自定义项目(项目中文名称未填写不能保存)', () => {
    //     let addItem = 1
    //     let menu = 20
    //     let conventionalChemical = 2
    //     let DropDownList = 6
    //     let custom = 0
    //     let submitButton = 4
    //     let unit = 4
    //     let customItem = 2
    //     //项目分类选择常规化学
    //     cy.wait(500)
    //     cy.get('.el-menu').eq(menu).find('li').eq(conventionalChemical).click({
    //         force: true
    //     })
    //     cy.wait(500)
    //     cy.get('.el-button.el-button--primary.el-button--medium').eq(addItem).click({
    //         force: true
    //     })
    //     //互认项目选择自定义
    //     cy.get('input[placeholder="请选择"]').eq(customItem).click({
    //         force: true
    //     })
    //     cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').eq(custom).click({
    //         force: true
    //     })
    //     cy.get('input[placeholder="请输入项目简称"]').type('AD')
    //     //选择单位
    //     cy.get('input[placeholder="请选择"]').eq(unit).click({
    //         force: true
    //     })
    //     cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').eq(custom).click({
    //         force: true
    //     })
    //     cy.get('.el-button.el-button--primary.el-button--medium').eq(submitButton).click({
    //         force: true
    //     })
    //     cy.get('body').should('contain', '项目简称和项目中文名称必需填写')
    // })
    // it('013-开展项目设置-添加自定义项目(项目简称未填写不能保存)', () => {
    //     let addItem = 1
    //     let menu = 20
    //     let conventionalChemical = 2
    //     let DropDownList = 6
    //     let custom = 0
    //     let submitButton = 4
    //     let unit = 4
    //     let customItem = 2
    //     //项目分类选择常规化学
    //     cy.wait(500)
    //     cy.get('.el-menu').eq(menu).find('li').eq(conventionalChemical).click({
    //         force: true
    //     })
    //     cy.wait(500)
    //     cy.get('.el-button.el-button--primary.el-button--medium').eq(addItem).click({
    //         force: true
    //     })
    //     //互认项目选择自定义
    //     cy.get('input[placeholder="请选择"]').eq(customItem).click({
    //         force: true
    //     })
    //     cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').eq(custom).click({
    //         force: true
    //     })
    //     cy.get('input[placeholder="请输入项目中文名称"]').type('钠')
    //     //选择单位
    //     cy.get('input[placeholder="请选择"]').eq(unit).click({
    //         force: true
    //     })
    //     cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').eq(custom).click({
    //         force: true
    //     })
    //     cy.get('.el-button.el-button--primary.el-button--medium').eq(submitButton).click({
    //         force: true
    //     })
    //     cy.get('body').should('contain', '项目简称和项目中文名称必需填写')
    // })
    // it('014-开展项目设置-添加自定义项目(默认单位未填写不能保存)', () => {
    //     let addItem = 1
    //     let menu = 20
    //     let conventionalChemical = 2
    //     let DropDownList = 6
    //     let custom = 0
    //     let submitButton = 4
    //     let customItem = 2
    //     //项目分类选择常规化学
    //     cy.wait(500)
    //     cy.get('.el-menu').eq(menu).find('li').eq(conventionalChemical).click({
    //         force: true
    //     })
    //     cy.wait(500)
    //     cy.get('.el-button.el-button--primary.el-button--medium').eq(addItem).click({
    //         force: true
    //     })
    //     //互认项目选择自定义
    //     cy.get('input[placeholder="请选择"]').eq(customItem).click({
    //         force: true
    //     })
    //     cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').eq(custom).click({
    //         force: true
    //     })
    //     cy.get('input[placeholder="请输入项目简称"]').type('AD')
    //     cy.get('input[placeholder="请输入项目中文名称"]').type('钠AA')
    //     //点击确认
    //     cy.get('.el-button.el-button--primary.el-button--medium').eq(submitButton).click({
    //         force: true
    //     })
    //     cy.get('body').should('contain', '请选择默认单位')
    // })
    // it('015-开展项目设置-添加自定义项目(数据正确添加成功)', () => {
    //     let addItem = 1
    //     let menu = 20
    //     let conventionalChemical = 2
    //     let DropDownList = 6
    //     let custom = 0
    //     let submitButton = 4
    //     let unit = 4
    //     let customItem = 2
    //     //项目分类选择常规化学
    //     cy.wait(500)
    //     cy.get('.el-menu').eq(menu).find('li').eq(conventionalChemical).click({
    //         force: true
    //     })
    //     cy.wait(500)
    //     cy.get('.el-main.item-configNew__content').find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').then((getData) => {
    //         let getLength = getData.length
    //         let randomNum = parseInt(Math.random() * 100000)
    //         cy.get('.el-button.el-button--primary.el-button--medium').eq(addItem).click({
    //             force: true
    //         })
    //         //互认项目选择自定义
    //         cy.get('input[placeholder="请选择"]').eq(customItem).click({
    //             force: true
    //         })
    //         cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').eq(custom).click({
    //             force: true
    //         })
    //         cy.get('input[placeholder="请输入项目简称"]', {
    //             force: true
    //         }).type('AD')
    //         cy.get('input[placeholder="请输入项目中文名称"]', {
    //             force: true
    //         }).type('自动化' + randomNum)
    //         //选择单位
    //         cy.get('input[placeholder="请选择"]').eq(unit).click({
    //             force: true
    //         })
    //         cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DropDownList).find('li').eq(custom).click({
    //             force: true
    //         })
    //         cy.intercept('**/cqb-base-mgr/service/mgr/itemCclRela*').as('addItem')
    //         //点击确定
    //         cy.get('.el-button.el-button--primary.el-button--medium').eq(submitButton).click({
    //             force: true
    //         })
    //         cy.wait('@addItem').then((getData) => {
    //             let responseStatus = getData.response.statusCode
    //             let expectStatus = 200
    //             expect(responseStatus).to.equal(expectStatus)
    //         })
    //         cy.wait(1000)
    //         cy.get('.el-main.item-configNew__content').find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').should('have.length', getLength + 1)
    //     })
    // })
    // it('016-开展项目设置-添加自定义项目(新增的自定义未审核时不能开启)', () => {
    //     let menu = 20
    //     let conventionalChemical = 2
    //     let customItem = 1
    //     cy.wait(500)
    //     cy.get('.el-menu').eq(menu).find('li').eq(conventionalChemical).click({
    //         force: true
    //     })
    //     cy.wait(1000)
    //     cy.get('.el-main.item-configNew__content').find('.el-switch.ql-itemCard__switch').eq(customItem).click({
    //         force: true
    //     })
    //     cy.get('body').should('contain', '该项目未审核通过，请等待该项目审核通过后再启用!')
    // })
    // it('017-开展项目设置-添加自定义项目(新增的自定义未审核时不能开启)', () => {
    //     let menu = 20
    //     let conventionalChemical = 2
    //     let customItem = 1
    //     cy.wait(500)
    //     cy.get('.el-menu').eq(menu).find('li').eq(conventionalChemical).click({
    //         force: true
    //     })
    //     cy.wait(1000)
    //     cy.get('.el-main.item-configNew__content').find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').then((getData) => {
    //         let getLength = getData.length
    //         //点击删除
    //         cy.get('.el-main.item-configNew__content').find('.el-icon-delete').eq(customItem).click({
    //             force: true
    //         })
    //         //确认删除
    //         cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
    //             force: true
    //         })
    //         cy.wait(1000)
    //         //断言
    //         cy.get('.el-main.item-configNew__content').find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow').should('have.length', getLength - 1)
    //     })

    // })
    it('018-开展项目设置-质控主管单位切换至青浦医联体', () => {
        let QPYLT = 1
        let menu = 20
        cy.wait(1000)
        cy.get('input[placeholder="请选择"]').click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').find('li').eq(QPYLT).click({
            force: true
        })
        cy.get('.el-menu').eq(menu).should('have.length', 1)
        cy.get('.item-configNew__aside-label').should('contain', '全血细胞计数')
    })
})