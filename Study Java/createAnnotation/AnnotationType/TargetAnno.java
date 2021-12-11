package AnnotationType;

import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

//@Target(ElementType.METHOD)
@Target(value = {ElementType.METHOD,ElementType.FIELD,ElementType.TYPE}) //是数组，可以放多个值
public @interface TargetAnno {
}
