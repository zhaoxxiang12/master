import pymysql
def connect_database():
    database='cqb_dict_test'
    selfItem = '自定义项目'
    con=pymysql.connect(host='120.76.137.188',port=23306, user='cqb_test',password='test_vS1oHpYKIC',database=database )
    cursor=con.cursor()
    sql="delete from `spec_item_audit` where `itemCName` LIKE '%{0}%'".format(selfItem)
    print(sql)
    cursor.execute(sql)
    con.commit()
    cursor.close()
    con.close()
connect_database()