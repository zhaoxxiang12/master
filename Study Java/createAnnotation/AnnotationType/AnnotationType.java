package AnnotationType;

public class AnnotationType {
    //@Target  约束被该注解所标注的注解的书写范围
    // ElementType.Type  被标注的注解只能放在类名的上面
    // ElementType.FIELD 被标注的注解只能放在属性名的上面
    // ElementType.METHOD 被标注的注解只能放在方法的上面


    //@Retention:被该注解所标注的注解的声明时长
        //source :存活在源文件期间，编译之后就消失
        //class:存活在源文件期间和字节码文件期间，运行之后就消失
        //runtime:存活在源文件期间、字节码和运行期间

    //@Documented：被该注解所标注的注解能够存在与帮助文档功能



    //Inherited: 被该注解所标注的注解能够被子类继承
}
