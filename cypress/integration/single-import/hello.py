import pymysql,time
def connect_database():
    currentTime =  time.strftime('%Y-%m-%d',time.localtime(time.time()))
    database='cqb_base_sh_test'
    con=pymysql.connect(host='120.76.137.188',port=23306, user='cqb_test',password='test_vS1oHpYKIC',database=database )
    cursor=con.cursor()
    sql="delete from `cqb_base_sh_test`.`base_qc_batch_no_group` where `createTime` LIKE '%{0}%'".format(currentTime)
    print(sql)
    cursor.execute(sql)
    con.commit()
    cursor.close()
    con.close()
connect_database()

# def deleteGroupNo():
#   dataBase = 'cqb_base_sh_test'
#   con = mysql.connector.connect(host='120.76.137.188', port=23306, user='cqb_test', passwd='test_vS1oHpYKIC', database=dataBase)
#   # currentTime =  time.strftime('%Y-%m-%d',time.localtime(time.time()))
#   currentTime = '2021-05-06'
#   sql = "SELECT * FROM `cqb_base_sh_test`.`base_qc_batch_no_group` WHERE `createTime` LIKE '%{0}%".format(currentTime)
#   print(sql)
#   cursor = con.cursor()
#   cursor.excute(sql)
#   # result = cursor.fetchall()
#   # con.commit()
#   # print(result)
#   # cursor.close()
#   # con.close()
# deleteGroupNo()