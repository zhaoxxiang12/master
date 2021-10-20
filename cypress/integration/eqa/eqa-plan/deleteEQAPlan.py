import pymysql
def connect_database():
    planName =  ['自动测试计划','修改计划']
    database='eqa_test'
    con=pymysql.connect(host='120.76.137.188',port=23306, user='eqa_test',password='test_nb6VBThPXs',database=database )
    cursor=con.cursor()
    sql1="DELETE from plan where name like '%{0}%'".format(planName[0])
    sql2 = "DELETE from plan where name like '%{0}%'".format(planName[1])
    print(sql1)
    cursor.execute(sql1)
    cursor.execute(sql2)
    con.commit()
    cursor.close()
    con.close()
connect_database()