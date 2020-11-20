import pymysql

mysqlCon = pymysql.connect(host='8.129.173.137', port=3306, user='cov_report_test',
                               password='test_udRQIHuW7v', database='cov_report_test')
cursor = mysqlCon.cursor()

testDate = '20201001'
inputName = '四川'

provinceSql = "SELECT  t1.province_code,t3.province_name,COUNT(*)  from report_workload_record t1 join report_lab_info_ext t2 " \
              "on t1.lab_id = t2.lab_id join common_province t3 on t3.province_code = t1.province_code  " \
              "where  t1.flow_status = 2 and t1.test_day = '%s' and t3.province_name like '%%%s%%'" \
              "and t2.inst_function in('inst_function_0002','inst_function_0003') GROUP BY t1.province_code" % \
              (testDate ,inputName)
cursor.execute(provinceSql)
CDCResult = cursor.fetchall()[0][0]
print(CDCResult)
mysqlCon.commit()
