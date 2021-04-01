context('消息互通-公告板', () => {
    let cancel = 0
    before(() => {
        let startDate = 0
        let endMonth = 3
        let endYear = 3
        cy.loginCQB()
        cy.visit('/cqb-base-mgr-fe/app.html#/message-mgr/billboard')
        cy.get('input[placeholder="开始时间"]').click({
            force: true
        })
        // ------------------选择开始时间--------------------
        cy.get('.el-date-picker__header-label').eq(startDate).invoke('text').then((getData) => {
            let getYear = parseInt(getData.slice(0, 4))
            let chooseYear = 2021
            let startMonth = 1
            let difference = getYear - chooseYear
            //年份相减不等于0就点击
            if (difference != 0) {
                for (let i = 0; i < difference; i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
                        force: true
                    })
                }
            }
            cy.get('.el-date-picker__header-label').eq(startMonth).invoke('text').then((getData) => {
                let getMonth = parseInt(getData.slice(0))
                let chooseMonth = 2
                let trIndex = 1
                let tdIndex = 4
                let differentMonth = getMonth - chooseMonth
                if (differentMonth < 0) {
                    for (let i = 0; i < Math.abs(differentMonth); i++) {
                        cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-arrow-right').click({
                            force: true
                        })
                    }
                } else if (differentMonth > 0) {
                    for (let i = 0; i < Math.abs(differentMonth); i++) {
                        cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left').click({
                            force: true
                        })
                    }
                } else {
                    cy.get('.el-date-table').find('.el-date-table__row').eq(trIndex).find('td').eq(tdIndex).click({
                        force: true
                    })
                }
            })
            //------------------选择结束时间--------------------
            cy.get('input[placeholder="结束时间"]').click({
                force: true
            })
            cy.get('.el-date-picker__header-label').eq(endYear).invoke('text').then((getData) => {
                // 年份相减不等于0就点击
                let getYear = parseInt(getData.slice(0, 4))
                let chooseYear = 2021
                let differenceValue = getYear - chooseYear
                if (differenceValue != 0) {
                    for (let i = 0; i < differenceValue; i++) {
                        cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
                            force: true
                        })
                    }
                }
                cy.get('.el-date-picker__header-label').eq(endMonth).invoke('text').then((getData) => {
                    let getMonth = parseInt(getData.slice(0))
                    let chooseMonth = 3
                    let trIndex = 1
                    let tdIndex = 4
                    let nextMonth = 1
                    let differentMonth = getMonth - chooseMonth
                    if (differentMonth < 0) {
                        for (let i = 0; i < Math.abs(differentMonth); i++) {
                            cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-arrow-right').eq(nextMonth).click({
                                force: true
                            })
                        }
                    } else if (differentMonth > 0) {
                        for (let i = 0; i < Math.abs(differentMonth); i++) {
                            cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left').eq(nextMonth).click({
                                force: true
                            })
                        }
                    } else {
                        cy.get('.el-date-table').eq(1).find('.el-date-table__row').eq(trIndex).find('td').eq(tdIndex).click({
                            force: true
                        })
                    }
                    cy.get('button').contains('搜索').click({
                        force: true
                    })
                })
            })
        })
    })
    it('001-公告板-未填写公告标题不能保存', () => {
        let timeBox = 6
        let chooseMonth = 3
        let trIndex = 1
        let tdIndex = 4
        let timerBox = 2
        let nextMonth = 2
        let chooseDate = 5
        let choice = 2
        let year = 4
        let typeBox = 0
        let searchButton = 2
        let saveButton = 9
        cy.get('button').contains('添加公告').click({
            force: true
        })
        //选择公告时间 2021/3/11
        cy.get('.el-input__inner').eq(timeBox).click({
            force: true
        })
        cy.get('.el-date-picker__header-label').eq(year).invoke('text').then((getData) => {
            let getYear = parseInt(getData.slice(0, 4))
            let chooseYear = 2021
            let differenceValue = chooseYear - getYear
            if (differenceValue > 0) {
                for (let i = 0; i < differenceValue; i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-d-arrow-right').eq(choice).click({
                        force: true
                    })
                    //选择公告日期
                    cy.get('.el-date-picker__header-label').eq(chooseDate).invoke('text').then((getData) => {
                        let getMonth = parseInt(getData.slice(0))

                        let differentMonth = getMonth - chooseMonth
                        if (differentMonth < 0) {
                            for (let i = 0; i < Math.abs(differentMonth); i++) {
                                cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-arrow-right').eq(nextMonth).click({
                                    force: true
                                })
                            }
                        } else if (differentMonth > 0) {
                            for (let i = 0; i < Math.abs(differentMonth); i++) {
                                cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left').eq(nextMonth).click({
                                    force: true
                                })
                            }
                        } else {
                            cy.get('.el-date-table').eq(timerBox).find('.el-date-table__row').eq(trIndex).find('td').eq(tdIndex).click({
                                force: true
                            })
                        }
                    })
                }
            } else if (differenceValue < 0) {
                for (let i = 0; i < differenceValue; i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').eq(choice).click({
                        force: true
                    })
                    cy.get('.el-date-picker__header-label').eq(chooseDate).invoke('text').then((getData) => {
                        let getMonth = parseInt(getData.slice(0))
                        let differentMonth = getMonth - chooseMonth
                        if (differentMonth < 0) {
                            for (let i = 0; i < Math.abs(differentMonth); i++) {
                                cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-arrow-right').eq(nextMonth).click({
                                    force: true
                                })
                            }
                        } else if (differentMonth > 0) {
                            for (let i = 0; i < Math.abs(differentMonth); i++) {
                                cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left').eq(nextMonth).click({
                                    force: true
                                })
                            }
                        } else {
                            cy.get('.el-date-table').eq(timerBox).find('.el-date-table__row').eq(trIndex).find('td').eq(tdIndex).click({
                                force: true
                            })
                        }
                    })
                }
            } else {
                cy.get('.el-date-picker__header-label').eq(chooseDate).invoke('text').then((getData) => {
                    let getMonth = parseInt(getData.slice(0))

                    let differentMonth = getMonth - chooseMonth
                    if (differentMonth < 0) {
                        for (let i = 0; i < Math.abs(differentMonth); i++) {
                            cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-arrow-right').eq(nextMonth).click({
                                force: true
                            })
                        }
                    } else if (differentMonth > 0) {
                        for (let i = 0; i < Math.abs(differentMonth); i++) {
                            cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left').eq(nextMonth).click({
                                force: true
                            })
                        }
                    } else {
                        cy.get('.el-date-table').eq(timerBox).find('.el-date-table__row').eq(trIndex).find('td').eq(tdIndex).click({
                            force: true
                        })
                    }
                })
            }
        })
        //输入公告正文
        cy.get('.el-textarea__inner').type('自动化测试填写', {
            force: true
        })
        cy.get('.el-button.ql-select-lab__new.el-button--text.el-button--mini').click({
            force: true
        })
        //选择实验室
        cy.get('input[placeholder="请输入实验室名称或编码"]').eq(typeBox).type('gd18020', {
            force: true
        })
        cy.get('.el-icon-search').eq(searchButton).click({
            force: true
        })
        cy.get('.el-checkbox__inner').click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        cy.wait(1000)
        //点击确定
        cy.get('button').contains('确定').click({
            force: true
        })
        //断言
        cy.get('body').should('contain', '请输入公告标题')
        // 点击取消
        cy.get('.el-button.el-button--default.el-button--medium').eq(cancel).click({
            force: true
        })
    })
    it('002-公告板-未填写公告正文不能保存', () => {
        let timeBox = 6
        let chooseMonth = 3
        let trIndex = 1
        let tdIndex = 4
        let timerBox = 2
        let nextMonth = 2
        let chooseDate = 5
        let choice = 2
        let year = 4
        let typeBox = 0
        let searchButton = 2
        let saveButton = 9
        let titleBox = 5
        cy.get('button').contains('添加公告').click({
            force: true
        })
        //输入公告标题
        cy.get('.el-input__inner').eq(titleBox).type("自动化填写公告标题", {
            force: true
        })
        //选择公告时间 2021/3/11
        cy.get('.el-input__inner').eq(timeBox).click({
            force: true
        })
        cy.get('.el-date-picker__header-label').eq(year).invoke('text').then((getData) => {
            let getYear = parseInt(getData.slice(0, 4))
            let chooseYear = 2021
            let differenceValue = chooseYear - getYear
            if (differenceValue > 0) {
                for (let i = 0; i < differenceValue; i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-d-arrow-right').eq(choice).click({
                        force: true
                    })
                    //选择公告日期
                    cy.get('.el-date-picker__header-label').eq(chooseDate).invoke('text').then((getData) => {
                        let getMonth = parseInt(getData.slice(0))

                        let differentMonth = getMonth - chooseMonth
                        if (differentMonth < 0) {
                            for (let i = 0; i < Math.abs(differentMonth); i++) {
                                cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-arrow-right').eq(nextMonth).click({
                                    force: true
                                })
                            }
                        } else if (differentMonth > 0) {
                            for (let i = 0; i < Math.abs(differentMonth); i++) {
                                cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left').eq(nextMonth).click({
                                    force: true
                                })
                            }
                        } else {
                            cy.get('.el-date-table').eq(timerBox).find('.el-date-table__row').eq(trIndex).find('td').eq(tdIndex).click({
                                force: true
                            })
                        }
                    })
                }
            } else if (differenceValue < 0) {
                for (let i = 0; i < differenceValue; i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').eq(choice).click({
                        force: true
                    })
                    cy.get('.el-date-picker__header-label').eq(chooseDate).invoke('text').then((getData) => {
                        let getMonth = parseInt(getData.slice(0))
                        let differentMonth = getMonth - chooseMonth
                        if (differentMonth < 0) {
                            for (let i = 0; i < Math.abs(differentMonth); i++) {
                                cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-arrow-right').eq(nextMonth).click({
                                    force: true
                                })
                            }
                        } else if (differentMonth > 0) {
                            for (let i = 0; i < Math.abs(differentMonth); i++) {
                                cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left').eq(nextMonth).click({
                                    force: true
                                })
                            }
                        } else {
                            cy.get('.el-date-table').eq(timerBox).find('.el-date-table__row').eq(trIndex).find('td').eq(tdIndex).click({
                                force: true
                            })
                        }
                    })
                }
            } else {
                cy.get('.el-date-picker__header-label').eq(chooseDate).invoke('text').then((getData) => {
                    let getMonth = parseInt(getData.slice(0))

                    let differentMonth = getMonth - chooseMonth
                    if (differentMonth < 0) {
                        for (let i = 0; i < Math.abs(differentMonth); i++) {
                            cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-arrow-right').eq(nextMonth).click({
                                force: true
                            })
                        }
                    } else if (differentMonth > 0) {
                        for (let i = 0; i < Math.abs(differentMonth); i++) {
                            cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left').eq(nextMonth).click({
                                force: true
                            })
                        }
                    } else {
                        cy.get('.el-date-table').eq(timerBox).find('.el-date-table__row').eq(trIndex).find('td').eq(tdIndex).click({
                            force: true
                        })
                    }
                })
            }
        })
        cy.get('.el-button.ql-select-lab__new.el-button--text.el-button--mini').click({
            force: true
        })
        //选择实验室
        cy.get('input[placeholder="请输入实验室名称或编码"]').eq(typeBox).type('gd18020', {
            force: true
        })
        cy.get('.el-icon-search').eq(searchButton).click({
            force: true
        })
        cy.wait(1000)
        cy.get('.el-checkbox__inner').click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        //点击确定
        cy.get('button').contains('确定').click({
            force: true
        })
        //断言
        cy.get('body').should('contain', '请输入公告内容')
        // 点击取消
        cy.get('.el-button.el-button--default.el-button--medium').eq(cancel).click({
            force: true
        })
    })
    it('003-公告板-未选择实验室不能保存', () => {
        let timeBox = 6
        let chooseMonth = 3
        let trIndex = 1
        let tdIndex = 4
        let timerBox = 2
        let nextMonth = 2
        let chooseDate = 5
        let choice = 2
        let year = 4
        let titleBox = 5
        cy.get('button').contains('添加公告').click({
            force: true
        })
        //输入公告标题
        cy.get('.el-input__inner').eq(titleBox).type("自动化填写公告标题", {
            force: true
        })
        //选择公告时间 2021/3/11
        cy.get('.el-input__inner').eq(timeBox).click({
            force: true
        })
        cy.get('.el-date-picker__header-label').eq(year).invoke('text').then((getData) => {
            let getYear = parseInt(getData.slice(0, 4))
            let chooseYear = 2021
            let differenceValue = chooseYear - getYear
            if (differenceValue > 0) {
                for (let i = 0; i < differenceValue; i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-d-arrow-right').eq(choice).click({
                        force: true
                    })
                    //选择公告日期
                    cy.get('.el-date-picker__header-label').eq(chooseDate).invoke('text').then((getData) => {
                        let getMonth = parseInt(getData.slice(0))

                        let differentMonth = getMonth - chooseMonth
                        if (differentMonth < 0) {
                            for (let i = 0; i < Math.abs(differentMonth); i++) {
                                cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-arrow-right').eq(nextMonth).click({
                                    force: true
                                })
                            }
                        } else if (differentMonth > 0) {
                            for (let i = 0; i < Math.abs(differentMonth); i++) {
                                cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left').eq(nextMonth).click({
                                    force: true
                                })
                            }
                        } else {
                            cy.get('.el-date-table').eq(timerBox).find('.el-date-table__row').eq(trIndex).find('td').eq(tdIndex).click({
                                force: true
                            })
                        }
                    })
                }
            } else if (differenceValue < 0) {
                for (let i = 0; i < differenceValue; i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').eq(choice).click({
                        force: true
                    })
                    cy.get('.el-date-picker__header-label').eq(chooseDate).invoke('text').then((getData) => {
                        let getMonth = parseInt(getData.slice(0))
                        let differentMonth = getMonth - chooseMonth
                        if (differentMonth < 0) {
                            for (let i = 0; i < Math.abs(differentMonth); i++) {
                                cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-arrow-right').eq(nextMonth).click({
                                    force: true
                                })
                            }
                        } else if (differentMonth > 0) {
                            for (let i = 0; i < Math.abs(differentMonth); i++) {
                                cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left').eq(nextMonth).click({
                                    force: true
                                })
                            }
                        } else {
                            cy.get('.el-date-table').eq(timerBox).find('.el-date-table__row').eq(trIndex).find('td').eq(tdIndex).click({
                                force: true
                            })
                        }
                    })
                }
            } else {
                cy.get('.el-date-picker__header-label').eq(chooseDate).invoke('text').then((getData) => {
                    let getMonth = parseInt(getData.slice(0))

                    let differentMonth = getMonth - chooseMonth
                    if (differentMonth < 0) {
                        for (let i = 0; i < Math.abs(differentMonth); i++) {
                            cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-arrow-right').eq(nextMonth).click({
                                force: true
                            })
                        }
                    } else if (differentMonth > 0) {
                        for (let i = 0; i < Math.abs(differentMonth); i++) {
                            cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left').eq(nextMonth).click({
                                force: true
                            })
                        }
                    } else {
                        cy.get('.el-date-table').eq(timerBox).find('.el-date-table__row').eq(trIndex).find('td').eq(tdIndex).click({
                            force: true
                        })
                    }
                })
            }
        })
        //输入公告正文
        cy.get('.el-textarea__inner').type('自动化测试填写', {
            force: true
        })
        //点击确定
        cy.get('button').contains('确定').click({
            force: true
        })
        //断言
        cy.get('body').should('contain', '请选择关联实验室')
        // 点击取消
        cy.get('.el-button.el-button--default.el-button--medium').eq(cancel).click({
            force: true
        })

    })
    it('004-公告板-数据填写完整正常保存', () => {
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.get('.el-table__body').find('tbody>tr').then((Data) => {
            let getLength = Data.length
            let timeBox = 6
            let chooseMonth = 3
            let trIndex = 1
            let tdIndex = 4
            let timerBox = 2
            let nextMonth = 2
            let chooseDate = 5
            let choice = 2
            let year = 4
            let titleBox = 5
            let typeBox = 0
            let searchButton = 2
            let saveButton = 9
            cy.get('button').contains('添加公告').click({
                force: true
            })
            //输入公告标题
            cy.get('.el-input__inner').eq(titleBox).type("自动化填写公告标题", {
                force: true
            })
            //选择公告时间 2021/3/11
            cy.get('.el-input__inner').eq(timeBox).click({
                force: true
            })
            cy.get('.el-date-picker__header-label').eq(year).invoke('text').then((getData) => {
                let getYear = parseInt(getData.slice(0, 4))
                let chooseYear = 2021
                let differenceValue = chooseYear - getYear
                if (differenceValue > 0) {
                    for (let i = 0; i < differenceValue; i++) {
                        cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-d-arrow-right').eq(choice).click({
                            force: true
                        })
                        //选择公告日期
                        cy.get('.el-date-picker__header-label').eq(chooseDate).invoke('text').then((getData) => {
                            let getMonth = parseInt(getData.slice(0))

                            let differentMonth = getMonth - chooseMonth
                            if (differentMonth < 0) {
                                for (let i = 0; i < Math.abs(differentMonth); i++) {
                                    cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-arrow-right').eq(nextMonth).click({
                                        force: true
                                    })
                                }
                            } else if (differentMonth > 0) {
                                for (let i = 0; i < Math.abs(differentMonth); i++) {
                                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left').eq(nextMonth).click({
                                        force: true
                                    })
                                }
                            } else {
                                cy.get('.el-date-table').eq(timerBox).find('.el-date-table__row').eq(trIndex).find('td').eq(tdIndex).click({
                                    force: true
                                })
                            }
                        })
                    }
                } else if (differenceValue < 0) {
                    for (let i = 0; i < differenceValue; i++) {
                        cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').eq(choice).click({
                            force: true
                        })
                        cy.get('.el-date-picker__header-label').eq(chooseDate).invoke('text').then((getData) => {
                            let getMonth = parseInt(getData.slice(0))
                            let differentMonth = getMonth - chooseMonth
                            if (differentMonth < 0) {
                                for (let i = 0; i < Math.abs(differentMonth); i++) {
                                    cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-arrow-right').eq(nextMonth).click({
                                        force: true
                                    })
                                }
                            } else if (differentMonth > 0) {
                                for (let i = 0; i < Math.abs(differentMonth); i++) {
                                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left').eq(nextMonth).click({
                                        force: true
                                    })
                                }
                            } else {
                                cy.get('.el-date-table').eq(timerBox).find('.el-date-table__row').eq(trIndex).find('td').eq(tdIndex).click({
                                    force: true
                                })
                            }
                        })
                    }
                } else {
                    cy.get('.el-date-picker__header-label').eq(chooseDate).invoke('text').then((getData) => {
                        let getMonth = parseInt(getData.slice(0))

                        let differentMonth = getMonth - chooseMonth
                        if (differentMonth < 0) {
                            for (let i = 0; i < Math.abs(differentMonth); i++) {
                                cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-arrow-right').eq(nextMonth).click({
                                    force: true
                                })
                            }
                        } else if (differentMonth > 0) {
                            for (let i = 0; i < Math.abs(differentMonth); i++) {
                                cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left').eq(nextMonth).click({
                                    force: true
                                })
                            }
                        } else {
                            cy.get('.el-date-table').eq(timerBox).find('.el-date-table__row').eq(trIndex).find('td').eq(tdIndex).click({
                                force: true
                            })
                        }
                    })
                }
            })
            //输入公告正文
            cy.get('.el-textarea__inner').type('自动化测试填写', {
                force: true
            })
            //添加实验室
            cy.get('.el-button.ql-select-lab__new.el-button--text.el-button--mini').click({
                force: true
            })
            cy.get('input[placeholder="请输入实验室名称或编码"]').eq(typeBox).type('gd18020', {
                force: true
            })
            cy.get('.el-icon-search').eq(searchButton).click({
                force: true
            })
            cy.wait(500)
            cy.get('.el-checkbox__inner').click({
                force: true
            })
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
                force: true
            })
            //点击确定
            cy.get('button').contains('确定').click({
                force: true
            })
            //断言
            cy.get('.el-table__body').find('tbody>tr').should('have.length', getLength + 1)
        })
    })
    it('005-公告板-推送/取消推送公告', () => {
        cy.get('.el-table__body').find('tbody>tr').then((Data) => {
            let getLength = Data.length
            if (getLength != 0) {
                cy.get('.el-button.el-button--text.el-button--medium').eq(0).invoke('text').then((getText) => {
                    let data = getText
                    if (data == "推送") {
                        cy.intercept('**/cqb-base-mgr/service/mgr/bulletin/push/*').as('push')
                        cy.get('.el-button.el-button--text.el-button--medium').eq(0).click({
                            force: true
                        })
                        cy.wait('@push').then((res) => {
                            let getData = res
                            let expectStatus = 200
                            let responseStatus = getData.response.statusCode
                            expect(responseStatus).to.equal(expectStatus)
                        })
                        cy.get('body').should('contain', '推送成功')
                    } else {
                        cy.intercept('**/cqb-base-mgr/service/mgr/bulletin/unPush/*').as('push')
                        cy.get('.el-button.el-button--text.el-button--medium').eq(0).click({
                            force: true
                        })
                        cy.wait('@push').then((res) => {
                            let getData = res
                            let expectStatus = 200
                            let responseStatus = getData.response.statusCode
                            expect(responseStatus).to.equal(expectStatus)
                        })
                        cy.get('body').should('contain', '取消推送成功')
                    }
                })
            }
        })
    })
    it('006-公告板-搜索', () => {
        cy.intercept('**/cqb-base-mgr/service/mgr/bulletin?*').as('search')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@search').then((data) => {
            let responseStatus = data.response.statusCode
            let expectStatus = 200
            expect(responseStatus).to.equal(expectStatus)
            //查询得到的总的数据条数
            let totalData = data.response.body.data.total
            if (totalData == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (totalData <= 20) {
                cy.get('.el-table__body').find('tbody>tr').should('have.length', totalData)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + totalData + ' 条')
            }
        })
    })
    it('007-公告板-关键字搜索', () => {
        cy.get('input[placeholder="请输入关键字"]').type('自动化填写公告标题', {
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/bulletin?*').as('search')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@search').then((data) => {
            let responseStatus = data.response.statusCode
            let expectStatus = 200
            expect(responseStatus).to.equal(expectStatus)
            //查询得到的总的数据条数
            let totalData = data.response.body.data.total
            if (totalData == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (totalData <= 20) {
                cy.get('.el-table__body').find('tbody>tr').should('have.length', totalData)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + totalData + ' 条')
            }
        })
    })
})