import pymysql
def connect_database():
    database='test'
    con=pymysql.connect(host='192.168.5.167',port=3306, user='root',password='123456',database=database )
    cursor=con.cursor()
    sql='select * from student'
    cursor.execute(sql)
    result=cursor.fetchall()
    print(result)
    cursor.close()
    con.close()
    return result
connect_database()