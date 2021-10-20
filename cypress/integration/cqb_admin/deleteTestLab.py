import pymysql
def connect_database():
    labName = '佛山市医院'
    database='cqb_base_sh_test'
    con=pymysql.connect(host='120.76.137.188',port=23306, user='cqb_test',password='test_vS1oHpYKIC',database=database )
    cursor=con.cursor()
    sql="delete from `base_lab_info` where `labName` ='{0}'".format(labName)
    print(sql)
    cursor.execute(sql)
    con.commit()
    cursor.close()
    con.close()
connect_database()