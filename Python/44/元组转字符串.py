# tup = ((451,),)
# tup=tup[0][0]
# # str=''.join(tup)
# print(tup)
import datetime,time
# a = 42
# b = 51
# e=datetime.datetime.now().strftime('%m{m}%d{d}').format( m='月', d='日')
# print('{:.1f}%'.format(a/b*100))
# print(e)

# testDate = 20201001
# intDate = str(testDate)
# yesterday = datetime.datetime.strptime(intDate, "%Y%m%d")
# e = yesterday.strftime('%m{m}%d{d}').format( m='月', d='日')
# print(yesterday)
# print(e)

# a=607085
# b = 472716
# d = b-a
# c = '{:.1f}%'.format(abs(d) / a * 100)
# print(c)

# str = '20201001'
# try:
#     datetime.datetime.strptime(str,'%Y:%m:%d %H:%M:%S')
#     print(1)
# except:
#    print(2)

# a =input('22')
# print(type(a))

# a = ''
# try:
#     while True:
#         a = input('ss')
#         if datetime.datetime.strptime(a,'%Y%m%d'):
#             print(2)
#         else:
#             print('www')
#             pass
# except:
#     print(3)
# def datetime_verify(date):
#     """判断是否是一个有效的日期字符串"""
#     try:
#         if ":" in date:
#             time.strptime(date, "%Y-%m-%d %H:%M:%S")
#         else:
#             time.strptime(date, "%Y-%m-%d")
#             print(1)
#         return True
#
#     except Exception as e:
#         print(e)
#         return False
# datetime_verify('2020-10-01')

while True:
    date = input('日期')
    start = input('kaishi')
    try:
        if ":" in date or ':' in start:
            time.strptime(date, "%Y-%m-%d %H:%M:%S")
            time.strptime(start, "%Y-%m-%d %H:%M:%S")
        else:
            time.strptime(date, "%Y%m%d")
            time.strptime(start, "%Y%m%d")
            print(1)
            break
    except Exception as e:
        print(e)
print('下一个程序')