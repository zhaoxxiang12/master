package Exam.MathUtils;

import Exam.MathUtils.Employ;

public class Test {
    public static void main(String[] args) {
        int gender = 0;
        Employ employ = new Employ(10010,"张三",gender,28,"007","IT","上海");
        System.out.println("工号"+employ.geteId()+"的"+employ.geteName()+","+"今年"+employ.getAge()
                +"岁,"+"性别"+employ.gender(gender)+",在"+employ.getArea()+"任职,所在任职部门为"+employ.getdName()+"研发部,"+"部门编号为"+employ.getId());
    }
}