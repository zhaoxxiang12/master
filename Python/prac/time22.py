#coding=utf-8
import  time

sjian=time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(sjian)
print(type(sjian))
a=sjian[8:10]
a=int(a)
sum=8658*a
print(type(a))
print(sum)